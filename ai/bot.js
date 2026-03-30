import {
  getLegalActionsForPlayer,
  getLegalDeployDestinations,
  getLegalMoveDestinations,
  getLegalDisengageDestinations,
  getLegalRunDestinations
} from "../engine/legal_actions.js";
import { autoArrangeModels } from "../engine/coherency.js";
import { distance } from "../engine/geometry.js";
import { getObjectiveControlSnapshot, getObjectiveControlRange } from "../engine/objectives.js";
import { getTacticalCard } from "../data/tactical_cards.js";
import { dispatch as engineDispatch } from "../engine/reducer.js";
import { cloneState } from "../engine/state.js";

/* ══════════════════════════════════════════════════════════════
   CORE HELPERS
   ══════════════════════════════════════════════════════════════ */

const opp = pid => pid === "playerA" ? "playerB" : "playerA";
const lp = u => { const m = u.models[u.leadingModelId]; return m?.alive && m.x != null ? { x: m.x, y: m.y } : null; };
const alive = u => u.modelIds.filter(id => u.models[id].alive).length;
const wounds = u => u.modelIds.reduce((s, id) => { const m = u.models[id]; return s + (m.alive ? (m.woundsRemaining ?? 1) : 0); }, 0);
const onField = u => u.status.location === "battlefield";
const mxRange = u => Math.max(0, ...(u.rangedWeapons ?? []).map(w => w.rangeInches ?? 0));
const hasR = u => u.rangedWeapons?.length > 0;
const hasM = u => u.meleeWeapons?.length > 0;
const hasROnly = u => hasR(u) && !hasM(u);

function availSupply(state, pid) {
  const pool = state.players[pid].supplyPool;
  const used = state.players[pid].battlefieldUnitIds.reduce((t, id) => t + state.units[id].currentSupplyValue, 0);
  return pool === Infinity ? Infinity : pool - used;
}

function engagedEnemySupply(state, unit) {
  let total = 0;
  const up = lp(unit);
  if (!up) return 0;
  for (const o of Object.values(state.units)) {
    if (o.owner === unit.owner || !onField(o)) continue;
    const op = lp(o);
    if (op && distance(up, op) <= 1.5) total += o.currentSupplyValue;
  }
  return total;
}

function cleanDisengage(state, unit) { return unit.currentSupplyValue > engagedEnemySupply(state, unit); }

let ffTargets = {};
function resetFF() { ffTargets = {}; }

/* ══════════════════════════════════════════════════════════════
   BOARD EVALUATOR — Scores a board state from a player's POV
   Used by both advisors and the lookahead planner.
   ══════════════════════════════════════════════════════════════ */

function evaluateBoard(state, pid) {
  const me = state.players[pid], them = state.players[opp(pid)];
  const snap = getObjectiveControlSnapshot(state);
  const cr = getObjectiveControlRange(state);
  let score = 0;

  // VP lead
  score += (me.vp - them.vp) * 15;

  // Objective control
  for (const obj of state.deployment.missionMarkers) {
    const c = snap[obj.id];
    if (c.controller === pid) score += 20;          // we hold it (sticky!)
    else if (c.controller === opp(pid)) score -= 15; // they hold it
    else if (c.contested) score += 3;                // contested is slightly better than enemy-held
    // else uncontrolled: 0
  }

  // Battlefield supply strength
  const mySupply = me.battlefieldUnitIds.reduce((s, id) => s + state.units[id].currentSupplyValue, 0);
  const theirSupply = them.battlefieldUnitIds.reduce((s, id) => s + state.units[id].currentSupplyValue, 0);
  score += (mySupply - theirSupply) * 3;

  // Unit positioning relative to objectives
  for (const uid of me.battlefieldUnitIds) {
    const u = state.units[uid];
    const pt = lp(u);
    if (!pt) continue;
    for (const obj of state.deployment.missionMarkers) {
      const d = distance(pt, obj);
      if (d <= cr) score += 6;
      else if (d <= cr + 4) score += Math.max(0, (cr + 4 - d));
    }
  }

  // Penalize enemy units on objectives
  for (const uid of them.battlefieldUnitIds) {
    const u = state.units[uid];
    const pt = lp(u);
    if (!pt) continue;
    for (const obj of state.deployment.missionMarkers) {
      if (distance(pt, obj) <= cr) score -= 5;
    }
  }

  // Total wounds remaining (army health)
  const myWounds = me.battlefieldUnitIds.reduce((s, id) => s + wounds(state.units[id]), 0);
  const theirWounds = them.battlefieldUnitIds.reduce((s, id) => s + wounds(state.units[id]), 0);
  score += (myWounds - theirWounds) * 1.5;

  // Reserves potential (supply waiting to deploy)
  score += me.reserveUnitIds.length * 2;

  return score;
}

