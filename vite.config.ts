import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build'
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: ['./src/settings/styles/'],
        style: 'compressed'
      }
    }
  },
  envPrefix: 'FLIPPO_',
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [
    react({
      babel: {
        plugins: ['effector/babel-plugin']
      }
    })
  ],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@modules': '/src/modules',
      '@pages': '/src/pages',
      '@settings': '/src/settings',
      '@shared': '/src/shared',
      '@widgets': '/src/widgets'
    }
  },
  server: {
    host: '0.0.0.0', //'127.0.0.1',
    port: 3030
  }
});
