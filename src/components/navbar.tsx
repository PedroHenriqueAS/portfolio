"use client";

import { useTranslation } from "react-i18next";

import { useEffect, useRef, useState } from "react";
import AnimatedLogo from "@/components/animated-logo";
import LanguageSwitcher from "./language-switcher";
import styles from "./navbar.module.css";

export default function Navbar() {
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const nav = navRef.current;
    if (!hero || !nav) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: `-${nav.offsetHeight}px 0px 0px 0px` },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className={styles.spacer}>
        <nav
          ref={navRef}
          aria-label={t("nav.navigation")}
          className={styles.nav}
          data-over-hero={overHero}
        >
          <a href="#inicio" className={styles.brand} aria-label={t("nav.home")}>
            <AnimatedLogo />
            <span className={styles.dot} aria-hidden="true" />
          </a>
          <div className={styles.actions}>
            <ul className={styles.links}>
              <li>
                <a href="#projetos">{t("nav.projects")}</a>
              </li>
              <li>
                <a href="#jornada">{t("nav.journey")}</a>
              </li>
              <li>
                <a href="#contato">{t("nav.contact")}</a>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
      <div className={styles.intro}>
        <span className={styles.rule} aria-hidden="true" />
        <span>{t("nav.tagline")}</span>
      </div>
    </div>
  );
}