/* ══════════════════════════════════════════════════════════════
   STRATEGIST — Thinks 2+ turns ahead, evaluates macro position
   "Where should the army be? What objectives matter? When to commit?"
   ══════════════════════════════════════════════════════════════ */

function strategistAdvice(state, pid) {
  const me = state.players[pid], them = state.players[opp(pid)];
  const snap = getObjectiveControlSnapshot(state);
  const cr = getObjectiveControlRange(state);
  const rl = state.mission.pacing?.roundLimit ?? state.mission.roundLimit ?? 5;
  const roundsLeft = rl - state.round;
  const vpDiff = me.vp - them.vp;

  // Which objectives should we target?
  const objPriorities = state.deployment.missionMarkers.map(obj => {
    const c = snap[obj.id];
    let priority = 0;
    if (!c.controller && !c.contested) priority = 10;     // unclaimed: free sticky points
    else if (c.contested) priority = 8;                     // break the tie
    else if (c.controller === opp(pid)) {
      // How much supply do they have on it?
      priority = 5;
    } else {
      // We own it — only defend if threatened
      const enemyNear = Object.values(state.units).some(e =>
        e.owner !== pid && onField(e) && lp(e) && distance(lp(e), obj) <= cr + 8
      );
      priority = enemyNear ? 4 : 1;
    }
    // Urgency: later rounds = more urgent
    if (roundsLeft <= 2) priority *= 1.5;
    return { ...obj, ...c, priority };
  }).sort((a, b) => b.priority - a.priority);

  // Overall posture
  let posture;
  if (vpDiff < -2 || (vpDiff < 0 && roundsLeft <= 1)) posture = "desperate";
  else if (vpDiff < 0) posture = "aggressive";
  else if (vpDiff > 2 || (vpDiff > 0 && roundsLeft <= 1)) posture = "defensive";
  else posture = "balanced";

  // Deploy recommendation: cheap first early, expensive later
  const deployCheapFirst = roundsLeft >= rl - 2;

  // Pass timing recommendation
  let shouldPass = false;
  if (state.phase === "movement" && me.reserveUnitIds.length === 0) {
    const myUnact = Object.values(state.units).filter(u => u.owner === pid && !u.status.movementActivated && (onField(u) || u.status.location === "reserves")).length;
    if (myUnact <= 1 && posture === "defensive") shouldPass = true;
    if (myUnact === 0) shouldPass = true;
  }

  return { objPriorities, posture, deployCheapFirst, shouldPass, roundsLeft, roundLimit: rl, vpDiff };
}

/* ══════════════════════════════════════════════════════════════
   TACTICIAN — Evaluates immediate combat efficiency
   "What should this unit do RIGHT NOW for maximum damage/safety?"
   ══════════════════════════════════════════════════════════════ */

function tacticianScoreTarget(state, pid, atk, tgt) {
  const tp = lp(tgt), ap = lp(atk);
  if (!tp || !ap) return -Infinity;
  const d = distance(ap, tp);

  let s = 0;

  // Kill probability: fewer wounds = easier kill = more valuable
  const w = wounds(tgt);
  if (w <= 1) s += 15;
  else if (w <= 2) s += 10;
  else if (w <= 4) s += 5;

  // Focus fire coordination
  if (ffTargets[tgt.id]) s += 8 + ffTargets[tgt.id] * 2;

  // Supply value of target
  s += tgt.currentSupplyValue * 3;

  // Objective presence
  const cr = getObjectiveControlRange(state);
  for (const obj of state.deployment.missionMarkers) {
    if (distance(tp, obj) <= cr) s += 8;
  }

  return s;
}

