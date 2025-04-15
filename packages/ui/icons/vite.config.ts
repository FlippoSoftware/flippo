import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['./src/lib/'] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: fileURLToPath(import.meta.resolve('src/lib/', import.meta.dirname)),
      formats: ['es', 'cjs'],
      fileName: (config) => `icons.${config}.js`
    },
    rollupOptions: {
      external: ['react']
    }
  }
});
