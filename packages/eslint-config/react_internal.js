import antfu from '@antfu/eslint-config';

import { config as baseConfig } from './create_eslint_config.js';

/**
 * A custom ESLint configuration for libraries that use React.
 *
  @type {import("eslint").Linter.Config[]} */
export const config = antfu({
  stylistic: false,
  react: true,
  jsx: true,
}, ...baseConfig);
