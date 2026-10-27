import Image from "next/image";
import { CassetteTape, Rewind } from "lucide-react";
import { CONTACT_DATA } from "./contact-data";
import ContactInfo from "./contact-info";
import styles from "./contact.module.css";

export default function ContactSection() {
  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className={styles.section}
    >
      <div className={styles.artwork} aria-hidden="true">
        <Image
          src="/contact.png"
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className={styles.image}
        />
      </div>
      <header className={styles.header}>
        <p>04 / CONTATO</p>
        <span>
          CRÉDITOS FINAIS{" "}
          <CassetteTape size={26} strokeWidth={1.3} aria-hidden="true" />
        </span>
      </header>
      <div className={styles.body}>
        <ContactInfo />
      </div>
      <footer className={styles.footer} aria-label="Créditos do portfólio">
        <div className={styles.footerMain}>
          <dl className={styles.credits}>
            <div>
              <dt>CRIAÇÃO E CÓDIGO</dt>
              <dd>{CONTACT_DATA.name}</dd>
            </div>
            <div>
              <dt>LOCALIZAÇÃO</dt>
              <dd>{CONTACT_DATA.location}</dd>
            </div>
            <div>
              <dt>EDIÇÃO</dt>
              <dd>Portfólio {CONTACT_DATA.edition}</dd>
            </div>
          </dl>
          <a className={styles.backToTop} href="#inicio">
            <Rewind size={18} fill="currentColor" aria-hidden="true" />
            Voltar ao início
          </a>
        </div>
        <p className={styles.copyright}>
          © {CONTACT_DATA.edition} {CONTACT_DATA.name}
        </p>
      </footer>
    </section>
  );
}
