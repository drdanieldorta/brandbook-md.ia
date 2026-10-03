// Conteúdo do brandbook, transcrito de docs/brandbook.md (guia 4.0).
// Status de cada bloco preservado: "guia" = recomendação existente no guia;
// "proposta" = valor proposto nesta implementação (docs/propostas-v1.md).

export type Status = 'guia' | 'proposta' | 'observado';

export interface NavSection {
  id: string;
  label: string;
}

export const sections: NavSection[] = [
  { id: 'essencia', label: 'Essência' },
  { id: 'logo', label: 'Logo' },
  { id: 'cores', label: 'Cores' },
  { id: 'tipografia', label: 'Tipografia' },
  { id: 'espacamento', label: 'Espaçamento' },
  { id: 'movimento', label: 'Movimento' },
  { id: 'componentes', label: 'Componentes' },
  { id: 'imagem', label: 'Fotografia e 3D' },
  { id: 'aplicacoes', label: 'Aplicações' },
  { id: 'status', label: 'Status' },
  { id: 'tokens', label: 'Tokens' },
];

export const essence = {
  atuacao: 'Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde.',
  publico:
    'Clínicas, médicos empresários e negócios de saúde que buscam entender e aplicar IA na gestão. Consultoria oferece visão estratégica; mentoria desenvolve autonomia.',
  principios: [
    {
      nome: 'Clareza',
      regra: 'Traduzir o complexo com exemplos compreensíveis e próximos da rotina de gestão.',
    },
    {
      nome: 'Critério',
      regra: 'Relacionar tecnologia a necessidades, limites e responsabilidade.',
    },
    {
      nome: 'Proximidade',
      regra: 'Orientar líderes e equipes com escuta, método e linguagem humana.',
    },
  ],
  tom: 'Tom direto, didático e confiante. Explicar siglas no primeiro uso, nomear limites e propor próximos passos concretos.',
  usar: 'Vamos identificar onde a IA pode apoiar sua operação.',
  evitar: 'Revolucione sua clínica com resultados garantidos.',
  limites:
    'Não prometer desfechos clínicos, ganhos financeiros ou conformidade automática. Não substituir a avaliação dos profissionais responsáveis.',
  frases: [
    'Inteligência humana. Potencial ampliado.',
    'Clareza para decidir. Confiança para evoluir.',
    'Tecnologia com critério. Saúde com protagonismo humano.',
    'Clareza na estratégia. Consistência na expressão.',
  ],
};

export interface LogoFile {
  arquivo: string;
  natureza: string;
}

export const logoFiles: LogoFile[] = [
  {
    arquivo: 'mdia-original.png',
    natureza: 'Referência mdia_png.png, 4096 × 4096 px, preservada com fundo preto.',
  },
  {
    arquivo: 'mdia-referencia-complementar.png',
    natureza: 'Original mdia_logo_semfundo.png, 3162 × 3162 px, transparente, preservado intacto.',
  },
  {
    arquivo: 'mdia-logo-mestre.svg',
    natureza: 'Reconstrução do mestre com brilho; 12 gradientes e 1 filtro SVG nativo.',
  },
  {
    arquivo: 'mdia-logo-limpo.svg',
    natureza:
      'Mesma geometria e gradientes do mestre, sem filtro; apresentação priorizada pelo guia.',
  },
  {
    arquivo: 'mdia-logo-referencia-sem-fundo-vetorizado.svg',
    natureza:
      'Reconstrução específica do PNG sem fundo: M com terminações curvas, pontos roxos maiores sem centros brancos e ECG sem halo. Distinta do mestre e da variante limpa.',
  },
  { arquivo: 'mdia-logo-offwhite.svg', natureza: 'Uma tinta #F5F3EE, para fundos escuros.' },
  { arquivo: 'mdia-logo-preto.svg', natureza: 'Uma tinta #000000, para fundos claros.' },
  {
    arquivo: 'mdia-logo-branco.svg',
    natureza: 'Uma tinta #FFFFFF; mdia-logo-reverso.svg é alias branco.',
  },
  { arquivo: 'mdia-logo-monocromatico.svg', natureza: 'Uma tinta #102B50.' },
  { arquivo: 'mdia-favicon.svg', natureza: 'Favicon derivado do M.' },
];

