# MD.IA — arquivos para o GitHub

Copie o conteúdo desta pasta para a raiz do repositório. Se arquivos com os mesmos caminhos já existirem, compare antes de substituir.

- docs/brandbook.md: guia técnico e status das recomendações.
- docs/orientacoes-originais.txt: orientações originais dos ativos.
- public/assets/brand/logos/: SVGs, PNGs e as duas referências originais.
- public/assets/brand/images/: referências de fotografia e 3D geradas por IA.
- public/assets/brand/templates/: modelos SVG de slide, post e cartão.
- public/assets/brand/tokens/: JSON e CSS originais de apoio.

## Qual logo usar

A apresentação do guia prioriza mdia-logo-limpo.svg. O arquivo mdia-logo-referencia-sem-fundo-vetorizado.svg é a reconstrução específica do PNG sem fundo enviado pelo usuário; trata-se de um desenho distinto da variante limpa do mestre. Não intercambiar silenciosamente.

Mestre com brilho: mdia-logo-mestre.svg. Monocromáticos: offwhite, preto, branco e monocromatico (azul-noite). Os originais recebidos estão em mdia-original.png e mdia-referencia-complementar.png.

As imagens direcao-foto.png e direcao-3d.png são referências sintéticas, não fotos reais da equipe nem modelos 3D editáveis.

## Instrução para o Codex

Leia docs/brandbook.md e docs/orientacoes-originais.txt. Use os ativos em public/assets/brand e os tokens existentes, preservando o status das propostas e sem inventar valores ausentes. Inspecione a stack e adapte os caminhos à estrutura existente. Não redesenhe o logo nem troque suas variantes silenciosamente.

Em projetos que servem public como raiz estática, o caminho público começa em /assets/brand/, sem /public. Confirme esse comportamento na stack usada.

## Origem

Brandbook convertido da versão local do guia 4.0. O TXT da Library não foi recuperado nem comparado. Os assets foram copiados sem alteração e conferidos por SHA-256. Este pacote não foi enviado ao GitHub automaticamente.
