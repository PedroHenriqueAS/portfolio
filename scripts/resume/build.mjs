import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { resumes } from "./content.mjs";

const OUTPUT_DIR = new URL("../../public/resume/", import.meta.url);

const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const link = (url, label = url) =>
  `<a href="${url.includes("@") ? `mailto:${url}` : `https://${url}`}">${escape(label)}</a>`;

const section = (title, body) =>
  `<section><h2>${escape(title)}</h2>${body}</section>`;

const pairs = (rows) =>
  `<dl>${rows.map(([term, value]) => `<dt>${escape(term)}</dt><dd>${escape(value)}</dd>`).join("")}</dl>`;

function render(resume) {
  const { contact, labels } = resume;
  const contactLine = [
    `<span>${escape(contact.location)}</span>`,
    link(contact.email),
    link(contact.linkedin),
    link(contact.github),
  ].join('<span class="dot">·</span>');

  const experience = resume.experience
    .map(
      (job) => `
      <article>
        <header>
          <h3>${escape(job.company)}</h3>
          <span class="period">${escape(job.period)}</span>
        </header>
        <p class="role">${escape(job.role)}</p>
        <ul>${job.bullets.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>
      </article>`,
    )
    .join("");

  return `<!doctype html>
<html lang="${resume.lang}">
<head>
<meta charset="utf-8">
<title>${escape(contact.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font: 9.6pt/1.45 Inter, "Helvetica Neue", Arial, sans-serif; color: #1f1a29; }
  a { color: inherit; text-decoration: none; }
  .top { padding-bottom: 12px; border-bottom: 2px solid #6d28d9; }
  h1 { font-size: 23pt; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
  .headline { margin-top: 4px; color: #6d28d9; font-size: 11pt; font-weight: 600; }
  .contact { margin-top: 7px; color: #4b4458; font-size: 8.8pt; }
  .contact a,
  .contact span { white-space: nowrap; }
  .dot { margin: 0 6px; color: #a18fc7; }
  section { margin-top: 14px; }
  h2 { margin-bottom: 7px; color: #6d28d9; font-size: 8.6pt; font-weight: 700; text-transform: uppercase; }
  dl { display: grid; grid-template-columns: 128px 1fr; gap: 3px 12px; }
  dt { font-weight: 600; }
  article { margin-bottom: 10px; break-inside: avoid; }
  article header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
  h3 { font-size: 10.4pt; font-weight: 700; }
  .period { flex-shrink: 0; color: #5b536a; font-size: 8.8pt; }
  .role { color: #4b4458; font-weight: 500; }
  ul { margin-top: 3px; padding-left: 15px; }
  li { margin-bottom: 1.5px; }
  li::marker { color: #8b5cf6; }
</style>
</head>
<body>
  <div class="top">
    <h1>${escape(contact.name)}</h1>
    <p class="headline">${escape(resume.headline)}</p>
    <p class="contact">${contactLine}</p>
  </div>
  ${section(labels.summary, `<p>${escape(resume.summary)}</p>`)}
  ${section(labels.skills, pairs(resume.skills))}
  ${section(labels.experience, experience)}
  ${section(labels.education, pairs(resume.education))}
  ${section(labels.languages, pairs(resume.languages))}
</body>
</html>`;
}

await mkdir(OUTPUT_DIR, { recursive: true });
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
});
const page = await browser.newPage();

for (const resume of Object.values(resumes)) {
  await page.setContent(render(resume), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const path = fileURLToPath(new URL(resume.file, OUTPUT_DIR));
  await page.pdf({ path, format: "A4", printBackground: true });
  console.log(`Generated ${path}`);
}

await browser.close();
