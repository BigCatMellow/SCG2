export const UNIT_DATA = {
  marine_squad: {
    id: "marine_squad",
    name: "Marines",
    tags: ["Ground", "Infantry", "Ranged"],
    abilities: ["combat_squad"],
    speed: 6,
    size: 1,
    base: { shape: "circle", diameterMm: 25, radiusInches: 0.5 },
    startingModelCount: 6,
    woundsPerModel: 1,
    defense: {
      toughness: 3,
      armorSave: 4,
      invulnerableSave: null,
      evadeTarget: 6
    },
    rangedWeapons: [
      {
        id: "gauss_rifle",
        name: "Gauss Rifle",
        rangeInches: 15,
        shotsPerModel: 1,
        hitTarget: 4,
        strength: 4,
        armorPenetration: 1,
        damage: 1,
        surge: { tags: ["Light"], dice: "D3" },
        keywords: ["rapid_fire"]
      }
    ],
    meleeWeapons: [
      {
        id: "combat_knife",
        name: "Combat Knife",
        attacksPerModel: 1,
        hitTarget: 5,
        strength: 3,
        armorPenetration: 0,
        damage: 1,
        keywords: []
      }
    ],
    supplyProfile: [
      { minModels: 5, supply: 2 },
      { minModels: 3, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  dragoon: {
    id: "dragoon",
    name: "Dragoon",
    tags: ["Ground", "Mechanical", "Armoured"],
    abilities: ["stabilized_platform"],
    speed: 5,
    size: 2,
    base: { shape: "circle", diameterMm: 50, radiusInches: 1 },
    startingModelCount: 1,
    woundsPerModel: 4,
    defense: {
      toughness: 6,
      armorSave: 3,
      invulnerableSave: 5,
      evadeTarget: 5
    },
    rangedWeapons: [
      {
        id: "phase_disruptor",
        name: "Phase Disruptor",
        rangeInches: 18,
        shotsPerModel: 4,
        hitTarget: 4,
        strength: 7,
        armorPenetration: 2,
        damage: 2,
        keywords: ["piercing"]
      }
    ],
    meleeWeapons: [
      {
        id: "stomp",
        name: "Stomp",
        attacksPerModel: 2,
        hitTarget: 4,
        strength: 6,
        armorPenetration: 1,
        damage: 1,
        keywords: ["brutal"]
      }
    ],
    supplyProfile: [
      { minModels: 1, supply: 3 },
      { minModels: 0, supply: 0 }
    ]
  },
  zealot_squad: {
    id: "zealot_squad",
    name: "Zealots",
    tags: ["Ground", "Infantry", "Melee", "Psionic"],
    abilities: ["charge"],
    speed: 7,
    size: 1,
    base: { shape: "circle", diameterMm: 32, radiusInches: 0.6 },
    startingModelCount: 4,
    woundsPerModel: 2,
    defense: {
      toughness: 4,
      armorSave: 4,
      invulnerableSave: 5,
      evadeTarget: 6
    },
    rangedWeapons: [],
    meleeWeapons: [
      {
        id: "psi_blades",
        name: "Psi Blades",
        attacksPerModel: 2,
        hitTarget: 4,
        strength: 5,
        armorPenetration: 2,
        damage: 1,
        keywords: ["precise"]
      }
    ],
    supplyProfile: [
      { minModels: 3, supply: 2 },
      { minModels: 2, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  zergling_squad: {
    id: "zergling_squad",
    name: "Zerglings",
    tags: ["Ground", "Biological", "Swarm", "Light", "Infantry"],
    abilities: ["swarm_tactics"],
    impact: { dicePerModel: 1, hitTarget: 5, damage: 1 },
    speed: 8,
    size: 1,
    base: { shape: "circle", diameterMm: 25, radiusInches: 0.45 },
    startingModelCount: 8,
    woundsPerModel: 1,
    defense: {
      toughness: 3,
      armorSave: 6,
      invulnerableSave: null,
      evadeTarget: 5
    },
    rangedWeapons: [],
    meleeWeapons: [
      {
        id: "claws",
        name: "Claws",
        attacksPerModel: 2,
        hitTarget: 4,
        strength: 3,
        armorPenetration: 0,
        damage: 1,
        keywords: ["anti_infantry"]
      }
    ],
    supplyProfile: [
      { minModels: 6, supply: 2 },
      { minModels: 4, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  jim_raynor: {
    id: "jim_raynor",
    name: "Jim Raynor",
    tags: ["Ground", "Infantry", "Hero", "Ranged"],
    abilities: ["heroic_presence"],
    speed: 6,
    size: 1,
    base: { shape: "circle", diameterMm: 32, radiusInches: 0.6 },
    startingModelCount: 1,
    woundsPerModel: 6,
    defense: {
      toughness: 5,
      armorSave: 3,
      invulnerableSave: 5,
      evadeTarget: 5
    },
    rangedWeapons: [
      {
        id: "penetrator_rounds",
        name: "Penetrator Rounds",
        rangeInches: 18,
        shotsPerModel: 3,
        hitTarget: 3,
        strength: 6,
        armorPenetration: 2,
        damage: 2,
        keywords: ["heroic"]
      }
    ],
    meleeWeapons: [
      {
        id: "cqc_rifle_butt",
        name: "Rifle Butt",
        attacksPerModel: 3,
        hitTarget: 4,
        strength: 4,
        armorPenetration: 1,
        damage: 1,
        keywords: []
      }
    ],
    supplyProfile: [
      { minModels: 1, supply: 3 },
      { minModels: 0, supply: 0 }
    ]
  },
  marine_t2: {
    id: "marine_t2",
    name: "Marine T2",
    tags: ["Ground", "Infantry", "Ranged", "Core"],
    abilities: ["stimpack_drill"],
    speed: 6,
    size: 1,
    base: { shape: "circle", diameterMm: 25, radiusInches: 0.5 },
    startingModelCount: 6,
    woundsPerModel: 1,
    defense: {
      toughness: 3,
      armorSave: 4,
      invulnerableSave: null,
      evadeTarget: 6
    },
    rangedWeapons: [
      {
        id: "gauss_rifle_t2",
        name: "Gauss Rifle",
        rangeInches: 16,
        shotsPerModel: 1,
        hitTarget: 4,
        strength: 4,
        armorPenetration: 1,
        damage: 1,
        surge: { tags: ["Light"], dice: "D3" },
        keywords: ["rapid_fire"]
      }
    ],
    meleeWeapons: [
      {
        id: "combat_knife",
        name: "Combat Knife",
        attacksPerModel: 1,
        hitTarget: 5,
        strength: 3,
        armorPenetration: 0,
        damage: 1,
        keywords: []
      }
    ],
    supplyProfile: [
      { minModels: 5, supply: 2 },
      { minModels: 3, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  marauder_t1: {
    id: "marauder_t1",
    name: "Marauder T1",
    tags: ["Ground", "Infantry", "Core", "Armoured"],
    abilities: ["concussive_shells"],
    speed: 5,
    size: 1,
    base: { shape: "circle", diameterMm: 32, radiusInches: 0.6 },
    startingModelCount: 3,
    woundsPerModel: 2,
    defense: {
      toughness: 5,
      armorSave: 4,
      invulnerableSave: null,
      evadeTarget: 6
    },
    rangedWeapons: [
      {
        id: "punisher_grenades",
        name: "Punisher Grenades",
        rangeInches: 14,
        shotsPerModel: 2,
        hitTarget: 4,
        strength: 5,
        armorPenetration: 1,
        damage: 2,
        surge: { tags: ["Armoured"], dice: "D3" },
        pierce: { tag: "Armoured", damage: 2 },
        keywords: ["blast"]
      }
    ],
    meleeWeapons: [
      {
        id: "powered_fist",
        name: "Powered Fist",
        attacksPerModel: 2,
        hitTarget: 4,
        strength: 5,
        armorPenetration: 1,
        damage: 1,
        keywords: []
      }
    ],
    supplyProfile: [
      { minModels: 3, supply: 2 },
      { minModels: 2, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  medic_t1: {
    id: "medic_t1",
    name: "Medic T1",
    tags: ["Ground", "Infantry", "Support"],
    abilities: ["stabilize_wounds"],
    speed: 6,
    size: 1,
    base: { shape: "circle", diameterMm: 25, radiusInches: 0.5 },
    startingModelCount: 2,
    woundsPerModel: 2,
    defense: {
      toughness: 4,
      armorSave: 5,
      invulnerableSave: null,
      evadeTarget: 6
    },
    rangedWeapons: [
      {
        id: "sidearm",
        name: "Sidearm",
        rangeInches: 10,
        shotsPerModel: 1,
        hitTarget: 4,
        strength: 4,
        armorPenetration: 1,
        damage: 1,
        keywords: []
      }
    ],
    meleeWeapons: [
      {
        id: "defibrillator_strike",
        name: "Defibrillator Strike",
        attacksPerModel: 1,
        hitTarget: 5,
        strength: 3,
        armorPenetration: 0,
        damage: 1,
        keywords: []
      }
    ],
    supplyProfile: [
      { minModels: 2, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  kerrigan: {
    id: "kerrigan",
    name: "Kerrigan",
    tags: ["Ground", "Hero", "Psionic", "Melee"],
    abilities: ["queen_of_blades", "deep_strike"],
    speed: 8,
    size: 1,
    base: { shape: "circle", diameterMm: 40, radiusInches: 0.8 },
    startingModelCount: 1,
    woundsPerModel: 6,
    defense: {
      toughness: 6,
      armorSave: 3,
      invulnerableSave: 4,
      evadeTarget: 4,
      dodge: 1
    },
    rangedWeapons: [
      {
        id: "psi_blast",
        name: "Psi Blast",
        rangeInches: 12,
        shotsPerModel: 2,
        hitTarget: 3,
        strength: 6,
        armorPenetration: 2,
        damage: 2,
        surge: { tags: ["Light", "Armoured"], dice: "D3" },
        indirectFire: true,
        keywords: ["psionic"]
      }
    ],
    meleeWeapons: [
      {
        id: "psi_blades_hero",
        name: "Psi Blades",
        attacksPerModel: 5,
        hitTarget: 3,
        strength: 7,
        armorPenetration: 3,
        damage: 2,
        criticalHit: 2,
        keywords: ["lethal"]
      }
    ],
    supplyProfile: [
      { minModels: 1, supply: 3 },
      { minModels: 0, supply: 0 }
    ]
  },
  raptor_t2: {
    id: "raptor_t2",
    name: "Raptor (Zergling) T2",
    tags: ["Ground", "Biological", "Swarm", "Elite", "Melee"],
    abilities: ["leap_strike"],
    impact: { dicePerModel: 2, hitTarget: 5, damage: 1 },
    speed: 9,
    size: 1,
    base: { shape: "circle", diameterMm: 25, radiusInches: 0.45 },
    startingModelCount: 6,
    woundsPerModel: 1,
    defense: {
      toughness: 4,
      armorSave: 5,
      invulnerableSave: null,
      evadeTarget: 5
    },
    rangedWeapons: [],
    meleeWeapons: [
      {
        id: "raptor_claws",
        name: "Raptor Claws",
        attacksPerModel: 3,
        hitTarget: 4,
        strength: 4,
        armorPenetration: 1,
        damage: 1,
        surge: { tags: ["Light", "Armoured"], dice: "D6" },
        keywords: ["anti_infantry"]
      }
    ],
    supplyProfile: [
      { minModels: 5, supply: 2 },
      { minModels: 3, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  roach_t3: {
    id: "roach_t3",
    name: "Roach T3",
    tags: ["Ground", "Biological", "Elite", "Armoured"],
    abilities: ["burrow", "burrowed_regen"],
    impact: { dicePerModel: 2, hitTarget: 4, damage: 1 },
    speed: 5,
    size: 1,
    base: { shape: "circle", diameterMm: 32, radiusInches: 0.6 },
    startingModelCount: 3,
    woundsPerModel: 3,
    defense: {
      toughness: 6,
      armorSave: 4,
      invulnerableSave: null,
      evadeTarget: 5
    },
    rangedWeapons: [
      {
        id: "acid_spit",
        name: "Acid Spit",
        rangeInches: 12,
        shotsPerModel: 2,
        hitTarget: 4,
        strength: 6,
        armorPenetration: 2,
        damage: 2,
        surge: { tags: ["Light"], dice: "D3+1" },
        keywords: ["corrosive"]
      }
    ],
    meleeWeapons: [
      {
        id: "chitin_bash",
        name: "Chitin Bash",
        attacksPerModel: 2,
        hitTarget: 4,
        strength: 5,
        armorPenetration: 1,
        damage: 1,
        keywords: []
      }
    ],
    supplyProfile: [
      { minModels: 3, supply: 2 },
      { minModels: 2, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  zergling_t3: {
    id: "zergling_t3",
    name: "Zergling T3",
    tags: ["Ground", "Biological", "Swarm", "Core", "Melee"],
    abilities: ["adrenal_glands", "burrow"],
    impact: { dicePerModel: 1, hitTarget: 5, damage: 1 },
    speed: 9,
    size: 1,
    base: { shape: "circle", diameterMm: 25, radiusInches: 0.45 },
    startingModelCount: 8,
    woundsPerModel: 1,
    defense: {
      toughness: 3,
      armorSave: 6,
      invulnerableSave: null,
      evadeTarget: 5
    },
    rangedWeapons: [],
    meleeWeapons: [
      {
        id: "adrenal_claws",
        name: "Adrenal Claws",
        attacksPerModel: 3,
        hitTarget: 4,
        strength: 3,
        armorPenetration: 0,
        damage: 1,
        surge: { tags: ["Light"], dice: "D3" },
        keywords: ["anti_infantry"]
      }
    ],
    supplyProfile: [
      { minModels: 6, supply: 2 },
      { minModels: 4, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  },
  zergling_t2: {
    id: "zergling_t2",
    name: "Zergling T2",
    tags: ["Ground", "Biological", "Swarm", "Core", "Melee"],
    abilities: ["metabolic_boost"],
    impact: { dicePerModel: 1, hitTarget: 5, damage: 1 },
    speed: 8,
    size: 1,
    base: { shape: "circle", diameterMm: 25, radiusInches: 0.45 },
    startingModelCount: 6,
    woundsPerModel: 1,
    defense: {
      toughness: 3,
      armorSave: 6,
      invulnerableSave: null,
      evadeTarget: 5
    },
    rangedWeapons: [],
    meleeWeapons: [
      {
        id: "zergling_claws_t2",
        name: "Claws",
        attacksPerModel: 2,
        hitTarget: 4,
        strength: 3,
        armorPenetration: 0,
        damage: 1,
        surge: { tags: ["Light"], dice: "D3" },
        keywords: ["anti_infantry"]
      }
    ],
    supplyProfile: [
      { minModels: 5, supply: 1 },
      { minModels: 3, supply: 1 },
      { minModels: 1, supply: 0 },
      { minModels: 0, supply: 0 }
    ]
  }
};

export function getUnitTemplate(templateId) {
  const template = UNIT_DATA[templateId];
  if (!template) throw new Error(`Unknown unit template: ${templateId}`);
  return template;
}

export function computeCurrentSupplyValue(template, aliveModelCount) {
  const sorted = [...template.supplyProfile].sort((a, b) => b.minModels - a.minModels);
  for (const bracket of sorted) {
    if (aliveModelCount >= bracket.minModels) return bracket.supply;
  }
  return 0;
}

export function createUnitStateFromTemplate(templateId, owner, unitId) {
  const template = getUnitTemplate(templateId);
  const models = {};
  const modelIds = [];
  for (let i = 0; i < template.startingModelCount; i += 1) {
    const id = `${unitId}_m${i + 1}`;
    modelIds.push(id);
    models[id] = {
      id,
      alive: true,
      x: null,
      y: null,
      elevation: "ground",
      woundsRemaining: template.woundsPerModel
    };
  }

  const rangedWeapons = template.rangedWeapons?.map(weapon => ({
    ...weapon,
    surge: weapon.surge ? { ...weapon.surge, tags: [...(weapon.surge.tags ?? [])] } : null,
    pierce: Array.isArray(weapon.pierce)
      ? weapon.pierce.map(entry => ({ ...entry }))
      : weapon.pierce
        ? { ...weapon.pierce }
        : null
  })) ?? [];
  const meleeWeapons = template.meleeWeapons?.map(weapon => ({
    ...weapon,
    surge: weapon.surge ? { ...weapon.surge, tags: [...(weapon.surge.tags ?? [])] } : null,
    pierce: Array.isArray(weapon.pierce)
      ? weapon.pierce.map(entry => ({ ...entry }))
      : weapon.pierce
        ? { ...weapon.pierce }
        : null
  })) ?? [];

  return {
    id: unitId,
    owner,
    templateId,
    name: template.name,
    leadingModelId: modelIds[0] ?? null,
    modelIds,
    models,
    tags: [...template.tags],
    abilities: [...(template.abilities ?? [])],
    impact: template.impact ? { ...template.impact } : null,
    speed: template.speed,
    size: template.size,
    woundsPerModel: template.woundsPerModel,
    base: { ...template.base },
    defense: { ...template.defense },
      rangedWeapons,
      meleeWeapons,
    ranged: rangedWeapons.length
      ? {
          rangeInches: rangedWeapons[0].rangeInches,
          shotsPerModel: rangedWeapons[0].shotsPerModel,
          hitTarget: rangedWeapons[0].hitTarget
        }
      : null,
    supplyProfile: [...template.supplyProfile],
    currentSupplyValue: computeCurrentSupplyValue(template, template.startingModelCount),
    status: {
      location: "reserves",
      movementActivated: false,
      assaultActivated: false,
      combatActivated: false,
      engaged: false,
      hidden: false,
      burrowed: false,
      outOfCoherency: false,
      stationary: false,
      cannotRangedAttackNextAssault: false,
      cannotRangedAttackThisAssault: false,
      cannotChargeNextAssault: false,
      cannotChargeThisAssault: false,
      overwatchUsedThisRound: false
    },
    activationMarkers: []
  };
}