function tacticianScorePosition(state, pid, unit, point, strat) {
  const cr = getObjectiveControlRange(state);
  let score = 0;

  // Score based on strategist's objective priorities
  for (const obj of strat.objPriorities) {
    const d = distance(point, obj);
    if (d <= cr) score += obj.priority * 3;
    else if (d <= cr + 5) score += obj.priority * Math.max(0, (cr + 5 - d) / 5);
  }

  // Ranged positioning
  const enemies = Object.values(state.units).filter(u => u.owner === opp(pid) && onField(u));
  for (const e of enemies) {
    const ep = lp(e);
    if (!ep) continue;
    const d = distance(point, ep);
    if (hasR(unit)) {
      const mr = mxRange(unit);
      if (mr > 0) {
        const ideal = mr * 0.7;
        score -= Math.abs(d - ideal) * 0.4;
        if (d <= 1.5) score -= hasROnly(unit) ? 12 : 5;
      }
    }
    if (hasM(unit) && !hasR(unit) && strat.posture !== "defensive") {
      score += Math.max(0, 8 - d) * 0.6;
    }
  }

  // Edge penalty
  const ed = Math.min(point.x, point.y, state.board.widthInches - point.x, state.board.heightInches - point.y);
  if (ed < 3) score -= (3 - ed) * 3;

  return score;
}

/* ══════════════════════════════════════════════════════════════
   PLANNER — Simulates moves forward to evaluate consequences
   "If I move here, what happens next turn?"
   ══════════════════════════════════════════════════════════════ */

function simulateAction(state, action) {
  try {
    const result = engineDispatch(state, action);
    return result.ok ? result.state : null;
  } catch (_) {
    return null;
  }
}