export const logoRules = {
  preservar:
    'Contornos das letras; ponto circular; topo plano do A; gradientes azuis por letra; gradiente dourado do ECG; nós roxos; conexões e sobreposição interna do ECG/ponto com o D.',
  proibido: [
    'Reconstruir o lettering com Segoe UI ou outra fonte: a fonte original não foi identificada com segurança.',
    'Cortar o halo, distorcer, inclinar ou desfazer sobreposições internas.',
    'Inferir os gradientes a partir da paleta sólida ou aplicar um único gradiente ao conjunto.',
    'Trocar a variante limpa pelo vetor da referência sem fundo (ou vice-versa) silenciosamente.',
  ],
  proporcao: [
    { rotulo: 'Prancheta do mestre', valor: 'viewBox 220 630 1160 390 · proporção 116:39' },
    { rotulo: 'Desenho sólido aproximado', valor: '1095 × 321 unidades' },
    { rotulo: 'Proteção', valor: 'pelo menos 1x, com x = 30 unidades, ao redor do desenho sólido' },
    { rotulo: 'Largura preferida', valor: '280 px na tela · 60 mm na impressão' },
    {
      rotulo: 'Redução máxima',
      valor:
        '160 px · 35 mm (variante sem brilho, em contexto já identificado, após conferir o suporte)',
    },
    { rotulo: 'Abaixo disso', valor: 'nome por escrito ou favicon M' },
  ],
  fundos: [
    'Mestre com brilho: fundo escuro uniforme.',
    'Fundo claro: variante sem brilho (limpa) ou preta.',
    'Fundo escuro: off-white, conforme contraste real.',
    'Em renderizadores incompatíveis com filtro: PNG transparente ou variante limpa. Fazer prova de impressão.',
  ],
};

export interface ColorEntry {
  token: string;
  nome: string;
  hex: string;
  papel: string;
  status: Status;
}

export const paletteGuide: ColorEntry[] = [
  {
    token: 'colors.blue',
    nome: 'Azul vivo',
    hex: '#1761D8',
    papel: 'Ação e apoio de interface.',
    status: 'guia',
  },
  {
    token: 'colors.navy',
    nome: 'Azul-noite',
    hex: '#102B50',
    papel: 'Texto e fundos.',
    status: 'guia',
  },
  {
    token: 'colors.gold',
    nome: 'Dourado',
    hex: '#C6A45C',
    papel: 'Acento de apoio. Não usar em texto pequeno sobre branco.',
    status: 'guia',
  },
  {
    token: 'colors.purple',
    nome: 'Roxo',
    hex: '#8056C7',
    papel: 'Acentos, referência aos nós e anel de foco.',
    status: 'guia',
  },
  { token: 'colors.ice', nome: 'Gelo', hex: '#F3F6FA', papel: 'Superfícies.', status: 'guia' },
  {
    token: 'colors.white',
    nome: 'Branco',
    hex: '#FFFFFF',
    papel: 'Leitura e superfícies.',
    status: 'guia',
  },
  {
    token: 'logo.offwhite',
    nome: 'Off-white',
    hex: '#F5F3EE',
    papel: 'Logo monocromático para fundos escuros.',
    status: 'guia',
  },
  {
    token: 'logo.black',
    nome: 'Preto',
    hex: '#000000',
    papel: 'Logo monocromático para fundos claros.',
    status: 'guia',
  },
];

