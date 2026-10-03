import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cx } from '../../utils/cx';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

const TONE_ICON: Record<AlertTone, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
};

/** `status` (educado) para informação e sucesso; `alert` (assertivo) para atenção e erro. */
const TONE_ROLE: Record<AlertTone, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tom semântico: define ícone, cor e papel acessível. */
  tone?: AlertTone;
  /** Título curto opcional, ex.: "Não foi possível salvar." */
  title?: ReactNode;
  /** Mensagem. Obrigatória: o estado nunca depende só da cor (guia §7). */
  children: ReactNode;
  /** Mostra o botão "Fechar aviso" e é chamado ao clicar nele. */
  onDismiss?: () => void;
  /** Ação opcional, ex.: `<Button variant="ghost" size="sm">Tentar novamente</Button>`. */
  action?: ReactNode;
}

/**
 * Mensagem contextual em linha (guia §7: feedback anunciado a leitores de tela,
 * estado nunca só por cor). `role` é `status` para info/sucesso e `alert` para
 * atenção/erro; passe `role` para sobrescrever.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = 'info', title, children, onDismiss, action, role, className, ...rest },
  ref,
) {
  const Icon = TONE_ICON[tone];
  return (
    <div
      ref={ref}
      role={role ?? TONE_ROLE[tone]}
      className={cx('mdia-alert', `mdia-alert--${tone}`, className)}
      {...rest}
    >
      <span className="mdia-alert__icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="mdia-alert__body">
        {title != null ? <div className="mdia-alert__title">{title}</div> : null}
        <div className="mdia-alert__message">{children}</div>
        {action != null ? <div className="mdia-alert__action">{action}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="mdia-alert__dismiss"
          aria-label="Fechar aviso"
          onClick={() => onDismiss()}
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});
