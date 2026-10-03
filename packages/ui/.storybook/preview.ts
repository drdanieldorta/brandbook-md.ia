import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: {
      options: {
        carvao: { name: 'Carvão (padrão)', value: '#0c0d0f' },
        painel: { name: 'Painel escuro', value: '#17191d' },
        claro: { name: 'Claro (branco)', value: '#ffffff' },
        gelo: { name: 'Gelo', value: '#f3f6fa' },
        escuro: { name: 'Azul-noite', value: '#102b50' },
      },
    },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Marca', 'Texto', 'Ações', 'Formulários', 'Feedback', 'Layout', 'Página'],
      },
    },
  },
  initialGlobals: { backgrounds: { value: 'carvao' } },
  tags: ['autodocs'],
};

export default preview;
