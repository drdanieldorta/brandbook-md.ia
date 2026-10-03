#!/usr/bin/env node
// Gera src/components/Logo/logos.generated.ts a partir dos SVGs oficiais em
// public/assets/brand/logos. A geometria, os gradientes e o filtro são copiados
// sem alteração; apenas <title>/<desc> são removidos (o componente define o
// texto alternativo) e os ids recebem um prefixo por variante, trocado em
// tempo de execução por um id único por instância para evitar colisões de
// url(#...) quando várias variantes convivem na mesma página.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = resolve(here, '../../../public/assets/brand/logos');
const OUT = resolve(here, '../src/components/Logo/logos.generated.ts');

const VARIANTS = {
  mestre: 'mdia-logo-mestre.svg',
  limpo: 'mdia-logo-limpo.svg',
  referencia: 'mdia-logo-referencia-sem-fundo-vetorizado.svg',
  offwhite: 'mdia-logo-offwhite.svg',
  preto: 'mdia-logo-preto.svg',
  branco: 'mdia-logo-branco.svg',
  monocromatico: 'mdia-logo-monocromatico.svg',
};
const MARK_FILE = 'mdia-favicon.svg';

function extract(file, prefix) {
  const svg = readFileSync(join(LOGOS_DIR, file), 'utf8');
  const open = /<svg\b[^>]*>/.exec(svg);
  const close = svg.lastIndexOf('</svg>');
  if (!open || close < 0) throw new Error(`${file}: raiz <svg> não encontrada`);
  const viewBox = /viewBox="([^"]+)"/.exec(open[0])?.[1];
  if (!viewBox) throw new Error(`${file}: viewBox ausente`);
  let body = svg.slice(open.index + open[0].length, close);
  body = body
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/g, '')
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/g, '');
  const ids = new Set([...body.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  body = body
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (m, id) => (ids.has(id) ? `url(#${prefix}${id})` : m))
    .replace(/\b(xlink:href|href)="#([^"]+)"/g, (m, attr, id) =>
      ids.has(id) ? `${attr}="#${prefix}${id}"` : m,
    )
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .trim();
  const paths = (svg.match(/\bd="[^"]+"/g) ?? []).length;
  return { file, viewBox, idPrefix: prefix, body, paths };
}

const sources = Object.fromEntries(
  Object.entries(VARIANTS).map(([variant, file]) => [
    variant,
    extract(file, `mdia-logo-${variant}-`),
  ]),
);
const mark = extract(MARK_FILE, 'mdia-logomark-');
// Marca monocromática: o mesmo contorno do M do favicon com preenchimento
// currentColor, sem gradiente nem realce (derivação análoga às variantes de
// uma tinta do logo completo).
const markMono = mark.body
  .replace(/<defs>[\s\S]*?<\/defs>/, '')
  .replace(/<path\b[^>]*realce-M[^>]*\/>/, '')
  .replace(/fill="url\(#[^)]+\)"/g, 'fill="currentColor"')
  .trim();

const lines = [
  '/* eslint-disable */',
  '// GERADO por scripts/generate-logos.mjs a partir de public/assets/brand/logos. Não editar.',
  '// Geometria e gradientes copiados sem alteração dos SVGs oficiais do guia 4.0.',
  '',
  'export interface LogoSource {',
  '  /** Arquivo de origem em public/assets/brand/logos. */',
  '  file: string;',
  '  viewBox: string;',
  '  /** Prefixo dos ids internos; o componente o troca por um id único por instância. */',
  '  idPrefix: string;',
  '  /** Conteúdo interno do <svg>, sem <title>/<desc>. */',
  '  body: string;',
  '}',
  '',
  `export type LogoVariant = ${Object.keys(VARIANTS)
    .map((v) => `'${v}'`)
    .join(' | ')};`,
  '',
  'export const LOGO_SOURCES: Record<LogoVariant, LogoSource> = {',
  ...Object.entries(sources).map(
    ([variant, s]) =>
      `  ${variant}: ${JSON.stringify({ file: s.file, viewBox: s.viewBox, idPrefix: s.idPrefix, body: s.body })},`,
  ),
  '};',
  '',
  `export const LOGO_MARK_SOURCE: LogoSource = ${JSON.stringify({ file: mark.file, viewBox: mark.viewBox, idPrefix: mark.idPrefix, body: mark.body })};`,
  '',
  '/** Contorno do M em uma tinta (currentColor), derivado do favicon oficial. */',
  `export const LOGO_MARK_MONO_BODY = ${JSON.stringify(markMono)};`,
  '',
];
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, lines.join('\n'));
console.error(
  `logos: ${Object.keys(sources).length} variantes + marca → ${OUT}\n` +
    Object.entries(sources)
      .map(([v, s]) => `  ${v.padEnd(14)} ${s.file} (${s.paths} paths)`)
      .join('\n'),
);
