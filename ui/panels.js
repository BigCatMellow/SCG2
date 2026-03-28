import { getObjectiveControlSnapshot } from "../engine/objectives.js";
import { getTacticalCard } from "../data/tactical_cards.js";

function formatPlayerName(playerId) {
  return playerId === "playerA" ? "Blue" : "Red";
}

function formatSupply(pool) {
  return pool === Infinity ? "∞" : String(pool);
}

function formatControl(result) {
  if (!result.controller) return result.contested ? "Contested" : "Uncontrolled";
  return `${formatPlayerName(result.controller)} (${result.playerASupply}-${result.playerBSupply})`;
}

function renderStatePill(label, value, extraClass = "") {
  return `
    <div class="state-pill ${extraClass}">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    </div>
  `;
}

function titleCase(value) {
  return value.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase());
}

/* ══════════════════════════════════════════════════════════════
   CARD DESCRIPTIONS — human-readable effect text
   ══════════════════════════════════════════════════════════════ */

function describeCardEffect(card) {
  const mods = card.effect?.modifiers ?? [];
  const parts = [];
  for (const mod of mods) {
    const sign = mod.value > 0 ? "+" : "";
    if (mod.key === "unit.speed") {
      parts.push(`${sign}${mod.value} Speed`);
    } else if (mod.key === "weapon.hitTarget") {
      // Lower hit target = easier to hit, so -1 to hitTarget is a buff
      parts.push(mod.value < 0 ? `+${Math.abs(mod.value)} to Hit (easier)` : `-${mod.value} to Hit (harder)`);
    } else if (mod.key === "weapon.shotsPerModel" || mod.key === "weapon.attacksPerModel") {
      parts.push(`${sign}${mod.value} attacks per model`);
    } else {
      parts.push(`${mod.key} ${sign}${mod.value}`);
    }
  }

  const effectText = parts.join(", ") || "No modifiers";

  // Duration
  const dur = card.effect?.duration;
  let durationText = "";
  if (dur?.type === "phase_starts") {
    durationText = `until ${titleCase(dur.phase)} Phase`;
  } else if (dur?.type === "events" && dur.eventType === "combat_attack_resolved") {
    durationText = "for next attack";
  } else if (dur?.type === "events" && dur.eventType === "unit_moved") {
    durationText = "for next move";
  } else if (dur) {
    durationText = `duration: ${dur.type}`;
  }

  // Phase
  const phaseText = `Play during ${titleCase(card.phase)} Phase`;

  // Target
  const targetText = card.target === "friendly_battlefield_unit"
    ? "Target: friendly unit on battlefield"
    : "Target: global";

  return { effectText, durationText, phaseText, targetText };
}

/* ══════════════════════════════════════════════════════════════
   WEAPON FORMATTING — show what matters for decisions
   ══════════════════════════════════════════════════════════════ */

