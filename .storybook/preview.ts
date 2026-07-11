import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';
import './preview.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Violações de a11y quebram o test run (não só warning)
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Introdução', 'Fundações', 'Componentes'],
      },
    },
  },
};

export default preview;
