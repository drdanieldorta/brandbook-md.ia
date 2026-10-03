import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type ThemeMode = 'dark' | 'light';
export type ThemeScopeElement = 'div' | 'section' | 'main' | 'article' | 'aside';

export interface ThemeScopeProps extends HTMLAttributes<HTMLElement> {
  /** Elemento renderizado; padrão `div`. */
  as?: ThemeScopeElement;
  /** `dark` (padrão da biblioteca, identidade v2) ou `light` (paleta do guia 4.0). */
  mode?: ThemeMode;
  /** Respiro interno de 24px já com o fundo do tema (amostras, painéis). */
  inset?: boolean;
  /** Ocupa no mínimo a altura da janela: raiz de páginas inteiras. */
  fill?: boolean;
}

/**
 * Escopo de tema: pinta fundo e texto do tema escolhido e redefine os tokens
 * `--mdia-*` para tudo o que estiver dentro. Envolva páginas inteiras com
 * `fill`, ou uma área isolada (um painel claro em uma página escura) com `inset`.
 * Equivale às classes `mdia-dark` / `mdia-light` e ao atributo `data-theme`.
 */
export function ThemeScope({
  as = 'div',
  mode = 'dark',
  inset = false,
  fill = false,
  className,
  children,
  ...rest
}: ThemeScopeProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cx(
        'mdia-theme',
        mode === 'light' ? 'mdia-light' : 'mdia-dark',
        inset && 'mdia-theme--inset',
        fill && 'mdia-theme--fill',
        className,
      )}
      data-theme={mode}
      {...rest}
    >
      {children}
    </Tag>
  );
}
