"use client";

import { useTranslation } from "react-i18next";

import styles from "./previews.module.css";

export default function KanbanPreview() {
  const { t } = useTranslation();
  return (
    <div className={styles.kanbanPreview}>
      <aside>
        <strong>▥ TaskFlow</strong>
        <span>{t("previews.kanban.workspace")}</span>
        <b>{t("previews.kanban.projects")}</b>
        <span>{t("previews.kanban.overview")}</span>
        <span>{t("previews.kanban.tasks")}</span>
        <span>{t("previews.kanban.calendar")}</span>
        <i>{t("previews.kanban.newProject")}</i>
      </aside>
      <div className={styles.kanbanMain}>
        <header>
          <small>{t("previews.kanban.breadcrumb")}</small>
          <span>● ● ●</span>
        </header>
        <strong>{t("previews.kanban.title")}</strong>
        <p>{t("previews.kanban.description")}</p>
        <div className={styles.kanbanColumns}>
          {[
            {
              name: t("previews.kanban.todo"),
              color: "#b4a0e8",
              tasks: [
                t("previews.kanban.references"),
                t("previews.kanban.components"),
                t("previews.kanban.typography"),
              ],
            },
            {
              name: t("previews.kanban.inProgress"),
              color: "#e3b683",
              tasks: [
                t("previews.kanban.interface"),
                t("previews.kanban.responsive"),
              ],
            },
            {
              name: t("previews.kanban.done"),
              color: "#92c9b6",
              tasks: [
                t("previews.kanban.organize"),
                t("previews.kanban.palette"),
              ],
            },
          ].map((column) => (
            <div key={column.name}>
              <h4>
                <i style={{ background: column.color }} />
                {column.name}
                <span>{column.tasks.length}</span>
              </h4>
              {column.tasks.map((task, i) => (
                <div key={task}>
                  <small style={{ color: column.color }}>
                    {i % 2
                      ? t("previews.kanban.development")
                      : t("previews.kanban.design")}
                  </small>
                  <strong>{task}</strong>
                  <p>{t("previews.kanban.detail")}</p>
                  <footer>
                    <span>☷ {i + 1}</span>
                    <b>PA</b>
                  </footer>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
