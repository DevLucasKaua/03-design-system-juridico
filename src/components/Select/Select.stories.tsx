import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const areas = (
  <>
    <option value="">Selecione a área</option>
    <option value="trabalhista">Direito Trabalhista</option>
    <option value="familia">Direito de Família</option>
    <option value="consumidor">Direito do Consumidor</option>
    <option value="empresarial">Direito Empresarial</option>
  </>
);

const meta = {
  title: 'Componentes/Select',
  component: Select,
  args: {
    label: 'Área do seu caso',
    children: areas,
  },
  argTypes: {
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
};

export const ComHint: Story = {
  args: {
    hint: 'Não sabe a área? Escolha a mais próxima — nós redirecionamos.',
  },
};

export const ComErro: Story = {
  args: {
    error: 'Selecione uma área para continuar.',
    required: true,
  },
};
