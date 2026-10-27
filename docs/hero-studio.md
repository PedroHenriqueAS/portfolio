# Estúdio interativo da hero

`HeroSection` mantém o conteúdo no servidor e passa os elementos para `HeroStudio`. O hook `use-studio.ts` coordena as interações; `studio-explorer.tsx` apresenta o painel de controles. A arte e as áreas clicáveis compartilham o mesmo `viewBox` de 1536 × 1024; assim, acompanham o recorte responsivo juntas.

- **Luz:** clicar na luminária ou no botão Luz alterna as duas imagens com uma transição. Os textos ficam em outra camada.
- **Personagem:** clicar inicia uma sequência curta de código com pequenos movimentos nas mãos e no punho. Um mapa de deslocamento SVG anima localmente os pixels da ilustração; não é uma animação de personagem com rig ou novas poses. O segundo clique pausa. A sequência também para ao sair da hero ou ocultar a aba.
- **Monitor:** alterna editor, preview ilustrativo e terminal. O conteúdo está em `studio-monitor.tsx` e `studio-data.ts`; a composição com a arte fica em `studio-scene.tsx`.
- **Café e gato:** a caneca pausa a digitação para tomar café; clicar no gato acorda o companheiro de estúdio por alguns segundos. Poses, controles, sons e prompts estão em [hero-coffee-cat.md](hero-coffee-cat.md).
- **Perspectiva do monitor:** `monitor-perspective.ts` define os quatro cantos internos na arte e projeta o conteúdo retangular sobre eles. A projeção e o recorte usam as mesmas coordenadas, tanto na hero quanto na miniatura do celular.
- **Som:** teclado, interruptor e sinais de confirmação são sintetizados com Web Audio, sem arquivos externos. O contexto só é criado ao ativar Som. O volume começa desligado e os nós são liberados após cada efeito.
- **Explore o estúdio:** apresenta os controles equivalentes por teclado e uma visão completa da cena no celular. Escape fecha o painel e devolve o foco ao botão.
- **Movimento reduzido:** desativa o movimento das mãos, o cursor piscante e as transições; o editor recebe o texto completo.

## Imagens

- `public/hero.png`: original preservado.
- `public/studio/lights-on.webp`: cópia otimizada do original, 1536 × 1024.
- `public/studio/lights-off.webp`: variação com a luminária apagada, 1536 × 1024.

A variação foi produzida com a skill imagegen, usando a ferramenta integrada de edição de imagens (sem CLI/API). Os dois arquivos foram convertidos para WebP, qualidade 92, sem redimensionar.

Prompt final usado para a imagem apagada:

```text
Use case: lighting-weather. Edit target: the attached 1536 x 1024 illustration, used as a perfectly registered alternate lighting state for an interactive website. Make ONE localized edit: switch OFF the purple desk task lamp on the right. The lamp's white glowing underside should become dark violet unlit material; remove its surrounding magenta bloom and the pink pool of task light on the right desk and nearby wall. Retain the purple light cast by the computer monitor, moon and city window. Crucial invariants: preserve EXACTLY the original image size, camera position, crop, framing, character pose, hands, monitor, chair, furniture, plants, window and all geometry. Do NOT redraw or move any object. Do not darken the entire picture: only remove the illumination produced by the desk lamp. This will crossfade directly over the original image; every edge must remain registered. No new text, objects, people, borders or watermark. Output a full-frame image matching the original composition.
```
