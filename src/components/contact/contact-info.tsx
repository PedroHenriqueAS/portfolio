"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { ArrowUpRight, Check, FileText, Mail } from "lucide-react";
import { instrumentSerif, inter } from "@/utils/fonts";
import { CONTACT_DATA } from "./contact-data";
import ContactLink from "./contact-link";
import SocialIcon from "./social-icon";
import styles from "./contact.module.css";

export default function ContactInfo() {
  const { t, i18n } = useTranslation();
  const { email, resume, linkedinUrl, githubUrl } = CONTACT_DATA;
  const resumeFile = resume[i18n.resolvedLanguage === "en" ? "en" : "pt"];
  const mailto = `mailto:${email}?subject=${encodeURIComponent(t("contact.emailSubject"))}`;
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (copiedTimer.current !== null)
        window.clearTimeout(copiedTimer.current);
    },
    [],
  );

  function copyEmail() {
    navigator.clipboard
      ?.writeText(email)
      .then(() => {
        setCopied(true);
        if (copiedTimer.current !== null) {
          window.clearTimeout(copiedTimer.current);
        }
        copiedTimer.current = window.setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  }

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
          href={mailto}
          label={t("contact.emailLabel", { email })}
          className={styles.primaryAction}
          onClick={copyEmail}
        >
          {copied ? <Check aria-hidden="true" /> : <Mail aria-hidden="true" />}
          <span>{copied ? t("contact.emailCopied") : t("contact.email")}</span>
          <ArrowUpRight className={styles.arrow} aria-hidden="true" />
        </ContactLink>
        <ContactLink
          href={resumeFile.url}
          label={t("contact.resume")}
          className={styles.secondaryAction}
          download={resumeFile.fileName}
        >
          <FileText aria-hidden="true" />
          <span>{t("contact.resume")}</span>
        </ContactLink>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? t("contact.emailCopied") : ""}
      </p>
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
