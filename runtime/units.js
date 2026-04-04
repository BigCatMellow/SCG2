import {
  ZERG_UNITS,
} from './zerg-content.js';
import {
  PROTOSS_UNITS,
} from './protoss-content.js';
import {
  TERRAN_UNITS,
} from './terran-content.js';

export const UNITS = [
  ...ZERG_UNITS,
  ...PROTOSS_UNITS,
  ...TERRAN_UNITS,
];

export const UNIT_SCHEMA_NOTES = {
  purpose: 'Canonical aggregated unit collection across all factions.',
  identity: 'Units keep stable ids and link to weapons, abilities, and upgrades by ID.',
  pricing: 'Current starter records use mineralCost/gasCost plus supplyProfile; fuller tier data can be layered on later.',
};
