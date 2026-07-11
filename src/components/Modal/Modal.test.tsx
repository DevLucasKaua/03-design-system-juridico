import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

function ModalHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir modal</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Agendar consulta">
        <input aria-label="Nome" />
        <button>Confirmar</button>
      </Modal>
    </>
  );
}

describe('Modal', () => {
  it('renderiza dialog com aria-modal e título acessível', () => {
    render(
      <Modal open onClose={() => {}} title="Agendar consulta">
        conteúdo
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Agendar consulta' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('move o foco para dentro ao abrir (primeiro focável: botão Fechar)', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    await user.click(screen.getByRole('button', { name: 'Abrir modal' }));
    expect(screen.getByRole('button', { name: 'Fechar' })).toHaveFocus();
  });

  it('fecha com Esc e devolve o foco ao trigger', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', { name: 'Abrir modal' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('prende o foco: Tab no último volta ao primeiro, Shift+Tab no primeiro vai ao último', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);
    await user.click(screen.getByRole('button', { name: 'Abrir modal' }));

    const fechar = screen.getByRole('button', { name: 'Fechar' });
    const confirmar = screen.getByRole('button', { name: 'Confirmar' });

    expect(fechar).toHaveFocus();

    // último focável → Tab → cicla para o primeiro
    confirmar.focus();
    await user.tab();
    expect(fechar).toHaveFocus();

    // primeiro focável → Shift+Tab → cicla para o último
    await user.tab({ shift: true });
    expect(confirmar).toHaveFocus();
  });

  it('fecha ao clicar no overlay, mas não ao clicar no painel', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Modal open onClose={onClose} title="Teste">
        <button>Dentro</button>
      </Modal>,
    );
    void container;

    await user.click(screen.getByRole('button', { name: 'Dentro' }));
    expect(onClose).not.toHaveBeenCalled();

    const overlay = document.querySelector('.lex-modal') as HTMLElement;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('bloqueia o scroll do body enquanto aberto', async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    await user.click(screen.getByRole('button', { name: 'Abrir modal' }));
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(document.body.style.overflow).toBe('');
  });
});
