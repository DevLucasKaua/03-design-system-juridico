# 🎨 Projeto 3 — Design System "Lex UI" para Marketing Jurídico

> Biblioteca de componentes React com tokens de design, documentada no Storybook, pensada para landing pages e produtos de escritórios de advocacia. **É o primeiro projeto a ser feito** — os projetos 1 e 4 consomem estes componentes.
>
> **Tempo estimado:** 2–3 dias · **Depende de:** nada · **Alimenta:** Projetos 1 e 4

## 🎯 Objetivo

| Item da vaga | Como este projeto prova |
|---|---|
| "Experiência com design systems, prototipação ou colaboração com design" (diferencial) | O projeto inteiro |
| "Manter padrões de qualidade, organização de código e acessibilidade" | Componentes com ARIA, testes de a11y, tokens versionados |
| "Trabalhar junto com design... transformar layouts em interfaces" | Storybook é a ponte dev ↔ design |
| "Domínio de HTML, CSS e JavaScript" | Componentes construídos do zero, sem lib de UI pronta |

## 🧰 Stack

- **React 19 + TypeScript** — componentes tipados com props documentadas
- **Storybook 8** — documentação viva + addon-a11y
- **CSS Variables (tokens) + Tailwind** com preset customizado — tokens em CSS puro, consumidos pelo Tailwind (mostra os dois mundos)
- **Vite** (builder do Storybook)
- **Vitest + Testing Library** — testes dos componentes com comportamento (Modal, Input)
- **Deploy:** Storybook publicado no Chromatic (free) ou Vercel

## 📁 Estrutura sugerida

```
design-system-juridico/
├── src/
│   ├── tokens/
│   │   ├── tokens.css          # --lex-color-*, --lex-space-*, --lex-font-*
│   │   └── tailwind-preset.ts  # mapeia os tokens para o Tailwind
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── Button.test.tsx
│   │   ├── Input/              # + label, erro, hint (aria-describedby)
│   │   ├── Card/
│   │   ├── Badge/              # variantes por área jurídica
│   │   ├── Modal/              # focus trap, Esc, aria-modal
│   │   └── index.ts            # barrel export
│   └── index.ts
├── .storybook/
└── package.json                # name: "@lucas/lex-ui" — instalável via GitHub
```

## ✅ Etapas & Tasks

### Etapa 1 — Fundação: tokens (4h)
- [x] Definir paleta com cara de jurídico premium: ~~azul-marinho profundo~~ **grafite quente (ink) + dourado âmbar (brand)** — alinhada à marca real já usada na landing do Projeto 1, para os projetos ficarem interligados de verdade
- [x] **Validar contraste WCAG AA** (4.5:1 texto, 3:1 UI) — pares aprovados/reprovados documentados em `tokens.css` e na story "Fundações → Contraste WCAG AA" (ratios calculados ao vivo)
- [x] Escala tipográfica (1.25 ratio), espaçamentos (base 4px), radii, sombras — tudo como CSS variables `--lex-*`
- [x] Criar preset Tailwind que consome as variables — dois formatos: `theme.css` (Tailwind v4 CSS-first, como o Projeto 1 usa) + `tailwind-preset.ts` (v3)
- [x] Story "Foundations" no Storybook exibindo cores, tipos e espaços (Fundações/Tokens: 4 stories)

### Etapa 2 — Componentes essenciais (8h)
- [x] **Button**: variantes primary/secondary/ghost/destructive, tamanhos sm/md/lg, estado loading (spinner + `aria-busy` + `aria-disabled` para não perder o foco do leitor de tela), disabled
- [x] **Input**: label sempre visível, hint, erro com `aria-invalid` + `aria-describedby` + `role="alert"`, ícone opcional
- [x] **Textarea** e **Select** seguindo o mesmo contrato do Input (contrato compartilhado em `Field.tsx`)
- [x] **Card**: header/body/footer composáveis (`Card.Header` / `Card.Body` / `Card.Footer`)
- [x] **Badge**: variantes por área jurídica (trabalhista, família, consumidor, empresarial) + neutro — cada par de cor aprovado AA
- [x] Cada componente: story com todas as variantes + controls interativos

### Etapa 3 — Componentes com comportamento (6h)
- [x] **Modal**: focus trap manual, fecha com Esc e clique fora, `role="dialog"` + `aria-modal`, retorno de foco ao trigger, trava scroll do body
- [x] **Toast**: `aria-live="polite"`, auto-dismiss, fila (máx. 3 visíveis, resto espera)
- [x] Testes com Testing Library: Modal (foco, Esc, trap, overlay), Input (erro anunciado), Button (loading) e Toast (fila) — 23 testes passando

### Etapa 4 — Qualidade e publicação (4h)
- [x] Rodar addon-a11y em todas as stories, zerar violações — addon instalado com `a11y: { test: 'error' }` + auditoria axe-core automatizada no Vitest (zero violações em todos os componentes)
- [x] Documentar princípios no Storybook (página MDX "Introdução/Como usar")
- [ ] Publicar Storybook (Chromatic ou Vercel) — **pendente: precisa de conta/token; `npm run build-storybook` já gera o estático**
- [x] Configurar o pacote para ser instalável: `npm i github:lucas/lex-ui` — exports + script `prepare` que builda na instalação; falta só subir o repo no GitHub
- [x] README: filosofia dos tokens e decisões de contraste documentadas — **screenshot + link entram após publicar**

## 🔌 Integrações

| Serviço | Para quê | Custo |
|---|---|---|
| Chromatic | Publicar Storybook + visual review | Free (5k snapshots/mês) |
| GitHub | Distribuir o pacote (sem npm publish) | Free |

## 🏁 Critérios de pronto

- [x] 7+ componentes documentados no Storybook com controls (8: Button, Input, Textarea, Select, Card, Badge, Modal, Toast)
- [x] Zero violações no addon-a11y (auditoria axe-core automatizada em `src/test/a11y.test.tsx`)
- [x] Todos os pares de cor passam WCAG AA (documentado na story Fundações → Contraste WCAG AA, com ratios calculados ao vivo)
- [x] Modal e Input com testes passando (23 testes no total)
- [ ] Storybook publicado com URL pública — **pendente: conta no Chromatic ou deploy do `storybook-static/` na Vercel**
- [ ] Pacote consumido de verdade pelo Projeto 1 (a prova final) — **próximo passo da ordem 3 → 1: trocar os estilos locais da landing pelos tokens/componentes do Lex UI**

## 💼 Como apresentar

- **Frase de efeito:** "Criei o design system antes das páginas — as duas landings do portfólio consomem ele. É como eu manteria consistência entre os múltiplos projetos de clientes da agência."
- Storybook aberto na entrevista = conversa instantânea com o time de design.
- Destaque o focus trap do Modal e o contrato de acessibilidade do Input — são os detalhes que separam júnior de pleno.
- Explique a escolha da paleta pelo nicho: advogado vende confiança, não vende hype.
