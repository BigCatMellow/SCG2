import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const referencesRoot = path.join(root, 'source-references', 'generated');
const runtimeRoot = path.join(root, 'runtime');
const outputFile = path.join(runtimeRoot, 'generated-rules-content.js');
const summaryFile = path.join(runtimeRoot, 'runtime-summary.json');

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(referencesRoot, fileName), 'utf8'));
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseNumber(value) {
  const text = String(value || '').trim();
  if (!text || text === '-') return null;
  const numeric = Number(text);
  return Number.isFinite(numeric) ? numeric : null;
}

function normalizeRuntimeId(faction, name) {
  return `${slugify(faction)}-${slugify(name)}`;
}

function tokenSignature(value) {
  return String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .sort()
    .join('|');
}

function splitFactionEntry(entry) {
  const factionCardCount = entry.counts?.faction_cards || 0;
  const unitCardCount = entry.counts?.unit_cards || 0;

  return {
    factionCards: entry.items.slice(0, factionCardCount),
    unitCards: entry.items.slice(factionCardCount, factionCardCount + unitCardCount),
    tacticalCards: entry.items.slice(factionCardCount + unitCardCount),
  };
}

function parseResourceAndSlots(text) {
  const resourceMatch = String(text || '').match(/RESOURCE\s*\n\s*\+?(\d+)\s+([A-Z]+)/i);
  const slotNames = ['hero', 'elite', 'core', 'support'];
  const startingSlots = {};

  for (const slotName of slotNames) {
    const match = String(text || '').match(new RegExp(`${slotName}\\s+slot\\s*\\n\\s*(\\d+)`, 'i'));
    if (match) {
      startingSlots[slotName] = Number(match[1]);
    }
  }

  return {
    resourceType: resourceMatch?.[2] || null,
    resourceValue: resourceMatch ? Number(resourceMatch[1]) : null,
    startingSlots,
  };
}

function parseUnitStats(text) {
  const cleanText = String(text || '');
  const capture = pattern => cleanText.match(pattern)?.[1] || null;

  return {
    shield: capture(/([0-9]+|-)\s+SHLD/i),
    speed: capture(/([0-9/]+|-)\s+SPD/i),
    evade: capture(/([0-9]+\+|-)\s+EVA/i),
    armour: capture(/([0-9]+\+|-)\s+ARM/i),
    hp: parseNumber(capture(/([0-9]+|-)\s+HP/i)),
    size: parseNumber(capture(/([0-9]+|-)\s+SIZ/i)),
  };
}

function normalizeCompositionOptions(options) {
  return (options || []).map(option => ({
    models: option.Models || null,
    supply: parseNumber(option['Supply Value']) ?? 0,
    mineralCost: parseNumber(option['Mineral Cost']),
  }));
}

function parseModelsUpperBound(modelsText) {
  const text = String(modelsText || '').trim();
  if (!text || text === '-') return null;

  const rangeMatch = text.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) return Number(rangeMatch[2]);

  const numericMatch = text.match(/(\d+)/);
  return numericMatch ? Number(numericMatch[1]) : null;
}

function normalizeSquadTiers(tiers) {
  return (tiers || []).map(tier => ({
    models: String(tier.models || '').trim() || null,
    supply: parseNumber(tier.supply) ?? 0,
    modelUpperBound: parseModelsUpperBound(tier.models),
  }));
}

function mergeSupplyProfiles(card, quickRef) {
  const quickOptions = normalizeCompositionOptions(quickRef?.compositionOptions || []);
  const squadTiers = normalizeSquadTiers(card?.squadTiers || []);

  if (squadTiers.length === 0) return quickOptions;

  const unmatchedQuickOptions = [...quickOptions];
  const merged = squadTiers.map(tier => {
    const exactIndex = unmatchedQuickOptions.findIndex(option =>
      option.supply === tier.supply
      && parseModelsUpperBound(option.models) === tier.modelUpperBound,
    );

    const fallbackIndex = exactIndex >= 0
      ? exactIndex
      : unmatchedQuickOptions.findIndex(option => option.supply === tier.supply);

    const matched = fallbackIndex >= 0
      ? unmatchedQuickOptions.splice(fallbackIndex, 1)[0]
      : null;

    return {
      models: tier.models,
      supply: tier.supply,
      mineralCost: matched?.mineralCost ?? null,
    };
  });

  return [
    ...merged,
    ...unmatchedQuickOptions,
  ];
}

function normalizeUpgradeType(typeText) {
  const type = String(typeText || '').replace(/\s+/g, ' ').trim();
  return type || 'Upgrade';
}

function parseSpecialist(typeText) {
  return /specialist/i.test(String(typeText || ''));
}

function parseReplacement(typeText) {
  const match = String(typeText || '').match(/↑\s*(.+)$/);
  return match ? match[1].trim().replace(/^for\s+/i, '') : null;
}

function firstDefined(...values) {
  return values.find(value => value !== undefined);
}

const factionExpanded = readJson('faction_expanded_reference.json');
const part12Units = readJson('part12_units_and_upgrades.json');
const part12Tactical = readJson('part12_tactical_cards.json');

const part12UnitsByFaction = Object.fromEntries(
  part12Units.map(entry => [entry.faction.toLowerCase(), entry.units]),
);

const tacticalByFaction = Object.fromEntries(
  part12Tactical.map(entry => [
    entry.faction.toLowerCase(),
    [...(entry.tacticalCards || []), ...(entry.extraCards || [])],
  ]),
);

