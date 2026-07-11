import { useId, type ReactNode } from 'react';
import './Field.css';

/**
 * Contrato de acessibilidade compartilhado por Input, Textarea e Select:
 * label sempre visível ligado por htmlFor, hint e erro ligados ao controle
 * via aria-describedby, erro anunciado com role="alert" e aria-invalid.
 */

export interface FieldA11y {
  fieldId: string;
  hintId?: string;
  errorId?: string;
  /** Valor pronto para aria-describedby (hint + erro, quando existirem). */
  describedBy?: string;
}

export function useFieldA11y(id: string | undefined, hint?: string, error?: string): FieldA11y {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { fieldId, hintId, errorId, describedBy };
}

export interface FieldShellProps {
  a11y: FieldA11y;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldShell({ a11y, label, hint, error, required, children }: FieldShellProps) {
  return (
    <div className="lex-field">
      <label className="lex-field__label" htmlFor={a11y.fieldId}>
        {label}
        {required && (
          <span className="lex-field__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={a11y.hintId} className="lex-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={a11y.errorId} className="lex-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
