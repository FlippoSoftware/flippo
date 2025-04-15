import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config';

import antfu from '@antfu/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';
import globals from 'globals';

export const overridesStylisticConfig: Exclude<OptionsConfig['stylistic'], boolean | undefined>['overrides'] = {
  /* comma */
  'style/comma-dangle': ['error', 'never'],

  /* spacing rules */
  'style/type-annotation-spacing': ['error', { before: false, after: true, overrides: { arrow: { before: false, after: true } } }],
  'style/type-generic-spacing': ['error'],
  'style/type-named-tuple-spacing': ['error'],
  'style/template-tag-spacing': ['error'],

  /* misc */
  'style/max-len': ['warn', { code: 140, tabWidth: 2, ignoreTrailingComments: true, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true, ignorePattern: '^\\s*var\\s.+=\\s*require\\s*\\(' }],
  'style/one-var-declaration-per-line': ['error', 'always'],
  'style/max-statements-per-line': ['error', { max: 3 }],

  /* jsx */
  'style/jsx-quotes': ['error', 'prefer-single'],
  'style/jsx-curly-brace-presence': ['warn', 'always'],
  'style/jsx-curly-spacing': [2, { when: 'always' }],

  /* semis */
  'style/no-extra-semi': 'error',

  /* bracket */
  'style/arrow-parens': ['warn', 'always']
};

export const overridesTsConfig: Exclude<OptionsConfig['typescript'], boolean | undefined>['overrides'] = {
  'ts/consistent-type-exports': 'error',
  'ts/consistent-type-imports': 'error',
  'ts/consistent-type-definitions': [
    'error',
    'type'
  ],
  'ts/naming-convention': [
    'warn',
    {
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      selector: 'variable'
    },
    {
      format: ['PascalCase'],
      selector: 'typeLike'
    }
  ]
};

export const general: TypedFlatConfigItem[] = [
  {
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['error'],
      'perfectionist/sort-imports': ['error', {
        tsconfigRootDir: import.meta.dirname
      }]
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.chai,
        ...globals.mocha,
        ...globals.node,
        ...globals.es2024
      }
    }
  },
  {
    ignores: ['dist/**']
  }
];

export type ESLintAntfuConfig = ReturnType<typeof antfu>;
/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const createEslintConfig: typeof antfu = antfu;

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {ESLintAntfuConfig}
 * @param {string} dirname - The directory name to use for the config.
 */
export function eslintReactConfig(dirname: string): ESLintAntfuConfig {
  return antfu(
    {
      pnpm: true,
      react: true,
      typescript: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: dirname
        },
        overrides: overridesTsConfig
      },
      stylistic: {
        jsx: true,
        semi: true,
        overrides: overridesStylisticConfig
      },
      jsx: true,
      formatters: true,
      ...general
    }
  );
}

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {ESLintAntfuConfig}
 * @param {string} dirname - The directory name to use for the config.
 */
export function eslintNodeConfig(dirname: string): ESLintAntfuConfig {
  return antfu(
    {
      pnpm: true,
      react: false,
      typescript: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: dirname
        },
        overrides: overridesTsConfig
      },
      stylistic: {
        jsx: false,
        semi: true,
        overrides: overridesStylisticConfig
      },
      jsx: false,
      formatters: true,
      ...general
    }
  );
}
