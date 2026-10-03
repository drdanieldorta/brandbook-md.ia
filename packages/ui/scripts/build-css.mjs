#!/usr/bin/env node
// Empacota src/styles/index.css (fontes + tokens + base + componentes) em
// dist/styles.css, copiando os arquivos de fonte para dist/fonts/. Também
// publica dist/tokens.css e dist/tokens.json para consumo isolado.
import { build } from 'esbuild';
import { cpSync, mkdirSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
await build({
  entryPoints: ['src/styles/index.css'],
  bundle: true,
  outfile: 'dist/styles.css',
  loader: { '.woff2': 'file', '.woff': 'file' },
  assetNames: 'fonts/[name]',
  logLevel: 'info',
});
cpSync('src/tokens/tokens.css', 'dist/tokens.css');
cpSync('src/tokens/tokens.json', 'dist/tokens.json');
console.error('css: dist/styles.css, dist/tokens.css, dist/tokens.json');
