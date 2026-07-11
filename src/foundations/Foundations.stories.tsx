import type { Meta, StoryObj } from '@storybook/react-vite';
import { checkContrast } from '../tokens/contrast';

/**
 * Fundações do Lex UI: cores, contraste, tipografia, espaçamento e forma.
 * Os ratios de contraste são CALCULADOS ao vivo a partir dos hex — se um
 * token mudar e reprovar, a tabela mostra na hora.
 */
const meta = {
  title: 'Fundações/Tokens',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const brand: Record<string, string> = {
  50: '#fbf4e6',
  100: '#f6e7c4',
  200: '#efd08a',
  300: '#e7b650',
  400: '#dda027',
  500: '#d28c0e',
  600: '#b4760b',
  700: '#8f5d0a',
  800: '#6e480b',
  900: '#4e340a',
};

const ink: Record<string, string> = {
  50: '#f7f7f8',
  100: '#edecef',
  200: '#dad9de',
  300: '#b9b7c0',
  400: '#8e8c97',
  500: '#66646f',
  600: '#45444d',
  700: '#2c2b33',
  800: '#1e1d24',
  900: '#141318',
  950: '#0c0b0f',
};

const extras: Array<[string, string]> = [
  ['surface', '#ffffff'],
  ['surface-soft', '#faf9f7'],
  ['surface-muted', '#f3f1ec'],
  ['success', '#157347'],
  ['error', '#c0392b'],
];

function Swatch({ name, hex }: { name: string; hex: string }) {
  const darkText = checkContrast('#141318', hex).aaText;
  return (
    <div
      style={{
        background: hex,
        color: darkText ? '#141318' : '#ffffff',
        borderRadius: 12,
        border: '1px solid var(--lex-color-ink-100)',
        padding: '20px 12px 10px',
        fontSize: 13,
        minWidth: 96,
      }}
    >
      <strong style={{ display: 'block' }}>{name}</strong>
      <code style={{ fontSize: 12 }}>{hex}</code>
    </div>
  );
}

export const Cores: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 1200 }}>
      <section>
        <h3 style={{ fontFamily: 'var(--lex-font-display)' }}>brand — dourado âmbar (accent)</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(brand).map(([step, hex]) => (
            <Swatch key={step} name={step} hex={hex} />
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ fontFamily: 'var(--lex-font-display)' }}>ink — grafite quente (tinta)</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(ink).map(([step, hex]) => (
            <Swatch key={step} name={step} hex={hex} />
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ fontFamily: 'var(--lex-font-display)' }}>superfícies & feedback</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {extras.map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>
      </section>
    </div>
  ),
};

interface ContrastPair {
  uso: string;
  fg: string;
  bg: string;
  fgHex: string;
  bgHex: string;
  minimo: 4.5 | 3;
}

