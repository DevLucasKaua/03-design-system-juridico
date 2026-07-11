/**
 * Utilitários de contraste WCAG 2.1 — usados pela story Foundations para
 * exibir os ratios calculados ao vivo e exportados para quem quiser validar
 * novos pares antes de criar um token.
 */

function channelToLinear(value: number): number {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = channelToLinear(parseInt(clean.slice(0, 2), 16));
  const g = channelToLinear(parseInt(clean.slice(2, 4), 16));
  const b = channelToLinear(parseInt(clean.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Ratio de contraste entre duas cores hex (#rrggbb), de 1 a 21. */
export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

export interface ContrastResult {
  ratio: number;
  /** AA texto normal (≥ 4.5:1) */
  aaText: boolean;
  /** AA texto grande / componentes de UI (≥ 3:1) */
  aaLarge: boolean;
}

/** Avalia um par de cores contra os mínimos WCAG AA. */
export function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = contrastRatio(foreground, background);
  return { ratio, aaText: ratio >= 4.5, aaLarge: ratio >= 3 };
}
