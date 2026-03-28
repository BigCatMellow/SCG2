import test from 'node:test';
import assert from 'node:assert/strict';

import { createInitialGameState } from '../engine/state.js';
import { beginRound } from '../engine/phases.js';
import { advanceToNextPhase } from '../engine/phases.js';
import { resolveRun, resolveDeclareRangedAttack, resolveDeclareCharge } from '../engine/assault.js';
import { passPhase } from '../engine/activation.js';
import { dispatch } from '../engine/reducer.js';
import { getLegalActionsForUnit } from '../engine/legal_actions.js';

function buildState() {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_marines_1', templateId: 'marine_squad' }],
    armyB: [{ id: 'red_zealots_1', templateId: 'zealot_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  return state;
}

function placeLeaderAt(state, unitId, x, y) {
  const unit = state.units[unitId];
  unit.status.location = 'battlefield';
  const owner = unit.owner;
  state.players[owner].reserveUnitIds = state.players[owner].reserveUnitIds.filter(id => id !== unitId);
  if (!state.players[owner].battlefieldUnitIds.includes(unitId)) state.players[owner].battlefieldUnitIds.push(unitId);
  unit.models[unit.leadingModelId].x = x;
  unit.models[unit.leadingModelId].y = y;
  for (const modelId of unit.modelIds) {
    if (modelId === unit.leadingModelId) continue;
    unit.models[modelId].x = x;
    unit.models[modelId].y = y;
  }
}

test('movement phase advances into assault phase', () => {
  const state = buildState();

  const result = advanceToNextPhase(state);

  assert.equal(result.ok, true);
  assert.equal(state.phase, 'assault');
  assert.equal(state.activePlayer, state.firstPlayerMarkerHolder);
});

test('assault run moves unit and marks assault activation', () => {
  const state = buildState();
  placeLeaderAt(state, 'blue_marines_1', 5, 5);
  placeLeaderAt(state, 'red_zealots_1', 30, 30);
  advanceToNextPhase(state);

  const run = resolveRun(
    state,
    'playerA',
    'blue_marines_1',
    state.units.blue_marines_1.leadingModelId,
    [{ x: 5, y: 5 }, { x: 10, y: 5 }]
  );

  assert.equal(run.ok, true);
  assert.equal(state.units.blue_marines_1.status.assaultActivated, true);
  assert.equal(state.units.blue_marines_1.models[state.units.blue_marines_1.leadingModelId].x, 10);
});


test('declare ranged attack queues a combat declaration and activates unit', () => {
  const state = buildState();
  placeLeaderAt(state, 'blue_marines_1', 5, 5);
  placeLeaderAt(state, 'red_zealots_1', 10, 5);
  advanceToNextPhase(state);

  const declareResult = resolveDeclareRangedAttack(state, 'playerA', 'blue_marines_1');

  assert.equal(declareResult.ok, true);
  assert.equal(state.units.blue_marines_1.status.assaultActivated, true);
  assert.equal(state.combatQueue.length, 1);
  assert.equal(state.combatQueue[0].targetId, 'red_zealots_1');
});

test('declare charge queues melee declaration and activates unit', () => {
  const state = buildState();
  placeLeaderAt(state, 'blue_marines_1', 5, 5);
  placeLeaderAt(state, 'red_zealots_1', 10, 5);
  advanceToNextPhase(state);

  const declareResult = resolveDeclareCharge(state, 'playerA', 'blue_marines_1');

  assert.equal(declareResult.ok, true);
  assert.equal(state.units.blue_marines_1.status.assaultActivated, true);
  assert.equal(state.combatQueue.length, 1);
  assert.equal(state.combatQueue[0].type, 'charge_attack');
  assert.equal(state.combatQueue[0].targetId, 'red_zealots_1');
});

test('declare charge also queues overwatch when defender has ranged weapon and has not used it', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_zealots_1', templateId: 'zealot_squad' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_zealots_1', 5, 5);
  placeLeaderAt(state, 'red_marines_1', 10, 5);
  advanceToNextPhase(state);

  const declareResult = resolveDeclareCharge(state, 'playerA', 'blue_zealots_1');

  assert.equal(declareResult.ok, true);
  assert.equal(state.combatQueue.length, 2);
  assert.equal(state.combatQueue[0].type, 'overwatch_attack');
  assert.equal(state.combatQueue[1].type, 'charge_attack');
  assert.equal(state.units.red_marines_1.status.overwatchUsedThisRound, true);
});

