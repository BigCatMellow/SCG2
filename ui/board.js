import { getObjectiveControlSnapshot } from "../engine/objectives.js";
import { pathLength, pathTravelCost, gridDistance } from "../engine/geometry.js";

const SVG_NS = "http://www.w3.org/2000/svg";

function el(name, attrs = {}) {
  const e = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

function ownerClass(playerId) { return playerId === "playerA" ? "playerA" : "playerB"; }

function snap(model) {
  return { x: Math.round(model.x) - 0.5, y: Math.round(model.y) - 0.5 };
}

function aliveCount(unit) {
  return unit.modelIds.filter(id => unit.models[id].alive).length;
}

/* ── Board layers ── */

function addGrid(svg, w, h) {
  for (let x = 0; x <= w; x++) svg.appendChild(el("line", { x1: x, y1: 0, x2: x, y2: h, class: x === w / 2 ? "board-centerline" : "board-grid-line" }));
  for (let y = 0; y <= h; y++) svg.appendChild(el("line", { x1: 0, y1: y, x2: w, y2: y, class: y === h / 2 ? "board-centerline" : "board-grid-line" }));
}

function addZones(svg, state) {
  const d = state.deployment.zoneOfInfluenceDepth;
  svg.append(
    el("rect", { x: 0, y: 0, width: d, height: state.board.heightInches, class: "edge-zone playerA" }),
    el("rect", { x: state.board.widthInches - d, y: 0, width: d, height: state.board.heightInches, class: "edge-zone playerB" })
  );
}

function addTerrain(svg, terrain) {
  for (const p of terrain) {
    const klass = p.kind === "force_field" ? "terrain-force-field" : p.impassable ? "terrain-block" : "terrain-cover";
    svg.appendChild(el("rect", {
      x: p.rect.minX, y: p.rect.minY,
      width: p.rect.maxX - p.rect.minX, height: p.rect.maxY - p.rect.minY,
      class: klass
    }));
  }
}

function addObjectives(svg, objectives, snapshot) {
  for (const obj of objectives) {
    const r = snapshot[obj.id];
    let cls = "objective-ring neutral";
    if (r?.contested) cls = "objective-ring contested";
    if (r?.controller === "playerA") cls = "objective-ring playerA";
    if (r?.controller === "playerB") cls = "objective-ring playerB";
    svg.appendChild(el("circle", { cx: obj.x, cy: obj.y, r: 0.75, class: "objective-marker" }));
    svg.appendChild(el("circle", { cx: obj.x, cy: obj.y, r: 2, class: cls }));
  }
}

function addPathPreview(svg, preview) {
  if (!preview?.path || preview.path.length < 2) return;
  const d = preview.path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  svg.appendChild(el("path", { d, class: "path-preview" }));
  const total = pathLength(preview.path);
  if (total <= 0.01) return;
  const cost = preview.state?.rules?.gridMode
    ? gridDistance(preview.path[0], preview.path[preview.path.length - 1])
    : preview.state?.board?.terrain
      ? pathTravelCost(preview.path, preview.state.board.terrain) : total;
  const s = preview.path[0], e = preview.path[preview.path.length - 1];
  const label = el("text", { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 - 0.45, class: "path-preview-label" });
  label.textContent = preview.state?.rules?.gridMode
    ? `${cost.toFixed(0)} sq`
    : cost - total > 0.05 ? `${total.toFixed(1)}" (cost ${cost.toFixed(1)}")` : `${total.toFixed(1)}"`;
  svg.appendChild(label);
}

function addSelection(svg, state, uiState) {
  if (!uiState.selectedUnitId) return;
  const unit = state.units[uiState.selectedUnitId];
  if (!unit || unit.status.location !== "battlefield") return;
  const leader = unit.models[unit.leadingModelId];
  if (!leader || leader.x == null) return;
  const sq = snap(leader);
  svg.appendChild(el("rect", {
    x: sq.x - 0.15, y: sq.y - 0.15, width: 1.3, height: 1.3, rx: 0.15,
    class: "selection-ring"
  }));
}

/* ── Preview: single ghost block ── */
function addPreviewUnit(svg, state, uiState) {
  if (!uiState.previewUnit) return;
  const { leader } = uiState.previewUnit;
  if (uiState.previewUnit.kind === "force_field") {
    svg.appendChild(el("rect", {
      x: leader.x - 0.5, y: leader.y - 0.5, width: 1, height: 1, rx: 0.12, class: "force-field-preview"
    }));
    return;
  }
  const unit = state.units[uiState.previewUnit.unitId];
  if (!unit) return;
  const sq = { x: Math.round(leader.x) - 0.5, y: Math.round(leader.y) - 0.5 };
  svg.appendChild(el("rect", {
    x: sq.x, y: sq.y, width: 1, height: 1, rx: 0.12, class: "deploy-preview"
  }));
}

/* ── Legal destination overlay ── */
function addLegalOverlay(svg, state, uiState) {
  if (!uiState.selectedUnitId || !uiState.mode) return;
  const pts = uiState.legalDestinations ?? [];
  if (!pts.length) return;
  const g = el("g", { class: "legal-overlay" });
  for (const p of pts) {
    g.appendChild(el("rect", { x: p.x - 0.5, y: p.y - 0.5, width: 1, height: 1, class: "legal-square" }));
  }
  svg.appendChild(g);
}

/* ── Range rings ── */
function addRangeRings(svg, state, uiState) {
  if (!uiState.selectedUnitId) return;
  const unit = state.units[uiState.selectedUnitId];
  if (!unit || unit.owner !== "playerA" || unit.status.location !== "battlefield") return;
  const m = unit.models[unit.leadingModelId];
  if (!m || m.x == null) return;
  if (uiState.mode === "move" || uiState.mode === "run" || uiState.mode === "disengage") {
    svg.appendChild(el("circle", { cx: m.x, cy: m.y, r: unit.speed, class: "range-ring movement" }));
  }
  if (uiState.mode === "force_field") {
    svg.appendChild(el("circle", { cx: m.x, cy: m.y, r: 8, class: "range-ring support" }));
  }
  if (uiState.mode === "declare_ranged" && unit.rangedWeapons?.length) {
    const r = Math.max(...unit.rangedWeapons.map(w => w.rangeInches ?? 0));
    if (r > 0) svg.appendChild(el("circle", { cx: m.x, cy: m.y, r, class: "range-ring ranged" }));
  }
  if (uiState.mode === "declare_charge") {
    svg.appendChild(el("circle", { cx: m.x, cy: m.y, r: 8, class: "range-ring charge" }));
  }
}

/* ── Target highlights ── */
function addTargetHighlights(svg, state, uiState) {
  if (!uiState.selectedUnitId) return;
  if (uiState.mode !== "declare_ranged" && uiState.mode !== "declare_charge") return;
  const unit = state.units[uiState.selectedUnitId];
  if (!unit || unit.owner !== "playerA" || unit.status.location !== "battlefield") return;
  const lm = unit.models[unit.leadingModelId];
  if (!lm || lm.x == null) return;
  for (const t of Object.values(state.units)) {
    if (t.owner !== "playerB" || t.status.location !== "battlefield") continue;
    const tl = t.models[t.leadingModelId];
    if (!tl || tl.x == null) continue;
    const dx = tl.x - lm.x, dy = tl.y - lm.y, dist = Math.sqrt(dx * dx + dy * dy);
    let ok = false;
    if (uiState.mode === "declare_ranged" && unit.rangedWeapons?.length)
      ok = dist <= Math.max(...unit.rangedWeapons.map(w => w.rangeInches ?? 0));
    if (uiState.mode === "declare_charge") ok = dist <= 8;
    if (ok) {
      const sq = snap(tl);
      svg.appendChild(el("rect", {
        x: sq.x - 0.2, y: sq.y - 0.2, width: 1.4, height: 1.4, rx: 0.15, class: "target-highlight"
      }));
    }
  }
}

/* ── Unactivated indicators ── */
function addActivationIndicators(svg, state) {
  if (state.activePlayer !== "playerA") return;
  for (const unit of Object.values(state.units)) {
    if (unit.owner !== "playerA" || unit.status.location !== "battlefield") continue;
    const m = unit.models[unit.leadingModelId];
    if (!m || m.x == null) continue;
    const activated = state.phase === "movement" ? unit.status.movementActivated
      : state.phase === "assault" ? unit.status.assaultActivated
      : state.phase === "combat" ? unit.status.combatActivated : true;
    if (!activated) {
      const sq = snap(m);
      svg.appendChild(el("rect", {
        x: sq.x - 0.25, y: sq.y - 0.25, width: 1.5, height: 1.5, rx: 0.15, class: "needs-activation-ring"
      }));
    }
  }
}

/* ══════════════════════════════════════════════════════════════
   SINGLE-BLOCK UNIT RENDERING
   One block per unit at the leader's grid position.
   Shows: abbreviated name, model count, supply.
   ══════════════════════════════════════════════════════════════ */

function abbreviateName(name) {
  // Short names stay. Long names get first word or initials.
  if (name.length <= 8) return name;
  const words = name.split(/[\s_-]+/);
  if (words.length === 1) return name.slice(0, 7);
  // First word if short, otherwise initials
  if (words[0].length <= 6) return words[0];
  return words.map(w => w[0]).join("").toUpperCase();
}

function addUnits(svg, state, uiState, onModelClick) {
  const gridMode = Boolean(state.rules?.gridMode);

  for (const unit of Object.values(state.units)) {
    if (unit.status.location !== "battlefield") continue;
    const leader = unit.models[unit.leadingModelId];
    if (!leader?.alive || leader.x == null) continue;

    const sq = snap(leader);
    const alive = aliveCount(unit);
    const owner = ownerClass(unit.owner);
    const isSelected = uiState.selectedUnitId === unit.id;
    const activated = state.phase === "movement" ? unit.status.movementActivated
      : state.phase === "assault" ? unit.status.assaultActivated
      : state.phase === "combat" ? unit.status.combatActivated : false;

    // Engagement ring (1" around the unit block)
    if (unit.tags.includes("Ground")) {
      svg.appendChild(el("circle", {
        cx: sq.x + 0.5, cy: sq.y + 0.5, r: 1.5, class: "engagement-ring"
      }));
    }

    // Unit block — single square
    const block = el("rect", {
      x: sq.x, y: sq.y, width: 1, height: 1, rx: 0.12, ry: 0.12,
      class: `unit-block ${owner} ${isSelected ? "selected" : ""} ${activated ? "activated" : ""}`,
      "data-unit-id": unit.id
    });
    block.addEventListener("click", event => {
      event.stopPropagation();
      onModelClick(unit.id, unit.leadingModelId);
    });

    // Tooltip
    const title = el("title");
    const wpnInfo = unit.rangedWeapons?.length
      ? unit.rangedWeapons.map(w => `${w.name} ${w.rangeInches}" ${w.hitTarget}+`).join(", ")
      : unit.meleeWeapons?.length
        ? unit.meleeWeapons.map(w => `${w.name} ${w.hitTarget}+`).join(", ")
        : "No weapons";
    title.textContent = `${unit.name} (${unit.owner === "playerA" ? "You" : "Enemy"})\nSupply: ${unit.currentSupplyValue} | Speed: ${unit.speed} | Models: ${alive}/${unit.modelIds.length}\n${wpnInfo}${unit.status.engaged ? "\nENGAGED" : ""}`;
    block.appendChild(title);
    svg.appendChild(block);

    // Unit name — abbreviated, above the block
    const nameText = el("text", {
      x: sq.x + 0.5, y: sq.y - 0.12,
      class: `unit-label ${owner}`
    });
    nameText.textContent = abbreviateName(unit.name);
    svg.appendChild(nameText);

    // Model count + supply inside the block
    const infoText = el("text", {
      x: sq.x + 0.5, y: sq.y + 0.55,
      class: "unit-info-text"
    });
    infoText.textContent = `${alive}×${unit.currentSupplyValue}`;
    svg.appendChild(infoText);

    // Engaged indicator
    if (unit.status.engaged) {
      const engBadge = el("text", {
        x: sq.x + 0.5, y: sq.y + 1.25,
        class: "unit-engaged-badge"
      });
      engBadge.textContent = "ENG";
      svg.appendChild(engBadge);
    }
  }
}

export function screenToBoardPoint(svg, clientX, clientY) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const t = pt.matrixTransform(svg.getScreenCTM().inverse());
  const w = Number(svg.dataset.boardWidth ?? 36);
  const h = Number(svg.dataset.boardHeight ?? 36);
  return { x: Math.max(0, Math.min(w, t.x)), y: Math.max(0, Math.min(h, t.y)) };
}

export function renderLegalOverlay() {}
export function renderUnitGhost() {}

export function renderBoard(state, uiState, handlers) {
  const svg = document.getElementById("battlefield");
  svg.setAttribute("viewBox", `0 0 ${state.board.widthInches} ${state.board.heightInches}`);
  svg.dataset.boardWidth = String(state.board.widthInches);
  svg.dataset.boardHeight = String(state.board.heightInches);
  svg.innerHTML = "";
  const snap = getObjectiveControlSnapshot(state);
  addZones(svg, state);
  addGrid(svg, state.board.widthInches, state.board.heightInches);
  addTerrain(svg, state.board.terrain);
  addObjectives(svg, state.deployment.missionMarkers, snap);
  addLegalOverlay(svg, state, uiState);
  addActivationIndicators(svg, state);
  addRangeRings(svg, state, uiState);
  addTargetHighlights(svg, state, uiState);
  addPathPreview(svg, uiState.previewPath);
  addSelection(svg, state, uiState);
  addPreviewUnit(svg, state, uiState);
  addUnits(svg, state, uiState, handlers.onModelClick);

  svg.onclick = event => {
    const point = screenToBoardPoint(svg, event.clientX, event.clientY);
    handlers.onBoardClick(point);
  };
}
