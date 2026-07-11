import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('a parte muted faz parte do nome acessível do heading', () => {
    render(<SectionHeader title="Confiança se constrói," titleMuted="com método" />);
    expect(
      screen.getByRole('heading', { name: 'Confiança se constrói, com método', level: 2 }),
    ).toBeInTheDocument();
  });

  it('respeita o nível semântico via `as` independente do visual', () => {
    render(<SectionHeader as="h1" size="xl" title="Hero" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hero');
  });

  it('eyebrow e subtitle são opcionais', () => {
    const { container } = render(<SectionHeader title="Só título" />);
    expect(container.querySelector('.lex-section-header__eyebrow')).not.toBeInTheDocument();
    expect(container.querySelector('.lex-section-header__subtitle')).not.toBeInTheDocument();
  });
});
