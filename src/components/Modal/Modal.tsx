import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  /** Controlado: o modal só aparece quando true. */
  open: boolean;
  /** Chamado ao apertar Esc, clicar fora ou no botão de fechar. */
  onClose: () => void;
  /** Título visível, ligado ao dialog via aria-labelledby. */
  title: string;
  size?: ModalSize;
  /** Ações do rodapé (ex.: botões de confirmar/cancelar). */
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Dialog acessível: focus trap manual, fecha com Esc e clique no overlay,
 * `role="dialog"` + `aria-modal`, bloqueia o scroll do body e devolve o
 * foco ao elemento que abriu quando fecha.
 */
export function Modal({ open, onClose, title, size = 'md', footer, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (firstFocusable ?? panel)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className="lex-modal" onMouseDown={handleOverlayMouseDown}>
      <div
        ref={panelRef}
        className={`lex-modal__panel lex-modal__panel--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="lex-modal__header">
          <h2 id={titleId} className="lex-modal__title">
            {title}
          </h2>
          <button type="button" className="lex-modal__close" onClick={onClose} aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <div className="lex-modal__body">{children}</div>
        {footer && <footer className="lex-modal__footer">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
