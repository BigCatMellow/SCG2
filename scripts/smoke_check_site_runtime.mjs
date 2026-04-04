import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getLegacyBuilderPayload } from '../runtime/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pageChecks = [
  { faction: 'zerg', file: 'zerg.html' },
  { faction: 'protoss', file: 'protoss.html' },
  { faction: 'terran', file: 'terran.html' },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function checkHtmlWiring(html, label) {
  assert(
    html.includes('./runtime/payloads/') || html.includes("window.__starcraftTMGRuntimePayload = getLegacyBuilderPayload("),
    `${label}: missing runtime payload import hook`
  );
  assert(
    html.includes('const runtimePayload = window.__starcraftTMGRuntimePayload;'),
    `${label}: missing runtime payload handoff`
  );
  assert(
    html.includes('const ZERG_FACTION_CARDS = Array.isArray(runtimePayload?.factionCards) ? runtimePayload.factionCards : [];'),
    `${label}: faction cards are not runtime-backed`
  );
  assert(
    html.includes('const ZERG_UNITS = Array.isArray(runtimePayload?.units) ? runtimePayload.units : [];'),
    `${label}: units are not runtime-backed`
  );
  assert(
    html.includes('const ZERG_TACTICAL_CARDS = Array.isArray(runtimePayload?.tacticalCards) ? runtimePayload.tacticalCards : [];'),
    `${label}: tactical cards are not runtime-backed`
  );
  assert(
    !html.includes('function mergeRuntimeRecords('),
    `${label}: legacy merge helper still present`
  );
}

const report = [];

for (const page of pageChecks) {
  const payload = getLegacyBuilderPayload(page.faction);
  assert(Array.isArray(payload.factionCards) && payload.factionCards.length > 0, `${page.faction}: no faction cards in runtime payload`);
  assert(Array.isArray(payload.units) && payload.units.length > 0, `${page.faction}: no units in runtime payload`);
  assert(Array.isArray(payload.tacticalCards) && payload.tacticalCards.length > 0, `${page.faction}: no tactical cards in runtime payload`);

  const htmlPath = path.join(rootDir, page.file);
  const html = await fs.readFile(htmlPath, 'utf8');
  checkHtmlWiring(html, page.file);

  report.push({
    faction: page.faction,
    file: htmlPath,
    counts: {
      factionCards: payload.factionCards.length,
      units: payload.units.length,
      tacticalCards: payload.tacticalCards.length,
    },
    runtimeStatus: payload.status,
  });
}

console.log(JSON.stringify({ ok: true, pages: report }, null, 2));
