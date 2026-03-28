import { createInitialGameState } from "../engine/state.js";
import { beginGame } from "../engine/phases.js";
import { dispatch as engineDispatch } from "../engine/reducer.js";
import { bindInputHandlers, beginMoveInteraction, beginDeployInteraction, beginDisengageInteraction, beginRunInteraction, beginDeclareRangedInteraction, beginDeclareChargeInteraction, cancelCurrentInteraction } from "./input.js";
import { renderAll } from "./renderer.js";
import { autoArrangeModels } from "../engine/coherency.js";
import { performBotTurn } from "../ai/bot.js";
import { screenToBoardPoint } from "./board.js";
import { getTacticalCard } from "../data/tactical_cards.js";
import { snapPointToGrid } from "../engine/geometry.js";
import { getLegalMoveDestinations, getLegalDeployDestinations, getLegalDisengageDestinations, getLegalRunDestinations } from "../engine/legal_actions.js";

const DEFAULT_SETUP = {
  missionId: "take_and_hold",
  deploymentId: "crossfire",
  firstPlayerMarkerHolder: "playerA",
  armyA: [
    { id: "raiders_raynor", templateId: "jim_raynor" },
    { id: "raiders_marines_t2", templateId: "marine_t2" },
    { id: "raiders_marauder_1", templateId: "marauder_t1" },
    { id: "raiders_marauder_2", templateId: "marauder_t1" },
    { id: "raiders_marauder_3", templateId: "marauder_t1" },
    { id: "raiders_medic", templateId: "medic_t1" }
  ],
  armyB: [
    { id: "swarm_kerrigan", templateId: "kerrigan" },
    { id: "swarm_raptor_t2", templateId: "raptor_t2" },
    { id: "swarm_roach_t3", templateId: "roach_t3" },
    { id: "swarm_zergling_t3", templateId: "zergling_t3" },
    { id: "swarm_zergling_t2", templateId: "zergling_t2" }
  ],
  tacticalCardsA: ["barracks_proxy", "academy", "orbital_command"],
  tacticalCardsB: ["lair", "evolution_chamber", "roach_warren", "malignant_creep"],
  rules: { gridMode: true }
};

function createStore(initialState) {
  let state = initialState;
  const listeners = [];
  return {
    getState() { return state; },
    dispatch(action) {
      const result = engineDispatch(state, action);
      if (result.ok) {
        state = result.state;
        listeners.forEach(listener => listener(state, result.events ?? []));
      }
      return result;
    },
    replaceState(nextState) {
      state = nextState;
      listeners.forEach(listener => listener(state, []));
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index >= 0) listeners.splice(index, 1);
      };
    }
  };
}

const uiState = {
  selectedUnitId: null,
  mode: null,
  previewPath: null,
  previewUnit: null,
  locked: false,
  lastError: null,
  notifications: [],
  lastSeenLogCount: 0,
  legalDestinations: [],
  pendingPass: false
};

let store;

function buildInitialState() {
  const state = createInitialGameState(DEFAULT_SETUP);
  beginGame(state);
  return state;
}

function selectUnit(unitId) {
  uiState.selectedUnitId = unitId;
  cancelCurrentInteraction(uiState);
  uiState.legalDestinations = [];
  // On mobile, switch to board tab when selecting a unit
  switchToBoard();
  rerender();
}

function switchToBoard() {
  if (window.innerWidth > 768) return;
  document.querySelectorAll("[data-tab]").forEach(p => p.classList.toggle("tab-visible", p.dataset.tab === "board"));
  document.querySelectorAll(".mobile-tabs .tab-btn").forEach(b => b.classList.toggle("active", b.dataset.target === "board"));
}

function getSelectedUnit(state) {
  return uiState.selectedUnitId ? state.units[uiState.selectedUnitId] : null;
}

