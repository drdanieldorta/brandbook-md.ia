import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ui = (path: string) =>
  fileURLToPath(new URL(`../../packages/ui/src/${path}`, import.meta.url));

// O site consome a biblioteca direto do código-fonte (sem build intermediário).
// BASE_PATH é definido pelo workflow do GitHub Pages (ex.: /brandbook-md.ia/).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  publicDir: fileURLToPath(new URL('../../public', import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@mdia/ui/styles.css', replacement: ui('styles/index.css') },
      { find: '@mdia/ui', replacement: ui('index.ts') },
    ],
  },
  build: { outDir: 'dist', emptyOutDir: true },
});
