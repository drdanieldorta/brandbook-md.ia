import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const OPCOES = [
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'mentoria', label: 'Mentoria' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

describe('Radio', () => {
  it('avulso: renderiza um radio nativo com rótulo, descrição e ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Radio
        ref={ref}
        name="inicio"
        value="consultoria"
        label="Consultoria"
        description="Diagnóstico e plano."
        className="extra"
      />,
    );
    const radio = screen.getByRole('radio', { name: 'Consultoria' });
    expect(ref.current).toBe(radio);
    expect(radio).toHaveAttribute('type', 'radio');
    expect(radio).toHaveAttribute('name', 'inicio');
    expect(radio).toHaveAttribute('value', 'consultoria');
    expect(radio).toHaveClass('mdia-visually-hidden');
    expect(radio).toHaveAccessibleDescription('Diagnóstico e plano.');
    expect(radio.nextElementSibling).toHaveAttribute('aria-hidden', 'true');
    expect(radio.closest('label')).toHaveClass('mdia-radio', 'extra');
  });

  it('avulso: marca ao clicar no rótulo e respeita invalid e disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <>
        <Radio name="formato" value="online" label="Online" onChange={onChange} invalid />
        <Radio name="formato" value="presencial" label="Presencial" disabled />
      </>,
    );
    const online = screen.getByRole('radio', { name: 'Online' });
    const presencial = screen.getByRole('radio', { name: 'Presencial' });
    expect(online).not.toHaveAttribute('aria-invalid');
    expect(online.closest('label')).toHaveClass('mdia-radio--invalid');
    expect(presencial).toBeDisabled();
    expect(presencial.closest('label')).toHaveClass('mdia-radio--disabled');
    await user.click(screen.getByText('Online'));
    expect(online).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe('RadioGroup', () => {
  it('renderiza um fieldset nomeado pela legenda e radios com o mesmo name a partir de options', () => {
    render(<RadioGroup label="Como prefere começar?" name="inicio" options={OPCOES} />);
    const group = screen.getByRole('group', { name: 'Como prefere começar?' });
    expect(group.tagName).toBe('FIELDSET');
    expect(group).toHaveClass('mdia-radio-group', 'mdia-radio-group--vertical');
    const radios = within(group).getAllByRole('radio');
    expect(radios).toHaveLength(3);
    radios.forEach((radio) => expect(radio).toHaveAttribute('name', 'inicio'));
    expect(screen.getByRole('radio', { name: 'Ainda não sei' })).toHaveAttribute(
      'value',
      'nao-sei',
    );
    radios.forEach((radio) => expect(radio).not.toBeChecked());
  });

  it('não controlado: parte de defaultValue, troca a seleção ao clicar e chama onChange com o value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        defaultValue="consultoria"
        onChange={onChange}
        options={OPCOES}
      />,
    );
    expect(screen.getByRole('radio', { name: 'Consultoria' })).toBeChecked();
    await user.click(screen.getByText('Mentoria'));
    expect(screen.getByRole('radio', { name: 'Mentoria' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Consultoria' })).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('mentoria');
  });

  it('controlado: chama onChange com o value e só muda a seleção quando a prop muda', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        value="consultoria"
        onChange={onChange}
        options={OPCOES}
      />,
    );
    expect(screen.getByRole('radio', { name: 'Consultoria' })).toBeChecked();
    await user.click(screen.getByRole('radio', { name: 'Mentoria' }));
    expect(onChange).toHaveBeenCalledWith('mentoria');
    expect(screen.getByRole('radio', { name: 'Mentoria' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Consultoria' })).toBeChecked();
    rerender(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        value="mentoria"
        onChange={onChange}
        options={OPCOES}
      />,
    );
    expect(screen.getByRole('radio', { name: 'Mentoria' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Consultoria' })).not.toBeChecked();
  });

  it('aceita Radios como children, que herdam name, seleção e required do grupo', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        defaultValue="mentoria"
        onChange={onChange}
        required
      >
        <Radio value="consultoria" label="Consultoria" />
        <Radio value="mentoria" label="Mentoria" />
      </RadioGroup>,
    );
    const consultoria = screen.getByRole('radio', { name: 'Consultoria' });
    const mentoria = screen.getByRole('radio', { name: 'Mentoria' });
    expect(consultoria).toHaveAttribute('name', 'inicio');
    expect(mentoria).toHaveAttribute('name', 'inicio');
    expect(consultoria).toBeRequired();
    expect(mentoria).toBeChecked();
    await user.click(consultoria);
    expect(consultoria).toBeChecked();
    expect(mentoria).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith('consultoria');
  });

  it('dica e erro entram no aria-describedby do fieldset; o erro tem role="alert" e marca os radios visualmente', () => {
    render(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        hint="Você pode mudar de ideia depois."
        error="Escolha uma opção para continuar."
        options={OPCOES}
      />,
    );
    const group = screen.getByRole('group', { name: 'Como prefere começar?' });
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Escolha uma opção para continuar.');
    expect(alert.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(group.getAttribute('aria-describedby')).toContain(alert.id);
    expect(group).toHaveAccessibleDescription(
      'Você pode mudar de ideia depois. Escolha uma opção para continuar.',
    );
    expect(group).toHaveClass('mdia-radio-group--invalid');
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).not.toHaveAttribute('aria-invalid');
      expect(radio.closest('label')).toHaveClass('mdia-radio--invalid');
    });
  });

  it('desabilitado bloqueia todos os radios e não chama onChange; opção individual também pode ser desabilitada', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        onChange={onChange}
        options={OPCOES}
        disabled
      />,
    );
    expect(screen.getByRole('group')).toBeDisabled();
    expect(screen.getByRole('group')).toHaveClass('mdia-radio-group--disabled');
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
    await user.click(screen.getByText('Mentoria'));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: 'Mentoria' })).not.toBeChecked();

    rerender(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        onChange={onChange}
        options={[
          { value: 'consultoria', label: 'Consultoria' },
          { value: 'mentoria', label: 'Mentoria', disabled: true },
        ]}
      />,
    );
    expect(screen.getByRole('radio', { name: 'Consultoria' })).toBeEnabled();
    expect(screen.getByRole('radio', { name: 'Mentoria' })).toBeDisabled();
  });

  it('orientation horizontal aplica a classe modificadora', () => {
    render(
      <RadioGroup
        label="Como prefere começar?"
        name="inicio"
        orientation="horizontal"
        options={OPCOES}
      />,
    );
    expect(screen.getByRole('group')).toHaveClass('mdia-radio-group--horizontal');
    expect(screen.getByRole('group')).not.toHaveClass('mdia-radio-group--vertical');
  });
});
