import styles from "./previews.module.css";

export default function KanbanPreview() {
  return (
    <div className={styles.kanbanPreview}>
      <aside>
        <strong>▥ TaskFlow</strong>
        <span>WORKSPACE</span>
        <b>▦　Meus projetos</b>
        <span>◇　Visão geral</span>
        <span>☷　Minhas tarefas</span>
        <span>◷　Calendário</span>
        <i>+ Novo projeto</i>
      </aside>
      <div className={styles.kanbanMain}>
        <header>
          <small>WORKSPACE / PROJETOS</small>
          <span>● ● ●</span>
        </header>
        <strong>Ideias em movimento.</strong>
        <p>Um espaço para o seu próximo grande projeto.</p>
        <div className={styles.kanbanColumns}>
          {[
            {
              name: "A fazer",
              color: "#b4a0e8",
              tasks: [
                "Explorar referências",
                "Planejar componentes",
                "Definir tipografia",
              ],
            },
            {
              name: "Em progresso",
              color: "#e3b683",
              tasks: ["Construir a interface", "Ajustar responsividade"],
            },
            {
              name: "Concluído",
              color: "#92c9b6",
              tasks: ["Organizar o projeto", "Escolher a paleta"],
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
                    {i % 2 ? "DESENVOLVIMENTO" : "DESIGN"}
                  </small>
                  <strong>{task}</strong>
                  <p>Um detalhe de cada vez.</p>
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
