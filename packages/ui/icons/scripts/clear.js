import process from 'node:process';
import fg from 'fast-glob';
import { rimraf } from 'rimraf';

async function run() {
  const paths = await fg(['*.d.ts', '*.jsx'], {
    onlyFiles: false
  });
  for (const path of paths) {
    rimraf.sync(path);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
