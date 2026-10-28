# Responsividade

O layout usa margens compartilhadas em `src/app/globals.css`: 20px no celular,
32px a partir de 640px e 40px a partir de 1024px. O conteúdo mantém o limite de
1440px. A altura da navbar também é compartilhada com o deslocamento das âncoras.

## Componentes

- **Navbar:** fixa e transparente, com texto claro sobre a hero e cores do tema
  nas outras seções. Links e seletor PT/EN acessíveis por teclado, com espaçamento
  adaptado às telas estreitas.
- **Hero:** apresentação sem altura fixa, texto com quebra natural e controles
  que podem ocupar mais de uma linha. O painel do estúdio fica dentro da janela,
  com rolagem interna e botão de fechar sempre acessível. Em telas baixas, a
  miniatura da cena é ocultada para priorizar os controles.
- **Jornada:** trilha horizontal abaixo de 1024px; painel em uma coluna quando
  falta espaço e botões de navegação distribuídos na largura disponível.
- **Projetos:** tocador e informações empilhados abaixo de 960px. A coleção de
  fitas permite rolagem horizontal abaixo de 768px. Toque/clique, teclado e
  arraste continuam disponíveis; controles do tocador têm área de 44 × 44px.
- **Contato:** fundo em toda a largura da tela, com conteúdo limitado a 1440px.
  Conteúdo e ilustração empilhados abaixo de 768px. Os botões ficam
  em uma coluna abaixo de 480px. Os links continuam centralizados em
  `src/components/contact/contact-data.ts`.
- **Tema:** a escolha dia/noite controla a paleta e as ilustrações do estúdio e
  do contato, independentemente do tema do sistema operacional.

## Verificação

Layout verificado no Chrome com emulação de janelas de 320×568, 375×667,
390×844, 480×800, 600×800, 640×900, 768×1024, 844×390, 960×700, 1024×768,
1280×800, 1440×900, 1920×1080 e 2560×1440. Sem transbordamento horizontal da
página nessas dimensões. A faixa de fitas tem sua própria rolagem intencional.

As verificações incluem seleção de etapas e teclado na jornada, arraste das fitas
com mouse e toque, reprodução/pausa/ejeção, controles da hero, restauração do foco
ao fechar o painel e preferência por movimento reduzido. A emulação não substitui
uma conferência em aparelhos físicos e em outros navegadores.

Ao editar textos e adicionar projetos, conferir novamente a menor largura
(320px), a orientação horizontal do celular e os pontos de mudança do layout.
Usar Node 22 para executar `pnpm check` e `pnpm build`. Os testes de navegador estão disponíveis em `pnpm test:e2e`.
