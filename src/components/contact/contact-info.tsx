import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { instrumentSerif, inter } from "@/utils/fonts";
import { CONTACT_DATA } from "./contact-data";
import ContactLink from "./contact-link";
import SocialIcon from "./social-icon";
import styles from "./contact.module.css";

export default function ContactInfo() {
  const { email, resumeUrl, linkedinUrl, githubUrl } = CONTACT_DATA;

  return (
    <div className={styles.info}>
      <h2 id="contact-heading" className={styles.heading}>
        <span className={inter.className}>Vamos criar</span>
        <span className={instrumentSerif.className}>algo juntos.</span>
      </h2>
      <p className={styles.description}>
        Tem uma ideia, um projeto ou
        <br className={styles.desktopBreak} /> uma oportunidade? Vamos
        conversar.
      </p>
      <div className={styles.actions}>
        <ContactLink
          href={email ? `mailto:${email}` : ""}
          label="Enviar e-mail"
          className={styles.primaryAction}
        >
          <Mail aria-hidden="true" />
          <span>Enviar e-mail</span>
          <ArrowUpRight className={styles.arrow} aria-hidden="true" />
        </ContactLink>
        <ContactLink
          href={resumeUrl}
          label="Baixar currículo"
          className={styles.secondaryAction}
          external={/^https?:\/\//.test(resumeUrl)}
          download={
            resumeUrl.startsWith("/") ? "Pedro-HAS-Curriculo.pdf" : undefined
          }
        >
          <FileText aria-hidden="true" />
          <span>Baixar currículo</span>
        </ContactLink>
      </div>
      <div className={styles.socials} role="group" aria-label="Redes sociais">
        <ContactLink
          href={linkedinUrl}
          label="LinkedIn"
          className={styles.socialLink}
          external
        >
          <SocialIcon name="linkedin" />
          <span>
            LinkedIn <ArrowUpRight aria-hidden="true" />
          </span>
        </ContactLink>
        <ContactLink
          href={githubUrl}
          label="GitHub"
          className={styles.socialLink}
          external
        >
          <SocialIcon name="github" />
          <span>
            GitHub <ArrowUpRight aria-hidden="true" />
          </span>
        </ContactLink>
      </div>
    </div>
  );
}
