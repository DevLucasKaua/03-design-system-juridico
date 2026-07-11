import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from './Toast';

function ToastTrigger({ count = 1, duration = 5000 }: { count?: number; duration?: number }) {
  const { toast } = useToast();
  return (
    <button
      onClick={() => {
        for (let i = 1; i <= count; i++) {
          toast({ title: `Notificação ${i}`, duration });
        }
      }}
    >
      Disparar
    </button>
  );
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('a viewport é uma região aria-live polite', () => {
    renderWithProvider(<div />);
    const region = document.querySelector('.lex-toast-viewport');
    expect(region).toHaveAttribute('aria-live', 'polite');
  });

  it('exibe o toast com role=status e auto-dismiss após a duração', () => {
    renderWithProvider(<ToastTrigger duration={3000} />);
    fireEvent.click(screen.getByRole('button', { name: 'Disparar' }));

    expect(screen.getByRole('status')).toHaveTextContent('Notificação 1');

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('fecha ao clicar no botão de dispensar', () => {
    renderWithProvider(<ToastTrigger />);
    fireEvent.click(screen.getByRole('button', { name: 'Disparar' }));

    fireEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('fila: mostra no máximo 3 e puxa o próximo quando um sai', () => {
    renderWithProvider(<ToastTrigger count={5} duration={4000} />);
    fireEvent.click(screen.getByRole('button', { name: 'Disparar' }));

    expect(screen.getAllByRole('status')).toHaveLength(3);
    expect(screen.queryByText('Notificação 4')).not.toBeInTheDocument();

    // dispensa o primeiro → o 4º entra
    fireEvent.click(screen.getAllByRole('button', { name: 'Fechar notificação' })[0]);
    expect(screen.getAllByRole('status')).toHaveLength(3);
    expect(screen.getByText('Notificação 4')).toBeInTheDocument();
  });

  it('useToast fora do provider lança erro claro', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ToastTrigger />)).toThrow('useToast deve ser usado dentro de <ToastProvider>.');
    spy.mockRestore();
  });
});
