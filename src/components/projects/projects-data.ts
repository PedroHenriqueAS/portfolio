import type { TFunction } from "i18next";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  tapeLabel: string;
  accent: string;
  preview?: "pokedex" | "kanban";
  previewImage?: string;
  previewVideo?: {
    mp4: string;
    webm: string;
    poster: string;
  };
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

type ProjectDefinition = Pick<
  PortfolioProject,
  | "id"
  | "accent"
  | "preview"
  | "previewImage"
  | "previewVideo"
  | "siteUrl"
  | "githubUrl"
  | "inDevelopment"
> & {
  featureIcons: readonly PortfolioProject["features"][number]["icon"][];
};
const projectDefinitions = [
  {
    id: "formlab",
    accent: "#c792ff",
    previewVideo: {
      mp4: "/projects/formlab-preview.mp4",
      webm: "/projects/formlab-preview.webm",
      poster: "/projects/formlab-poster.webp",
    },
    siteUrl: "https://formlab-eight.vercel.app",
    githubUrl: "https://github.com/PedroHenriqueAS/formlab",
    featureIcons: ["search", "shopping", "mobile"],
  },
  {
    id: "pokedex",
    accent: "#bda5ff",
    preview: "pokedex",
    inDevelopment: true,
    featureIcons: ["search", "layers"],
  },
  {
    id: "taskflow",
    accent: "#b99cf0",
    preview: "kanban",
    inDevelopment: true,
    featureIcons: ["layers", "mobile"],
  },
] as const satisfies readonly ProjectDefinition[];

export function getProjects(t: TFunction): PortfolioProject[] {
  return projectDefinitions.map(({ featureIcons, ...definition }) => {
    const copy = t(`projects.items.${definition.id}`, { returnObjects: true });
    return {
      ...definition,
      ...copy,
      features: copy.features.map((feature, index) => ({
        ...feature,
        icon: featureIcons[index],
      })),
    };
  });
}
