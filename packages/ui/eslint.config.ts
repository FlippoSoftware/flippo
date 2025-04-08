import type { ESLintAntfuConfig } from '@flippo/eslint';
import { eslintReactConfig } from '@flippo/eslint';

/** @type {import("eslint").Linter.Config} */
export default eslintReactConfig(import.meta.dirname) as ESLintAntfuConfig;
