import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldShell, useFieldA11y } from '../Field/Field';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  /** Label sempre visível — placeholder não substitui label. */
  label: string;
  /** Texto de apoio ligado via aria-describedby. */
  hint?: string;
  /** Mensagem de erro: seta aria-invalid e é anunciada (role="alert"). */
  error?: string;
  /** Ícone decorativo à esquerda (aria-hidden). */
  icon?: ReactNode;
}

export function Input({ label, hint, error, icon, id, className, required, ...rest }: InputProps) {
  const a11y = useFieldA11y(id, hint, error);

  return (
    <FieldShell a11y={a11y} label={label} hint={hint} error={error} required={required}>
      <div className="lex-field__control">
        {icon && (
          <span className="lex-field__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={a11y.fieldId}
          className={cx(
            'lex-field__input',
            icon ? 'lex-field__input--with-icon' : undefined,
            error && 'lex-field__input--error',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={a11y.describedBy}
          required={required}
          {...rest}
        />
      </div>
    </FieldShell>
  );
}
