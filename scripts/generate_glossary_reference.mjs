import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KEYWORDS } from '../runtime/keywords.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function normalizeText(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\s+\./g, '.')
    .replace(/\s+,/g, ',')
    .replace(/\s+:/g, ':')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function buildQuickRead(rawText) {
  const cleaned = normalizeText(rawText)
    .replace(/\(Part[^)]*\)/gi, '')
    .replace(/\bEnemy Units\b/g, 'enemy units')
    .replace(/\bEnemy Unit\b/g, 'enemy unit')
    .replace(/\bLeading Model\b/g, 'leading model')
    .replace(/\bMission Markers\b/g, 'mission markers')
    .replace(/\bMission Marker\b/g, 'mission marker')
    .replace(/\bUnits\b/g, 'units')
    .replace(/\bUnit\b/g, 'unit')
    .replace(/\bTerrain\b/g, 'terrain')
    .replace(/\bModels\b/g, 'models')
    .replace(/\bModel\b/g, 'model');
  const firstSentence = cleaned.split(/(?<=[.!?])\s+/)[0] || cleaned;
  if (!firstSentence) return '';
  const simplified = firstSentence.replace(/\s{2,}/g, ' ').replace(/\s+\./g, '.').trim();
  if (/^The player whose turn it is/i.test(simplified)) return 'This means the player currently taking actions.';
  if (/^A physical Token used to track/i.test(simplified)) return 'This is the token that shows who currently has initiative.';
  if (/^A terrain piece/i.test(simplified)) return 'This term explains a terrain rule that affects movement, line of sight, or both.';
  if (/^This Unit cannot/i.test(simplified)) return 'In simple terms: this places a hard restriction on what the unit can do.';
  if (/^This weapon cannot/i.test(simplified)) return 'In simple terms: this weapon is restricted in when it can be used.';
  return simplified;
}

function buildExample(name, rawText) {
  const upperName = String(name || '').toUpperCase();
  const examples = {
    'ACCESS POINT': 'Example: if a model climbs through a doorway or ramp between levels, it is using an access point.',
    'ACTIVE PLAYER': 'Example: if it is your activation and you are choosing actions, you are the active player.',
    'ANTI-EVADE': 'Example: if a weapon has ANTI-EVADE (1), the target makes its Evade roll one step worse for that attack.',
    'BUFF': 'Example: if a unit gains BUFF Speed (2), it moves farther until the round ends.',
    'BULKY': 'Example: if the unit is already engaged, it cannot fire a Bulky ranged weapon.',
    'BURROWED': 'Example: if a Zerg unit gains Burrowed, it is now treated as having that status until something removes it.',
    'BURST FIRE': 'Example: if the target is inside the listed short range, the weapon gains extra rate of attack dice.',
    'CONCENTRATED FIRE': 'Example: even if the attack rolls huge damage, it can only remove up to the listed number of models.',
    'CRITICAL HIT': 'Example: if CRITICAL HIT (1) triggers, one die skips Armour and goes straight into Damage.',
    'DEBUFF': 'Example: if a unit suffers DEBUFF Hit (1), its attack rolls become one step worse until the round ends.',
    'DODGE': 'Example: if Surge would push 2 dice into Damage and the unit has DODGE (1), only 1 die gets through from that effect.',
    'ENTRY EDGE': 'Example: when a reserve unit deploys, it comes in from its assigned entry edge.',
    'FIGHTING RANK': 'Example: a model within 1 inch of an enemy is in the fighting rank and can strike in Combat.',
    'FIRST PLAYER MARKER': 'Example: when someone passes first in Movement or Assault, the marker can change hands for the next phase.',
    'FLYING': 'Example: a Flying unit can move over terrain, but it cannot control mission markers or fight in Combat.',
    'HEAL': 'Example: if a unit has 2 damage marked and resolves HEAL (1), it drops to 1 damage marked.',
    'HIDDEN': 'Example: if the attacker is farther than 4 inches away, it usually cannot target a Hidden unit.',
    'HITS': 'Example: HITS 2 means 2 dice go straight into the Armour Pool before armour rolls are made.',
    'IMPACT': 'Example: after a successful charge, each eligible model rolls its Impact dice before normal Combat attacks.'
  };
  if (examples[upperName]) return examples[upperName];
  if (/cannot Control or Contest Mission Markers/i.test(rawText)) {
    return 'Example: even if it is standing next to an objective, that unit still does not count for controlling it.';
  }
  if (/When this Unit is targeted by an attack/i.test(rawText)) {
    return 'Example: this takes effect right when the unit becomes the target of an attack.';
  }
  if (/When making a Ranged Attack/i.test(rawText)) {
    return 'Example: check this keyword at the moment the ranged attack is declared and resolved.';
  }
  if (/When this Unit completes a successful Charge/i.test(rawText)) {
    return 'Example: this only happens after the charge succeeds, not on a failed charge.';
  }
  if (/cannot/i.test(rawText)) {
    return 'Example: if a situation would break this restriction, the action is not allowed unless another rule overrides it.';
  }
  return '';
}

const glossaryEntries = Object.values(KEYWORDS)
  .map((keyword) => {
    const raw = normalizeText(keyword.description || '');
    return {
      id: keyword.id,
      name: keyword.name,
      type: keyword.type || 'Keyword',
      raw_definition: raw,
      plain_english: buildQuickRead(raw),
      example: buildExample(keyword.name, raw)
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const jsonPath = path.join(rootDir, 'source-references', 'generated', 'complete_glossary.json');
const browserPath = path.join(rootDir, 'runtime', 'payloads', 'glossary-reference.js');

await writeFile(jsonPath, JSON.stringify(glossaryEntries, null, 2) + '\n', 'utf8');
await writeFile(
  browserPath,
  'window.__glossaryReference = ' + JSON.stringify(glossaryEntries, null, 2) + ';\n',
  'utf8'
);

console.log(JSON.stringify({ ok: true, entries: glossaryEntries.length, jsonPath, browserPath }, null, 2));