function formatWeaponFull(weapon) {
  const attacks = weapon.attacksPerModel ?? weapon.shotsPerModel ?? 1;
  const range = weapon.rangeInches != null ? `${weapon.rangeInches}"` : "Melee";
  const hit = weapon.hitTarget ?? "?";
  const dmg = weapon.damage ?? 1;
  const ap = weapon.armorPenetration ?? 0;
  const keywords = weapon.keywords?.length ? weapon.keywords.map(k => k.replace(/_/g, " ")).join(", ") : "";
  const surge = weapon.surge ? `${weapon.surge.tags.join(", ")} / ${weapon.surge.dice}` : "";
  const longRange = weapon.longRangeInches ?? weapon.longRange ?? null;
  const precision = weapon.precision ? `Precision ${weapon.precision}` : "";
  const criticalHit = weapon.criticalHit ? `Critical ${weapon.criticalHit}` : "";
  const antiEvade = weapon.antiEvade ? `Anti-Evade ${weapon.antiEvade}` : "";
  const indirectFire = weapon.indirectFire ? "Indirect Fire" : "";
  const burstFireValue = weapon.burstFire
    ? (typeof weapon.burstFire === "number"
      ? { rangeInches: weapon.rangeInches, bonusAttacks: weapon.burstFire }
      : { rangeInches: weapon.burstFire.rangeInches ?? weapon.burstFire.range ?? weapon.rangeInches, bonusAttacks: weapon.burstFire.bonusAttacks ?? weapon.burstFire.attacks ?? weapon.burstFire.value ?? 0 })
    : null;
  const burstFire = burstFireValue ? `Burst Fire ${burstFireValue.rangeInches ?? "?"}" +${burstFireValue.bonusAttacks}` : "";
  const lockedIn = weapon.lockedIn ? `Locked In ${weapon.lockedIn}` : "";
  const concentratedFire = weapon.concentratedFire ? `Concentrated Fire ${weapon.concentratedFire}` : "";
  const bulky = weapon.bulky || weapon.keywords?.includes("bulky") ? "Bulky" : "";
  const instant = weapon.instant || weapon.keywords?.includes("instant") ? "Instant" : "";
  const pierce = weapon.pierce
    ? (Array.isArray(weapon.pierce) ? weapon.pierce : [weapon.pierce]).map(entry => `Pierce ${entry.tag} ${entry.damage}`).join(", ")
    : "";
  const extraRules = [precision, criticalHit, antiEvade, burstFire, lockedIn, concentratedFire, bulky, instant, pierce, indirectFire, longRange ? `Long Range ${longRange}"` : ""].filter(Boolean).join(", ");

  return `
    <div class="weapon-stat-grid">
      <div class="weapon-stat"><span class="ws-label">Range</span><span class="ws-val">${range}</span></div>
      <div class="weapon-stat"><span class="ws-label">Attacks</span><span class="ws-val">${attacks}/model</span></div>
      <div class="weapon-stat"><span class="ws-label">Hit</span><span class="ws-val">${hit}+</span></div>
      ${surge ? `<div class="weapon-stat"><span class="ws-label">Surge</span><span class="ws-val">${surge}</span></div>` : ""}
      <div class="weapon-stat"><span class="ws-label">Dmg</span><span class="ws-val">${dmg}</span></div>
      ${ap ? `<div class="weapon-stat"><span class="ws-label">AP</span><span class="ws-val">-${ap}</span></div>` : ""}
    </div>
    ${extraRules ? `<div class="weapon-keywords">${extraRules}</div>` : ""}
    ${keywords ? `<div class="weapon-keywords">${keywords}</div>` : ""}
  `;
}

function formatWeaponOneLine(weapon) {
  const attacks = weapon.attacksPerModel ?? weapon.shotsPerModel ?? 1;
  const range = weapon.rangeInches != null ? `${weapon.rangeInches}"` : "Melee";
  const surge = weapon.surge ? `, Surge ${weapon.surge.tags.join("/")} ${weapon.surge.dice}` : "";
  const burstFireValue = weapon.burstFire
    ? (typeof weapon.burstFire === "number"
      ? { rangeInches: weapon.rangeInches, bonusAttacks: weapon.burstFire }
      : { rangeInches: weapon.burstFire.rangeInches ?? weapon.burstFire.range ?? weapon.rangeInches, bonusAttacks: weapon.burstFire.bonusAttacks ?? weapon.burstFire.attacks ?? weapon.burstFire.value ?? 0 })
    : null;
  const extras = [];
  if (weapon.precision) extras.push(`Precision ${weapon.precision}`);
  if (weapon.criticalHit) extras.push(`Crit ${weapon.criticalHit}`);
  if (weapon.antiEvade) extras.push(`Anti-Evade ${weapon.antiEvade}`);
  if (burstFireValue) extras.push(`Burst ${burstFireValue.rangeInches ?? "?"}" +${burstFireValue.bonusAttacks}`);
  if (weapon.lockedIn) extras.push(`Locked In ${weapon.lockedIn}`);
  if (weapon.concentratedFire) extras.push(`Concentrated ${weapon.concentratedFire}`);
  if (weapon.bulky || weapon.keywords?.includes("bulky")) extras.push("Bulky");
  if (weapon.instant || weapon.keywords?.includes("instant")) extras.push("Instant");
  if (weapon.indirectFire) extras.push("Indirect");
  if (weapon.longRangeInches ?? weapon.longRange) extras.push(`Long ${weapon.longRangeInches ?? weapon.longRange}"`);
  if (weapon.pierce) {
    const entries = Array.isArray(weapon.pierce) ? weapon.pierce : [weapon.pierce];
    extras.push(entries.map(entry => `Pierce ${entry.tag} ${entry.damage}`).join("/"));
  }
  return `${range} range, ${attacks} atk/model, ${weapon.hitTarget ?? "?"}+ to hit, ${weapon.damage ?? 1} dmg${surge}${extras.length ? `, ${extras.join(", ")}` : ""}`;
}

