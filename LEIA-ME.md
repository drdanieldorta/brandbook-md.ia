# MD.IA — ativos de marca

Este arquivo descreve os ativos em `public/assets/brand/`. A visão geral do repositório (biblioteca React, site, Storybook) está em `README.md`.

- `docs/brandbook.md`: guia técnico e status das recomendações (fonte de verdade documental).
- `docs/orientacoes-originais.txt`: orientações originais dos ativos.
- `docs/propostas-v1.md`: valores propostos para as lacunas do guia.
- `public/assets/brand/logos/`: SVGs, PNGs e as duas referências originais.
- `public/assets/brand/images/`: referências de fotografia e 3D geradas por IA.
- `public/assets/brand/templates/`: modelos SVG de slide, post e cartão.
- `public/assets/brand/tokens/`: JSON e CSS originais de apoio (os tokens vivos ficam em `packages/ui/src/tokens/`).

## Qual logo usar

A apresentação do guia prioriza `mdia-logo-limpo.svg` (componente `<Logo variant="limpo" />`). O arquivo `mdia-logo-referencia-sem-fundo-vetorizado.svg` é a reconstrução específica do PNG sem fundo enviado pelo usuário; trata-se de um desenho distinto da variante limpa do mestre. Não intercambiar silenciosamente.

Mestre com brilho: `mdia-logo-mestre.svg` (apenas sobre fundo escuro uniforme). Monocromáticos: off-white, preto, branco e monocromático (azul-noite). Os originais recebidos estão em `mdia-original.png` e `mdia-referencia-complementar.png`.

As imagens `direcao-foto.png` e `direcao-3d.png` são referências sintéticas, não fotos reais da equipe nem modelos 3D editáveis.

## Caminho público

Em projetos que servem `public` como raiz estática, o caminho público começa em `/assets/brand/`, sem `/public`. O site do brandbook usa exatamente essa pasta como `publicDir`.

## Origem

Brandbook convertido da versão local do guia 4.0. O TXT da Library não foi recuperado nem comparado. Os assets foram copiados sem alteração e conferidos por SHA-256.
