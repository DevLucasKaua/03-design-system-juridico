import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Componentes/Textarea',
  component: Textarea,
  args: {
    label: 'Descreva seu caso',
    placeholder: 'Conte em poucas linhas o que aconteceu…',
    rows: 4,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
};

export const ComHint: Story = {
  args: {
    hint: 'Quanto mais detalhes, mais rápida a análise inicial.',
  },
};

export const ComErro: Story = {
  args: {
    defaultValue: 'ok',
    error: 'Descreva o caso com pelo menos 30 caracteres.',
  },
};