export const paletteNeutrals: ColorEntry[] = [
  {
    token: 'neutrals.textSecondary',
    nome: 'Texto secundário',
    hex: '#57677B',
    papel: 'Informação de apoio.',
    status: 'observado',
  },
  {
    token: 'neutrals.textDisabled',
    nome: 'Texto desabilitado',
    hex: '#536278',
    papel: 'Sobre #DDE4ED.',
    status: 'observado',
  },
  {
    token: 'neutrals.border',
    nome: 'Borda',
    hex: '#DDE4ED',
    papel: 'Contornos de campos e cards.',
    status: 'observado',
  },
  {
    token: 'neutrals.surfaceHover',
    nome: 'Hover do secundário',
    hex: '#E9F0F9',
    papel: 'Fundo de hover do botão secundário.',
    status: 'observado',
  },
  {
    token: 'neutrals.surfaceGhostHover',
    nome: 'Hover da ação discreta',
    hex: '#EDF3FD',
    papel: 'Fundo de hover da ação discreta.',
    status: 'observado',
  },
  {
    token: 'colors.blueHover',
    nome: 'Azul hover',
    hex: '#104DAE',
    papel: 'Hover do botão principal (explicitado no guia).',
    status: 'guia',
  },
];

export const identityPalette: ColorEntry[] = [
  {
    token: 'identity.bg',
    nome: 'Carvão 900',
    hex: '#0C0D0F',
    papel: 'Fundo da página.',
    status: 'proposta',
  },
  {
    token: 'identity.surfaceAlt',
    nome: 'Carvão 800',
    hex: '#101114',
    papel: 'Faixas alternativas.',
    status: 'proposta',
  },
  {
    token: 'identity.surface',
    nome: 'Carvão 700',
    hex: '#17191D',
    papel: 'Cabeçalho, painéis e campos.',
    status: 'proposta',
  },
  {
    token: 'identity.surfaceRaised',
    nome: 'Carvão 600',
    hex: '#202329',
    papel: 'Cards e elementos elevados.',
    status: 'proposta',
  },
  {
    token: 'identity.line',
    nome: 'Linha',
    hex: '#33363D',
    papel: 'Bordas e divisores.',
    status: 'proposta',
  },
  {
    token: 'identity.text',
    nome: 'Texto',
    hex: '#F1EEE8',
    papel: 'Leitura sobre carvão.',
    status: 'proposta',
  },
  {
    token: 'identity.textSecondary',
    nome: 'Texto secundário',
    hex: '#ADB2BB',
    papel: 'Informação de apoio.',
    status: 'proposta',
  },
  {
    token: 'identity.blue',
    nome: 'Azul sobre carvão',
    hex: '#5F96E8',
    papel: 'Links, kickers e ações discretas.',
    status: 'proposta',
  },
  {
    token: 'identity.gold',
    nome: 'Dourado sobre carvão',
    hex: '#E3B777',
    papel: 'Ícones, numerais e acentos.',
    status: 'proposta',
  },
];

export const goldGradient =
  'linear-gradient(115deg, #D8AA6B 0%, #F2C777 24%, #FFF1B6 42%, #DCA05E 63%, #FFE5A2 82%, #D8AA6B 100%)';

export const paletteSemantic: ColorEntry[] = [
  {
    token: 'semantic.success',
    nome: 'Sucesso',
    hex: '#1E7B4E',
    papel: 'Fundo #E6F4EC.',
    status: 'proposta',
  },
  {
    token: 'semantic.warning',
    nome: 'Alerta',
    hex: '#8A6A1F',
    papel: 'Fundo #FBF4E3. Dourado escurecido para contraste.',
    status: 'proposta',
  },
  {
    token: 'semantic.error',
    nome: 'Erro',
    hex: '#C0392B',
    papel: 'Fundo #FBEAE7.',
    status: 'proposta',
  },
  {
    token: 'semantic.info',
    nome: 'Informação',
    hex: '#1761D8',
    papel: 'Fundo #E8F0FC. Reaproveita o azul vivo.',
    status: 'proposta',
  },
];

export interface ContrastPair {
  nome: string;
  fg: string;
  bg: string;
  nota?: string;
}

