/**
 * StarCraft TMG - Adapter layer for current builders
 *
 * The current HTML builders were written around page-local arrays.
 * This adapter converts the runtime schema into flatter arrays that are closer
 * to what those pages already expect, so migration can happen incrementally.
 */

import {
  BUILDER_RUNTIME,
  getFactionRuntime,
  resolveUnit,
  resolveFactionCard,
  resolveTacticalCard,
} from './runtime-merge.js';
import { getUnitFamilyMetadata } from './unit-family-metadata.js';

function deriveUnitFamilyName(name) {
  const trimmedName = String(name || '').trim();
  const match = trimmedName.match(/\(([^()]+)\)\s*$/);
  return (match ? match[1] : trimmedName).trim();
}

function isBaseFamilyUnitName(name) {
  const trimmedName = String(name || '').trim();
  return trimmedName.toLowerCase() === deriveUnitFamilyName(trimmedName).toLowerCase();
}

/**
 * Convert a unit record into a flatter builder card.
 * @param {object} unit
 */
export function toBuilderUnitCard(unit) {
  const resolved = resolveUnit(unit.id) || unit;
  const familyMetadata = getUnitFamilyMetadata(resolved.id);
  const family = familyMetadata?.family || deriveUnitFamilyName(resolved.name);
  return {
    id: resolved.id,
    faction: resolved.faction,
    factionTags: resolved.factionTags || [],
    name: resolved.name,
    family,
    variantOrder: Number.isFinite(Number(familyMetadata?.variantOrder))
      ? Number(familyMetadata.variantOrder)
      : (isBaseFamilyUnitName(resolved.name) ? 0 : 1),
    role: resolved.role,
    unique: !!resolved.unique,
    mineralCost: resolved.mineralCost ?? 0,
    gasCost: resolved.gasCost ?? 0,
    combatTags: resolved.combatTags || [],
    stats: resolved.stats || {},
    supplyProfile: resolved.supplyProfile || [],
    weapons: resolved.weapons || [],
    abilities: resolved.abilities || [],
    upgrades: resolved.upgrades || [],
    sourceRefs: resolved.sourceRefs || [],
    notes: resolved.notes || null,
  };
}

/**
 * Convert a faction card record into a flatter builder card.
 * @param {object} factionCard
 */
export function toBuilderFactionCard(factionCard) {
  const resolved = resolveFactionCard(factionCard.id) || factionCard;
  return {
    id: resolved.id,
    faction: resolved.faction,
    factionTags: resolved.factionTags || [],
    name: resolved.name,
    unique: !!resolved.unique,
    resourceType: resolved.resourceType,
    resourceValue: resolved.resourceValue,
    startingSlots: resolved.startingSlots || {},
    abilities: resolved.abilities || [],
    sourceRefs: resolved.sourceRefs || [],
    notes: resolved.notes || null,
  };
}

/**
 * Get the current-builder-style payload for one faction.
 * @param {'zerg'|'protoss'|'terran'} factionKey
 */
export function getBuilderPayload(factionKey) {
  const runtime = getFactionRuntime(factionKey);
  if (!runtime) return null;

  return {
    faction: runtime.label,
    factionKey: runtime.key,
    factionCards: runtime.factionCards.map(toBuilderFactionCard),
    units: runtime.units.map(toBuilderUnitCard),
    tacticalCards: runtime.tacticalCards.map(card => resolveTacticalCard(card.id) || card),
    upgrades: runtime.upgrades,
    counts: runtime.counts,
  };
}

/**
 * Export all factions in builder-friendly form.
 */
export const BUILDER_PAYLOADS = {
  zerg: getBuilderPayload('zerg'),
  protoss: getBuilderPayload('protoss'),
  terran: getBuilderPayload('terran'),
};

export { BUILDER_RUNTIME };
