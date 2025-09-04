import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { transform } from '@svgr/core';
import { ICONS_DIR, SVGS_DIR } from './constants.js';
import { clearDir, kebabCaseToCamelCase } from './utils.js';

async function createIndexFile(files) {
    const indexFilePath = path.join(ICONS_DIR, 'index.tsx');
    const content = files.map((file) => `export { default as ${file.name}Icon } from './${file.path}Icon';`).join('\n');

    await fs.writeFile(indexFilePath, content);
}

async function generateIcons() {
    await clearDir(ICONS_DIR);

    const svgFiles = (await fs.readdir(SVGS_DIR, { recursive: true })).filter((file) => path.extname(file) === '.svg');

    const iconFiles = await Promise.all(svgFiles.map(async (file) => {
        const fileMeta = path.parse(file);
        const componentName = kebabCaseToCamelCase(fileMeta.name);
        const svg = await fs.readFile(path.join(SVGS_DIR, file), 'utf-8');

        const iconFilePath = path.join(ICONS_DIR, `${componentName}Icon.tsx`);

        const content = await transform(svg, { typescript: true, plugins: ['@svgr/plugin-jsx'] }, { componentName });

        await fs.mkdir(path.parse(iconFilePath).dir, { recursive: true });
        await fs.writeFile(iconFilePath, content);

        return { name: componentName, path: componentName };
    }));

    await createIndexFile(iconFiles);
}

generateIcons().catch((err) => {
    console.error(`Failed to generate icons: ${err}`);
    process.exit(1);
});
