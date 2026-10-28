"use client";

import { useTranslation } from "react-i18next";

import Image from "next/image";
import { CassetteTape, Rewind } from "lucide-react";
import { CONTACT_BACKGROUNDS } from "@/utils/theme-assets";
import { CONTACT_DATA } from "./contact-data";
import ContactInfo from "./contact-info";
import styles from "./contact.module.css";

export default function ContactSection() {
  const { t } = useTranslation();
  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className={styles.section}
    >
      <div className={styles.artwork} aria-hidden="true">
        <Image
          src={CONTACT_BACKGROUNDS.night}
          alt=""
          fill
          unoptimized
          className={`${styles.image} ${styles.nightImage}`}
        />
        <Image
          src={CONTACT_BACKGROUNDS.day}
          alt=""
          fill
          unoptimized
          className={`${styles.image} ${styles.dayImage}`}
        />
      </div>
      <header className={styles.header}>
        <p>{t("contact.eyebrow")}</p>
        <span>
          {t("contact.finalCredits")}{" "}
          <CassetteTape size={26} strokeWidth={1.3} aria-hidden="true" />
        </span>
      </header>
      <div className={styles.body}>
        <ContactInfo />
      </div>
      <footer className={styles.footer} aria-label={t("contact.creditsLabel")}>
        <div className={styles.footerMain}>
          <dl className={styles.credits}>
            <div>
              <dt>{t("contact.creation")}</dt>
              <dd>{CONTACT_DATA.name}</dd>
            </div>
            <div>
              <dt>{t("contact.locationLabel")}</dt>
              <dd>{t("contact.location")}</dd>
            </div>
            <div>
              <dt>{t("contact.editionLabel")}</dt>
              <dd>{t("contact.edition", { year: CONTACT_DATA.edition })}</dd>
            </div>
          </dl>
          <a className={styles.backToTop} href="#inicio">
            <Rewind size={18} fill="currentColor" aria-hidden="true" />
            {t("contact.backToTop")}
          </a>
        </div>
        <p className={styles.copyright}>
          © {CONTACT_DATA.edition} {CONTACT_DATA.name}
        </p>
      </footer>
    </section>
  );
}
