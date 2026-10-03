import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: {
      options: {
        claro: { name: 'Claro (branco)', value: '#ffffff' },
        gelo: { name: 'Gelo', value: '#f3f6fa' },
        escuro: { name: 'Escuro (azul-noite)', value: '#102b50' },
      },
    },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Marca', 'Texto', 'Ações', 'Formulários', 'Feedback', 'Layout', 'Página'],
      },
    },
  },
  initialGlobals: { backgrounds: { value: 'claro' } },
  tags: ['autodocs'],
};

export default preview;
