import Image from "next/image";
import type { PortfolioProject } from "./projects-data";
import StorePreview from "./previews/store-preview";
import PokedexPreview from "./previews/pokedex-preview";
import KanbanPreview from "./previews/kanban-preview";
import styles from "./previews/previews.module.css";

const previews = {
  store: StorePreview,
  pokedex: PokedexPreview,
  kanban: KanbanPreview,
};

export default function ProjectPreview({
  project,
}: {
  project: PortfolioProject;
}) {
  if (project.previewImage) {
    return (
      <Image
        src={project.previewImage}
        alt={`Prévia do projeto ${project.title}`}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className={styles.previewImage}
      />
    );
  }

  const Preview = project.preview ? previews[project.preview] : null;
  if (!Preview) {
    return (
      <div className={styles.placeholder}>
        <span>{project.category}</span>
        <strong>{project.title}</strong>
        <p>Prévia em breve</p>
      </div>
    );
  }

  return (
    <div
      className={styles.preview}
      role="img"
      aria-label={`Prévia demonstrativa de ${project.title}`}
    >
      <div aria-hidden="true">
        <Preview />
      </div>
    </div>
  );
}
