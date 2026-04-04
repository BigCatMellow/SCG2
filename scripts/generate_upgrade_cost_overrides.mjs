import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceFile = path.join(root, 'unit upgrade costs.txt');
const outputFile = path.join(root, 'runtime', 'payloads', 'unit-upgrade-cost-overrides.js');

function normalizeKey(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function parseNumber(value) {
  const match = String(value || '').match(/-?\d+/);
  return match ? Number(match[0]) : null;
}

const text = fs.readFileSync(sourceFile, 'utf8').replace(/\r/g, '');
const sections = text.split(/\n##\s+/).slice(1);
const result = {};

for (const section of sections) {
  const lines = section.split('\n');
  const faction = lines.shift()?.trim() || '';
  const blocks = `## ${section}`.split(/\n###\s+/).slice(1);

  for (const block of blocks) {
    const headerLine = block.split('\n')[0]?.trim() || '';
    const headerMatch = headerLine.match(/^(.*?)\s+[—-]\s+(Small|Large)$/i);
    if (!headerMatch) continue;

    const unitName = headerMatch[1].trim();
    const size = headerMatch[2].toLowerCase();
    const unitKey = normalizeKey(unitName);
    const unitEntry = result[unitKey] || {
      faction,
      name: unitName,
      sizes: {},
    };

    const body = block.slice(headerLine.length);
    const baseCost = parseNumber(body.match(/\*\*Base Cost:\*\*\s*([^\n]+)/i)?.[1]);
    const modelsSupplyMatch = body.match(/\*\*Models \/ Supply:\*\*\s*([^\n]+)/i);
    const modelsSupply = modelsSupplyMatch?.[1]?.split('/').map(part => part.trim()) || [];
    const upgradesBlock = body.match(/\*\*Upgrades\*\*([\s\S]*?)(?:\n\*\*(?:Abilities|Abilities \/ Weapons|Weapons|Stats)\*\*|$)/i)?.[1] || '';
    const upgradeEntries = [...upgradesBlock.matchAll(/^\*\s*(.+?):\s*\+(\d+)\s*$/gm)].map(match => ({
      name: match[1].trim(),
      cost: Number(match[2]),
    }));

    unitEntry.sizes[size] = {
      baseCost,
      models: modelsSupply[0] || null,
      supply: parseNumber(modelsSupply[1]),
      upgrades: Object.fromEntries(
        upgradeEntries.map(entry => [normalizeKey(entry.name), { name: entry.name, cost: entry.cost }]),
      ),
    };

    result[unitKey] = unitEntry;
  }
}

const content = [
  'window.__unitUpgradeCostOverrides = ' + JSON.stringify(result, null, 2) + ';',
  '',
].join('\n');

fs.writeFileSync(outputFile, content, 'utf8');
console.log(`Wrote ${outputFile}`);
