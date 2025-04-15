import { fileURLToPath } from 'node:url';
import { isHex } from './utils.js';

export const SVGS_DIR = fileURLToPath(import.meta.resolve('../svgs', import.meta.dirname));
export const ICONS_DIR = fileURLToPath(import.meta.resolve('../lib', import.meta.dirname));
export const DIST_DIR = fileURLToPath(import.meta.resolve('../../dist', import.meta.dirname));

export const ICONS_NAME_REGEX = /^([a-z0-9](_?[a-z0-9])*)$/i;

export const IGNORED_COLORS_FOR_SVGO = {
  '$misc-red-darker': '#e52222',
  '$misc-red-default': '#ff4141',
  '$misc-red-lighter': '#ff5959',

  '$misc-warm-red-darker': '#ba2a06',
  '$misc-warm-red-default': '#d3401b',
  '$misc-warm-red-lighter': '#ed5b37',

  '$misc-green-darker': '#1ba62b',
  '$misc-green-default': '#31be42',
  '$misc-green-lighter': '#4ed95e',

  '$misc-yellow-darker': '#bd9600',
  '$misc-yellow-default': '#d6ae12',
  '$misc-yellow-lighter': '#f0c82b',

  '$misc-golden-darker': '#857938',
  '$misc-golden-default': '#9e9352',
  '$misc-golden-lighter': '#b8ab5f'
};

export const IGNORED_COLORS_FOR_SVGO_REGEX = new RegExp(`#(?!${Object.values(IGNORED_COLORS_FOR_SVGO)
  .filter(isHex)
  .map((value) => value.slice(1))
  .join('|')})`, 'i');
