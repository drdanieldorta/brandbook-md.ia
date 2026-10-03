import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Formulários/Checkbox',
  component: Checkbox,
  args: {
    label: 'Aceito os termos de uso e a política de privacidade',
    disabled: false,
    invalid: false,
    indeterminate: false,
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Caso padrão: rótulo visível obrigatório; a linha inteira (44px) é clicável. */
export const Padrao: Story = {};

/** Descrição secundária abaixo do rótulo, ligada ao input por aria-describedby. */
export const ComDescricao: Story = {
  args: {
    label: 'Receber novidades da MD.IA',
    description: 'Conteúdos sobre IA aplicada a negócios de saúde, direto no seu e-mail.',
  },
};

/** Estados: marcado, indeterminado, inválido com mensagem (role="alert") e desabilitado. Nenhum depende só de cor. */
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 4, minWidth: 320 }}>
      <Checkbox {...args} label="Desmarcado" />
      <Checkbox {...args} label="Marcado" defaultChecked />
      <Checkbox {...args} label="Indeterminado" indeterminate />
      <Checkbox
        {...args}
        label="Aceito os termos de uso e a política de privacidade"
        error="Aceite os termos para continuar."
      />
      <Checkbox {...args} label="Desabilitado" disabled />
      <Checkbox {...args} label="Desabilitado e marcado" disabled defaultChecked />
    </div>
  ),
};

const AREAS = [
  { value: 'agenda', label: 'Agenda' },
  { value: 'faturamento', label: 'Faturamento' },
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'comunicacao', label: 'Comunicação com pacientes' },
];

function GrupoAreasDeInteresse() {
  const [selected, setSelected] = useState<string[]>(['agenda']);
  const all = selected.length === AREAS.length;
  const some = selected.length > 0 && !all;
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0, minWidth: 320 }}>
      <legend style={{ padding: 0, marginBottom: 8, fontWeight: 600 }}>Áreas de interesse</legend>
      <div style={{ display: 'grid', gap: 4 }}>
        <Checkbox
          label="Todas as áreas"
          checked={all}
          indeterminate={some}
          onChange={(event) => setSelected(event.target.checked ? AREAS.map((a) => a.value) : [])}
        />
        <div style={{ display: 'grid', gap: 4, paddingLeft: 32 }}>
          {AREAS.map((area) => (
            <Checkbox
              key={area.value}
              name="areas"
              value={area.value}
              label={area.label}
              checked={selected.includes(area.value)}
              onChange={(event) =>
                setSelected((prev) =>
                  event.target.checked
                    ? [...prev, area.value]
                    : prev.filter((v) => v !== area.value),
                )
              }
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}

/** Grupo de checkboxes em fieldset com legenda; "Todas as áreas" usa `indeterminate` quando parte dos itens está marcada. */
export const Grupo: Story = {
  render: () => <GrupoAreasDeInteresse />,
};

/** Sobre fundo escuro os tokens semânticos trocam superfície, borda e texto; o azul marcado permanece. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'grid', gap: 4, padding: 24, minWidth: 320 }}>
      <Checkbox
        {...args}
        label="Receber novidades da MD.IA"
        description="Conteúdos sobre IA aplicada a negócios de saúde, direto no seu e-mail."
      />
      <Checkbox {...args} label="Marcado" defaultChecked />
      <Checkbox {...args} label="Indeterminado" indeterminate />
      <Checkbox
        {...args}
        label="Aceito os termos de uso e a política de privacidade"
        error="Aceite os termos para continuar."
      />
      <Checkbox {...args} label="Desabilitado" disabled />
    </div>
  ),
};
