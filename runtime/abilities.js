import {
  ZERG_ABILITIES,
} from './zerg-content.js';
import {
  PROTOSS_ABILITIES,
} from './protoss-content.js';
import {
  TERRAN_ABILITIES,
} from './terran-content.js';

export const ABILITIES = [
  ...ZERG_ABILITIES,
  ...PROTOSS_ABILITIES,
  ...TERRAN_ABILITIES,
];

export const ABILITY_SCHEMA_NOTES = {
  purpose: 'Canonical aggregated named ability collection across all factions.',
  identity: 'Abilities keep stable ids and link to owners through ownerType and ownerId.',
  structure: 'Ability text, trigger, phase limit, and cost should live here rather than being duplicated on pages.',
};
