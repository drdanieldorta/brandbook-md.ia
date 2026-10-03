import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Spinner } from '../Spinner/Spinner';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';
export type ToastStackPosition =
  'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-center';

const TONE_ICON: Record<ToastTone, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
};

/** `status`/`polite` para informação e sucesso; `alert`/`assertive` para atenção e erro. */
const TONE_ROLE: Record<ToastTone, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
};
const TONE_LIVE: Record<ToastTone, 'polite' | 'assertive'> = {
  info: 'polite',
  success: 'polite',
  warning: 'assertive',
  error: 'assertive',
};

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tom semântico: define ícone, cor da faixa e papel acessível. */
  tone?: ToastTone;
  /** Título curto opcional. */
  title?: ReactNode;
  /** Mensagem, ex.: "Alterações salvas." */
  children: ReactNode;
  /** Mostra o botão "Fechar notificação" e é chamado ao clicar nele. */
  onDismiss?: () => void;
  /** Ação opcional, ex.: `<Button variant="ghost" size="sm">Desfazer</Button>`. */
  action?: ReactNode;
  /** Mostra um spinner decorativo no lugar do ícone, ex.: "Salvando…". */
  loading?: boolean;
}

/**
 * Notificação transitória: superfície com sombra `lg` (a do toast da
 * demonstração), faixa e ícone no tom, entrada única de 400ms. `role` e
 * `aria-live` seguem o tom (status/polite ou alert/assertive) e podem ser
 * sobrescritos. Não há estado global: o app controla a lista e usa
 * `ToastStack` para posicionar.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    tone = 'info',
    title,
    children,
    onDismiss,
    action,
    loading = false,
    role,
    'aria-live': ariaLive,
    className,
    ...rest
  },
  ref,
) {
  const Icon = TONE_ICON[tone];
  return (
    <div
      ref={ref}
      role={role ?? TONE_ROLE[tone]}
      aria-live={ariaLive ?? TONE_LIVE[tone]}
      className={cx(
        'mdia-toast',
        `mdia-toast--${tone}`,
        loading && 'mdia-toast--loading',
        className,
      )}
      {...rest}
    >
      <span className="mdia-toast__icon" aria-hidden="true">
        {loading ? <Spinner decorative /> : <Icon />}
      </span>
      <div className="mdia-toast__body">
        {title != null ? <div className="mdia-toast__title">{title}</div> : null}
        <div className="mdia-toast__message">{children}</div>
        {action != null ? <div className="mdia-toast__action">{action}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="mdia-toast__dismiss"
          aria-label="Fechar notificação"
          onClick={() => onDismiss()}
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});

export interface ToastStackProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label'> {
  /** Canto da janela onde os toasts se empilham. */
  position?: ToastStackPosition;
  /** Rótulo acessível da região. */
  label?: string;
  children?: ReactNode;
}

/**
 * Região fixa que empilha toasts (`z-index` de toast, 24px das bordas). O
 * container não captura cliques; cada toast volta a capturá-los. Sem provider:
 * o app controla a lista de toasts.
 */
export function ToastStack({
  position = 'bottom-right',
  label = 'Notificações',
  className,
  children,
  ...rest
}: ToastStackProps) {
  return (
    <section
      aria-label={label}
      className={cx('mdia-toast-stack', `mdia-toast-stack--${position}`, className)}
      {...rest}
    >
      {children}
    </section>
  );
}
