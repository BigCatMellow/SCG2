export const GENERATED_RULES_CONTENT = {
  "zerg": {
    "factionCards": [
      {
        "id": "zerg-kerrigan-s-swarm",
        "faction": "Zerg",
        "name": "Kerrigan's Swarm",
        "unique": true,
        "factionTags": [
          "Zerg",
          "Kerrigan's Swarm"
        ],
        "resourceType": "BM",
        "resourceValue": 1,
        "startingSlots": {
          "hero": 1,
          "elite": 2,
          "core": 3
        },
        "sourceRefs": [
          "SRC-ZERG",
          "card:kerrigan-s-swarm"
        ],
        "notes": "Generated from faction-expanded source text."
      },
      {
        "id": "zerg-zerg-swarm",
        "faction": "Zerg",
        "name": "Zerg Swarm",
        "unique": true,
        "factionTags": [
          "Zerg",
          "Zerg Swarm"
        ],
        "resourceType": "BM",
        "resourceValue": 1,
        "startingSlots": {
          "elite": 1,
          "core": 3,
          "support": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "card:zerg-swarm"
        ],
        "notes": "Generated from faction-expanded source text."
      }
    ],
    "units": [
      {
        "id": "zerg-corpser-roach",
        "faction": "Zerg",
        "name": "Corpser (Roach)",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "5+",
          "armour": "3+",
          "hp": 4,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "2 - 3",
            "supply": 1,
            "mineralCost": 250
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 250,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-corpser-roach-burrow-ambush",
          "zerg-corpser-roach-glial-reconstitution",
          "zerg-corpser-roach-hydriodic-bile",
          "zerg-corpser-roach-tunneling-claws"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:corpser-roach"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-hydralisk",
        "faction": "Zerg",
        "name": "Hydralisk",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/8",
          "evade": "5+",
          "armour": "5+",
          "hp": 4,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": null
          },
          {
            "models": "2 - 2",
            "supply": 2,
            "mineralCost": 140
          },
          {
            "models": "3 - 4",
            "supply": 3,
            "mineralCost": 260
          }
        ],
        "mineralCost": 140,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-hydralisk-ancillary-carapace",
          "zerg-hydralisk-burrow-ambush",
          "zerg-hydralisk-grooved-spines",
          "zerg-hydralisk-lurking"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:hydralisk"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-kerrigan",
        "faction": "Zerg",
        "name": "Kerrigan",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "7",
          "evade": "6+",
          "armour": "5+",
          "hp": 9,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": 250
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 250,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:kerrigan"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-kerrigan-swarm-raptor-zergling",
        "faction": "Zerg",
        "name": "Kerrigan Swarm Raptor (Zergling)",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "5/9",
          "evade": "4+",
          "armour": "5+",
          "hp": 2,
          "size": 1
        },
        "supplyProfile": [
          {
            "models": "1 - 3",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "4 - 6",
            "supply": 1,
            "mineralCost": 250
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 250,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:kerrigan-swarm-raptor-zergling"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-omega-worm",
        "faction": "Zerg",
        "name": "Omega Worm",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "-",
          "evade": "-",
          "armour": "5+",
          "hp": 10,
          "size": 3
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": null,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:omega-worm"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-queen",
        "faction": "Zerg",
        "name": "Queen",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4",
          "evade": "-",
          "armour": "4+",
          "hp": 9,
          "size": 3
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": 150
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 150,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-queen-creep-speed",
          "zerg-queen-domineering-presence"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:queen"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-raptor-zergling",
        "faction": "Zerg",
        "name": "Raptor (Zergling)",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "5/9",
          "evade": "4+",
          "armour": "6+",
          "hp": 1,
          "size": 1
        },
        "supplyProfile": [
          {
            "models": "1 - 6",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "7 - 12",
            "supply": 1,
            "mineralCost": 240
          },
          {
            "models": "13 - 18",
            "supply": 2,
            "mineralCost": 300
          }
        ],
        "mineralCost": 240,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-raptor-zergling-adrenal-glands",
          "zerg-raptor-zergling-burrow-ambush",
          "zerg-raptor-zergling-shredding-claws"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:raptor-zergling"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-roach",
        "faction": "Zerg",
        "name": "Roach",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "5+",
          "armour": "3+",
          "hp": 4,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "2 - 3",
            "supply": 1,
            "mineralCost": 170
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 170,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-roach-burrow-ambush",
          "zerg-roach-glial-reconstitution",
          "zerg-roach-hydriodic-bile",
          "zerg-roach-tunneling-claws"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:roach"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-roachling",
        "faction": "Zerg",
        "name": "Roachling",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "6+",
          "armour": "6+",
          "hp": 1,
          "size": 1
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 3",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": null,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:roachling"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-swarmling-zergling",
        "faction": "Zerg",
        "name": "Swarmling (Zergling)",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/8",
          "evade": "5+",
          "armour": "6+",
          "hp": 1,
          "size": 1
        },
        "supplyProfile": [
          {
            "models": "1 - 6",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "7 - 18",
            "supply": 1,
            "mineralCost": 270
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 270,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-swarmling-zergling-burrow-ambush"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:swarmling-zergling"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-vile-roach",
        "faction": "Zerg",
        "name": "Vile (Roach)",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "5+",
          "armour": "3+",
          "hp": 4,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "2 - 3",
            "supply": 1,
            "mineralCost": 200
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 200,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-vile-roach-burrow-ambush",
          "zerg-vile-roach-glial-reconstitution",
          "zerg-vile-roach-hydriodic-bile",
          "zerg-vile-roach-tunneling-claws"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:vile-roach"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "zerg-zergling",
        "faction": "Zerg",
        "name": "Zergling",
        "factionTags": [
          "Zerg"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/8",
          "evade": "4+",
          "armour": "6+",
          "hp": 1,
          "size": 1
        },
        "supplyProfile": [
          {
            "models": "1 - 6",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "7 - 12",
            "supply": 1,
            "mineralCost": 180
          },
          {
            "models": "13 - 18",
            "supply": 2,
            "mineralCost": 220
          }
        ],
        "mineralCost": 180,
        "gasCost": 0,
        "upgradeRefs": [
          "zerg-zergling-adrenal-glands",
          "zerg-zergling-burrow-ambush",
          "zerg-zergling-shredding-claws"
        ],
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.10",
          "card:zergling"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      }
    ],
    "upgrades": [
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
        "id": "zerg-corpser-roach-burrow-ambush",
        "unitId": "zerg-corpser-roach",
        "name": "Burrow Ambush",
        "type": "-",
        "cost": "20",
        "specialist": false,
        "replacesWeapon": null,
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
        "type": "-",
        "cost": "20",
        "specialist": false,
        "replacesWeapon": null,
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
        "type": "-",
        "cost": "10",
        "specialist": false,
        "replacesWeapon": null,
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
        "type": "-",
        "cost": "10",
        "specialist": false,
        "replacesWeapon": null,
        "sourceRefs": [
          "PART-12.10",
          "card:corpser-roach"
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
      }
    ],
    "tacticalCards": [
      {
        "id": "zerg-accelerating-creep",
        "faction": "Zerg",
        "name": "Accelerating Creep",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 0,
        "resourceType": null,
        "resourceValue": null,
        "additionalSlots": {},
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:accelerating-creep"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-evolution-chamber",
        "faction": "Zerg",
        "name": "Evolution Chamber",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 30,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:evolution-chamber"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-hatchery",
        "faction": "Zerg",
        "name": "Hatchery",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 30,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "support": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:hatchery"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-hydralisk-den",
        "faction": "Zerg",
        "name": "Hydralisk Den",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 35,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 2
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:hydralisk-den"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-lair",
        "faction": "Zerg",
        "name": "Lair",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 35,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 1,
          "core": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:lair"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-malignant-creep",
        "faction": "Zerg",
        "name": "Malignant Creep",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 10,
        "resourceType": null,
        "resourceValue": null,
        "additionalSlots": {},
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:malignant-creep"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-overlord",
        "faction": "Zerg",
        "name": "Overlord",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 45,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "hero": 1,
          "elite": 1,
          "core": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:overlord"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-overseer",
        "faction": "Zerg",
        "name": "Overseer",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 25,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "support": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:overseer"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-roach-warren",
        "faction": "Zerg",
        "name": "Roach Warren",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 25,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:roach-warren"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-spawning-pool",
        "faction": "Zerg",
        "name": "Spawning Pool",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 25,
        "resourceType": "BM",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:spawning-pool"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "zerg-spawning-pool-six-pool",
        "faction": "Zerg",
        "name": "Spawning Pool (Six Pool)",
        "factionTags": [
          "Zerg"
        ],
        "gasCost": 40,
        "resourceType": "BM",
        "resourceValue": 2,
        "additionalSlots": {
          "core": 2
        },
        "sourceRefs": [
          "SRC-ZERG",
          "PART-12.11",
          "card:spawning-pool-six-pool"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      }
    ]
  },
  "protoss": {
    "factionCards": [
      {
        "id": "protoss-daelaam",
        "faction": "Protoss",
        "name": "Daelaam",
        "unique": true,
        "factionTags": [
          "Protoss",
          "Daelaam"
        ],
        "resourceType": "EN",
        "resourceValue": 1,
        "startingSlots": {
          "elite": 1,
          "core": 3,
          "support": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "card:daelaam"
        ],
        "notes": "Generated from faction-expanded source text."
      },
      {
        "id": "protoss-khalai",
        "faction": "Protoss",
        "name": "Khalai",
        "unique": true,
        "factionTags": [
          "Protoss",
          "Khalai"
        ],
        "resourceType": "EN",
        "resourceValue": 1,
        "startingSlots": {
          "hero": 1,
          "elite": 2,
          "core": 3
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "card:khalai"
        ],
        "notes": "Generated from faction-expanded source text."
      }
    ],
    "units": [
      {
        "id": "protoss-adept",
        "faction": "Protoss",
        "name": "Adept",
        "factionTags": [
          "Protoss"
        ],
        "unique": false,
        "stats": {
          "shield": "2",
          "speed": "5/8",
          "evade": "5+",
          "armour": "5+",
          "hp": 3,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 2",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "3 - 4",
            "supply": 1,
            "mineralCost": 150
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 150,
        "gasCost": 0,
        "upgradeRefs": [
          "protoss-adept-glaive-strike",
          "protoss-adept-guidance",
          "protoss-adept-resonating-glaives"
        ],
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.10",
          "card:adept"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "protoss-artanis",
        "faction": "Protoss",
        "name": "Artanis",
        "factionTags": [
          "Protoss"
        ],
        "unique": false,
        "stats": {
          "shield": "4",
          "speed": "7",
          "evade": "5+",
          "armour": "4+",
          "hp": 8,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": 250
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 250,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.10",
          "card:artanis"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "protoss-praetor-guard-zealot",
        "faction": "Protoss",
        "name": "Praetor Guard (Zealot)",
        "factionTags": [
          "Protoss"
        ],
        "unique": false,
        "stats": {
          "shield": "3",
          "speed": "4/7",
          "evade": "5+",
          "armour": "5+",
          "hp": 4,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": null
          },
          {
            "models": "2 - 3",
            "supply": 2,
            "mineralCost": 280
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 280,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.10",
          "card:praetor-guard-zealot"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "protoss-pylon",
        "faction": "Protoss",
        "name": "Pylon",
        "factionTags": [
          "Protoss"
        ],
        "unique": false,
        "stats": {
          "shield": "2",
          "speed": "-",
          "evade": "-",
          "armour": "5+",
          "hp": 8,
          "size": 3
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": null,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.10",
          "card:pylon"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "protoss-sentry",
        "faction": "Protoss",
        "name": "Sentry",
        "factionTags": [
          "Protoss"
        ],
        "unique": false,
        "stats": {
          "shield": "2",
          "speed": "4/7",
          "evade": "6+",
          "armour": "5+",
          "hp": 4,
          "size": 1
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "2 - 2",
            "supply": 1,
            "mineralCost": 130
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 130,
        "gasCost": 0,
        "upgradeRefs": [
          "protoss-sentry-hallucination",
          "protoss-sentry-solid-field-projectors"
        ],
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.10",
          "card:sentry"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "protoss-stalker",
        "faction": "Protoss",
        "name": "Stalker",
        "factionTags": [
          "Protoss"
        ],
        "unique": false,
        "stats": {
          "shield": "3",
          "speed": "4/8",
          "evade": "6+",
          "armour": "4+",
          "hp": 6,
          "size": 3
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": 160
          },
          {
            "models": "2 - 2",
            "supply": 2,
            "mineralCost": 260
          }
        ],
        "mineralCost": 160,
        "gasCost": 0,
        "upgradeRefs": [
          "protoss-stalker-fury-of-the-nerazim",
          "protoss-stalker-path-of-shadows"
        ],
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.10",
          "card:stalker"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "protoss-zealot",
        "faction": "Protoss",
        "name": "Zealot",
        "factionTags": [
          "Protoss"
        ],
        "unique": false,
        "stats": {
          "shield": "3",
          "speed": "4/7",
          "evade": "5+",
          "armour": "5+",
          "hp": 4,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": null
          },
          {
            "models": "2 - 3",
            "supply": 2,
            "mineralCost": 160
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 160,
        "gasCost": 0,
        "upgradeRefs": [
          "protoss-zealot-leg-enhancements",
          "protoss-zealot-my-life-for-aiur",
          "protoss-zealot-we-stand-as-one",
          "protoss-zealot-zealous-round"
        ],
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.10",
          "card:zealot"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      }
    ],
    "upgrades": [
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
        "id": "protoss-adept-glaive-strike",
        "unitId": "protoss-adept",
        "name": "Glaive Strike",
        "type": "↑ Strike",
        "cost": "20",
        "specialist": false,
        "replacesWeapon": "Strike",
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
        "type": "-",
        "cost": "10",
        "specialist": false,
        "replacesWeapon": null,
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
        "type": "-",
        "cost": "20",
        "specialist": false,
        "replacesWeapon": null,
        "sourceRefs": [
          "PART-12.10",
          "card:adept"
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
      }
    ],
    "tacticalCards": [
      {
        "id": "protoss-forge",
        "faction": "Protoss",
        "name": "Forge",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 30,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:forge"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-gate-chronoboosted",
        "faction": "Protoss",
        "name": "Gate Chronoboosted",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 40,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 1,
          "core": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:gate-chronoboosted"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-gateway",
        "faction": "Protoss",
        "name": "Gateway",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 25,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:gateway"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-nexus",
        "faction": "Protoss",
        "name": "Nexus",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 35,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 2
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:nexus"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-observer",
        "faction": "Protoss",
        "name": "Observer",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 25,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "support": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:observer"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-nexus-overcharged",
        "faction": "Protoss",
        "name": "Nexus Overcharged",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 35,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 1,
          "core": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:nexus-overcharged"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-power-field",
        "faction": "Protoss",
        "name": "Power Field",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 40,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "hero": 1,
          "elite": 1,
          "core": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:power-field"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-twilight-council",
        "faction": "Protoss",
        "name": "Twilight Council",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 40,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 1,
          "support": 1
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:twilight-council"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-warp-gate",
        "faction": "Protoss",
        "name": "Warp Gate",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 40,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 2
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:warp-gate"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "protoss-warp-prism",
        "faction": "Protoss",
        "name": "Warp Prism",
        "factionTags": [
          "Protoss"
        ],
        "gasCost": 45,
        "resourceType": "EN",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 2
        },
        "sourceRefs": [
          "SRC-PROTOSS",
          "PART-12.11",
          "card:warp-prism"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      }
    ]
  },
  "terran": {
    "factionCards": [
      {
        "id": "terran-raynor-s-raiders",
        "faction": "Terran",
        "name": "Raynor's Raiders",
        "unique": true,
        "factionTags": [
          "Terran",
          "Raynor's Raiders"
        ],
        "resourceType": "CP",
        "resourceValue": 1,
        "startingSlots": {
          "hero": 1,
          "core": 3,
          "support": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "card:raynor-s-raiders"
        ],
        "notes": "Generated from faction-expanded source text."
      },
      {
        "id": "terran-terran-armed-forces",
        "faction": "Terran",
        "name": "Terran Armed Forces",
        "unique": true,
        "factionTags": [
          "Terran",
          "Terran Armed Forces"
        ],
        "resourceType": "CP",
        "resourceValue": 1,
        "startingSlots": {
          "elite": 1,
          "core": 3,
          "support": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "card:terran-armed-forces"
        ],
        "notes": "Generated from faction-expanded source text."
      }
    ],
    "units": [
      {
        "id": "terran-goliath",
        "faction": "Terran",
        "name": "Goliath",
        "factionTags": [
          "Terran"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "7",
          "evade": "-",
          "armour": "4+",
          "hp": 10,
          "size": 3
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 2,
            "mineralCost": 190
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 190,
        "gasCost": 0,
        "upgradeRefs": [
          "terran-goliath-ares-class-targeting-system",
          "terran-goliath-haywire-missiles",
          "terran-goliath-scatter-missiles"
        ],
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.10",
          "card:goliath"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "terran-jim-raynor",
        "faction": "Terran",
        "name": "Jim Raynor",
        "factionTags": [
          "Terran"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "7",
          "evade": "5+",
          "armour": "4+",
          "hp": 8,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 1,
            "mineralCost": 230
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 230,
        "gasCost": 0,
        "upgradeRefs": [
          "terran-jim-raynor-c-14-rifle"
        ],
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.10",
          "card:jim-raynor"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "terran-marauder",
        "faction": "Terran",
        "name": "Marauder",
        "factionTags": [
          "Terran"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "6+",
          "armour": "4+",
          "hp": 5,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "2 - 2",
            "supply": 1,
            "mineralCost": 150
          },
          {
            "models": "3 - 4",
            "supply": 2,
            "mineralCost": 280
          }
        ],
        "mineralCost": 150,
        "gasCost": 0,
        "upgradeRefs": [
          "terran-marauder-kinetic-foam",
          "terran-marauder-laser-targeting-systems",
          "terran-marauder-veteran-of-tarsonis"
        ],
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.10",
          "card:marauder"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "terran-marine",
        "faction": "Terran",
        "name": "Marine",
        "factionTags": [
          "Terran"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "5+",
          "armour": "5+",
          "hp": 2,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 3",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "4 - 6",
            "supply": 1,
            "mineralCost": 160
          },
          {
            "models": "7 - 9",
            "supply": 2,
            "mineralCost": 210
          }
        ],
        "mineralCost": 160,
        "gasCost": 0,
        "upgradeRefs": [
          "terran-marine-agg-12",
          "terran-marine-bayonet",
          "terran-marine-combat-shield",
          "terran-marine-grenades-frag",
          "terran-marine-rocket-launcher",
          "terran-marine-slugthrower"
        ],
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.10",
          "card:marine"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "terran-medic",
        "faction": "Terran",
        "name": "Medic",
        "factionTags": [
          "Terran"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "5+",
          "armour": "5+",
          "hp": 2,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "2 - 3",
            "supply": 1,
            "mineralCost": 110
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 110,
        "gasCost": 0,
        "upgradeRefs": [
          "terran-medic-a-13-flash-grenade-launcher",
          "terran-medic-advanced-medic-facilities",
          "terran-medic-stabilizer-medpacks"
        ],
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.10",
          "card:medic"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "terran-point-defense-drone",
        "faction": "Terran",
        "name": "Point Defense Drone",
        "factionTags": [
          "Terran"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "-",
          "evade": "6+",
          "armour": "6+",
          "hp": 3,
          "size": null
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 1",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": null,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.10",
          "card:point-defense-drone"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      },
      {
        "id": "terran-raynor-s-raider-marine",
        "faction": "Terran",
        "name": "Raynor's Raider (Marine)",
        "factionTags": [
          "Terran"
        ],
        "unique": false,
        "stats": {
          "shield": "-",
          "speed": "4/7",
          "evade": "5+",
          "armour": "5+",
          "hp": 2,
          "size": 2
        },
        "supplyProfile": [
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          },
          {
            "models": "1 - 6",
            "supply": 1,
            "mineralCost": 230
          },
          {
            "models": "-",
            "supply": 0,
            "mineralCost": null
          }
        ],
        "mineralCost": 230,
        "gasCost": 0,
        "upgradeRefs": [],
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.10",
          "card:raynor-s-raider-marine"
        ],
        "notes": "Generated from faction-expanded stats/squad tiers and Part 12 quick-reference mustering data."
      }
    ],
    "upgrades": [
      {
        "id": "terran-marine-agg-12",
        "unitId": "terran-marine",
        "name": "AGG-12",
        "type": "SPECIALIST , ↑ FOR C-14 Rifle",
        "cost": "10",
        "specialist": true,
        "replacesWeapon": "C-14 Rifle",
        "sourceRefs": [
          "PART-12.10",
          "card:marine"
        ],
        "notes": "Generated from Part 12 quick-reference upgrade costs."
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
        "id": "terran-marine-combat-shield",
        "unitId": "terran-marine",
        "name": "Combat Shield",
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
        "id": "terran-marine-grenades-frag",
        "unitId": "terran-marine",
        "name": "Grenades - Frag",
        "type": "-",
        "cost": "10",
        "specialist": false,
        "replacesWeapon": null,
        "sourceRefs": [
          "PART-12.10",
          "card:marine"
        ],
        "notes": "Generated from Part 12 quick-reference upgrade costs."
      },
      {
        "id": "terran-marine-rocket-launcher",
        "unitId": "terran-marine",
        "name": "Rocket Launcher",
        "type": "SPECIALIST",
        "cost": "40",
        "specialist": true,
        "replacesWeapon": null,
        "sourceRefs": [
          "PART-12.10",
          "card:marine"
        ],
        "notes": "Generated from Part 12 quick-reference upgrade costs."
      },
      {
        "id": "terran-marine-slugthrower",
        "unitId": "terran-marine",
        "name": "Slugthrower",
        "type": "-",
        "cost": "10/20",
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
        "id": "terran-goliath-ares-class-targeting-system",
        "unitId": "terran-goliath",
        "name": "Ares-Class Targeting System",
        "type": "-",
        "cost": "20",
        "specialist": false,
        "replacesWeapon": null,
        "sourceRefs": [
          "PART-12.10",
          "card:goliath"
        ],
        "notes": "Generated from Part 12 quick-reference upgrade costs."
      },
      {
        "id": "terran-goliath-haywire-missiles",
        "unitId": "terran-goliath",
        "name": "Haywire Missiles",
        "type": "↑ Hellfire Missiles",
        "cost": "40",
        "specialist": false,
        "replacesWeapon": "Hellfire Missiles",
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
        "type": "↑ Hellfire Missiles",
        "cost": "30",
        "specialist": false,
        "replacesWeapon": "Hellfire Missiles",
        "sourceRefs": [
          "PART-12.10",
          "card:goliath"
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
      }
    ],
    "tacticalCards": [
      {
        "id": "terran-academy",
        "faction": "Terran",
        "name": "Academy",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 35,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "support": 2
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:academy"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-armory",
        "faction": "Terran",
        "name": "Armory",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 30,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:armory"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-barracks",
        "faction": "Terran",
        "name": "Barracks",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 25,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:barracks"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-barracks-proxy",
        "faction": "Terran",
        "name": "Barracks (Proxy)",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 40,
        "resourceType": "CP",
        "resourceValue": 2,
        "additionalSlots": {
          "core": 2
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:barracks-proxy"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-barracks-tech-lab",
        "faction": "Terran",
        "name": "Barracks (Tech Lab)",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 45,
        "resourceType": "CP",
        "resourceValue": 2,
        "additionalSlots": {
          "elite": 1,
          "core": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:barracks-tech-lab"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-dropship",
        "faction": "Terran",
        "name": "Dropship",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 40,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1,
          "support": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:dropship"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-engineering-bay",
        "faction": "Terran",
        "name": "Engineering Bay",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 30,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:engineering-bay"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-factory",
        "faction": "Terran",
        "name": "Factory",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 35,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "elite": 2
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:factory"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-orbital-command",
        "faction": "Terran",
        "name": "Orbital Command",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 25,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "core": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:orbital-command"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      },
      {
        "id": "terran-supply-depot",
        "faction": "Terran",
        "name": "Supply Depot",
        "factionTags": [
          "Terran"
        ],
        "gasCost": 40,
        "resourceType": "CP",
        "resourceValue": 1,
        "additionalSlots": {
          "hero": 1,
          "elite": 1,
          "core": 1
        },
        "sourceRefs": [
          "SRC-TERRAN",
          "PART-12.11",
          "card:supply-depot"
        ],
        "notes": "Generated from faction-expanded tactical-card text and Part 12 gas costs."
      }
    ]
  }
};

export const GENERATED_RULES_CONTENT_NOTES = {
  purpose: 'Generated rules-backed faction card, unit, tactical card, and upgrade reference layer.',
  status: 'generated-from-rules',
  sources: [
    'source-references/generated/faction_expanded_reference.json',
    'source-references/generated/part12_units_and_upgrades.json',
    'source-references/generated/part12_tactical_cards.json'
  ]
};