export const contrastPairs: ContrastPair[] = [
  {
    nome: 'Off-white sobre carvão',
    fg: '#F1EEE8',
    bg: '#0C0D0F',
    nota: 'Texto da identidade escura.',
  },
  { nome: 'Texto secundário sobre painel', fg: '#ADB2BB', bg: '#17191D' },
  { nome: 'Azul clareado sobre carvão', fg: '#5F96E8', bg: '#0C0D0F', nota: 'Links e kickers.' },
  {
    nome: 'Azul vivo do guia sobre carvão',
    fg: '#1761D8',
    bg: '#0C0D0F',
    nota: 'Por isso o azul clareia no escuro.',
  },
  { nome: 'Dourado sobre painel', fg: '#E3B777', bg: '#17191D', nota: 'Ícones e numerais.' },
  { nome: 'Texto escuro sobre dourado', fg: '#17130D', bg: '#E3B777', nota: 'Botão principal.' },
  { nome: 'Branco sobre azul vivo', fg: '#FFFFFF', bg: '#1761D8', nota: 'Botão principal.' },
  { nome: 'Branco sobre azul-noite', fg: '#FFFFFF', bg: '#102B50' },
  {
    nome: 'Azul-noite sobre dourado',
    fg: '#102B50',
    bg: '#C6A45C',
    nota: 'Par que o guia pede para verificar.',
  },
  {
    nome: 'Dourado sobre azul-noite',
    fg: '#C6A45C',
    bg: '#102B50',
    nota: 'Acento sobre fundo escuro.',
  },
  {
    nome: 'Dourado sobre branco',
    fg: '#C6A45C',
    bg: '#FFFFFF',
    nota: 'Evitar em texto pequeno (guia).',
  },
  {
    nome: 'Off-white sobre preto',
    fg: '#F5F3EE',
    bg: '#000000',
    nota: 'O guia informa aproximadamente 18,9:1.',
  },
  { nome: 'Azul-noite sobre gelo', fg: '#102B50', bg: '#F3F6FA' },
  { nome: 'Texto secundário sobre branco', fg: '#57677B', bg: '#FFFFFF' },
  {
    nome: 'Roxo (foco) sobre branco',
    fg: '#8056C7',
    bg: '#FFFFFF',
    nota: 'Componente: mínimo 3:1.',
  },
];

export const colorRules = [
  'Texto comum: pelo menos 4,5:1. Componentes e texto grande: 3:1.',
  'Azul-noite e branco sustentam a leitura; azul vivo orienta a ação; dourado e roxo aparecem em pequenos gestos.',
  'Distribuição sugerida, não quota rígida: 60% neutros / 30% azuis / 10% acentos.',
  'Evitar dourado em texto pequeno sobre branco; usar acentos como decoração ou sobre fundo escuro, verificando o par real.',
  'Não comunicar estados apenas por cor: combinar rótulo, ícone ou instrução.',
  'CMYK no guia é aproximado a partir do RGB, sem perfil ICC. Não há Pantone definido. Ajustar com a gráfica e validar em prova.',
];

export interface TypeLevel {
  nivel: string;
  tamanho: string;
  peso: number;
  status: Status;
  exemplo: string;
}

export const typeScale: TypeLevel[] = [
  {
    nivel: 'Display',
    tamanho: '56–64 px',
    peso: 600,
    status: 'guia',
    exemplo: 'Inteligência humana.',
  },
  {
    nivel: 'Título',
    tamanho: '32–40 px',
    peso: 600,
    status: 'guia',
    exemplo: 'Clareza para decidir.',
  },
  {
    nivel: 'Heading',
    tamanho: '24 px',
    peso: 600,
    status: 'proposta',
    exemplo: 'Tecnologia com critério.',
  },
  {
    nivel: 'Subheading',
    tamanho: '20 px',
    peso: 600,
    status: 'proposta',
    exemplo: 'Saúde com protagonismo humano.',
  },
  {
    nivel: 'Corpo',
    tamanho: '16–18 px',
    peso: 400,
    status: 'guia',
    exemplo: 'Consultoria oferece visão estratégica; mentoria desenvolve autonomia.',
  },
  { nivel: 'Rótulo', tamanho: '14 px', peso: 600, status: 'guia', exemplo: 'Nome da clínica' },
  {
    nivel: 'Legenda',
    tamanho: '12 px',
    peso: 400,
    status: 'proposta',
    exemplo: 'Imagem sintética gerada por IA.',
  },
];

