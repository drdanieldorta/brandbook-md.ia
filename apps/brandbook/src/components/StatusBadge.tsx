import { Badge } from '@mdia/ui';
import type { Status } from '../content/brand';

const LABEL: Record<Status, string> = {
  guia: 'Guia 4.0',
  proposta: 'Proposta v1',
  observado: 'Observado na demonstração',
};

const TONE: Record<Status, 'brand' | 'warning' | 'neutral'> = {
  guia: 'brand',
  proposta: 'warning',
  observado: 'neutral',
};

/** Marca a origem de um valor: guia 4.0, proposta v1 ou observado na demonstração. */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge tone={TONE[status]} variant="soft" size="sm">
      {LABEL[status]}
    </Badge>
  );
}
