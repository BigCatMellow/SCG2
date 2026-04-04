import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const referencesRoot = path.join(root, 'source-references', 'generated');
const outputRoot = referencesRoot;

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

function normalizedKey(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function tokenSignature(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .sort()
    .join('|');
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function normalizeKeywordList(values) {
  return [...new Set((values || []).map(value => slugify(value)).filter(Boolean))].sort();
}

function parseNumber(value) {
  const text = String(value ?? '').trim();
  if (!text || text === '-') return null;
  const numeric = Number(text);
  return Number.isFinite(numeric) ? numeric : null;
}

function parseFactionExpandedStats(text) {
  const source = String(text || '');
  const grab = pattern => source.match(pattern)?.[1] || null;
  const resourceMatch = source.match(/RESOURCE\s*\n\s*\+?(\d+)\s+([A-Z]+)/i);
  const slotNames = ['hero', 'elite', 'core', 'support'];
  const slots = {};

  for (const slotName of slotNames) {
    const match = source.match(new RegExp(`${slotName}\\s+slot\\s*\\n\\s*(\\d+)`, 'i'));
    if (match) {
      slots[slotName] = Number(match[1]);
    }
  }

  return {
    stats: {
      shield: grab(/([0-9]+|-)\s+SHLD/i),
      speed: grab(/([0-9/]+|-)\s+SPD/i),
      evade: grab(/([0-9]+\+|-)\s+EVA/i),
      armour: grab(/([0-9]+\+|-)\s+ARM/i),
      hp: parseNumber(grab(/([0-9]+|-)\s+HP/i)),
      size: parseNumber(grab(/([0-9]+|-)\s+SIZ/i)),
    },
    resourceType: resourceMatch?.[2] || null,
    resourceValue: resourceMatch ? Number(resourceMatch[1]) : null,
    slots,
  };
}

function buildFactionExpandedLookup() {
  const factionExpanded = readJson('faction_expanded_reference.json');
  const lookup = {};

  for (const factionEntry of factionExpanded) {
    const factionKey = factionEntry.faction.toLowerCase();
    lookup[factionKey] = {
      itemsByName: {},
      counts: factionEntry.counts || {},
    };
    for (const item of factionEntry.items || []) {
      lookup[factionKey].itemsByName[normalizedKey(item.name)] = {
        name: item.name,
        parsed: parseFactionExpandedStats(item.text),
      };
    }
  }

  return lookup;
}

function buildQuickUnitLookup() {
  const quick = readJson('part12_units_and_upgrades.json');
  const lookup = {};

  for (const factionEntry of quick) {
    const factionKey = factionEntry.faction.toLowerCase();
    lookup[factionKey] = {};
    for (const unit of factionEntry.units || []) {
      lookup[factionKey][normalizedKey(unit.name)] = {
        name: unit.name,
        compositionOptions: (unit.compositionOptions || []).map(option => ({
          models: option.Models || null,
          mineralCost: parseNumber(option['Mineral Cost']),
          supply: parseNumber(option['Supply Value']),
        })),
      };
    }
  }

  return lookup;
}

function buildQuickTacticalLookup() {
  const quick = readJson('part12_tactical_cards.json');
  const lookup = {};

  for (const factionEntry of quick) {
    const factionKey = factionEntry.faction.toLowerCase();
    lookup[factionKey] = {};
    for (const card of [...(factionEntry.tacticalCards || []), ...(factionEntry.extraCards || [])]) {
      lookup[factionKey][tokenSignature(card.Name)] = {
        name: card.Name,
        gasCost: parseNumber(card['Vespene Gas Cost']),
      };
    }
  }

  return lookup;
}

function compareObjects(actual, expected, fields) {
  const mismatches = [];
  for (const field of fields) {
    const actualValue = actual?.[field] ?? null;
    const expectedValue = expected?.[field] ?? null;
    if (actualValue !== expectedValue) {
      mismatches.push({ field, actual: actualValue, expected: expectedValue });
    }
  }
  return mismatches;
}

function compareTextField(field, actual, expected) {
  const actualValue = normalizeText(actual);
  const expectedValue = normalizeText(expected);
  return actualValue === expectedValue ? [] : [{ field, actual, expected }];
}

function compareKeywordField(field, actual, expected) {
  const actualValue = normalizeKeywordList(actual);
  const expectedValue = normalizeKeywordList(expected);
  return JSON.stringify(actualValue) === JSON.stringify(expectedValue)
    ? []
    : [{ field, actual: actualValue, expected: expectedValue }];
}

function buildSourceDetailLookup(detailContent) {
  const lookup = {};

  for (const [faction, entry] of Object.entries(detailContent)) {
    const factionCardsByName = {};
    const tacticalCardsByName = {};
    const unitWeapons = {};
    const unitAbilities = {};
    const unitUpgrades = {};

    for (const patch of entry.factionCardPatches || []) {
      factionCardsByName[tokenSignature(patch.name)] = { name: patch.name, abilities: [] };
    }

    for (const patch of entry.tacticalCardPatches || []) {
      tacticalCardsByName[tokenSignature(patch.name)] = { name: patch.name, abilities: [] };
    }

    for (const ability of entry.abilities || []) {
      if (ability.ownerType === 'Faction Card') {
        const key = tokenSignature((ability.sourceRefs || []).find(ref => ref.startsWith('card:'))?.replace(/^card:/, '') || ability.ownerId);
        const bucket = factionCardsByName[key] || { name: ability.ownerId, abilities: [] };
        bucket.abilities.push(ability);
        factionCardsByName[key] = bucket;
      } else if (ability.ownerType === 'Tactical Card') {
        const key = tokenSignature((ability.sourceRefs || []).find(ref => ref.startsWith('card:'))?.replace(/^card:/, '') || ability.ownerId);
        const bucket = tacticalCardsByName[key] || { name: ability.ownerId, abilities: [] };
        bucket.abilities.push(ability);
        tacticalCardsByName[key] = bucket;
      } else if (ability.ownerType === 'Unit') {
        unitAbilities[ability.ownerId] ||= [];
        unitAbilities[ability.ownerId].push(ability);
      }
    }

    for (const weapon of entry.weapons || []) {
      unitWeapons[weapon.unitId] ||= [];
      unitWeapons[weapon.unitId].push(weapon);
    }

    for (const upgrade of entry.upgrades || []) {
      unitUpgrades[upgrade.unitId] ||= [];
      unitUpgrades[upgrade.unitId].push(upgrade);
    }

    lookup[faction] = {
      factionCardsByName,
      tacticalCardsByName,
      unitWeapons,
      unitAbilities,
      unitUpgrades,
    };
  }

  return lookup;
}

function compareCollections({ actualItems, expectedItems, keyFor, compareItem, missingActualType, missingExpectedType }) {
  const issues = [];
  const actualMap = new Map();
  const expectedMap = new Map();

  for (const item of actualItems || []) {
    const key = keyFor(item);
    actualMap.set(key, item);
  }

  for (const item of expectedItems || []) {
    const key = keyFor(item);
    expectedMap.set(key, item);
  }

  for (const [key, expected] of expectedMap) {
    if (!actualMap.has(key)) {
      issues.push({ type: missingActualType, key, expectedName: expected.name || null });
      continue;
    }
    const actual = actualMap.get(key);
    const mismatches = compareItem(actual, expected);
    if (mismatches.length > 0) {
      issues.push({
        type: 'detail-mismatch',
        key,
        name: actual.name || expected.name || null,
        mismatches,
      });
    }
  }

  for (const [key, actual] of actualMap) {
    if (!expectedMap.has(key)) {
      issues.push({ type: missingExpectedType, key, actualName: actual.name || null });
    }
  }

  return issues;
}

function weaponKey(weapon) {
  return `${normalizedKey(weapon.name)}|${normalizedKey(weapon.phase)}`;
}

function abilityKey(ability) {
  return `${normalizedKey(ability.name)}|${normalizedKey(ability.phaseLimit)}`;
}

function upgradeKey(upgrade) {
  return `${normalizedKey(upgrade.name)}|${normalizedKey(upgrade.phase)}`;
}

function compareWeapon(actual, expected) {
  return [
    ...compareObjects(actual, expected, ['range', 'target', 'roa', 'hit', 'surgeType', 'surgeDice', 'damage']),
    ...compareTextField('rulesText', actual.rulesText, expected.rulesText),
    ...compareKeywordField('keywordIds', actual.keywordIds, expected.keywordIds),
  ];
}

function compareAbility(actual, expected) {
  return [
    ...compareObjects(actual, expected, ['type', 'cost']),
    ...compareTextField('phaseLimit', actual.phaseLimit, expected.phaseLimit),
    ...compareTextField('text', actual.text, expected.text),
  ];
}

function compareUpgrade(actual, expected) {
  const mismatches = [
    ...compareTextField('phase', actual.phase, expected.phase),
    ...compareTextField('type', actual.type, expected.type),
    ...compareObjects(actual, expected, ['cost']),
    ...compareTextField('replacesWeapon', actual.replacesWeapon, expected.replacesWeapon),
    ...compareTextField('text', actual.text, expected.text),
  ];

  if (expected.weaponProfile || actual.weaponProfile) {
    mismatches.push(
      ...compareObjects(actual.weaponProfile || {}, expected.weaponProfile || {}, ['range', 'target', 'roa', 'hit', 'surgeType', 'surgeDice', 'damage']),
      ...compareTextField('weaponProfile.rulesText', actual.weaponProfile?.rulesText, expected.weaponProfile?.rulesText),
      ...compareKeywordField('weaponProfile.keywordIds', actual.weaponProfile?.keywordIds, expected.weaponProfile?.keywordIds),
    );
  }

  return mismatches;
}

const runtimeModule = await import(pathToFileURL(path.join(root, 'runtime', 'index.js')).href);
const detailModule = await import(pathToFileURL(path.join(root, 'runtime', 'generated-rules-detail-content.js')).href);
const factionExpandedLookup = buildFactionExpandedLookup();
const quickUnitLookup = buildQuickUnitLookup();
const quickTacticalLookup = buildQuickTacticalLookup();
const detailLookup = buildSourceDetailLookup(detailModule.GENERATED_RULES_DETAIL_CONTENT);

const factions = ['zerg', 'protoss', 'terran'];
const report = {
  generatedAt: new Date().toISOString(),
  factions: {},
  summary: {
    totalIssues: 0,
    factionsWithIssues: [],
  },
};

for (const faction of factions) {
  const runtime = runtimeModule.getFactionRuntime(faction);
  const builder = runtimeModule.getBuilderPayload(faction);
  const expandedEntry = factionExpandedLookup[faction];
  const expanded = expandedEntry.itemsByName;
  const detail = detailLookup[faction];
  const factionReport = {
    counts: {
      runtime: runtime.counts,
      expected: {
        factionCards: expandedEntry.counts.faction_cards || 0,
        units: expandedEntry.counts.unit_cards || 0,
        tacticalCards: Object.keys(quickTacticalLookup[faction] || {}).length,
      },
    },
    issues: [],
  };

  for (const card of builder.factionCards) {
    const source = expanded[normalizedKey(card.name)];
    if (!source) {
      factionReport.issues.push({ type: 'missing-faction-card-source', name: card.name });
      continue;
    }
    const mismatches = [
      ...compareObjects(
        { resourceType: card.resourceType, resourceValue: card.resourceValue },
        { resourceType: source.parsed.resourceType, resourceValue: source.parsed.resourceValue },
        ['resourceType', 'resourceValue'],
      ),
      ...compareObjects(card.startingSlots || {}, source.parsed.slots || {}, ['hero', 'elite', 'core', 'support']),
    ];
    if (mismatches.length > 0) {
      factionReport.issues.push({ type: 'faction-card-mismatch', name: card.name, mismatches });
    }

    const expectedAbilities = detail.factionCardsByName[tokenSignature(card.name)]?.abilities || [];
    const abilityIssues = compareCollections({
      actualItems: card.abilities || [],
      expectedItems: expectedAbilities,
      keyFor: abilityKey,
      compareItem: compareAbility,
      missingActualType: 'missing-runtime-faction-card-ability',
      missingExpectedType: 'unexpected-runtime-faction-card-ability',
    });
    factionReport.issues.push(...abilityIssues.map(issue => ({ ...issue, ownerType: 'Faction Card', ownerName: card.name })));
  }

  for (const unit of builder.units) {
    const source = expanded[normalizedKey(unit.name)];
    if (!source) {
      factionReport.issues.push({ type: 'missing-unit-source', name: unit.name });
      continue;
    }

    const statsMismatches = compareObjects(unit.stats || {}, source.parsed.stats || {}, ['shield', 'speed', 'evade', 'armour', 'hp', 'size']);
    if (statsMismatches.length > 0) {
      factionReport.issues.push({ type: 'unit-stat-mismatch', name: unit.name, mismatches: statsMismatches });
    }

    const quick = quickUnitLookup[faction][normalizedKey(unit.name)];
    if (quick) {
      const runtimeFirst = (unit.supplyProfile || [])[0] || {};
      const quickFirst = (quick.compositionOptions || [])[0] || {};
      const firstMismatches = compareObjects(runtimeFirst, quickFirst, ['models', 'mineralCost', 'supply']);
      if (firstMismatches.length > 0) {
        factionReport.issues.push({ type: 'unit-mustering-mismatch', name: unit.name, mismatches: firstMismatches });
      }
    }

    const weaponIssues = compareCollections({
      actualItems: unit.weapons || [],
      expectedItems: detail.unitWeapons[unit.id] || [],
      keyFor: weaponKey,
      compareItem: compareWeapon,
      missingActualType: 'missing-runtime-weapon',
      missingExpectedType: 'unexpected-runtime-weapon',
    });
    factionReport.issues.push(...weaponIssues.map(issue => ({ ...issue, ownerType: 'Unit', ownerName: unit.name })));

    const abilityIssues = compareCollections({
      actualItems: unit.abilities || [],
      expectedItems: detail.unitAbilities[unit.id] || [],
      keyFor: abilityKey,
      compareItem: compareAbility,
      missingActualType: 'missing-runtime-unit-ability',
      missingExpectedType: 'unexpected-runtime-unit-ability',
    });
    factionReport.issues.push(...abilityIssues.map(issue => ({ ...issue, ownerType: 'Unit', ownerName: unit.name })));

    const upgradeIssues = compareCollections({
      actualItems: unit.upgrades || [],
      expectedItems: detail.unitUpgrades[unit.id] || [],
      keyFor: upgradeKey,
      compareItem: compareUpgrade,
      missingActualType: 'missing-runtime-upgrade',
      missingExpectedType: 'unexpected-runtime-upgrade',
    });
    factionReport.issues.push(...upgradeIssues.map(issue => ({ ...issue, ownerType: 'Unit', ownerName: unit.name })));
  }

  for (const tacticalCard of builder.tacticalCards) {
    const quick = quickTacticalLookup[faction][tokenSignature(tacticalCard.name)];
    if (!quick) {
      factionReport.issues.push({ type: 'missing-tactical-source', name: tacticalCard.name });
      continue;
    }
    if ((tacticalCard.gasCost ?? null) !== quick.gasCost) {
      factionReport.issues.push({
        type: 'tactical-gas-mismatch',
        name: tacticalCard.name,
        actual: tacticalCard.gasCost ?? null,
        expected: quick.gasCost,
      });
    }

    const expectedAbilities = detail.tacticalCardsByName[tokenSignature(tacticalCard.name)]?.abilities || [];
    const abilityIssues = compareCollections({
      actualItems: tacticalCard.abilities || [],
      expectedItems: expectedAbilities,
      keyFor: abilityKey,
      compareItem: compareAbility,
      missingActualType: 'missing-runtime-tactical-ability',
      missingExpectedType: 'unexpected-runtime-tactical-ability',
    });
    factionReport.issues.push(...abilityIssues.map(issue => ({ ...issue, ownerType: 'Tactical Card', ownerName: tacticalCard.name })));
  }

  const expectedFactionCards = expandedEntry.counts.faction_cards || 0;
  const expectedUnits = expandedEntry.counts.unit_cards || 0;
  const expectedTacticalCards = Object.keys(quickTacticalLookup[faction]).length;
  const countChecks = [
    ['factionCards', runtime.factionCards.length, expectedFactionCards],
    ['units', runtime.units.length, expectedUnits],
    ['tacticalCards', runtime.tacticalCards.length, expectedTacticalCards],
  ];

  for (const [label, actual, expected] of countChecks) {
    if (actual !== expected) {
      factionReport.issues.push({ type: 'count-mismatch', collection: label, actual, expected });
    }
  }

  report.factions[faction] = factionReport;
  report.summary.totalIssues += factionReport.issues.length;
  if (factionReport.issues.length > 0) {
    report.summary.factionsWithIssues.push(faction);
  }
}

const markdown = [
  '# Runtime Validation',
  '',
  `Generated: ${report.generatedAt}`,
  '',
  `Total issues: ${report.summary.totalIssues}`,
  '',
  ...factions.flatMap(faction => {
    const entry = report.factions[faction];
    const lines = [
      `## ${faction[0].toUpperCase()}${faction.slice(1)}`,
      '',
      `Issues: ${entry.issues.length}`,
    ];
    if (entry.issues.length === 0) {
      lines.push('', 'No mismatches found in the current validation set.');
      return lines.concat(['']);
    }
    lines.push('');
    for (const issue of entry.issues.slice(0, 40)) {
      lines.push(`- ${issue.type}: ${issue.ownerName || issue.name || issue.collection || issue.key || ''}`.trim());
    }
    lines.push('');
    return lines;
  }),
].join('\n');

fs.writeFileSync(path.join(outputRoot, 'runtime-validation-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputRoot, 'RUNTIME_VALIDATION.md'), `${markdown}\n`, 'utf8');

console.log(`Wrote ${path.join(outputRoot, 'runtime-validation-report.json')}`);
console.log(`Wrote ${path.join(outputRoot, 'RUNTIME_VALIDATION.md')}`);
