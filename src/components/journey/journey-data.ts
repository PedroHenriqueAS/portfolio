import type { TFunction } from "i18next";

export type JourneyDetail = {
  title: string;
  description: string;
};

export type JourneyStep = {
  id: string;
  title: string;
  period: string;
  detailedPeriod?: string;
  category: string;
  role: string;
  description: string;
  deliveries: JourneyDetail[];
  learnings: JourneyDetail[];
  technologies: string[];
};

export function getJourneySteps(t: TFunction): JourneyStep[] {
  return t("journey.steps", { returnObjects: true });
}
