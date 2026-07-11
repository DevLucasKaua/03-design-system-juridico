import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import './Toast.css';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Tempo até o auto-dismiss, em ms. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  /** Enfileira uma notificação (no máximo 3 visíveis; o resto espera). */
  toast: (options: ToastOptions) => void;
  dismiss: (id: number) => void;
}

const MAX_VISIBLE = 3;
const DEFAULT_DURATION = 5000;

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>.');
  }
  return context;
}

/**
 * Provider de notificações: região `aria-live="polite"`, auto-dismiss e
 * fila — no máximo 3 toasts visíveis, os demais entram conforme abre espaço.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState<ToastItem[]>([]);
  const queueRef = useRef<ToastItem[]>([]);
  const nextIdRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setVisible((current) => {
      const remaining = current.filter((item) => item.id !== id);
      if (remaining.length === current.length) return current;
      const nextInQueue = queueRef.current.shift();
      return nextInQueue ? [...remaining, nextInQueue] : remaining;
    });
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const item: ToastItem = {
      variant: 'info',
      duration: DEFAULT_DURATION,
      ...options,
      id: nextIdRef.current++,
    };
    setVisible((current) => {
      if (current.length < MAX_VISIBLE) return [...current, item];
      queueRef.current.push(item);
      return current;
    });
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="lex-toast-viewport" aria-live="polite" aria-label="Notificações">
          {visible.map((item) => (
            <ToastCard key={item.id} item={item} onDismiss={dismiss} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(item.id), item.duration);
    return () => clearTimeout(timer);
  }, [item.id, item.duration, onDismiss]);

  return (
    <div className={cx('lex-toast', `lex-toast--${item.variant}`)} role="status">
      <div className="lex-toast__content">
        <p className="lex-toast__title">{item.title}</p>
        {item.description && <p className="lex-toast__description">{item.description}</p>}
      </div>
      <button
        type="button"
        className="lex-toast__close"
        onClick={() => onDismiss(item.id)}
        aria-label="Fechar notificação"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 2l8 8M10 2L2 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
