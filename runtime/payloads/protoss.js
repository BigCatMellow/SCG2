window.__starcraftTMGRuntimePayload = {
  "faction": "Protoss",
  "factionKey": "protoss",
  "factionCards": [
    {
      "id": "protoss-daelaam",
      "name": "Daelaam",
      "unique": true,
      "resource": "+1 EN",
      "slots": {
        "elite": 1,
        "core": 3,
        "support": 1
      },
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Dae’Uhl",
          "type": "Reaction",
          "description": "When a Friendly Unit receives Damage, reduce the Total Damage by 2 (to a minimum of 1)."
        },
        {
          "phase": "Movement Phase",
          "name": "Mass Recall",
          "type": "Active",
          "description": "Once per Game. Place a Faction Indicator anywhere on the battlefield. All Friendly Protoss Units Within 6\" of this Faction Indicator are removed from the battlefield and placed in Reserves ."
        }
      ]
    },
    {
      "id": "protoss-khalai",
      "name": "Khalai",
      "unique": true,
      "resource": "+1 EN",
      "slots": {
        "hero": 1,
        "elite": 2,
        "core": 3
      },
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Pylon Warp-In",
          "type": "Active",
          "description": "If there is no Friendly Pylon on the battlefield, place a Friendly Pylon Unit anywhere on the GROUND LEVEL of the battlefield more than 10\" away from any Enemy model. This Round, the Pylon is not eligible to use its Special Abilities (excluding Structure)."
        },
        {
          "phase": "Movement Phase",
          "name": "Bound by the Khala",
          "type": "Active",
          "description": "At the end of the active Unit’s Activation, select one other Friendly Unit eligible to Activate in the current Phase. Immediately Activate that Unit."
        }
      ]
    }
  ],
  "units": [
    {
      "id": "protoss-adept",
      "name": "Adept",
      "family": "Adept",
      "variantOrder": 0,
      "role": "Core",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "2",
        "speed": "5/8",
        "evade": "5+",
        "armour": "5+",
        "hp": 3,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 150,
          "models": "3 - 4",
          "supply": 1
        },
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 2",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "Glaive Cannon",
          "phase": "Assault",
          "range": "8",
          "target": "All",
          "roa": "2",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3+1",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Strike",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "1",
          "hit": "4+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Psionic Presence",
          "type": "Passive",
          "description": "All Weapons of Friendly Units targeting an Enemy Unit Within 4\" of this Unit’s Shade token gain PRECISION (1)."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Psionic Transfer",
            "type": "Active (1 Psionic Energy)",
            "description": "Active\n(1 Psionic Energy)\n\n Set a Shade token Wholly Within 12\" of any model in this Unit. At the End of the Round, the controlling player may set all models of this Unit in Coherency, treating the Shade token as the Leading Model . The Shade token has DISPLACEMENT ."
          }
        ]
      },
      "upgrades": {
        "Combat Phase": [
          {
            "name": "Glaive Strike",
            "type": "Weapon (20)",
            "description": "FOR Strike. RNG E. TGT Ground. RoA 1. Hit 4+. Surge Light. S.Die D3. Dmg 1. Keywords: pierce-light-2"
          }
        ],
        "Assault Phase": [
          {
            "name": "Guidance",
            "type": "Passive (10)",
            "description": "This Unit's Glaive Cannon Ranged weapon gains ANTI-EVADE (2)."
          },
          {
            "name": "Resonating Glaives",
            "type": "Active (20)",
            "description": "Active\n(1 Psionic Energy)\n\n This Unit's Glaive Cannon gains BUFF RoA (1)."
          }
        ]
      }
    },
    {
      "id": "protoss-artanis",
      "name": "Artanis",
      "family": "Artanis",
      "variantOrder": 0,
      "role": "Hero",
      "unique": false,
      "tags": [
        "Biological",
        "Psionic",
        "Ground",
        "Unique"
      ],
      "stats": {
        "shield": "4",
        "speed": "7",
        "evade": "5+",
        "armour": "4+",
        "hp": 8,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 250,
          "models": "1 - 1",
          "supply": 1
        }
      ],
      "weapons": [
        {
          "name": "Twilight Blades Strike",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "2",
          "hit": "2+",
          "surge": "Armoured",
          "sDie": "D3",
          "damage": "3",
          "keywords": []
        },
        {
          "name": "Twilight Blades Sweep",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "6",
          "hit": "2+",
          "surge": "Light",
          "sDie": "D3+1",
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
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Phase Prism",
            "type": "Passive",
            "description": "When Artanis is nominated to deploy from Reserves , it may resolve the PLACE (0) effect from another Friendly Unit. That Friendly Unit is removed from the battlefield and returned to Reserves . Artanis ' Activation ends."
          }
        ],
        "Assault Phase": [
          {
            "name": "Hierarch’s Stand",
            "type": "Reaction (1 Psionic Energy)",
            "description": "Reaction\n(1 Psionic Energy)\n\n When another Friendly Unit Within 8\" is declared as the target of a Ranged Attack and this Unit is a valid target, redirect the attack to this Unit. This Unit is eligible to make an Evade Roll against the redirected attack. This Special Ability remains active until the End of the current Activation."
          },
          {
            "name": "Lightning Dash",
            "type": "Reaction (1 Psionic Energy)",
            "description": "Reaction\n(1 Psionic Energy)\n\n After this Unit resolves a successful Charge action, it may declare a second Charge action against a different Enemy Unit, ignoring the restriction on Charging while Engaged . The Devastating Charge ability does not trigger a second time."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (6) 4+ effect."
          }
        ]
      },
      "upgrades": {}
    },
    {
      "id": "protoss-praetor-guard-zealot",
      "name": "Praetor Guard (Zealot)",
      "family": "Zealot",
      "variantOrder": 1,
      "role": "Elite",
      "unique": false,
      "tags": [
        "Khalai",
        "Biological",
        "Light",
        "Ground",
        "Unique"
      ],
      "stats": {
        "shield": "3",
        "speed": "4/7",
        "evade": "5+",
        "armour": "5+",
        "hp": 4,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 280,
          "models": "2 - 3",
          "supply": 2
        },
        {
          "tier": "T1",
          "cost": null,
          "models": "1 - 1",
          "supply": 1
        }
      ],
      "weapons": [
        {
          "name": "Psi Blades",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "4",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Shield Overcharge",
          "type": "Passive",
          "description": "This Unit gains TOUGH (2) on the first Armour Roll each Round."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Leg Enhancements",
            "type": "Active (1 Psionic Energy)",
            "description": "Active\n(1 Psionic Energy)\n\n This Unit performs a 2\" Move action. This does not count towards its action limit."
          }
        ],
        "Assault Phase": [
          {
            "name": "Charge",
            "type": "Active (1 Psionic Energy)",
            "description": "Active\n(1 Psionic Energy)\n\n When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit’s Speed characteristic."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (3) 4+ effect."
          }
        ],
        "Combat Phase": [
          {
            "name": "Titan Killers",
            "type": "Passive",
            "description": "When this Unit makes a Close Combat Attack, and the target is Size 3 or larger, the weapon’s Damage characteristic is treated as 2."
          },
          {
            "name": "Precognition",
            "type": "Passive",
            "description": "This Unit is eligible to make an Evade roll against all attacks targeting it."
          }
        ]
      },
      "upgrades": {}
    },
    {
      "id": "protoss-pylon",
      "name": "Pylon",
      "family": "Pylon",
      "variantOrder": 0,
      "role": "Other",
      "unique": false,
      "tags": [
        "Khalai",
        "Armored",
        "Ground"
      ],
      "stats": {
        "shield": "2",
        "speed": "-",
        "evade": "-",
        "armour": "5+",
        "hp": 8,
        "size": 3
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
          "name": "Structure",
          "type": "Passive",
          "description": "This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers , ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise."
        },
        {
          "phase": "Any Phase",
          "name": "Khalai Ingenuity",
          "type": "Passive",
          "description": "Once per Round, when a Friendly Unit Within 4\" of this Pylon uses a Special Ability that costs Psionic Energy, that ability’s PE cost is reduced by 1."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Warp Conduit",
            "type": "Passive",
            "description": "Once per Round, the controlling player may deploy a Ground Unit from Reserves using this Pylon base as the Entry Edge . This Unit's Activation ends."
          }
        ]
      },
      "upgrades": {}
    },
    {
      "id": "protoss-sentry",
      "name": "Sentry",
      "family": "Sentry",
      "variantOrder": 0,
      "role": "Support",
      "unique": false,
      "tags": [
        "Light",
        "Mechanical",
        "Psionic",
        "Ground"
      ],
      "stats": {
        "shield": "2",
        "speed": "4/7",
        "evade": "6+",
        "armour": "5+",
        "hp": 4,
        "size": 1
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 130,
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
          "name": "Disruption Beam",
          "phase": "Assault",
          "range": "8",
          "target": "All",
          "roa": "2",
          "hit": "2+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Beam",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "2",
          "hit": "3+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Restoration",
          "type": "Reaction (1 Psionic Energy)",
          "description": "Reaction\n(1 Psionic Energy)\n\n Use when a Friendly Unit Within 4\" receives a DEBUFF . Remove all DEBUFFS from it."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Force Field",
            "type": "Active (1 Psionic Energy)",
            "description": "Active\n(1 Psionic Energy)\n\n Set a Force Field token Within 8\" in an unoccupied space. Units of Size 2 or lower cannot move across Force Fields. Models of Size 3 or more can move over it, and it's then removed."
          },
          {
            "name": "Guardian Shield",
            "type": "Active (1 Psionic Energy)",
            "description": "Active\n(1 Psionic Energy)\n\n All Ranged Attacks targeting a Friendly Unit Within 4\" ( Line of Sight is not required) are made with 1 fewer die in the Attack Pool."
          }
        ]
      },
      "upgrades": {
        "Assault Phase": [
          {
            "name": "Hallucination",
            "type": "Reaction (30)",
            "description": "Reaction\n(0 Psionic Energy)\n\n When an Enemy Unit declares a Ranged Attack against a Friendly Unit Within 4\", the targeted Friendly Unit is eligible to make an Evade Roll against that attack."
          }
        ],
        "Movement Phase": [
          {
            "name": "Solid-Field Projectors",
            "type": "Active (20)",
            "description": "Active\n(1 Psionic Energy)\n\n Set a Force Field token Within 8\" in an unoccupied space. Units of Size 2 or lower cannot move across Force Fields. Models of Size 3 or more can move over it, and it's then removed."
          }
        ]
      }
    },
    {
      "id": "protoss-stalker",
      "name": "Stalker",
      "family": "Stalker",
      "variantOrder": 0,
      "role": "Elite",
      "unique": false,
      "tags": [
        "Armoured",
        "Mechanical",
        "Ground"
      ],
      "stats": {
        "shield": "3",
        "speed": "4/8",
        "evade": "6+",
        "armour": "4+",
        "hp": 6,
        "size": 3
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 260,
          "models": "2 - 2",
          "supply": 2
        },
        {
          "tier": "T1",
          "cost": 160,
          "models": "1 - 1",
          "supply": 1
        }
      ],
      "weapons": [
        {
          "name": "Particle Disruptors",
          "phase": "Assault",
          "range": "12",
          "target": "All",
          "roa": "4",
          "hit": "3+",
          "surge": "Armoured",
          "sDie": "D3",
          "damage": "2",
          "keywords": []
        },
        {
          "name": "Stomp",
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
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Squadron",
          "type": "Passive",
          "description": "This Unit’s Horizontal Coherency is 4\"."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Blink",
            "type": "Active (1 Psionic Energy)",
            "description": "Active\n(1 Psionic Energy)\n\n Resolve the PLACE (6) effect. Models set by this effect cannot be set up Within the Engagement Range of any Enemy Unit."
          }
        ]
      },
      "upgrades": {
        "Assault Phase": [
          {
            "name": "Fury of the Nerazim",
            "type": "Passive",
            "description": "When this Unit attacks an Enemy Unit that has already been Activated during this Phase, its Particle Disruptors gain INSTANT for that attack."
          }
        ],
        "Any Phase": [
          {
            "name": "Path of Shadows",
            "type": "Active",
            "description": "Active\n(1 Psionic Energy)\n\n This Unit gains HIDDEN Status until it performs another action."
          }
        ]
      }
    },
    {
      "id": "protoss-zealot",
      "name": "Zealot",
      "family": "Zealot",
      "variantOrder": 0,
      "role": "Core",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "3",
        "speed": "4/7",
        "evade": "5+",
        "armour": "5+",
        "hp": 4,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 160,
          "models": "2 - 3",
          "supply": 2
        },
        {
          "tier": "T1",
          "cost": null,
          "models": "1 - 1",
          "supply": 1
        }
      ],
      "weapons": [
        {
          "name": "Psi Blades",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "4",
          "hit": "3+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [],
      "phaseAbilities": {
        "Assault Phase": [
          {
            "name": "Charge",
            "type": "Active (1 Psionic Energy)",
            "description": "Active\n(1 Psionic Energy)\n\n When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit’s Speed characteristic."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (3) 4+ effect."
          }
        ]
      },
      "upgrades": {
        "Movement Phase": [
          {
            "name": "Leg Enhancements",
            "type": "Active (20)",
            "description": "Active\n(1 Psionic Energy)\n\n This Unit performs a 2\" Move action. This does not count towards its action limit."
          }
        ],
        "Any Phase": [
          {
            "name": "My Life for Aiur",
            "type": "Passive (10)",
            "description": "When this Unit resolves IMPACT , each eligible model generates 1 additional IMPACT die."
          }
        ],
        "Combat Phase": [
          {
            "name": "We Stand as One",
            "type": "Passive (20)",
            "description": "When this Unit makes a Close Combat Attack, if the target is Engaged with at least 1 other Friendly Unit, this Unit's Close Combat Weapon gains PRECISION (2)."
          }
        ],
        "Assault Phase": [
          {
            "name": "Zealous Round",
            "type": "Reaction (10)",
            "description": "Reaction\n(0 Psionic Energy)\n\n When this Unit is not Activated and receives Damage, the controlling player may count this Unit as Activated in this Phase (flip its Activation Marker) to reduce the Total Damage by 2."
          }
        ]
      }
    }
  ],
  "tacticalCards": [
    {
      "id": "gateway",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Gateway",
      "gasCost": 25,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:gateway"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-gateway-quick-strikes"
      ],
      "abilities": [
        {
          "phase": "Combat Phase",
          "name": "Quick Strikes",
          "type": "Active",
          "description": "The active Unit’s first Close Combat Weapon used gains PRECISION (2)."
        }
      ],
      "cost": 25,
      "resource": "+1 EN",
      "slots": {
        "core": 1
      }
    },
    {
      "id": "warp-gate",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Warp Gate",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:warp-gate"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 2
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-warp-gate-warp-in",
        "protoss-warp-gate-quick-strikes"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Warp In",
          "type": "Active",
          "description": "The active Ground Unit Deploys from any table edge that is not a player’s Entry Edge . This deployment must end more than 10\" away from any Enemy model. The controlling player cannot use this ability if another Friendly Ground Unit has already Deployed this Round."
        },
        {
          "phase": "Combat Phase",
          "name": "Quick Strikes",
          "type": "Active",
          "description": "The active Unit’s first Close Combat Weapon used gains PRECISION (2)."
        }
      ],
      "cost": 40,
      "resource": "+1 EN",
      "slots": {
        "core": 2
      }
    },
    {
      "id": "gate-chronoboosted",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Gate Chronoboosted",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:gate-chronoboosted"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 1,
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-gate-chronoboosted-zealous-charge",
        "protoss-gate-chronoboosted-quick-strikes"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Zealous Charge",
          "type": "Active",
          "description": "The active Unit gains BUFF Speed (2)."
        },
        {
          "phase": "Combat Phase",
          "name": "Quick Strikes",
          "type": "Active",
          "description": "The active Unit’s first Close Combat Weapon used gains PRECISION (2)."
        }
      ],
      "cost": 40,
      "resource": "+1 EN",
      "slots": {
        "elite": 1,
        "core": 1
      }
    },
    {
      "id": "observer",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Observer",
      "gasCost": 25,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:observer"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "support": 1
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-observer-surveillance",
        "protoss-observer-gravitic-boosters"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Surveillance",
          "type": "Active",
          "description": "Place a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6\" of this Faction Indicator, they lose HIDDEN ."
        },
        {
          "phase": "Assault Phase",
          "name": "Gravitic Boosters",
          "type": "Reaction",
          "description": "Use after a Friendly Unit rolls a D6 for Charge Distance. Add 1 to the Charge Distance for this Unit."
        }
      ],
      "cost": 25,
      "resource": "+1 EN",
      "slots": {
        "support": 1
      }
    },
    {
      "id": "nexus",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Nexus",
      "gasCost": 35,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:nexus"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 2
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-nexus-ancient-pride",
        "protoss-nexus-strategic-recall"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Ancient Pride",
          "type": "Active",
          "description": "The active Unit’s first Weapon used gains INSTANT ."
        },
        {
          "phase": "Movement Phase",
          "name": "Strategic Recall",
          "type": "Active",
          "description": "The active, Unengaged Ground Unit is placed in Reserves instead of performing an action."
        }
      ],
      "cost": 35,
      "resource": "+1 EN",
      "slots": {
        "core": 2
      }
    },
    {
      "id": "overcharged-nexus",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Nexus Overcharged",
      "gasCost": 35,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:overcharged-nexus"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 1,
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-overcharged-nexus-photon-overcharge",
        "protoss-overcharged-nexus-strategic-recall"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Photon Overcharge",
          "type": "Reaction",
          "description": "Use when an Enemy Unit enters the battlefield from Reserves via a location other than its own Entry Edge . That Unit immediately suffers HITS 3 (1)."
        },
        {
          "phase": "Movement Phase",
          "name": "Strategic Recall",
          "type": "Active",
          "description": "The active, Unengaged Ground Unit is placed in Reserves instead of performing an action."
        }
      ],
      "cost": 35,
      "resource": "+1 EN",
      "slots": {
        "elite": 1,
        "core": 1
      }
    },
    {
      "id": "power-field",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Power Field",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:power-field"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "hero": 1,
        "elite": 1,
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-power-field-guardian-shell"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Guardian Shell",
          "type": "Reaction",
          "description": "Use before a Friendly Ground Unit makes an Armour Roll. That Unit gains DODGE (2) for this roll."
        }
      ],
      "cost": 40,
      "resource": "+1 EN",
      "slots": {
        "hero": 1,
        "elite": 1,
        "core": 1
      }
    },
    {
      "id": "forge",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Forge",
      "gasCost": 30,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:forge"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 1
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-forge-ground-armor",
        "protoss-forge-ground-weapons"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Ground Armor",
          "type": "Reaction",
          "description": "Use before a Friendly Ground Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll."
        },
        {
          "phase": "Assault Phase",
          "name": "Ground Weapons",
          "type": "Active",
          "description": "The active Ground Unit’s first Ranged Weapon used gains CRITICAL HIT (1)."
        }
      ],
      "cost": 30,
      "resource": "+1 EN",
      "slots": {
        "elite": 1
      }
    },
    {
      "id": "warp-prism",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Warp Prism",
      "gasCost": 45,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:warp-prism"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 2
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-warp-prism-phase",
        "protoss-warp-prism-warp-conduit"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Phase",
          "type": "Active",
          "description": "The active Unit resolves the PLACE (3) effect."
        },
        {
          "phase": "Movement Phase",
          "name": "Warp Conduit",
          "type": "Active",
          "description": "Place a Faction Indicator anywhere on the battlefield more than 10\" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator."
        }
      ],
      "cost": 45,
      "resource": "+1 EN",
      "slots": {
        "core": 2
      }
    },
    {
      "id": "twilight-council",
      "faction": "Protoss",
      "factionTags": [
        "Protoss"
      ],
      "name": "Twilight Council",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:twilight-council"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "EN",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 1,
        "support": 1
      },
      "preserveName": true,
      "abilityIds": [
        "protoss-twilight-council-veil-of-shadows",
        "protoss-twilight-council-weapons-of-the-firstborn"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Veil of Shadows",
          "type": "Reaction",
          "description": "Use after a Friendly Unit resolves a PLACE effect. That Unit immediately resolves the HEAL (2) effect."
        },
        {
          "phase": "Assault Phase",
          "name": "Weapons of the Firstborn",
          "type": "Active",
          "description": "The active Ground Unit’s first Ranged Weapon used gains BUFF Range (4)."
        }
      ],
      "cost": 40,
      "resource": "+1 EN",
      "slots": {
        "elite": 1,
        "support": 1
      }
    }
  ],
  "upgrades": [
    {
      "id": "protoss-adept-glaive-strike",
      "unitId": "protoss-adept",
      "name": "Glaive Strike",
      "phase": "Any Phase",
      "type": "↑ Strike",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": "Strike",
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:adept"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-adept-guidance",
      "unitId": "protoss-adept",
      "name": "Guidance",
      "phase": "Any Phase",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:adept"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-adept-resonating-glaives",
      "unitId": "protoss-adept",
      "name": "Resonating Glaives",
      "phase": "Any Phase",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:adept"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-zealot-leg-enhancements",
      "unitId": "protoss-zealot",
      "name": "Leg Enhancements",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:zealot"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-zealot-my-life-for-aiur",
      "unitId": "protoss-zealot",
      "name": "My Life for Aiur",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:zealot"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-zealot-we-stand-as-one",
      "unitId": "protoss-zealot",
      "name": "We Stand as One",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:zealot"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-zealot-zealous-round",
      "unitId": "protoss-zealot",
      "name": "Zealous Round",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:zealot"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-sentry-hallucination",
      "unitId": "protoss-sentry",
      "name": "Hallucination",
      "type": "-",
      "cost": "30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:sentry"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-sentry-solid-field-projectors",
      "unitId": "protoss-sentry",
      "name": "Solid-Field Projectors",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:sentry"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-stalker-fury-of-the-nerazim",
      "unitId": "protoss-stalker",
      "name": "Fury of the Nerazim",
      "type": "-",
      "cost": "20/30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:stalker"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-stalker-path-of-shadows",
      "unitId": "protoss-stalker",
      "name": "Path of Shadows",
      "type": "-",
      "cost": "20/40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:stalker"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "protoss-adept-resonating-glaives",
      "unitId": "protoss-adept",
      "name": "Resonating Glaives",
      "phase": "Assault Phase",
      "type": "Active",
      "cost": "20",
      "text": "Active\n(1 Psionic Energy)\n\n This Unit's Glaive Cannon gains BUFF RoA (1).",
      "keywordIds": [
        "buff"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:adept"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-adept-guidance",
      "unitId": "protoss-adept",
      "name": "Guidance",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "10",
      "text": "This Unit's Glaive Cannon Ranged weapon gains ANTI-EVADE (2).",
      "keywordIds": [
        "anti-evade"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:adept"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-adept-glaive-strike",
      "unitId": "protoss-adept",
      "name": "Glaive Strike",
      "phase": "Combat Phase",
      "type": "Weapon",
      "cost": "20",
      "replacesWeapon": "Strike",
      "text": "FOR Strike. RNG E. TGT Ground. RoA 1. Hit 4+. Surge Light. S.Die D3. Dmg 1. Keywords: pierce-light-2",
      "keywordIds": [
        "pierce-light-2"
      ],
      "weaponProfile": {
        "range": "E",
        "target": "Ground",
        "roa": 1,
        "hit": "4+",
        "surgeType": "Light",
        "surgeDice": "D3",
        "damage": 1,
        "rulesText": "FOR Strike",
        "keywordIds": [
          "pierce-light-2"
        ]
      },
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:adept"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table."
    },
    {
      "id": "protoss-sentry-solid-field-projectors",
      "unitId": "protoss-sentry",
      "name": "Solid-Field Projectors",
      "phase": "Movement Phase",
      "type": "Active",
      "cost": "20",
      "text": "Active\n(1 Psionic Energy)\n\n Set a Force Field token Within 8\" in an unoccupied space. Units of Size 2 or lower cannot move across Force Fields. Models of Size 3 or more can move over it, and it's then removed.",
      "keywordIds": [
        "within",
        "units",
        "move",
        "models"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:sentry"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-sentry-hallucination",
      "unitId": "protoss-sentry",
      "name": "Hallucination",
      "phase": "Assault Phase",
      "type": "Reaction",
      "cost": "30",
      "text": "Reaction\n(0 Psionic Energy)\n\n When an Enemy Unit declares a Ranged Attack against a Friendly Unit Within 4\", the targeted Friendly Unit is eligible to make an Evade Roll against that attack.",
      "keywordIds": [
        "enemy",
        "ranged-attack",
        "friendly",
        "within"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:sentry"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-stalker-path-of-shadows",
      "unitId": "protoss-stalker",
      "name": "Path of Shadows",
      "phase": "Any Phase",
      "type": "Active",
      "cost": "20/40",
      "text": "Active\n(1 Psionic Energy)\n\n This Unit gains HIDDEN Status until it performs another action.",
      "keywordIds": [
        "hidden",
        "status"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:stalker"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-stalker-fury-of-the-nerazim",
      "unitId": "protoss-stalker",
      "name": "Fury of the Nerazim",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "20/30",
      "text": "When this Unit attacks an Enemy Unit that has already been Activated during this Phase, its Particle Disruptors gain INSTANT for that attack.",
      "keywordIds": [
        "enemy",
        "instant"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:stalker"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-zealot-my-life-for-aiur",
      "unitId": "protoss-zealot",
      "name": "My Life for Aiur",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "10",
      "text": "When this Unit resolves IMPACT , each eligible model generates 1 additional IMPACT die.",
      "keywordIds": [
        "impact"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:zealot"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-zealot-leg-enhancements",
      "unitId": "protoss-zealot",
      "name": "Leg Enhancements",
      "phase": "Movement Phase",
      "type": "Active",
      "cost": "20",
      "text": "Active\n(1 Psionic Energy)\n\n This Unit performs a 2\" Move action. This does not count towards its action limit.",
      "keywordIds": [
        "move"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:zealot"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-zealot-zealous-round",
      "unitId": "protoss-zealot",
      "name": "Zealous Round",
      "phase": "Assault Phase",
      "type": "Reaction",
      "cost": "10",
      "text": "Reaction\n(0 Psionic Energy)\n\n When this Unit is not Activated and receives Damage, the controlling player may count this Unit as Activated in this Phase (flip its Activation Marker) to reduce the Total Damage by 2.",
      "keywordIds": [
        "controlling-player"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:zealot"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "protoss-zealot-we-stand-as-one",
      "unitId": "protoss-zealot",
      "name": "We Stand as One",
      "phase": "Combat Phase",
      "type": "Passive",
      "cost": "20",
      "text": "When this Unit makes a Close Combat Attack, if the target is Engaged with at least 1 other Friendly Unit, this Unit's Close Combat Weapon gains PRECISION (2).",
      "keywordIds": [
        "engaged",
        "friendly",
        "precision"
      ],
      "sourceRefs": [
        "SRC-PROTOSS",
        "card:zealot"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    }
  ],
  "counts": {
    "factionCards": 2,
    "units": 7,
    "weapons": 10,
    "abilities": 45,
    "tacticalCards": 10,
    "upgrades": 22
  },
  "status": {
    "active": true,
    "mode": "shared-runtime-legacy-adapter"
  }
};
window.__starcraftTMGRuntimeStatus = {"active":true,"mode":"shared-runtime-legacy-adapter"};
window.__starcraftTMGRuntimeFaction = "protoss";
