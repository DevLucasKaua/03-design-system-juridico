# ⚖️ Lex UI — Design System para Marketing Jurídico

> Biblioteca de componentes React com tokens de design versionados, documentada no
> Storybook e pensada para landing pages e produtos de escritórios de advocacia.
> **É a fonte da verdade visual deste portfólio** — o [Projeto 1 (landing de captação)](../01-landing-captacao-juridica)
> e o Projeto 4 (formulário multi-step) consomem estes componentes.

**Storybook publicado:** _em breve — Chromatic_ · **Stack:** React 19 · TypeScript · Storybook 10 · Vite 8 · Vitest 4

<!-- TODO: screenshot do Storybook após publicar -->

## Filosofia dos tokens

1. **Tokens antes de componentes.** Toda cor, espaço, raio, sombra e curva de
   animação vive em [`src/tokens/tokens.css`](src/tokens/tokens.css) como CSS variable
   `--lex-*`. Nenhum componente usa valor mágico.
2. **Advogado vende confiança, não hype.** Grafite quente (`ink`) como tinta,
   dourado âmbar (`brand`) só onde há ação: CTA, foco, accent. A paleta é a mesma
   marca real usada na landing do Projeto 1 — o design system nasceu para
   manter consistência entre os projetos, como numa agência com múltiplos clientes.
3. **Acessibilidade é contrato.** Todo par de cores foi validado matematicamente
   contra WCAG 2.1 AA **antes** de virar token (4.5:1 texto, 3:1 UI). Os pares
   aprovados — e os reprovados, com o porquê — estão documentados em
   `tokens.css` e na story *Fundações → Contraste WCAG AA*, que recalcula os
   ratios ao vivo.

Decisões que os números forçaram:

| Caso | Decisão |
|---|---|
| `brand-500` como anel de foco | reprovou (2.80 < 3:1) → anel usa `brand-600` (3.79) |
| `brand-600` como texto normal | reprovou (3.79 < 4.5) → links usam `brand-700` (5.62) |
| verde de sucesso `#1e9e5a` | reprovou (3.45) → token é `#157347` (5.87) |
| `ink-300` como borda de campo | reprovou (1.98 < 3:1) → campos usam `ink-400` (3.31) |

## Componentes (8)

| Componente | Destaques de acessibilidade |
|---|---|
| `Button` | loading usa `aria-busy` + `aria-disabled` (mantém o foco do leitor de tela); 4 variantes × 3 tamanhos |
| `Input` | label sempre visível, `hint`/`error` via `aria-describedby`, erro com `aria-invalid` + `role="alert"` |
| `Textarea` | mesmo contrato do Input |
| `Select` | mesmo contrato do Input, seta customizada |
| `Card` | composável: `Card.Header` / `Card.Body` / `Card.Footer` |
| `Badge` | 4 áreas jurídicas + neutro, cada par de cor aprovado AA |
| `Modal` | **focus trap manual**, Esc + clique fora, `role="dialog"` + `aria-modal`, devolve o foco ao trigger, trava scroll |
| `Toast` | região `aria-live="polite"`, auto-dismiss, **fila** (máx. 3 visíveis) |

## Instalação e uso

```bash
npm install github:lucas/lex-ui
```

```tsx
import { Button, Input, Modal, ToastProvider, useToast } from '@lucas/lex-ui';
import '@lucas/lex-ui/styles.css'; // tokens + estilos de todos os componentes
```

### Tokens nos dois mundos

**CSS puro** — as variables funcionam em qualquer stack:

```css
.secao { background: var(--lex-color-surface-soft); padding: var(--lex-space-12); }
```

**Tailwind v4** (CSS-first — é assim que o Projeto 1 consome):

```css
@import 'tailwindcss';
@import '@lucas/lex-ui/tokens.css';
@import '@lucas/lex-ui/theme.css'; /* gera bg-brand-500, rounded-card, shadow-cta… */
```

**Tailwind v3** (config JS):

```ts
import lexPreset from '@lucas/lex-ui/tailwind-preset';
export default { presets: [lexPreset], content: ['./src/**/*.{ts,tsx}'] };
```

## Scripts

```bash
npm run storybook        # documentação viva em localhost:6006
npm test                 # 23 testes: comportamento (Testing Library) + auditoria axe-core
npm run build            # dist/ — ESM + declarações + CSS único
npm run build-storybook  # Storybook estático para publicar
```

## Qualidade

- **23 testes** com Vitest + Testing Library: focus trap do Modal (Tab cicla,
  Esc fecha, foco devolvido), contrato de erro do Input (anunciado via
  `role="alert"`), fila do Toast, estados do Button;
- **Auditoria axe-core** automatizada sobre todos os componentes renderizados
  (zero violações) + addon-a11y no Storybook;
- Contraste validado por script — a story *Fundações* mostra os ratios calculados
  em tempo real;
- `prefers-reduced-motion` respeitado em todas as animações.

## Estrutura

```
src/
├── tokens/
│   ├── tokens.css          # fonte da verdade: --lex-color-*, --lex-space-*…
│   ├── theme.css           # mapeamento p/ Tailwind v4 (@theme)
│   ├── tailwind-preset.ts  # preset p/ Tailwind v3
│   └── contrast.ts         # utilitários WCAG exportados
├── components/
│   ├── Button/  Input/  Textarea/  Select/
│   ├── Card/  Badge/  Modal/  Toast/
│   └── (cada um: .tsx + .css + .stories.tsx + .test.tsx)
├── foundations/            # stories de cores, contraste, tipografia, espaço
└── docs/ComoUsar.mdx       # princípios de uso no Storybook
```
