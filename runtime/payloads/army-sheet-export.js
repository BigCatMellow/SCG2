(() => {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function phaseClass(phase) {
    const value = String(phase || "any").toLowerCase();
    if (value.startsWith("move")) return "movement";
    if (value.startsWith("combat")) return "combat";
    if (value.startsWith("assault")) return "assault";
    return "any";
  }

  function renderAbilityRow(ability) {
    return `
      <div class="ability-row">
        <div class="ability-topline">
          <span class="ability-phase ${phaseClass(ability.phase)}">${escapeHtml(ability.phase || "Any")}</span>
          ${ability.type ? `<span class="ability-type">${escapeHtml(ability.type)}</span>` : ""}
          <span class="ability-name">${escapeHtml(ability.name || "")}</span>
        </div>
        <div class="ability-desc">${escapeHtml(ability.description || "")}</div>
      </div>
    `;
  }

  function renderWeaponRow(weapon) {
    const keywords = (weapon.keywords || []).length
      ? `<div class="wpn-keyword">${escapeHtml((weapon.keywords || []).join(", "))}</div>`
      : "";
    return `
      <tr>
        <td>${escapeHtml(weapon.name || "")}<span class="phase-tag ${phaseClass(weapon.phase)}">${escapeHtml(weapon.phase || "Any")}</span>${keywords}</td>
        <td>${escapeHtml(weapon.range ?? "-")}</td>
        <td>${escapeHtml(weapon.target ?? "-")}</td>
        <td>${escapeHtml(weapon.roa ?? "-")}</td>
        <td>${escapeHtml(weapon.hit ?? "-")}</td>
        <td class="surge-val">${escapeHtml(weapon.surge ?? "-")}</td>
        <td>${escapeHtml(weapon.sDie ?? "-")}</td>
        <td>${escapeHtml(weapon.damage ?? "-")}</td>
      </tr>
    `;
  }

  function renderSupplyBrackets(brackets) {
    return (brackets || []).map(bracket => `
      <span class="sup-bracket ${bracket.supply === 0 ? "sup-zero" : ""} ${bracket.isActive ? "sup-active" : ""}">
        <span class="sup-models">${escapeHtml(bracket.models)}</span>
        <span class="sup-val">${escapeHtml(bracket.supply)}</span>
      </span>
    `).join("");
  }

  function renderUnitBlock(unit) {
    const statOrder = [
      ["Move", unit.stats?.speed ?? "-"],
      ["Evade", unit.stats?.evade ?? "-"],
      ["Armour", unit.stats?.armour ?? "-"],
      ["HP", unit.stats?.hp ?? "-"],
      ["Shield", unit.stats?.shield ?? "-"],
      ["Size", unit.stats?.size ?? "-"]
    ];

    return `
      <div class="unit-block">
        <div class="unit-header">
          <div class="unit-name">${escapeHtml(unit.name)}</div>
          <div class="unit-meta">
            <span class="unit-role">${escapeHtml(unit.role || "Unit")}</span>
            <span class="unit-cost">${escapeHtml(unit.costLabel || "")}</span>
          </div>
        </div>
        <div class="stat-bar">
          ${statOrder.map(([label, value]) => `
            <div class="stat-cell">
              <span class="stat-label">${escapeHtml(label)}</span>
              <span class="stat-val">${escapeHtml(value)}</span>
            </div>
          `).join("")}
        </div>
        <div class="supply-track">
          <span class="supply-track-label">Squad</span>
          <div class="supply-brackets">${renderSupplyBrackets(unit.supplyBrackets)}</div>
          <span class="supply-cost">${escapeHtml(unit.costBreakdown || "")}</span>
        </div>
        <div class="unit-body">
          <div class="section-label">Weapons</div>
          <table class="weapon-table">
            <thead>
              <tr><th>Weapon</th><th>Rng</th><th>Tgt</th><th>RoA</th><th>Hit</th><th>Surge</th><th>S.Die</th><th>Dmg</th></tr>
            </thead>
            <tbody>${(unit.weapons || []).map(renderWeaponRow).join("") || `<tr><td colspan="8">No listed weapons</td></tr>`}</tbody>
          </table>
          <div class="section-label">Abilities</div>
          <div class="ability-list">${(unit.abilities || []).map(renderAbilityRow).join("") || `<div class="ability-row"><span class="ability-desc">No listed abilities</span></div>`}</div>
          ${(unit.upgrades || []).length ? `
            <div class="upgrade-bar">
              <div class="section-label">Selected Upgrades</div>
              ${(unit.upgrades || []).map(upg => `
                <div class="upgrade-row">
                  <span class="upg-name">${escapeHtml(upg.name)}</span>
                  <span class="upg-cost">${escapeHtml(upg.costLabel)}</span>
                  <span class="upg-type">${escapeHtml(upg.type || "")}</span>
                  <span class="upg-desc">${escapeHtml(upg.description || "")}</span>
                </div>
              `).join("")}
            </div>
          ` : ""}
          <div class="notes-area">
            <div class="section-label">Game Notes</div>
            <div class="notes-lines"></div>
            <div class="notes-lines"></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTacticalCard(card) {
    return `
      <div class="tac-card">
        <div class="tac-header">
          <span class="tac-name">${escapeHtml(card.name)}</span>
          <span class="tac-cost">${escapeHtml(card.costLabel || "")}</span>
        </div>
        <div class="tac-body">
          ${card.meta ? `<div class="tac-row"><span class="tac-meta">${escapeHtml(card.meta)}</span></div>` : ""}
          ${(card.abilities || []).map(ability => `
            <div class="tac-ability">
              <span class="ability-phase ${phaseClass(ability.phase)}">${escapeHtml(ability.phase || "Any")}</span>
              <span class="ability-type">${escapeHtml(ability.type || "")}</span>
              <span class="tac-ab-text"><span class="tac-ab-name">${escapeHtml(ability.name || "")}</span>${ability.description ? ` — ${escapeHtml(ability.description)}` : ""}</span>
            </div>
          `).join("") || `<div class="tac-ability"><span class="tac-ab-text">No listed card text</span></div>`}
        </div>
      </div>
    `;
  }

  function renderScenarioCard(title, tone, lines, rules) {
    return `
      <div class="scenario-card">
        <div class="scenario-card-header ${tone}">
          <span class="scenario-card-title">${escapeHtml(title)}</span>
        </div>
        <div class="scenario-card-body">
          ${(lines || []).length ? `
            <div class="scenario-list">
              ${(lines || []).map(line => `<div class="scenario-line">${escapeHtml(line)}</div>`).join("")}
            </div>
          ` : ""}
          ${(rules || []).length ? `
            <div class="scenario-rule-list">
              ${(rules || []).map(rule => `
                <div class="tac-ability">
                  <span class="ability-phase ${phaseClass(rule.phase)}">${escapeHtml(rule.phase || "Any")}</span>
                  <span class="tac-ab-text"><span class="tac-ab-name">${escapeHtml(rule.name || "")}</span>${rule.description ? ` — ${escapeHtml(rule.description)}` : ""}</span>
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }

  function renderMapSvg(map) {
    if (!map || !map.width || !map.height) return "";
    const scale = 6;
    const w = map.width * scale;
    const h = map.height * scale;
    const vLines = Array.from({ length: Math.floor(map.width / 6) + 1 }, (_, i) =>
      `<line x1="${i * 6 * scale}" y1="0" x2="${i * 6 * scale}" y2="${h}" stroke="#cbd5e1" stroke-width="0.6" stroke-dasharray="2,2"/>`
    ).join("");
    const hLines = Array.from({ length: Math.floor(map.height / 6) + 1 }, (_, i) =>
      `<line x1="0" y1="${i * 6 * scale}" x2="${w}" y2="${i * 6 * scale}" stroke="#cbd5e1" stroke-width="0.6" stroke-dasharray="2,2"/>`
    ).join("");
    const red = (map.redZones || []).map(zone =>
      `<rect x="${zone.x * scale}" y="${zone.y * scale}" width="${zone.w * scale}" height="${zone.h * scale}" fill="rgba(239,68,68,.28)" stroke="#ef4444" stroke-width="1.5"/>`
    ).join("");
    const blue = (map.blueZones || []).map(zone =>
      `<rect x="${zone.x * scale}" y="${zone.y * scale}" width="${zone.w * scale}" height="${zone.h * scale}" fill="rgba(59,130,246,.28)" stroke="#3b82f6" stroke-width="1.5"/>`
    ).join("");
    const markers = (map.markers || []).map(marker =>
      `<g><circle cx="${marker.x * scale}" cy="${marker.y * scale}" r="12" fill="${marker.num === 5 ? '#facc15' : '#e2e8f0'}" stroke="#0f172a" stroke-width="2"/><text x="${marker.x * scale}" y="${marker.y * scale + 1}" text-anchor="middle" dominant-baseline="middle" fill="#0f172a" font-size="12" font-weight="700">${marker.num}</text></g>`
    ).join("");
    return `
      <svg viewBox="0 0 ${w} ${h}" class="scenario-map-svg" aria-label="${escapeHtml(map.name || "Map")}">
        <rect x="0" y="0" width="${w}" height="${h}" fill="#f8fafc"/>
        ${vLines}
        ${hLines}
        ${red}
        ${blue}
        ${markers}
        <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="2"/>
      </svg>
    `;
  }

  function renderScenarioSection(data) {
    if (!data.mission && !data.map) return "";

    const mission = data.mission || null;
    const map = data.map || null;
    const missionLines = mission ? [
      mission.summary,
      ...(mission.parameters || []).map(item => `Parameter: ${item}`),
      ...(mission.scoring || []).map(item => `Scoring: ${item}`),
      mission.special ? `Special: ${mission.special}` : ""
    ].filter(Boolean) : [];

    const mapLines = map ? [
      map.summary,
      ...(map.markerSetup || []).map(item => `Marker ${item.num}: ${item.desc}`),
      map.notes ? `Map Note: ${map.notes}` : ""
    ].filter(Boolean) : [];

    const deploymentLines = map ? [
      map.blueSetup?.title ? `Blue Deployment: ${map.blueSetup.title}` : "",
      ...(map.blueSetup?.instructions || []).map(item => `Blue: ${item}`),
      map.redSetup?.title ? `Red Deployment: ${map.redSetup.title}` : "",
      ...(map.redSetup?.instructions || []).map(item => `Red: ${item}`)
    ].filter(Boolean) : [];

    return `
      <div style="margin-bottom:16px;">
        <div class="page-header" style="border-bottom-color:#0f172a; margin-bottom:10px;">
          <h1 style="font-size:13pt;">Mission Packet</h1>
          <span class="faction-tag">Mission, map, and deployment notes</span>
        </div>
        <div class="scenario-strap">Selected before the match so the roster, objectives, and setup live on one sheet.</div>
        <div class="scenario-grid">
          ${mission ? renderScenarioCard(mission.name, "mission", missionLines, mission.additionalRules || []) : ""}
          ${map ? `
            <div class="scenario-card">
              <div class="scenario-card-header map">
                <span class="scenario-card-title">${escapeHtml(map.name + (map.size ? ` (${map.size})` : ""))}</span>
              </div>
              <div class="scenario-card-body">
                ${renderMapSvg(map)}
                <div class="scenario-map-legend">
                  <span class="scenario-legend-item"><span class="scenario-legend-swatch red"></span>Red Deployment</span>
                  <span class="scenario-legend-item"><span class="scenario-legend-swatch blue"></span>Blue Deployment</span>
                  <span class="scenario-legend-item"><span class="scenario-legend-dot">5</span>Objective Marker</span>
                </div>
                <div class="scenario-list">${mapLines.map(line => `<div class="scenario-line">${escapeHtml(line)}</div>`).join("")}</div>
              </div>
            </div>
          ` : ""}
        </div>
        ${map ? `
          <div class="scenario-card" style="margin-top:8px;">
            <div class="scenario-card-header deployment">
              <span class="scenario-card-title">Deployment Notes</span>
            </div>
            <div class="scenario-card-body">
              <div class="scenario-list">
                ${deploymentLines.map(line => `<div class="scenario-line">${escapeHtml(line)}</div>`).join("")}
              </div>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  function buildArmySheetHtml(data) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.title || "SC:TMG Army Sheet")}</title>
<style>
  @page { size: letter portrait; margin: 0.4in; }
  :root {
    --bg: #ffffff;
    --text: #1a1a1a;
    --muted: #5a5a5a;
    --faint: #9a9a9a;
    --border: #d0d0d0;
    --border-light: #e8e8e8;
    --header-bg: #1a1a1a;
    --header-text: #ffffff;
    --accent: ${escapeHtml(data.accent || "#4a7c3f")};
    --accent-light: #e8f0e6;
    --phase-assault: #b45309;
    --phase-combat: #991b1b;
    --phase-any: #4338ca;
    --phase-movement: #0e7490;
    --upgrade-bg: #f0f7ee;
    --upgrade-border: #9aba8e;
    --stat-bg: #f5f5f5;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.35;
    color: var(--text);
    background: var(--bg);
    padding: 0.4in;
  }
  @media print {
    body { padding: 0; }
    .unit-block, .tac-card { break-inside: avoid; }
  }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 2px solid var(--header-bg);
    padding-bottom: 6px;
    margin-bottom: 14px;
  }
  .page-header h1 {
    font-size: 16pt;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }
  .faction-tag {
    font-family: monospace;
    font-size: 8pt;
    color: var(--muted);
    letter-spacing: 0.08em;
  }
  .header-meta {
    display: flex;
    gap: 10px;
    align-items: center;
    font-family: monospace;
    font-size: 8pt;
    color: var(--muted);
  }
  .unit-block {
    border: 1.5px solid var(--border);
    border-radius: 3px;
    margin-bottom: 14px;
    overflow: hidden;
  }
  .unit-header {
    background: var(--header-bg);
    color: var(--header-text);
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .unit-name { font-size: 12pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }
  .unit-meta { display: flex; gap: 10px; align-items: center; font-family: monospace; font-size: 8pt; }
  .unit-role { background: rgba(255,255,255,0.15); padding: 1px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.06em; }
  .unit-cost { color: #f59e0b; font-weight: 700; }
  .stat-bar { display: flex; border-bottom: 1px solid var(--border); background: var(--stat-bg); }
  .stat-cell { flex: 1; text-align: center; padding: 4px 2px; border-right: 1px solid var(--border-light); min-width: 0; }
  .stat-cell:last-child { border-right: none; }
  .stat-label { font-size: 6.5pt; font-weight: 700; color: var(--faint); text-transform: uppercase; letter-spacing: 0.08em; display: block; }
  .stat-val { font-family: monospace; font-size: 11pt; font-weight: 700; display: block; line-height: 1.2; }
  .supply-track { display: flex; align-items: center; gap: 0; border-bottom: 1px solid var(--border); background: #fafafa; padding: 3px 10px; }
  .supply-track-label { font-size: 6.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--faint); margin-right: 8px; white-space: nowrap; }
  .supply-brackets { display: flex; gap: 3px; flex-wrap: wrap; }
  .sup-bracket { display: inline-flex; align-items: center; font-family: monospace; font-size: 7.5pt; border: 1px solid var(--border); border-radius: 2px; overflow: hidden; line-height: 1; }
  .sup-models { padding: 2px 5px; background: #fff; color: var(--text); border-right: 1px solid var(--border); }
  .sup-val { padding: 2px 5px; background: var(--stat-bg); color: var(--text); font-weight: 700; min-width: 16px; text-align: center; }
  .sup-bracket.sup-zero .sup-val { color: var(--faint); }
  .sup-bracket.sup-active { border-color: var(--accent); background: var(--accent-light); }
  .sup-bracket.sup-active .sup-val { background: var(--accent); color: #fff; }
  .supply-cost { margin-left: auto; font-family: monospace; font-size: 7.5pt; color: var(--muted); }
  .unit-body { padding: 6px 10px 8px; }
  .section-label { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); border-bottom: 1px solid var(--border-light); padding-bottom: 2px; margin: 8px 0 4px 0; }
  .section-label:first-child { margin-top: 0; }
  .weapon-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin: 2px 0; }
  .weapon-table th { font-size: 6.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--faint); text-align: center; padding: 2px 3px; border-bottom: 1px solid var(--border); }
  .weapon-table th:first-child, .weapon-table td:first-child { text-align: left; }
  .weapon-table td { text-align: center; padding: 3px 3px; border-bottom: 1px solid var(--border-light); font-family: monospace; font-size: 8pt; vertical-align: top; }
  .weapon-table td:first-child { font-family: Arial, sans-serif; font-weight: 700; font-size: 8.5pt; }
  .phase-tag, .ability-phase { font-size: 6pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 1px 5px; border-radius: 2px; white-space: nowrap; display: inline-block; }
  .phase-tag.assault, .ability-phase.assault { background: #fef3c7; color: var(--phase-assault); }
  .phase-tag.combat, .ability-phase.combat { background: #fee2e2; color: var(--phase-combat); }
  .phase-tag.any, .ability-phase.any { background: #e0e7ff; color: var(--phase-any); }
  .phase-tag.movement, .ability-phase.movement { background: #d5f5f6; color: var(--phase-movement); }
  .wpn-keyword { font-family: Arial, sans-serif; font-size: 7.5pt; color: var(--muted); font-style: italic; margin-top: 2px; }
  .surge-val { color: #b91c1c; font-weight: 700; }
  .ability-list { margin: 2px 0; }
  .ability-row { padding: 4px 0 5px; border-bottom: 1px solid var(--border-light); font-size: 8.5pt; }
  .ability-row:last-child, .upgrade-row:last-child { border-bottom: none; }
  .ability-topline { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:2px; }
  .ability-type, .upg-type { font-family: monospace; font-size: 6.5pt; color: var(--faint); flex-shrink: 0; }
  .ability-name, .upg-name { font-weight: 700; }
  .ability-desc, .upg-desc { color: var(--muted); min-width: 0; }
  .upgrade-bar { background: var(--upgrade-bg); border: 1px solid var(--upgrade-border); border-radius: 2px; padding: 4px 8px; margin-top: 6px; }
  .upgrade-bar .section-label { color: var(--accent); border-bottom-color: var(--upgrade-border); margin-top: 0; }
  .upgrade-row { display: flex; align-items: baseline; gap: 6px; padding: 2px 0; font-size: 8.5pt; border-bottom: 1px solid rgba(154,186,142,0.3); }
  .upg-cost { font-family: monospace; font-size: 7.5pt; color: var(--accent); white-space: nowrap; flex-shrink: 0; }
  .notes-area { margin-top: 8px; }
  .notes-lines { height: 18px; border-bottom: 1px dotted var(--border); }
  .tactical-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .tac-card { width: calc(50% - 4px); border: 1px solid var(--border); border-radius: 3px; overflow: hidden; break-inside: avoid; }
  .tac-header { background: #f7f7f7; padding: 5px 8px; display: flex; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--border); }
  .tac-name { font-weight: 700; }
  .tac-cost { font-family: monospace; color: #92400e; font-weight: 700; }
  .tac-body { padding: 6px 8px; }
  .tac-row { margin-bottom: 4px; }
  .tac-meta { font-family: monospace; font-size: 7.5pt; color: var(--muted); }
  .tac-ability { display: flex; gap: 6px; align-items: flex-start; margin-top: 4px; }
  .tac-ab-text { font-size: 8.5pt; color: var(--muted); }
  .tac-ab-name { font-weight: 700; color: var(--text); }
  .scenario-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .scenario-strap {
    margin: -2px 0 8px;
    padding: 5px 8px;
    border: 1px solid var(--border);
    background: linear-gradient(90deg, #f8fafc 0%, #eef2ff 100%);
    font-size: 8pt;
    color: #475569;
    font-style: italic;
  }
  .scenario-card { border: 1px solid var(--border); border-radius: 3px; overflow: hidden; break-inside: avoid; }
  .scenario-card-header { padding: 5px 8px; border-bottom: 1px solid var(--border); color: #fff; }
  .scenario-card-header.mission { background: #9a3412; }
  .scenario-card-header.map { background: #155e75; }
  .scenario-card-header.deployment { background: #334155; }
  .scenario-card-title { font-size: 10pt; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; }
  .scenario-card-body { padding: 6px 8px; }
  .scenario-list { display: grid; gap: 4px; }
  .scenario-line { font-size: 8.5pt; color: var(--muted); line-height: 1.45; }
  .scenario-rule-list { margin-top: 6px; }
  .scenario-map-svg { width: 100%; height: auto; display: block; border-radius: 6px; background: #f8fafc; margin-bottom: 8px; }
  .scenario-map-legend { display: flex; flex-wrap: wrap; gap: 10px; font-size: 7.5pt; color: var(--muted); margin-bottom: 8px; }
  .scenario-legend-item { display: inline-flex; align-items: center; gap: 5px; }
  .scenario-legend-swatch { width: 14px; height: 10px; border-radius: 2px; display: inline-block; }
  .scenario-legend-swatch.red { background: rgba(239,68,68,.28); border: 1px solid #ef4444; }
  .scenario-legend-swatch.blue { background: rgba(59,130,246,.28); border: 1px solid #3b82f6; }
  .scenario-legend-dot { width: 16px; height: 16px; border-radius: 50%; background: #facc15; border: 1px solid #0f172a; display: inline-grid; place-items: center; font-size: 8pt; font-weight: 700; color: #0f172a; }
  @media print {
    .scenario-grid { grid-template-columns: 1fr 1fr; }
  }
</style>
</head>
<body>
  <div class="page-header">
    <h1>${escapeHtml(data.title || "SC:TMG Army Sheet")}</h1>
    <div class="header-meta">
      <span>${escapeHtml(data.scaleName || "")}</span>
      <span>${escapeHtml(data.totalLabel || "")}</span>
    </div>
  </div>
  <div class="page-header" style="border-bottom-width:1px; margin-bottom:12px;">
    <div class="faction-tag">${escapeHtml(data.factionName || "")}</div>
    <div class="faction-tag">${escapeHtml(data.slotLabel || "")}</div>
  </div>
  ${renderScenarioSection(data)}
  ${(data.units || []).map(renderUnitBlock).join("")}
  ${(data.tacticalCards || []).length ? `
    <div style="margin-top:20px;">
      <div class="page-header" style="border-bottom-color:#b45309;">
        <h1 style="font-size:13pt;">Tactical Cards</h1>
        <span class="faction-tag">Army support and faction tools</span>
      </div>
      <div class="tactical-grid">${(data.tacticalCards || []).map(renderTacticalCard).join("")}</div>
    </div>
  ` : ""}
</body>
</html>`;
  }

  function openPrintWindow(html) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.alert("Pop-up blocked. Please allow pop-ups to open the army sheet export.");
      return false;
    }
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
    return true;
  }

  window.__armySheetExport = {
    buildArmySheetHtml,
    openPrintWindow
  };
})();
