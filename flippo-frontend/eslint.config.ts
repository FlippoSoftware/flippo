import { eslintReactConfig } from "@flippo/eslint";

import pluginStorybook from "eslint-plugin-storybook";

/** @type {import('eslint').Linter.Config[]} */
export default eslintReactConfig(import.meta.dirname).append(
    ...pluginStorybook.configs['flat/recommended'], {
    files: ['**/tests/*.testplane.js', '**/tests/*.testplane.ts'],
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      'no-undef': 'off'
    }
  })
