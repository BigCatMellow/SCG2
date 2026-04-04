import { getLegacyBuilderPayload } from './legacy-builder-adapter.js';

/**
 * Attach runtime-backed arrays onto a browser global object using the
 * legacy names that the current HTML builders already expect.
 *
 * Example:
 *   import { attachLegacyBuilderGlobals } from './legacy-builder-browser-bridge.js';
 *   attachLegacyBuilderGlobals(window, 'protoss');
 */
export function attachLegacyBuilderGlobals(target, factionKey, globalPrefix = 'ZERG') {
  const payload = getLegacyBuilderPayload(factionKey);
  if (!target || !payload) return null;

  target[`${globalPrefix}_FACTION_CARDS`] = payload.factionCards;
  target[`${globalPrefix}_UNITS`] = payload.units;
  target[`${globalPrefix}_TACTICAL_CARDS`] = payload.tacticalCards;
  target.__starcraftTMGRuntimeStatus = payload.status;
  target.__starcraftTMGRuntimeFaction = payload.factionKey;

  return payload;
}
