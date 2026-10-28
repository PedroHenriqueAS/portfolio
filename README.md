# Portfólio Pedro HAS

Portfólio em Next.js, React e TypeScript, com Tailwind CSS, CSS Modules e Motion.
Inclui estúdio interativo na hero, jornada profissional, tocador de projetos em
formato VHS e seção de contato.

## Desenvolvimento

Use Node 22 (`nvm use`) e pnpm 11.24.0. O projeto mantém somente o lockfile do pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

O servidor abre em `http://localhost:3000`. Para escolher outra porta:
`pnpm dev --port 3002`.

## Organização

```text
src/
  app/                       Rotas, layout, metadados e estilos globais
  components/
    hero/                    Cena, controles, animações e áudio do estúdio
    journey/                 Dados, trilha e painel da trajetória
    projects/                Reprodução, gestos, tocador e dados dos projetos
      previews/              Prévias ilustrativas e seus estilos
    contact/                 Informações, links e apresentação do contato
  i18n/                      Provider e textos em português e inglês
    locales/                 pt.json e en.json
  utils/                     Fontes, formatação e carregamento de imagens
tests/e2e/                   Testes de interação no navegador
docs/                        Funcionamento e composição das interações
public/                      Imagens e arquivos públicos
```

Os textos ficam nos arquivos de idioma; os dados técnicos e links permanecem
junto das seções. As regras de interação ficam em hooks. O provider de idiomas
envolve a página e os componentes traduzidos usam `useTranslation`.

- `use-studio.ts`: coordena as ações da hero e a pausa ao sair da cena.
- `use-studio-moments.ts`: controla as sequências do café e do gato.
- `use-studio-sound.ts`: controla ativação e descarte do áudio; `studio-audio.ts`
  contém a síntese dos sons.
- `use-studio-theme.ts`: troca dia/noite após carregar as imagens e sincroniza
  o tema global. As cores compartilhadas ficam em `src/app/globals.css`.
- `use-project-playback.ts`: seleciona, reproduz e ejeta fitas, com limpeza dos timers.
- `use-tape-drag.ts`: concentra captura do ponteiro, arraste e cancelamento.

## Onde editar o conteúdo

| Conteúdo                                             | Arquivo                                    |
| ---------------------------------------------------- | ------------------------------------------ |
| Textos PT e EN, trajetória e descrições dos projetos | `src/i18n/locales/pt.json` e `en.json`     |
| Links, cores, ícones e prévias dos projetos          | `src/components/projects/projects-data.ts` |
| E-mail, redes sociais e currículo                    | `src/components/contact/contact-data.ts`   |
| Código ilustrativo e recursos da cena                | `src/components/hero/studio-data.ts`       |
| Fontes                                               | `src/utils/fonts.ts`                       |
| Título e descrição do site                           | Chave `meta` nos arquivos de idioma        |

O botão PT/EN na navbar troca o idioma sem recarregar a página e salva a escolha
no navegador. A estrutura e as decisões de tradução estão em [docs/i18n.md](docs/i18n.md).

Links de contato vazios continuam desabilitados. Para substituir as prévias
ilustrativas, coloque uma imagem em `public/projects/` e preencha `previewImage`
com o caminho público, por exemplo `/projects/meu-projeto.webp`. O campo `preview`
é opcional e serve apenas para escolher uma das demonstrações. Sem imagem nem
demonstração, o tocador mostra o nome do projeto e “Prévia em breve”.

## Qualidade e produção

```sh
pnpm format          # Formata os arquivos
pnpm check           # ESLint, TypeScript e verificação de formatação
pnpm build           # Gera o site para produção
pnpm start           # Executa o build
```

O TypeScript gera os tipos das rotas antes da checagem, inclusive em instalações
novas. O build precisa de acesso às fontes usadas por `next/font/google`.

## Testes no navegador

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

Os testes geram um build de produção e iniciam um servidor na porta 3100, sem
interferir no servidor de desenvolvimento. Cobrem reprodução/ejeção, cancelamento
de timers, arraste com mouse e toque, teclado, controles da hero, concorrência na ativação
do áudio, rolagem suave e movimento reduzido, em desktop e celular emulado.

Para usar o Chrome já instalado, execute
`PLAYWRIGHT_CHANNEL=chrome pnpm test:e2e`. Falhas deixam captura de tela e trace
em `test-results/` (ignorado pelo Git).

## Documentação das interações

- [Estúdio da hero](docs/hero-studio.md)
- [Café e gato](docs/hero-coffee-cat.md)
- [Responsividade](docs/responsiveness.md)
- [Temas, iluminação e imagens diurnas](docs/themes.md)

As âncoras usam rolagem suave nativa, com espaço para a navbar fixa. A navegação
fica imediata quando o visitante prefere movimento reduzido. As animações também
respeitam essa preferência, e o som só é ativado por uma ação explícita.
