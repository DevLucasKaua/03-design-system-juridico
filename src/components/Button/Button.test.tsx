import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('dispara onClick quando habilitado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Enviar</Button>);

    await user.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('em loading: seta aria-busy, continua focável e bloqueia cliques', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Enviar
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Enviar' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).not.toBeDisabled();

    await user.tab();
    expect(button).toHaveFocus();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('quando disabled usa o atributo nativo', () => {
    render(<Button disabled>Enviar</Button>);
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
  });
});
