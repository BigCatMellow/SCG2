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
import { canBurrow, canHide } from "../engine/statuses.js";
import { getMeleeTargetSelection } from "../engine/combat.js";

const DEFAULT_SETUP = {
  missionId: "take_and_hold",
  deploymentId: "crossfire",
  firstPlayerMarkerHolder: "playerA",
  armyA: [
    { id: "swarm_kerrigan", templateId: "kerrigan" },
    { id: "swarm_raptor_t2", templateId: "raptor_t2" },
    { id: "swarm_roach_t3", templateId: "roach_t3" },
    { id: "swarm_zergling_t3", templateId: "zergling_t3" },
    { id: "swarm_zergling_t2", templateId: "zergling_t2" }
  ],
  armyB: [
    { id: "raiders_raynor", templateId: "jim_raynor" },
    { id: "raiders_marines_t2", templateId: "marine_t2" },
    { id: "raiders_marauder_1", templateId: "marauder_t1" },
    { id: "raiders_marauder_2", templateId: "marauder_t1" },
    { id: "raiders_marauder_3", templateId: "marauder_t1" },
    { id: "raiders_medic", templateId: "medic_t1" }
  ],
  tacticalCardsA: ["lair", "evolution_chamber", "roach_warren", "malignant_creep"],
  tacticalCardsB: ["barracks_proxy", "academy", "orbital_command"],
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
  pendingPass: false,
  storyModalQueue: [],
  activeStoryModal: null,
  pendingCombatChoice: null
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
  rerender();
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
  renderStoryModal();
  renderCombatChoiceModal();
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

function pushToastNotification(message, tone = "info", durationMs = 5200, options = {}) {
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  uiState.notifications.push({
    id,
    message,
    tone,
    prominent: Boolean(options.prominent),
    title: options.title ?? "Update"
  });
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
    toast.className = `toast ${notification.tone} ${notification.prominent ? "prominent" : ""}`;
    toast.innerHTML = `
      <div class="toast-meta">${notification.title}</div>
      <div>${notification.message}</div>
    `;
    stack.appendChild(toast);
  });
}

function getStoryModalConfig(entry) {
  if (entry.type === "combat") {
    return {
      tone: "combat",
      kicker: "Combat Result",
      title: "Attack Resolved"
    };
  }
  if (entry.type === "card") {
    return {
      tone: "action",
      kicker: "Tactical Card",
      title: "Card Played"
    };
  }
  if (entry.type === "action") {
    return {
      tone: "action",
      kicker: "Key Action",
      title: entry.text.includes("attempts a charge") ? "Charge Roll" : "Action Resolved"
    };
  }
  if (entry.type === "score") {
    return {
      tone: "score",
      kicker: "Scoring",
      title: "Objectives Updated"
    };
  }
  return {
    tone: "phase",
    kicker: "Phase Update",
    title: entry.text.includes("Round") ? "New Round" : "Phase Change"
  };
}

function queueStoryModal(entry, state) {
  const isCustom = Object.prototype.hasOwnProperty.call(entry, "body");
  const config = isCustom
    ? { tone: entry.tone, kicker: entry.kicker, title: entry.title }
    : getStoryModalConfig(entry);
  uiState.storyModalQueue.push({
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    entryType: entry.type ?? "custom",
    tone: config.tone,
    kicker: config.kicker,
    title: config.title,
    body: isCustom ? entry.body : entry.text,
    subtitle: entry.subtitle ?? `Round ${state.round} • ${state.phase[0].toUpperCase()}${state.phase.slice(1)} Phase`
  });
  if (!uiState.activeStoryModal) {
    uiState.activeStoryModal = uiState.storyModalQueue.shift();
  }
}

function dismissStoryModal() {
  if (!uiState.activeStoryModal) return;
  uiState.activeStoryModal = uiState.storyModalQueue.shift() ?? null;
  rerender();
  maybeRunBot();
}

function openCombatChoiceModal(selection) {
  uiState.pendingCombatChoice = selection;
  rerender();
}

function dismissCombatChoiceModal() {
  if (!uiState.pendingCombatChoice) return;
  uiState.pendingCombatChoice = null;
  rerender();
}

