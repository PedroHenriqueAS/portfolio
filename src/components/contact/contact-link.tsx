"use client";

import { useTranslation } from "react-i18next";

import type { ReactNode } from "react";

interface ContactLinkProps {
  href: string;
  className: string;
  children: ReactNode;
  label: string;
  external?: boolean;
  download?: string;
}

export default function ContactLink({
  href,
  className,
  children,
  label,
  external,
  download,
}: ContactLinkProps) {
  const { t } = useTranslation();
  if (!href) {
    return (
      <button
        type="button"
        className={className}
        disabled
        aria-label={t("common.unavailableLabel", { label })}
        title={t("common.comingSoon")}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      aria-label={external ? t("common.externalLabel", { label }) : label}
    >
      {children}
    </a>
  );
}
