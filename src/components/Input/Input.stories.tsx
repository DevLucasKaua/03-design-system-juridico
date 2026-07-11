import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Componentes/Input',
  component: Input,
  args: {
    label: 'Nome completo',
    placeholder: 'Maria da Silva',
  },
  argTypes: {
    icon: { table: { disable: true } },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
};

export const ComHint: Story = {
  args: {
    label: 'WhatsApp',
    placeholder: '(11) 98765-4321',
    hint: 'Usamos só para retornar seu contato — nada de spam.',
    type: 'tel',
  },
};

export const ComErro: Story = {
  args: {
    label: 'E-mail',
    type: 'email',
    defaultValue: 'maria@',
    error: 'Informe um e-mail válido.',
    hint: 'Enviaremos a confirmação da consulta por aqui.',
  },
};

export const Obrigatorio: Story = {
  name: 'Obrigatório',
  args: {
    label: 'Nome completo',
    required: true,
  },
};

export const ComIcone: Story = {
  name: 'Com ícone',
  args: {
    label: 'Buscar processo',
    placeholder: 'Número do processo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
};

export const Desabilitado: Story = {
  args: {
    label: 'CPF',
    defaultValue: '123.456.789-00',
    disabled: true,
    hint: 'Preenchido automaticamente a partir do cadastro.',
  },
};
