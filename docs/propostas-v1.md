# Propostas v1 — valores que o guia 4.0 não define

Status: **proposta, aguardando validação da marca**. Nada aqui altera um valor do guia; tudo preenche lacunas listadas em `brandbook.md` §13 ("Lacunas que permanecem abertas"). Cada item está marcado como proposta em `packages/ui/src/tokens/tokens.css` e em `tokens.json → proposals`.

Contrastes calculados pela fórmula WCAG 2.x (relação mínima 4,5:1 para texto comum, 3:1 para componentes e texto grande).

## 1. Tipografia

| Proposta              | Valor                                                                                                       | Motivo                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Família               | **Inter** (variável, SIL OFL), embarcada em `@mdia/ui/styles.css`; fallback `"Segoe UI", Arial, sans-serif` | A Segoe UI é proprietária e não pode ser redistribuída. A Inter garante o mesmo desenho em qualquer sistema e no Claude Design. |
| Níveis intermediários | heading 24px, subheading 20px, caption 12px (peso 600/600/400)                                              | O guia define display, título, corpo e rótulo; páginas reais precisam de h3/h4 e legendas.                                      |
| Entrelinha "tight"    | 1,3                                                                                                         | Subtítulos e rótulos; o guia só define 1,1 (títulos) e 1,6 (corpo).                                                             |
| Medida de linha       | 65ch                                                                                                        | Dentro do intervalo 45–75 caracteres do guia.                                                                                   |

## 2. Neutros de interface (observados na demonstração do guia)

| Token                  | Valor                     | Contraste                              |
| ---------------------- | ------------------------- | -------------------------------------- |
| Texto secundário       | `#57677B`                 | 5,78:1 sobre branco; 5,34:1 sobre gelo |
| Texto desabilitado     | `#536278` sobre `#DDE4ED` | 4,84:1                                 |
| Borda                  | `#DDE4ED`                 | —                                      |
| Hover do secundário    | `#E9F0F9`                 | azul-noite sobre ele: 12,3:1           |
| Hover da ação discreta | `#EDF3FD`                 | azul vivo sobre ele: 5,04:1            |

## 3. Superfícies escuras

| Token                           | Valor                          | Contraste                      |
| ------------------------------- | ------------------------------ | ------------------------------ |
| Superfície escura               | `#102B50` (azul-noite do guia) | off-white sobre ele: 12,8:1    |
| Camada mais escura              | `#0B1F3A`                      | texto secundário escuro: 9,4:1 |
| Camada mais clara               | `#1A3A66`                      | off-white: 10,3:1              |
| Texto secundário sobre escuro   | `#B8C4D6`                      | 8,0:1                          |
| Texto desabilitado sobre escuro | `#8D9BB0`                      | 5,0:1                          |

Regra de uso: sobre fundo escuro, o botão principal azul mantém texto branco (5,6:1), mas sua borda contra o azul-noite fica em 2,5:1. Prefira o secundário (contorno off-white) como ação principal em faixas escuras, como fazia a demonstração do guia.

## 4. Estados semânticos

| Estado     | Texto/ícone                    | Fundo     | Contrastes                                |
| ---------- | ------------------------------ | --------- | ----------------------------------------- |
| Sucesso    | `#1E7B4E`                      | `#E6F4EC` | 5,25:1 sobre branco; 4,63:1 sobre o fundo |
| Alerta     | `#8A6A1F` (dourado escurecido) | `#FBF4E3` | 5,05:1; 4,60:1                            |
| Erro       | `#C0392B`                      | `#FBEAE7` | 5,44:1; 4,67:1                            |
| Informação | `#1761D8` (azul vivo)          | `#E8F0FC` | 5,62:1; 4,90:1                            |

No tema escuro: sucesso `#4CC38A` (6,4:1), alerta `#E3C06E` (8,1:1), erro `#F08A7E` (5,8:1) sobre azul-noite. Estados sempre combinam ícone e texto, nunca só cor (guia §7).

## 5. Elevação, camadas e layout

| Proposta             | Valor                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Sombras              | sm `0 1px 2px rgba(16,43,80,.08)`, md `0 4px 12px rgba(16,43,80,.12)`, lg `0 6px 25px rgba(0,0,0,.13)` (toast da demonstração) |
| Camadas              | dropdown 1000, sticky 1100, overlay 1300, modal 1400, toast 1500                                                               |
| Breakpoints          | sm 640, md 768, lg 1024, xl 1280 px (a demonstração usava 700/780/1100/1600 em escopos distintos)                              |
| Container            | máximo 1200px, gutter 24px                                                                                                     |
| Raio "full"          | 999px, para badges e alternâncias                                                                                              |
| Deslocamento do foco | 2px (contorno de 3px roxo é do guia)                                                                                           |

## 6. Ícones

`lucide-react` (licença ISC), sempre decorativos (`aria-hidden`) ao lado de um rótulo. O guia não define sistema de ícones.

## 7. O que continua em aberto

Fonte original do lettering do logo; Pantone, perfis ICC, CMYK de produção e sangria; parâmetros físicos de 3D; animações além dos tempos e easing documentados. Nada disso foi inventado.
