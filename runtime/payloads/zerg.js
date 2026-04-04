window.__starcraftTMGRuntimePayload = {
  "faction": "Zerg",
  "factionKey": "zerg",
  "factionCards": [
    {
      "id": "zerg-kerrigans-swarm",
      "name": "Kerrigan's Swarm",
      "unique": true,
      "resource": "+1 BM",
      "slots": {
        "hero": 1,
        "elite": 2,
        "core": 3
      },
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Wild Mutation",
          "type": "Active",
          "description": "If the active unit is ON CREEP , the Unit gains BUFF Speed (1) and its first Weapon used gains PRECISION (1)."
        },
        {
          "phase": "Any Phase",
          "name": "Zerg Creep",
          "type": "Passive",
          "description": "During Army Building , select exactly one Creep Card and add it to their Army List, paying its listed cost (if any)."
        },
        {
          "phase": "Movement Phase",
          "name": "Omega Network",
          "type": "Active",
          "description": "If there is no Friendly Omega Worm on the battlefield, place a Friendly Omega Worm Unit anywhere on GROUND LEVEL of the battlefield, more than 10\" away from any Enemy model. This Round, the Omega Worm is not eligible to use its Special Abilities (excluding Structure)."
        }
      ]
    },
    {
      "id": "zerg-zerg-swarm",
      "name": "Zerg Swarm",
      "unique": true,
      "resource": "+1 BM",
      "slots": {
        "elite": 1,
        "core": 3,
        "support": 1
      },
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Brood Instinct",
          "type": "Reaction",
          "description": "Use before a Friendly Unit makes an Evade Roll. Apply a +1 Modifier to that roll."
        },
        {
          "phase": "Any Phase",
          "name": "Zerg Creep",
          "type": "Passive",
          "description": "During Army Building , select exactly one Creep Card and add it to their Army List, paying its listed cost (if any)."
        },
        {
          "phase": "Movement Phase",
          "name": "Rapid Burrowing",
          "type": "Active",
          "description": "Select one Friendly , Unengaged Ground Zerg Unit on the battlefield. That Unit gains the Burrowed Status , even if it has already been Activated this Round."
        }
      ]
    }
  ],
  "units": [
    {
      "id": "zerg-corpser-roach",
      "name": "Corpser (Roach)",
      "family": "Roach",
      "variantOrder": 1,
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
        "evade": "5+",
        "armour": "3+",
        "hp": 4,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 250,
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
          "name": "Acid Saliva",
          "phase": "Assault",
          "range": "8",
          "target": "Ground",
          "roa": "2",
          "hit": "3+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Claws",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "3",
          "hit": "4+",
          "surge": "Light",
          "sDie": "D3+1",
          "damage": "1",
          "keywords": []
        }
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Burrow",
          "type": "Active (2 Biomass)",
          "description": "Active\n(2 Biomass)\n\n If this Unit is Unengaged , it gains or loses the Burrowed Status ."
        }
      ],
      "phaseAbilities": {
        "Movement Phase": [
          {
            "name": "Roachling Infestation",
            "type": "Active (2 Biomass)",
            "description": "Active\n(2 Biomass)\n\n Once per Game. Resolve the SUMMON (Roachling) effect."
          }
        ],
        "Assault Phase": [
          {
            "name": "Regeneration",
            "type": "Passive",
            "description": "When this Unit becomes Activated, if it has the Burrowed Status , resolve the HEAL (2) effect."
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
            "name": "Burrow Ambush",
            "type": "Passive (20)",
            "description": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends."
          },
          {
            "name": "Glial Reconstitution",
            "type": "Active (20)",
            "description": "Active\n(1 Biomass)\n\n This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP ."
          }
        ],
        "Assault Phase": [
          {
            "name": "Hydriodic Bile",
            "type": "Passive (10)",
            "description": "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice : D3+1."
          }
        ],
        "Any Phase": [
          {
            "name": "Tunneling Claws",
            "type": "Passive (10)",
            "description": "While this Unit has the Burrowed Status , it may perform the Move and Run actions without losing that Status . It may also move through other Units ’ bases ."
          }
        ]
      }
    },
    {
      "id": "zerg-hydralisk",
      "name": "Hydralisk",
      "family": "Hydralisk",
      "variantOrder": 0,
      "role": "Elite",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4/8",
        "evade": "5+",
        "armour": "5+",
        "hp": 4,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T3",
          "cost": 260,
          "models": "3 - 4",
          "supply": 3
        },
        {
          "tier": "T2",
          "cost": 140,
          "models": "2 - 2",
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
          "name": "Needle Spines",
          "phase": "Assault",
          "range": "12",
          "target": "All",
          "roa": "3",
          "hit": "3+",
          "surge": "Light, Armoured",
          "sDie": "D3+1",
          "damage": "2",
          "keywords": []
        },
        {
          "name": "Scythe",
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
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Squadron",
          "type": "Passive",
          "description": "This Unit’s Horizontal Coherency is 4\"."
        }
      ],
      "phaseAbilities": {
        "Assault Phase": [
          {
            "name": "Lunge",
            "type": "Reaction (1 Biomass)",
            "description": "Reaction\n(1 Biomass)\n\n When another Friendly Unit Within 10\" is the target of a Ranged Attack , after the attack is fully resolved, this Unit, if Unengaged , may perform a Move action Directly Towards the attacking Unit."
          }
        ]
      },
      "upgrades": {
        "Any Phase": [
          {
            "name": "Ancillary Carapace",
            "type": "Passive",
            "description": "This Unit gains TOUGH (1) on the first Armour Roll of each Activation."
          },
          {
            "name": "Lurking",
            "type": "Passive",
            "description": "If this Unit has Stationary Status , it is eligible to make an Evade Roll against the first Ranged Attack targeting it this Round. If this Unit is ON CREEP , it gains +1 Modifier to this Evade Roll."
          }
        ],
        "Movement Phase": [
          {
            "name": "Burrow Ambush",
            "type": "Passive",
            "description": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends."
          }
        ],
        "Assault Phase": [
          {
            "name": "Grooved Spines",
            "type": "Passive",
            "description": "This Unit's Needle Spines ranged weapon gains LONG RANGE (16\")."
          }
        ]
      }
    },
    {
      "id": "zerg-kerrigan",
      "name": "Kerrigan",
      "family": "Kerrigan",
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
        "shield": "-",
        "speed": "7",
        "evade": "6+",
        "armour": "5+",
        "hp": 9,
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
          "name": "Energy Blast",
          "phase": "Assault",
          "range": "8",
          "target": "All",
          "roa": "5",
          "hit": "3+",
          "surge": "Light, Armoured",
          "sDie": "D3",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Blades",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "6",
          "hit": "4+",
          "surge": "-",
          "sDie": "-",
          "damage": "2",
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
            "name": "Crushing Grip",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n Select one Enemy Unit Within 12\". That Unit counts as Activated in this Phase (set an Activation Marker next to it)."
          },
          {
            "name": "Mutating Carapace",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n Select one Enemy Unit Within 18\". This Unit is eligible to make an Evade Roll against all attacks made by the selected Enemy Unit, with a +2 Modifier applied to those Evade Rolls."
          }
        ],
        "Assault Phase": [
          {
            "name": "Leaping Strike",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n If Unengaged , resolve the PLACE (6) effect."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (4) 4+ effect."
          }
        ]
      },
      "upgrades": {}
    },
    {
      "id": "zerg-kerrigan-swarm-raptor-zergling",
      "name": "Kerrigan Swarm Raptor (Zergling)",
      "family": "Zergling",
      "variantOrder": 2,
      "role": "Elite",
      "unique": false,
      "tags": [
        "Kerrigan's Swarm",
        "Biological",
        "Light",
        "Ground",
        "Unique"
      ],
      "stats": {
        "shield": "-",
        "speed": "5/9",
        "evade": "4+",
        "armour": "5+",
        "hp": 2,
        "size": 1
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 250,
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
          "name": "Claws",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "2",
          "hit": "3+",
          "surge": "Light, Armoured",
          "sDie": "D6",
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
        },
        {
          "phase": "Any Phase",
          "name": "Raptor Strain",
          "type": "Passive",
          "description": "This Unit can move through IMPASSABLE TERRAIN of Size 4 or less and change elevation without using ACCESS POINTS."
        }
      ],
      "phaseAbilities": {
        "Assault Phase": [
          {
            "name": "Leap",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n When determining Charge Distance for this Unit, add 2 to the Charge Distance."
          },
          {
            "name": "Adrenal Overload",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n This Unit gains a +1 Modifier to all IMPACT Hit Rolls."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (2) 5+ effect."
          }
        ]
      },
      "upgrades": {}
    },
    {
      "id": "zerg-omega-worm",
      "name": "Omega Worm",
      "family": "Omega Worm",
      "variantOrder": 0,
      "role": "Other",
      "unique": false,
      "tags": [
        "Kerrigan's Swarm",
        "Armoured",
        "Biological",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "-",
        "evade": "-",
        "armour": "5+",
        "hp": 10,
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
          "name": "Detection",
          "type": "Passive",
          "description": "While Enemy Units are Within 6\" of this Unit, they lose HIDDEN Status ."
        },
        {
          "phase": "Any Phase",
          "name": "Source of Creep",
          "type": "Passive",
          "description": "A Friendly or Enemy Ground Zerg Unit Within 6\" of this Unit, counts as being ON CREEP ."
        },
        {
          "phase": "Any Phase",
          "name": "Structure",
          "type": "Passive",
          "description": "This Unit cannot be Activated in any Phase and cannot perform actions. Additionally, its Current Supply Value is treated as 0, and it can never Control or Contest Mission Markers , ignoring the standard Zero Supply Exception. This Unit cannot be a target of an ability, unless stated otherwise."
        },
        {
          "phase": "Any Phase",
          "name": "Omega Network",
          "type": "Passive",
          "description": "The base of the Omega Worm counts as an Entry Edge . Each Round, Friendly Units with a combined Supply cost of 2 or less may be Deployed via this Entry Edge .\n\nIf a Friendly Leading model finishes a Move , Disengage , or Run action in base-to-base contact with the Omega Worm, the controlling player may remove that Unit from the battlefield and return it to Reserves ."
        }
      ],
      "phaseAbilities": {},
      "upgrades": {}
    },
    {
      "id": "zerg-queen",
      "name": "Queen",
      "family": "Queen",
      "variantOrder": 0,
      "role": "Support",
      "unique": false,
      "tags": [
        "Armoured",
        "Biological",
        "Psionic",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4",
        "evade": "-",
        "armour": "4+",
        "hp": 9,
        "size": 3
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 150,
          "models": "1 - 1",
          "supply": 1
        }
      ],
      "weapons": [
        {
          "name": "Talons",
          "phase": "Assault",
          "range": "6",
          "target": "Ground",
          "roa": "4",
          "hit": "4+",
          "surge": "Light",
          "sDie": "D3",
          "damage": "2",
          "keywords": []
        },
        {
          "name": "Acid spines",
          "phase": "Assault",
          "range": "12",
          "target": "Flying",
          "roa": "4",
          "hit": "4+",
          "surge": "Light, Armoured",
          "sDie": "D3",
          "damage": "2",
          "keywords": []
        },
        {
          "name": "Talons",
          "phase": "Combat",
          "range": "E",
          "target": "Ground",
          "roa": "3",
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
          "name": "Spawn Creep Tumor",
          "type": "Active (1 Biomass)",
          "description": "Active\n(1 Biomass)\n\n Set a Creep Tumor token in base-to-base contact with this Unit."
        },
        {
          "phase": "Any Phase",
          "name": "Transfusion",
          "type": "Reaction (1 Biomass)",
          "description": "Reaction\n(1 Biomass)\n\n Use when another Friendly Biological Unit (including a Structure) suffers Damage Within 4\". Reduce the Total Damage before allocation by 2."
        },
        {
          "phase": "Any Phase",
          "name": "Restoration",
          "type": "Reaction (1 Biomass)",
          "description": "Reaction\n(1 Biomass)\n\n Use when a Friendly Unit Within 4\" receives a DEBUFF . Remove all DEBUFFS from it."
        },
        {
          "phase": "Any Phase",
          "name": "Psionic Link",
          "type": "Passive",
          "description": "Once per Round, if there are at least 7 Friendly models Within 6\" of this Unit, it may resolve its Special Ability with the BM cost reduced by 1."
        }
      ],
      "phaseAbilities": {
        "Assault Phase": [
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
            "name": "Creep Speed",
            "type": "Passive (10)",
            "description": "While this Unit is ON CREEP , increase this Unit's Speed characteristic by 2."
          }
        ],
        "Movement Phase": [
          {
            "name": "Domineering Presence",
            "type": "Active (10)",
            "description": "Active\n(1 Biomass)\n\n Select another Friendly Unit Within 6\" ( Line of Sight is not required). That Unit’s Supply characteristic is increased by 1 for Controlling and Contesting Mission Markers and completing objectives."
          }
        ]
      }
    },
    {
      "id": "zerg-raptor-zergling",
      "name": "Raptor (Zergling)",
      "family": "Zergling",
      "variantOrder": 1,
      "role": "Elite",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "5/9",
        "evade": "4+",
        "armour": "6+",
        "hp": 1,
        "size": 1
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 300,
          "models": "13 - 18",
          "supply": 2
        },
        {
          "tier": "T1",
          "cost": 240,
          "models": "7 - 12",
          "supply": 1
        },
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 6",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "Claws",
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
          "name": "Squadron",
          "type": "Passive",
          "description": "This Unit’s Horizontal Coherency is 4\"."
        },
        {
          "phase": "Any Phase",
          "name": "Raptor Strain",
          "type": "Passive",
          "description": "This Unit can move through IMPASSABLE TERRAIN of Size 4 or less and change elevation without using ACCESS POINTS."
        }
      ],
      "phaseAbilities": {
        "Assault Phase": [
          {
            "name": "Adrenal Overload",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n This Unit gains a +1 Modifier to all IMPACT Hit Rolls."
          },
          {
            "name": "Metabolic Boost",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit’s Speed characteristic."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (1) 5+ effect."
          }
        ]
      },
      "upgrades": {
        "Combat Phase": [
          {
            "name": "Adrenal Glands",
            "type": "Passive (30)",
            "description": "This Unit’s Claws and Shredding Claws weapons gain PRECISION (2)."
          },
          {
            "name": "Shredding Claws",
            "type": "Weapon (20)",
            "description": "FOR Claws. RNG E. TGT Ground. RoA 2. Hit 4+. Surge Light, Armoured. S.Die D3. Dmg 1"
          }
        ],
        "Movement Phase": [
          {
            "name": "Burrow Ambush",
            "type": "Passive",
            "description": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends."
          }
        ]
      }
    },
    {
      "id": "zerg-roach",
      "name": "Roach",
      "family": "Roach",
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
        "evade": "5+",
        "armour": "3+",
        "hp": 4,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 170,
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
          "name": "Acid Saliva",
          "phase": "Assault",
          "range": "8",
          "target": "Ground",
          "roa": "3",
          "hit": "3+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Claws",
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
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Burrow",
          "type": "Active (2 Biomass)",
          "description": "Active\n(2 Biomass)\n\n If this Unit is Unengaged , it gains or loses the Burrowed Status ."
        }
      ],
      "phaseAbilities": {
        "Assault Phase": [
          {
            "name": "Regeneration",
            "type": "Passive",
            "description": "When this Unit becomes Activated, if it has the Burrowed Status , resolve the HEAL (2) effect."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (2) 4+ effect."
          }
        ]
      },
      "upgrades": {
        "Movement Phase": [
          {
            "name": "Burrow Ambush",
            "type": "Passive (20)",
            "description": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends."
          },
          {
            "name": "Glial Reconstitution",
            "type": "Active (20)",
            "description": "Active\n(1 Biomass)\n\n This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP ."
          }
        ],
        "Assault Phase": [
          {
            "name": "Hydriodic Bile",
            "type": "Passive (10)",
            "description": "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice : D3+1."
          }
        ],
        "Any Phase": [
          {
            "name": "Tunneling Claws",
            "type": "Passive (10)",
            "description": "While this Unit has the Burrowed Status , it may perform the Move and Run actions without losing that Status . It may also move through other Units ’ bases ."
          }
        ]
      }
    },
    {
      "id": "zerg-roachling",
      "name": "Roachling",
      "family": "Roachling",
      "variantOrder": 0,
      "role": "Other",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4/7",
        "evade": "6+",
        "armour": "6+",
        "hp": 1,
        "size": 1
      },
      "tiers": [
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 3",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "Claws",
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
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Underdeveloped Claws",
          "type": "Passive",
          "description": "This Unit cannot gain Burrowed Status ."
        }
      ],
      "phaseAbilities": {},
      "upgrades": {}
    },
    {
      "id": "zerg-swarmling-zergling",
      "name": "Swarmling (Zergling)",
      "family": "Zergling",
      "variantOrder": 1,
      "role": "Core",
      "unique": false,
      "tags": [
        "Biological",
        "Light",
        "Ground"
      ],
      "stats": {
        "shield": "-",
        "speed": "4/8",
        "evade": "5+",
        "armour": "6+",
        "hp": 1,
        "size": 1
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 270,
          "models": "7 - 18",
          "supply": 1
        },
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 6",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "Claws",
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
            "name": "Zergling Reconstitution",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n Resolve the RESPAWN (2) effect, or RESPAWN (3) if the Unit is ON CREEP ."
          }
        ],
        "Assault Phase": [
          {
            "name": "Metabolic Boost",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit’s Speed characteristic."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (1) 5+ effect."
          }
        ]
      },
      "upgrades": {
        "Movement Phase": [
          {
            "name": "Burrow Ambush",
            "type": "Passive (20)",
            "description": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends."
          }
        ]
      }
    },
    {
      "id": "zerg-vile-roach",
      "name": "Vile (Roach)",
      "family": "Roach",
      "variantOrder": 2,
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
        "evade": "5+",
        "armour": "3+",
        "hp": 4,
        "size": 2
      },
      "tiers": [
        {
          "tier": "T1",
          "cost": 200,
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
          "name": "Acid Saliva",
          "phase": "Assault",
          "range": "8",
          "target": "Ground",
          "roa": "4",
          "hit": "3+",
          "surge": "-",
          "sDie": "-",
          "damage": "1",
          "keywords": []
        },
        {
          "name": "Vile Claws",
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
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Debilitating Saliva",
          "type": "Reaction (1 Biomass)",
          "description": "Reaction\n(1 Biomass)\n\n Use when an Enemy Unit Within 8\" of this Unit declares a Ranged Attack . Apply DEBUFF Hit (1) to each of that Unit's Ranged Weapons."
        },
        {
          "phase": "Any Phase",
          "name": "Burrow",
          "type": "Active (2 Biomass)",
          "description": "Active\n(2 Biomass)\n\n If this Unit is Unengaged , it gains or loses the Burrowed Status ."
        }
      ],
      "phaseAbilities": {
        "Assault Phase": [
          {
            "name": "Regeneration",
            "type": "Passive",
            "description": "When this Unit becomes Activated, if it has the Burrowed Status , resolve the HEAL (2) effect."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (1) 4+ effect."
          }
        ]
      },
      "upgrades": {
        "Movement Phase": [
          {
            "name": "Burrow Ambush",
            "type": "Passive (20)",
            "description": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends."
          },
          {
            "name": "Glial Reconstitution",
            "type": "Active (20)",
            "description": "Active\n(1 Biomass)\n\n This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP ."
          }
        ],
        "Assault Phase": [
          {
            "name": "Hydriodic Bile",
            "type": "Passive (10)",
            "description": "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice : D3+1."
          }
        ],
        "Any Phase": [
          {
            "name": "Tunneling Claws",
            "type": "Passive (10)",
            "description": "While this Unit has the Burrowed Status , it may perform the Move and Run actions without losing that Status . It may also move through other Units ’ bases ."
          }
        ]
      }
    },
    {
      "id": "zerg-zergling",
      "name": "Zergling",
      "family": "Zergling",
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
        "speed": "4/8",
        "evade": "4+",
        "armour": "6+",
        "hp": 1,
        "size": 1
      },
      "tiers": [
        {
          "tier": "T2",
          "cost": 220,
          "models": "13 - 18",
          "supply": 2
        },
        {
          "tier": "T1",
          "cost": 180,
          "models": "7 - 12",
          "supply": 1
        },
        {
          "tier": "T0",
          "cost": null,
          "models": "1 - 6",
          "supply": 0
        }
      ],
      "weapons": [
        {
          "name": "Claws",
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
          "name": "Squadron",
          "type": "Passive",
          "description": "This Unit’s Horizontal Coherency is 4\"."
        }
      ],
      "phaseAbilities": {
        "Assault Phase": [
          {
            "name": "Metabolic Boost",
            "type": "Active (1 Biomass)",
            "description": "Active\n(1 Biomass)\n\n When determining Charge Distance for this Unit, roll 2D6 instead of D6 and use the higher result to add to the Unit’s Speed characteristic."
          },
          {
            "name": "Devastating Charge",
            "type": "Passive",
            "description": "Immediately after this Unit completes a successful Charge , resolve the IMPACT (1) 5+ effect."
          }
        ]
      },
      "upgrades": {
        "Combat Phase": [
          {
            "name": "Adrenal Glands",
            "type": "Passive (30)",
            "description": "This Unit’s Claws and Shredding Claws weapons gain PRECISION (2)."
          },
          {
            "name": "Shredding Claws",
            "type": "Weapon (20)",
            "description": "FOR Claws. RNG E. TGT Ground. RoA 2. Hit 4+. Surge Light, Armoured. S.Die D3. Dmg 1"
          }
        ],
        "Movement Phase": [
          {
            "name": "Burrow Ambush",
            "type": "Passive",
            "description": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends."
          }
        ]
      }
    }
  ],
  "tacticalCards": [
    {
      "id": "spawning-pool",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Spawning Pool",
      "gasCost": 25,
      "sourceRefs": [
        "SRC-ZERG",
        "card:spawning-pool"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-spawning-pool-feral-rage"
      ],
      "abilities": [
        {
          "phase": "Combat Phase",
          "name": "Feral Rage",
          "type": "Active",
          "description": "The active Unit’s first Close Combat Weapon used gains PRECISION (2)."
        }
      ],
      "cost": 25,
      "resource": "+1 BM",
      "slots": {
        "core": 1
      }
    },
    {
      "id": "spawning-pool-six",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Spawning Pool (Six Pool)",
      "gasCost": 40,
      "sourceRefs": [
        "SRC-ZERG",
        "card:spawning-pool-six-pool"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 2,
      "additionalSlots": {
        "core": 2
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-spawning-pool-six-pool-timing-push",
        "zerg-spawning-pool-six-pool-feral-rage"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Timing Push",
          "type": "Active",
          "description": "The active Zergling Unit Deploys from any table edge that is not a Player’s Entry Edge . This action must end more than 10\" away from any Enemy model."
        },
        {
          "phase": "Combat Phase",
          "name": "Feral Rage",
          "type": "Active",
          "description": "The active Unit’s first Close Combat Weapon used gains PRECISION (2)."
        }
      ],
      "cost": 40,
      "resource": "+2 BM",
      "slots": {
        "core": 2
      }
    },
    {
      "id": "roach-warren",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Roach Warren",
      "gasCost": 25,
      "sourceRefs": [
        "SRC-ZERG",
        "card:roach-warren"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-roach-warren-nasty-surprise"
      ],
      "abilities": [
        {
          "phase": "Assault Phase",
          "name": "Nasty Surprise",
          "type": "Active",
          "description": "The active Ground Unit loses the Burrowed Status ."
        }
      ],
      "cost": 25,
      "resource": "+1 BM",
      "slots": {
        "core": 1
      }
    },
    {
      "id": "hydralisk-den",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Hydralisk Den",
      "gasCost": 35,
      "sourceRefs": [
        "SRC-ZERG",
        "card:hydralisk-den"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 2
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-hydralisk-den-missile-attacks"
      ],
      "abilities": [
        {
          "phase": "Assault Phase",
          "name": "Missile Attacks",
          "type": "Active",
          "description": "The active Unit’s first Ranged Weapon used gains PRECISION (1)."
        }
      ],
      "cost": 35,
      "resource": "+1 BM",
      "slots": {
        "elite": 2
      }
    },
    {
      "id": "evolution-chamber",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Evolution Chamber",
      "gasCost": 30,
      "sourceRefs": [
        "SRC-ZERG",
        "card:evolution-chamber"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-evolution-chamber-carapace",
        "zerg-evolution-chamber-extended-claws"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Carapace",
          "type": "Reaction",
          "description": "Use before a Friendly Unit makes an Armour Roll. That Unit gains TOUGH (1) for this roll."
        },
        {
          "phase": "Assault Phase",
          "name": "Extended Claws",
          "type": "Active",
          "description": "The active Unit gains a +1 Modifier to all IMPACT Hit Rolls."
        }
      ],
      "cost": 30,
      "resource": "+1 BM",
      "slots": {
        "core": 1
      }
    },
    {
      "id": "hatchery",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Hatchery",
      "gasCost": 30,
      "sourceRefs": [
        "SRC-ZERG",
        "card:hatchery"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "support": 1
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-hatchery-lie-in-wait",
        "zerg-hatchery-creep-spread"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Lie in Wait",
          "type": "Active",
          "description": "The active, Unengaged Ground Unit gains the Burrowed Status ."
        },
        {
          "phase": "Movement Phase",
          "name": "Creep Spread",
          "type": "Active",
          "description": "Place a Creep Tumor token on the battlefield Within 6\" ( Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token."
        }
      ],
      "cost": 30,
      "resource": "+1 BM",
      "slots": {
        "support": 1
      }
    },
    {
      "id": "lair",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Lair",
      "gasCost": 35,
      "sourceRefs": [
        "SRC-ZERG",
        "card:lair"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "elite": 1,
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-lair-predation",
        "zerg-lair-creep-spread"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Predation",
          "type": "Active",
          "description": "The active Unit’s Close Combat Weapons gain INSTANT ."
        },
        {
          "phase": "Movement Phase",
          "name": "Creep Spread",
          "type": "Active",
          "description": "Place a Creep Tumor token on the battlefield Within 6\" ( Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token."
        }
      ],
      "cost": 35,
      "resource": "+1 BM",
      "slots": {
        "elite": 1,
        "core": 1
      }
    },
    {
      "id": "overseer",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Overseer",
      "gasCost": 25,
      "sourceRefs": [
        "SRC-ZERG",
        "card:overseer"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "support": 1
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-overseer-oversight-mode",
        "zerg-overseer-pneumatized-carapace"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Oversight Mode",
          "type": "Active",
          "description": "Place a Faction Indicator anywhere on the battlefield. While Enemy Units are Within 6\" of this Faction Indicator, they lose HIDDEN ."
        },
        {
          "phase": "Assault Phase",
          "name": "Pneumatized Carapace",
          "type": "Reaction",
          "description": "Use after a Friendly Unit rolls a D6 for Charge Distance. Roll an additional D6 and use the higher result to calculate the total Charge Distance."
        }
      ],
      "cost": 25,
      "resource": "+1 BM",
      "slots": {
        "support": 1
      }
    },
    {
      "id": "overlord",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Overlord",
      "gasCost": 45,
      "sourceRefs": [
        "SRC-ZERG",
        "card:overlord"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": "BM",
      "resourceValue": 1,
      "additionalSlots": {
        "hero": 1,
        "elite": 1,
        "core": 1
      },
      "preserveName": true,
      "abilityIds": [
        "zerg-overlord-ventral-sacs",
        "zerg-overlord-excrete-creep"
      ],
      "abilities": [
        {
          "phase": "Movement Phase",
          "name": "Ventral Sacs",
          "type": "Active",
          "description": "Place a Faction Indicator anywhere on the battlefield more than 10\" away from any Enemy model. At the End of the Round, the controlling player may Deploy one Ground Unit from Reserves in base-to-base contact with this Faction Indicator."
        },
        {
          "phase": "Assault Phase",
          "name": "Excrete Creep",
          "type": "Active",
          "description": "Place a Creep Tumor token on the battlefield Within 6\" ( Line of Sight is not required) of either a Friendly Entry Edge or an existing Friendly Creep Tumor token."
        }
      ],
      "cost": 45,
      "resource": "+1 BM",
      "slots": {
        "hero": 1,
        "elite": 1,
        "core": 1
      }
    },
    {
      "id": "accelerating-creep",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Accelerating Creep",
      "gasCost": 0,
      "sourceRefs": [
        "SRC-ZERG",
        "card:accelerating-creep"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": null,
      "resourceValue": null,
      "additionalSlots": {},
      "preserveName": true,
      "abilityIds": [
        "zerg-accelerating-creep-speed-on-creep",
        "zerg-accelerating-creep-living-glob-of-tissue",
        "zerg-accelerating-creep-creep-removal"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Speed on Creep",
          "type": "Passive",
          "description": "If the active Friendly Zerg Unit is ON CREEP , increase its Speed characteristic by 1."
        },
        {
          "phase": "Any Phase",
          "name": "Living Glob of Tissue",
          "type": "Passive",
          "description": "Creep Tumor tokens have STAY IN PLAY and DISPLACEMENT ."
        },
        {
          "phase": "Any Phase",
          "name": "Creep Removal",
          "type": "Passive",
          "description": "If an Enemy Unit ends a Move , Deploy , Run, Charge or Disengage action Within 1\" of a Friendly Creep Tumor token, remove that token from the battlefield."
        }
      ],
      "cost": 0,
      "resource": null,
      "slots": {}
    },
    {
      "id": "malignant-creep",
      "faction": "Zerg",
      "factionTags": [
        "Zerg"
      ],
      "name": "Malignant Creep",
      "gasCost": 10,
      "sourceRefs": [
        "SRC-ZERG",
        "card:malignant-creep"
      ],
      "notes": "Generated from faction-expanded tactical-card abilities.",
      "resourceType": null,
      "resourceValue": null,
      "additionalSlots": {},
      "preserveName": true,
      "abilityIds": [
        "zerg-malignant-creep-living-glob-of-tissue",
        "zerg-malignant-creep-creep-removal",
        "zerg-malignant-creep-malevolent-matriarch"
      ],
      "abilities": [
        {
          "phase": "Any Phase",
          "name": "Living Glob of Tissue",
          "type": "Passive",
          "description": "Creep Tumor tokens have STAY IN PLAY and DISPLACEMENT ."
        },
        {
          "phase": "Any Phase",
          "name": "Creep Removal",
          "type": "Passive",
          "description": "If an Enemy Unit ends a Move , Deploy , Run, Charge or Disengage action Within 1\" of a Friendly Creep Tumor token, remove that token from the battlefield."
        },
        {
          "phase": "Assault Phase",
          "name": "Malevolent Matriarch",
          "type": "Passive",
          "description": "If the active Friendly Zerg Unit declares a Charge action while ON CREEP , it gains +1 Modifier to IMPACT Hit Rolls."
        }
      ],
      "cost": 10,
      "resource": null,
      "slots": {}
    }
  ],
  "upgrades": [
    {
      "id": "zerg-corpser-roach-burrow-ambush",
      "unitId": "zerg-corpser-roach",
      "name": "Burrow Ambush",
      "phase": "Any Phase",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:corpser-roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-corpser-roach-glial-reconstitution",
      "unitId": "zerg-corpser-roach",
      "name": "Glial Reconstitution",
      "phase": "Any Phase",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:corpser-roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-corpser-roach-hydriodic-bile",
      "unitId": "zerg-corpser-roach",
      "name": "Hydriodic Bile",
      "phase": "Any Phase",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "text": "Upgrade cost and availability sourced from Part 12 quick reference.",
      "keywordIds": [],
      "sourceRefs": [
        "PART-12.10",
        "card:corpser-roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-corpser-roach-tunneling-claws",
      "unitId": "zerg-corpser-roach",
      "name": "Tunneling Claws",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "text": "While this Unit has the Burrowed Status , it may perform the Move and Run actions without losing that Status . It may also move through other Units ’ bases .",
      "keywordIds": [
        "burrowed",
        "status",
        "move",
        "units",
        "bases"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:corpser-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-zergling-adrenal-glands",
      "unitId": "zerg-zergling",
      "name": "Adrenal Glands",
      "type": "-",
      "cost": "30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:zergling"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-zergling-burrow-ambush",
      "unitId": "zerg-zergling",
      "name": "Burrow Ambush",
      "type": "-",
      "cost": "20/30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:zergling"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-zergling-shredding-claws",
      "unitId": "zerg-zergling",
      "name": "Shredding Claws",
      "type": "↑ Claws",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": "Claws",
      "sourceRefs": [
        "PART-12.10",
        "card:zergling"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-raptor-zergling-adrenal-glands",
      "unitId": "zerg-raptor-zergling",
      "name": "Adrenal Glands",
      "type": "-",
      "cost": "30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:raptor-zergling"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-raptor-zergling-burrow-ambush",
      "unitId": "zerg-raptor-zergling",
      "name": "Burrow Ambush",
      "type": "-",
      "cost": "20/30",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:raptor-zergling"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-raptor-zergling-shredding-claws",
      "unitId": "zerg-raptor-zergling",
      "name": "Shredding Claws",
      "type": "↑ Claws",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": "Claws",
      "sourceRefs": [
        "PART-12.10",
        "card:raptor-zergling"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-swarmling-zergling-burrow-ambush",
      "unitId": "zerg-swarmling-zergling",
      "name": "Burrow Ambush",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:swarmling-zergling"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-roach-burrow-ambush",
      "unitId": "zerg-roach",
      "name": "Burrow Ambush",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-roach-glial-reconstitution",
      "unitId": "zerg-roach",
      "name": "Glial Reconstitution",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-roach-hydriodic-bile",
      "unitId": "zerg-roach",
      "name": "Hydriodic Bile",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-roach-tunneling-claws",
      "unitId": "zerg-roach",
      "name": "Tunneling Claws",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-vile-roach-burrow-ambush",
      "unitId": "zerg-vile-roach",
      "name": "Burrow Ambush",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:vile-roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-vile-roach-glial-reconstitution",
      "unitId": "zerg-vile-roach",
      "name": "Glial Reconstitution",
      "type": "-",
      "cost": "20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:vile-roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-vile-roach-hydriodic-bile",
      "unitId": "zerg-vile-roach",
      "name": "Hydriodic Bile",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:vile-roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-vile-roach-tunneling-claws",
      "unitId": "zerg-vile-roach",
      "name": "Tunneling Claws",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:vile-roach"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-hydralisk-ancillary-carapace",
      "unitId": "zerg-hydralisk",
      "name": "Ancillary Carapace",
      "type": "-",
      "cost": "20/40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:hydralisk"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-hydralisk-burrow-ambush",
      "unitId": "zerg-hydralisk",
      "name": "Burrow Ambush",
      "type": "-",
      "cost": "20/40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:hydralisk"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-hydralisk-grooved-spines",
      "unitId": "zerg-hydralisk",
      "name": "Grooved Spines",
      "type": "-",
      "cost": "20/40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:hydralisk"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-hydralisk-lurking",
      "unitId": "zerg-hydralisk",
      "name": "Lurking",
      "type": "-",
      "cost": "10/20",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:hydralisk"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-queen-creep-speed",
      "unitId": "zerg-queen",
      "name": "Creep Speed",
      "type": "-",
      "cost": "10",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:queen"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-queen-domineering-presence",
      "unitId": "zerg-queen",
      "name": "Domineering Presence",
      "type": "-",
      "cost": "40",
      "specialist": false,
      "replacesWeapon": null,
      "sourceRefs": [
        "PART-12.10",
        "card:queen"
      ],
      "notes": "Generated from Part 12 quick-reference upgrade costs."
    },
    {
      "id": "zerg-corpser-roach-burrow-ambush",
      "unitId": "zerg-corpser-roach",
      "name": "Burrow Ambush",
      "phase": "Movement Phase",
      "type": "Passive",
      "cost": "20",
      "text": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
      "keywordIds": [
        "deploy",
        "reserves",
        "place",
        "controlling-player",
        "entry-edge",
        "within",
        "enemy"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:corpser-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-corpser-roach-glial-reconstitution",
      "unitId": "zerg-corpser-roach",
      "name": "Glial Reconstitution",
      "phase": "Movement Phase",
      "type": "Active",
      "cost": "20",
      "text": "Active\n(1 Biomass)\n\n This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP .",
      "keywordIds": [
        "buff",
        "on-creep"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:corpser-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-corpser-roach-hydriodic-bile",
      "unitId": "zerg-corpser-roach",
      "name": "Hydriodic Bile",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "10",
      "text": "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice : D3+1.",
      "keywordIds": [
        "dice"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:corpser-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-hydralisk-ancillary-carapace",
      "unitId": "zerg-hydralisk",
      "name": "Ancillary Carapace",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "20/40",
      "text": "This Unit gains TOUGH (1) on the first Armour Roll of each Activation.",
      "keywordIds": [
        "tough"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:hydralisk"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-hydralisk-lurking",
      "unitId": "zerg-hydralisk",
      "name": "Lurking",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "10/20",
      "text": "If this Unit has Stationary Status , it is eligible to make an Evade Roll against the first Ranged Attack targeting it this Round. If this Unit is ON CREEP , it gains +1 Modifier to this Evade Roll.",
      "keywordIds": [
        "stationary",
        "status",
        "ranged-attack",
        "on-creep",
        "modifier"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:hydralisk"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-hydralisk-burrow-ambush",
      "unitId": "zerg-hydralisk",
      "name": "Burrow Ambush",
      "phase": "Movement Phase",
      "type": "Passive",
      "cost": "20/40",
      "text": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
      "keywordIds": [
        "deploy",
        "reserves",
        "place",
        "controlling-player",
        "entry-edge",
        "within",
        "enemy"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:hydralisk"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-hydralisk-grooved-spines",
      "unitId": "zerg-hydralisk",
      "name": "Grooved Spines",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "20/40",
      "text": "This Unit's Needle Spines ranged weapon gains LONG RANGE (16\").",
      "keywordIds": [
        "long-range"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:hydralisk"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-queen-creep-speed",
      "unitId": "zerg-queen",
      "name": "Creep Speed",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "10",
      "text": "While this Unit is ON CREEP , increase this Unit's Speed characteristic by 2.",
      "keywordIds": [
        "on-creep"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:queen"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-queen-domineering-presence",
      "unitId": "zerg-queen",
      "name": "Domineering Presence",
      "phase": "Movement Phase",
      "type": "Active",
      "cost": "10",
      "text": "Active\n(1 Biomass)\n\n Select another Friendly Unit Within 6\" ( Line of Sight is not required). That Unit’s Supply characteristic is increased by 1 for Controlling and Contesting Mission Markers and completing objectives.",
      "keywordIds": [
        "friendly",
        "within",
        "line-of-sight",
        "mission-markers"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:queen"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-raptor-zergling-burrow-ambush",
      "unitId": "zerg-raptor-zergling",
      "name": "Burrow Ambush",
      "phase": "Movement Phase",
      "type": "Passive",
      "cost": "20/30",
      "text": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
      "keywordIds": [
        "deploy",
        "reserves",
        "place",
        "controlling-player",
        "entry-edge",
        "within",
        "enemy"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:raptor-zergling"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-raptor-zergling-shredding-claws",
      "unitId": "zerg-raptor-zergling",
      "name": "Shredding Claws",
      "phase": "Combat Phase",
      "type": "Weapon",
      "cost": "20",
      "replacesWeapon": "Claws",
      "text": "FOR Claws. RNG E. TGT Ground. RoA 2. Hit 4+. Surge Light, Armoured. S.Die D3. Dmg 1",
      "keywordIds": [],
      "weaponProfile": {
        "range": "E",
        "target": "Ground",
        "roa": 2,
        "hit": "4+",
        "surgeType": "Light, Armoured",
        "surgeDice": "D3",
        "damage": 1,
        "rulesText": "FOR Claws",
        "keywordIds": []
      },
      "sourceRefs": [
        "SRC-ZERG",
        "card:raptor-zergling"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table."
    },
    {
      "id": "zerg-raptor-zergling-adrenal-glands",
      "unitId": "zerg-raptor-zergling",
      "name": "Adrenal Glands",
      "phase": "Combat Phase",
      "type": "Passive",
      "cost": "30",
      "text": "This Unit’s Claws and Shredding Claws weapons gain PRECISION (2).",
      "keywordIds": [
        "precision"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:raptor-zergling"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-roach-tunneling-claws",
      "unitId": "zerg-roach",
      "name": "Tunneling Claws",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "10",
      "text": "While this Unit has the Burrowed Status , it may perform the Move and Run actions without losing that Status . It may also move through other Units ’ bases .",
      "keywordIds": [
        "burrowed",
        "status",
        "move",
        "units",
        "bases"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-roach-burrow-ambush",
      "unitId": "zerg-roach",
      "name": "Burrow Ambush",
      "phase": "Movement Phase",
      "type": "Passive",
      "cost": "20",
      "text": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
      "keywordIds": [
        "deploy",
        "reserves",
        "place",
        "controlling-player",
        "entry-edge",
        "within",
        "enemy"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-roach-glial-reconstitution",
      "unitId": "zerg-roach",
      "name": "Glial Reconstitution",
      "phase": "Movement Phase",
      "type": "Active",
      "cost": "20",
      "text": "Active\n(1 Biomass)\n\n This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP .",
      "keywordIds": [
        "buff",
        "on-creep"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-roach-hydriodic-bile",
      "unitId": "zerg-roach",
      "name": "Hydriodic Bile",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "10",
      "text": "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice : D3+1.",
      "keywordIds": [
        "dice"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-swarmling-zergling-burrow-ambush",
      "unitId": "zerg-swarmling-zergling",
      "name": "Burrow Ambush",
      "phase": "Movement Phase",
      "type": "Passive",
      "cost": "20",
      "text": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
      "keywordIds": [
        "deploy",
        "reserves",
        "place",
        "controlling-player",
        "entry-edge",
        "within",
        "enemy"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:swarmling-zergling"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-vile-roach-tunneling-claws",
      "unitId": "zerg-vile-roach",
      "name": "Tunneling Claws",
      "phase": "Any Phase",
      "type": "Passive",
      "cost": "10",
      "text": "While this Unit has the Burrowed Status , it may perform the Move and Run actions without losing that Status . It may also move through other Units ’ bases .",
      "keywordIds": [
        "burrowed",
        "status",
        "move",
        "units",
        "bases"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:vile-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-vile-roach-burrow-ambush",
      "unitId": "zerg-vile-roach",
      "name": "Burrow Ambush",
      "phase": "Movement Phase",
      "type": "Passive",
      "cost": "20",
      "text": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
      "keywordIds": [
        "deploy",
        "reserves",
        "place",
        "controlling-player",
        "entry-edge",
        "within",
        "enemy"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:vile-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-vile-roach-glial-reconstitution",
      "unitId": "zerg-vile-roach",
      "name": "Glial Reconstitution",
      "phase": "Movement Phase",
      "type": "Active",
      "cost": "20",
      "text": "Active\n(1 Biomass)\n\n This Unit gains BUFF SPEED (1), or BUFF SPEED (2) if the Unit is ON CREEP .",
      "keywordIds": [
        "buff",
        "on-creep"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:vile-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-vile-roach-hydriodic-bile",
      "unitId": "zerg-vile-roach",
      "name": "Hydriodic Bile",
      "phase": "Assault Phase",
      "type": "Passive",
      "cost": "10",
      "text": "This Unit's Acid Saliva weapon gains Surge Type: Light, and S Dice : D3+1.",
      "keywordIds": [
        "dice"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:vile-roach"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-zergling-burrow-ambush",
      "unitId": "zerg-zergling",
      "name": "Burrow Ambush",
      "phase": "Movement Phase",
      "type": "Passive",
      "cost": "20/30",
      "text": "When this Unit is nominated to deploy from the Reserves , it may resolve the PLACE (18) effect from the controlling player 's Entry Edge . No model may be set Within 10\" of any Enemy model. This Unit's Activation ends.",
      "keywordIds": [
        "deploy",
        "reserves",
        "place",
        "controlling-player",
        "entry-edge",
        "within",
        "enemy"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:zergling"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    },
    {
      "id": "zerg-zergling-shredding-claws",
      "unitId": "zerg-zergling",
      "name": "Shredding Claws",
      "phase": "Combat Phase",
      "type": "Weapon",
      "cost": "20",
      "replacesWeapon": "Claws",
      "text": "FOR Claws. RNG E. TGT Ground. RoA 2. Hit 4+. Surge Light, Armoured. S.Die D3. Dmg 1",
      "keywordIds": [],
      "weaponProfile": {
        "range": "E",
        "target": "Ground",
        "roa": 2,
        "hit": "4+",
        "surgeType": "Light, Armoured",
        "surgeDice": "D3",
        "damage": 1,
        "rulesText": "FOR Claws",
        "keywordIds": []
      },
      "sourceRefs": [
        "SRC-ZERG",
        "card:zergling"
      ],
      "notes": "Generated from faction-expanded upgrade weapon table."
    },
    {
      "id": "zerg-zergling-adrenal-glands",
      "unitId": "zerg-zergling",
      "name": "Adrenal Glands",
      "phase": "Combat Phase",
      "type": "Passive",
      "cost": "30",
      "text": "This Unit’s Claws and Shredding Claws weapons gain PRECISION (2).",
      "keywordIds": [
        "precision"
      ],
      "sourceRefs": [
        "SRC-ZERG",
        "card:zergling"
      ],
      "notes": "Generated from faction-expanded upgrade text."
    }
  ],
  "counts": {
    "factionCards": 2,
    "units": 12,
    "weapons": 18,
    "abilities": 72,
    "tacticalCards": 11,
    "upgrades": 49
  },
  "status": {
    "active": true,
    "mode": "shared-runtime-legacy-adapter"
  }
};
window.__starcraftTMGRuntimeStatus = {"active":true,"mode":"shared-runtime-legacy-adapter"};
window.__starcraftTMGRuntimeFaction = "zerg";