test('instant charge shuts down overwatch reactions', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_zealots_1', templateId: 'zealot_squad' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_zealots_1', 5, 5);
  placeLeaderAt(state, 'red_marines_1', 10, 5);
  advanceToNextPhase(state);
  state.units.blue_zealots_1.meleeWeapons[0].instant = true;

  const declareResult = resolveDeclareCharge(state, 'playerA', 'blue_zealots_1');

  assert.equal(declareResult.ok, true);
  assert.equal(state.combatQueue.length, 1);
  assert.equal(state.combatQueue[0].type, 'charge_attack');
  assert.equal(state.units.red_marines_1.status.overwatchUsedThisRound, false);
  assert.ok(state.log.some(entry => entry.text.includes('has Instant')));
});

test('charge can fail and reports no queued melee attack when roll is short', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_dragoon_1', templateId: 'dragoon' }],
    armyB: [{ id: 'red_zerglings_1', templateId: 'zergling_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_dragoon_1', 10, 10);
  placeLeaderAt(state, 'red_zerglings_1', 17.6, 10);
  advanceToNextPhase(state);

  const declareResult = resolveDeclareCharge(state, 'playerA', 'blue_dragoon_1', 'red_zerglings_1', { rng: () => 0 });

  assert.equal(declareResult.ok, true);
  assert.equal(state.units.blue_dragoon_1.status.assaultActivated, true);
  assert.equal(state.combatQueue.some(entry => entry.type === 'charge_attack' && entry.attackerId === 'blue_dragoon_1'), false);
  assert.equal(declareResult.events[0].type, 'charge_roll_resolved');
  assert.equal(declareResult.events[0].payload.success, false);
});

test('hidden target beyond 4 inches cannot be declared as a ranged attack target', () => {
  const state = buildState();
  placeLeaderAt(state, 'blue_marines_1', 5, 5);
  placeLeaderAt(state, 'red_zealots_1', 11, 5);
  state.units.red_zealots_1.status.hidden = true;
  advanceToNextPhase(state);

  const declareResult = resolveDeclareRangedAttack(state, 'playerA', 'blue_marines_1', 'red_zealots_1');

  assert.equal(declareResult.ok, false);
  assert.match(declareResult.message, /hidden/i);
});

test('bulky ranged weapons cannot be declared while engaged', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_marines_1', templateId: 'marine_squad' }],
    armyB: [{ id: 'red_zealots_1', templateId: 'zealot_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_marines_1', 5, 5);
  placeLeaderAt(state, 'red_zealots_1', 6, 5);
  advanceToNextPhase(state);
  state.units.blue_marines_1.rangedWeapons[0].bulky = true;
  state.units.blue_marines_1.status.engaged = true;

  const declareResult = resolveDeclareRangedAttack(state, 'playerA', 'blue_marines_1', 'red_zealots_1');

  assert.equal(declareResult.ok, false);
  assert.match(declareResult.message, /bulky/i);
});

test('indirect fire can be declared without line of sight', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_kerrigan_1', templateId: 'kerrigan' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_kerrigan_1', 10, 16);
  placeLeaderAt(state, 'red_marines_1', 20, 16);
  advanceToNextPhase(state);

  const declareResult = resolveDeclareRangedAttack(state, 'playerA', 'blue_kerrigan_1', 'red_marines_1');

  assert.equal(declareResult.ok, true);
  assert.equal(state.combatQueue[0].type, 'ranged_attack');
  assert.equal(state.combatQueue[0].targetId, 'red_marines_1');
});

test('burrow-capable units can burrow as an activation in movement', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_roach_1', templateId: 'roach_t3' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_roach_1', 8, 8);
  placeLeaderAt(state, 'red_marines_1', 20, 20);

  const actions = getLegalActionsForUnit(state, 'playerA', 'blue_roach_1');
  assert.equal(actions.some(action => action.type === 'TOGGLE_BURROW' && action.enabled), true);

  const result = dispatch(state, { type: 'TOGGLE_BURROW', payload: { playerId: 'playerA', unitId: 'blue_roach_1' } });

  assert.equal(result.ok, true);
  assert.equal(result.state.units.blue_roach_1.status.burrowed, true);
  assert.equal(result.state.units.blue_roach_1.status.hidden, true);
});

