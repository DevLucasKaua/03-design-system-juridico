import { createElement, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './SectionHeader.css';

export type SectionHeaderTone = 'light' | 'dark';
export type SectionHeaderSize = 'xl' | 'lg' | 'md';

export interface SectionHeaderProps extends ComponentPropsWithRef<'header'> {
  /** Rótulo uppercase acima do título (ex.: "ADVOCACIA IMOBILIÁRIA · SP"). */
  eyebrow?: string;
  /** Parte forte da headline (tinta cheia). */
  title: string;
  /**
   * Continuação da headline em tom rebaixado — o padrão "dois tons" da
   * referência visual (ex.: título "Confiança se constrói," + muted
   * "com método e transparência").
   */
  titleMuted?: string;
  /** Subheadline em tamanho lead. */
  subtitle?: ReactNode;
  /** Nível semântico do heading — o visual vem de `size`. */
  as?: 'h1' | 'h2' | 'h3';
  /** Escala visual: xl (hero), lg (seção), md (bloco). */
  size?: SectionHeaderSize;
  /** `dark` para seções sobre ink-900. */
  tone?: SectionHeaderTone;
  align?: 'start' | 'center';
}

export function SectionHeader({
  eyebrow,
  title,
  titleMuted,
  subtitle,
  as = 'h2',
  size = 'lg',
  tone = 'light',
  align = 'start',
  className,
  ...rest
}: SectionHeaderProps) {
  return (
    <header
      className={cx(
        'lex-section-header',
        `lex-section-header--${tone}`,
        `lex-section-header--${align}`,
        className,
      )}
      {...rest}
    >
      {eyebrow && <p className="lex-section-header__eyebrow">{eyebrow}</p>}
      {createElement(
        as,
        { className: `lex-section-header__title lex-section-header__title--${size}` },
        titleMuted ? `${title} ` : title,
        titleMuted && (
          <span key="muted" className="lex-section-header__muted">
            {titleMuted}
          </span>
        ),
      )}
      {subtitle && <p className="lex-section-header__subtitle">{subtitle}</p>}
    </header>
  );
}
