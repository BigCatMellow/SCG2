import {
  ZERG_TACTICAL_CARDS,
} from './zerg-content.js';
import {
  PROTOSS_TACTICAL_CARDS,
} from './protoss-content.js';
import {
  TERRAN_TACTICAL_CARDS,
} from './terran-content.js';

export const TACTICAL_CARDS = [
  ...ZERG_TACTICAL_CARDS,
  ...PROTOSS_TACTICAL_CARDS,
  ...TERRAN_TACTICAL_CARDS,
];

export const TACTICAL_CARD_SCHEMA_NOTES = {
  purpose: 'Canonical aggregated tactical card collection across all factions.',
  identity: 'Tactical card ids should remain stable so save files and future adapters stay compatible.',
  status: 'Starter data is intentionally sparse and should be expanded from the faction sources.',
};
