import type { OptionsConfig } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

import antfu from '@antfu/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';

export const overridesStylisticConfig:Exclude<OptionsConfig['stylistic'], boolean | undefined>['overrides'] = {
  /* spacing rules */
  'style/type-annotation-spacing': ['error', { before: false, after: false, overrides: { arrow: { before: false, after: true } } }],
  'style/type-generic-spacing': ['error'],
  'style/type-named-tuple-spacing': ['error'],

  /* misc */
  'style/max-len': ['warn', { code: 80, tabWidth: 4, ignoreTrailingComments: true, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true, ignorePattern: '^\\s*var\\s.+=\\s*require\\s*\\(' }],
  'style/one-var-declaration-per-line': ['error', 'always'],
  'style/nonblock-statement-body-position': ['error', 'beside', { overrides: { while: 'below' } }],

  /* jsx */
  'style/jsx-quotes': ['error', 'prefer-single'],
  'style/jsx-curly-brace-presence': ['warn', 'always'],
  'style/jsx-curly-spacing': [2, { when: 'always' }],

  /* semis */
  'style/no-extra-semi': 'error',
};

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export function create_eslint_config(options:Parameters<typeof antfu>['0'] = {}, userConfigs:Linter.Config[] | never[] = []):ReturnType<typeof antfu> {
  return antfu(
    {
      pnpm: true,
      react: false,
      typescript: {
        parserOptions: {
          tsconfigRootDir: new URL('.', import.meta.url).pathname,
        },
      },
      stylistic: {
        jsx: false,
        semi: true,
        overrides: overridesStylisticConfig,
      },
      jsx: false,
      formatters: true,
      ...options,
    },
    {
      plugins: {
        turbo: turboPlugin,
      },
      rules: {
        'turbo/no-undeclared-env-vars': 'warn',
        'ts/consistent-type-definitions': ['error', 'type'],
        'no-console': ['warn'],
        'antfu/no-top-level-await': ['off'],
        'node/prefer-global/process': ['off'],
        'node/no-process-env': ['error'],
        'perfectionist/sort-imports': ['error', {
          tsconfigRootDir: '.',
        }],
      },
    },
    {
      ignores: ['dist/**'],
    },
    ...userConfigs,
  );
}
