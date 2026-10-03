import { Heading, Stack, Text } from '@mdia/ui';
import type { ReactNode } from 'react';

interface SectionIntroProps {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
}

/** Título de seção (h2) com o id usado por aria-labelledby e pela navegação. */
export function SectionIntro({ id, title, lead }: SectionIntroProps) {
  return (
    <Stack gap={3}>
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
