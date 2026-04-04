import {
  ZERG_WEAPONS,
} from './zerg-content.js';
import {
  PROTOSS_WEAPONS,
} from './protoss-content.js';
import {
  TERRAN_WEAPONS,
} from './terran-content.js';

export const WEAPONS = [
  ...ZERG_WEAPONS,
  ...PROTOSS_WEAPONS,
  ...TERRAN_WEAPONS,
];

export const WEAPON_SCHEMA_NOTES = {
  purpose: 'Canonical aggregated weapon profile collection across all factions.',
  identity: 'Weapons keep stable ids and point back to owning units with unitId.',
  storage: 'Rules text and keyword links belong on the weapon profile rather than repeated inside unit blobs.',
};
