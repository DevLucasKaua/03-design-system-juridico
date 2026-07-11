import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from './Modal';

const meta = {
  title: 'Componentes/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Focus trap manual, Esc e clique fora fecham, foco devolvido ao elemento que abriu. Abra pelo botão para ver o ciclo completo de foco.',
      },
    },
  },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 48, display: 'grid', placeItems: 'center', minHeight: 320 }}>
      <Button onClick={() => setOpen(true)}>Agendar consulta</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Agendar consulta gratuita"
        size={size}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setOpen(false)}>Confirmar horário</Button>
          </>
        }
      >
        <p style={{ marginTop: 0 }}>
          Deixe seu contato e escolha o melhor horário. Retornamos em até 1 dia útil.
        </p>
        <div style={{ display: 'grid', gap: 16 }}>
          <Input label="Nome completo" placeholder="Maria da Silva" />
          <Input label="WhatsApp" type="tel" placeholder="(11) 98765-4321" />
        </div>
      </Modal>
    </div>
  );
}

export const Padrao: Story = {
  name: 'Padrão',
  args: { open: false, onClose: () => {}, title: '', children: null },
  render: () => <ModalDemo />,
};

export const Pequeno: Story = {
  args: { open: false, onClose: () => {}, title: '', children: null },
  render: () => <ModalDemo size="sm" />,
};

export const Grande: Story = {
  args: { open: false, onClose: () => {}, title: '', children: null },
  render: () => <ModalDemo size="lg" />,
};
