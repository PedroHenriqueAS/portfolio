import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./studio.module.css";

export default function InfoCard() {
  return (
    <div className={styles.introCard}>
      <p className={styles.signature}>
        HAS <ChevronLeft aria-hidden="true" />-
        <ChevronRight aria-hidden="true" /> DEV
      </p>
      <p className={styles.introDescription}>
        Sou Pedro Andrade,
        <br /> transformo ideias em interfaces sólidas e atenção aos detalhes.
      </p>
      <a
        href="#projetos"
        className="my-5 inline-flex min-h-13 w-fit max-w-full items-center justify-center rounded-xl bg-purple-600 px-7 py-3 text-center text-base font-extrabold transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 motion-reduce:transition-none sm:text-lg"
      >
        Explorar Projetos
      </a>
      <a href="#contato" className={styles.conversationLink}>
        Vamos conversar
      </a>
    </div>
  );
}
