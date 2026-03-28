# Keyword Support Audit

This file tracks how closely the codebase matches the tabletop keyword glossary.

## Status Keys

- `implemented`: the engine resolves the keyword mechanically in normal play
- `partial`: some effect is modeled, but the full rule is not
- `data-only`: the keyword appears in unit or weapon data but has no rules impact yet
- `missing`: no meaningful support yet

## Combat-Critical Keywords

| Keyword | Status | Notes |
| --- | --- | --- |
| `SURGE` | partial | Implemented for the current playable roster as a first-pass bypass-armour mechanic with popup support. Coverage now includes Marines, Kerrigan, Raptors, upgraded Zerglings, and Roach acid spit. Full batch targeting, spillover, evade, and split-target handling are still missing. |
| `IMPACT` | partial | Implemented for charging units with explicit data. Coverage now includes Raptors, Roaches, and Zerglings in the playable roster. It now respects the current fighting/supporting rank and melee target-focus allocation pass, but still lacks fuller per-model edge cases and broader roster coverage. |
| `PRECISION` | partial | Implemented as a first-pass conversion of failed hit dice into extra hits before wound rolls. Still missing fuller batch-level interactions and upgrade/card wiring. |
| `ANTI-EVADE` | partial | Anti-Evade now worsens evade target numbers during combat. Broader roster data coverage and more keyword interactions are still missing. |
| `BURST FIRE` | partial | Burst Fire now increases ranged RoA against nearby targets. It is still resolved with leader-to-leader range simplification rather than full per-model checks. |
| `CONCENTRATED FIRE` | partial | Concentrated Fire now caps casualties and discards overflow damage, and the combat UI now surfaces those capped batches more clearly. It still needs broader roster data coverage and fuller interaction coverage. |
| `HITS` | missing | Automatic-hit pipeline is not implemented yet. |
| `INDIRECT FIRE` | partial | Ranged attacks can now ignore line of sight when the weapon has Indirect Fire, and the combat popups explain when that happened. Still missing fuller terrain/elevation nuance. |
| `INSTANT` | partial | Instant now shuts down Overwatch-style reaction windows during charge declarations, but broader reaction-ability coverage is still missing because the engine does not yet model many other reaction abilities. |
| `LOCKED IN` | partial | Locked In now adds RoA against stationary targets during ranged attacks. It still needs broader roster data coverage and any future interaction with more detailed status timing. |
| `LONG RANGE` | partial | Weapons can now attack out to their long-range band and take a hit penalty beyond base range. Still simplified at unit level rather than per-model batching. |
| `PIERCE` | partial | Matching target tags can now raise damage per unsaved hit. Still missing broader card/upgrade wiring and richer keyword data coverage. |
| `PINPOINT` | missing | No precision target-selection support yet. |
| `CRITICAL HIT` | partial | Implemented as armour-bypassing hits before saves. Still missing interaction with evade/dodge and broader data coverage. |
| `DODGE` | partial | Dodge now cancels a limited number of bypass-armour hits before damage is applied. Still missing broader roster data coverage and some edge-case interactions. |

## Targeting And State Keywords

| Keyword | Status | Notes |
| --- | --- | --- |
| `HIDDEN` | partial | Hidden now has real state flow through burrow/hide-style status handling, blocks ranged targeting beyond 4", can trigger evade, and negates Impact. Broader non-burrow Hidden sources are still incomplete. |
| `BURROWED` | partial | Burrow-capable units can now gain/lose Burrowed as a real activation, keep Hidden while underground, lose contesting, heal on activation where supported, break the status when revealing actions are taken, and automatically use Close Ranks when they resolve melee from a burrowed state. Still missing fuller faction ability coverage and wider Close Ranks action flow beyond that combat step. |
| `FLYING` | missing | No differentiated movement, targeting, or terrain interaction yet. |
| `BULKY` | partial | Bulky now blocks ranged attack declarations while the attacker is engaged. It still needs broader roster data coverage and any future combat-step legality hooks beyond declaration time. |

## Melee Structure Keywords

| Keyword | Status | Notes |
| --- | --- | --- |
| `FIGHTING RANK` | partial | Melee attacks now count only models within engagement range of enemy models, and the UI now previews those numbers when the player chooses a melee focus target. Terrain/elevation engagement edge cases are still missing. |
| `SUPPORTING RANK` | partial | Models in base contact with a friendly fighting-rank model can now contribute melee attacks, and that support count is now previewed in the melee focus chooser before resolution. Fuller close-combat formation rules are still missing. |
| `CLOSE RANKS` | partial | Burrowed units now automatically use Close Ranks when they surface to complete melee attacks. It is not yet exposed as a broader standalone combat action outside that flow. |

## High-Value Next Steps

1. Finish `SURGE` by adding evade interaction, split-target declarations, and template exceptions.
2. Add real roster data for the newly-supported RoA keywords so Burst Fire / Locked In / Concentrated Fire show up in live matches more often.
3. Expand the evade system with richer roster data, reaction timing, and clearer target legality explanations in the UI.
4. Add true player-facing split-attack allocation beyond primary target focus, especially when melee or impact attacks should be divided across multiple engaged enemies.
