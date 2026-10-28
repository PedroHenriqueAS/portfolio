import type { Metadata } from "next";
import { geistSans, geistMono } from "@/utils/fonts";
import LanguageProvider from "@/i18n/language-provider";
import pt from "@/i18n/locales/pt.json";
import "./globals.css";

export const metadata: Metadata = {
  title: pt.meta.title,
  description: pt.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme="night"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
