import {
  ZERG_UPGRADES,
} from './zerg-content.js';
import {
  PROTOSS_UPGRADES,
} from './protoss-content.js';
import {
  TERRAN_UPGRADES,
} from './terran-content.js';

export const UPGRADES = [
  ...ZERG_UPGRADES,
  ...PROTOSS_UPGRADES,
  ...TERRAN_UPGRADES,
];

export const UPGRADE_SCHEMA_NOTES = {
  purpose: 'Canonical aggregated upgrade collection across all factions.',
  identity: 'Upgrade ids should stay stable and link to their owning unit by unitId where possible.',
  structure: 'Replacement weapons, specialist flags, and timing text stay on the upgrade record.',
};
