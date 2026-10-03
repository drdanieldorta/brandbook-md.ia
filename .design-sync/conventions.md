# Convenções MD.IA (leia antes de compor)

Biblioteca React `@mdia/ui`, em `window.MdiaUi`. Identidade escura por padrão (proposta v2): página carvão `#0C0D0F`, texto off-white, azul `#5F96E8` em links e ações discretas; dourado em gradiente só na ação principal, em linhas e em ícones.

## Montagem

- Carregue `styles.css` (importa tokens, Inter e o CSS dos componentes). Sem ele nada tem estilo.
- Raiz de página: `<ThemeScope fill>` pinta o fundo escuro e define os tokens. Painel claro dentro da página: `<ThemeScope mode="light" inset>` (equivale a `.mdia-light` ou `data-theme="light"`). Não existe outro provider; os componentes são React puro.
- Ícones: `const { Icon, icons } = window.MdiaUi;` e `<Icon icon={icons.Sparkles} tone="gold" size={32} />`. `icons` traz 43 ícones lucide (Stethoscope, HeartPulse, ShieldCheck, Users, CalendarDays, TrendingUp…); `tone="gold"` é o traço em gradiente; `label` só quando o ícone tem significado próprio.

## Estilo: tokens, nunca classes novas

- Cores: `var(--mdia-color-bg)`, `--mdia-color-surface`, `--mdia-color-surface-alt`, `--mdia-color-surface-raised`, `--mdia-color-border`, `--mdia-color-border-strong`, `--mdia-color-text`, `--mdia-color-text-secondary`, `--mdia-color-text-disabled`, `--mdia-color-blue`, `--mdia-color-blue-hover`, `--mdia-color-gold`, `--mdia-color-success`, `--mdia-color-warning`, `--mdia-color-error`, `--mdia-color-info`. Ação principal: `--mdia-color-primary-bg` com `--mdia-color-primary-text`. Gradientes: `--mdia-gradient-gold`, `--mdia-gradient-gold-line`.
- Espaço: `--mdia-space-1` a `--mdia-space-9` (4, 8, 12, 16, 24, 32, 48, 64, 96px). Raio: `--mdia-radius-button` (8px), `--mdia-radius-panel` (16px), `--mdia-radius-full`. Sombras: `--mdia-shadow-sm`, `--mdia-shadow-md`, `--mdia-shadow-lg`. Tipo: `--mdia-font-family` (Inter) e `--mdia-font-size-display`, `-title`, `-heading`, `-subheading`, `-body-lg`, `-body`, `-body-sm`, `-caption`, `-label`, `-eyebrow`.
- Classes `mdia-*` pertencem aos componentes: não crie novas nem estilize por elas. Utilitários existentes: `mdia-visually-hidden`, `mdia-tone-gold`, `mdia-tone-brand`, `mdia-tone-secondary`, `mdia-tone-success`, `mdia-tone-warning`, `mdia-tone-error`, `mdia-align-start`, `mdia-align-center`, `mdia-align-end`.
- Layout próprio com os componentes: `Container` (`size` sm 720px, md 960px, lg 1200px, full), `Section` (`tone` default | alt | dark; `spacing` sm | md | lg), `Stack` (`direction`, `gap` 1 a 9), `Grid` (`columns` 1 | 2 | 3 | 4 | 6 | 12 ou `minItemWidth`), `Divider` (`tone="gold"`). Estilo inline só com `var(--mdia-*)`.

## Regras da marca

- Uma ação principal por contexto: `Button` padrão (gradiente dourado). `variant="secondary"` para contorno, `variant="ghost"` para ação discreta; `ButtonLink` quando navega.
- Dourado nunca sobre branco: `Badge tone="gold"` e `Eyebrow tone="gold"` só em áreas escuras; dentro de `ThemeScope mode="light"` use `tone="brand"`.
- Logo: `<Logo variant="limpo" />` em cabeçalho e rodapé, `variant="mestre"` só no herói escuro, `variant="offwhite"` quando o contraste pedir. Nunca recolorir; `width` mínimo 160.
- Estados (sucesso, alerta, erro, informação) ficam em `Alert`, `Toast` e `Badge` com os tokens de estado. Texto: `Heading` (`size` display | title | heading | subheading) e `Text` (`size`, `tone`, `weight`, `align`).

## Onde está a verdade

`styles.css` importa `_ds_bundle.css` (tokens no topo: `:root` escuro e `[data-theme='light']`). Por componente: `components/<grupo>/<Nome>/<Nome>.prompt.md` e `.d.ts`. Guia da marca: `guidelines/brandbook.md` (guia 4.0) e `guidelines/propostas-v1.md` (identidade escura v2 e lacunas preenchidas).

## Exemplo

```jsx
const {
  ThemeScope,
  SiteHeader,
  Hero,
  Eyebrow,
  Button,
  ButtonLink,
  Section,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Icon,
  icons,
  Logo,
  SiteFooter,
} = window.MdiaUi;

<ThemeScope fill>
  <SiteHeader
    links={[
      { label: 'Serviços', href: '#servicos', current: true },
      { label: 'Contato', href: '#contato' },
    ]}
    cta={
      <ButtonLink href="#contato" size="sm">
        Agendar conversa
      </ButtonLink>
    }
  />
  <Hero
    eyebrow={<Eyebrow tone="gold">Consultoria e mentoria</Eyebrow>}
    title="Inteligência humana. Potencial ampliado."
    lead="IA aplicada a negócios de saúde, com clareza e critério."
    actions={
      <>
        <Button>Agendar conversa</Button>
        <Button variant="ghost">Conhecer a mentoria</Button>
      </>
    }
    aside={<Logo variant="mestre" width="100%" />}
  />
  <Section tone="alt" aria-labelledby="servicos">
    <Grid columns={3} gap={5}>
      <Card elevated>
        <CardHeader>
          <Icon icon={icons.Stethoscope} tone="gold" size={32} />
          <Heading level={3} size="heading">
            Consultoria
          </Heading>
        </CardHeader>
        <CardBody>
          <Text tone="secondary">Visão estratégica para decidir onde a IA apoia a operação.</Text>
        </CardBody>
      </Card>
    </Grid>
  </Section>
  <SiteFooter legal="Conteúdo da MD.IA." />
</ThemeScope>;
```
