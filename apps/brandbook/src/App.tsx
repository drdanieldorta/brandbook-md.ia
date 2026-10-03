import { Button, Heading, Logo, Text } from '@mdia/ui';

// Placeholder: substituído pelo brandbook completo quando a biblioteca estiver pronta.
export function App() {
  return (
    <main style={{ padding: 48, display: 'grid', gap: 24, justifyItems: 'start' }}>
      <Logo />
      <Heading level={1}>Inteligência humana. Potencial ampliado.</Heading>
      <Text measure>
        Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde.
      </Text>
      <Button>Agendar conversa</Button>
    </main>
  );
}