/* ── Compute legal destinations when entering a mode ── */
function computeLegalDestinations() {
  const state = store.getState();
  const unit = getSelectedUnit(state);
  if (!unit || unit.owner !== "playerA") { uiState.legalDestinations = []; return; }

  try {
    if (uiState.mode === "move") {
      uiState.legalDestinations = getLegalMoveDestinations(state, "playerA", unit.id, unit.leadingModelId);
    } else if (uiState.mode === "deploy") {
      uiState.legalDestinations = getLegalDeployDestinations(state, "playerA", unit.id, unit.leadingModelId);
    } else if (uiState.mode === "disengage") {
      uiState.legalDestinations = getLegalDisengageDestinations(state, "playerA", unit.id, unit.leadingModelId);
    } else if (uiState.mode === "run") {
      uiState.legalDestinations = getLegalRunDestinations(state, "playerA", unit.id, unit.leadingModelId);
    } else {
      uiState.legalDestinations = [];
    }
  } catch (_e) {
    uiState.legalDestinations = [];
  }
}

/* ── Auto-select next unactivated unit ── */
function autoSelectNextUnit() {
  const state = store.getState();
  if (state.activePlayer !== "playerA") return;
  const phase = state.phase;
  const allPlayerUnits = [
    ...state.players.playerA.battlefieldUnitIds,
    ...(phase === "movement" ? state.players.playerA.reserveUnitIds : [])
  ];
  for (const uid of allPlayerUnits) {
    const u = state.units[uid];
    if (!u) continue;
    const activated = phase === "movement" ? u.status.movementActivated
      : phase === "assault" ? u.status.assaultActivated
      : phase === "combat" ? u.status.combatActivated : true;
    if (!activated) {
      uiState.selectedUnitId = uid;
      return;
    }
  }
}

/* ── Phase checklist data ── */
function getPhaseChecklist() {
  const state = store.getState();
  if (state.activePlayer !== "playerA") return { total: 0, done: 0, remaining: [] };
  const phase = state.phase;
  const allIds = [
    ...state.players.playerA.battlefieldUnitIds,
    ...(phase === "movement" ? state.players.playerA.reserveUnitIds : [])
  ];
  let done = 0;
  const remaining = [];
  for (const uid of allIds) {
    const u = state.units[uid];
    if (!u) continue;
    const activated = phase === "movement" ? u.status.movementActivated
      : phase === "assault" ? u.status.assaultActivated
      : phase === "combat" ? u.status.combatActivated : true;
    if (activated) done++;
    else remaining.push(u.name);
  }
  return { total: allIds.length, done, remaining };
}

