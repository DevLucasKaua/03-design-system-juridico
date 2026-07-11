import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export type BadgeVariant = 'trabalhista' | 'familia' | 'consumidor' | 'empresarial' | 'neutro';

export interface BadgeProps extends ComponentPropsWithRef<'span'> {
  /** Área jurídica — cada uma tem par de cores próprio aprovado em WCAG AA. */
  variant?: BadgeVariant;
}

export function Badge({ variant = 'neutro', className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx('lex-badge', `lex-badge--${variant}`, className)} {...rest}>
      {children}
    </span>
  );
}
