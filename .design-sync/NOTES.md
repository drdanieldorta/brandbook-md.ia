# Notas do design-sync (MD.IA)

Gotchas deste repositório para a próxima sincronização. Leia antes de rodar.

## Ambiente e comandos

- [GENERAL] Chromium: o playwright instalado em `.ds-sync/` não encontra o build que espera; exporte `DS_CHROMIUM_PATH=/opt/pw-browsers/chromium` (ambiente claude.ai) antes de `package-validate.mjs`, `compare.mjs`, `preview-rebuild.mjs` e `resync.mjs`.
- [GENERAL] Monorepo pnpm: `--node-modules packages/ui/node_modules` (react/react-dom são symlinks lá) e `--entry packages/ui/dist/index.js`; rodar `pnpm build:ui` antes (gera dist com `.d.ts`, `styles.css` e `fonts/`).
- [GENERAL] Storybook de referência: `cd packages/ui && npx storybook build -c .storybook -o <raiz>/.design-sync/sb-reference` (saída na raiz do repo; não usar o script `build-storybook`, que escreve em `storybook-static`). Reconstruir sempre que `packages/ui/src` mudar; o bundle (`dist`) e a referência precisam andar juntos.
- [GENERAL] `cssEntry: dist/styles.css` traz as 4 faces da Inter com `url(./fonts/...)`; o conversor copia os woff2 para `fonts/` e descarta os blocos duplicados em `_ds_bundle.css` ("4 dead @font-face block(s) dropped" é esperado).
- [GENERAL] ESLint da raiz ignora `.design-sync/**` (referência e caches têm milhares de arquivos gerados); Prettier respeita o `.gitignore`.
- Guidelines enviadas: `docs/brandbook.md` e `docs/propostas-v1.md` via `guidelinesGlob` (caminhos `../../docs/...`, dentro do repositório).
- [GENERAL] `provider`: `ThemeScope` (`inset: true`) é o invólucro de todo preview. O harness pinta `body{background:#fff}` fixo (lib/emit.mjs) e, com o tema escuro no `:root`, texto off-white ficava invisível; o provider pinta o painel escuro dentro de cada célula. Trocar o provider re-avalia os 33 componentes.
- [GENERAL] `readmeHeader: .design-sync/conventions.md` (cabeçalho do README para o agente do Claude Design). Nomes citados nele foram validados contra `_ds_bundle.css`, `components/<grupo>/<Nome>/*.d.ts` e os exports de `dist/index.cjs`; revalidar a cada sync.
- `icons` (namespace com 43 ícones lucide) é export da biblioteca; aparece no bundle como `window.MdiaUi.icons` e não vira card (nome minúsculo).

## Enquadramento das folhas de comparação (não são defeitos)

- [GENERAL] A captura do Storybook recorta o elemento raiz da story e a do preview é o viewport inteiro (900×700, `fullPage: false`); a folha limita os dois painéis a 480px, por isso o lado do Storybook parece ~2x maior. Nos PNGs em `raw/` os tamanhos em px são iguais: julgar lá quando a escala confundir.
- [GENERAL] O Storybook renderiza tudo sob `parameters.layout: 'centered'` (raiz flex que encolhe ao conteúdo); o preview monta a story num bloco de largura total. Layouts que dependem da largura do container (grades `repeat(n, auto)`/`1fr`/`auto-fit`, controles `fullWidth`, wrappers com padding) ficam mais largos no preview: enquadramento quando o conteúdo é idêntico. Quando o próprio componente estica (Badge: pílulas viravam barras), corrigir a story para não depender do container (colunas `max-content`), nunca com preview próprio.
- [GENERAL] Stories `layout: 'fullscreen'` (Container, Section): o preview tem moldura de 24px; julgar gutters relativos a ela.
- [GENERAL] Stories altas (Section/Tons, Grid/Fluida) aparecem cortadas embaixo no painel do preview: limite do viewport de captura. Para conferir o restante, servir `ds-bundle` com `.ds-sync/storybook/http-serve.mjs` e capturar `components/<grupo>/<Nome>/<Nome>.html?story=<Export>` num viewport mais alto (feito: renders completos idênticos).
- Toast/Empilhados e ToastStack usam `position: fixed`: a captura do Storybook recorta o elemento raiz e sai vazia enquanto o preview mostra a pilha; não é erro de render (sem sb-error). Grade pelo preview.
- Stories de controles que espalham `{...args}` com `disabled: false` sobre um `<Field disabled>` mantêm o controle habilitado dos dois lados (prop explícita vence o contexto): comportamento da story, consistente.

