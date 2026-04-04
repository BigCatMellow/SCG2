import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const missionsHtmlPath = path.join(root, 'missions.html');
const outputPath = path.join(root, 'runtime', 'payloads', 'mission-setup.js');

function extractArrayLiteral(source, constName) {
  const startToken = `const ${constName} = [`;
  const start = source.indexOf(startToken);
  if (start === -1) {
    throw new Error(`Could not find ${constName} in missions.html`);
  }

  let index = start + startToken.length - 1;
  let depth = 0;
  let inString = false;
  let stringChar = '';

  while (index < source.length) {
    const char = source[index];
    const prev = source[index - 1];

    if (inString) {
      if (char === stringChar && prev !== '\\') {
        inString = false;
        stringChar = '';
      }
      index += 1;
      continue;
    }

    if (char === '"' || char === '\'' || char === '`') {
      inString = true;
      stringChar = char;
      index += 1;
      continue;
    }

    if (char === '[') {
      depth += 1;
    } else if (char === ']') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start + (`const ${constName} = `.length), index + 1);
      }
    }

    index += 1;
  }

  throw new Error(`Could not parse array literal for ${constName}`);
}

const html = await readFile(missionsHtmlPath, 'utf8');
const missionsLiteral = extractArrayLiteral(html, 'MISSIONS');
const mapsLiteral = extractArrayLiteral(html, 'MAPS');

const output = `window.__missionSetupData = {
  missions: ${missionsLiteral},
  maps: ${mapsLiteral}
};
`;

await writeFile(outputPath, output, 'utf8');
console.log(`Wrote ${outputPath}`);
