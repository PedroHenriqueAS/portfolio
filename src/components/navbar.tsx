import AnimatedLogo from "@/components/animated-logo";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <div className={styles.spacer}>
        <nav aria-label="Navegação principal" className={styles.nav}>
          <a
            href="#inicio"
            className={styles.brand}
            aria-label="Pedro HAS — início"
          >
            <AnimatedLogo />
            <span className={styles.dot} aria-hidden="true" />
          </a>
          <ul className={styles.links}>
            <li>
              <a href="#projetos">projetos</a>
            </li>
            <li>
              <a href="#jornada">jornada</a>
            </li>
            <li>
              <a href="#contato">contato</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.intro}>
        <span className={styles.rule} aria-hidden="true" />
        <span>PEDRO HAS / FRONT-END DEVELOPER</span>
      </div>
    </div>
  );
}
