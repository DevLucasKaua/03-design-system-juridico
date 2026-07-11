import { render } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Input } from '../components/Input/Input';
import { Modal } from '../components/Modal/Modal';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { Select } from '../components/Select/Select';
import { Textarea } from '../components/Textarea/Textarea';
import { ToastProvider, useToast } from '../components/Toast/Toast';

/**
 * Auditoria axe-core sobre o DOM renderizado de cada componente.
 * A regra color-contrast fica fora porque o jsdom não aplica CSS externo —
 * o contraste é validado matematicamente (story Fundações → Contraste WCAG AA).
 */
async function expectNoViolations(container: Element) {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } },
  });
  const summary = results.violations.map((v) => `${v.id}: ${v.help}`).join('\n');
  expect(summary).toBe('');
}

describe('a11y (axe-core)', () => {
  it('Button em todas as variantes e estados', async () => {
    const { container } = render(
      <main>
        <Button>Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Excluir</Button>
        <Button loading>Enviando</Button>
        <Button disabled>Desabilitado</Button>
      </main>,
    );
    await expectNoViolations(container);
  });

  it('Campos de formulário com hint, erro e ícone', async () => {
    const { container } = render(
      <main>
        <Input label="Nome" hint="Como no documento." />
        <Input label="E-mail" error="Informe um e-mail válido." defaultValue="x@" />
        <Input label="Busca" icon={<svg />} />
        <Textarea label="Descreva seu caso" hint="Detalhes ajudam." />
        <Select label="Área" error="Selecione uma área.">
          <option value="">Selecione</option>
          <option value="t">Trabalhista</option>
        </Select>
      </main>,
    );
    await expectNoViolations(container);
  });

  it('Card e Badge', async () => {
    const { container } = render(
      <main>
        <Card>
          <Card.Header>Título</Card.Header>
          <Card.Body>Conteúdo</Card.Body>
          <Card.Footer>
            <Badge variant="trabalhista">Trabalhista</Badge>
            <Badge variant="familia">Família</Badge>
            <Badge variant="consumidor">Consumidor</Badge>
            <Badge variant="empresarial">Empresarial</Badge>
            <Badge>Geral</Badge>
          </Card.Footer>
        </Card>
      </main>,
    );
    await expectNoViolations(container);
  });

  it('SectionHeader nos dois tons com hierarquia de headings', async () => {
    const { container } = render(
      <main>
        <SectionHeader
          as="h1"
          size="xl"
          tone="dark"
          eyebrow="Advocacia imobiliária"
          title="Comprou na planta?"
          titleMuted="Você tem direitos."
          subtitle="Análise inicial gratuita."
        />
        <SectionHeader as="h2" title="Como funciona," titleMuted="em três passos" />
      </main>,
    );
    await expectNoViolations(container);
  });

  it('Modal aberto', async () => {
    render(
      <Modal open onClose={() => {}} title="Agendar consulta">
        <p>Conteúdo do modal</p>
        <button>Ação</button>
      </Modal>,
    );
    await expectNoViolations(document.body);
  });

  it('Toast visível', async () => {
    function Trigger() {
      const { toast } = useToast();
      return (
        <button
          ref={(el) => {
            if (el && !el.dataset.fired) {
              el.dataset.fired = 'true';
              toast({ title: 'Consulta agendada', variant: 'success' });
            }
          }}
        >
          Disparar
        </button>
      );
    }
    render(
      <main>
        <ToastProvider>
          <Trigger />
        </ToastProvider>
      </main>,
    );
    await expectNoViolations(document.body);
  });
});
