import { getBuilderPayload } from '../runtime/index.js';

const snapshot = {
  zerg: getBuilderPayload('zerg').units.filter(unit => [
    'zerg-corpser-roach',
    'zerg-hydralisk',
    'zerg-queen',
    'zerg-raptor-zergling',
    'zerg-roach',
    'zerg-swarmling-zergling',
    'zerg-vile-roach',
    'zerg-zergling',
  ].includes(unit.id)),
  protoss: getBuilderPayload('protoss').units.filter(unit => unit.id === 'protoss-adept'),
  terran: getBuilderPayload('terran').units.filter(unit => unit.id === 'terran-jim-raynor'),
};

console.log(JSON.stringify(snapshot, null, 2));
