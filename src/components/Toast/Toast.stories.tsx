import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { ToastProvider, useToast } from './Toast';

const meta = {
  title: 'Componentes/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Região aria-live="polite", auto-dismiss (5s por padrão) e fila: no máximo 3 visíveis, os demais entram conforme abre espaço. Dispare vários seguidos para ver a fila.',
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ padding: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          toast({
            title: 'Consulta agendada!',
            description: 'Você receberá a confirmação no WhatsApp.',
            variant: 'success',
          })
        }
      >
        Sucesso
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: 'Não foi possível enviar',
            description: 'Verifique sua conexão e tente de novo.',
            variant: 'error',
          })
        }
      >
        Erro
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Lembrete',
            description: 'Sua consulta é amanhã às 14h.',
            variant: 'info',
          })
        }
      >
        Info
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          for (let i = 1; i <= 6; i++) {
            toast({ title: `Notificação ${i} de 6`, variant: 'info', duration: 2500 });
          }
        }}
      >
        Disparar 6 (testar fila)
      </Button>
    </div>
  );
}

export const Playground: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
