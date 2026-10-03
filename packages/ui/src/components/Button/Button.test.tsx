import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button, ButtonLink } from './Button';

describe('Button', () => {
  it('renderiza um botão do tipo button por padrão com a variante principal', () => {
    render(<Button>Agendar conversa</Button>);
    const button = screen.getByRole('button', { name: 'Agendar conversa' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('mdia-button', 'mdia-button--primary', 'mdia-button--md');
  });

  it('aplica variante, tamanho e largura total', () => {
    render(
      <Button variant="ghost" size="lg" fullWidth>
        Ver detalhes
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass(
      'mdia-button--ghost',
      'mdia-button--lg',
      'mdia-button--full',
    );
  });

  it('dispara onClick e respeita disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<Button onClick={onClick}>Salvar</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <Button onClick={onClick} disabled>
        Salvar
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('em carregamento desabilita, marca aria-busy e troca o rótulo', () => {
    render(
      <Button loading loadingLabel="Salvando…">
        Salvar
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Salvando…' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector('.mdia-spinner')).toHaveAttribute('aria-hidden', 'true');
  });

  it('esconde ícones de tecnologias assistivas', () => {
    render(<Button iconStart={<svg data-testid="icon" />}>Agendar</Button>);
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('ButtonLink', () => {
  it('renderiza um link com aparência de botão', () => {
    render(<ButtonLink href="/contato">Falar com a MD.IA</ButtonLink>);
    const link = screen.getByRole('link', { name: 'Falar com a MD.IA' });
    expect(link).toHaveAttribute('href', '/contato');
    expect(link).toHaveClass('mdia-button', 'mdia-button--primary');
  });

  it('desabilitado remove o destino e bloqueia o clique', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ButtonLink href="/contato" disabled onClick={onClick}>
        Falar
      </ButtonLink>,
    );
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });
});
