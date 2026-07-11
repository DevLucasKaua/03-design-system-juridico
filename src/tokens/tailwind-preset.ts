/**
 * Lex UI → preset para Tailwind v3 (JS config).
 *
 * Todos os valores apontam para as CSS variables de tokens.css — o preset é
 * só uma camada de mapeamento, a fonte da verdade continua sendo o CSS.
 *
 * Uso: importe em tailwind.config.{js,ts}:
 *   import lexPreset from '@lucas/lex-ui/tailwind-preset';
 *   export default { presets: [lexPreset], content: [...] };
 *
 * Em Tailwind v4 (CSS-first) prefira '@lucas/lex-ui/theme.css'.
 */

function colorScale(name: string, steps: number[]): Record<string, string> {
  return Object.fromEntries(steps.map((s) => [s, `var(--lex-color-${name}-${s})`]));
}

const lexPreset = {
  theme: {
    extend: {
      colors: {
        brand: colorScale('brand', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        ink: colorScale('ink', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
        surface: {
          DEFAULT: 'var(--lex-color-surface)',
          soft: 'var(--lex-color-surface-soft)',
          muted: 'var(--lex-color-surface-muted)',
        },
        success: {
          DEFAULT: 'var(--lex-color-success)',
          soft: 'var(--lex-color-success-soft)',
        },
        error: {
          DEFAULT: 'var(--lex-color-error)',
          soft: 'var(--lex-color-error-soft)',
        },
      },
      fontFamily: {
        display: 'var(--lex-font-display)',
        body: 'var(--lex-font-body)',
      },
      fontSize: {
        sm: 'var(--lex-text-sm)',
        base: 'var(--lex-text-base)',
        md: 'var(--lex-text-md)',
        lg: 'var(--lex-text-lg)',
        xl: 'var(--lex-text-xl)',
        '2xl': 'var(--lex-text-2xl)',
        '3xl': 'var(--lex-text-3xl)',
        'display-xl': 'var(--lex-text-display-xl)',
        'display-lg': 'var(--lex-text-display-lg)',
        'display-md': 'var(--lex-text-display-md)',
        lead: 'var(--lex-text-lead)',
        eyebrow: 'var(--lex-text-eyebrow)',
      },
      letterSpacing: {
        'display-xl': 'var(--lex-tracking-display-xl)',
        'display-lg': 'var(--lex-tracking-display-lg)',
        'display-md': 'var(--lex-tracking-display-md)',
        eyebrow: 'var(--lex-tracking-eyebrow)',
      },
      borderRadius: {
        sm: 'var(--lex-radius-sm)',
        field: 'var(--lex-radius-field)',
        card: 'var(--lex-radius-card)',
        lg: 'var(--lex-radius-lg)',
        pill: 'var(--lex-radius-pill)',
      },
      boxShadow: {
        card: 'var(--lex-shadow-card)',
        'card-hover': 'var(--lex-shadow-card-hover)',
        cta: 'var(--lex-shadow-cta)',
        focus: 'var(--lex-shadow-focus)',
      },
      transitionTimingFunction: {
        'out-quint': 'var(--lex-ease-out-quint)',
        'out-circ': 'var(--lex-ease-out-circ)',
        standard: 'var(--lex-ease-standard)',
      },
      transitionDuration: {
        hover: '240ms',
        accordion: '320ms',
        reveal: '640ms',
      },
    },
  },
};

export default lexPreset;
