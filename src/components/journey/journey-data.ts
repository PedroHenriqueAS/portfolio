export type JourneyDetail = {
  title: string;
  description: string;
};

export type JourneyStep = {
  id: string;
  title: string;
  period: string;
  detailedPeriod?: string;
  category: string;
  role: string;
  description: string;
  deliveries: JourneyDetail[];
  learnings: JourneyDetail[];
  technologies: string[];
};

export const journeySteps: JourneyStep[] = [
  {
    id: "consultoria-digital",
    title: "Consultoria Digital",
    period: "2019 — 2020",
    category: "Primeiras experiências",
    role: "Desenvolvedor Front-end",
    description:
      "Um primeiro capítulo de descobertas, experimentação e ideias que começaram a ganhar forma na tela.",
    deliveries: [
      {
        title: "Primeiras interfaces",
        description: "Páginas e experiências para a web.",
      },
      {
        title: "Layouts responsivos",
        description: "Adaptação para diferentes tamanhos de tela.",
      },
      {
        title: "Interações",
        description: "Detalhes que tornam a navegação mais intuitiva.",
      },
    ],
    learnings: [
      {
        title: "Fundamentos",
        description: "Estrutura, estilo e comportamento das interfaces.",
      },
      {
        title: "Atenção aos detalhes",
        description: "Cuidado com a apresentação e a usabilidade.",
      },
      {
        title: "Prática contínua",
        description: "Aprendizado por meio de pequenos projetos.",
      },
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "doris-mobi",
    title: "Doris.mobi",
    period: "2020 — 2021",
    category: "Produtos digitais",
    role: "Desenvolvedor Front-end",
    description:
      "Uma etapa para colocar o aprendizado em prática e encontrar novas maneiras de resolver problemas.",
    deliveries: [
      {
        title: "Componentes reutilizáveis",
        description: "Interfaces construídas a partir de peças compartilhadas.",
      },
      {
        title: "Integrações",
        description: "Conexão entre dados e experiências na tela.",
      },
      {
        title: "Evolução de interfaces",
        description: "Melhorias nos fluxos e na apresentação do produto.",
      },
    ],
    learnings: [
      {
        title: "Organização",
        description: "Código mais claro e fácil de manter.",
      },
      {
        title: "Reutilização",
        description: "Consistência entre diferentes partes da aplicação.",
      },
      {
        title: "Colaboração",
        description: "Trocas de conhecimento durante o desenvolvimento.",
      },
    ],
    technologies: ["JavaScript", "React", "Git"],
  },
  {
    id: "direcao-concursos",
    title: "Direção Concursos",
    period: "2021 — 2022",
    category: "Educação e tecnologia",
    role: "Desenvolvedor Front-end",
    description:
      "Um capítulo dedicado a pensar além da tela e entender como cada interação participa de uma experiência maior.",
    deliveries: [
      {
        title: "Jornadas de navegação",
        description: "Fluxos pensados para facilitar o uso do produto.",
      },
      {
        title: "Componentes compartilhados",
        description: "Evolução de uma base visual consistente.",
      },
      {
        title: "Design e código",
        description: "Transformação de propostas visuais em interfaces.",
      },
    ],
    learnings: [
      {
        title: "Visão de produto",
        description: "Entendimento do contexto de cada interação.",
      },
      {
        title: "Consistência visual",
        description: "Atenção aos padrões e aos detalhes.",
      },
      {
        title: "Trabalho em equipe",
        description: "Alinhamento entre desenvolvimento e design.",
      },
    ],
    technologies: ["React", "TypeScript", "Figma"],
  },
  {
    id: "hospital-einstein",
    title: "Hospital Israelita Albert Einstein",
    period: "2022 — 2025",
    detailedPeriod: "Dez. 2022 — Jan. 2025",
    category: "Saúde e tecnologia",
    role: "Desenvolvedor Front-end",
    description:
      "Aplicações para a área da saúde, conectando formulários, documentos e experiências de atendimento.",
    deliveries: [
      {
        title: "Formulários dinâmicos",
        description: "Fluxos com React Hook Form.",
      },
      {
        title: "Documentos e atendimento",
        description: "Relatórios, PDFs e videoatendimento.",
      },
      {
        title: "Testes e qualidade",
        description: "Componentes e fluxos com Jest e Cypress.",
      },
    ],
    learnings: [
      {
        title: "Dados sensíveis",
        description: "Cuidado com informações de saúde.",
      },
      {
        title: "Experiência consistente",
        description: "Interfaces alinhadas ao Design System.",
      },
      {
        title: "Trabalho em equipe",
        description: "Colaboração com produto e QA.",
      },
    ],
    technologies: ["React", "TypeScript", "React Hook Form", "Jest", "Cypress"],
  },
  {
    id: "intercambio-irlanda",
    title: "Intercâmbio na Irlanda",
    period: "2025 — 2026",
    category: "Perspectivas e descobertas",
    role: "Expandindo o repertório",
    description:
      "Um momento para explorar outros contextos, conhecer novas perspectivas e levar essas descobertas para o trabalho.",
    deliveries: [
      {
        title: "Novas experiências",
        description: "Contato com outras ideias e formas de trabalhar.",
      },
      {
        title: "Projetos pessoais",
        description: "Espaço para experimentação e criatividade.",
      },
      {
        title: "Aprendizado contínuo",
        description: "Desenvolvimento de novas habilidades.",
      },
    ],
    learnings: [
      {
        title: "Comunicação",
        description: "Trocas com pessoas de diferentes contextos.",
      },
      {
        title: "Autonomia",
        description: "Adaptação a novas situações e desafios.",
      },
      {
        title: "Novas perspectivas",
        description: "Experiências que ampliam o repertório criativo.",
      },
    ],
    technologies: ["Comunicação", "Design", "Criatividade"],
  },
  {
    id: "freelance",
    title: "Freelance",
    period: "2026 — atual",
    category: "Projetos independentes",
    role: "Desenvolvedor Front-end",
    description:
      "A jornada continua com novas possibilidades, projetos autorais e vontade de transformar boas ideias em experiências.",
    deliveries: [
      {
        title: "Interfaces com identidade",
        description: "Projetos com cuidado visual e atenção aos detalhes.",
      },
      {
        title: "Novas interações",
        description: "Exploração de ferramentas e possibilidades da web.",
      },
      {
        title: "Projetos autorais",
        description: "Ideias que ganham forma do conceito à entrega.",
      },
    ],
    learnings: [
      {
        title: "Responsabilidade",
        description: "Acompanhamento de cada etapa do projeto.",
      },
      {
        title: "Decisões técnicas",
        description: "Escolhas adequadas ao contexto de cada entrega.",
      },
      {
        title: "Curiosidade",
        description: "Espaço para continuar aprendendo e experimentando.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "Motion"],
  },
];
