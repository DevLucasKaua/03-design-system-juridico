import type { ComponentPropsWithRef, MouseEvent } from 'react';
import { cx } from '../../utils/cx';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /** Estilo visual. `primary` é o CTA dourado — use um por bloco. */
  variant?: ButtonVariant;
  /** Altura e tipografia do botão. */
  size?: ButtonSize;
  /**
   * Estado de carregamento: mostra spinner e seta `aria-busy`. O botão
   * permanece focável (`aria-disabled`, não `disabled`) para o leitor de
   * tela não perder o foco no meio do envio — os cliques são bloqueados.
   */
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  className,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={cx(
        'lex-btn',
        `lex-btn--${variant}`,
        `lex-btn--${size}`,
        loading && 'lex-btn--loading',
        className,
      )}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading && <span className="lex-btn__spinner" aria-hidden="true" />}
      <span className="lex-btn__label">{children}</span>
    </button>
  );
}