function planAhead(state, pid, candidateActions, strat, maxCandidates) {
  // Score each candidate by simulating it and evaluating the resulting board
  const limit = Math.min(candidateActions.length, maxCandidates);
  const scored = [];

  for (let i = 0; i < limit; i++) {
    const action = candidateActions[i];
    const futureState = simulateAction(state, action);
    if (!futureState) continue;

    // Evaluate the board after our action
    const immediateScore = evaluateBoard(futureState, pid);

    // Simulate one opponent response (their best greedy move)
    let afterOpponentScore = immediateScore;
    if (futureState.activePlayer === opp(pid)) {
      const oppActions = getLegalActionsForPlayer(futureState, opp(pid));
      // Try a few opponent moves and assume they pick the best one for them
      const oppCandidates = oppActions.filter(a => a.enabled).slice(0, 5);
      let worstForUs = immediateScore;
      for (const oppAct of oppCandidates) {
        const oppAction = buildSimpleAction(futureState, opp(pid), oppAct);
        if (!oppAction) continue;
        const afterOpp = simulateAction(futureState, oppAction);
        if (!afterOpp) continue;
        const oppScore = evaluateBoard(afterOpp, pid);
        if (oppScore < worstForUs) worstForUs = oppScore;
      }
      afterOpponentScore = worstForUs;
    }

    // Blend immediate eval with post-opponent eval
    const finalScore = immediateScore * 0.4 + afterOpponentScore * 0.6;
    scored.push({ action, score: finalScore });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

// Build a simple action from a legal action descriptor (for opponent simulation)
function buildSimpleAction(state, pid, desc) {
  const unit = state.units[desc.unitId];
  if (!unit) return { type: "PASS_PHASE", payload: { playerId: pid } };

  if (desc.type === "HOLD_UNIT") return { type: "HOLD_UNIT", payload: { playerId: pid, unitId: desc.unitId } };
  if (desc.type === "PASS_PHASE") return { type: "PASS_PHASE", payload: { playerId: pid } };

  if (desc.type === "DEPLOY_UNIT") {
    const pts = getLegalDeployDestinations(state, pid, desc.unitId, unit.leadingModelId);
    if (!pts.length) return null;
    // Pick center-ish point
    const mid = { x: state.board.widthInches / 2, y: state.board.heightInches / 2 };
    pts.sort((a, b) => distance(a, mid) - distance(b, mid));
    const d = pts[0];
    return { type: "DEPLOY_UNIT", payload: { playerId: pid, unitId: desc.unitId, leadingModelId: unit.leadingModelId, entryPoint: d.entryPoint, path: [d.entryPoint, { x: d.x, y: d.y }], modelPlacements: autoArrangeModels(state, desc.unitId, d) } };
  }

  if (desc.type === "MOVE_UNIT") {
    const pts = getLegalMoveDestinations(state, pid, desc.unitId, unit.leadingModelId);
    if (!pts.length) return null;
    // Move toward nearest objective
    const objs = state.deployment.missionMarkers;
    const up = lp(unit);
    if (!up || !objs.length) return null;
    const nearestObj = objs.reduce((best, o) => distance(up, o) < distance(up, best) ? o : best, objs[0]);
    pts.sort((a, b) => distance(a, nearestObj) - distance(b, nearestObj));
    const d = pts[0];
    const l = unit.models[unit.leadingModelId];
    return { type: "MOVE_UNIT", payload: { playerId: pid, unitId: desc.unitId, leadingModelId: unit.leadingModelId, path: [{ x: l.x, y: l.y }, { x: d.x, y: d.y }], modelPlacements: autoArrangeModels(state, unit.id, d) } };
  }

  if (desc.type === "DECLARE_RANGED_ATTACK") {
    return { type: "DECLARE_RANGED_ATTACK", payload: { playerId: pid, unitId: desc.unitId } };
  }
  if (desc.type === "DECLARE_CHARGE") {
    return { type: "DECLARE_CHARGE", payload: { playerId: pid, unitId: desc.unitId } };
  }

  return null;
}

/* ══════════════════════════════════════════════════════════════
   NEGOTIATOR — Combines strategist + tactician + planner
   ══════════════════════════════════════════════════════════════ */

function buildCandidateActions(state, pid, strat) {
  const candidates = [];
  const actions = getLegalActionsForPlayer(state, pid);

  if (state.phase === "movement") {
    // Deploy candidates
    const depIds = actions.filter(a => a.type === "DEPLOY_UNIT" && a.enabled).map(a => a.unitId);
    const avail = availSupply(state, pid);
    const orderedDep = [...depIds]
      .filter(id => state.units[id].currentSupplyValue <= avail)
      .sort((a, b) => strat.deployCheapFirst
        ? state.units[a].currentSupplyValue - state.units[b].currentSupplyValue
        : state.units[b].currentSupplyValue - state.units[a].currentSupplyValue
      );

    for (const uid of orderedDep.slice(0, 3)) {
      const u = state.units[uid];
      const pts = getLegalDeployDestinations(state, pid, uid, u.leadingModelId);
      // Pick top 3 destinations by tactician score
      const scored = pts.map(p => ({ p, s: tacticianScorePosition(state, pid, u, p, strat) }))
        .sort((a, b) => b.s - a.s).slice(0, 3);
      for (const { p } of scored) {
        candidates.push({ type: "DEPLOY_UNIT", payload: { playerId: pid, unitId: uid, leadingModelId: u.leadingModelId, entryPoint: p.entryPoint, path: [p.entryPoint, { x: p.x, y: p.y }], modelPlacements: autoArrangeModels(state, uid, p) } });
      }
    }

    // Move candidates for battlefield units
    const battleIds = Object.values(state.units)
      .filter(u => u.owner === pid && onField(u) && !u.status.movementActivated)
      .map(u => u.id);

    for (const uid of battleIds.slice(0, 4)) {
      const unit = state.units[uid];
      if (unit.status.engaged) {
        if (cleanDisengage(state, unit)) {
          const pts = getLegalDisengageDestinations(state, pid, uid, unit.leadingModelId);
          const scored = pts.map(p => ({ p, s: tacticianScorePosition(state, pid, unit, p, strat) }))
            .sort((a, b) => b.s - a.s).slice(0, 2);
          for (const { p } of scored) {
            candidates.push({ type: "DISENGAGE_UNIT", payload: { playerId: pid, unitId: uid, leadingModelId: unit.leadingModelId, path: bPath(unit, p), modelPlacements: autoArrangeModels(state, unit.id, p) } });
          }
        }
        candidates.push({ type: "HOLD_UNIT", payload: { playerId: pid, unitId: uid } });
        continue;
      }
      const pts = getLegalMoveDestinations(state, pid, uid, unit.leadingModelId);
      const scored = pts.map(p => ({ p, s: tacticianScorePosition(state, pid, unit, p, strat) }))
        .sort((a, b) => b.s - a.s).slice(0, 3);
      for (const { p } of scored) {
        candidates.push({ type: "MOVE_UNIT", payload: { playerId: pid, unitId: uid, leadingModelId: unit.leadingModelId, path: bPath(unit, p), modelPlacements: autoArrangeModels(state, unit.id, p) } });
      }
      candidates.push({ type: "HOLD_UNIT", payload: { playerId: pid, unitId: uid } });
    }
  }

  if (state.phase === "assault") {
    const rIds = actions.filter(a => a.type === "DECLARE_RANGED_ATTACK" && a.enabled).map(a => a.unitId);
    for (const uid of rIds) {
      const atk = state.units[uid];
      const enemies = Object.values(state.units).filter(u => u.owner === opp(pid) && onField(u));
      const scored = enemies.map(t => ({ t, s: tacticianScoreTarget(state, pid, atk, t) + scoreRangedRange(atk, t) }))
        .filter(x => x.s > -Infinity).sort((a, b) => b.s - a.s).slice(0, 3);
      for (const { t } of scored) {
        candidates.push({ type: "DECLARE_RANGED_ATTACK", payload: { playerId: pid, unitId: uid, targetId: t.id } });
      }
    }

    const cIds = actions.filter(a => a.type === "DECLARE_CHARGE" && a.enabled).map(a => a.unitId);
    for (const uid of cIds) {
      const atk = state.units[uid];
      const enemies = Object.values(state.units).filter(u => u.owner === opp(pid) && onField(u));
      const scored = enemies.map(t => ({ t, s: scoreChargeViability(atk, t) }))
        .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 2);
      for (const { t } of scored) {
        candidates.push({ type: "DECLARE_CHARGE", payload: { playerId: pid, unitId: uid, targetId: t.id } });
      }
    }

    // Run options
    const unact = Object.values(state.units).filter(u => u.owner === pid && onField(u) && !u.status.assaultActivated);
    for (const u of unact.slice(0, 3)) {
      if (u.status.engaged) { candidates.push({ type: "HOLD_UNIT", payload: { playerId: pid, unitId: u.id } }); continue; }
      const pts = getLegalRunDestinations(state, pid, u.id, u.leadingModelId);
      const scored = pts.map(p => ({ p, s: tacticianScorePosition(state, pid, u, p, strat) }))
        .sort((a, b) => b.s - a.s).slice(0, 2);
      for (const { p } of scored) {
        candidates.push({ type: "RUN_UNIT", payload: { playerId: pid, unitId: u.id, leadingModelId: u.leadingModelId, path: bPath(u, p), modelPlacements: autoArrangeModels(state, u.id, p) } });
      }
      candidates.push({ type: "HOLD_UNIT", payload: { playerId: pid, unitId: u.id } });
    }
  }

  if (state.phase === "combat") {
    const withCombat = Object.values(state.units).filter(u => {
      if (u.owner !== pid || !onField(u) || u.status.combatActivated) return false;
      return state.combatQueue.some(e => ["ranged_attack", "charge_attack", "overwatch_attack"].includes(e.type) && e.attackerId === u.id);
    });
    // Resolve lowest-wounds-target first
    withCombat.sort((a, b) => {
      const ae = state.combatQueue.find(e => e.attackerId === a.id);
      const be = state.combatQueue.find(e => e.attackerId === b.id);
      return (ae ? wounds(state.units[ae.targetId]) : 999) - (be ? wounds(state.units[be.targetId]) : 999);
    });
    for (const u of withCombat) {
      candidates.push({ type: "RESOLVE_COMBAT_UNIT", payload: { playerId: pid, unitId: u.id } });
    }
    const unact = Object.values(state.units).filter(u => u.owner === pid && onField(u) && !u.status.combatActivated);
    for (const u of unact) candidates.push({ type: "HOLD_UNIT", payload: { playerId: pid, unitId: u.id } });
  }

  // Always add pass as an option
  if (!state.players[pid].hasPassedThisPhase) {
    candidates.push({ type: "PASS_PHASE", payload: { playerId: pid } });
  }

  return candidates;
}

function scoreRangedRange(atk, tgt) {
  const ap = lp(atk), tp = lp(tgt);
  if (!ap || !tp) return -Infinity;
  const d = distance(ap, tp), mr = mxRange(atk);
  if (mr <= 0 || d > mr + 1e-6) return -Infinity;
  return Math.max(0, 12 - d) * 0.5;
}

function scoreChargeViability(atk, tgt) {
  const ap = lp(atk), tp = lp(tgt);
  if (!ap || !tp) return -Infinity;
  const d = distance(ap, tp);
  if (d > 8 + 1e-6) return -Infinity;
  let s = tgt.currentSupplyValue * 2 + Math.max(0, 8 - d);
  if (hasROnly(atk)) s -= 20;
  if (tgt.currentSupplyValue >= atk.currentSupplyValue * 2 && alive(atk) <= 2) s -= 10;
  return s;
}

function bPath(u, d) { const l = u.models[u.leadingModelId]; return [{ x: l.x, y: l.y }, { x: d.x, y: d.y }]; }

/* ══════════════════════════════════════════════════════════════
   CARD PLAY
   ══════════════════════════════════════════════════════════════ */

function bestCard(state, pid, strat, aboutToActId) {
  const actions = getLegalActionsForPlayer(state, pid).filter(x => x.type === "PLAY_CARD" && x.enabled);
  if (!actions.length) return null;
  let bc = null, bs = -1;
  for (const act of actions) {
    const card = getTacticalCard(act.cardId);
    let sc = 3;
    if (card.effect?.modifiers?.some(m => m.key === "unit.speed")) {
      if (!act.targetUnitId) continue;
      const u = state.units[act.targetUnitId];
      if (!u || !onField(u)) continue;
      const p = lp(u);
      if (!p) continue;
      const nd = Math.min(...strat.objPriorities.filter(o => o.controller !== pid).map(o => distance(p, o)).concat([999]));
      sc += Math.min(12, nd) + u.currentSupplyValue * 1.5;
    }
    if (card.effect?.modifiers?.some(m => ["weapon.hitTarget", "weapon.attacksPerModel", "weapon.shotsPerModel"].includes(m.key))) {
      if (!act.targetUnitId) continue;
      const u = state.units[act.targetUnitId];
      if (!u || !onField(u)) continue;
      if (aboutToActId && act.targetUnitId === aboutToActId) sc += 20;
      else if (aboutToActId) continue;
      sc += alive(u) * 2 + u.currentSupplyValue * 2;
      if (state.combatQueue.some(e => e.attackerId === act.targetUnitId)) sc += 8;
    }
    if (sc > bs) { bs = sc; bc = act; }
  }
  if (!bc) return null;
  return { type: "PLAY_CARD", payload: { playerId: pid, cardInstanceId: bc.cardInstanceId, targetUnitId: bc.targetUnitId ?? null } };
}

/* ══════════════════════════════════════════════════════════════
   PUBLIC API — The negotiation happens here
   ══════════════════════════════════════════════════════════════ */

export function chooseAction(state, playerId) {
  // Step 1: Strategist assesses the big picture
  const strat = strategistAdvice(state, playerId);

  // Step 2: Should we pass early? Strategist says:
  if (strat.shouldPass && !state.players[playerId].hasPassedThisPhase) {
    return { type: "PASS_PHASE", payload: { playerId } };
  }

  // Step 3: Try playing a card (timing-aware)
  // For assault phase, we'll play cards inline with unit actions below
  if (state.phase === "movement") {
    const card = bestCard(state, playerId, strat);
    if (card) return card;
  }

  // Step 4: Tactician generates candidate actions
  const candidates = buildCandidateActions(state, playerId, strat);
  if (!candidates.length) return { type: "PASS_PHASE", payload: { playerId } };

  // Step 5: Planner simulates top candidates forward and picks the best
  // Use lookahead for movement and assault (where positioning matters most)
  // Combat phase is deterministic-ish, skip lookahead
  if (state.phase === "combat") {
    // Combat: just pick the tactician's first choice (already sorted by kill priority)
    return candidates[0];
  }

  // For assault: try playing a card right before the best attack
  if (state.phase === "assault") {
    const attackCandidates = candidates.filter(c =>
      c.type === "DECLARE_RANGED_ATTACK" || c.type === "DECLARE_CHARGE"
    );
    if (attackCandidates.length) {
      const topAttack = attackCandidates[0];
      const card = bestCard(state, playerId, strat, topAttack.payload.unitId);
      if (card) return card;
      // Record focus fire
      if (topAttack.payload.targetId) {
        ffTargets[topAttack.payload.targetId] = (ffTargets[topAttack.payload.targetId] || 0) + 1;
      }
    }
  }

  // Planner: simulate top 8 candidates with 1-ply lookahead
  const planned = planAhead(state, playerId, candidates, strat, 8);

  if (planned.length) {
    return planned[0].action;
  }

  // Fallback: tactician's top pick without simulation
  return candidates[0];
}

export async function performBotTurn(store, playerId) {
  if (store.getState().phase === "assault") {
    const s = store.getState();
    const total = Object.values(s.units).filter(u => u.owner === playerId && onField(u)).length;
    const unact = Object.values(s.units).filter(u => u.owner === playerId && onField(u) && !u.status.assaultActivated).length;
    if (unact === total) resetFF();
  }
  return store.dispatch(chooseAction(store.getState(), playerId));
}
