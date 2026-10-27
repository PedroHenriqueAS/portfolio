import type { Metadata } from "next";
import { geistSans, geistMono } from "@/utils/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro HAS — Desenvolvedor Front-end",
  description:
    "Projetos, experiências e ideias de Pedro Andrade. Interfaces com identidade e atenção a cada interação.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
