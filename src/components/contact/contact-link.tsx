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
  if (!href) {
    return (
      <button
        type="button"
        className={className}
        disabled
        aria-label={`${label} — disponível em breve`}
        title="Disponível em breve"
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
      aria-label={external ? `${label} (abre em nova aba)` : label}
    >
      {children}
    </a>
  );
}
