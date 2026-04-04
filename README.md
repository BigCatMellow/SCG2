# StarCraft TMG GitHub Copy

This folder is the GitHub-friendly copy of the runtime-driven StarCraft TMG site.

## GitHub Pages layout

- `index.html` is in the repo root
- faction pages like `zerg.html`, `protoss.html`, and `terran.html` are also in the repo root
- `runtime/` stays beside the HTML files so browser module imports work on GitHub Pages

That means this copy can be published directly from the repository root on GitHub Pages without needing the old `site/` subfolder.

## What is included

- the live site pages
- the shared runtime and data layer
- rebuild/validation scripts
- generated rule references used for accuracy checks

## Publish target

If you use GitHub Pages, the simplest setup is:

1. push this folder as the repository content
2. set Pages to deploy from the repository root
3. use the default `index.html` entry page

## Accuracy workflow

When the `Rules/` source files change, run:

```bash
npm run rebuild:runtime
```

That pipeline will:

1. regenerate extracted rule references
2. rebuild runtime support/content/detail layers
3. validate the runtime against the rules
4. smoke-check the published page structure
