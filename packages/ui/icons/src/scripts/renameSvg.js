import fs from 'node:fs/promises';
import process from 'node:process';
import { SVGS_DIR } from './constants.js';

const INITIAL_TEMPLATE = 'material-symbols_';

export async function renameSvgFiles() {
  const fileNames = await fs.readdir(SVGS_DIR);

  fileNames.map(async (fileName) => {
    let newFileName = fileName.toLowerCase();
    if (newFileName.startsWith(INITIAL_TEMPLATE)) {
      newFileName = newFileName.slice(INITIAL_TEMPLATE.length);
    }

    newFileName = newFileName.replace(/-/g, '_');
    await fs.rename(`${SVGS_DIR}/${fileName}`, `${SVGS_DIR}/${newFileName}`);
  });
}

renameSvgFiles().catch((err) => {
  console.error(`Error renaming SVG files: ${err}`);
  process.exit(1);
});
