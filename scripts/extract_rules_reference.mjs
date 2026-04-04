import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const rulesRoot = path.join(workspaceRoot, '..', 'Rules');
const outputRoot = path.join(workspaceRoot, 'source-references');

const files = {
  part9: path.join(rulesRoot, 'PART_9_PREPARING_FOR_BATTLE.html'),
  part11: path.join(rulesRoot, 'PART_11_KEYWORD_GLOSSARY_AND_DEFINITIONS.html'),
  part12: path.join(rulesRoot, 'PART_12_QUICK_REFERENCE.html'),
  zerg: path.join(rulesRoot, 'zerg_faction_expanded.html'),
  protoss: path.join(rulesRoot, 'protoss_faction_expanded.html'),
  terran: path.join(rulesRoot, 'terran_faction_expanded.html'),
};

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function decodeEntities(text) {
  return String(text || '')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&times;/g, '×')
    .replace(/&#215;/g, '×')
    .replace(/&#x27;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '-')
    .replace(/&#160;/g, ' ');
}

function stripTags(html) {
  return decodeEntities(
    String(html || '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/div>/gi, '\n')
      .replace(/<li[^>]*>/gi, '• ')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\r/g, '')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim(),
  );
}

function normalizeName(value) {
  return stripTags(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function parseFactionExpandedSquadTiers(bodyHtml) {
  const tiersHtml = String(bodyHtml || '');
  if (!/fac-squad-container/i.test(tiersHtml)) return [];

  const tierRegex = /<div style="font-size:12px; color:white; font-weight:bold;">([\s\S]*?)<\/div>\s*<div style="font-size:8px; color:#94a3b8; text-transform:uppercase;">Models<\/div>[\s\S]*?<div style="font-size:12px; color:white; font-weight:bold;">([\s\S]*?)<\/div>\s*<div style="font-size:8px; color:#94a3b8; text-transform:uppercase;">Supply<\/div>/gi;

  return [...tiersHtml.matchAll(tierRegex)].map(match => ({
    models: stripTags(match[1]),
    supply: stripTags(match[2]),
  }));
}

function parseSimpleTable(tableHtml) {
  const rowMatches = [...tableHtml.matchAll(/<tr>([\s\S]*?)<\/tr>/gi)];
  if (rowMatches.length === 0) return [];

  const rows = rowMatches.map(match =>
    [...match[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(cell => stripTags(cell[1])),
  );

  const headers = rows[0];
  return rows.slice(1).map(cells => {
    const row = {};
    headers.forEach((header, index) => {
      row[header || `column_${index + 1}`] = cells[index] || '';
    });
    return row;
  });
}

function extractRuleSubsections(html) {
  const sections = [];
  const sectionRegex = /<div class="rule-sub-wrapper"[^>]*>[\s\S]*?<button class="rule-sub-btn"[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?<\/button>[\s\S]*?<div class="rich-editor"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/div>\s*<\/div>/gi;

  for (const match of html.matchAll(sectionRegex)) {
    sections.push({
      title: stripTags(match[1]),
      text: stripTags(match[2]),
    });
  }

  return sections;
}

function extractKeywords(html) {
  const keywords = [];
  const regex = /<div class="rule-sub-wrapper"[^>]*>[\s\S]*?<button class="rule-sub-btn"[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?<\/button>[\s\S]*?<div class="rich-editor"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/div>\s*<\/div>/gi;

  for (const match of html.matchAll(regex)) {
    const name = stripTags(match[1]);
    if (!name || name.includes('Keywords')) continue;
    keywords.push({
      name,
      slug: normalizeName(name),
      text: stripTags(match[2]),
    });
  }

  return keywords;
}

function extractFactionExpanded(html, faction) {
  const categoryCounts = {
    faction_cards: Number((html.match(/FACTION CARDS \((\d+)\)/i) || [])[1] || 0),
    unit_cards: Number((html.match(/UNIT CARDS \((\d+)\)/i) || [])[1] || 0),
    tactical_cards: Number((html.match(/TACTICAL CARDS \((\d+)\)/i) || [])[1] || 0),
  };

  const items = [];
  const itemBlocks = String(html || '').split('<div class="fac-item-wrapper">').slice(1);

  for (const block of itemBlocks) {
    const headerMatch = block.match(/<button class="fac-item-btn" onclick="window\.toggleItem\('([^']+)'\)">[\s\S]*?<span style="color:white; font-size:14px;">([\s\S]*?)<\/span>/i);
    if (!headerMatch) continue;

    const id = headerMatch[1];
    const name = stripTags(headerMatch[2]);
    const bodyHtml = (block.match(/<div class="fac-item-body">([\s\S]*)$/i)?.[1] || '').trim();
    const typeMatch = bodyHtml.match(/font-size:11px; text-transform:uppercase;[^>]*>([^<]+)<\/h4>/i);
    const phaseTitles = [...bodyHtml.matchAll(/<button class="fac-phase-btn"[\s\S]*?<span>[\s\S]*?<\/i>\s*([^<]+?)\s*<\/span>/gi)].map(m => stripTags(m[1]));

    items.push({
      faction,
      id,
      name,
      slug: normalizeName(name),
      type: typeMatch ? stripTags(typeMatch[1]) : null,
      phases: phaseTitles,
      squadTiers: parseFactionExpandedSquadTiers(bodyHtml),
      text: stripTags(bodyHtml),
    });
  }

  return {
    faction,
    counts: categoryCounts,
    items,
  };
}

function extractQuickReferenceUnits(html) {
  const factions = [
    { faction: 'Terran', start: 'id="sub-10-0"', end: 'id="sub-10-1"' },
    { faction: 'Zerg', start: 'id="sub-10-1"', end: 'id="sub-10-2"' },
    { faction: 'Protoss', start: 'id="sub-10-2"', end: '<div class="rule-cat-wrapper" id="rule-11">' },
  ];

  return factions.map(({ faction, start, end }) => {
    const startIndex = html.indexOf(start);
    const endIndex = html.indexOf(end, startIndex + start.length);
    const sectionHtml = startIndex >= 0
      ? html.slice(startIndex, endIndex >= 0 ? endIndex : undefined)
      : '';
    const units = [];

    const unitRegex = /<div class="rule-subsub-wrapper"[^>]*id="subsub-10-[^"]+"[\s\S]*?<button class="rule-subsub-btn"[\s\S]*?<span>[\s\S]*?<\/i>\s*([^<]+?)<\/span>[\s\S]*?<\/button>[\s\S]*?<div class="rich-editor"[^>]*>([\s\S]*?)<\/div>/gi;
    for (const unitMatch of sectionHtml.matchAll(unitRegex)) {
      const name = stripTags(unitMatch[1]);
      const bodyHtml = unitMatch[2];
      const tables = [...bodyHtml.matchAll(/<table[\s\S]*?<\/table>/gi)].map(match => match[0]);

      units.push({
        name,
        slug: normalizeName(name),
        compositionOptions: tables[0] ? parseSimpleTable(tables[0]) : [],
        upgradeCosts: tables[1] ? parseSimpleTable(tables[1]) : [],
      });
    }

    return { faction, units };
  });
}

function extractQuickReferenceTactical(html) {
  const factions = [
    { faction: 'Terran', start: 'id="sub-11-0"', end: 'id="sub-11-1"' },
    { faction: 'Zerg', start: 'id="sub-11-1"', end: 'id="sub-11-2"' },
    { faction: 'Protoss', start: 'id="sub-11-2"', end: '<div style="text-align:right; margin-top:20px;">' },
  ];

  return factions.map(({ faction, start, end }) => {
    const startIndex = html.indexOf(start);
    const endIndex = html.indexOf(end, startIndex + start.length);
    const sectionHtml = startIndex >= 0
      ? html.slice(startIndex, endIndex >= 0 ? endIndex : undefined)
      : '';
    const tables = [...sectionHtml.matchAll(/<table[\s\S]*?<\/table>/gi)].map(match => match[0]);

    return {
      faction,
      tacticalCards: tables[0] ? parseSimpleTable(tables[0]) : [],
      extraCards: tables[1] ? parseSimpleTable(tables[1]) : [],
    };
  });
}

function loadRuntimeCollections() {
  const runtimeRoot = path.join(workspaceRoot, 'runtime');
  const contentFiles = [
    { faction: 'zerg', file: path.join(runtimeRoot, 'zerg-content.js') },
    { faction: 'protoss', file: path.join(runtimeRoot, 'protoss-content.js') },
    { faction: 'terran', file: path.join(runtimeRoot, 'terran-content.js') },
  ];

  return contentFiles.map(({ faction, file }) => {
    const source = read(file);
    const readCount = exportName => {
      const match = new RegExp(`export const ${exportName} = \\[(.*?)\\];`, 'gs').exec(source);
      if (!match?.[1]) return 0;
      return (match[1].match(/\bid:/g) || []).length;
    };

    return {
      faction,
      counts: {
        factionCards: readCount(`${faction.toUpperCase()}_FACTION_CARDS`),
        units: readCount(`${faction.toUpperCase()}_UNITS`),
        weapons: readCount(`${faction.toUpperCase()}_WEAPONS`),
        abilities: readCount(`${faction.toUpperCase()}_ABILITIES`),
        tacticalCards: readCount(`${faction.toUpperCase()}_TACTICAL_CARDS`),
        upgrades: readCount(`${faction.toUpperCase()}_UPGRADES`),
      },
    };
  });
}

function buildAudit(factionExpanded, quickUnits, quickTactical) {
  const runtime = loadRuntimeCollections();
  const runtimeByFaction = Object.fromEntries(runtime.map(entry => [entry.faction, entry]));
  const quickUnitsByFaction = Object.fromEntries(quickUnits.map(entry => [entry.faction.toLowerCase(), entry]));
  const quickTacticalByFaction = Object.fromEntries(quickTactical.map(entry => [entry.faction.toLowerCase(), entry]));

  return factionExpanded.map(entry => {
    const faction = entry.faction.toLowerCase();
    const runtimeEntry = runtimeByFaction[faction];
    const unitEntry = quickUnitsByFaction[faction];
    const tacticalEntry = quickTacticalByFaction[faction];

    return {
      faction,
      sourceCounts: {
        factionCards: entry.counts.faction_cards || 0,
        units: entry.counts.unit_cards || 0,
        tacticalCards: entry.counts.tactical_cards || 0,
        quickReferenceUnits: unitEntry?.units.length || 0,
        quickReferenceTacticalCards: (tacticalEntry?.tacticalCards.length || 0) + (tacticalEntry?.extraCards.length || 0),
      },
      runtimeCounts: runtimeEntry?.counts || null,
      gaps: {
        missingUnitsInRuntime: Math.max((entry.counts.unit_cards || 0) - (runtimeEntry?.counts.units || 0), 0),
        missingTacticalCardsInRuntime: Math.max((entry.counts.tactical_cards || 0) - (runtimeEntry?.counts.tacticalCards || 0), 0),
      },
    };
  });
}

function writeJson(relativePath, value) {
  const fullPath = path.join(outputRoot, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeMarkdown(relativePath, content) {
  const fullPath = path.join(outputRoot, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

const part9Html = read(files.part9);
const part11Html = read(files.part11);
const part12Html = read(files.part12);

const part9Sections = extractRuleSubsections(part9Html);
const keywords = extractKeywords(part11Html);
const quickUnits = extractQuickReferenceUnits(part12Html);
const quickTactical = extractQuickReferenceTactical(part12Html);
const factionExpanded = [
  extractFactionExpanded(read(files.zerg), 'Zerg'),
  extractFactionExpanded(read(files.protoss), 'Protoss'),
  extractFactionExpanded(read(files.terran), 'Terran'),
];
const audit = buildAudit(factionExpanded, quickUnits, quickTactical);

writeJson('generated/part9_army_building.json', part9Sections);
writeJson('generated/part11_keywords.json', keywords);
writeJson('generated/part12_units_and_upgrades.json', quickUnits);
writeJson('generated/part12_tactical_cards.json', quickTactical);
writeJson('generated/faction_expanded_reference.json', factionExpanded);
writeJson('generated/runtime_vs_rules_audit.json', audit);

writeMarkdown(
  'generated/README.md',
  [
    '# Generated Rule References',
    '',
    'These files are generated from the HTML sources in the sibling `Rules/` folder.',
    '',
    '## Files',
    '',
    '- `part9_army_building.json`: extracted Part 9 army-building sections',
    '- `part11_keywords.json`: extracted keyword glossary entries',
    '- `part12_units_and_upgrades.json`: extracted composition options and upgrade costs',
    '- `part12_tactical_cards.json`: extracted tactical card gas costs',
    '- `faction_expanded_reference.json`: extracted item lists and body text from faction-expanded files',
    '- `runtime_vs_rules_audit.json`: current runtime coverage compared against the rules sources',
    '',
    'Regenerate these references by running:',
    '',
    '```powershell',
    'node .\\scripts\\extract_rules_reference.mjs',
    '```',
    '',
  ].join('\n'),
);

console.log(`Wrote generated rule references to ${outputRoot}`);
