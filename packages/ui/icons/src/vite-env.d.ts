/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_FIGMA_TOKEN: string;
  readonly VITE_FIGMA_FILE: string;
  readonly VITE_FIGMA_IDS: string;
  readonly VITE_FIGMA_PAGES: string;
  readonly VITE_FIGMA_DEPTH: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