function getModeText() {
  if (uiState.lastError) return uiState.lastError;
  const state = store.getState();
  const unit = getSelectedUnit(state);
  const checklist = getPhaseChecklist();
  const progress = checklist.total > 0 ? ` [${checklist.done}/${checklist.total}]` : "";

  if (uiState.pendingPass) return "⚠ Press Pass again to confirm ending your phase. First to pass gets initiative next phase!";
  if (uiState.locked) return "⏳ Enemy is taking their turn…";
  if (state.activePlayer !== "playerA") return "Waiting for enemy turn…";

  if (uiState.mode === "deploy" && unit) {
    const avail = state.players.playerA.supplyPool - getPlayerSupply(state);
    return `Deploy ${unit.name} (${unit.currentSupplyValue} SP) — click a green square. Available supply: ${avail}.${progress}`;
  }
  if (uiState.mode === "move" && unit) {
    return `Move ${unit.name} — click a green square within ${unit.speed}" speed. Leader moves first, squad follows in coherency.${progress}`;
  }
  if (uiState.mode === "disengage" && unit) {
    return `Disengage ${unit.name} — models that can't clear engagement range are destroyed. Can't shoot/charge next phase unless supply exceeds engaged enemies.${progress}`;
  }
  if (uiState.mode === "run" && unit) {
    return `Run ${unit.name} — move up to ${unit.speed}" (same as normal move). Good for repositioning onto objectives when you can't attack.${progress}`;
  }
  if (uiState.mode === "declare_ranged" && unit) {
    const wpn = unit.rangedWeapons?.[0];
    const rangeInfo = wpn ? ` ${wpn.name}: ${wpn.rangeInches}" range, ${wpn.hitTarget}+ to hit.` : "";
    return `Ranged Attack — click a red-highlighted enemy in range.${rangeInfo} Attack resolves in Combat Phase.${progress}`;
  }
  if (uiState.mode === "declare_charge" && unit) {
    return `Charge — click an enemy within 8". In Combat Phase, ${unit.name} will pile in and fight in melee. Charge distance = Speed + 1D6.${progress}`;
  }

  // Phase-specific guidance when no mode is active
  if (state.phase === "movement") {
    if (checklist.remaining.length > 0) {
      return `Movement Phase: Deploy reserves or Move/Hold battlefield units. Tip: First to Pass gets initiative for Assault.${progress}`;
    }
    return `All units moved. Pass to start the Assault Phase.${progress}`;
  }
  if (state.phase === "assault") {
    if (checklist.remaining.length > 0) {
      return `Assault Phase: Declare Ranged Attacks, Charges, Run to reposition, or Hold. Attacks resolve in Combat Phase.${progress}`;
    }
    return `All units assigned. Pass to start Combat.${progress}`;
  }
  if (state.phase === "combat") {
    if (checklist.remaining.length > 0) {
      return `Combat Phase: Resolve queued attacks. Each attack rolls Hit → Armor → Damage. Select a unit with queued attacks.${progress}`;
    }
    return `All combat resolved. Pass to score objectives.${progress}`;
  }
  return `Select a unit to act.${progress}`;
}

function getPlayerSupply(state) {
  return state.players.playerA.battlefieldUnitIds.reduce((t, id) => t + state.units[id].currentSupplyValue, 0);
}

function rerender() {
  const handlers = {
    onUnitSelect: selectUnit,
    onBoardClick: handleBoardClick,
    onModelClick: handleModelClick,
    buildActionButtons,
    buildCardButtons,
    getModeText,
    getPhaseChecklist
  };
  renderAll(store.getState(), uiState, handlers);
  renderNotifications();
}

function showError(message) {
  uiState.lastError = message;
  pushToastNotification(message, "error");
  rerender();
  window.clearTimeout(showError.timer);
  showError.timer = window.setTimeout(() => {
    uiState.lastError = null;
    rerender();
  }, 4200);
}

function pushToastNotification(message, tone = "info", durationMs = 5200) {
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  uiState.notifications.push({ id, message, tone });
  if (uiState.notifications.length > 5) uiState.notifications.shift();
  rerender();
  window.setTimeout(() => {
    const index = uiState.notifications.findIndex(item => item.id === id);
    if (index >= 0) {
      uiState.notifications.splice(index, 1);
      rerender();
    }
  }, durationMs);
}

function renderNotifications() {
  const stack = document.getElementById("toastStack");
  if (!stack) return;
  stack.innerHTML = "";
  uiState.notifications.forEach(notification => {
    const toast = document.createElement("div");
    toast.className = `toast ${notification.tone}`;
    toast.innerHTML = `
      <div class="toast-meta">Battle Update</div>
      <div>${notification.message}</div>
    `;
    stack.appendChild(toast);
  });
}

function getNotificationTone(logEntryType) {
  if (["charge_declared", "combat_resolved", "phase_advanced", "round_scored", "game_won"].includes(logEntryType)) return "success";
  if (["disengage_failed", "invalid_action", "cannot_act", "coherency_warning"].includes(logEntryType)) return "warn";
  return "info";
}

function publishLogNotifications(state) {
  if (uiState.lastSeenLogCount >= state.log.length) return;
  const newEntries = state.log.slice(uiState.lastSeenLogCount);
  uiState.lastSeenLogCount = state.log.length;
  newEntries.forEach(entry => {
    pushToastNotification(entry.text, getNotificationTone(entry.type));
  });
}


