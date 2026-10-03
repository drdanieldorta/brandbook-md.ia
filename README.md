# MD.IA — Brandbook e design system

Identidade visual da MD.IA (consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde) como código: tokens, componentes React, Storybook e o site do brandbook.

| Pasta                  | O que é                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `packages/ui`          | `@mdia/ui`: tokens e componentes React derivados do guia 4.0, com Storybook e testes.          |
| `apps/brandbook`       | Site do brandbook, construído apenas com `@mdia/ui`.                                           |
| `docs/`                | `brandbook.md` (fonte de verdade documental), `orientacoes-originais.txt` e `propostas-v1.md`. |
| `public/assets/brand/` | Ativos oficiais: logos (SVG/PNG), modelos, tokens originais, referências de fotografia e 3D.   |

## Princípios

- **O guia 4.0 manda.** Cores, tipografia, espaçamento, raios, movimento, área de toque e foco vêm de `docs/brandbook.md` sem alteração.
- **Identidade escura por padrão (proposta v2).** Carvão em camadas, dourado em gradiente e azul clareado, derivados do playbook MD.IA. O tema claro do guia 4.0 fica disponível por escopo (`data-theme="light"` ou `className="mdia-light"`). Detalhes e contrastes em `docs/propostas-v1.md`.
- **Lacunas viram propostas, nunca fatos.** O que o guia não define (estados semânticos, elevação, breakpoints, tema escuro, fonte embarcada) está rotulado como _proposta v1_ em `docs/propostas-v1.md` e em `tokens.json → proposals`, aguardando validação da marca.
- **O logo é intocável.** `Logo` e `LogoMark` renderizam os SVGs oficiais sem alterar geometria, gradientes ou filtro. Testes garantem que todos os paths originais continuam presentes.

## Como rodar

Requisitos: Node 22 (`.nvmrc`) e pnpm 10 (`corepack enable`).

```bash
pnpm install
pnpm dev              # site do brandbook em http://localhost:5173
pnpm storybook        # catálogo de componentes em http://localhost:6006
pnpm test             # testes da biblioteca
pnpm lint && pnpm typecheck && pnpm format:check
pnpm build            # dist/ da biblioteca + site
pnpm build:storybook  # packages/ui/storybook-static
```

## Usar a biblioteca

```tsx
import '@mdia/ui/styles.css';
import { Button, Heading, Logo, Text } from '@mdia/ui';

export function Chamada() {
  return (
    <section>
      <Logo variant="limpo" width={280} />
      <Heading level={1}>Inteligência humana. Potencial ampliado.</Heading>
      <Text measure>Consultoria oferece visão estratégica; mentoria desenvolve autonomia.</Text>
      <Button>Agendar conversa</Button>
    </section>
  );
}
```

- Uma única folha de estilo: `@mdia/ui/styles.css` (fontes Inter, tokens `--mdia-*`, base e componentes). Também disponíveis `@mdia/ui/tokens.css` e `@mdia/ui/tokens.json`.
- Tema escuro é o padrão. Tema claro do guia por escopo: `className="mdia-light"` ou `data-theme="light"`.
- Convenções para criar componentes: `packages/ui/CONTRIBUTING.md`.

## Publicação

O workflow `.github/workflows/pages.yml` publica o site na raiz e o Storybook em `/storybook/` a cada push em `main`. Uma vez, em **Settings → Pages**, selecione **Source: GitHub Actions**.

## Claude Design

A biblioteca é sincronizada com o projeto "MD.IA Design System" no claude.ai/design via `/design-sync`; a configuração fica em `.design-sync/`.

## Status

Este repositório implementa o conteúdo existente do guia 4.0 e não constitui nova aprovação da marca. Pendências e diferenças conhecidas estão em `docs/brandbook.md` (§12 e §13) e em `docs/propostas-v1.md`.
