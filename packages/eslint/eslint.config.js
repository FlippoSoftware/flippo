import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);
const { eslintNodeConfig } = await jiti.import('./src/index.ts');

/** @type {import("./src/index.js").ESLintAntfuConfig[]} */
export default eslintNodeConfig(import.meta.dirname);