/* ══════════════════════════════════════════════════════════════
   UNIT CARDS
   ══════════════════════════════════════════════════════════════ */

function buildUnitCard(unit, selectedUnitId, onClick, state) {
  const div = document.createElement("div");
  const phase = state?.phase;
  const activated = phase === "movement" ? unit.status.movementActivated
    : phase === "assault" ? unit.status.assaultActivated
    : phase === "combat" ? unit.status.combatActivated : false;
  const isOwn = unit.owner === "playerA";
  const needsAction = isOwn && !activated && state?.activePlayer === "playerA";

  div.className = `unit-card ${selectedUnitId === unit.id ? "selected" : ""} ${needsAction ? "needs-action" : ""} ${activated ? "activated" : ""}`;
  div.addEventListener("click", () => onClick(unit.id));

  const aliveCount = unit.modelIds.filter(id => unit.models[id].alive).length;
  const totalCount = unit.modelIds.length;

  // Quick weapon summary
  const rangedInfo = unit.rangedWeapons?.length
    ? unit.rangedWeapons.map(w => `${w.rangeInches ?? "?"}" ${w.hitTarget}+`).join(", ")
    : "";
  const meleeInfo = unit.meleeWeapons?.length
    ? unit.meleeWeapons.map(w => `${w.hitTarget}+ melee`).join(", ")
    : "";
  const weaponSummary = [rangedInfo, meleeInfo].filter(Boolean).join(" | ");

  div.innerHTML = `
    <div class="unit-card-row">
      <span class="unit-name">${unit.name}</span>
      <span class="phase-chip">${unit.currentSupplyValue} SP</span>
    </div>
    <div class="unit-card-stats">
      <span>Spd ${unit.speed}</span>
      <span>Models ${aliveCount}/${totalCount}</span>
      ${weaponSummary ? `<span>${weaponSummary}</span>` : ""}
    </div>
    <div class="badge-row">
      ${unit.status.engaged ? '<span class="badge warn">Engaged</span>' : ''}
      ${unit.status.outOfCoherency ? '<span class="badge warn">Coherency!</span>' : ''}
      ${needsAction ? '<span class="badge action-needed">Needs Action</span>' : ''}
      ${activated ? '<span class="badge good">Done</span>' : ''}
    </div>
  `;
  return div;
}

/* ══════════════════════════════════════════════════════════════
   TOP PANEL
   ══════════════════════════════════════════════════════════════ */

