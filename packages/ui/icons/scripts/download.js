import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { components as loadComponents } from '@figma-export/core';
import isSvg from 'is-svg';
import { optimize } from 'svgo';
import { ICONS_NAME_REGEX, IGNORED_COLORS_FOR_SVGO_REGEX, SVGS_DIR } from './constants.js';
import { clearDir, kebabCaseToCamelCase } from './utils.js';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE = process.env.FIGMA_FILE;
const FIGMA_IDS = process.env.FIGMA_IDS.split(',');
const FIGMA_PAGES = process.env.FIGMA_PAGES.split(',');

function parseComponentPropsFromString(props) {
  const params = props.split(/\s*,\s?/);

  return params.reduce((acc, param) => {
    const [key, value] = param.split(/\s*=\s*/);
    acc[key] = value;

    return acc;
  }, {});
}

function parseComponentSetName(name) {
  const params = name.split('/');

  if (params.length < 3)
    throw new Error(`Icon must have palette, group and name (Monochrome/Logo/yandex): ${name}`);

  return {
    name: params.at(-1),
    meta: {
      palette: params.at(0).toLowerCase(),
      group: params.at(1).toLowerCase()
    }
  };
}

function svgTransformer(svg, palette) {
  const isMonochrome = palette === 'monochrome';

  return optimize(svg, {
    multipass: true,
    plugins: [{
      name: 'preset-default',
      params: {
        overrides: {
          convertColors: {
            currentColor: isMonochrome ? IGNORED_COLORS_FOR_SVGO_REGEX : false
          },
          removeViewBox: false
        }
      }
    }]
  }).data;
}

function createSvgBuilder(metadata) {
  return async function svgBuilder([{ children, components: icons }]) {
    const targetNodes = targetNodesBFS(FIGMA_IDS, children);
    const iconSets = componentSetsDfs(targetNodes);
    const iconsById = icons.reduce((acc, icon) => { acc[icon.id] = icon; return acc; }, {});
    const uniqueIcons = new Set();

    function targetNodesBFS(targetIds, startQueue) {
      const queue = Array.from(startQueue);
      const resultNodes = [];

      targetIds = new Set(targetIds.map((id) => id.replace('-', ':')));

      while (queue.length > 0 && targetIds.size > 0) {
        const node = queue.shift();

        if (targetIds.has(node.id)) {
          resultNodes.push(node);
          targetIds.delete(node.id);

          continue;
        }

        if (node.children)
          queue.push(...node.children);
      }

      return resultNodes;
    }

    function componentSetsDfs(startStack) {
      const stack = Array.from(startStack);
      const resultSets = new Set();

      while (stack.length > 0) {
        const node = stack.pop();

        if (node.type === 'COMPONENT_SET') {
          resultSets.add(node);

          continue;
        }

        if (node.children) {
          stack.push(...node.children);
        }
      }

      return Array.from(resultSets);
    }

    console.log(iconSets);

    for (const iconSet of iconSets) {
      const { name, meta } = parseComponentSetName(iconSet.name);

      if (!ICONS_NAME_REGEX.test(name))
        throw new Error(`Invalid icon name: ${name}. Pattern: ${ICONS_NAME_REGEX.source}`);

      if (uniqueIcons.has(name)) {
        throw new Error(`Icon has been already added: ${name}`);
      }
      else {
        uniqueIcons.add(name);
      }

      if (!meta.palette)
        throw new Error(`Icon must have palette: ${name}`);

      if (!meta.group)
        throw new Error(`Icon must have group: ${name}`);

      metadata.info.palettes.add(meta.palette);
      metadata.info.groups.add(meta.group);

      for (const icon of iconSet.children) {
        const props = parseComponentPropsFromString(icon.name);
        if (!props.preview)
          throw new Error(`Icon has no preview: ${name}`);

        if (props.preview === 'true')
          continue;

        let svg = iconsById[icon.id].svg;
        let svgName = name;

        if (!props.style)
          throw new Error(`Icon has no style: ${name}`);

        if (props.style !== 'regular')
          svgName += `_${props.style}`;

        if (props.animated === 'true') {
          if (!isSvg(iconsById[icon.id].description))
            throw new Error(`If icon animated must have in description correct svg: ${name}`);

          svg = iconsById[icon.id].description;
        }

        metadata.icons.push({
          name,
          style: props.style,
          svgName,
          componentName: kebabCaseToCamelCase(svgName),
          meta
        });

        const optimizedSvg = svgTransformer(svg, meta.palette);
        console.log(path.join(SVGS_DIR, `${svgName}.svg`));
        await fs.writeFile(path.join(SVGS_DIR, `${svgName}.svg`), optimizedSvg);
      }
    }
  };
}

async function download() {
  await clearDir(SVGS_DIR);

  const metadata = {
    info: {
      palettes: new Set(),
      groups: new Set()
    },
    icons: []
  };

  await loadComponents({
    token: FIGMA_TOKEN,
    fileId: FIGMA_FILE,
    ids: FIGMA_IDS,
    onlyFromPages: FIGMA_PAGES,
    outputters: [createSvgBuilder(metadata)],
    filterComponent: (node) => {
      if (node.name === 'Divider Horizontal')
        console.log(node);
      return node.type !== 'INSTANCE';
    }
  });

  metadata.info.palettes = Array.from(metadata.info.palettes);
  metadata.info.groups = Array.from(metadata.info.groups);
  await fs.writeFile(path.join(process.cwd(), 'metadata.json'), JSON.stringify(metadata, null, 2));
}

download().catch((error) => {
  console.error(`Failed to download icons: ${error}`);
  process.exit(1);
});