function actionButton(label, className, onClick, disabled = false, disabledReason = "") {
  const button = document.createElement("button");
  button.className = `btn ${className}`;
  button.textContent = label;
  button.disabled = disabled;
  if (disabled && disabledReason) {
    button.title = disabledReason;
    button.setAttribute("aria-label", `${label}. Disabled: ${disabledReason}`);
  }
  button.addEventListener("click", onClick);
  return button;
}

function describeTacticalCard(card) {
  const modifiers = card.effect?.modifiers ?? [];
  const modifierText = modifiers.map(modifier => {
    const sign = modifier.operation === "add" && modifier.value > 0 ? "+" : "";
    return `${modifier.key} ${modifier.operation} ${sign}${modifier.value}`;
  }).join("; ");
  const timingText = card.effect?.timings?.join(", ") ?? "none";
  const duration = card.effect?.duration;
  const durationText = duration
    ? `${duration.type}${duration.phase ? `:${duration.phase}` : ""}${duration.eventType ? `:${duration.eventType}` : ""}`
    : "none";
  return `Phase: ${card.phase}. Target: ${card.target.replace(/_/g, " ")}. Modifiers: ${modifierText || "none"}. Timings: ${timingText}. Duration: ${durationText}.`;
}

function buildActionButtons() {
  const state = store.getState();
  const unit = getSelectedUnit(state);
  const buttons = [];

  if (!unit) return buttons;

  buttons.push(actionButton("Cancel", "secondary", () => {
    cancelCurrentInteraction(uiState);
    uiState.legalDestinations = [];
    rerender();
  }, !uiState.mode, "No active interaction to cancel."));

  if (state.activePlayer !== "playerA") return buttons;
  if (unit.owner !== "playerA") return buttons;

  const activatedInPhase = state.phase === "movement"
    ? unit.status.movementActivated
    : state.phase === "assault"
      ? unit.status.assaultActivated
      : state.phase === "combat"
        ? unit.status.combatActivated
        : false;

  if (activatedInPhase) return buttons;

  if (state.phase === "movement" && unit.status.location === "reserves") {
    buttons.unshift(actionButton("Deploy", "primary", () => {
      beginDeployInteraction(state, uiState, unit.id);
      computeLegalDestinations();
      rerender();
    }));
    return buttons;
  }

  buttons.unshift(actionButton("Hold", "secondary", () => {
    const result = store.dispatch({ type: "HOLD_UNIT", payload: { playerId: "playerA", unitId: unit.id } });
    if (!result.ok) showError(result.message);
    else { autoSelectNextUnit(); rerender(); }
  }));

  if (state.phase === "movement") {
    buttons.unshift(actionButton("Move", "primary", () => {
      beginMoveInteraction(state, uiState, unit.id);
      computeLegalDestinations();
      rerender();
    }, unit.status.engaged, "Unit is engaged. Disengage before moving."));

    buttons.unshift(actionButton("Disengage", "warn", () => {
      beginDisengageInteraction(state, uiState, unit.id);
      computeLegalDestinations();
      rerender();
    }, !unit.status.engaged, "Unit must be engaged to disengage."));

    return buttons;
  }

  if (state.phase === "assault") {
    buttons.unshift(actionButton("Charge", "warn", () => {
      beginDeclareChargeInteraction(uiState);
      uiState.legalDestinations = [];
      rerender();
    }, !(unit.meleeWeapons?.length) || unit.status.cannotChargeThisAssault, unit.status.cannotChargeThisAssault ? "This unit cannot charge again this assault phase." : "This unit has no melee weapons."));

    buttons.unshift(actionButton("Ranged", "secondary", () => {
      beginDeclareRangedInteraction(uiState);
      uiState.legalDestinations = [];
      rerender();
    }, !(unit.rangedWeapons?.length) || unit.status.cannotRangedAttackThisAssault, unit.status.cannotRangedAttackThisAssault ? "This unit has already made a ranged declaration this assault phase." : "This unit has no ranged weapons."));

    buttons.unshift(actionButton("Run", "primary", () => {
      beginRunInteraction(state, uiState, unit.id);
      computeLegalDestinations();
      rerender();
    }, unit.status.engaged, "Unit is engaged. Disengage before running."));
    return buttons;
  }

  if (state.phase === "combat") {
    const hasQueuedAttacks = state.combatQueue.some(entry =>
      ["ranged_attack", "charge_attack", "overwatch_attack"].includes(entry.type) && entry.attackerId === unit.id
    );

    buttons.unshift(actionButton("Resolve Combat", "primary", () => {
      const result = store.dispatch({
        type: "RESOLVE_COMBAT_UNIT",
        payload: { playerId: "playerA", unitId: unit.id }
      });
      if (!result.ok) showError(result.message);
      else { autoSelectNextUnit(); rerender(); }
    }, !hasQueuedAttacks, "No queued attacks for this unit."));
    return buttons;
  }

  return buttons;
}

