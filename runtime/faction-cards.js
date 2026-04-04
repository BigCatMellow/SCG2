import {
  ZERG_FACTION_CARDS,
} from './zerg-content.js';
import {
  PROTOSS_FACTION_CARDS,
} from './protoss-content.js';
import {
  TERRAN_FACTION_CARDS,
} from './terran-content.js';

export const FACTION_CARDS = [
  ...ZERG_FACTION_CARDS,
  ...PROTOSS_FACTION_CARDS,
  ...TERRAN_FACTION_CARDS,
];

export const FACTION_CARD_SCHEMA_NOTES = {
  purpose: 'Canonical aggregated faction card collection across all factions.',
  identity: 'Keep ids stable even if display names or card labels change.',
  links: 'Abilities should be referenced by abilityIds and resolved at runtime.',
};
