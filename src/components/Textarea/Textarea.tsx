import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx';
import { FieldShell, useFieldA11y } from '../Field/Field';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  /** Label sempre visível — placeholder não substitui label. */
  label: string;
  /** Texto de apoio ligado via aria-describedby. */
  hint?: string;
  /** Mensagem de erro: seta aria-invalid e é anunciada (role="alert"). */
  error?: string;
}

export function Textarea({ label, hint, error, id, className, required, ...rest }: TextareaProps) {
  const a11y = useFieldA11y(id, hint, error);

  return (
    <FieldShell a11y={a11y} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={a11y.fieldId}
        className={cx(
          'lex-field__input',
          'lex-field__input--textarea',
          error && 'lex-field__input--error',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={a11y.describedBy}
        required={required}
        {...rest}
      />
    </FieldShell>
  );
}