function buildCardButtons() {
  const state = store.getState();
  const buttons = [];
  if (state.activePlayer !== "playerA") return buttons;
  if (state.players.playerA.hasPassedThisPhase) return buttons;

  const selectedUnit = getSelectedUnit(state);
  for (const cardEntry of state.players.playerA.hand ?? []) {
    const card = getTacticalCard(cardEntry.cardId);
    if (card.phase !== state.phase) continue;

    if (card.target === "friendly_battlefield_unit") {
      const hasValidSelection = selectedUnit && selectedUnit.owner === "playerA" && selectedUnit.status.location === "battlefield";
      const label = hasValidSelection ? `Play ${card.name} on ${selectedUnit.name}` : `Play ${card.name} (select a unit first)`;
      buttons.push(actionButton(label, "secondary", () => {
        const result = store.dispatch({
          type: "PLAY_CARD",
          payload: { playerId: "playerA", cardInstanceId: cardEntry.instanceId, targetUnitId: selectedUnit.id }
        });
        if (!result.ok) showError(result.message);
      }, !hasValidSelection, "Select a friendly battlefield unit first."));
      continue;
    }

    buttons.push(actionButton(`Play ${card.name}`, "secondary", () => {
      const result = store.dispatch({
        type: "PLAY_CARD",
        payload: { playerId: "playerA", cardInstanceId: cardEntry.instanceId, targetUnitId: null }
      });
      if (!result.ok) showError(result.message);
    }));
  }

  return buttons;
}



function computeDeployEntryPoint(state, point) {
  const side = state.deployment.entryEdges.playerA.side;
  if (side === "west") return { x: 0, y: point.y };
  if (side === "east") return { x: state.board.widthInches, y: point.y };
  if (side === "north") return { x: point.x, y: 0 };
  return { x: point.x, y: state.board.heightInches };
}

function canDeepStrike(unit) {
  return unit.abilities?.includes("deep_strike");
}

function maybeSnapPoint(state, point) {
  if (!state.rules?.gridMode) return point;
  return snapPointToGrid(point, state.board);
}

