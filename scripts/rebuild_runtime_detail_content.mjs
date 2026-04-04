import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rulesRoot = path.join(root, '..', 'Rules');
const runtimeRoot = path.join(root, 'runtime');
const outputFile = path.join(runtimeRoot, 'generated-rules-detail-content.js');

const files = {
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
    .replace(/&times;/g, 'x')
    .replace(/&#215;/g, 'x')
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
      .replace(/<\/span>/gi, ' ')
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

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeId(faction, name) {
  return `${slugify(faction)}-${slugify(name)}`;
}

function normalizeKeywordId(value) {
  return slugify(value).replace(/^-+|-+$/g, '');
}

function buildPhaseScopedId(ownerId, name, phaseLabel) {
  return `${ownerId}-${slugify(name)}-${slugify(normalizePhaseLabel(phaseLabel))}`;
}

function extractItemWrappers(html) {
  const items = [];
  const text = String(html || '');
  let cursor = 0;

  while (true) {
    const itemStart = text.indexOf('<div class="fac-item-wrapper">', cursor);
    if (itemStart < 0) break;

    const buttonStart = text.indexOf('<button class="fac-item-btn"', itemStart);
    const buttonEnd = text.indexOf('</button>', buttonStart);
    const bodyStart = text.indexOf('<div class="fac-item-body">', buttonEnd);
    const sourceIdMatch = text.slice(buttonStart, buttonEnd).match(/window\.toggleItem\('([^']+)'\)/i);
    const bodyBlock = extractBalancedDivContent(text, bodyStart);

    if (buttonStart < 0 || buttonEnd < 0 || bodyStart < 0 || !sourceIdMatch || !bodyBlock) {
      cursor = itemStart + 1;
      continue;
    }

    const buttonHtml = text.slice(buttonStart, buttonEnd);
    items.push({
      sourceId: sourceIdMatch[1],
      buttonHtml,
      bodyHtml: bodyBlock.innerHtml,
      name: stripTags((buttonHtml.match(/font-size:14px;">([\s\S]*?)<\/span>/i) || [])[1]),
    });

    cursor = bodyBlock.endIndex;
  }

  return items;
}

function extractCounts(html) {
  return {
    factionCards: Number((html.match(/FACTION CARDS \((\d+)\)/i) || [])[1] || 0),
    unitCards: Number((html.match(/UNIT CARDS \((\d+)\)/i) || [])[1] || 0),
    tacticalCards: Number((html.match(/TACTICAL CARDS \((\d+)\)/i) || [])[1] || 0),
  };
}

function splitItemsByCategory(items, counts) {
  return {
    factionCards: items.slice(0, counts.factionCards),
    units: items.slice(counts.factionCards, counts.factionCards + counts.unitCards),
    tacticalCards: items.slice(counts.factionCards + counts.unitCards, counts.factionCards + counts.unitCards + counts.tacticalCards),
  };
}

function parseSubtitle(buttonHtml) {
  const matches = [...String(buttonHtml || '').matchAll(/<div style="font-size:10px; color:#64748b; margin-top:2px; font-weight:normal;">([\s\S]*?)<\/div>/gi)];
  const values = matches.map(match => stripTags(match[1])).filter(Boolean);
  return values[0] || null;
}

function parseTags(bodyHtml) {
  const match = String(bodyHtml || '').match(/<strong[^>]*>\s*TAGS:\s*<\/strong>([\s\S]*?)<\/div>/i);
  return String(stripTags(match?.[1] || ''))
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
}

function parseKeywordIdsFromHtml(html) {
  return [...new Set(
    [...String(html || '').matchAll(/openKeywordModal\('([^']+)'\)/gi)]
      .map(match => normalizeKeywordId(match[1]))
      .filter(Boolean),
  )];
}

function extractBalancedDivContent(html, divStart) {
  const text = String(html || '');
  if (divStart < 0) return null;
  const startTagEnd = text.indexOf('>', divStart);
  if (startTagEnd < 0) return null;

  let depth = 0;
  const tokenRegex = /<div\b[^>]*>|<\/div>/gi;
  tokenRegex.lastIndex = divStart;

  let match;
  while ((match = tokenRegex.exec(text))) {
    if (match.index < divStart) continue;

    if (match[0].startsWith('</div')) {
      depth -= 1;
      if (depth === 0) {
        return {
          innerHtml: text.slice(startTagEnd + 1, match.index),
          endIndex: match.index + match[0].length,
        };
      }
    } else {
      depth += 1;
    }
  }

  return null;
}

function parsePhaseWrappers(bodyHtml) {
  const wrappers = [];
  const text = String(bodyHtml || '');
  let cursor = 0;

  while (true) {
    const wrapperStart = text.indexOf('<div class="fac-phase-wrapper">', cursor);
    if (wrapperStart < 0) break;

    const bodyStart = text.indexOf('<div class="fac-phase-body">', wrapperStart);
    if (bodyStart < 0) break;

    const headerHtml = text.slice(wrapperStart, bodyStart);
    const buttonMatch = headerHtml.match(/window\.togglePhase\('([^']+)'\)[\s\S]*?<span>[\s\S]*?<\/i>\s*([^<]+?)\s*<\/span>/i);
    const bodyBlock = extractBalancedDivContent(text, bodyStart);

    if (!buttonMatch || !bodyBlock) {
      cursor = wrapperStart + 1;
      continue;
    }

    wrappers.push({
      phaseId: buttonMatch[1],
      phaseLabel: stripTags(buttonMatch[2]),
      bodyHtml: bodyBlock.innerHtml,
    });

    cursor = bodyBlock.endIndex;
  }

  return wrappers;
}

function parseUpgradePhaseWrappers(bodyHtml) {
  const wrappers = [];
  const text = String(bodyHtml || '');
  const regex = /<button class="fac-phase-btn" onclick="window\.togglePhase\('([^']+_upg)'\)"[\s\S]*?<span>[\s\S]*?<\/i>\s*([^<]+?)\s*<\/span>[\s\S]*?<\/button>/gi;
  let match;

  while ((match = regex.exec(text))) {
    const bodyStart = text.indexOf('<div class="fac-phase-body">', match.index);
    const bodyBlock = extractBalancedDivContent(text, bodyStart);
    if (bodyStart < 0 || !bodyBlock) continue;

    wrappers.push({
      phaseId: match[1],
      phaseLabel: stripTags(match[2]),
      bodyHtml: bodyBlock.innerHtml,
    });

    regex.lastIndex = bodyBlock.endIndex;
  }

  return wrappers;
}

function parseWeaponRows(tableHtml) {
  const rows = [...String(tableHtml || '').matchAll(/<tr>([\s\S]*?)<\/tr>/gi)].slice(1);

  return rows.map(rowMatch => {
    const cells = [...rowMatch[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(cell => cell[1]);
    const nameCell = cells[0] || '';
    const rawName = stripTags(nameCell).split('\n')[0].trim();
    const rawRulesText = stripTags(nameCell).split('\n').slice(1).join(' ').trim();
    const rulesText = rawRulesText && rawRulesText !== 'FOR -' ? rawRulesText : null;
    const keywordText = stripTags(cells[8] || '');
    const keywordIds = keywordText
      .split(/[,\n]/)
      .map(normalizeKeywordId)
      .filter(Boolean);

    return {
      name: rawName,
      range: stripTags(cells[1] || ''),
      target: stripTags(cells[2] || ''),
      roa: stripTags(cells[3] || ''),
      hit: stripTags(cells[4] || ''),
      surgeType: stripTags(cells[5] || ''),
      surgeDice: stripTags(cells[6] || ''),
      damage: stripTags(cells[7] || ''),
      keywordIds,
      rulesText,
      pts: stripTags(cells[9] || ''),
    };
  }).filter(row => row.name);
}

function parseWeaponTables(phaseBodyHtml, faction, ownerId, ownerName, phaseLabel) {
  const tables = [...String(phaseBodyHtml || '').matchAll(/<table[^>]*class="sc-weapon-table"[^>]*>([\s\S]*?)<\/table>/gi)];
  const weapons = [];

  for (const match of tables) {
    for (const row of parseWeaponRows(match[1])) {
      weapons.push({
        id: buildPhaseScopedId(ownerId, row.name, phaseLabel),
        unitId: ownerId,
        name: row.name,
        phase: phaseLabel,
        range: row.range || '-',
        target: row.target || '-',
        roa: row.roa === '-' ? null : Number(row.roa),
        hit: row.hit || '-',
        surgeType: row.surgeType === '-' ? null : row.surgeType,
        surgeDice: row.surgeDice === '-' ? null : row.surgeDice,
        damage: row.damage === '-' ? null : Number(row.damage),
        keywordIds: row.keywordIds,
        rulesText: row.rulesText,
        sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(ownerName)}`],
        notes: 'Generated from faction-expanded weapon tables.',
      });
    }
  }

  return weapons;
}

function parseAbilityType(pillText) {
  const clean = String(pillText || '').replace(/\s+/g, ' ').trim();
  const match = clean.match(/^([A-Za-z ]+?)(?:\((.+)\))?$/);
  return {
    type: match?.[1]?.trim() || clean || 'Passive',
    cost: match?.[2]?.trim() || null,
  };
}

function normalizePhaseLabel(label) {
  return String(label || '')
    .replace(/\s*-\s*UPGRADES\s*$/i, '')
    .trim();
}

function parsePtsCost(blockHtml) {
  const match = String(blockHtml || '').match(/PTS:\s*([^<\n]+)/i);
  return match?.[1]?.trim() || null;
}

function parseAbilityBlocks(phaseBodyHtml, faction, ownerType, ownerId, ownerName, phaseLabel) {
  const abilities = [];
  const text = String(phaseBodyHtml || '');
  let cursor = 0;
  const blockStarts = [
    '<div style="background:rgba(255,255,255,0.03);',
    '<div style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px dashed #334155;">',
  ];

  while (true) {
    const blockStart = blockStarts
      .map(marker => text.indexOf(marker, cursor))
      .filter(index => index >= 0)
      .sort((left, right) => left - right)[0] ?? -1;
    if (blockStart < 0) break;

    const block = extractBalancedDivContent(text, blockStart);
    if (!block) {
      cursor = blockStart + 1;
      continue;
    }

    const blockHtml = block.innerHtml;
    const name = stripTags((blockHtml.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i) || [])[1]);
    if (!name) {
      cursor = block.endIndex;
      continue;
    }

    if (!/fac-act-pill/i.test(blockHtml)) {
      cursor = block.endIndex;
      continue;
    }

    const pill = parseAbilityType(stripTags((blockHtml.match(/<span class="fac-act-pill[^"]*"[^>]*>([\s\S]*?)<\/span>/i) || [])[1]));
    const blockText = stripTags(blockHtml);
    const description = blockText
      .replace(new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'), '')
      .replace(new RegExp(`^${(pill.cost ? `${pill.type} (${pill.cost})` : pill.type).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'), '')
      .replace(/^PTS:\s*\d+\s*/i, '')
      .trim();
    const keywordIds = parseKeywordIdsFromHtml(blockHtml);

    abilities.push({
      id: `${ownerId}-${slugify(name)}`,
      ownerType,
      ownerId,
      name,
      phaseLimit: phaseLabel,
      type: pill.type,
      cost: pill.cost,
      trigger: null,
      text: description,
      keywordIds,
      sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(ownerName)}`],
      oncePerRound: /once per round/i.test(description),
      oncePerGame: /once per game/i.test(description),
      notes: 'Generated from faction-expanded ability text.',
    });

    cursor = block.endIndex;
  }

  return abilities;
}

function buildUpgradeWeaponText(weapon) {
  return [
    weapon.rulesText || null,
    `RNG ${weapon.range}`,
    `TGT ${weapon.target}`,
    `RoA ${weapon.roa ?? '-'}`,
    `Hit ${weapon.hit}`,
    weapon.surgeType ? `Surge ${weapon.surgeType}` : null,
    weapon.surgeDice ? `S.Die ${weapon.surgeDice}` : null,
    weapon.damage != null ? `Dmg ${weapon.damage}` : null,
    weapon.keywordIds.length > 0 ? `Keywords: ${weapon.keywordIds.join(', ')}` : null,
  ].filter(Boolean).join('. ');
}

function parseUpgradeBlocks(phaseBodyHtml, faction, ownerId, ownerName, phaseLabel) {
  const upgrades = [];
  const text = String(phaseBodyHtml || '');
  let cursor = 0;

  while (true) {
    const blockStart = text.indexOf('<div style="margin-bottom:8px;', cursor);
    if (blockStart < 0) break;

    const block = extractBalancedDivContent(text, blockStart);
    if (!block) {
      cursor = blockStart + 1;
      continue;
    }

    const blockHtml = block.innerHtml;
    const name = stripTags((blockHtml.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i) || [])[1]);
    if (!name) {
      cursor = block.endIndex;
      continue;
    }

    const pill = parseAbilityType(stripTags((blockHtml.match(/<span class="fac-act-pill[^"]*"[^>]*>([\s\S]*?)<\/span>/i) || [])[1]));
    const blockText = stripTags(blockHtml);
    const ptsCost = parsePtsCost(blockHtml);
    const description = blockText
      .replace(new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'), '')
      .replace(/^PTS:\s*[^ ]+\s*/i, '')
      .replace(new RegExp(`^${(pill.cost ? `${pill.type} (${pill.cost})` : pill.type).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'), '')
      .trim();

    upgrades.push({
      id: `${ownerId}-${slugify(name)}`,
      unitId: ownerId,
      name,
      phase: normalizePhaseLabel(phaseLabel),
      type: pill.type,
      cost: ptsCost || pill.cost,
      text: description,
      keywordIds: parseKeywordIdsFromHtml(blockHtml),
      sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(ownerName)}`],
      notes: 'Generated from faction-expanded upgrade text.',
    });

    cursor = block.endIndex;
  }

  return upgrades;
}

function parseUpgradeWeaponTables(phaseBodyHtml, faction, ownerId, ownerName, phaseLabel) {
  const tables = [...String(phaseBodyHtml || '').matchAll(/<table[^>]*class="sc-weapon-table"[^>]*>([\s\S]*?)<\/table>/gi)];
  const upgrades = [];

  for (const match of tables) {
    for (const row of parseWeaponRows(match[1])) {
      const weapon = {
        id: `${ownerId}-${slugify(row.name)}`,
        unitId: ownerId,
        name: row.name,
        phase: normalizePhaseLabel(phaseLabel),
        range: row.range || '-',
        target: row.target || '-',
        roa: row.roa === '-' ? null : Number(row.roa),
        hit: row.hit || '-',
        surgeType: row.surgeType === '-' ? null : row.surgeType,
        surgeDice: row.surgeDice === '-' ? null : row.surgeDice,
        damage: row.damage === '-' ? null : Number(row.damage),
        keywordIds: row.keywordIds,
        rulesText: row.rulesText,
        sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(ownerName)}`],
      };

      upgrades.push({
        id: weapon.id,
        unitId: ownerId,
        name: weapon.name,
        phase: weapon.phase,
        type: 'Weapon',
        cost: row.pts || null,
        replacesWeapon: row.rulesText ? row.rulesText.replace(/^FOR\s+/i, '').trim() : null,
        text: buildUpgradeWeaponText(weapon),
        keywordIds: weapon.keywordIds,
        weaponProfile: {
          range: weapon.range,
          target: weapon.target,
          roa: weapon.roa,
          hit: weapon.hit,
          surgeType: weapon.surgeType,
          surgeDice: weapon.surgeDice,
          damage: weapon.damage,
          rulesText: weapon.rulesText,
          keywordIds: weapon.keywordIds,
        },
        sourceRefs: weapon.sourceRefs,
        notes: 'Generated from faction-expanded upgrade weapon table.',
      });
    }
  }

  return upgrades;
}

function synthesizeReplacementWeaponUpgrades(itemWeapons, faction, ownerId, ownerName) {
  return itemWeapons
    .filter(weapon => weapon.rulesText)
    .map(weapon => ({
      id: `${ownerId}-${slugify(weapon.name)}`,
      unitId: ownerId,
      name: weapon.name,
      phase: normalizePhaseLabel(weapon.phase),
      type: 'Weapon',
      cost: null,
      replacesWeapon: weapon.rulesText ? weapon.rulesText.replace(/^FOR\s+/i, '').trim() : null,
      text: buildUpgradeWeaponText(weapon),
      keywordIds: weapon.keywordIds || [],
      weaponProfile: {
        range: weapon.range,
        target: weapon.target,
        roa: weapon.roa,
        hit: weapon.hit,
        surgeType: weapon.surgeType,
        surgeDice: weapon.surgeDice,
        damage: weapon.damage,
        rulesText: weapon.rulesText,
        keywordIds: weapon.keywordIds || [],
      },
      sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(ownerName)}`],
      notes: 'Generated from faction-expanded replacement weapon row.',
    }));
}

function ownerTypeForCategory(category) {
  if (category === 'factionCards') return 'Faction Card';
  if (category === 'tacticalCards') return 'Tactical Card';
  return 'Unit';
}

const generated = {};

for (const [factionKey, filePath] of Object.entries(files)) {
  const faction = factionKey.charAt(0).toUpperCase() + factionKey.slice(1);
  const html = read(filePath);
  const split = splitItemsByCategory(extractItemWrappers(html), extractCounts(html));
  const factionCardPatches = [];
  const unitPatches = [];
  const tacticalCardPatches = [];
  const weapons = [];
  const abilities = [];
  const upgrades = [];

  for (const category of ['factionCards', 'units', 'tacticalCards']) {
    for (const item of split[category]) {
      const ownerId = normalizeId(faction, item.name);
      const wrappers = parsePhaseWrappers(item.bodyHtml);
      const isUnit = category === 'units';
      const relevantWrappers = isUnit
        ? wrappers.filter(wrapper => /_base$/i.test(wrapper.phaseId))
        : wrappers;
      const upgradeWrappers = isUnit
        ? parseUpgradePhaseWrappers(item.bodyHtml)
        : [];
      const itemWeapons = [];
      const itemAbilities = [];
      const itemUpgrades = [];

      if (isUnit) {
        unitPatches.push({
          id: ownerId,
          name: item.name,
          role: parseSubtitle(item.buttonHtml),
          combatTags: parseTags(item.bodyHtml),
          sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(item.name)}`],
          notes: 'Generated from faction-expanded unit header details.',
        });
      }

      for (const wrapper of relevantWrappers) {
        itemWeapons.push(...parseWeaponTables(wrapper.bodyHtml, faction, ownerId, item.name, wrapper.phaseLabel));
        itemAbilities.push(...parseAbilityBlocks(
          wrapper.bodyHtml,
          faction,
          ownerTypeForCategory(category),
          ownerId,
          item.name,
          wrapper.phaseLabel,
        ));
      }

      for (const wrapper of upgradeWrappers) {
        itemUpgrades.push(...parseUpgradeWeaponTables(wrapper.bodyHtml, faction, ownerId, item.name, wrapper.phaseLabel));
        itemUpgrades.push(...parseUpgradeBlocks(wrapper.bodyHtml, faction, ownerId, item.name, wrapper.phaseLabel));
      }

      if (isUnit) {
        for (const synthesizedUpgrade of synthesizeReplacementWeaponUpgrades(itemWeapons, faction, ownerId, item.name)) {
          const alreadyParsed = itemUpgrades.some(existingUpgrade =>
            slugify(existingUpgrade.name) === slugify(synthesizedUpgrade.name)
              && normalizePhaseLabel(existingUpgrade.phase) === normalizePhaseLabel(synthesizedUpgrade.phase)
          );
          if (!alreadyParsed) {
            itemUpgrades.push(synthesizedUpgrade);
          }
        }
      }

      weapons.push(...itemWeapons);
      abilities.push(...itemAbilities);
      upgrades.push(...itemUpgrades);

      if (category === 'units') {
        if (itemWeapons.length > 0) {
          unitPatches[unitPatches.length - 1].weaponIds = itemWeapons.map(record => record.id);
        }
        if (itemAbilities.length > 0) {
          unitPatches[unitPatches.length - 1].abilityIds = itemAbilities.map(record => record.id);
        }
      } else if (category === 'factionCards') {
        factionCardPatches.push({
          id: ownerId,
          name: item.name,
          preserveName: true,
          ...(itemAbilities.length > 0 ? { abilityIds: itemAbilities.map(record => record.id) } : {}),
          sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(item.name)}`],
          notes: 'Generated from faction-expanded faction-card abilities.',
        });
      } else if (category === 'tacticalCards') {
        tacticalCardPatches.push({
          id: ownerId,
          name: item.name,
          preserveName: true,
          ...(itemAbilities.length > 0 ? { abilityIds: itemAbilities.map(record => record.id) } : {}),
          sourceRefs: [`SRC-${faction.toUpperCase()}`, `card:${slugify(item.name)}`],
          notes: 'Generated from faction-expanded tactical-card abilities.',
        });
      }
    }
  }

  generated[factionKey] = {
    factionCardPatches,
    unitPatches,
    tacticalCardPatches,
    weapons,
    abilities,
    upgrades,
  };
}

const content = `export const GENERATED_RULES_DETAIL_CONTENT = ${JSON.stringify(generated, null, 2)};\n\nexport const GENERATED_RULES_DETAIL_CONTENT_NOTES = {\n  purpose: 'Generated rules-backed unit role, weapon, ability, and upgrade detail layer.',\n  status: 'generated-from-rules',\n  sources: [\n    'Rules/zerg_faction_expanded.html',\n    'Rules/protoss_faction_expanded.html',\n    'Rules/terran_faction_expanded.html'\n  ]\n};\n`;

fs.writeFileSync(outputFile, content, 'utf8');
console.log(`Wrote ${outputFile}`);
