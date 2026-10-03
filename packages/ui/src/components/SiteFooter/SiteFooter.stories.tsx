import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from './SiteFooter';

const columns = [
  {
    title: 'Marca',
    links: [
      { label: 'Essência', href: '#essencia' },
      { label: 'Logo', href: '#logo' },
      { label: 'Cores', href: '#cores' },
    ],
  },
  {
    title: 'Sistema',
    links: [
      { label: 'Componentes', href: '#componentes' },
      { label: 'Tokens', href: '#tokens' },
      { label: 'Storybook', href: '/storybook/', external: true },
    ],
  },
  {
    title: 'Documentos',
    links: [
      { label: 'Brandbook técnico', href: 'docs/brandbook.md' },
      { label: 'Propostas v1', href: 'docs/propostas-v1.md' },
    ],
  },
];

const meta = {
  title: 'Página/SiteFooter',
  component: SiteFooter,
  args: {
    tone: 'dark',
    description:
      'Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde.',
    columns,
    legal: 'Conversão documental do guia 4.0. Não constitui nova aprovação da marca.',
  },
  argTypes: {
    tone: { control: 'radio', options: ['dark', 'default'] },
    logo: { control: false },
    children: { control: false },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Azul-noite com logo off-white, três colunas de links (cada uma um `nav` nomeado
 * pelo título) e a linha legal. "Storybook" é externo: abre em nova aba com aviso.
 */
export const Padrao: Story = {};

/** Tom claro: superfície branca, borda superior e logo limpo. */
export const Claro: Story = {
  args: { tone: 'default' },
};

/** Mínimo: só o logo e a linha legal. */
export const Minimo: Story = {
  args: { description: undefined, columns: [] },
};