function resolveCombatForSelectedUnit(unitId) {
  const result = store.dispatch({
    type: "RESOLVE_COMBAT_UNIT",
    payload: { playerId: "playerA", unitId }
  });
  if (!result.ok) {
    showError(result.message);
    return;
  }
  uiState.pendingCombatChoice = null;
  autoSelectNextUnit();
  rerender();
}

function confirmCombatChoice(targetId) {
  const selection = uiState.pendingCombatChoice;
  if (!selection) return;
  const retargetResult = store.dispatch({
    type: "SET_CHARGE_PRIMARY_TARGET",
    payload: { playerId: "playerA", unitId: selection.unitId, targetId }
  });
  if (!retargetResult.ok) {
    showError(retargetResult.message);
    return;
  }
  resolveCombatForSelectedUnit(selection.unitId);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderStoryStat(label, value, accent = "") {
  return `<div class="story-stat ${accent}"><div class="story-stat-label">${escapeHtml(label)}</div><div class="story-stat-value">${escapeHtml(value)}</div></div>`;
}

function buildStoryBlock(text) {
  const combatMatch = text.match(/^(.*?) (attacks|fires overwatch at|charges) (.*?) with (.*?): (\d+) attacks, (\d+) hits(?: \(including (\d+) Precision\))?, (\d+) wounds(?:, Critical Hit (\d+) bypassed armour)?(?:, Surge (.*?) rolled (\d+) vs (.*?) -> (\d+) bypassed armour)?(?:, Dodge prevented (\d+) bypassed hits)?, (\d+) saves(?: \((cover)\))?(?:, (\d+) evade saves on (\d+)\+)?(?:, indirect fire without line of sight)?(?:, long range penalty applied)?(?:, Burst Fire \+(\d+))?(?:, Locked In \+(\d+))?(?:, Anti-Evade (\d+))?(?:, Pierce damage (\d+))?(?:, Concentrated Fire cap (\d+)(?: \(discarded (\d+) damage\))?)?(?:, Fighting Rank (\d+), Supporting Rank (\d+), Assigned Models (\d+)(?:, Primary Target Focus)?)?, (\d+) casualties\.$/);
  if (combatMatch) {
      const [, attacker, verb, target, weapon, attacks, hits, precisionApplied, wounds, criticalApplied, surgeDie, surgeRoll, surgeTags, surgeApplied, dodgePrevented, saves, cover, evadeSaved, evadeTarget, burstFireBonus, lockedInBonus, antiEvade, pierceDamage, concentratedFireCap, concentratedFireDiscarded, fightingRank, supportingRank, assignedModels, casualties] = combatMatch;
      const longRangeApplied = text.includes("long range penalty applied");
      const indirectFireApplied = text.includes("indirect fire without line of sight");
      const primaryTargetFocus = text.includes("Primary Target Focus");
      const actionLabel = verb === "fires overwatch at" ? "Overwatch" : verb === "charges" ? "Charge Attack" : "Ranged Attack";
      return `
        <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> resolved a ${escapeHtml(actionLabel.toLowerCase())} into <strong>${escapeHtml(target)}</strong> with <strong>${escapeHtml(weapon)}</strong>.</div>
        <div class="story-stat-grid">
          ${renderStoryStat("Attacks", attacks)}
          ${renderStoryStat("Hits", hits)}
          ${precisionApplied ? renderStoryStat("Precision", precisionApplied, "success") : ""}
          ${renderStoryStat("Wounds", wounds)}
          ${criticalApplied ? renderStoryStat("Crit", criticalApplied, "impact") : ""}
          ${surgeApplied ? renderStoryStat("Surge", surgeApplied, Number(surgeApplied) > 0 ? "impact" : "") : ""}
          ${burstFireBonus ? renderStoryStat("Burst", burstFireBonus, "success") : ""}
          ${lockedInBonus ? renderStoryStat("Locked In", lockedInBonus, "success") : ""}
          ${fightingRank ? renderStoryStat("Fight Rank", fightingRank, "success") : ""}
          ${supportingRank ? renderStoryStat("Support", supportingRank, "success") : ""}
          ${assignedModels ? renderStoryStat("Assigned", assignedModels, "success") : ""}
          ${dodgePrevented ? renderStoryStat("Dodge", dodgePrevented, "success") : ""}
          ${renderStoryStat("Saves", saves)}
          ${evadeSaved ? renderStoryStat("Evade", evadeSaved, "success") : ""}
          ${renderStoryStat("Casualties", casualties, Number(casualties) > 0 ? "impact" : "")}
        </div>
        <div class="story-note-row">
          <span class="story-chip">${escapeHtml(actionLabel)}</span>
          ${criticalApplied ? `<span class="story-chip">Critical Hit bypassed ${escapeHtml(criticalApplied)}</span>` : ""}
          ${surgeApplied ? `<span class="story-chip">Surge ${escapeHtml(surgeDie)} rolled ${escapeHtml(surgeRoll)} vs ${escapeHtml(surgeTags)}</span>` : ""}
          ${dodgePrevented ? `<span class="story-chip">Dodge cancelled ${escapeHtml(dodgePrevented)} bypass hits</span>` : ""}
          ${evadeSaved ? `<span class="story-chip">Evade ${escapeHtml(evadeSaved)} on ${escapeHtml(evadeTarget)}+</span>` : ""}
          ${indirectFireApplied ? '<span class="story-chip">Indirect Fire</span>' : ""}
          ${longRangeApplied ? '<span class="story-chip">Long Range Penalty</span>' : ""}
          ${burstFireBonus ? `<span class="story-chip">Burst Fire +${escapeHtml(burstFireBonus)}</span>` : ""}
          ${lockedInBonus ? `<span class="story-chip">Locked In +${escapeHtml(lockedInBonus)}</span>` : ""}
          ${fightingRank ? `<span class="story-chip">Fighting Rank ${escapeHtml(fightingRank)}</span>` : ""}
          ${supportingRank ? `<span class="story-chip">Supporting Rank ${escapeHtml(supportingRank)}</span>` : ""}
          ${assignedModels ? `<span class="story-chip">Assigned Models ${escapeHtml(assignedModels)}</span>` : ""}
          ${primaryTargetFocus ? '<span class="story-chip">Primary Target</span>' : ""}
          ${antiEvade ? `<span class="story-chip">Anti-Evade ${escapeHtml(antiEvade)}</span>` : ""}
          ${pierceDamage ? `<span class="story-chip">Pierce Damage ${escapeHtml(pierceDamage)}</span>` : ""}
          ${concentratedFireCap ? `<span class="story-chip">Concentrated Fire ${escapeHtml(concentratedFireCap)}${concentratedFireDiscarded ? `, discarded ${escapeHtml(concentratedFireDiscarded)}` : ""}</span>` : ""}
          ${cover ? '<span class="story-chip">Target in Cover</span>' : ""}
        </div>
      `;
    }

  const hiddenImpactMatch = text.match(/^(.*?) triggers Impact against (.*?), but the target stays hidden and avoids the collision\.$/);
  if (hiddenImpactMatch) {
    const [, attacker, target] = hiddenImpactMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(target)}</strong> stayed concealed and avoided <strong>${escapeHtml(attacker)}</strong>'s impact strike.</div>
      <div class="story-note-row">
        <span class="story-chip">Impact Negated</span>
        <span class="story-chip">Hidden Target</span>
      </div>
    `;
  }

  const impactMatch = text.match(/^(.*?) triggers Impact against (.*?): (\d+) impact dice, (\d+) impact hits, (\d+) saves, (\d+) casualties\.$/);
  if (impactMatch) {
    const [, attacker, target, attempts, hits, saves, casualties] = impactMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> crashed into <strong>${escapeHtml(target)}</strong> on the charge.</div>
      <div class="story-stat-grid">
        ${renderStoryStat("Impact Dice", attempts)}
        ${renderStoryStat("Impact Hits", hits)}
        ${renderStoryStat("Saves", saves)}
        ${renderStoryStat("Casualties", casualties, Number(casualties) > 0 ? "impact" : "")}
      </div>
      <div class="story-note-row">
        <span class="story-chip">Impact</span>
        <span class="story-chip">Damage 1</span>
      </div>
    `;
  }

  const chargeRollMatch = text.match(/^(.*?) attempts a charge on (.*?): distance ([\d.]+)", need (\d+)", rolled (\d+) \+ Speed (\d+) = (\d+)\. (Success|Failed) by (\d+)"\.$/);
  if (chargeRollMatch) {
    const [, attacker, target, distance, need, die, speed, total, resultWord, margin] = chargeRollMatch;
    const success = resultWord === "Success";
    return `
      <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> tried to reach <strong>${escapeHtml(target)}</strong>.</div>
      <div class="story-stat-grid">
        ${renderStoryStat("Distance", `${distance}"`)}
        ${renderStoryStat("Needed", `${need}"`)}
        ${renderStoryStat("Die", die)}
        ${renderStoryStat("Speed", speed)}
        ${renderStoryStat("Total", total, success ? "success" : "warning")}
      </div>
      <div class="story-outcome ${success ? "success" : "warning"}">${success ? `Charge succeeded by ${margin}".` : `Charge failed by ${margin}".`}</div>
    `;
  }

  const overwatchMatch = text.match(/^(.*?) sets Overwatch response against (.*?)\.$/);
  if (overwatchMatch) {
    const [, defender, attacker] = overwatchMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(defender)}</strong> has reacted to <strong>${escapeHtml(attacker)}</strong>.</div>
      <div class="story-outcome warning">An Overwatch attack is now queued and will resolve in Combat.</div>
    `;
  }

  const instantMatch = text.match(/^(.*?)'s (.*?) has Instant, so (.*?) cannot react with Overwatch\.$/);
  if (instantMatch) {
    const [, attacker, weapon, defender] = instantMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> struck first with <strong>${escapeHtml(weapon)}</strong>.</div>
      <div class="story-outcome success"><strong>${escapeHtml(defender)}</strong> loses the Overwatch reaction window because of Instant.</div>
      <div class="story-note-row">
        <span class="story-chip">Instant</span>
        <span class="story-chip">Overwatch Blocked</span>
      </div>
    `;
  }

  const rangedDeclMatch = text.match(/^(.*?) declares ranged attack on (.*?) for Combat\.$/);
  if (rangedDeclMatch) {
    const [, attacker, target] = rangedDeclMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> has targeted <strong>${escapeHtml(target)}</strong>.</div>
      <div class="story-outcome">That attack is locked into the Combat Phase queue.</div>
    `;
  }

  const chargeLockMatch = text.match(/^(.*?) locks in the charge and will fight (.*?) in Combat\.$/);
  if (chargeLockMatch) {
    const [, attacker, target] = chargeLockMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> will make a melee attack against <strong>${escapeHtml(target)}</strong>.</div>
      <div class="story-outcome success">The charge is confirmed and queued for Combat.</div>
    `;
  }

  const chargeFailMatch = text.match(/^(.*?) fails the charge and will not make a melee attack this round\.$/);
  if (chargeFailMatch) {
    const [, attacker] = chargeFailMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> did not get in.</div>
      <div class="story-outcome warning">No melee attack was queued from this charge attempt.</div>
    `;
  }

  const closeRanksMatch = text.match(/^(.*?) closes ranks and emerges from Burrowed formation(?: against (.*?))?\.$/);
  if (closeRanksMatch) {
    const [, unitName, targetName] = closeRanksMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(unitName)}</strong> surfaced and tightened formation${targetName ? ` before fighting <strong>${escapeHtml(targetName)}</strong>` : ""}.</div>
      <div class="story-outcome success">Burrowed and Hidden are removed, and the melee sequence continues above ground.</div>
      <div class="story-note-row">
        <span class="story-chip">Close Ranks</span>
        <span class="story-chip">Burrowed Removed</span>
      </div>
    `;
  }

  const noAssignedModelsMatch = text.match(/^(.*?) has no models assigned to (.*?) after target allocation and cannot make melee attacks\.$/);
  if (noAssignedModelsMatch) {
    const [, attacker, target] = noAssignedModelsMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(attacker)}</strong> could not put any fighting or supporting models into <strong>${escapeHtml(target)}</strong>.</div>
      <div class="story-outcome warning">That melee batch was skipped after target allocation.</div>
      <div class="story-note-row">
        <span class="story-chip">Target Allocation</span>
        <span class="story-chip">No Assigned Models</span>
      </div>
    `;
  }

  const cardMatch = text.match(/^(Blue|Red) plays (.*?)(?: on (.*?))?\.$/);
  if (cardMatch) {
    const [, player, cardName, target] = cardMatch;
    return `
      <div class="story-lead"><strong>${escapeHtml(player)}</strong> used <strong>${escapeHtml(cardName)}</strong>${target ? ` on <strong>${escapeHtml(target)}</strong>` : ""}.</div>
      <div class="story-outcome">Its effect is now active for the relevant timing window.</div>
    `;
  }

  const sentences = text.split(/(?<=\.)\s+/).filter(Boolean);
  return sentences.map(sentence => `<div class="story-paragraph">${escapeHtml(sentence)}</div>`).join("");
}

function buildStoryModalBody(modal) {
  const blocks = String(modal.body).split("\n").filter(Boolean);
  if (blocks.length <= 1) return buildStoryBlock(blocks[0] ?? "");
  return blocks.map((block, index) => `<div class="story-sequence-block ${index > 0 ? "stacked" : ""}">${buildStoryBlock(block)}</div>`).join("");
}

function renderStoryModal() {
  const root = document.getElementById("storyModalRoot");
  if (!root) return;
  root.className = uiState.activeStoryModal ? "story-modal-root active" : "story-modal-root";
  if (!uiState.activeStoryModal) {
    root.innerHTML = "";
    return;
  }

  const modal = uiState.activeStoryModal;
  root.innerHTML = `
    <div class="story-modal-backdrop"></div>
    <section class="story-modal ${modal.tone}" role="dialog" aria-modal="true" aria-labelledby="storyModalTitle">
      <div class="story-modal-header">
        <div>
          <div class="story-modal-kicker">${modal.kicker}</div>
          <div id="storyModalTitle" class="story-modal-title">${modal.title}</div>
          <div class="story-modal-subtitle">${modal.subtitle}</div>
        </div>
      </div>
      <div class="story-modal-body">
        ${buildStoryModalBody(modal)}
      </div>
      <div class="story-modal-footer">
        <div class="story-modal-queue">${uiState.storyModalQueue.length ? `${uiState.storyModalQueue.length} more update(s) queued.` : "No more queued updates."}</div>
        <button id="storyModalCloseBtn" class="btn primary story-modal-close">Continue</button>
      </div>
    </section>
  `;

  root.querySelector(".story-modal-backdrop")?.addEventListener("click", dismissStoryModal);
  root.querySelector("#storyModalCloseBtn")?.addEventListener("click", dismissStoryModal);
}

function renderCombatChoiceModal() {
  const root = document.getElementById("combatChoiceRoot");
  if (!root) return;

  const selection = uiState.pendingCombatChoice;
  if (!selection) {
    root.className = "combat-choice-root";
    root.innerHTML = "";
    return;
  }

  root.className = "combat-choice-root active";
  root.innerHTML = `
    <div class="combat-choice-backdrop"></div>
    <section class="combat-choice-modal" role="dialog" aria-modal="true" aria-labelledby="combatChoiceTitle">
      <header class="combat-choice-header">
        <div>
          <div class="combat-choice-kicker">Melee Target Choice</div>
          <h2 id="combatChoiceTitle" class="combat-choice-title">Choose where ${escapeHtml(selection.attackerName)} pushes hardest.</h2>
          <div class="combat-choice-subtitle">This charge is tied into multiple enemies. Pick the unit that gets primary target focus before combat resolves.</div>
        </div>
      </header>
      <div class="combat-choice-body">
        ${selection.options.map(option => `
          <button class="combat-choice-option ${option.isCurrentPrimary ? "current" : ""}" data-target-id="${escapeHtml(option.targetId)}">
            <div class="combat-choice-option-header">
              <div>
                <div class="combat-choice-option-name">${escapeHtml(option.name)}</div>
                <div class="combat-choice-option-meta">${option.isCurrentPrimary ? "Current focus" : "Available focus"}</div>
              </div>
              <span class="combat-choice-chip">${option.assignedModels} assigned</span>
            </div>
            <div class="combat-choice-stats">
              ${renderStoryStat("Fighting Rank", option.fightingRank)}
              ${renderStoryStat("Supporting Rank", option.supportingRank)}
              ${renderStoryStat("Assigned", option.assignedModels, option.isCurrentPrimary ? "success" : "")}
            </div>
          </button>
        `).join("")}
      </div>
      <footer class="combat-choice-footer">
        <div class="combat-choice-footer-copy">Pick a target to resolve this melee sequence.</div>
        <button id="combatChoiceCancelBtn" class="btn secondary">Cancel</button>
      </footer>
    </section>
  `;

  root.querySelector(".combat-choice-backdrop")?.addEventListener("click", dismissCombatChoiceModal);
  root.querySelector("#combatChoiceCancelBtn")?.addEventListener("click", dismissCombatChoiceModal);
  root.querySelectorAll("[data-target-id]").forEach(button => {
    button.addEventListener("click", () => confirmCombatChoice(button.getAttribute("data-target-id")));
  });
}

function getNotificationTone(logEntryType) {
  if (["charge_declared", "combat_resolved", "phase_advanced", "round_scored", "game_won"].includes(logEntryType)) return "success";
  if (["disengage_failed", "invalid_action", "cannot_act", "coherency_warning"].includes(logEntryType)) return "warn";
  return "info";
}

function shouldUseModalForEntry(entry) {
  if (["combat", "phase", "score", "card"].includes(entry.type)) return true;
  if (entry.type !== "action") return false;
  return [
    "attempts a charge",
    "declares ranged attack",
    "has Instant",
    "closes ranks",
    "sets Overwatch",
    "locks in the charge",
    "fails the charge"
  ].some(fragment => entry.text.includes(fragment));
}

function isChargeSequenceAction(entry) {
  return entry.type === "action" && [
    "has Instant",
    "closes ranks",
    "sets Overwatch",
    "attempts a charge",
    "locks in the charge",
    "fails the charge"
  ].some(fragment => entry.text.includes(fragment));
}

function buildModalFromEntries(entries, state, title, kicker, tone) {
  queueStoryModal({
    type: "custom",
    tone,
    kicker,
    title,
    body: entries.map(entry => entry.text).join("\n"),
    subtitle: `Round ${state.round} • ${state.phase[0].toUpperCase()}${state.phase.slice(1)} Phase`
  }, state);
}

function getToastConfig(entry) {
  if (entry.type === "action") {
    if (entry.text.includes("deploys")) return { title: "Deployment", prominent: true, durationMs: 7000 };
    if (entry.text.includes("moves")) return { title: "Movement", prominent: true, durationMs: 6500 };
    if (entry.text.includes("runs")) return { title: "Run", prominent: true, durationMs: 6500 };
    if (entry.text.includes("disengages")) return { title: "Disengage", prominent: true, durationMs: 7000 };
    if (entry.text.includes("holds position")) return { title: "Hold", prominent: false, durationMs: 4500 };
    if (entry.text.includes("declares ranged attack")) return { title: "Attack Declared", prominent: true, durationMs: 6500 };
    if (entry.text.includes("sets Overwatch")) return { title: "Overwatch", prominent: true, durationMs: 6500 };
    if (entry.text.includes("locks in the charge")) return { title: "Charge Confirmed", prominent: true, durationMs: 6500 };
    if (entry.text.includes("fails the charge")) return { title: "Charge Failed", prominent: true, durationMs: 7000 };
  }
  if (entry.type === "info") {
    return { title: "Battlefield", prominent: false, durationMs: 5200 };
  }
  return { title: "Update", prominent: false, durationMs: 5200 };
}

function publishLogNotifications(state) {
  if (uiState.lastSeenLogCount >= state.log.length) return;
  const newEntries = state.log.slice(uiState.lastSeenLogCount);
  uiState.lastSeenLogCount = state.log.length;
  for (let index = 0; index < newEntries.length; index += 1) {
    const entry = newEntries[index];

    if (isChargeSequenceAction(entry)) {
      const grouped = [entry];
      while (index + 1 < newEntries.length && isChargeSequenceAction(newEntries[index + 1])) {
        grouped.push(newEntries[index + 1]);
        index += 1;
      }
      buildModalFromEntries(grouped, state, "Charge Sequence", "Reaction Window", "action");
      continue;
    }

    if (entry.type === "combat") {
      const grouped = [entry];
      while (index + 1 < newEntries.length && newEntries[index + 1].type === "combat" && grouped.length < 3) {
        grouped.push(newEntries[index + 1]);
        index += 1;
      }
      buildModalFromEntries(grouped, state, "Combat Sequence", "Combat Result", "combat");
      continue;
    }

    if (shouldUseModalForEntry(entry)) {
      queueStoryModal(entry, state);
      continue;
    }
    const toastConfig = getToastConfig(entry);
    pushToastNotification(entry.text, getNotificationTone(entry.type), toastConfig.durationMs, {
      prominent: toastConfig.prominent,
      title: toastConfig.title
    });
  }
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
    if (canBurrow(unit)) {
      buttons.unshift(actionButton(unit.status.burrowed ? "Emerge" : "Burrow", "secondary", () => {
        const result = store.dispatch({ type: "TOGGLE_BURROW", payload: { playerId: "playerA", unitId: unit.id } });
        if (!result.ok) showError(result.message);
        else { autoSelectNextUnit(); rerender(); }
      }, unit.status.engaged, "Unit must be unengaged to burrow or emerge."));
    }

    if (canHide(unit)) {
      buttons.unshift(actionButton(unit.status.hidden ? "Reveal" : "Hide", "secondary", () => {
        const result = store.dispatch({ type: "TOGGLE_HIDDEN", payload: { playerId: "playerA", unitId: unit.id } });
        if (!result.ok) showError(result.message);
        else { autoSelectNextUnit(); rerender(); }
      }, unit.status.engaged || unit.status.burrowed, unit.status.burrowed ? "Burrowed units are already Hidden." : "Unit must be unengaged to hide or reveal."));
    }

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
    if (canBurrow(unit)) {
      buttons.unshift(actionButton(unit.status.burrowed ? "Emerge" : "Burrow", "secondary", () => {
        const result = store.dispatch({ type: "TOGGLE_BURROW", payload: { playerId: "playerA", unitId: unit.id } });
        if (!result.ok) showError(result.message);
        else { autoSelectNextUnit(); rerender(); }
      }, unit.status.engaged, "Unit must be unengaged to burrow or emerge."));
    }

    if (canHide(unit)) {
      buttons.unshift(actionButton(unit.status.hidden ? "Reveal" : "Hide", "secondary", () => {
        const result = store.dispatch({ type: "TOGGLE_HIDDEN", payload: { playerId: "playerA", unitId: unit.id } });
        if (!result.ok) showError(result.message);
        else { autoSelectNextUnit(); rerender(); }
      }, unit.status.engaged || unit.status.burrowed, unit.status.burrowed ? "Burrowed units are already Hidden." : "Unit must be unengaged to hide or reveal."));
    }

    buttons.unshift(actionButton("Charge", "warn", () => {
      beginDeclareChargeInteraction(uiState);
      uiState.legalDestinations = [];
      rerender();
    }, !(unit.meleeWeapons?.length) || unit.status.cannotChargeThisAssault || unit.status.burrowed, unit.status.burrowed ? "Burrowed units cannot charge." : unit.status.cannotChargeThisAssault ? "This unit cannot charge again this assault phase." : "This unit has no melee weapons."));

    buttons.unshift(actionButton("Ranged", "secondary", () => {
      beginDeclareRangedInteraction(uiState);
      uiState.legalDestinations = [];
      rerender();
    }, !(unit.rangedWeapons?.length) || unit.status.cannotRangedAttackThisAssault || unit.status.burrowed, unit.status.burrowed ? "Burrowed units cannot make ranged declarations." : unit.status.cannotRangedAttackThisAssault ? "This unit has already made a ranged declaration this assault phase." : "This unit has no ranged weapons."));

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
      const selection = getMeleeTargetSelection(state, unit.id);
      if (selection) {
        openCombatChoiceModal(selection);
        return;
      }
      resolveCombatForSelectedUnit(unit.id);
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
  if (uiState.activeStoryModal || uiState.storyModalQueue.length) return;
  if (uiState.pendingCombatChoice) return;
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
  uiState.storyModalQueue = [];
  uiState.activeStoryModal = null;
  uiState.pendingCombatChoice = null;
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
      uiState.storyModalQueue = [];
      uiState.activeStoryModal = null;
      uiState.pendingCombatChoice = null;
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
}

/* ── Keyboard shortcuts ── */
function wireKeyboardShortcuts() {
  document.addEventListener("keydown", event => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;
    if (uiState.activeStoryModal && ["Escape", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      dismissStoryModal();
      return;
    }
    if (uiState.pendingCombatChoice) {
      if (event.key === "Escape") {
        event.preventDefault();
        dismissCombatChoiceModal();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const targetId = uiState.pendingCombatChoice.currentPrimaryTargetId
          ?? uiState.pendingCombatChoice.options[0]?.targetId;
        if (targetId) confirmCombatChoice(targetId);
        return;
      }
    }
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
