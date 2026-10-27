import {
  ArrowUpRight,
  Code2,
  Layers3,
  Search,
  ShoppingCart,
  Smartphone,
  Videotape as Tape,
} from "lucide-react";
import type { PortfolioProject } from "./projects-data";
import styles from "./projects.module.css";

const featureIcons = {
  shopping: ShoppingCart,
  mobile: Smartphone,
  search: Search,
  layers: Layers3,
};

export default function ProjectDetails({
  project,
}: {
  project: PortfolioProject | null;
}) {
  if (!project) {
    return (
      <div className={styles.emptyDetails}>
        <Tape aria-hidden="true" />
        <p className={styles.eyebrow}>O PRÓXIMO PLAY É SEU</p>
        <h3>
          Uma fita.
          <br />
          Uma nova história.
        </h3>
        <p>
          Arraste um projeto até o tocador ou selecione uma fita abaixo para
          explorar.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <p className={styles.eyebrow}>{project.category}</p>
      <h3>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <ul className={styles.features}>
        {project.features.map((feature) => {
          const Icon = featureIcons[feature.icon];
          return (
            <li key={feature.title}>
              <Icon aria-hidden="true" />
              <div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.technologies}>
        <h4 className={styles.eyebrow}>TECNOLOGIAS</h4>
        <ul>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
      <div className={styles.projectLinks}>
        {project.siteUrl ? (
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryLink}
          >
            Ver site <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only">
              {" "}
              de {project.title} (abre em nova aba)
            </span>
          </a>
        ) : (
          <span aria-disabled="true" className={styles.unavailableLink}>
            Site em breve <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        )}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryLink}
          >
            <Code2 size={21} aria-hidden="true" /> GitHub
            <span className="sr-only">
              {" "}
              de {project.title} (abre em nova aba)
            </span>
          </a>
        ) : (
          <span aria-disabled="true" className={styles.unavailableLink}>
            <Code2 size={21} aria-hidden="true" /> Código em breve
          </span>
        )}
      </div>
    </div>
  );
}