export function renderTopPanel(state) {
  const battleState = document.getElementById("battleState");
  const playerSupply = `${getPlayerSupply(state, "playerA")} / ${formatSupply(state.players.playerA.supplyPool)}`;
  const enemySupply = `${getPlayerSupply(state, "playerB")} / ${formatSupply(state.players.playerB.supplyPool)}`;
  const roundLimit = state.mission.pacing?.roundLimit ?? state.mission.roundLimit;
  battleState.innerHTML = `
    ${renderStatePill("Round", `${state.round} / ${roundLimit}`)}
    ${renderStatePill("Phase", titleCase(state.phase), "phase-pill")}
    ${renderStatePill("Blue VP", state.players.playerA.vp, "vp-blue")}
    ${renderStatePill("Red VP", state.players.playerB.vp, "vp-red")}
    ${renderStatePill("Queued Attacks", state.combatQueue.length)}
    ${state.winner ? renderStatePill("Winner", formatPlayerName(state.winner), "winner-pill") : renderStatePill("Mission", state.mission.name)}
  `;

  const objectiveControl = document.getElementById("objectiveControl");
  const snapshot = getObjectiveControlSnapshot(state);
  objectiveControl.innerHTML = "";
  for (const objective of state.deployment.missionMarkers) {
    const result = snapshot[objective.id];
    const line = document.createElement("div");
    line.className = "objective-control-line";
    line.innerHTML = `<span>${objective.id.toUpperCase()}</span><span>${formatControl(result)}</span>`;
    objectiveControl.appendChild(line);
  }

  const roundSummary = document.getElementById("roundSummary");
  roundSummary.innerHTML = "";
  if (!state.lastRoundSummary) {
    roundSummary.innerHTML = '<div class="empty-state">No completed round yet.</div>';
  } else {
    const scoreLine = document.createElement("div");
    scoreLine.className = "objective-control-line";
    scoreLine.innerHTML = `<span>R${state.lastRoundSummary.round} VP</span><span>Blue +${state.lastRoundSummary.scoring.gained.playerA} / Red +${state.lastRoundSummary.scoring.gained.playerB}</span>`;
    roundSummary.appendChild(scoreLine);
    const combatLine = document.createElement("div");
    combatLine.className = "objective-control-line";
    combatLine.innerHTML = `<span>Combat</span><span>${state.lastRoundSummary.combatEvents.length} attacks resolved</span>`;
    roundSummary.appendChild(combatLine);
  }

  document.getElementById("playerSupplyText").textContent = playerSupply;
  document.getElementById("enemySupplyText").textContent = enemySupply;
  document.getElementById("playerSupplyFill").style.width = `${fillPercent(state, "playerA")}%`;
  document.getElementById("enemySupplyFill").style.width = `${fillPercent(state, "playerB")}%`;
  const turnBanner = document.getElementById("turnBanner");
  turnBanner.textContent = `${formatPlayerName(state.activePlayer)} — ${titleCase(state.phase)} Phase`;
  turnBanner.className = `turn-banner ${state.activePlayer}`;
}

function getPlayerSupply(state, playerId) {
  return state.players[playerId].battlefieldUnitIds.reduce((total, unitId) => total + state.units[unitId].currentSupplyValue, 0);
}

function fillPercent(state, playerId) {
  const pool = state.players[playerId].supplyPool;
  if (pool === Infinity) return 100;
  if (pool <= 0) return 0;
  return Math.min(100, (getPlayerSupply(state, playerId) / pool) * 100);
}

function formatQueueType(type) {
  if (type === "ranged_attack") return "Ranged";
  if (type === "charge_attack") return "Charge";
  if (type === "overwatch_attack") return "Overwatch";
  return titleCase(type ?? "attack");
}

/* ══════════════════════════════════════════════════════════════
   UNIT LISTS
   ══════════════════════════════════════════════════════════════ */

function renderUnitList(containerId, units, state, uiState, onClick) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (!units.length) {
    container.innerHTML = '<div class="empty-state">None.</div>';
    return;
  }
  units.forEach(unit => container.appendChild(buildUnitCard(unit, uiState.selectedUnitId, onClick, state)));
}

