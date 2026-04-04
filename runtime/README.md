# StarCraft TMG data schema starter

These files are the **source-of-truth layer** for the site data.

They are split by data type instead of page:
- `units.js`
- `weapons.js`
- `abilities.js`
- `keywords.js`
- `army-building-rules.js`
- `faction-cards.js`
- `tactical-cards.js`
- `upgrades.js`
- `zerg-content.js`
- `protoss-content.js`
- `terran-content.js`
- `runtime-merge.js`
- `builder-adapter.js`
- `legacy-builder-adapter.js`
- `legacy-builder-browser-bridge.js`
- `runtime-example.js`
- `runtime-summary.json`
- `index.js`

## Design rules

1. Keep stable `id` values even if display names change.
2. Keep exact rules text in the most natural canonical file:
   - card stats in `units.js`
   - weapon profiles in `weapons.js`
   - named abilities in `abilities.js`
   - glossary definitions in `keywords.js`
   - army construction and eligibility rules in `army-building-rules.js`
3. Reference across files by ID instead of copying text.
4. Let the HTML pages render from these files; do not store the real source of truth inside the page scripts.
5. Do not change site styling here. These files are for data only.

## Suggested next step

Fill these files from the faction-expanded pages and rule parts, then make the builders import from this folder.

Additional files added:
- `faction-cards.js`
- `tactical-cards.js`
- `upgrades.js`

## Notes on these new files

- `faction-cards.js` should become the canonical source for faction tags, starting slots, resource type/value, and linked faction abilities.
- `tactical-cards.js` should become the canonical source for Vespene Gas cost, additional slot gains, resource values, and linked tactical abilities.
- `upgrades.js` is intentionally separate because upgrade legality and application rules differ from normal Unit / Tactical / Faction card behavior.
- Tactical and upgrade examples are starter objects. Some entries are sourced from rules examples or current builder data and should be confirmed against final reverse-card/source extraction before being treated as canonical.

Additional files added in v3:
- `zerg-content.js`
- `protoss-content.js`
- `terran-content.js`

## Notes on faction content files

- These are per-faction entry points that group real records together for easier editing.
- They follow the shared schema shapes, but are organized around workflow: “I am editing Zerg now” instead of “I am editing all units across all factions now.”
- These files include source-grounded starter records for faction cards, units, weapons, and abilities where the source snippets were clear.
- Tactical card coverage is still mostly empty and should be filled from fuller faction extraction.

Additional files added in v4:
- `runtime-merge.js`
- `builder-adapter.js`
- `runtime-example.js`
- `runtime-summary.json`

## What v4 adds

- `runtime-merge.js` builds one clean runtime object from the per-faction content files.
- `builder-adapter.js` converts that runtime object into flatter payloads that are easier for the current builders to consume.
- `legacy-builder-adapter.js` converts the shared runtime payloads into the older page-local array shapes so the existing HTML builders can be migrated incrementally.
- `legacy-builder-browser-bridge.js` attaches those legacy-shaped arrays to `window` so a builder page can keep reading `ZERG_FACTION_CARDS`, `ZERG_UNITS`, and `ZERG_TACTICAL_CARDS` during migration.
- `runtime-example.js` shows the intended usage pattern.
- `runtime-summary.json` gives a quick snapshot of current starter coverage.

## Why this matters

This is the first layer that is directly aimed at the current HTML builders.
It does not touch styling. It only changes where the data comes from and how
it is prepared before rendering.