const generated = {};
const summary = {
  factions: {},
  note: 'Counts reflect the generated rules-backed runtime coverage. Tactical cards, faction cards, units, and upgrade rosters are rebuilt from the extracted rules references; weapons and abilities remain partially hand-authored.',
};

for (const entry of factionExpanded) {
  const faction = entry.faction;
  const factionKey = faction.toLowerCase();
  const split = splitFactionEntry(entry);
  const unitsQuickRef = part12UnitsByFaction[factionKey] || [];
  const unitsBySlug = Object.fromEntries(unitsQuickRef.map(unit => [slugify(unit.name), unit]));
  const tacticalQuickRef = tacticalByFaction[factionKey] || [];
  const tacticalBySlug = Object.fromEntries(tacticalQuickRef.map(card => [slugify(card.Name), card]));
  const tacticalBySignature = Object.fromEntries(tacticalQuickRef.map(card => [tokenSignature(card.Name), card]));

  const factionCards = split.factionCards.map(card => {
    const parsed = parseResourceAndSlots(card.text);
    return {
      id: normalizeRuntimeId(faction, card.name),
      faction,
      name: card.name,
      unique: true,
      factionTags: [faction, card.name],
      resourceType: parsed.resourceType,
      resourceValue: parsed.resourceValue,
      startingSlots: parsed.startingSlots,
      sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(card.name)}`],
      notes: 'Generated from faction-expanded source text.',
    };
  });

  const units = split.unitCards.map(card => {
    const unitId = normalizeRuntimeId(faction, card.name);
    const quickRef = unitsBySlug[slugify(card.name)] || null;
    const stats = parseUnitStats(card.text);
    const supplyProfile = mergeSupplyProfiles(card, quickRef);
    const firstOption = supplyProfile[0] || {};
    const firstCostedOption = supplyProfile.find(option => option.mineralCost != null) || firstOption;
    const upgradeRefs = (quickRef?.upgradeCosts || []).map(upgrade => `${unitId}-${slugify(upgrade.Upgrade)}`);

    return {
      id: unitId,
      faction,
      name: card.name,
      factionTags: [faction],
      unique: supplyProfile.length === 1 && String(firstOption.models || '').trim() === '1',
      stats,
      supplyProfile,
      mineralCost: firstDefined(firstCostedOption.mineralCost, null),
      gasCost: 0,
      upgradeRefs,
      sourceRefs: [`SRC-${faction.toUpperCase()}`, 'PART-12.10', `card:${slugify(card.name)}`],
      notes: 'Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data.',
    };
  });

  const upgrades = unitsQuickRef.flatMap(unit => {
    const unitId = normalizeRuntimeId(faction, unit.name);
    return (unit.upgradeCosts || []).map(upgrade => ({
      id: `${unitId}-${slugify(upgrade.Upgrade)}`,
      unitId,
      name: upgrade.Upgrade || null,
      type: normalizeUpgradeType(upgrade.Type),
      cost: (() => {
        const values = [...new Set(Object.entries(upgrade)
          .filter(([key]) => key.startsWith('Mineral Cost'))
          .map(([, value]) => String(value || '').trim())
          .filter(value => value && value !== '-'))];
        return values.length <= 1 ? (values[0] || null) : values.join('/');
      })(),
      specialist: parseSpecialist(upgrade.Type),
      replacesWeapon: parseReplacement(upgrade.Type),
      sourceRefs: ['PART-12.10', `card:${slugify(unit.name)}`],
      notes: 'Generated from Part 12 quick-reference upgrade costs.',
    }));
  });

  const tacticalCards = split.tacticalCards.map(card => {
    const parsed = parseResourceAndSlots(card.text);
    const quickRef = tacticalBySlug[slugify(card.name)] || tacticalBySignature[tokenSignature(card.name)] || null;
    const canonicalName = quickRef?.Name || card.name;
    return {
      id: normalizeRuntimeId(faction, canonicalName),
      faction,
      name: canonicalName,
      factionTags: [faction],
      gasCost: parseNumber(quickRef?.['Vespene Gas Cost']),
      resourceType: parsed.resourceType,
      resourceValue: parsed.resourceValue,
      additionalSlots: parsed.startingSlots,
      sourceRefs: [`SRC-${faction.toUpperCase()}`, 'PART-12.11', `card:${slugify(canonicalName)}`],
      notes: 'Generated from faction-expanded tactical-card text and Part 12 gas costs.',
    };
  });

  generated[factionKey] = {
    factionCards,
    units,
    upgrades,
    tacticalCards,
  };

  summary.factions[factionKey] = {
    factionCards: factionCards.length,
    units: units.length,
    weapons: 0,
    abilities: 0,
    tacticalCards: tacticalCards.length,
    upgrades: upgrades.length,
  };
}

const content = `export const GENERATED_RULES_CONTENT = ${JSON.stringify(generated, null, 2)};\n\nexport const GENERATED_RULES_CONTENT_NOTES = {\n  purpose: 'Generated rules-backed faction card, unit, tactical card, and upgrade reference layer.',\n  status: 'generated-from-rules',\n  sources: [\n    'source-references/generated/faction_expanded_reference.json',\n    'source-references/generated/part12_units_and_upgrades.json',\n    'source-references/generated/part12_tactical_cards.json'\n  ]\n};\n`;

fs.writeFileSync(outputFile, content, 'utf8');
fs.writeFileSync(summaryFile, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

console.log(`Wrote ${outputFile}`);
console.log(`Updated ${summaryFile}`);