export const typeRules = [
  'Família de apoio do guia: "Segoe UI", Arial, sans-serif, sem arquivos distribuídos. Nesta implementação, Inter (SIL OFL) embarcada com essas famílias como fallback (proposta v1).',
  'Token base de corpo: 16px. Entrelinha de títulos 1,1; de corpo 1,6.',
  'Comprimento de linha: 45–75 caracteres.',
  'Evitar caixa alta em parágrafos e pesos leves sobre fotos.',
  'Não usar a fonte de interface para redesenhar o logo.',
  'Não há fórmula normativa de interpolação responsiva; os clamps desta implementação são decisão técnica dentro dos intervalos do guia.',
];

export const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64, 96];

export const radii = [
  { token: 'radius.button', valor: '8px', uso: 'Botões, campos, alertas.' },
  { token: 'radius.panel', valor: '16px', uso: 'Cards, painéis, toasts.' },
  { token: 'radius.full', valor: '999px', uso: 'Badges e alternâncias (proposta).' },
];

export const motion = {
  tokens: [
    { token: 'motion.feedback', valor: '180ms', uso: 'Hover, foco, alternâncias.' },
    { token: 'motion.entrance', valor: '400ms', uso: 'Entrada única de toasts e seções.' },
    { token: 'motion.easing', valor: 'cubic-bezier(0.2, 0.7, 0.2, 1)', uso: 'Curva padrão.' },
  ],
  regras: [
    'Animar uma vez, sem flashes nem ciclos contínuos. O indicador de carregamento é a única exceção funcional.',
    'Respeitar prefers-reduced-motion: reduce. Animações e transições são desativadas e a assinatura permanece estática.',
  ],
};

export const componentRules = {
  botoes: [
    'Identidade escura (proposta v2): ação principal em gradiente dourado com texto escuro; o azul fica para links e ações discretas.',
    'Uma ação principal por contexto; rótulo com verbo claro.',
    'Área de toque mínima de 44 × 44 px. Raio 8 px. Foco sempre visível (contorno de 3 px).',
    'Principal: fundo azul #1761D8, texto branco; hover #104DAE.',
    'Secundário: branco com borda e texto azul-noite. Ação discreta: fundo transparente com texto azul vivo.',
    'Desabilitado: sem interação.',
    'Rótulos demonstrados são exemplos; não presumir integração de agendamento.',
  ],
  formularios: [
    'Usar labels, navegação por teclado e feedback anunciado para leitores de tela.',
    'Sucesso: "Alterações salvas." Erro: "Não foi possível salvar. Tente novamente." Carregamento: "Salvando…" com prevenção de duplo envio.',
    'Estados não podem depender exclusivamente da cor.',
  ],
};

export const imagery = {
  fotografia: [
    'Pessoas antes da tecnologia: luz natural, gestos espontâneos, diversidade e ambientes reais. Priorizar colaboração e escuta.',
    'Preservar tons de pele e evitar filtros azulados intensos.',
    'Usar imagens próprias ou licenciadas, com autorização de uso de imagem quando aplicável. Não expor prontuários, nomes ou telas de pacientes.',
    'Identificar imagens sintéticas quando puderem sugerir pessoas, instalações ou situações reais. Evitar encenar resultados clínicos e depoimentos.',
  ],
  tresD: [
    'Volume com sobriedade: azul fosco, metal dourado acetinado e pontos roxos. Luz lateral suave; no máximo um objeto protagonista.',
    'Preservar a assinatura plana e legível. O pulso é um elemento de identidade, não um traçado clínico.',
    'Evitar robôs genéricos, cérebros neon e estética de ficção científica.',
    'Não há parâmetros numéricos de material, câmera, iluminação, roughness ou metalness definidos.',
  ],
  aviso:
    'As imagens de referência são sintéticas, geradas por IA. Não retratam equipe, clínica ou modelo 3D editável da MD.IA.',
};

