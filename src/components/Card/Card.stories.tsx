import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card } from './Card';

const meta = {
  title: 'Componentes/Card',
  component: Card,
  args: {
    interactive: false,
  },
  argTypes: {
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Completo: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 420 }}>
      <Card.Header>Rescisão indireta</Card.Header>
      <Card.Body>
        <p style={{ margin: 0 }}>
          Quando o empregador descumpre obrigações do contrato, o empregado pode encerrar o vínculo
          com os mesmos direitos de uma demissão sem justa causa.
        </p>
      </Card.Body>
      <Card.Footer>
        <Badge variant="trabalhista">Trabalhista</Badge>
        <Button variant="ghost" size="sm" style={{ marginLeft: 'auto' }}>
          Saiba mais
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const SoBody: Story = {
  name: 'Só body',
  render: (args) => (
    <Card {...args} style={{ maxWidth: 420 }}>
      <Card.Body>
        <p style={{ margin: 0 }}>
          Card mínimo: só o corpo, sem header nem footer. Útil para listas e métricas.
        </p>
      </Card.Body>
    </Card>
  ),
};

export const Interativo: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 420 }}>
      <Card.Header>Card interativo</Card.Header>
      <Card.Body>
        <p style={{ margin: 0 }}>Passe o mouse: a sombra eleva com a curva easeOutQuint.</p>
      </Card.Body>
    </Card>
  ),
};