export function renderReserveTray(state, uiState, onSelect) {
  renderUnitList("playerReserves", state.players.playerA.reserveUnitIds.map(id => state.units[id]), state, uiState, onSelect);
  renderUnitList("enemyReserves", state.players.playerB.reserveUnitIds.map(id => state.units[id]), state, uiState, onSelect);
  renderUnitList("playerBattlefield", state.players.playerA.battlefieldUnitIds.map(id => state.units[id]), state, uiState, onSelect);
  renderUnitList("enemyBattlefield", state.players.playerB.battlefieldUnitIds.map(id => state.units[id]), state, uiState, onSelect);
}

/* ══════════════════════════════════════════════════════════════
   SELECTED UNIT PANEL — full combat stats
   ══════════════════════════════════════════════════════════════ */

export function renderSelectedUnit(state, uiState) {
  const panel = document.getElementById("selectedUnitPanel");
  const unit = uiState.selectedUnitId ? state.units[uiState.selectedUnitId] : null;
  if (!unit) {
    panel.innerHTML = '<div class="empty-state">No unit selected. Click a unit card or press <kbd>Tab</kbd> to cycle.</div>';
    return;
  }
  const alive = unit.modelIds.filter(id => unit.models[id].alive).length;
  const total = unit.modelIds.length;
  const abilities = unit.abilities?.length ? unit.abilities.map(a => titleCase(a)).join(", ") : "None";
  const tags = unit.tags?.length ? unit.tags.join(", ") : "";
  const defense = unit.defense ?? {};

  // Weapon sections with full stats
  const rangedHtml = unit.rangedWeapons?.length
    ? unit.rangedWeapons.map(w => `
      <div class="weapon-card">
        <div class="weapon-card-name">${w.name}</div>
        ${formatWeaponFull(w)}
      </div>`).join("")
    : '<div class="empty-state">No ranged weapons</div>';

  const meleeHtml = unit.meleeWeapons?.length
    ? unit.meleeWeapons.map(w => `
      <div class="weapon-card">
        <div class="weapon-card-name">${w.name}</div>
        ${formatWeaponFull(w)}
      </div>`).join("")
    : '<div class="empty-state">No melee weapons</div>';

  panel.innerHTML = `
    <div class="selected-panel-title">${unit.name} <span class="selected-owner badge ${unit.owner}">${formatPlayerName(unit.owner)}</span></div>
    ${tags ? `<div class="unit-tags">${tags}</div>` : ""}
    <div class="selected-stats">
      <div class="selected-stat"><div class="k">Speed</div><div class="v">${unit.speed}</div></div>
      <div class="selected-stat"><div class="k">Supply</div><div class="v">${unit.currentSupplyValue}</div></div>
      <div class="selected-stat"><div class="k">Models</div><div class="v">${alive}/${total}</div></div>
      <div class="selected-stat"><div class="k">Armor</div><div class="v">${defense.armorSave ?? "—"}+</div></div>
      <div class="selected-stat"><div class="k">Evade</div><div class="v">${defense.evadeTarget ? `${defense.evadeTarget}+` : "—"}</div></div>
      <div class="selected-stat"><div class="k">Tough</div><div class="v">${defense.toughness ?? "—"}</div></div>
      <div class="selected-stat"><div class="k">Location</div><div class="v">${titleCase(unit.status.location)}</div></div>
    </div>
    <div class="badge-row" style="margin-top:6px;">
      ${unit.status.engaged ? '<span class="badge warn">Engaged — must Disengage before moving</span>' : ''}
      ${unit.status.hidden ? '<span class="badge good">Hidden</span>' : ''}
      ${unit.status.burrowed ? '<span class="badge good">Burrowed</span>' : ''}
      ${unit.status.outOfCoherency ? '<span class="badge warn">Out of Coherency — cannot contest objectives</span>' : ''}
      ${unit.status.movementActivated ? '<span class="badge good">Movement ✓</span>' : ''}
      ${unit.status.assaultActivated ? '<span class="badge good">Assault ✓</span>' : ''}
      ${unit.status.combatActivated ? '<span class="badge good">Combat ✓</span>' : ''}
    </div>
    ${defense.dodge ? `<div class="selected-detail"><div class="k">Defense Rule</div><div class="v">Dodge ${defense.dodge}</div></div>` : ""}
    ${abilities !== "None" ? `<div class="selected-detail"><div class="k">Abilities</div><div class="v">${abilities}</div></div>` : ""}
    <div class="selected-detail">
      <div class="k">Ranged Weapons</div>
      <div class="v">${rangedHtml}</div>
    </div>
    <div class="selected-detail">
      <div class="k">Melee Weapons</div>
      <div class="v">${meleeHtml}</div>
    </div>
  `;
}

