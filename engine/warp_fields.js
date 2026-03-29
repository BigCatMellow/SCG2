import { distance } from "./geometry.js";

const POWER_FIELD_RADIUS = 6;

function getLeaderPoint(unit) {
  const leader = unit?.models?.[unit?.leadingModelId];
  if (!leader || !leader.alive || leader.x == null || leader.y == null) return null;
  return { x: leader.x, y: leader.y };
}

export function isWarpConduitSource(unit) {
  return unit?.status?.location === "battlefield" && unit?.abilities?.includes("warp_conduit");
}

export function canWarpDeployUnit(unit) {
  if (!unit || unit.status?.location !== "reserves") return false;
  if (unit.tags?.includes("Structure")) return false;
  return /(zealot|stalker|adept|sentry|dragoon|artanis)/i.test(unit.templateId ?? "");
}

export function getPowerFieldZones(state) {
  return Object.values(state.units)
    .filter(isWarpConduitSource)
    .map(unit => {
      const center = getLeaderPoint(unit);
      if (!center) return null;
      return {
        id: `power_field_${unit.id}`,
        owner: unit.owner,
        sourceUnitId: unit.id,
        center,
        radius: POWER_FIELD_RADIUS
      };
    })
    .filter(Boolean);
}

export function pointInsideFriendlyPowerField(state, playerId, point) {
  return getPowerFieldZones(state).some(zone =>
    zone.owner === playerId && distance(zone.center, point) <= zone.radius + 1e-6
  );
}

export function hasFriendlyPowerField(state, playerId) {
  return getPowerFieldZones(state).some(zone => zone.owner === playerId);
}
