import { instrumentSerif, inter } from "@/utils/fonts";
import ProjectsPlayer from "./projects-player";
import styles from "./projects.module.css";

export default function ProjectsSection() {
  return (
    <section
      id="projetos"
      aria-labelledby="projects-heading"
      className={styles.section}
    >
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>03 / PROJETOS</p>
        <h2 id="projects-heading" className={styles.heading}>
          <span className={inter.className}>Projetos </span>
          <span className={instrumentSerif.className}>selecionados.</span>
        </h2>
        <div className={styles.headerBottom}>
          <p>Ideias que ganharam vida na web.</p>
          <span>ACERVO DIGITAL / 2026</span>
        </div>
      </header>
      <ProjectsPlayer />
    </section>
  );
}