/* ══════════════════════════════════════════════════════════════
   ACTION BUTTONS
   ══════════════════════════════════════════════════════════════ */

export function renderActionButtons(buttons) {
  const container = document.getElementById("actionButtons");
  container.innerHTML = "";
  if (!buttons.length) {
    container.innerHTML = '<div class="empty-state">Select a unit to see actions.</div>';
    return;
  }
  buttons.forEach(button => container.appendChild(button));
}

/* ══════════════════════════════════════════════════════════════
   TACTICAL CARDS — with human-readable descriptions
   ══════════════════════════════════════════════════════════════ */

export function renderTacticalCards(state, buttons) {
  const container = document.getElementById("tacticalCards");
  container.innerHTML = "";

  if (state.activePlayer !== "playerA") {
    container.innerHTML = '<div class="empty-state">Cards available on your turn.</div>';
    return;
  }
  if (state.players.playerA.hasPassedThisPhase) {
    container.innerHTML = '<div class="empty-state">Phase passed.</div>';
    return;
  }

  // Show all cards in hand with descriptions, even if not playable this phase
  const hand = state.players.playerA.hand ?? [];
  if (!hand.length) {
    container.innerHTML = '<div class="empty-state">No cards in hand.</div>';
    return;
  }

  for (const cardEntry of hand) {
    const card = getTacticalCard(cardEntry.cardId);
    const desc = describeCardEffect(card);
    const isPlayablePhase = card.phase === state.phase;
    const matchingButton = buttons.find(b => b.dataset?.cardId === cardEntry.instanceId);

    const wrap = document.createElement("div");
    wrap.className = `tactical-card-display ${isPlayablePhase ? "playable" : "inactive"}`;
    wrap.innerHTML = `
      <div class="tc-header">
        <span class="tc-name">${card.name}</span>
        <span class="tc-phase badge ${isPlayablePhase ? "good" : ""}">${titleCase(card.phase)}</span>
      </div>
      <div class="tc-effect">${desc.effectText}</div>
      <div class="tc-meta">
        <span>${desc.durationText}</span>
        <span>${desc.targetText}</span>
      </div>
    `;

    if (matchingButton) {
      wrap.appendChild(matchingButton);
    } else if (isPlayablePhase) {
      // Find matching button from the buttons array by card name
      const btn = buttons.find(b => b.textContent?.includes(card.name));
      if (btn) wrap.appendChild(btn);
    }

    container.appendChild(wrap);
  }

  // If there are buttons not matched to cards (edge case), append them
  const usedButtons = new Set();
  container.querySelectorAll("button").forEach(b => usedButtons.add(b));
  for (const btn of buttons) {
    if (!usedButtons.has(btn)) {
      const extra = document.createElement("div");
      extra.className = "card-action-item";
      extra.appendChild(btn);
      container.appendChild(extra);
    }
  }
}

/* ══════════════════════════════════════════════════════════════
   COMBAT QUEUE — with attack preview
   ══════════════════════════════════════════════════════════════ */

