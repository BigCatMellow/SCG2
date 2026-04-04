import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const steps = [
  'extract_rules_reference.mjs',
  'rebuild_runtime_supporting_data.mjs',
  'rebuild_runtime_generated_content.mjs',
  'rebuild_runtime_detail_content.mjs',
  'validate_runtime_against_rules.mjs',
  'smoke_check_site_runtime.mjs',
];

for (const scriptName of steps) {
  console.log(`\n== Running ${scriptName} ==`);

  const result = spawnSync(process.execPath, [path.join(__dirname, scriptName)], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('\nRuntime rebuild, validation, and smoke check completed successfully.');
