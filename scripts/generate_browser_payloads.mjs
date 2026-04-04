import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getLegacyBuilderPayload } from '../runtime/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const payloadDir = path.join(rootDir, 'runtime', 'payloads');

const factions = ['zerg', 'protoss', 'terran'];

await fs.mkdir(payloadDir, { recursive: true });

for (const faction of factions) {
  const payload = getLegacyBuilderPayload(faction);
  const filePath = path.join(payloadDir, `${faction}.js`);
  const contents = [
    `window.__starcraftTMGRuntimePayload = ${JSON.stringify(payload, null, 2)};`,
    `window.__starcraftTMGRuntimeStatus = ${JSON.stringify(payload.status)};`,
    `window.__starcraftTMGRuntimeFaction = ${JSON.stringify(payload.factionKey)};`,
    '',
  ].join('\n');
  await fs.writeFile(filePath, contents, 'utf8');
}

console.log(`Generated browser payloads in ${payloadDir}`);
