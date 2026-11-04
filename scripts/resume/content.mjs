const contact = {
  name: "Pedro Henrique Andrade Sousa",
  email: "ph.andradesousa31@gmail.com",
  linkedin: "linkedin.com/in/pedro-henrique-0b21a6183",
  github: "github.com/PedroHenriqueAS",
};

export const resumes = {
  pt: {
    file: "pedro-andrade-curriculo.pdf",
    lang: "pt-BR",
    contact: { ...contact, location: "São Paulo, SP" },
    headline: "Desenvolvedor Front-end · React · Next.js · TypeScript",
    labels: {
      summary: "Resumo",
      skills: "Competências",
      experience: "Experiência",
      education: "Formação",
      languages: "Idiomas",
    },
    summary:
      "Desenvolvedor Front-end com 6 anos de experiência em desenvolvimento web, com passagens por saúde, educação, e-commerce e agências digitais. Ao longo da carreira, trabalhei com uma grande variedade de produtos e tecnologias, do front-end ao back-end com Node.js e à qualidade de software, sempre com atenção à experiência do usuário, a testes automatizados e ao trabalho em times ágeis. Passei 2025 na Irlanda estudando inglês e hoje combino trabalhos freelance com estudos de IA generativa.",
    skills: [
      [
        "Front-end",
        "React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Styled Components, Angular",
      ],
      [
        "Estado e formulários",
        "Redux, Context API, Zustand, React Hook Form, Zod",
      ],
      ["Testes", "Jest, React Testing Library, Cypress, testes manuais"],
      ["Back-end", "Node.js, Express, MongoDB, Mongoose, MySQL, APIs REST"],
      ["Plataformas", "WordPress, Magento"],
      ["Práticas", "Git, Scrum, Kanban, Design System, SEO"],
    ],
    experience: [
      {
        company: "Freelance",
        role: "Desenvolvedor Front-end",
        period: "2026 — atual",
        bullets: [
          "Manutenção de sites em WordPress, com ajustes em temas, páginas e correção de problemas.",
          "Demandas de e-commerce, incluindo landing pages, vitrines e análise de tags.",
          "Atualização contínua em React, Next.js e Angular (RxJS, Signals), além de estudos de Node.js, NestJS e IA generativa (LLMs, RAG, MCP).",
        ],
      },
      {
        company: "Intercâmbio em Dublin, Irlanda",
        role: "Estudante de inglês",
        period: "2025 — fev. 2026",
        bullets: [
          "Curso de inglês na Berlitz Dublin, com rotina de estudo e trabalho usando o idioma no dia a dia.",
        ],
      },
      {
        company: "Hospital Israelita Albert Einstein",
        role: "Desenvolvedor Front-end",
        period: "dez. 2022 — jan. 2025",
        bullets: [
          "Desenvolvimento de aplicações para a área da saúde com React, TypeScript e React Hooks.",
          "Formulários médicos dinâmicos e validações com React Hook Form.",
          "Relatórios, upload de PDFs e integração de videoatendimento com Vonage.",
          "Testes de componentes e fluxos com Jest, React Testing Library e Cypress.",
          "Manutenção do Design System e de componentes reutilizáveis com Tailwind CSS e Styled Components; estado global com Context API.",
          "Trabalho em time Scrum com produto e QA, incluindo análise de logs em AWS e Datadog.",
        ],
      },
      {
        company: "Direção Concursos",
        role: "Desenvolvedor Full Stack",
        period: "ago. 2021 — dez. 2022",
        bullets: [
          "Interfaces com React, Next.js, TypeScript e Redux para uma plataforma de ensino e um e-commerce.",
          "Fluxos de compra, checkout e assinaturas.",
          "APIs REST e regras de negócio com Node.js, Express, MongoDB e Mongoose.",
          "Participação em dailies e sprints em time Scrum.",
        ],
      },
      {
        company: "Doris.mobi",
        role: "Analista de Testes e QA",
        period: "jul. 2020 — mai. 2021",
        bullets: [
          "Testes automatizados em JavaScript e testes manuais de funcionalidades, usabilidade e performance do aplicativo interno.",
          "Registro de bugs e acompanhamento das correções junto ao time de desenvolvimento.",
        ],
      },
      {
        company: "Consultoria Digital",
        role: "Desenvolvedor Front-end",
        period: "jan. 2019 — mai. 2020",
        bullets: [
          "Sites e landing pages responsivos com HTML, CSS, JavaScript, PHP e Angular para clientes de e-commerce, educação, varejo e moda.",
          "Manutenção de sites e lojas em WordPress e Magento, com melhorias de SEO.",
          "Integrações com Node.js e MySQL.",
        ],
      },
    ],
    education: [
      [
        "Cursos",
        "React e Next.js essencial com TypeScript · React JS do zero ao avançado",
      ],
    ],
    languages: [
      ["Português", "nativo"],
      [
        "Inglês",
        "intermediário · Berlitz Dublin (2025) e um ano de vivência na Irlanda",
      ],
    ],
  },
  en: {
    file: "pedro-andrade-resume.pdf",
    lang: "en",
    contact: { ...contact, location: "São Paulo, Brazil" },
    headline: "Front-end Developer · React · Next.js · TypeScript",
    labels: {
      summary: "Summary",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      languages: "Languages",
    },
    summary:
      "Front-end developer with 6 years of web development experience across healthcare, education, e-commerce and digital agencies. Throughout my career I have worked with a wide range of products and technologies, from front-end to back-end with Node.js and software quality, always focused on user experience, automated testing and agile teamwork. I spent 2025 in Ireland studying English and now combine freelance work with generative AI studies.",
    skills: [
      [
        "Front-end",
        "React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Styled Components, Angular",
      ],
      ["State and forms", "Redux, Context API, Zustand, React Hook Form, Zod"],
      ["Testing", "Jest, React Testing Library, Cypress, manual testing"],
      ["Back-end", "Node.js, Express, MongoDB, Mongoose, MySQL, REST APIs"],
      ["Platforms", "WordPress, Magento"],
      ["Practices", "Git, Scrum, Kanban, Design Systems, SEO"],
    ],
    experience: [
      {
        company: "Freelance",
        role: "Front-end Developer",
        period: "2026 — present",
        bullets: [
          "WordPress site maintenance, including theme and page updates and bug fixes.",
          "E-commerce work, including landing pages, product showcases and tag analysis.",
          "Keeping up to date with React, Next.js and Angular (RxJS, Signals), and studying Node.js, NestJS and generative AI (LLMs, RAG, MCP).",
        ],
      },
      {
        company: "Study abroad in Dublin, Ireland",
        role: "English student",
        period: "2025 — Feb. 2026",
        bullets: [
          "English course at Berlitz Dublin, studying and working while using the language every day.",
        ],
      },
      {
        company: "Hospital Israelita Albert Einstein",
        role: "Front-end Developer",
        period: "Dec. 2022 — Jan. 2025",
        bullets: [
          "Built healthcare applications with React, TypeScript and React Hooks.",
          "Dynamic medical forms and validation with React Hook Form.",
          "Reports, PDF uploads and video consultation integration with Vonage.",
          "Component and flow tests with Jest, React Testing Library and Cypress.",
          "Maintained the Design System and reusable components with Tailwind CSS and Styled Components; global state with Context API.",
          "Worked in a Scrum team with product and QA, including log analysis on AWS and Datadog.",
        ],
      },
      {
        company: "Direção Concursos",
        role: "Full Stack Developer",
        period: "Aug. 2021 — Dec. 2022",
        bullets: [
          "Interfaces with React, Next.js, TypeScript and Redux for an online learning platform and an e-commerce store.",
          "Purchase, checkout and subscription flows.",
          "REST APIs and business rules with Node.js, Express, MongoDB and Mongoose.",
          "Daily meetings and sprints in a Scrum team.",
        ],
      },
      {
        company: "Doris.mobi",
        role: "QA and Test Analyst",
        period: "Jul. 2020 — May 2021",
        bullets: [
          "Automated tests in JavaScript and manual testing of features, usability and performance of the internal app.",
          "Reported bugs and followed up on fixes with the development team.",
        ],
      },
      {
        company: "Consultoria Digital",
        role: "Front-end Developer",
        period: "Jan. 2019 — May 2020",
        bullets: [
          "Responsive websites and landing pages with HTML, CSS, JavaScript, PHP and Angular for e-commerce, education, retail and fashion clients.",
          "Maintained WordPress and Magento sites and stores, with SEO improvements.",
          "Integrations with Node.js and MySQL.",
        ],
      },
    ],
    education: [
      [
        "Courses",
        "Essential React and Next.js with TypeScript · React JS from zero to advanced",
      ],
    ],
    languages: [
      ["Portuguese", "native"],
      [
        "English",
        "intermediate · Berlitz Dublin (2025) and one year living in Ireland",
      ],
    ],
  },
};
