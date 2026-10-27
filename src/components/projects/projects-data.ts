export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  tapeLabel: string;
  accent: string;
  preview?: "store" | "pokedex" | "kanban";
  previewImage?: string;
  siteUrl?: string;
  githubUrl?: string;
  inDevelopment?: boolean;
  features: {
    icon: "shopping" | "mobile" | "search" | "layers";
    title: string;
    description: string;
  }[];
  technologies: string[];
};

// Dados demonstrativos. Adicione os links e uma imagem em /public ao cadastrar cada projeto.
// previewImage: "/projects/meu-projeto.png", siteUrl: "https://...", githubUrl: "https://github.com/..."
export const projects: PortfolioProject[] = [
  {
    id: "formlab",
    title: "FormLab",
    category: "E-commerce / Projeto pessoal",
    description:
      "Moda, identidade e uma experiência de compra com atenção aos detalhes.",
    tapeLabel: "STREETWEAR / WEB",
    accent: "#c792ff",
    preview: "store",
    features: [
      {
        icon: "shopping",
        title: "Catálogo e filtros",
        description: "Encontre produtos com facilidade.",
      },
      {
        icon: "mobile",
        title: "Interface responsiva",
        description: "Uma experiência em todos os dispositivos.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "pokedex",
    title: "Pokédex",
    category: "Web app / Projeto pessoal",
    description:
      "Um universo de descobertas, com busca rápida e informações organizadas em cada detalhe.",
    tapeLabel: "REACT + TYPESCRIPT",
    accent: "#bda5ff",
    preview: "pokedex",
    features: [
      {
        icon: "search",
        title: "Busca e descoberta",
        description: "Explore a coleção por nome ou tipo.",
      },
      {
        icon: "layers",
        title: "Tudo no seu lugar",
        description: "Características organizadas em uma interface clara.",
      },
    ],
    technologies: ["React", "TypeScript", "API REST"],
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    category: "Produtividade / Em desenvolvimento",
    description:
      "Menos ruído, mais foco. Um espaço para organizar ideias e acompanhar o que vem a seguir.",
    tapeLabel: "KANBAN / EM DESENVOLVIMENTO",
    accent: "#b99cf0",
    preview: "kanban",
    inDevelopment: true,
    features: [
      {
        icon: "layers",
        title: "Quadros de tarefas",
        description: "Visualize cada etapa do seu trabalho.",
      },
      {
        icon: "mobile",
        title: "Seu fluxo, em qualquer tela",
        description: "Uma organização que acompanha sua rotina.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];