function handleBoardClick(point) {
  // Cancel pending pass on any board click
  if (uiState.pendingPass) {
    uiState.pendingPass = false;
    rerender();
    return;
  }

  const state = store.getState();
  const snappedPoint = maybeSnapPoint(state, point);
  const unit = getSelectedUnit(state);
  if (!unit || state.activePlayer !== "playerA") return;

  if (uiState.mode === "deploy") {
    const entryPoint = canDeepStrike(unit) ? snappedPoint : computeDeployEntryPoint(state, snappedPoint);
    const path = canDeepStrike(unit) ? [entryPoint, entryPoint] : [entryPoint, snappedPoint];
    const result = store.dispatch({
      type: "DEPLOY_UNIT",
      payload: {
        playerId: "playerA", unitId: unit.id, leadingModelId: unit.leadingModelId,
        entryPoint, path, modelPlacements: autoArrangeModels(state, unit.id, snappedPoint)
      }
    });
    if (!result.ok) return showError(result.message);
    cancelCurrentInteraction(uiState);
    uiState.legalDestinations = [];
    autoSelectNextUnit();
    rerender();
    return;
  }

  if (uiState.mode === "move") {
    const leader = unit.models[unit.leadingModelId];
    const path = [{ x: leader.x, y: leader.y }, snappedPoint];
    const result = store.dispatch({
      type: "MOVE_UNIT",
      payload: {
        playerId: "playerA", unitId: unit.id, leadingModelId: unit.leadingModelId,
        path, modelPlacements: autoArrangeModels(state, unit.id, snappedPoint)
      }
    });
    if (!result.ok) return showError(result.message);
    cancelCurrentInteraction(uiState);
    uiState.legalDestinations = [];
    autoSelectNextUnit();
    rerender();
    return;
  }

  if (uiState.mode === "run") {
    const leader = unit.models[unit.leadingModelId];
    const path = [{ x: leader.x, y: leader.y }, snappedPoint];
    const result = store.dispatch({
      type: "RUN_UNIT",
      payload: {
        playerId: "playerA", unitId: unit.id, leadingModelId: unit.leadingModelId,
        path, modelPlacements: autoArrangeModels(state, unit.id, snappedPoint)
      }
    });
    if (!result.ok) return showError(result.message);
    cancelCurrentInteraction(uiState);
    uiState.legalDestinations = [];
    autoSelectNextUnit();
    rerender();
    return;
  }

  if (uiState.mode === "disengage") {
    const leader = unit.models[unit.leadingModelId];
    const path = [{ x: leader.x, y: leader.y }, snappedPoint];
    const result = store.dispatch({
      type: "DISENGAGE_UNIT",
      payload: {
        playerId: "playerA", unitId: unit.id, leadingModelId: unit.leadingModelId,
        path, modelPlacements: autoArrangeModels(state, unit.id, snappedPoint)
      }
    });
    if (!result.ok) return showError(result.message);
    cancelCurrentInteraction(uiState);
    uiState.legalDestinations = [];
    autoSelectNextUnit();
    rerender();
  }
}


function handleModelClick(unitId) {
  // Cancel pending pass
  if (uiState.pendingPass) {
    uiState.pendingPass = false;
    rerender();
  }

  const state = store.getState();
  const selected = getSelectedUnit(state);
  const clickedUnit = state.units[unitId];

  if (uiState.mode === "declare_ranged" && selected && clickedUnit && selected.owner === "playerA" && clickedUnit.owner === "playerB") {
    const result = store.dispatch({
      type: "DECLARE_RANGED_ATTACK",
      payload: { playerId: "playerA", unitId: selected.id, targetId: clickedUnit.id }
    });
    if (!result.ok) { showError(result.message); return; }
    cancelCurrentInteraction(uiState);
    uiState.legalDestinations = [];
    autoSelectNextUnit();
    rerender();
    return;
  }

  if (uiState.mode === "declare_charge" && selected && clickedUnit && selected.owner === "playerA" && clickedUnit.owner === "playerB") {
    const result = store.dispatch({
      type: "DECLARE_CHARGE",
      payload: { playerId: "playerA", unitId: selected.id, targetId: clickedUnit.id }
    });
    if (!result.ok) { showError(result.message); return; }
    cancelCurrentInteraction(uiState);
    uiState.legalDestinations = [];
    autoSelectNextUnit();
    rerender();
    return;
  }

  selectUnit(unitId);
}

async function maybeRunBot() {
  if (uiState.locked) return;
  const state = store.getState();
  if (state.activePlayer !== "playerB") return;
  if (!["movement", "assault", "combat"].includes(state.phase)) return;
  uiState.locked = true;
  rerender();
  await new Promise(resolve => setTimeout(resolve, 420));
  const logBefore = store.getState().log.length;
  const result = await performBotTurn(store, "playerB");
  if (!result.ok) showError(result.message);
  uiState.locked = false;
  // After bot finishes its full turn cycle, auto-select for player
  if (store.getState().activePlayer === "playerA") {
    autoSelectNextUnit();
  }
  rerender();
  if (store.getState().activePlayer === "playerB" && ["movement", "assault", "combat"].includes(store.getState().phase)) {
    maybeRunBot();
  }
}

