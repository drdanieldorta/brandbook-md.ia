import { Eyebrow, Heading, Stack, Text } from '@mdia/ui';
import type { ReactNode } from 'react';

interface SectionIntroProps {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Kicker acima do título, ex.: "01 · Essência". */
  eyebrow?: ReactNode;
}

/** Título de seção (h2) com kicker opcional e o id usado por aria-labelledby e pela navegação. */
export function SectionIntro({ id, title, lead, eyebrow }: SectionIntroProps) {
  return (
    <Stack gap={3}>
      {eyebrow ? <Eyebrow tone="gold">{eyebrow}</Eyebrow> : null}
      <Heading level={2} size="title" id={id} balance>
        {title}
      </Heading>
      {lead ? (
        <Text size="lg" tone="secondary" measure>
          {lead}
        </Text>
      ) : null}
    </Stack>
  );
}