test('upgraded zerglings can burrow as a battlefield action', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_zerglings_1', templateId: 'zergling_t3' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_zerglings_1', 8, 8);
  placeLeaderAt(state, 'red_marines_1', 20, 20);

  const actions = getLegalActionsForUnit(state, 'playerA', 'blue_zerglings_1');

  assert.equal(actions.some(action => action.type === 'TOGGLE_BURROW' && action.enabled), true);
});

test('burrowed units cannot declare ranged attacks or charges', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_roach_1', templateId: 'roach_t3' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_roach_1', 8, 8);
  placeLeaderAt(state, 'red_marines_1', 12, 8);
  state.units.blue_roach_1.status.burrowed = true;
  state.units.blue_roach_1.status.hidden = true;
  advanceToNextPhase(state);

  const ranged = resolveDeclareRangedAttack(state, 'playerA', 'blue_roach_1', 'red_marines_1');
  const charge = resolveDeclareCharge(state, 'playerA', 'blue_roach_1', 'red_marines_1');

  assert.equal(ranged.ok, false);
  assert.match(ranged.message, /burrowed/i);
  assert.equal(charge.ok, false);
  assert.match(charge.message, /burrowed/i);
});

test('running removes burrowed and hidden status', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_roach_1', templateId: 'roach_t3' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_roach_1', 8, 8);
  placeLeaderAt(state, 'red_marines_1', 20, 20);
  state.units.blue_roach_1.status.burrowed = true;
  state.units.blue_roach_1.status.hidden = true;
  advanceToNextPhase(state);

  const run = resolveRun(
    state,
    'playerA',
    'blue_roach_1',
    state.units.blue_roach_1.leadingModelId,
    [{ x: 8, y: 8 }, { x: 12, y: 8 }]
  );

  assert.equal(run.ok, true);
  assert.equal(state.units.blue_roach_1.status.burrowed, false);
  assert.equal(state.units.blue_roach_1.status.hidden, false);
});

test('burrowed regen heals damaged living models when the unit activates', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_roach_1', templateId: 'roach_t3' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_roach_1', 8, 8);
  placeLeaderAt(state, 'red_marines_1', 20, 20);

  const roach = state.units.blue_roach_1;
  roach.status.burrowed = true;
  roach.status.hidden = true;
  roach.models[roach.modelIds[0]].woundsRemaining = 1;

  const result = dispatch(state, { type: 'HOLD_UNIT', payload: { playerId: 'playerA', unitId: 'blue_roach_1' } });

  assert.equal(result.ok, true);
  assert.equal(result.state.units.blue_roach_1.models[roach.modelIds[0]].woundsRemaining, 3);
});

test('burrowed regen does not restore destroyed models', () => {
  const state = createInitialGameState({
    missionId: 'take_and_hold',
    deploymentId: 'crossfire',
    armyA: [{ id: 'blue_roach_1', templateId: 'roach_t3' }],
    armyB: [{ id: 'red_marines_1', templateId: 'marine_squad' }],
    firstPlayerMarkerHolder: 'playerA'
  });
  beginRound(state);
  placeLeaderAt(state, 'blue_roach_1', 8, 8);
  placeLeaderAt(state, 'red_marines_1', 20, 20);

  const roach = state.units.blue_roach_1;
  roach.status.burrowed = true;
  roach.status.hidden = true;
  roach.models[roach.modelIds[0]].alive = false;
  roach.models[roach.modelIds[0]].x = null;
  roach.models[roach.modelIds[0]].y = null;
  roach.models[roach.modelIds[0]].woundsRemaining = 0;
  roach.models[roach.modelIds[1]].woundsRemaining = 2;

  const result = dispatch(state, { type: 'HOLD_UNIT', payload: { playerId: 'playerA', unitId: 'blue_roach_1' } });

  assert.equal(result.ok, true);
  assert.equal(result.state.units.blue_roach_1.models[roach.modelIds[0]].alive, false);
  assert.equal(result.state.units.blue_roach_1.models[roach.modelIds[1]].woundsRemaining, 3);
});

test('both players passing in assault resolves combat and advances round', () => {
  const state = buildState();
  placeLeaderAt(state, 'blue_marines_1', 5, 5);
  placeLeaderAt(state, 'red_zealots_1', 30, 30);
  advanceToNextPhase(state);

  passPhase(state, 'playerA');
  const result = passPhase(state, 'playerB');

  assert.equal(result.ok, true);
  assert.equal(state.phase, 'movement');
  assert.equal(state.round, 2);
});
