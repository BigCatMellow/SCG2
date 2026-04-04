# Rules Audit Summary

This summary is based on the generated reference files in this folder.

## What is now available

- `part9_army_building.json` for army-building rules
- `part11_keywords.json` for the glossary
- `part12_units_and_upgrades.json` for composition options and upgrade costs
- `part12_tactical_cards.json` for tactical card gas costs
- `faction_expanded_reference.json` for faction-expanded item lists and extracted body text
- `runtime_vs_rules_audit.json` for current runtime coverage versus the rule sources

## High-signal findings

- The current shared runtime is still starter-only compared with the rule sources.
- Zerg source files show 12 unit cards and 11 tactical cards, while the runtime currently has 1 unit and 0 tactical cards.
- Protoss source files show 7 unit cards and 10 tactical cards, while the runtime currently has 1 unit and 0 tactical cards.
- Terran source files show 7 unit cards and 10 tactical cards, while the runtime currently has 1 unit and 0 tactical cards.

## Important source-backed corrections already visible

- Part 9 defines Vespene Gas as 10% of Minerals at each engagement scale, not a fixed manual number.
- Part 9 names the largest scale `Grand Offensive`, not `Grand`.
- Part 12 uses `EN` for Protoss tactical-card resource/cost context, so the earlier `PE` placeholder in the runtime should be treated as suspect.

## Recommendation

Use the `Rules` HTML files and the generated references here as the canonical source for the next rebuild pass.
The safest next rebuild order is:

1. army-building rules and glossary
2. tactical card gas costs
3. unit composition options and upgrade costs
4. faction-expanded card text, abilities, and stat blocks
