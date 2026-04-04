window.__starcraftTMGRuntimePayload = {
  "faction": "Terran",
  "factionKey": "terran",
  "factionCards": [
    {
      "id": "terran-raynors-raiders",
      "name": "Raynor's Raiders",
      "unique": true,
      "resource": "+1 CP",
      "slots": {
        "hero": 1,
        "core": 3,
        "support": 1
      },
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Rapid Reinforcements",
          "type": "Active",
          "description": "Place a Friendly Point Defence Drone Unit anywhere on the battlefield, more than 1\" away from any Enemy model. Remove this Unit at the End of the Round."
        },
        {
          "phase": "Movement Phase",
          "name": "Ready for Pickup?",
          "type": "Active",
          "description": "Once per Game. The active Unit resolves the PLACE (12) effect. Models placed by this effect cannot be set up Within the Engagement Range of any Enemy Unit. This resolves instead of performing a standard action."
        }
      ]
    },
    {
      "id": "terran-armed-forces",
      "name": "Terran Armed Forces",
      "unique": true,
      "resource": "+1 CP",
      "slots": {
        "elite": 1,
        "core": 3,
        "support": 1
      },
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Tactical Retreat",
          "type": "Active",
          "description": "The active Unit ignores the Disengage penalty for the remainder of the Round."
        },
        {
          "phase": "Movement Phase",
          "name": "Terran Tenacity",
          "type": "Active",
          "description": "Once per Game. Immediately claim the First Player Marker . No other player may claim the First Player Marker for the remainder of this Phase."
        }
      ]
    }
  ],
  "units": [
    {
      "id": "terran-goliath",
      "name": "Goliath",
      "family": "Goliath",
      "variantOrder": 0,
      "role": "Elite",
      "unique": false,
      "tags": [
        "Armoured",
        "Mechanical",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "7",
        "evade": "-",
        "armour": "4+",
        "hp": 10,
        "size": 3
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 190,
          "models": "1 - 1",
          "supply": 2
        }
      ],
      "weapons": [
        {
          "name": "Autocannon",
          "phase": "Assault",
          "range": "12",
          "target": "Ground",
          "roa": "9",
          "hit": "4+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Underbelly Machine Gun",
          "phase": "Assault",
          "range": "8",
          "target": "Ground",
          "roa": "6",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Hellfire Missiles",
          "phase": "Assault",
          "range": "16",
          "target": "Flying",
          "roa": "6",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Stomp",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "4",
          "hit": "5+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Target Lock",
            "type": "Active (1 Command Point)",
            "description": "Active\n(1 Command Point)\n\n Select one Enemy Unit Within 12\". Whenever a Friendly Goliath Unit targets that enemy with an Autocannon, that weapon gains Surge Type: Light, Armoured, and S Dice : D3+1."
          }
        ],
        "Assault Phase": [
          {
            "name": "Indomitable",
            "type": "Passive",
            "description": "While Engaged , this Unit may target and be targeted by Unengaged Enemy Units . In both cases, the defending Unit gains an Evade Roll against those attacks."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (4) 3+ effect."
          }
        ]
      },
      "upgrades": {
        "Any Phase": [
          {
            "name": "Ares-Class Targeting System",
            "type": "Passive (20)",
            "description": "This Unit’s Autocannon and Underbelly Machine Gun weapons gain PRECISION (1)."
          }
        ],
        "Assault Phase": [
          {
            "name": "Haywire Missiles",
            "type": "Weapon (40)",
            "description": "FOR Hellfire Missiles. RNG 12. TGT Ground. RoA 3. Hit 3+. Surge Armoured. S.Die D3. Dmg 1. Keywords: pierce-armoured-3, sidearm"
          },
          {
            "name": "Scatter Missiles",
            "type": "Weapon (30)",
            "description": "FOR Hellfire Missiles. RNG 18. TGT Ground. RoA 6. Hit 5+. Surge Light. S.Die D3. Dmg 1. Keywords: indirect-fire, locked-in-6, long-range-24, sidearm"
          }
        ]
      }
    },
    {
      "id": "terran-jim-raynor",
      "name": "Jim Raynor",
      "family": "Jim Raynor",
      "variantOrder": 0,
      "role": "Hero",
      "unique": false,
      "tags": [
        "Biological",
        "Ground",
        "Unique"
      ],
      "stats": {
        "shield": "-",
        "speed": "7",
        "evade": "5+",
        "armour": "4+",
        "hp": 8,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 230,
          "models": "1 - 1",
          "supply": 1
        }
      ],
      "weapons": [
        {
          "name": "Commando Rifle",
          "phase": "Assault",
          "range": "18",
          "target": "All",
          "roa": "3",
          "hit": "3+",
          "surge": "Armoured",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "C-14 rifle",
          "phase": "Assault",
          "range": "12",
          "target": "All",
          "roa": "6",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3+1",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "“Justice” Revolver",
          "phase": "Assault",
          "range": "6",
          "target": "Ground",
          "roa": "2",
          "hit": "3+",
          "surge": "-",
          "sDie": "-",
          "damage": "2",
          "keywords": []
        },
        {
          "name": "Bayonet",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "2",
          "hit": "4+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Commander",
          "type": "Passive",
          "description": "Treat this Unit’s Supply characteristic as increased by 1 for Controlling and Contesting Mission Markers , completing objectives, and resolving Disengage checks."
        },
        {
          "phase": "Any Phase",
          "name": "Freedom Fighters",
          "type": "Passive",
          "description": "The Supply Value of all Friendly Units Within 8\" of this Unit cannot be reduced below 1 for Contesting Mission Markers and completing objectives."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Orders",
            "type": "Active (X Command Point)",
            "description": "Active\n(X Command Point)\n\n REPEATABLE . Select another Friendly Biological Unit Within 8\", spend CP and apply one of the following effects:\n\n1 CP: That Unit’s first used weapon gains the CRITICAL HIT (2).\n\n1 CP: That Unit ignores the Disengage penalty for the remainder of the Round.\n\n2 CP: Remove the Activation Marker from that Unit."
          }
        ]
      },
      "upgrades": {
        "Assault Phase": [
          {
            "name": "C-14 rifle",
            "type": "Weapon (0)",
            "description": "FOR Commando Rifle. RNG 12. TGT All. RoA 6. Hit 3+. Surge Light. S.Die D3+1. Dmg 1. Keywords: burst-fire-8-3"
          }
        ]
      }
    },
    {
      "id": "terran-marauder",
      "name": "Marauder",
      "family": "Marauder",
      "variantOrder": 0,
      "role": "Core",
      "unique": false,
      "tags": [
        "Armoured",
        "Biological",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4/7",
        "evade": "6+",
        "armour": "4+",
        "hp": 5,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 280,
          "models": "3 - 4",
          "supply": 2
        },
        {
          "tier": "T1",
          "cost": 150,
          "models": "2 - 2",
          "supply": 1
        },
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 1",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "Quad K12",
          "phase": "Assault",
          "range": "12",
          "target": "Ground",
          "roa": "3",
          "hit": "3+",
          "surge": "Armoured",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Strike",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "2",
          "hit": "4+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Stimpack",
            "type": "Active (1 Command Point)",
            "description": "Active\n(1 Command Point)\n\n This Unit suffers NON-LETHAL DAMAGE (2). This Unit gains BUFF Speed (3). Additionally, its Quad K12 and all Close Combat Weapons gain PRECISION (2)."
          }
        ],
        "Assault Phase": [
          {
            "name": "Concusive Shells",
            "type": "Reaction (1 Command Point)",
            "description": "Reaction\n(1 Command Point)\n\n When an Enemy declares a Charge against a Friendly Unit Within 8\", that Enemy gains DEBUFF Speed (2)."
          }
        ]
      },
      "upgrades": {
        "Any Phase": [
          {
            "name": "Kinetic Foam",
            "type": "Passive",
            "description": "Increase this Unit's Hit Points characteristic by 1."
          },
          {
            "name": "Veteran of Tarsonis",
            "type": "Passive",
            "description": "While this Unit is Within 3\" of a Mission Marker, its Armour characteristic is increased by 1."
          }
        ],
        "Assault Phase": [
          {
            "name": "Laser Targeting Systems",
            "type": "Passive",
            "description": "This Unit’s Quad K12 weapon gains LONG RANGE (16\")."
          }
        ]
      }
    },
    {
      "id": "terran-marine",
      "name": "Marine",
      "family": "Marine",
      "variantOrder": 0,
      "role": "Core",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4/7",
        "evade": "5+",
        "armour": "5+",
        "hp": 2,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 210,
          "models": "7 - 9",
          "supply": 2
        },
        {
          "tier": "T1",
          "cost": 160,
          "models": "4 - 6",
          "supply": 1
        },
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 3",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "C-14 rifle",
          "phase": "Assault",
          "range": "12",
          "target": "All",
          "roa": "2",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Strike",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "1",
          "hit": "5+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Stimpack",
            "type": "Active (1 Command Point)",
            "description": "Active\n(1 Command Point)\n\n This Unit suffers NON-LETHAL DAMAGE (2). This Unit gains BUFF Speed (3). Additionally, its C-14 Rifle and all Close Combat Weapons gain PRECISION (3)."
          }
        ]
      },
      "upgrades": {
        "Assault Phase": [
          {
            "name": "AGG-12",
            "type": "Weapon Specialist (10)",
            "description": "FOR C-14 Rifle. RNG 12. TGT Ground. RoA 2. Hit 3+. Surge Armoured. S.Die D3. Dmg 1. Keywords: long-range-18, specialist"
          },
          {
            "name": "Grenades - Frag",
            "type": "Passive (10)",
            "description": "When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8\", that weapon’s S Dice is replaced by D6."
          },
          {
            "name": "Rocket Launcher",
            "type": "Weapon Specialist (40)",
            "description": "RNG 12. TGT Ground. RoA 4. Hit 3+. Dmg 1. Keywords: indirect-fire, long-range-18, sidearm, specialist"
          },
          {
            "name": "Slugthrower",
            "type": "Passive",
            "description": "When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8\", that weapon gains ANTI-EVADE (1)."
          }
        ],
        "Combat Phase": [
          {
            "name": "Bayonet",
            "type": "Weapon",
            "description": "FOR Strike. RNG E. TGT Ground. RoA 2. Hit 5+. Dmg 1"
          }
        ],
        "Movement Phase": [
          {
            "name": "Combat Shield",
            "type": "Active",
            "description": "This Unit is always eligible to make an Evade Roll against any Close Combat Attack targeting it and any Damage from an Enemy Special Ability ."
          }
        ]
      }
    },
    {
      "id": "terran-medic",
      "name": "Medic",
      "family": "Medic",
      "variantOrder": 0,
      "role": "Support",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4/7",
        "evade": "5+",
        "armour": "5+",
        "hp": 2,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 110,
          "models": "2 - 3",
          "supply": 1
        },
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 1",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "Strike",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "1",
          "hit": "5+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Life Support",
          "type": "Reaction (1 Command Point)",
          "description": "Reaction\n(1 Command Point)\n\n Use when another Friendly Biological Unit suffers Damage Within 4\". Reduce the Total Damage before allocation by 1 for each model in this Unit that is Within 4\" of the damaged Unit."
        },
        {
          "phase": "Any Phase",
          "name": "Restoration",
          "type": "Reaction (1 Command Point)",
          "description": "Reaction\n(1 Command Point)\n\n Use when a Friendly Unit Within 4\" receives a DEBUFF . Remove all DEBUFFS from it."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Medpack",
            "type": "Active (1 Command Point)",
            "description": "Active\n(1 Command Point)\n\n Select another Friendly Biological Unit Within 4\". Resolve the HEAL (X) effect for the targeted Unit, where X is the number of models in this Unit that are Within 4\" of the target Unit."
          },
          {
            "name": "Optical Flare",
            "type": "Active (2 Command Point)",
            "description": "Active\n(2 Command Point)\n\n Select one Enemy Unit Within 12\". Until the End of the Round, apply DEBUFF Range (4) to that Unit’s Ranged Weapons. That Unit cannot benefit from LONG RANGE ."
          }
        ]
      },
      "upgrades": {
        "Any Phase": [
          {
            "name": "A-13 Flash Grenade Launcher",
            "type": "Passive (20)",
            "description": "Increase the Optical Flare special ability 's Range to 16\"."
          },
          {
            "name": "Advanced Medic Facilities",
            "type": "Passive (60)",
            "description": "This Unit’s Supply Value counts as 0 when calculating the Supply Pool ."
          },
          {
            "name": "Stabilizer Medpacks",
            "type": "Passive (30)",
            "description": "When this Unit resolves a Life Support or Medpack ability, treat it as having 1 additional model Within Range for calculating that ability's effects."
          }
        ]
      }
    },
    {
      "id": "terran-point-defense-drone",
      "name": "Point Defense Drone",
      "family": "Point Defense Drone",
      "variantOrder": 0,
      "role": "Other",
      "unique": false,
      "tags": [
        "Raynor's Raiders",
        "Armoured",
        "Flying",
        "Mechanical"
      ],
      "stats": {
        "shield": "-",
        "speed": "-",
        "evade": "6+",
        "armour": "6+",
        "hp": 3,
        "size": 0
      },
      "tiers": [
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 1",
          "supply": 0
        }
      ],
      "weapons": [],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Point Defense Laser",
          "type": "Passive",
          "description": "When another Friendly Unit Within 4\" is targeted by a Ranged Attack without the INSTANT keyword, remove up to 2 dice from the Attack Pool. Then remove this Unit from the battlefield."
        },
        {
          "phase": "Any Phase",
          "name": "Gliding",
          "type": "Passive",
          "description": "This model has DISPLACEMENT ."
        },
        {
          "phase": "Any Phase",
          "name": "Structure",
          "type": "Passive",
          "description": "This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers , ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise."
        }
      ],
      "phaseAbilities": {},
      "upgrades": {}
    },
    {
      "id": "terran-raynor-s-raider-marine",
      "name": "Raynor's Raider (Marine)",
      "family": "Marine",
      "variantOrder": 1,
      "role": "Core",
      "unique": false,
      "tags": [
        "Raynor's Raiders",
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4/7",
        "evade": "5+",
        "armour": "5+",
        "hp": 2,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 230,
          "models": "1 - 6",
          "supply": 1
        }
      ],
      "weapons": [
        {
          "name": "C-14 rifle",
          "phase": "Assault",
          "range": "12",
          "target": "All",
          "roa": "2",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Bayonet",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "2",
          "hit": "5+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Stimpack",
            "type": "Active (1 Command Point)",
            "description": "Active\n(1 Command Point)\n\n This Unit suffers NON-LETHAL DAMAGE (2). This Unit gains BUFF Speed (3). Additionally, its C-14 Rifle and all Close Combat Weapons gain PRECISION (3)."
          },
          {
            "name": "Raiders Roll!",
            "type": "Passive",
            "description": "When this Unit is nominated to deploy from Reserves , it may resolve its Stimpack ability with the CP cost reduced by 1 (to a minimum of 0)."
          },
          {
            "name": "Rapid Reinforcements",
            "type": "Passive",
            "description": "When this Unit is nominated to deploy from Reserves , it may resolve the PLACE (10) effect from another Friendly Unit. No model may be set Within 8\" of any Enemy model. This Unit's Activation ends."
          }
        ],
        "Assault Phase": [
          {
            "name": "Slugthrower",
            "type": "Passive",
            "description": "When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8\", that weapon gains ANTI-EVADE (1)."
          },
          {
            "name": "Grenades - Frag",
            "type": "Passive",
            "description": "When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8\", that weapon’s S Dice is replaced by D6."
          }
        ]
      },
      "upgrades": {}
    }
  ],
  "tacticalCards": [
    {
      "id": "barracks",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Barracks",
      "gasCost": 25,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:barracks"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "terran-barracks-go-go-go"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Go! Go! Go!",
          "type": "Active",
          "description": "The active Biological Unit performs a 2\" Move action. This does not count towards its action limit."
        }
      ],
      "cost": 25,
      "resource": "+1 CP",
      "slots": {
        "core": 1
      }
    },
    {
      "id": "barracks-proxy",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Barracks (Proxy)",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:barracks-proxy"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 2,
      "additionalSlots": {
        "core": 2
      },
      "preserveName": true,
      "abilityIds": [
        "terran-barracks-proxy-go-go-go",
        "terran-barracks-proxy-armed-and-ready"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Go! Go! Go!",
          "type": "Active",
          "description": "The active Biological Unit performs a 2\" Move action. This does not count towards its action limit."
        },
        {
          "phase": "Movement Phase",
          "name": "Armed and Ready",
          "type": "Active",
          "description": "The active Biological Unit Deploys from any table edge that is not a player's Entry Edge . No model may be placed Within 10\" of any Enemy model. This ability cannot be used if another Friendly Biological Unit has already been Deployed this Round."
        }
      ],
      "cost": 40,
      "resource": "+2 CP",
      "slots": {
        "core": 2
      }
    },
    {
      "id": "barracks-tech-lab",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Barracks (Tech Lab)",
      "gasCost": 45,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:barracks-tech-lab"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 2,
      "additionalSlots": {
        "elite": 1,
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "terran-barracks-tech-lab-go-go-go",
        "terran-barracks-tech-lab-let-s-have-a-blast"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Go! Go! Go!",
          "type": "Active",
          "description": "The active Biological Unit performs a 2\" Move action. This does not count towards its action limit."
        },
        {
          "phase": "Assault Phase",
          "name": "Let's Have a Blast!",
          "type": "Active",
          "description": "The active Biological Unit’s first Ranged Weapon used gain ANTI-EVADE (1)."
        }
      ],
      "cost": 45,
      "resource": "+2 CP",
      "slots": {
        "elite": 1,
        "core": 1
      }
    },
    {
      "id": "supply-depot",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Supply Depot",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:supply-depot"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "hero": 1,
        "elite": 1,
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "terran-supply-depot-additional-supply-depots"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Additional Supply Depots",
          "type": "Active",
          "description": "The active Unit’s Supply Value is improved by 1 for Controlling and Contesting Mission Markers and completing objectives."
        }
      ],
      "cost": 40,
      "resource": "+1 CP",
      "slots": {
        "hero": 1,
        "elite": 1,
        "core": 1
      }
    },
    {
      "id": "factory",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Factory",
      "gasCost": 35,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:factory"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 2
      },
      "preserveName": true,
      "abilityIds": [
        "terran-factory-field-repair"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Field Repair",
          "type": "Active",
          "description": "The active Mechanical Unit resolves the HEAL (2) effect."
        }
      ],
      "cost": 35,
      "resource": "+1 CP",
      "slots": {
        "elite": 2
      }
    },
    {
      "id": "engineering-bay",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Engineering Bay",
      "gasCost": 30,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:engineering-bay"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "terran-engineering-bay-infantry-armor",
        "terran-engineering-bay-infantry-weapons"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Infantry Armor",
          "type": "Reaction",
          "description": "Use before a Friendly Biological Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll."
        },
        {
          "phase": "Assault Phase",
          "name": "Infantry Weapons",
          "type": "Active",
          "description": "The active Biological Unit’s first Ranged Weapon used gains CRITICAL HIT (1)."
        }
      ],
      "cost": 30,
      "resource": "+1 CP",
      "slots": {
        "core": 1
      }
    },
    {
      "id": "armory",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Armory",
      "gasCost": 30,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:armory"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 1
      },
      "preserveName": true,
      "abilityIds": [
        "terran-armory-vehicle-plating",
        "terran-armory-vehicle-weapons"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Vehicle Plating",
          "type": "Reaction",
          "description": "Use before a Friendly Mechanical Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll."
        },
        {
          "phase": "Assault Phase",
          "name": "Vehicle Weapons",
          "type": "Active",
          "description": "The active Mechanical Unit’s first Ranged Weapon used gain CRITICAL HIT (1)."
        }
      ],
      "cost": 30,
      "resource": "+1 CP",
      "slots": {
        "elite": 1
      }
    },
    {
      "id": "academy",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Academy",
      "gasCost": 35,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:academy"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "support": 2
      },
      "preserveName": true,
      "abilityIds": [
        "terran-academy-advanced-training"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Advanced Training",
          "type": "Reaction",
          "description": "Once per Round, when a Friendly Support Unit activates a Special Ability that costs CP, resolve that ability with its CP cost reduced by 1 (to a minimum of 0). Do not Exhaust this card."
        }
      ],
      "cost": 35,
      "resource": "+1 CP",
      "slots": {
        "support": 2
      }
    },
    {
      "id": "orbital-command",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Orbital Command",
      "gasCost": 25,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:orbital-command"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "terran-orbital-command-comsat-station",
        "terran-orbital-command-scanner-sweep"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "ComSat Station",
          "type": "Active",
          "description": "Select one table edge that is not a player’s Entry Edge . Until the End of the Round, Enemy Units cannot Deploy from that edge."
        },
        {
          "phase": "Movement Phase",
          "name": "Scanner Sweep",
          "type": "Active",
          "description": "Place a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6\" of this Faction Indicator, they lose HIDDEN ."
        }
      ],
      "cost": 25,
      "resource": "+1 CP",
      "slots": {
        "core": 1
      }
    },
    {
      "id": "dropship",
      "faction": "Terran",
      "factionTags": [
        "Terran"
      ],
      "name": "Dropship",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-TERRAN",
        "card:dropship"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "CP",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1,
        "support": 1
      },
      "preserveName": true,
      "abilityIds": [
        "terran-dropship-strap-in",
        "terran-dropship-ready-for-dust-off"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Strap in!",
          "type": "Active",
          "description": "The active, Unengaged Ground Unit is placed in Reserves instead of performing an action."
        },
        {
          "phase": "Movement Phase",
          "name": "Ready For Dust-off",
          "type": "Active",
          "description": "Place a Faction Indicator anywhere on the battlefield more than 10\" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator."
        }
      ],
      "cost": 40,
      "resource": "+1 CP",
      "slots": {
        "core": 1,
        "support": 1
      }
    }
  ],
  "upgrades": [
    {
      "id": "terran-goliath-ares-class-targeting-system",
      "unitId": "terran-goliath",
      "name": "Ares-Class Targeting System",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "text": "This Unit’s Autocannon and Underbelly Machine Gun weapons gain PRECISION (1).",
      "keywordIds": [
        "precision"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:goliath"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-goliath-haywire-missiles",
      "unitId": "terran-goliath",
      "name": "Haywire Missiles",
      "phase": "Any Phase",
      "type": "↑ Hellfire Missiles",
      "cost": "40",
      "specialist": false,
      "replacesWeapon": "Hellfire Missiles",
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:goliath"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-goliath-scatter-missiles",
      "unitId": "terran-goliath",
      "name": "Scatter Missiles",
      "phase": "Any Phase",
      "type": "↑ Hellfire Missiles",
      "cost": "30",
      "specialist": false,
      "replacesWeapon": "Hellfire Missiles",
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:goliath"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-marine-combat-shield",
      "unitId": "terran-marine",
      "name": "Combat Shield",
      "phase": "Movement Phase",
      "type": "Active",
      "cost": "20/30",
      "specialist": false,
      "replacesWeapon": null,
      "text": "This Unit is always eligible to make an Evade Roll against any Close Combat Attack targeting it and any Damage from an Enemy Special Ability .",
      "keywordIds": [
        "enemy",
        "special-ability"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marine"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-marine-agg-12",
      "unitId": "terran-marine",
      "name": "AGG-12",
      "phase": "Assault Phase",
      "type": "Weapon",
      "cost": "10",
      "specialist": true,
      "replacesWeapon": "C-14 Rifle",
      "text": "FOR C-14 Rifle. RNG 12. TGT Ground. RoA 2. Hit 3+. Surge Armoured. S.Die D3. Dmg 1. Keywords: long-range-18, specialist",
      "keywordIds": [
        "long-range-18",
        "specialist"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marine"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table.",
      "weaponProfile": {
        "range": "12",
        "target": "Ground",
        "roa": 2,
        "hit": "3+",
        "surgeType": "Armoured",
        "surgeDice": "D3",
        "damage": 1,
        "rulesText": "FOR C-14 Rifle",
        "keywordIds": [
          "long-range-18",
          "specialist"
        ]
      }
    },
    {
      "id": "terran-marine-rocket-launcher",
      "unitId": "terran-marine",
      "name": "Rocket Launcher",
      "phase": "Assault Phase",
      "type": "Weapon",
      "cost": "40",
      "specialist": true,
      "replacesWeapon": null,
      "text": "RNG 12. TGT Ground. RoA 4. Hit 3+. Dmg 1. Keywords: indirect-fire, long-range-18, sidearm, specialist",
      "keywordIds": [
        "indirect-fire",
        "long-range-18",
        "sidearm",
        "specialist"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marine"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table.",
      "weaponProfile": {
        "range": "12",
        "target": "Ground",
        "roa": 4,
        "hit": "3+",
        "surgeType": null,
        "surgeDice": null,
        "damage": 1,
        "rulesText": null,
        "keywordIds": [
          "indirect-fire",
          "long-range-18",
          "sidearm",
          "specialist"
        ]
      }
    },
    {
      "id": "terran-marine-slugthrower",
      "unitId": "terran-marine",
      "name": "Slugthrower",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "10/20",
      "specialist": false,
      "replacesWeapon": null,
      "text": "When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8\", that weapon gains ANTI-EVADE (1).",
      "keywordIds": [
        "ranged-attack",
        "within",
        "anti-evade"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marine"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-marine-grenades-frag",
      "unitId": "terran-marine",
      "name": "Grenades - Frag",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "text": "When this Unit makes a Ranged Attack with a C-14 Rifle and the target is Within 8\", that weapon’s S Dice is replaced by D6.",
      "keywordIds": [
        "ranged-attack",
        "within",
        "dice"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marine"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-marine-bayonet",
      "unitId": "terran-marine",
      "name": "Bayonet",
      "type": "-",
      "cost": "20/30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:marine"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-marauder-kinetic-foam",
      "unitId": "terran-marauder",
      "name": "Kinetic Foam",
      "type": "-",
      "cost": "20/40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:marauder"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-marauder-laser-targeting-systems",
      "unitId": "terran-marauder",
      "name": "Laser Targeting Systems",
      "type": "-",
      "cost": "20/40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:marauder"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-marauder-veteran-of-tarsonis",
      "unitId": "terran-marauder",
      "name": "Veteran of Tarsonis",
      "type": "-",
      "cost": "20/40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:marauder"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-medic-a-13-flash-grenade-launcher",
      "unitId": "terran-medic",
      "name": "A-13 Flash Grenade Launcher",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:medic"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-medic-advanced-medic-facilities",
      "unitId": "terran-medic",
      "name": "Advanced Medic Facilities",
      "type": "-",
      "cost": "60",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:medic"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-medic-stabilizer-medpacks",
      "unitId": "terran-medic",
      "name": "Stabilizer Medpacks",
      "type": "-",
      "cost": "30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:medic"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-jim-raynor-c-14-rifle",
      "unitId": "terran-jim-raynor",
      "name": "C-14 rifle",
      "type": "↑ Commando Rifle",
      "cost": "0",
      "specialist": false,
      "replacesWeapon": "Commando Rifle",
      "sourceRefs": [
        "PART-12.10",
        "card:jim-raynor"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "terran-goliath-scatter-missiles",
      "unitId": "terran-goliath",
      "name": "Scatter Missiles",
      "phase": "Assault Phase",
      "type": "Weapon",
      "cost": "30",
      "replacesWeapon": "Hellfire Missiles",
      "text": "FOR Hellfire Missiles. RNG 18. TGT Ground. RoA 6. Hit 5+. Surge Light. S.Die D3. Dmg 1. Keywords: indirect-fire, locked-in-6, long-range-24, sidearm",
      "keywordIds": [
        "indirect-fire",
        "locked-in-6",
        "long-range-24",
        "sidearm"
      ],
      "weaponProfile": {
        "range": "18",
        "target": "Ground",
        "roa": 6,
        "hit": "5+",
        "surgeType": "Light",
        "surgeDice": "D3",
        "damage": 1,
        "rulesText": "FOR Hellfire Missiles",
        "keywordIds": [
          "indirect-fire",
          "locked-in-6",
          "long-range-24",
          "sidearm"
        ]
      },
      "sourceRefs": [
        "SRC-TERRAN",
        "card:goliath"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table."
    },
    {
      "id": "terran-goliath-haywire-missiles",
      "unitId": "terran-goliath",
      "name": "Haywire Missiles",
      "phase": "Assault Phase",
      "type": "Weapon",
      "cost": "40",
      "replacesWeapon": "Hellfire Missiles",
      "text": "FOR Hellfire Missiles. RNG 12. TGT Ground. RoA 3. Hit 3+. Surge Armoured. S.Die D3. Dmg 1. Keywords: pierce-armoured-3, sidearm",
      "keywordIds": [
        "pierce-armoured-3",
        "sidearm"
      ],
      "weaponProfile": {
        "range": "12",
        "target": "Ground",
        "roa": 3,
        "hit": "3+",
        "surgeType": "Armoured",
        "surgeDice": "D3",
        "damage": 1,
        "rulesText": "FOR Hellfire Missiles",
        "keywordIds": [
          "pierce-armoured-3",
          "sidearm"
        ]
      },
      "sourceRefs": [
        "SRC-TERRAN",
        "card:goliath"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table."
    },
    {
      "id": "terran-jim-raynor-c-14-rifle",
      "unitId": "terran-jim-raynor",
      "name": "C-14 rifle",
      "phase": "Assault Phase",
      "type": "Weapon",
      "cost": null,
      "replacesWeapon": "Commando Rifle",
      "text": "FOR Commando Rifle. RNG 12. TGT All. RoA 6. Hit 3+. Surge Light. S.Die D3+1. Dmg 1. Keywords: burst-fire-8-3",
      "keywordIds": [
        "burst-fire-8-3"
      ],
      "weaponProfile": {
        "range": "12",
        "target": "All",
        "roa": 6,
        "hit": "3+",
        "surgeType": "Light",
        "surgeDice": "D3+1",
        "damage": 1,
        "rulesText": "FOR Commando Rifle",
        "keywordIds": [
          "burst-fire-8-3"
        ]
      },
      "sourceRefs": [
        "SRC-TERRAN",
        "card:jim-raynor"
      ],
      "notes": "Generated from faction-expanded replacement weapon row."
    },
    {
      "id": "terran-marauder-veteran-of-tarsonis",
      "unitId": "terran-marauder",
      "name": "Veteran of Tarsonis",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "20/40",
      "text": "While this Unit is Within 3\" of a Mission Marker, its Armour characteristic is increased by 1.",
      "keywordIds": [
        "within"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marauder"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-marauder-kinetic-foam",
      "unitId": "terran-marauder",
      "name": "Kinetic Foam",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "20/40",
      "text": "Increase this Unit's Hit Points characteristic by 1.",
      "keywordIds": [],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marauder"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-marauder-laser-targeting-systems",
      "unitId": "terran-marauder",
      "name": "Laser Targeting Systems",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "20/40",
      "text": "This Unit’s Quad K12 weapon gains LONG RANGE (16\").",
      "keywordIds": [
        "long-range"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marauder"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-marine-bayonet",
      "unitId": "terran-marine",
      "name": "Bayonet",
      "phase": "Combat Phase",
      "type": "Weapon",
      "cost": "20/30",
      "replacesWeapon": "Strike",
      "text": "FOR Strike. RNG E. TGT Ground. RoA 2. Hit 5+. Dmg 1",
      "keywordIds": [],
      "weaponProfile": {
        "range": "E",
        "target": "Ground",
        "roa": 2,
        "hit": "5+",
        "surgeType": null,
        "surgeDice": null,
        "damage": 1,
        "rulesText": "FOR Strike",
        "keywordIds": []
      },
      "sourceRefs": [
        "SRC-TERRAN",
        "card:marine"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table."
    },
    {
      "id": "terran-medic-advanced-medic-facilities",
      "unitId": "terran-medic",
      "name": "Advanced Medic Facilities",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "60",
      "text": "This Unit’s Supply Value counts as 0 when calculating the Supply Pool .",
      "keywordIds": [
        "supply-value",
        "the-supply-pool"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:medic"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-medic-a-13-flash-grenade-launcher",
      "unitId": "terran-medic",
      "name": "A-13 Flash Grenade Launcher",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "20",
      "text": "Increase the Optical Flare special ability 's Range to 16\".",
      "keywordIds": [
        "special-ability"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:medic"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "terran-medic-stabilizer-medpacks",
      "unitId": "terran-medic",
      "name": "Stabilizer Medpacks",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "30",
      "text": "When this Unit resolves a Life Support or Medpack ability, treat it as having 1 additional model Within Range for calculating that ability's effects.",
      "keywordIds": [
        "within"
      ],
      "sourceRefs": [
        "SRC-TERRAN",
        "card:medic"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    }
  ],
  "counts": {
    "factionCards": 2,
    "units": 7,
    "weapons": 15,
    "abilities": 43,
    "tacticalCards": 10,
    "upgrades": 26
  },
  "status": {
    "active": true,
    "mode": "shared-runtime-legacy-adapter"
  }
};
window.__starcraftTMGRuntimeStatus = {"active":true,"mode":"shared-runtime-legacy-adapter"};
window.__starcraftTMGRuntimeFaction = "terran";
