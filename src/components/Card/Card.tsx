import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx';
import './Card.css';

export interface CardProps extends ComponentPropsWithRef<'div'> {
  /** Eleva a sombra no hover — para cards clicáveis/interativos. */
  interactive?: boolean;
}

/**
 * Superfície composável: combine com CardHeader, CardBody e CardFooter
 * (também disponíveis como Card.Header, Card.Body e Card.Footer).
 */
export function Card({ interactive = false, className, children, ...rest }: CardProps) {
  return (
    <div className={cx('lex-card', interactive && 'lex-card--interactive', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cx('lex-card__header', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cx('lex-card__body', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cx('lex-card__footer', className)} {...rest}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