export function renderCombatQueue(state) {
  const panel = document.getElementById("combatQueuePanel");
  if (!panel) return;
  panel.innerHTML = "";

  if (!state.combatQueue.length) {
    panel.innerHTML = '<div class="empty-state">No queued attacks. Declare Ranged or Charge in Assault Phase to queue attacks here.</div>';
    return;
  }

  state.combatQueue.forEach((entry, index) => {
    const attacker = state.units[entry.attackerId];
    const defender = state.units[entry.targetId];
    if (!attacker || !defender) return;

    const isYours = attacker.owner === "playerA";
    const attackerName = attacker.name;
    const defenderName = defender.name;

    // Find the weapon being used
    const isMelee = entry.type === "charge_attack";
    const weaponPool = isMelee ? attacker.meleeWeapons : attacker.rangedWeapons;
    const weapon = weaponPool?.find(w => w.id === entry.weaponId) ?? weaponPool?.[0];
    const weaponInfo = weapon ? formatWeaponOneLine(weapon) : "unknown weapon";

    const aliveModels = attacker.modelIds.filter(id => attacker.models[id].alive).length;

    const row = document.createElement("div");
    row.className = `combat-queue-entry ${isYours ? "queue-yours" : "queue-enemy"}`;
    row.innerHTML = `
      <div class="cq-header">
        <span class="cq-index">#${index + 1}</span>
        <span class="cq-type badge ${isMelee ? "warn" : ""}">${formatQueueType(entry.type)}</span>
        <span class="cq-direction">${attackerName} → ${defenderName}</span>
      </div>
      <div class="cq-detail">
        ${weapon ? `<div class="cq-weapon">${weapon.name}: ${weaponInfo}</div>` : ""}
        <div class="cq-preview">${aliveModels} models alive × ${weapon?.attacksPerModel ?? weapon?.shotsPerModel ?? 1} attacks = ${aliveModels * (weapon?.attacksPerModel ?? weapon?.shotsPerModel ?? 1)} dice in Attack Pool</div>
      </div>
    `;
    panel.appendChild(row);
  });
}

/* ══════════════════════════════════════════════════════════════
   PHASE CHECKLIST
   ══════════════════════════════════════════════════════════════ */

export function renderPhaseChecklist(state, checklist) {
  const container = document.getElementById("phaseChecklist");
  if (!container) return;
  if (!checklist || state.activePlayer !== "playerA") {
    container.innerHTML = '<div class="empty-state">Waiting for your turn.</div>';
    return;
  }
  if (checklist.total === 0) {
    container.innerHTML = '<div class="empty-state">No units to activate.</div>';
    return;
  }

  const pct = checklist.total > 0 ? Math.round((checklist.done / checklist.total) * 100) : 0;
  container.innerHTML = `
    <div class="checklist-progress">
      <div class="checklist-bar"><div class="checklist-fill" style="width:${pct}%"></div></div>
      <div class="checklist-label">${checklist.done} / ${checklist.total} activated</div>
    </div>
    ${checklist.remaining.length > 0 ? `
      <div class="checklist-remaining">
        ${checklist.remaining.map(name => `<span class="checklist-unit">${name}</span>`).join("")}
      </div>
    ` : '<div class="checklist-done">All units activated — Pass to advance!</div>'}
  `;
}

/* ══════════════════════════════════════════════════════════════
   COMBAT LOG — with structured entries
   ══════════════════════════════════════════════════════════════ */

export function renderLog(state) {
  const panel = document.getElementById("logPanel");
  panel.innerHTML = "";
  state.log.forEach(entry => {
    const div = document.createElement("div");
    const isCombat = entry.type === "combat";
    div.className = `log-entry ${isCombat ? "log-combat" : ""}`;
    div.innerHTML = `<div class="meta">R${entry.round} · ${titleCase(entry.phase)} · ${entry.type}</div><div>${entry.text}</div>`;
    panel.appendChild(div);
  });
}
