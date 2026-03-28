import { getObjectiveControlSnapshot } from "../engine/objectives.js";

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

function renderStatePill(label, value) {
  return `
    <div class="state-pill">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    </div>
  `;
}

function buildUnitCard(unit, selectedUnitId, onClick) {
  const div = document.createElement("div");
  div.className = `unit-card ${selectedUnitId === unit.id ? "selected" : ""}`;
  div.addEventListener("click", () => onClick(unit.id));
  div.innerHTML = `
    <div class="unit-card-row">
      <span class="unit-name">${unit.name}</span>
      <span class="phase-chip">Supply ${unit.currentSupplyValue}</span>
    </div>
    <div class="badge-row">
      <span class="badge ${unit.owner}">${formatPlayerName(unit.owner)}</span>
      <span class="badge">Speed ${unit.speed}</span>
      <span class="badge">Models ${unit.modelIds.filter(id => unit.models[id].alive).length}</span>
      ${unit.status.engaged ? '<span class="badge warn">Engaged</span>' : ''}
      ${unit.status.outOfCoherency ? '<span class="badge warn">Out of Coherency</span>' : ''}
      ${unit.status.movementActivated ? '<span class="badge good">Activated</span>' : ''}
    </div>
  `;
  return div;
}

export function renderTopPanel(state) {
  const battleState = document.getElementById("battleState");
  const playerSupply = `${getPlayerSupply(state, "playerA")} / ${formatSupply(state.players.playerA.supplyPool)}`;
  const enemySupply = `${getPlayerSupply(state, "playerB")} / ${formatSupply(state.players.playerB.supplyPool)}`;
  const roundLimit = state.mission.pacing?.roundLimit ?? state.mission.roundLimit;
  battleState.innerHTML = `
    ${renderStatePill("Round", `${state.round} / ${roundLimit}`)}
    ${renderStatePill("Phase", titleCase(state.phase))}
    ${renderStatePill("Active Player", formatPlayerName(state.activePlayer))}
    ${renderStatePill("First Marker", formatPlayerName(state.firstPlayerMarkerHolder))}
    ${renderStatePill("Mission", state.mission.name)}
    ${renderStatePill("Deployment", state.deployment.name)}
    ${renderStatePill("Blue VP", state.players.playerA.vp)}
    ${renderStatePill("Red VP", state.players.playerB.vp)}
    ${renderStatePill("Queued Attacks", state.combatQueue.length)}
    ${renderStatePill("Winner", state.winner ? formatPlayerName(state.winner) : "—")}
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
  turnBanner.textContent = `${formatPlayerName(state.activePlayer)} Player Active`;
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

function titleCase(value) {
  return value.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase());
}

function formatQueueType(type) {
  if (type === "ranged_attack") return "Ranged";
  if (type === "charge_attack") return "Charge";
  if (type === "overwatch_attack") return "Overwatch";
  return titleCase(type ?? "attack");
}

function renderUnitList(containerId, units, state, uiState, onClick) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (!units.length) {
    container.innerHTML = '<div class="empty-state">None.</div>';
    return;
  }
  units.forEach(unit => container.appendChild(buildUnitCard(unit, uiState.selectedUnitId, onClick)));
}

export function renderReserveTray(state, uiState, onSelect) {
  renderUnitList("playerReserves", state.players.playerA.reserveUnitIds.map(id => state.units[id]), state, uiState, onSelect);
  renderUnitList("enemyReserves", state.players.playerB.reserveUnitIds.map(id => state.units[id]), state, uiState, onSelect);
  renderUnitList("playerBattlefield", state.players.playerA.battlefieldUnitIds.map(id => state.units[id]), state, uiState, onSelect);
  renderUnitList("enemyBattlefield", state.players.playerB.battlefieldUnitIds.map(id => state.units[id]), state, uiState, onSelect);
}

export function renderSelectedUnit(state, uiState) {
  const panel = document.getElementById("selectedUnitPanel");
  const unit = uiState.selectedUnitId ? state.units[uiState.selectedUnitId] : null;
  if (!unit) {
    panel.innerHTML = '<div class="empty-state">No unit selected.</div>';
    return;
  }
  const alive = unit.modelIds.filter(id => unit.models[id].alive).length;
  const rangedSummary = renderWeaponList(unit.rangedWeapons, "No ranged weapons.");
  const meleeSummary = renderWeaponList(unit.meleeWeapons, "No melee weapons.");
  const abilities = unit.abilities?.length ? unit.abilities.join(", ") : "None";
  panel.innerHTML = `
    <div class="selected-panel-title">${unit.name}</div>
    <div class="badge-row">
      <span class="badge ${unit.owner}">${formatPlayerName(unit.owner)}</span>
      <span class="badge">${unit.status.location}</span>
      ${unit.status.engaged ? '<span class="badge warn">Engaged</span>' : ''}
      ${unit.status.outOfCoherency ? '<span class="badge warn">Out of Coherency</span>' : ''}
      ${unit.status.assaultActivated ? '<span class="badge good">Assault Activated</span>' : ''}
      ${unit.status.combatActivated ? '<span class="badge good">Combat Activated</span>' : ''}
    </div>
    <div class="selected-stats">
      <div class="selected-stat"><div class="k">Speed</div><div class="v">${unit.speed}</div></div>
      <div class="selected-stat"><div class="k">Supply</div><div class="v">${unit.currentSupplyValue}</div></div>
      <div class="selected-stat"><div class="k">Models Alive</div><div class="v">${alive}</div></div>
      <div class="selected-stat"><div class="k">Leading Model</div><div class="v">${unit.leadingModelId.replace(`${unit.id}_`, "")}</div></div>
    </div>
    <div class="selected-detail">
      <div class="k">Abilities</div>
      <div class="v">${abilities}</div>
    </div>
    <div class="selected-detail">
      <div class="k">Ranged Weapons</div>
      <div class="v">${rangedSummary}</div>
    </div>
    <div class="selected-detail">
      <div class="k">Melee Weapons</div>
      <div class="v">${meleeSummary}</div>
    </div>
  `;
}

function renderWeaponList(weapons = [], emptyText) {
  if (!weapons.length) return emptyText;
  return `
    <div class="selected-weapon-list">
      ${weapons.map(weapon => `
        <div class="selected-weapon-item">
          <div class="selected-weapon-name">${weapon.name}</div>
          <div>${formatWeaponStats(weapon)}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function formatWeaponStats(weapon) {
  const attacks = weapon.attacksPerModel ?? weapon.shotsPerModel ?? 1;
  const range = weapon.range != null ? `${weapon.range}" range` : "Melee range";
  return `${attacks} atk per model, ${range}, hit ${weapon.hitTarget ?? "?"}+, wound ${weapon.woundTarget ?? "?"}+`;
}

export function renderActionButtons(buttons) {
  const container = document.getElementById("actionButtons");
  container.innerHTML = "";
  if (!buttons.length) {
    container.innerHTML = '<div class="empty-state">No actions available.</div>';
    return;
  }
  buttons.forEach(button => container.appendChild(button));
}

export function renderTacticalCards(state, buttons) {
  const container = document.getElementById("tacticalCards");
  container.innerHTML = "";

  if (state.activePlayer !== "playerA") {
    container.innerHTML = '<div class="empty-state">Cards can be played only during your turn.</div>';
    return;
  }

  if (state.players.playerA.hasPassedThisPhase) {
    container.innerHTML = '<div class="empty-state">You already passed this phase.</div>';
    return;
  }

  if (!buttons.length) {
    const handCount = state.players.playerA.hand?.length ?? 0;
    container.innerHTML = `<div class="empty-state">${handCount ? "No cards are playable in this phase." : "No cards in hand."}</div>`;
    return;
  }

  buttons.forEach(button => {
    const wrap = document.createElement("div");
    wrap.className = "card-action-item";
    wrap.appendChild(button);
    if (button.title) {
      const detail = document.createElement("div");
      detail.className = "card-action-detail";
      detail.textContent = button.title.replace(/\n/g, " ");
      wrap.appendChild(detail);
    }
    container.appendChild(wrap);
  });
}

export function renderCombatQueue(state) {
  const panel = document.getElementById("combatQueuePanel");
  if (!panel) return;
  panel.innerHTML = "";

  if (!state.combatQueue.length) {
    panel.innerHTML = '<div class="empty-state">No queued attacks.</div>';
    return;
  }

  state.combatQueue.forEach((entry, index) => {
    const attackerName = state.units[entry.attackerId]?.name ?? entry.attackerId;
    const defenderName = state.units[entry.defenderId]?.name ?? entry.defenderId;
    const row = document.createElement("div");
    row.className = "objective-control-line";
    row.innerHTML = `
      <span>#${index + 1} ${formatQueueType(entry.type)}</span>
      <span>${attackerName} → ${defenderName}</span>
    `;
    panel.appendChild(row);
  });
}

export function renderLog(state) {
  const panel = document.getElementById("logPanel");
  panel.innerHTML = "";
  state.log.forEach(entry => {
    const div = document.createElement("div");
    div.className = "log-entry";
    div.innerHTML = `<div class="meta">Round ${entry.round} • ${titleCase(entry.phase)} • ${entry.type}</div><div>${entry.text}</div>`;
    panel.appendChild(div);
  });
}
