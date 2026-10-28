"use client";

import { useTranslation } from "react-i18next";

import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { instrumentSerif, inter } from "@/utils/fonts";
import { CONTACT_DATA } from "./contact-data";
import ContactLink from "./contact-link";
import SocialIcon from "./social-icon";
import styles from "./contact.module.css";

export default function ContactInfo() {
  const { t } = useTranslation();
  const { email, resumeUrl, linkedinUrl, githubUrl } = CONTACT_DATA;

  return (
    <div className={styles.info}>
      <h2 id="contact-heading" className={styles.heading}>
        <span className={inter.className}>{t("contact.title")}</span>
        <span className={instrumentSerif.className}>
          {t("contact.titleAccent")}
        </span>
      </h2>
      <p className={styles.description}>
        {t("contact.description")} <br className={styles.desktopBreak} />{" "}
        {t("contact.descriptionEnd")}
      </p>
      <div className={styles.actions}>
        <ContactLink
          href={email ? `mailto:${email}` : ""}
          label={t("contact.email")}
          className={styles.primaryAction}
        >
          <Mail aria-hidden="true" />
          <span>{t("contact.email")}</span>
          <ArrowUpRight className={styles.arrow} aria-hidden="true" />
        </ContactLink>
        <ContactLink
          href={resumeUrl}
          label={t("contact.resume")}
          className={styles.secondaryAction}
          external={/^https?:\/\//.test(resumeUrl)}
          download={resumeUrl.startsWith("/") ? "Pedro-HAS-CV.pdf" : undefined}
        >
          <FileText aria-hidden="true" />
          <span>{t("contact.resume")}</span>
        </ContactLink>
      </div>
      <div
        className={styles.socials}
        role="group"
        aria-label={t("contact.socials")}
      >
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
