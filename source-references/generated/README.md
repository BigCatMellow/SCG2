# Generated Rule References

These files are generated from the HTML sources in the sibling `Rules/` folder.

## Files

- `part9_army_building.json`: extracted Part 9 army-building sections
- `part11_keywords.json`: extracted keyword glossary entries
- `part12_units_and_upgrades.json`: extracted composition options and upgrade costs
- `part12_tactical_cards.json`: extracted tactical card gas costs
- `faction_expanded_reference.json`: extracted item lists and body text from faction-expanded files
- `runtime_vs_rules_audit.json`: current runtime coverage compared against the rules sources

Regenerate these references by running:

```powershell
node .\scripts\extract_rules_reference.mjs
```
