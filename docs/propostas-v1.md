# Propostas v2 e v1 — valores que o guia 4.0 não define

## Proposta v2 — identidade escura (playbook MD.IA)

Status: **proposta, adotada como padrão da biblioteca por decisão do proprietário da marca (outubro de 2026)**. Derivada do playbook "Crie slides no ChatGPT". O tema claro do guia 4.0 continua disponível por escopo (`data-theme="light"` ou `.mdia-light`), e os valores de marca do guia permanecem intactos nos tokens `--mdia-brand-*`.

| Papel                                   | Valor                                                                                                   | Contraste (WCAG)                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Página (carvão 900)                     | `#0C0D0F`                                                                                               | —                                                                                    |
| Faixa alternativa (carvão 800)          | `#101114`                                                                                               | —                                                                                    |
| Painéis, cabeçalho, campos (carvão 700) | `#17191D`                                                                                               | —                                                                                    |
| Cards e elementos elevados (carvão 600) | `#202329`                                                                                               | —                                                                                    |
| Linhas                                  | `#33363D`                                                                                               | só divisores e cards                                                                 |
| Borda de controles                      | `#767C88`                                                                                               | 3,8:1 sobre carvão 600; 4,2:1 sobre 700; 4,6:1 sobre 900                             |
| Texto                                   | `#F1EEE8`                                                                                               | 13,6:1 a 16,8:1                                                                      |
| Texto secundário                        | `#ADB2BB`                                                                                               | 7,4:1 a 9,1:1                                                                        |
| Texto desabilitado                      | `#7C8189`                                                                                               | 4,0:1 a 5,0:1 (inativo)                                                              |
| Azul sobre carvão                       | `#5F96E8` (hover `#84AEEC`)                                                                             | 5,3:1 a 6,5:1; o azul vivo do guia `#1761D8` fica em 2,8:1 a 3,5:1, por isso clareia |
| Dourado sobre carvão                    | `#E3B777`                                                                                               | 8,5:1 a 10,5:1                                                                       |
| Texto sobre o gradiente dourado         | `#17130D`                                                                                               | 8,1:1 a 16,3:1 nas paradas do gradiente                                              |
| Gradiente dourado                       | `linear-gradient(115deg, #D8AA6B 0%, #F2C777 24%, #FFF1B6 42%, #DCA05E 63%, #FFE5A2 82%, #D8AA6B 100%)` | botão principal, linhas e ícones (traço)                                             |
| Estados no escuro                       | sucesso `#4CC38A`, alerta `#E3C06E`, erro `#F08A7E`, informação `#5F96E8`                               | 5,8:1 a 11,1:1                                                                       |

Regras adotadas:

- Ação principal: gradiente dourado com texto escuro; secundária com contorno off-white; discreta em azul clareado.
- Ícones de marca (`Icon tone="gold"`): traço em gradiente dourado dentro do próprio SVG; ícones semânticos (sucesso, erro) mantêm as cores de estado. O conjunto `icons` (43 ícones lucide para saúde, gestão e navegação) é exportado pela biblioteca.
- Kicker (`Eyebrow`): caixa alta de 13px com ponto roxo (azul) ou dourado.
- Logo: variante limpa no cabeçalho e no rodapé escuros, mestre com brilho no herói; off-white quando o contraste pedir.
- O azul-noite `#102B50` deixa de ser o fundo escuro e permanece cor de marca (lettering do logo e tema claro).
- Escopo de tema: `ThemeScope` (`mode="dark" | "light"`, `inset`, `fill`) pinta fundo e texto e redefine os tokens da área envolvida; é o invólucro das amostras no Claude Design e a forma recomendada de abrir um painel claro em uma página escura.

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

| Token                                        | Valor                     | Contraste                                                                                                             |
| -------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Texto secundário                             | `#57677B`                 | 5,78:1 sobre branco; 5,34:1 sobre gelo                                                                                |
| Texto desabilitado                           | `#536278` sobre `#DDE4ED` | 4,84:1                                                                                                                |
| Borda                                        | `#DDE4ED`                 | 1,3:1 sobre branco: só para cards, divisores e tabelas                                                                |
| Borda de controles (campos, caixas, trilhos) | `#75849A`                 | 3,80:1 sobre branco; 3,51:1 sobre gelo; 3,72:1 sobre azul-noite (mínimo 3:1 para limites de componentes, WCAG 1.4.11) |
| Hover do secundário                          | `#E9F0F9`                 | azul-noite sobre ele: 12,3:1                                                                                          |
| Hover da ação discreta                       | `#EDF3FD`                 | azul vivo sobre ele: 5,04:1                                                                                           |

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