const approvedPairs: ContrastPair[] = [
  { uso: 'Texto padrão', fg: 'ink-900', bg: 'surface', fgHex: '#141318', bgHex: '#ffffff', minimo: 4.5 },
  { uso: 'Texto em fundo soft', fg: 'ink-900', bg: 'surface-soft', fgHex: '#141318', bgHex: '#faf9f7', minimo: 4.5 },
  { uso: 'Texto secundário', fg: 'ink-600', bg: 'surface', fgHex: '#45444d', bgHex: '#ffffff', minimo: 4.5 },
  { uso: 'Texto mínimo (placeholder)', fg: 'ink-500', bg: 'surface', fgHex: '#66646f', bgHex: '#ffffff', minimo: 4.5 },
  { uso: 'Seção escura', fg: 'surface', bg: 'ink-900', fgHex: '#ffffff', bgHex: '#141318', minimo: 4.5 },
  { uso: 'Secundário no escuro', fg: 'ink-200', bg: 'ink-900', fgHex: '#dad9de', bgHex: '#141318', minimo: 4.5 },
  { uso: 'CTA primário (Button)', fg: 'ink-900', bg: 'brand-500', fgHex: '#141318', bgHex: '#d28c0e', minimo: 4.5 },
  { uso: 'CTA hover', fg: 'ink-900', bg: 'brand-400', fgHex: '#141318', bgHex: '#dda027', minimo: 4.5 },
  { uso: 'Links', fg: 'brand-700', bg: 'surface', fgHex: '#8f5d0a', bgHex: '#ffffff', minimo: 4.5 },
  { uso: 'Accent no escuro', fg: 'brand-200', bg: 'ink-900', fgHex: '#efd08a', bgHex: '#141318', minimo: 4.5 },
  { uso: 'Botão destructive', fg: 'surface', bg: 'error', fgHex: '#ffffff', bgHex: '#c0392b', minimo: 4.5 },
  { uso: 'Texto de erro', fg: 'error', bg: 'surface', fgHex: '#c0392b', bgHex: '#ffffff', minimo: 4.5 },
  { uso: 'Texto de sucesso', fg: 'success', bg: 'surface', fgHex: '#157347', bgHex: '#ffffff', minimo: 4.5 },
  { uso: 'Badge trabalhista', fg: 'area-trabalhista-text', bg: 'area-trabalhista-bg', fgHex: '#1e4e8c', bgHex: '#e3ecf8', minimo: 4.5 },
  { uso: 'Badge família', fg: 'area-familia-text', bg: 'area-familia-bg', fgHex: '#8c2f4a', bgHex: '#f9e7ec', minimo: 4.5 },
  { uso: 'Badge consumidor', fg: 'area-consumidor-text', bg: 'area-consumidor-bg', fgHex: '#1d6b40', bgHex: '#e2f1e8', minimo: 4.5 },
  { uso: 'Badge empresarial', fg: 'area-empresarial-text', bg: 'area-empresarial-bg', fgHex: '#4f3a99', bgHex: '#ece8f7', minimo: 4.5 },
  { uso: 'Anel de foco (UI)', fg: 'brand-600', bg: 'surface', fgHex: '#b4760b', bgHex: '#ffffff', minimo: 3 },
  { uso: 'Borda de campo (UI)', fg: 'ink-400', bg: 'surface', fgHex: '#8e8c97', bgHex: '#ffffff', minimo: 3 },
];

