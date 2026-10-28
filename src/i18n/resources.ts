import pt from "./locales/pt.json";
import en from "./locales/en.json";

export const resources = {
  pt: { translation: pt },
  en: { translation: en satisfies typeof pt },
};

export type StudioMessage = keyof typeof pt.studio.messages;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: typeof resources.pt;
  }
}
