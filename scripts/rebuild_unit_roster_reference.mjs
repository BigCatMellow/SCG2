import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const referencesFile = path.join(root, 'source-references', 'generated', 'part12_units_and_upgrades.json');
const runtimeFile = path.join(root, 'runtime', 'unit-roster-reference.js');

const part12 = JSON.parse(fs.readFileSync(referencesFile, 'utf8'));

function slugToId(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseCost(value) {
  const text = String(value || '').trim();
  if (!text || text === '-' || text === '') return null;
  const numeric = Number(text);
  return Number.isFinite(numeric) ? numeric : text;
}

function normalizeRowKeys(row) {
  const normalized = {};
  for (const [key, value] of Object.entries(row || {})) {
    normalized[key.replace(/\s+/g, ' ').trim()] = value;
  }
  return normalized;
}

function normalizeCompositionOptions(options) {
  return (options || []).map(option => {
    const row = normalizeRowKeys(option);
    return {
      models: row.Models || null,
      mineralCost: parseCost(row['Mineral Cost']),
      supplyValue: parseCost(row['Supply Value']),
    };
  });
}

function normalizeUpgradeCosts(rows) {
  return (rows || []).map(row => {
    const normalized = normalizeRowKeys(row);
    const costs = Object.entries(normalized)
      .filter(([key]) => key.startsWith('Mineral Cost'))
      .map(([key, value]) => ({
        bracket: key.replace(/^Mineral Cost/, '').trim() || null,
        cost: parseCost(value),
      }))
      .filter(entry => entry.cost != null);

    return {
      id: slugToId(normalized.Upgrade),
      name: normalized.Upgrade || null,
      type: normalized.Type || null,
      costs,
    };
  });
}

const roster = Object.fromEntries(
  part12.map(factionEntry => [
    factionEntry.faction.toLowerCase(),
    factionEntry.units.map(unit => ({
      id: slugToId(unit.name),
      name: unit.name,
      compositionOptions: normalizeCompositionOptions(unit.compositionOptions),
      upgradeCosts: normalizeUpgradeCosts(unit.upgradeCosts),
    })),
  ]),
);

const content = `export const UNIT_ROSTER_REFERENCE = ${JSON.stringify(roster, null, 2)};\n\nexport const UNIT_ROSTER_REFERENCE_NOTES = {\n  purpose: 'Canonical Part 12 mustering layer for composition options and upgrade costs.',\n  status: 'generated-from-rules',\n  source: 'source-references/generated/part12_units_and_upgrades.json',\n};\n`;

fs.writeFileSync(runtimeFile, content, 'utf8');
console.log(`Wrote ${runtimeFile}`);
