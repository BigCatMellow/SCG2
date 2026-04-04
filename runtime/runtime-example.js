/**
 * Example of how the current site could consume the runtime data layer.
 *
 * This is intentionally small and framework-free.
 */

import { BUILDER_PAYLOADS } from './builder-adapter.js';
import { LEGACY_BUILDER_PAYLOADS } from './legacy-builder-adapter.js';

const zerg = BUILDER_PAYLOADS.zerg;
const protoss = BUILDER_PAYLOADS.protoss;
const terran = BUILDER_PAYLOADS.terran;

console.log('Zerg payload:', zerg);
console.log('Protoss payload:', protoss);
console.log('Terran payload:', terran);

const zergUnitNames = zerg.units.map(u => u.name);
console.log('Zerg units:', zergUnitNames.join(', '));
console.log('Legacy Zerg payload:', LEGACY_BUILDER_PAYLOADS.zerg);
