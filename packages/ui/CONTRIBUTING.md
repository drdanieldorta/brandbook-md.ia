# Convenções do @mdia/ui

Leia antes de criar ou alterar componentes. O objetivo é fidelidade ao guia 4.0
(`docs/brandbook.md`) com qualidade de produção.

## Fonte de verdade

- Valores do guia são lei: cores, tipografia, espaçamento, raios, movimento, toque de 44px, foco de 3px.
- O que o guia não define só entra como **proposta v1** rotulada (ver `src/tokens/tokens.json` → `proposals`).
- Nunca invente aprovação, contatos, métricas, depoimentos ou resultados clínicos no conteúdo das stories.
- Logo: use sempre `Logo`/`LogoMark`. Nunca redesenhe o lettering, nunca use texto no lugar do logo.

## Anatomia de um componente

```
src/components/<Name>/
  <Name>.tsx          componente (export nomeado, forwardRef quando houver elemento nativo focável)
  <Name>.css          estilos, classes .mdia-<name>, .mdia-<name>--modificador, .mdia-<name>__parte
  <Name>.stories.tsx  CSF3, título "<Grupo>/<Name>", conteúdo em pt-BR
  <Name>.test.tsx     Vitest + Testing Library
  index.ts            export * from './<Name>'
```

Regras:

- **Sem CSS no TSX** (nenhum `import './X.css'`). A folha única `src/styles/index.css` importa cada CSS; `src/index.ts` exporta cada componente. Quem integra o componente adiciona as duas linhas.
- **Só tokens**: cores, espaços, raios, movimento e foco vêm de `var(--mdia-*)` (ver `src/tokens/tokens.css`). Nenhum hex novo em CSS de componente. Exceção: `transparent`, `currentColor`, `rgba()` derivado de um token quando inevitável, com comentário.
- **Nomes**: classes `.mdia-*` em inglês; props em inglês (`variant`, `size`, `tone`); textos, docs e stories em pt-BR.
- **Foco**: `:focus-visible { outline: var(--mdia-focus-ring); outline-offset: var(--mdia-focus-ring-offset); }`.
- **Toque**: controles interativos com 44px de altura mínima (ou área de toque equivalente, ver `Button--sm`).
- **Estados nunca só por cor** (guia §7): combine ícone, rótulo ou texto. Ícones vêm de `lucide-react`, sempre `aria-hidden` quando decorativos.
- **Tema escuro**: respeite `.mdia-dark`/`[data-theme='dark']` usando os tokens semânticos (`--mdia-color-surface`, `--mdia-color-text`, `--mdia-color-border`), não cores fixas.
- **Movimento**: só transições de feedback (`--mdia-motion-feedback`) e entradas únicas (`--mdia-motion-entrance`); nada cíclico além do `Spinner`. `prefers-reduced-motion` já é tratado em `base.css`.
- **Acessibilidade**: rótulo acessível obrigatório (label visível, `aria-label` ou `aria-labelledby`), `aria-describedby` para dicas e erros, `aria-invalid` em erro, `role`/`aria-live` em feedback.
- Tipagem estrita (`noUncheckedIndexedAccess`), `import type` para tipos, nada de `any`.
- `cx()` de `src/utils/cx.ts` para compor classes.

## Stories

- `title: '<Grupo>/<Name>'` com grupos: `Marca`, `Texto`, `Ações`, `Formulários`, `Feedback`, `Layout`, `Página`.
- Primeira story = caso padrão. Depois: variantes, tamanhos, estados (inclusive erro, desabilitado, carregando), composição realista e, quando fizer sentido, `SobreFundoEscuro` com `globals: { backgrounds: { value: 'escuro' } }` e um wrapper `className="mdia-dark"`.
- Conteúdo de exemplo alinhado ao guia: "Agendar conversa", "Conhecer a mentoria", "Ver detalhes", "Alterações salvas.", "Não foi possível salvar. Tente novamente.", "Salvando…", frases "Inteligência humana. Potencial ampliado." etc.
- Comentário JSDoc acima da story vira descrição na documentação.

## Testes

- Renderização e papel acessível (`getByRole`), props que mudam classes/atributos, interação com `userEvent`, estados (erro, desabilitado).
- Nada de snapshots.

## Comandos permitidos durante o desenvolvimento

```bash
pnpm --filter @mdia/ui typecheck
pnpm --filter @mdia/ui exec vitest run src/components/<Name>
pnpm lint
```

`pnpm build` e `pnpm build-storybook` ficam para a integração final.
