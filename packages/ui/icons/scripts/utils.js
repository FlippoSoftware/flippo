import fs from 'node:fs/promises';
import { ESLint } from 'eslint';

export async function clearDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

export async function formatting(content, filePath) {
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintText(content, { filePath });

  await ESLint.outputFixes(results);

  const fixed = results[0]?.output;
  return fixed || content;
}

export function isHex(value) {
  return /^#[0-9a-f]{3,6}$/i.test(value);
}

export function kebabCaseToCamelCase(name) {
  return name.replace(/^\w|_\w/g, (match) => match.replace('_', '').toUpperCase());
}
