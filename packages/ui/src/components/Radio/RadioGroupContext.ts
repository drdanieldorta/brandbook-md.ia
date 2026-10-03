import { createContext, useContext } from 'react';

/** Estado que o RadioGroup compartilha com cada Radio filho. Uso interno. */
export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  onChange: (value: string) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/** Contexto do RadioGroup mais próximo, ou `null` quando o Radio é avulso. */
export function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
