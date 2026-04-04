/**
 * StarCraft TMG - Builder-ready runtime merge layer
 *
 * Purpose:
 * - consume the per-faction content files plus shared schema-oriented files
 * - build one clean runtime object for the current site/builder layer
 * - provide stable indexes for fast lookup by ID
 *
 * This file does NOT change site styles. It only changes how data is delivered.
 */

import {
  ZERG_CONTENT,
  PROTOSS_CONTENT,
  TERRAN_CONTENT,
} from './index.js';

/**
 * Normalize "Zerg" -> "zerg", "Protoss" -> "protoss", etc.
 * @param {string} faction
 * @returns {string}
 */
export function factionKey(faction) {
  return String(faction || '').trim().toLowerCase();
}

/**
 * Build a map keyed by object.id
 * @template T extends {{id:string}}
 * @param {T[]} items
 * @returns {Record<string, T>}
 */
export function byId(items) {
  return Object.fromEntries((items || []).map(item => [item.id, item]));
}

/**
 * Flatten a faction content object into one predictable runtime shape.
 * @param {object} content
 */
export function normalizeFactionContent(content) {
  const faction = factionKey(content.faction);
  const factionCards = content.factionCards || [];
  const units = content.units || [];
  const weapons = content.weapons || [];
  const abilities = content.abilities || [];
  const tacticalCards = content.tacticalCards || [];
  const upgrades = content.upgrades || [];

  return {
    key: faction,
    label: content.faction,
    factionCards,
    units,
    weapons,
    abilities,
    tacticalCards,
    upgrades,

    indexes: {
      factionCardsById: byId(factionCards),
      unitsById: byId(units),
      weaponsById: byId(weapons),
      abilitiesById: byId(abilities),
      tacticalCardsById: byId(tacticalCards),
      upgradesById: byId(upgrades),
    },

    counts: {
      factionCards: factionCards.length,
      units: units.length,
      weapons: weapons.length,
      abilities: abilities.length,
      tacticalCards: tacticalCards.length,
      upgrades: upgrades.length,
    },
  };
}

/**
 * Full builder-facing runtime object.
 */
export const BUILDER_RUNTIME = {
  factions: {
    zerg: normalizeFactionContent(ZERG_CONTENT),
    protoss: normalizeFactionContent(PROTOSS_CONTENT),
    terran: normalizeFactionContent(TERRAN_CONTENT),
  },
};

export const ALL_RUNTIME_COLLECTIONS = {
  factionCards: [
    ...BUILDER_RUNTIME.factions.zerg.factionCards,
    ...BUILDER_RUNTIME.factions.protoss.factionCards,
    ...BUILDER_RUNTIME.factions.terran.factionCards,
  ],
  units: [
    ...BUILDER_RUNTIME.factions.zerg.units,
    ...BUILDER_RUNTIME.factions.protoss.units,
    ...BUILDER_RUNTIME.factions.terran.units,
  ],
  weapons: [
    ...BUILDER_RUNTIME.factions.zerg.weapons,
    ...BUILDER_RUNTIME.factions.protoss.weapons,
    ...BUILDER_RUNTIME.factions.terran.weapons,
  ],
  abilities: [
    ...BUILDER_RUNTIME.factions.zerg.abilities,
    ...BUILDER_RUNTIME.factions.protoss.abilities,
    ...BUILDER_RUNTIME.factions.terran.abilities,
  ],
  tacticalCards: [
    ...BUILDER_RUNTIME.factions.zerg.tacticalCards,
    ...BUILDER_RUNTIME.factions.protoss.tacticalCards,
    ...BUILDER_RUNTIME.factions.terran.tacticalCards,
  ],
  upgrades: [
    ...BUILDER_RUNTIME.factions.zerg.upgrades,
    ...BUILDER_RUNTIME.factions.protoss.upgrades,
    ...BUILDER_RUNTIME.factions.terran.upgrades,
  ],
};

export const ALL_RUNTIME_INDEXES = {
  factionCardsById: byId(ALL_RUNTIME_COLLECTIONS.factionCards),
  unitsById: byId(ALL_RUNTIME_COLLECTIONS.units),
  weaponsById: byId(ALL_RUNTIME_COLLECTIONS.weapons),
  abilitiesById: byId(ALL_RUNTIME_COLLECTIONS.abilities),
  tacticalCardsById: byId(ALL_RUNTIME_COLLECTIONS.tacticalCards),
  upgradesById: byId(ALL_RUNTIME_COLLECTIONS.upgrades),
};

/**
 * Get one faction runtime object by key.
 * @param {'zerg'|'protoss'|'terran'} key
 */
export function getFactionRuntime(key) {
  return BUILDER_RUNTIME.factions[factionKey(key)];
}

/**
 * Resolve a unit and attach its linked weapons / abilities / upgrades.
 * Useful for builders and modal viewers.
 * @param {string} unitId
 */
export function resolveUnit(unitId) {
  const unit = ALL_RUNTIME_INDEXES.unitsById[unitId];
  if (!unit) return null;

  const linkedUpgrades = (unit.upgradeRefs || []).map(id => ALL_RUNTIME_INDEXES.upgradesById[id]).filter(Boolean);

  return {
    ...unit,
    weapons: (unit.weaponIds || []).map(id => ALL_RUNTIME_INDEXES.weaponsById[id]).filter(Boolean),
    abilities: (unit.abilityIds || []).map(id => ALL_RUNTIME_INDEXES.abilitiesById[id]).filter(Boolean),
    upgrades: linkedUpgrades.length > 0
      ? linkedUpgrades
      : ALL_RUNTIME_COLLECTIONS.upgrades.filter(upgrade => upgrade.unitId === unit.id),
  };
}

/**
 * Resolve a faction card and attach linked abilities.
 * @param {string} factionCardId
 */
export function resolveFactionCard(factionCardId) {
  const card = ALL_RUNTIME_INDEXES.factionCardsById[factionCardId];
  if (!card) return null;

  return {
    ...card,
    abilities: (card.abilityIds || []).map(id => ALL_RUNTIME_INDEXES.abilitiesById[id]).filter(Boolean),
  };
}

/**
 * Resolve a tactical card and attach linked abilities.
 * @param {string} tacticalCardId
 */
export function resolveTacticalCard(tacticalCardId) {
  const card = ALL_RUNTIME_INDEXES.tacticalCardsById[tacticalCardId];
  if (!card) return null;

  return {
    ...card,
    abilities: (card.abilityIds || []).map(id => ALL_RUNTIME_INDEXES.abilitiesById[id]).filter(Boolean),
  };
}
