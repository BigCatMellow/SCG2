/**
 * Compatibility layer for the current HTML builders.
 *
 * The existing pages expect page-local arrays shaped like the old inline data.
 * This adapter lets the shared runtime feed those pages without forcing a UI rewrite.
 */

import { getBuilderPayload } from './builder-adapter.js';

function formatResource(resourceType, resourceValue) {
  if (!resourceType || resourceValue == null) return null;
  return `+${resourceValue} ${resourceType}`;
}

function titleCase(value) {
  return String(value || '')
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function toLegacyAbility(ability) {
  if (!ability) return null;

  const type = ability.cost ? `${ability.type} (${ability.cost})` : ability.type;

  return {
    phase: ability.phaseLimit || 'Any Phase',
    name: ability.name,
    type,
    description: ability.text || '',
  };
}

function groupAbilitiesByPhase(items) {
  return (items || []).reduce((groups, item) => {
    const phase = item.phase || 'Any Phase';
    groups[phase] ??= [];
    groups[phase].push({
      name: item.name,
      type: item.type,
      description: item.description,
    });
    return groups;
  }, {});
}

function toLegacyWeapon(weapon) {
  return {
    name: weapon.name,
    phase: weapon.phase?.replace(' Phase', '') || '',
    range: weapon.range,
    target: weapon.target,
    roa: weapon.roa != null ? String(weapon.roa) : '-',
    hit: weapon.hit,
    surge: weapon.surgeType || '-',
    sDie: weapon.surgeDice || '-',
    damage: weapon.damage != null ? String(weapon.damage) : '-',
    keywords: [],
  };
}

function toLegacyUpgrade(upgrade) {
  return {
    phase: upgrade.phase || 'Any Phase',
    name: upgrade.name,
    cost: Number.isFinite(Number(upgrade.cost)) ? Number(upgrade.cost) : upgrade.cost,
    type: upgrade.cost ? `${upgrade.type}${upgrade.specialist ? ' Specialist' : ''}` : upgrade.type,
    description: upgrade.text || '',
  };
}

function toLegacyFactionCard(card) {
  return {
    id: card.id,
    name: card.name,
    unique: card.unique,
    resource: formatResource(card.resourceType, card.resourceValue),
    slots: card.startingSlots || {},
    abilities: (card.abilities || []).map(toLegacyAbility).filter(Boolean),
  };
}

function toLegacyTiers(unit) {
  const supplyProfile = (unit.supplyProfile || []).filter(entry => entry && entry.models && entry.models !== '-');

  if (supplyProfile.length === 0) {
    return [{
      tier: 'T1',
      cost: unit.mineralCost ?? 0,
      models: '1-1',
      supply: 1,
    }];
  }

  return [...supplyProfile]
    .sort((a, b) => (Number(b.supply) || 0) - (Number(a.supply) || 0))
    .map((entry, index) => ({
    tier: `T${entry.supply ?? index + 1}`,
    cost: entry.mineralCost ?? null,
    models: entry.models || '1-1',
    supply: entry.supply ?? index + 1,
    }));
}

function toLegacyUnit(unit) {
  const baseAbilities = (unit.abilities || []).map(toLegacyAbility).filter(Boolean);
  const upgrades = (unit.upgrades || []).map(toLegacyUpgrade);

  return {
    id: unit.id,
    name: unit.name,
    family: unit.family || unit.name,
    variantOrder: Number.isFinite(Number(unit.variantOrder)) ? Number(unit.variantOrder) : 0,
    role: titleCase(unit.role),
    unique: unit.unique,
    tags: unit.combatTags || [],
    stats: {
      shield: unit.stats?.shield ?? null,
      speed: unit.stats?.speed ?? '-',
      evade: unit.stats?.evade ?? '-',
      armour: unit.stats?.armour ?? '-',
      hp: unit.stats?.hp ?? 0,
      size: unit.stats?.size ?? 0,
    },
    tiers: toLegacyTiers(unit),
    weapons: (unit.weapons || []).map(toLegacyWeapon),
    abilities: baseAbilities.filter(ability => ability.phase === 'Any Phase'),
    phaseAbilities: groupAbilitiesByPhase(baseAbilities.filter(ability => ability.phase !== 'Any Phase')),
    upgrades: groupAbilitiesByPhase(upgrades.map(upgrade => ({
      phase: upgrade.phase || 'Any Phase',
      name: upgrade.name,
      type: typeof upgrade.cost === 'number' ? `${upgrade.type} (${upgrade.cost})` : upgrade.type,
      description: upgrade.description,
    }))),
  };
}

function toLegacyTacticalCard(card) {
  return {
    ...card,
    cost: card.gasCost ?? card.cost ?? 0,
    resource: card.resourceType && card.resourceValue != null
      ? `+${card.resourceValue} ${card.resourceType}`
      : (card.resource ?? null),
    slots: card.additionalSlots || card.slots || {},
    abilities: (card.abilities || []).map(toLegacyAbility).filter(Boolean),
  };
}

export function getLegacyBuilderPayload(factionKey) {
  const payload = getBuilderPayload(factionKey);
  if (!payload) return null;

  return {
    faction: payload.faction,
    factionKey: payload.factionKey,
    factionCards: payload.factionCards.map(toLegacyFactionCard),
    units: payload.units.map(toLegacyUnit),
    tacticalCards: payload.tacticalCards.map(toLegacyTacticalCard),
    upgrades: payload.upgrades,
    counts: payload.counts,
    status: {
      active: true,
      mode: 'shared-runtime-legacy-adapter',
    },
  };
}

export const LEGACY_BUILDER_PAYLOADS = {
  zerg: getLegacyBuilderPayload('zerg'),
  protoss: getLegacyBuilderPayload('protoss'),
  terran: getLegacyBuilderPayload('terran'),
};
