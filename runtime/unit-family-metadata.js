export const UNIT_FAMILY_METADATA = {
  'zerg-corpser-roach': { family: 'Roach', variantOrder: 1 },
  'zerg-hydralisk': { family: 'Hydralisk', variantOrder: 0 },
  'zerg-kerrigan': { family: 'Kerrigan', variantOrder: 0 },
  'zerg-kerrigan-swarm-raptor-zergling': { family: 'Zergling', variantOrder: 2 },
  'zerg-omega-worm': { family: 'Omega Worm', variantOrder: 0 },
  'zerg-queen': { family: 'Queen', variantOrder: 0 },
  'zerg-raptor-zergling': { family: 'Zergling', variantOrder: 1 },
  'zerg-roach': { family: 'Roach', variantOrder: 0 },
  'zerg-roachling': { family: 'Roachling', variantOrder: 0 },
  'zerg-swarmling-zergling': { family: 'Zergling', variantOrder: 1 },
  'zerg-vile-roach': { family: 'Roach', variantOrder: 2 },
  'zerg-zergling': { family: 'Zergling', variantOrder: 0 },

  'protoss-adept': { family: 'Adept', variantOrder: 0 },
  'protoss-artanis': { family: 'Artanis', variantOrder: 0 },
  'protoss-praetor-guard-zealot': { family: 'Zealot', variantOrder: 1 },
  'protoss-pylon': { family: 'Pylon', variantOrder: 0 },
  'protoss-sentry': { family: 'Sentry', variantOrder: 0 },
  'protoss-stalker': { family: 'Stalker', variantOrder: 0 },
  'protoss-zealot': { family: 'Zealot', variantOrder: 0 },

  'terran-goliath': { family: 'Goliath', variantOrder: 0 },
  'terran-jim-raynor': { family: 'Jim Raynor', variantOrder: 0 },
  'terran-marauder': { family: 'Marauder', variantOrder: 0 },
  'terran-marine': { family: 'Marine', variantOrder: 0 },
  'terran-medic': { family: 'Medic', variantOrder: 0 },
  'terran-point-defense-drone': { family: 'Point Defense Drone', variantOrder: 0 },
  'terran-raynor-s-raider-marine': { family: 'Marine', variantOrder: 1 },
};

export function getUnitFamilyMetadata(unitId) {
  return UNIT_FAMILY_METADATA[unitId] || null;
}
