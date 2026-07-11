import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: {
    children: 'Agendar consulta',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Conhecer o escritório' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ver todas as áreas' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Excluir rascunho' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Enviando…' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Pequeno
      </Button>
      <Button {...args} size="md">
        Médio
      </Button>
      <Button {...args} size="lg">
        Grande
      </Button>
    </div>
  ),
};
