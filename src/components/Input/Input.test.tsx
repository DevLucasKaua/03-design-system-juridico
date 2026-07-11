import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('liga o label ao controle', () => {
    render(<Input label="Nome completo" />);
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
  });

  it('liga o hint via aria-describedby', () => {
    render(<Input label="WhatsApp" hint="Usamos só para retornar contato." />);
    const input = screen.getByLabelText('WhatsApp');
    const hint = screen.getByText('Usamos só para retornar contato.');
    expect(input).toHaveAccessibleDescription('Usamos só para retornar contato.');
    expect(input.getAttribute('aria-describedby')).toContain(hint.id);
  });

  it('erro: seta aria-invalid, é anunciado (role=alert) e descreve o campo', () => {
    render(<Input label="E-mail" hint="Enviaremos a confirmação." error="Informe um e-mail válido." />);
    const input = screen.getByLabelText('E-mail');

    expect(input).toHaveAttribute('aria-invalid', 'true');

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Informe um e-mail válido.');

    // hint e erro juntos no aria-describedby
    const describedBy = input.getAttribute('aria-describedby') ?? '';
    expect(describedBy.split(' ')).toHaveLength(2);
    expect(input).toHaveAccessibleDescription(
      'Enviaremos a confirmação. Informe um e-mail válido.',
    );
  });

  it('sem erro não seta aria-invalid', () => {
    render(<Input label="Nome" />);
    expect(screen.getByLabelText('Nome')).not.toHaveAttribute('aria-invalid');
  });
});
