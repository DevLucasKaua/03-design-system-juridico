import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  args: {
    variant: 'trabalhista',
    children: 'Trabalhista',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['trabalhista', 'familia', 'consumidor', 'empresarial', 'neutro'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TodasAsAreas: Story = {
  name: 'Todas as áreas',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge variant="trabalhista">Trabalhista</Badge>
      <Badge variant="familia">Família</Badge>
      <Badge variant="consumidor">Consumidor</Badge>
      <Badge variant="empresarial">Empresarial</Badge>
      <Badge variant="neutro">Geral</Badge>
    </div>
  ),
};
