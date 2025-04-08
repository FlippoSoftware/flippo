import type { ESLintAntfuConfig } from './src';
import { eslintNodeConfig } from './src';

/** @type {import("eslint").Linter.Config} */
export default eslintNodeConfig(import.meta.dirname) as ESLintAntfuConfig;
