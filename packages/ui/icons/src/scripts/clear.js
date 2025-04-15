import process from 'node:process';
import { DIST_DIR } from './constants.js';
import { clearDir } from './utils.js';

clearDir(DIST_DIR).catch((err) => {
  console.error(`Failed clear "${DIST_DIR}": ${err}`);
  process.exit(1);
});