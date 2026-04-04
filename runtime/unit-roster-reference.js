export const UNIT_ROSTER_REFERENCE = {
  "terran": [
    {
      "id": "marine",
      "name": "Marine",
      "compositionOptions": [
        {
          "models": "6",
          "mineralCost": 160,
          "supplyValue": 1
        },
        {
          "models": "9",
          "mineralCost": 210,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": [
        {
          "id": "agg-12",
          "name": "AGG-12",
          "type": "SPECIALIST , \n ↑ FOR C-14 Rifle",
          "costs": [
            {
              "bracket": "(6- Models )",
              "cost": 10
            },
            {
              "bracket": "(9- Models )",
              "cost": 10
            }
          ]
        },
        {
          "id": "bayonet",
          "name": "Bayonet",
          "type": "-",
          "costs": [
            {
              "bracket": "(6- Models )",
              "cost": 20
            },
            {
              "bracket": "(9- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "combat-shield",
          "name": "Combat Shield",
          "type": "-",
          "costs": [
            {
              "bracket": "(6- Models )",
              "cost": 20
            },
            {
              "bracket": "(9- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "grenades-frag",
          "name": "Grenades - Frag",
          "type": "-",
          "costs": [
            {
              "bracket": "(6- Models )",
              "cost": 10
            },
            {
              "bracket": "(9- Models )",
              "cost": 10
            }
          ]
        },
        {
          "id": "rocket-launcher",
          "name": "Rocket Launcher",
          "type": "SPECIALIST",
          "costs": [
            {
              "bracket": "(6- Models )",
              "cost": 40
            },
            {
              "bracket": "(9- Models )",
              "cost": 40
            }
          ]
        },
        {
          "id": "slugthrower",
          "name": "Slugthrower",
          "type": "-",
          "costs": [
            {
              "bracket": "(6- Models )",
              "cost": 10
            },
            {
              "bracket": "(9- Models )",
              "cost": 20
            }
          ]
        }
      ]
    },
    {
      "id": "raynor-s-raider-marine",
      "name": "Raynor’s Raider (Marine)",
      "compositionOptions": [
        {
          "models": "6",
          "mineralCost": 230,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": []
    },
    {
      "id": "marauder",
      "name": "Marauder",
      "compositionOptions": [
        {
          "models": "2",
          "mineralCost": 150,
          "supplyValue": 1
        },
        {
          "models": "4",
          "mineralCost": 280,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": [
        {
          "id": "kinetic-foam",
          "name": "Kinetic Foam",
          "type": "-",
          "costs": [
            {
              "bracket": "(2- Models )",
              "cost": 20
            },
            {
              "bracket": "(4- Models )",
              "cost": 40
            }
          ]
        },
        {
          "id": "laser-targeting-systems",
          "name": "Laser Targeting Systems",
          "type": "-",
          "costs": [
            {
              "bracket": "(2- Models )",
              "cost": 20
            },
            {
              "bracket": "(4- Models )",
              "cost": 40
            }
          ]
        },
        {
          "id": "veteran-of-tarsonis",
          "name": "Veteran of Tarsonis",
          "type": "-",
          "costs": [
            {
              "bracket": "(2- Models )",
              "cost": 20
            },
            {
              "bracket": "(4- Models )",
              "cost": 40
            }
          ]
        }
      ]
    },
    {
      "id": "medic",
      "name": "Medic",
      "compositionOptions": [
        {
          "models": "3",
          "mineralCost": 110,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "a-13-flash-grenade-launcher",
          "name": "A-13 Flash Grenade Launcher",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "advanced-medic-facilities",
          "name": "Advanced Medic Facilities",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 60
            }
          ]
        },
        {
          "id": "stabilizer-medpacks",
          "name": "Stabilizer Medpacks",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 30
            }
          ]
        }
      ]
    },
    {
      "id": "goliath",
      "name": "Goliath",
      "compositionOptions": [
        {
          "models": "1",
          "mineralCost": 190,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": [
        {
          "id": "ares-class-targeting-system",
          "name": "Ares-Class Targeting System",
          "type": "-",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 20
            }
          ]
        },
        {
          "id": "haywire-missiles",
          "name": "Haywire Missiles",
          "type": "↑ Hellfire Missiles",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 40
            }
          ]
        },
        {
          "id": "scatter-missiles",
          "name": "Scatter Missiles",
          "type": "↑ Hellfire Missiles",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 30
            }
          ]
        }
      ]
    },
    {
      "id": "jim-raynor",
      "name": "Jim Raynor",
      "compositionOptions": [
        {
          "models": "1",
          "mineralCost": 230,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "c-14-rifle",
          "name": "C-14 rifle",
          "type": "↑ Commando Rifle",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 0
            }
          ]
        }
      ]
    }
  ],
  "zerg": [
    {
      "id": "zergling",
      "name": "Zergling",
      "compositionOptions": [
        {
          "models": "12",
          "mineralCost": 180,
          "supplyValue": 1
        },
        {
          "models": "18",
          "mineralCost": 220,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": [
        {
          "id": "adrenal-glands",
          "name": "Adrenal Glands",
          "type": "-",
          "costs": [
            {
              "bracket": "(12- Models )",
              "cost": 30
            },
            {
              "bracket": "(18- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "burrow-ambush",
          "name": "Burrow Ambush",
          "type": "-",
          "costs": [
            {
              "bracket": "(12- Models )",
              "cost": 20
            },
            {
              "bracket": "(18- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "shredding-claws",
          "name": "Shredding Claws",
          "type": "↑ Claws",
          "costs": [
            {
              "bracket": "(12- Models )",
              "cost": 20
            },
            {
              "bracket": "(18- Models )",
              "cost": 20
            }
          ]
        }
      ]
    },
    {
      "id": "raptor-zergling",
      "name": "Raptor (Zergling)",
      "compositionOptions": [
        {
          "models": "12",
          "mineralCost": 240,
          "supplyValue": 1
        },
        {
          "models": "18",
          "mineralCost": 300,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": [
        {
          "id": "adrenal-glands",
          "name": "Adrenal Glands",
          "type": "-",
          "costs": [
            {
              "bracket": "(12- Models )",
              "cost": 30
            },
            {
              "bracket": "(18- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "burrow-ambush",
          "name": "Burrow Ambush",
          "type": "-",
          "costs": [
            {
              "bracket": "(12- Models )",
              "cost": 20
            },
            {
              "bracket": "(18- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "shredding-claws",
          "name": "Shredding Claws",
          "type": "↑ Claws",
          "costs": [
            {
              "bracket": "(12- Models )",
              "cost": 20
            },
            {
              "bracket": "(18- Models )",
              "cost": 20
            }
          ]
        }
      ]
    },
    {
      "id": "kerrigan-swarm-raptor-zergling",
      "name": "Kerrigan Swarm Raptor (Zergling)",
      "compositionOptions": [
        {
          "models": "6",
          "mineralCost": 250,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": []
    },
    {
      "id": "swarmling-zergling",
      "name": "Swarmling (Zergling)",
      "compositionOptions": [
        {
          "models": "18",
          "mineralCost": 270,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "burrow-ambush",
          "name": "Burrow Ambush",
          "type": "-",
          "costs": [
            {
              "bracket": "(18- Models )",
              "cost": 20
            }
          ]
        }
      ]
    },
    {
      "id": "roach",
      "name": "Roach",
      "compositionOptions": [
        {
          "models": "3",
          "mineralCost": 170,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "burrow-ambush",
          "name": "Burrow Ambush",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "glial-reconstitution",
          "name": "Glial Reconstitution",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "hydriodic-bile",
          "name": "Hydriodic Bile",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        },
        {
          "id": "tunneling-claws",
          "name": "Tunneling Claws",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        }
      ]
    },
    {
      "id": "vile-roach",
      "name": "Vile (Roach)",
      "compositionOptions": [
        {
          "models": "3",
          "mineralCost": 200,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "burrow-ambush",
          "name": "Burrow Ambush",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "glial-reconstitution",
          "name": "Glial Reconstitution",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "hydriodic-bile",
          "name": "Hydriodic Bile",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        },
        {
          "id": "tunneling-claws",
          "name": "Tunneling Claws",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        }
      ]
    },
    {
      "id": "corpser-roach",
      "name": "Corpser (Roach)",
      "compositionOptions": [
        {
          "models": "3",
          "mineralCost": 250,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "burrow-ambush",
          "name": "Burrow Ambush",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "glial-reconstitution",
          "name": "Glial Reconstitution",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "hydriodic-bile",
          "name": "Hydriodic Bile",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        },
        {
          "id": "tunneling-claws",
          "name": "Tunneling Claws",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        }
      ]
    },
    {
      "id": "hydralisk",
      "name": "Hydralisk",
      "compositionOptions": [
        {
          "models": "2",
          "mineralCost": 140,
          "supplyValue": 2
        },
        {
          "models": "4",
          "mineralCost": 260,
          "supplyValue": 3
        }
      ],
      "upgradeCosts": [
        {
          "id": "ancillary-carapace",
          "name": "Ancillary Carapace",
          "type": "-",
          "costs": [
            {
              "bracket": "(2- Models )",
              "cost": 20
            },
            {
              "bracket": "(4- Models )",
              "cost": 40
            }
          ]
        },
        {
          "id": "burrow-ambush",
          "name": "Burrow Ambush",
          "type": "-",
          "costs": [
            {
              "bracket": "(2- Models )",
              "cost": 20
            },
            {
              "bracket": "(4- Models )",
              "cost": 40
            }
          ]
        },
        {
          "id": "grooved-spines",
          "name": "Grooved Spines",
          "type": "-",
          "costs": [
            {
              "bracket": "(2- Models )",
              "cost": 20
            },
            {
              "bracket": "(4- Models )",
              "cost": 40
            }
          ]
        },
        {
          "id": "lurking",
          "name": "Lurking",
          "type": "-",
          "costs": [
            {
              "bracket": "(2- Models )",
              "cost": 10
            },
            {
              "bracket": "(4- Models )",
              "cost": 20
            }
          ]
        }
      ]
    },
    {
      "id": "queen",
      "name": "Queen",
      "compositionOptions": [
        {
          "models": "1",
          "mineralCost": 150,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "creep-speed",
          "name": "Creep Speed",
          "type": "-",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 10
            }
          ]
        },
        {
          "id": "domineering-presence",
          "name": "Domineering Presence",
          "type": "-",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 40
            }
          ]
        }
      ]
    },
    {
      "id": "kerrigan",
      "name": "Kerrigan",
      "compositionOptions": [
        {
          "models": "1",
          "mineralCost": 250,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": []
    }
  ],
  "protoss": [
    {
      "id": "zealot",
      "name": "Zealot",
      "compositionOptions": [
        {
          "models": "3",
          "mineralCost": 160,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": [
        {
          "id": "leg-enhancements",
          "name": "Leg Enhancements",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "my-life-for-aiur",
          "name": "My Life for Aiur",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        },
        {
          "id": "we-stand-as-one",
          "name": "We Stand as One",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "zealous-round",
          "name": "Zealous Round",
          "type": "-",
          "costs": [
            {
              "bracket": "(3- Models )",
              "cost": 10
            }
          ]
        }
      ]
    },
    {
      "id": "praetor-guard-zealot",
      "name": "Praetor Guard (Zealot)",
      "compositionOptions": [
        {
          "models": "3",
          "mineralCost": 280,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": []
    },
    {
      "id": "adept",
      "name": "Adept",
      "compositionOptions": [
        {
          "models": "4",
          "mineralCost": 150,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "glaive-strike",
          "name": "Glaive Strike",
          "type": "↑ Strike",
          "costs": [
            {
              "bracket": "(4- Models )",
              "cost": 20
            }
          ]
        },
        {
          "id": "guidance",
          "name": "Guidance",
          "type": "-",
          "costs": [
            {
              "bracket": "(4- Models )",
              "cost": 10
            }
          ]
        },
        {
          "id": "resonating-glaives",
          "name": "Resonating Glaives",
          "type": "-",
          "costs": [
            {
              "bracket": "(4- Models )",
              "cost": 20
            }
          ]
        }
      ]
    },
    {
      "id": "sentry",
      "name": "Sentry",
      "compositionOptions": [
        {
          "models": "2",
          "mineralCost": 130,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": [
        {
          "id": "hallucination",
          "name": "Hallucination",
          "type": "-",
          "costs": [
            {
              "bracket": "(4- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "solid-field-projectors",
          "name": "Solid-Field Projectors",
          "type": "-",
          "costs": [
            {
              "bracket": "(4- Models )",
              "cost": 20
            }
          ]
        }
      ]
    },
    {
      "id": "stalker",
      "name": "Stalker",
      "compositionOptions": [
        {
          "models": "1",
          "mineralCost": 160,
          "supplyValue": 1
        },
        {
          "models": "2",
          "mineralCost": 260,
          "supplyValue": 2
        }
      ],
      "upgradeCosts": [
        {
          "id": "fury-of-the-nerazim",
          "name": "Fury of the Nerazim",
          "type": "-",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 20
            },
            {
              "bracket": "(2- Models )",
              "cost": 30
            }
          ]
        },
        {
          "id": "path-of-shadows",
          "name": "Path of Shadows",
          "type": "-",
          "costs": [
            {
              "bracket": "(1-Model)",
              "cost": 20
            },
            {
              "bracket": "(2- Models )",
              "cost": 40
            }
          ]
        }
      ]
    },
    {
      "id": "artanis",
      "name": "Artanis",
      "compositionOptions": [
        {
          "models": "1",
          "mineralCost": 250,
          "supplyValue": 1
        }
      ],
      "upgradeCosts": []
    }
  ]
};

export const UNIT_ROSTER_REFERENCE_NOTES = {
  purpose: 'Canonical Part 12 mustering layer for composition options and upgrade costs.',
  status: 'generated-from-rules',
  source: 'source-references/generated/part12_units_and_upgrades.json',
};