export const ContrasteWCAG: Story = {
  name: 'Contraste WCAG AA',
  render: () => (
    <div style={{ maxWidth: 880 }}>
      <p style={{ maxWidth: 640 }}>
        Pares aprovados para uso no sistema. O ratio é <strong>calculado ao vivo</strong> a partir
        dos hex — mínimo 4.5:1 para texto e 3:1 para componentes de UI (WCAG 2.1 AA).
      </p>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--lex-color-ink-200)' }}>
            <th style={{ padding: 8 }}>Uso</th>
            <th style={{ padding: 8 }}>Par</th>
            <th style={{ padding: 8 }}>Amostra</th>
            <th style={{ padding: 8 }}>Ratio</th>
            <th style={{ padding: 8 }}>AA</th>
          </tr>
        </thead>
        <tbody>
          {approvedPairs.map((pair) => {
            const result = checkContrast(pair.fgHex, pair.bgHex);
            const passes = pair.minimo === 4.5 ? result.aaText : result.aaLarge;
            return (
              <tr key={pair.uso} style={{ borderBottom: '1px solid var(--lex-color-ink-100)' }}>
                <td style={{ padding: 8 }}>{pair.uso}</td>
                <td style={{ padding: 8 }}>
                  <code>
                    {pair.fg} / {pair.bg}
                  </code>
                </td>
                <td style={{ padding: 8 }}>
                  <span
                    style={{
                      background: pair.bgHex,
                      color: pair.fgHex,
                      padding: '4px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--lex-color-ink-100)',
                      fontWeight: 600,
                    }}
                  >
                    Aa
                  </span>
                </td>
                <td style={{ padding: 8 }}>
                  <code>{result.ratio.toFixed(2)}:1</code> <small>(mín. {pair.minimo}:1)</small>
                </td>
                <td style={{ padding: 8, fontWeight: 700, color: passes ? '#157347' : '#c0392b' }}>
                  {passes ? '✓ passa' : '✗ falha'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ),
};

const typeScale: Array<[string, string, string]> = [
  ['--lex-text-3xl', '3.0518rem', 'Headline de hero'],
  ['--lex-text-2xl', '2.4414rem', 'Título de seção'],
  ['--lex-text-xl', '1.9531rem', 'Subtítulo'],
  ['--lex-text-lg', '1.5625rem', 'Destaque'],
  ['--lex-text-md', '1.25rem', 'Lead / título de card'],
  ['--lex-text-base', '1rem', 'Corpo de texto'],
  ['--lex-text-sm', '0.8rem', 'Labels, hints, badges'],
];

const displayScale: Array<[string, string, string]> = [
  ['--lex-text-display-xl', 'clamp(2.25rem, 5vw, 3.75rem)', 'H1 hero (fluido)'],
  ['--lex-text-display-lg', 'clamp(1.75rem, 3.5vw, 2.75rem)', 'H2 de seção (fluido)'],
  ['--lex-text-display-md', 'clamp(1.25rem, 2vw, 1.5rem)', 'H3 / título de card'],
  ['--lex-text-lead', 'clamp(1.05rem, 1.6vw, 1.375rem)', 'Subheadline'],
];

export const Tipografia: Story = {
  render: () => (
    <div style={{ maxWidth: 880, display: 'grid', gap: 8 }}>
      <p style={{ maxWidth: 640 }}>
        Display: <code>Sora</code> · Corpo: <code>Noto Sans</code> — carregadas pelo app
        consumidor. Headlines usam <strong>clamps fluidos</strong> (mobile → desktop, do
        DESIGN-SPEC do cliente); o miolo segue a escala modular <strong>1.25</strong>.
      </p>
      <h3 style={{ fontFamily: 'var(--lex-font-display)', marginBottom: 0 }}>
        Display semântico (fluido)
      </h3>
      {displayScale.map(([token, clamp, uso]) => (
        <div
          key={token}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            borderBottom: '1px solid var(--lex-color-ink-100)',
            paddingBlock: 8,
          }}
        >
          <code style={{ width: 170, flexShrink: 0, fontSize: 12, color: 'var(--lex-color-ink-600)' }}>
            {token}
          </code>
          <span
            style={{
              fontSize: `var(${token})`,
              fontFamily: 'var(--lex-font-display)',
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Justiça ágil
          </span>
          <small style={{ marginLeft: 'auto', color: 'var(--lex-color-ink-600)', flexShrink: 0, textAlign: 'right' }}>
            {uso}
            <br />
            <code style={{ fontSize: 10 }}>{clamp}</code>
          </small>
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          borderBottom: '1px solid var(--lex-color-ink-100)',
          paddingBlock: 8,
        }}
      >
        <code style={{ width: 170, flexShrink: 0, fontSize: 12, color: 'var(--lex-color-ink-600)' }}>
          --lex-text-eyebrow
        </code>
        <span
          style={{
            fontSize: 'var(--lex-text-eyebrow)',
            fontWeight: 600,
            letterSpacing: 'var(--lex-tracking-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--lex-color-brand-700)',
          }}
        >
          Advocacia imobiliária · SP
        </span>
        <small style={{ marginLeft: 'auto', color: 'var(--lex-color-ink-600)', flexShrink: 0 }}>
          0.8125rem · tracking 0.12em · eyebrow
        </small>
      </div>
      <h3 style={{ fontFamily: 'var(--lex-font-display)', marginBottom: 0, marginTop: 16 }}>
        Escala modular 1.25
      </h3>
      {typeScale.map(([token, size, uso]) => (
        <div
          key={token}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            borderBottom: '1px solid var(--lex-color-ink-100)',
            paddingBlock: 8,
          }}
        >
          <code style={{ width: 140, flexShrink: 0, fontSize: 12, color: 'var(--lex-color-ink-600)' }}>
            {token}
          </code>
          <span style={{ fontSize: size, fontFamily: 'var(--lex-font-display)', lineHeight: 1.15 }}>
            Justiça ágil
          </span>
          <small style={{ marginLeft: 'auto', color: 'var(--lex-color-ink-600)', flexShrink: 0 }}>
            {size} · {uso}
          </small>
        </div>
      ))}
    </div>
  ),
};

const motionTokens: Array<[string, string, string]> = [
  ['--lex-duration-hover', '240ms', 'Hovers de botão, card, link (passo 0.24s)'],
  ['--lex-duration-accordion', '320ms', 'Accordion / FAQ (passo 0.32s)'],
  ['--lex-duration-reveal', '640ms', 'Scroll reveal fade-up (passo 0.64s)'],
  ['--lex-stagger', '80ms', 'Delay incremental em cascatas (index × 80ms)'],
];

const easings: Array<[string, string, string]> = [
  ['--lex-ease-out-quint', 'cubic-bezier(0.23, 1, 0.32, 1)', 'Reveals e entradas (HackerRank)'],
  ['--lex-ease-out-circ', 'cubic-bezier(0.075, 0.82, 0.165, 1)', 'Entradas alternativas'],
  ['--lex-ease-standard', 'cubic-bezier(0.4, 0, 0.2, 1)', 'Hovers utilitários'],
];

export const Movimento: Story = {
  render: () => (
    <div style={{ maxWidth: 880, display: 'grid', gap: 24 }}>
      <p style={{ maxWidth: 640 }}>
        Easings extraídos do HackerRank e cadência de durações em <strong>passos de 0,08s</strong>{' '}
        (Phenomenon Studio). Passe o mouse sobre cada barra para sentir a curva — todas respeitam{' '}
        <code>prefers-reduced-motion</code> nos componentes.
      </p>
      <section>
        <h3 style={{ fontFamily: 'var(--lex-font-display)' }}>Easings</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {easings.map(([token, curve, uso]) => (
            <div key={token} style={{ display: 'grid', gap: 4 }}>
              <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                <code style={{ color: 'var(--lex-color-ink-600)' }}>{token}</code>
                <small style={{ marginLeft: 'auto', color: 'var(--lex-color-ink-600)' }}>{uso}</small>
              </div>
              <div
                style={{
                  background: 'var(--lex-color-surface-muted)',
                  borderRadius: 8,
                  padding: 4,
                }}
              >
                <div
                  className="lex-motion-demo"
                  style={{
                    width: 48,
                    height: 24,
                    borderRadius: 6,
                    background: 'var(--lex-color-brand-500)',
                    transition: `transform 640ms var(${token})`,
                  }}
                />
              </div>
              <code style={{ fontSize: 11, color: 'var(--lex-color-ink-500)' }}>{curve}</code>
            </div>
          ))}
        </div>
        <style>{`
          .lex-motion-demo { transform: translateX(0); }
          div:hover > .lex-motion-demo { transform: translateX(calc(100% * 12)); }
          @media (prefers-reduced-motion: reduce) { .lex-motion-demo { transition: none !important; } }
        `}</style>
      </section>
      <section>
        <h3 style={{ fontFamily: 'var(--lex-font-display)' }}>Durações — cadência 0,08s</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--lex-color-ink-200)' }}>
              <th style={{ padding: 8 }}>Token</th>
              <th style={{ padding: 8 }}>Valor</th>
              <th style={{ padding: 8 }}>Uso</th>
            </tr>
          </thead>
          <tbody>
            {motionTokens.map(([token, value, uso]) => (
              <tr key={token} style={{ borderBottom: '1px solid var(--lex-color-ink-100)' }}>
                <td style={{ padding: 8 }}>
                  <code>{token}</code>
                </td>
                <td style={{ padding: 8 }}>
                  <code>{value}</code>
                </td>
                <td style={{ padding: 8 }}>{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  ),
};

const spaces: Array<[string, number]> = [
  ['--lex-space-1', 4],
  ['--lex-space-2', 8],
  ['--lex-space-3', 12],
  ['--lex-space-4', 16],
  ['--lex-space-6', 24],
  ['--lex-space-8', 32],
  ['--lex-space-12', 48],
  ['--lex-space-16', 64],
];

export const EspacoEForma: Story = {
  name: 'Espaço & forma',
  render: () => (
    <div style={{ maxWidth: 880, display: 'grid', gap: 32 }}>
      <section>
        <h3 style={{ fontFamily: 'var(--lex-font-display)' }}>Espaçamento — base 4px</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {spaces.map(([token, px]) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ width: 140, fontSize: 12, color: 'var(--lex-color-ink-600)' }}>{token}</code>
              <div
                style={{
                  width: px,
                  height: 16,
                  background: 'var(--lex-color-brand-500)',
                  borderRadius: 4,
                }}
              />
              <small>{px}px</small>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ fontFamily: 'var(--lex-font-display)' }}>Raios & sombras</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {(
            [
              ['--lex-radius-sm', 'var(--lex-shadow-card)'],
              ['--lex-radius-field', 'var(--lex-shadow-card)'],
              ['--lex-radius-card', 'var(--lex-shadow-card-hover)'],
              ['--lex-radius-lg', 'var(--lex-shadow-cta)'],
            ] as Array<[string, string]>
          ).map(([radius, shadow]) => (
            <div
              key={radius}
              style={{
                width: 150,
                height: 90,
                background: 'var(--lex-color-surface)',
                border: '1px solid var(--lex-color-ink-100)',
                borderRadius: `var(${radius})`,
                boxShadow: shadow,
                display: 'grid',
                placeItems: 'center',
                fontSize: 12,
              }}
            >
              <code>{radius}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