export const applications = [
  {
    nome: 'Slide 16:9',
    arquivo: 'mdia-modelo-slide.svg',
    tamanho: '1920 × 1080',
    regra: 'Um título por tela, uma ideia por bloco; acentos orientam o olhar.',
  },
  {
    nome: 'Post 1:1',
    arquivo: 'mdia-modelo-post.svg',
    tamanho: '1080 × 1080',
    regra: 'Abrir com a ideia, desenvolver com exemplos e concluir com próximo passo útil.',
  },
  {
    nome: 'Cartão',
    arquivo: 'mdia-modelo-cartao.svg',
    tamanho: '900 × 500 (prancheta, não tamanho físico)',
    regra:
      'Preparar sangria, perfil de cor e prova com a gráfica. Nenhuma medida normativa de sangria foi fornecida.',
  },
];

export const differences = [
  {
    tema: 'Raio de painel',
    evidencia: 'JSON: 16px; várias superfícies do CSS: 12px.',
    orientacao:
      'Usar 16px como token distribuído; registrar exceções se reproduzir a demonstração.',
  },
  {
    tema: 'Títulos',
    evidencia: 'Texto do guia: entrelinha 1,1; CSS global: 1,14.',
    orientacao: 'Preservar 1,1 como recomendação documental.',
  },
  {
    tema: 'Escala tipográfica',
    evidencia: 'Guia: display 56–64px e título 32–40px; CSS usa clamps e exceções diferentes.',
    orientacao: 'Manter os intervalos do guia; adaptação responsiva é decisão de implementação.',
  },
  {
    tema: 'Toque',
    evidencia: 'Guia: mínimo 44 × 44px; botões do CSS: min-height 46px.',
    orientacao: 'Garantir ambas as dimensões mínimas de 44px; 46px é detalhe observado.',
  },
  {
    tema: 'Foco',
    evidencia: 'CSS geral: offset 5px; amostra de foco: offset 3px.',
    orientacao: 'Contorno de 3px está definido; offset não é token normativo consolidado.',
  },
  {
    tema: 'Logo limpo',
    evidencia: 'Variante do mestre e vetor específico do PNG sem fundo são distintos.',
    orientacao: 'Selecionar o ativo explicitamente; não trocar um pelo outro pelo nome.',
  },
  {
    tema: 'Aprovação',
    evidencia:
      'Há rótulos de referência final aprovada; rodapé/avisos mantêm aplicações como propostas.',
    orientacao: 'Não estender aprovação do desenho a todas as regras e textos.',
  },
];

export const openGaps = [
  'Recuperação e comparação com o TXT original da Library.',
  'Aprovação definitiva das recomendações de aplicação e linguagem verbal.',
  'Fonte original do lettering.',
  'Grade e breakpoints normativos; regras de interpolação tipográfica.',
  'Sistema completo de ícones, sombras, elevação, z-index e estados semânticos.',
  'Especificação completa de formulários e componentes além dos exemplos.',
  'Pantone, perfis ICC, valores CMYK de produção e sangria.',
  'Parâmetros físicos de 3D e animações além dos tempos/easing documentados.',
];

export const proposalsSummary = [
  {
    tema: 'Identidade escura (v2)',
    proposta:
      'Carvão em camadas, dourado em gradiente e azul clareado como padrão, inspirados no playbook. Tema claro do guia disponível por escopo.',
  },
  {
    tema: 'Tipografia',
    proposta: 'Inter embarcada (SIL OFL); níveis heading 24, subheading 20, legenda 12.',
  },
  {
    tema: 'Neutros',
    proposta:
      'Texto secundário, desabilitado, borda e hovers observados na demonstração, adotados como tokens.',
  },
  {
    tema: 'Estados',
    proposta: 'Sucesso, alerta, erro e informação com fundos claros e versões para tema escuro.',
  },
  {
    tema: 'Tema escuro',
    proposta: 'Azul-noite como superfície, com dois tons derivados para camadas.',
  },
  {
    tema: 'Elevação e camadas',
    proposta: 'Três sombras (a do toast vem da demonstração) e escala de z-index.',
  },
  { tema: 'Layout', proposta: 'Breakpoints 640/768/1024/1280, container 1200px, medida 65ch.' },
  { tema: 'Ícones', proposta: 'lucide-react, sempre acompanhados de rótulo.' },
];