function resetGame() {
  uiState.selectedUnitId = null;
  uiState.legalDestinations = [];
  uiState.pendingPass = false;
  cancelCurrentInteraction(uiState);
  const nextState = buildInitialState();
  uiState.lastSeenLogCount = nextState.log.length;
  store.replaceState(nextState);
}

function sanitizeSaveFilenamePart(value) {
  return value.replace(/[^a-z0-9_-]/gi, "_");
}

function exportSaveFile() {
  const state = store.getState();
  const payload = { version: 1, exportedAt: new Date().toISOString(), state };
  const content = JSON.stringify(payload, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `starcraft-grid-save-${sanitizeSaveFilenamePart(state.mission.id ?? "mission")}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  pushToastNotification("Save exported.", "success");
}

function isValidImportedState(nextState) {
  return Boolean(nextState && typeof nextState === "object" && nextState.board && nextState.players && nextState.units && Array.isArray(nextState.turnOrder));
}

function importSaveFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const importedState = parsed?.state ?? parsed;
      if (!isValidImportedState(importedState)) { showError("Invalid save file."); return; }
      uiState.selectedUnitId = null;
      uiState.legalDestinations = [];
      uiState.pendingPass = false;
      cancelCurrentInteraction(uiState);
      uiState.lastSeenLogCount = importedState.log?.length ?? 0;
      store.replaceState(importedState);
      document.getElementById("gridModeBtn").textContent = `Grid: ${store.getState().rules.gridMode ? "On" : "Off"}`;
      pushToastNotification("Save loaded.", "success");
    } catch (_error) {
      showError("Could not read this save file.");
    }
  };
  reader.onerror = () => showError("Failed to load save file.");
  reader.readAsText(file);
}

function controller() {
  return {
    onNewGame: resetGame,
    onToggleGridMode: () => {
      const state = store.getState();
      state.rules.gridMode = !state.rules.gridMode;
      document.getElementById("gridModeBtn").textContent = `Grid: ${state.rules.gridMode ? "On" : "Off"}`;
      rerender();
    },
    onExportSave: exportSaveFile,
    onImportSave: () => {
      const input = document.getElementById("importFileInput");
      if (!input) return;
      input.value = "";
      input.click();
    },
    onImportFileSelected: (event) => importSaveFile(event.target?.files?.[0]),
    onPass: () => {
      // Two-click pass confirmation
      if (!uiState.pendingPass) {
        uiState.pendingPass = true;
        rerender();
        // Auto-cancel after 3 seconds
        window.clearTimeout(controller._passTimer);
        controller._passTimer = window.setTimeout(() => {
          uiState.pendingPass = false;
          rerender();
        }, 3000);
        return;
      }
      uiState.pendingPass = false;
      const result = store.dispatch({ type: "PASS_PHASE", payload: { playerId: "playerA" } });
      if (!result.ok) showError(result.message);
    }
  };
}
controller._passTimer = null;


function updatePreviewFromPoint(point) {
  const state = store.getState();
  const snappedPoint = maybeSnapPoint(state, point);
  const unit = getSelectedUnit(state);
  if (!unit) return;
  if (uiState.mode === "deploy") {
    const entryPoint = canDeepStrike(unit) ? snappedPoint : computeDeployEntryPoint(state, snappedPoint);
    uiState.previewPath = { path: canDeepStrike(unit) ? [entryPoint, entryPoint] : [entryPoint, snappedPoint], state };
    uiState.previewUnit = { unitId: unit.id, leader: snappedPoint, placements: autoArrangeModels(state, unit.id, snappedPoint) };
  }
  if (uiState.mode === "move" || uiState.mode === "disengage" || uiState.mode === "run") {
    const leader = unit.models[unit.leadingModelId];
    uiState.previewPath = { path: [{ x: leader.x, y: leader.y }, snappedPoint], state };
    uiState.previewUnit = { unitId: unit.id, leader: snappedPoint, placements: autoArrangeModels(state, unit.id, snappedPoint) };
  }
}

function wirePreviewEvents() {
  const svg = document.getElementById("battlefield");
  svg.addEventListener("mousemove", event => {
    if (!uiState.mode) return;
    const point = screenToBoardPoint(svg, event.clientX, event.clientY);
    updatePreviewFromPoint(point);
    rerender();
  });
  svg.addEventListener("mouseleave", () => {
    if (!uiState.mode) return;
    uiState.previewPath = null;
    uiState.previewUnit = null;
    rerender();
  });
  // Touch support for mobile
  svg.addEventListener("touchmove", event => {
    if (!uiState.mode) return;
    const touch = event.touches[0];
    if (!touch) return;
    event.preventDefault();
    const point = screenToBoardPoint(svg, touch.clientX, touch.clientY);
    updatePreviewFromPoint(point);
    rerender();
  }, { passive: false });
}

/* ── Keyboard shortcuts ── */
function wireKeyboardShortcuts() {
  document.addEventListener("keydown", event => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;
    const state = store.getState();
    const unit = getSelectedUnit(state);

    if (event.key === "Escape") {
      if (uiState.pendingPass) { uiState.pendingPass = false; rerender(); return; }
      if (uiState.mode) { cancelCurrentInteraction(uiState); uiState.legalDestinations = []; rerender(); return; }
      uiState.selectedUnitId = null; rerender();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      // Cycle through unactivated units
      const phase = state.phase;
      const allIds = [
        ...state.players.playerA.reserveUnitIds,
        ...state.players.playerA.battlefieldUnitIds
      ];
      const currentIdx = allIds.indexOf(uiState.selectedUnitId);
      for (let i = 1; i <= allIds.length; i++) {
        const nextId = allIds[(currentIdx + i) % allIds.length];
        const u = state.units[nextId];
        if (!u) continue;
        const activated = phase === "movement" ? u.status.movementActivated
          : phase === "assault" ? u.status.assaultActivated
          : phase === "combat" ? u.status.combatActivated : true;
        if (!activated) { selectUnit(nextId); return; }
      }
      // If all activated, just cycle
      if (allIds.length) {
        selectUnit(allIds[(currentIdx + 1) % allIds.length]);
      }
      return;
    }

    // Quick action keys
    if (state.activePlayer === "playerA" && unit && unit.owner === "playerA") {
      if (event.key === "m" && state.phase === "movement" && !unit.status.engaged && unit.status.location === "battlefield") {
        beginMoveInteraction(state, uiState, unit.id); computeLegalDestinations(); rerender();
      }
      if (event.key === "d" && state.phase === "movement" && unit.status.location === "reserves") {
        beginDeployInteraction(state, uiState, unit.id); computeLegalDestinations(); rerender();
      }
      if (event.key === "h") {
        const result = store.dispatch({ type: "HOLD_UNIT", payload: { playerId: "playerA", unitId: unit.id } });
        if (!result.ok) showError(result.message);
        else { autoSelectNextUnit(); rerender(); }
      }
      if (event.key === "r" && state.phase === "assault" && !unit.status.engaged) {
        beginRunInteraction(state, uiState, unit.id); computeLegalDestinations(); rerender();
      }
    }
  });
}

function init() {
  store = createStore(buildInitialState());
  bindInputHandlers(store, controller());
  document.getElementById("gridModeBtn").textContent = `Grid: ${store.getState().rules.gridMode ? "On" : "Off"}`;
  uiState.lastSeenLogCount = store.getState().log.length;
  store.subscribe((state) => {
    publishLogNotifications(state);
    rerender();
    maybeRunBot();
  });
  autoSelectNextUnit();
  rerender();
  wirePreviewEvents();
  wireKeyboardShortcuts();
}

init();