## Stories e tema

- [GENERAL] Stories que dependem só do global `backgrounds` do Storybook renderizam sobre o fundo padrão da página do preview; toda story de fundo específico precisa do próprio wrapper (`className="mdia-dark"` ou `"mdia-light"`). Corrigido em Logo/MestreComBrilho.
- Desde a identidade v2, o tema escuro é o padrão (`:root`): as stories `SobreFundoEscuro` ficam iguais ao padrão (inofensivas); o tema claro do guia aparece nas stories `SobreFundoClaro` (wrapper `.mdia-light`).
- Cards de apresentação: Badge, Grid, Hero, SiteHeader e Heading em `cardMode: column` (stories mais largas que a célula); Toast e ToastStack em `cardMode: single` (posição fixa) com `primaryStory` Padrao / InferiorDireita.
- Limite de stories (`[STORY_CAP]`, padrão 6): Button foi avaliado com `--max-stories 10`; Field (8), Radio (8) e Card (7) têm cauda não avaliada individualmente (stories de fundo escuro/composição), verificadas por amostragem fora do contrato de grade.
- Hero/Claro e SiteFooter/Claro envolvem a story em `ThemeScope mode="light"` (tons `default`/`alt` são relativos ao tema; sem o escopo a story "clara" renderizava escura). Icon/Biblioteca itera `icons` (43 ícones, 6 colunas `max-content`).
- Checkbox, Radio e Switch em `cardMode: column`: com o respiro do provider (24px) as células do grid ficaram estreitas e o validador apontou `[GRID_OVERFLOW]`.

## Re-sync risks

- A identidade v2 (escuro por padrão) foi adotada após a primeira rodada de grades; o bundle, a referência e as capturas foram refeitos e as stories alteradas (Badge, Divider, Logo) e novas (Icon, Eyebrow) reavaliadas; as demais carregaram os grades com spot-check. Qualquer mudança de token repinta todos os previews: rode o driver e confira os `[SPOT_CHECK]`.
- Nenhum preview próprio em `.design-sync/previews/` (todos gerados): uma story nova ou alterada basta para re-derivar.
- Fontes: Inter embarcada a partir de `@fontsource-variable/inter`; se o pacote mudar de versão, os nomes dos woff2 em `dist/fonts/` mudam junto (o build copia tudo).
- Toolchain assumida: Node 22, pnpm 10, Storybook 10, Vite 8, esbuild 0.28; chromium pré-instalado em `/opt/pw-browsers`.
- O índice de componentes do README gerado perde acentos ("Boto", "cone"): regex ASCII `\w` em `.ds-sync/lib/dts.mjs` (resumo do JSDoc). Os `.prompt.md` e `.d.ts` mantêm os acentos. Não forkar dts.mjs só por isso; o cabeçalho de convenções cobre a visão geral.
- Depois de qualquer mudança no bundle, cada rodada completa do `compare.mjs` sorteia 2 componentes já avaliados como canário (`[SPOT_CHECK]`): ler as folhas e confirmar; as notas ficam. Não re-rodar o compare em loop esperando "0 awaiting": cada rodada sorteia mais 2 até todos terem a base nova.
- `SiteHeader.d.ts` gerado não inclui a interface `SiteHeaderLink` (`label`, `href`, `current?`, `external?`): conferir no fonte ao citar props de links.
