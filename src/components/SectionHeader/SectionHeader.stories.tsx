import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Componentes/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Cabeçalho de seção com a headline em dois tons da referência visual: eyebrow uppercase, parte forte em tinta cheia + continuação em tom rebaixado, e subheadline em lead. `as` controla o nível semântico (h1–h3); `size` controla o visual.',
      },
    },
  },
  args: {
    eyebrow: 'Advocacia imobiliária · São Paulo',
    title: 'Confiança se constrói,',
    titleMuted: 'com método e transparência',
    subtitle: 'Análise inicial gratuita do seu caso, sem promessas vazias — só o que a lei garante.',
    as: 'h2',
    size: 'lg',
    tone: 'light',
    align: 'start',
  },
  argTypes: {
    as: { control: 'inline-radio', options: ['h1', 'h2', 'h3'] },
    size: { control: 'inline-radio', options: ['xl', 'lg', 'md'] },
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
    align: { control: 'inline-radio', options: ['start', 'center'] },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoisTons: Story = {
  name: 'Dois tons (padrão)',
};

export const Centralizado: Story = {
  args: {
    align: 'center',
    title: 'Como funciona,',
    titleMuted: 'em três passos simples',
    subtitle: 'Do primeiro contato à estratégia do caso.',
  },
};

export const HeroEscuro: Story = {
  name: 'Hero escuro (xl)',
  args: {
    as: 'h1',
    size: 'xl',
    tone: 'dark',
    title: 'Comprou na planta e a entrega atrasou?',
    titleMuted: 'Você tem direitos.',
    subtitle: 'Advocacia especializada em atraso de obra, distrato e vícios construtivos.',
  },
  render: (args) => (
    <div style={{ background: 'var(--lex-color-ink-900)', padding: 48, borderRadius: 24 }}>
      <SectionHeader {...args} />
    </div>
  ),
};

export const SoTitulo: Story = {
  name: 'Só título',
  args: {
    eyebrow: undefined,
    titleMuted: undefined,
    subtitle: undefined,
    title: 'Perguntas frequentes',
  },
};
