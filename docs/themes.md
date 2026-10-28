# Temas diurno e noturno

O botão no footer da hero, a janela e o painel de controles compartilham o estado de `use-studio-theme.ts`. A escolha atualiza `data-theme` no elemento `html`; as variáveis de `src/app/globals.css` definem as cores de toda a página, inclusive navbar, logo, jornada, projetos e contato. O site começa no modo noturno. A escolha vale enquanto a página permanece aberta.

O tema diurno usa fundo creme, texto marrom e acentos em laranja queimado. A hero mantém texto claro sobre a ilustração e acentos luminosos próprios. O VHS e as fitas usam marrom e âmbar; as prévias dos projetos preservam suas cores. As cores específicas do aparelho e das fitas ficam em `projects.module.css`.

A troca aguarda a decodificação das imagens do quarto e das duas versões do contato antes de iniciar. Um erro mantém o tema anterior e permite tentar novamente. `utils/preload-image.ts` compartilha o carregamento com as interações de café e gato, que têm poses diurnas. A luminária continua independente do horário. O atributo do tema no `html` é sincronizado antes da pintura da tela.

Os caminhos do contato estão em `utils/theme-assets.ts`. As imagens WebP são servidas diretamente, sem depender do otimizador do Next.js; o pré-carregamento e a seção usam os mesmos arquivos. `public/contact-night.webp` é uma conversão do PNG original, preservado em `public/contact.png`. O fundo ocupa toda a largura e pelo menos a altura disponível da tela no desktop, enquanto o conteúdo segue alinhado ao limite de 1440px. A arte fica na camada 0 e o conteúdo na camada 1.

A navbar é transparente, sem preenchimento, borda ou desfoque. Sobre a hero, usa texto claro e o acento do estúdio. Nas outras seções, acompanha a paleta da página. Um `IntersectionObserver` acompanha a saída da hero, sem eventos contínuos de scroll.

`studio-daylight.tsx` separa lua e sol em camadas SVG recortadas pela janela. Uma máscara suave expande a iluminação a partir da janela. Com movimento reduzido, o tema muda sem deslocamentos nem transições. O painel compacto do celular compartilha a mesma cena e o mesmo estado.

## Imagens e prompts

Imagens editadas com a ferramenta integrada `image_gen`, usando a skill imagegen, e convertidas para WebP com qualidade 92. Os originais foram preservados. Os arquivos abaixo estão no repositório; os caminhos públicos não incluem o prefixo `public`.

### Lua separada

Arquivo: `public/studio/window-night.webp`.

Prompt final:

```text
Use case: precise-object-edit. Asset type: registered clean plate for a website illustration animation. Input image 1 is the edit target, the existing 1536 x 1024 purple nighttime studio. Primary request: remove ONLY the white crescent moon and its immediate glow from the window, near x674 y424. Fill that tiny area with a seamless continuation of the surrounding purple-blue night sky. Keep all stars except those inside the removed moon, all buildings, window frame and every other pixel unchanged. This is still NIGHT, not day. Exact invariants: identical 1536x1024 dimensions, camera, crop, illustration style, room, person, cat, plants, desk, screen, lamp, lighting, geometry and colors. Do not add a sun, a replacement moon, clouds or any objects. No new text, no borders. Change only the crescent and its glow in the upper right pane of the arched window. Output the full-frame image.
```

### Quarto de dia

Arquivo: `public/studio/daylight.webp`.

Prompt final:

```text
Use case: lighting-weather. Asset type: aligned daytime variant of an existing interactive website room, 1536 x 1024. Input image 1 is the edit target. Turn the existing purple night into a gentle sunny morning with warm pale apricot/peach sunlight entering through the arched window on the LEFT. Window sky becomes softly luminous pale peach and light blue, buildings visible in natural daylight with lit night windows extinguished, no stars. Remove the moon. IMPORTANT: do NOT add any sun or moon, the sun will be animated in code. Warm natural light gently brightens the room, plants, cat, clothing, floor and desk, preserving deep readable shadows on the top and left empty wall. Desk lamp is still on. Keep precisely the same original 1536x1024 canvas, camera, crop, perspective, geometry, all furniture, books, plants, sleeping cat, typing character pose, face, monitor angle and every object edge. Maintain the original detailed cozy illustration style. Only lighting/weather/colors change, no redesign, no extra objects, no text additions, no frame. This image will crossfade with the original so all silhouettes and window mullions must align exactly.
```

### daylight-off

Arquivo: `public/studio/daylight-off.webp`.

Prompt final:

```text
Use case: precise-object-edit. Image 1 is the edit target, the existing 1536x1024 daytime studio. Switch OFF only the desk lamp on the right: make the underside dark brown unlit material and remove its local glow. Keep all the daylight, window, sunlit walls, shadows and the entire rest of the daytime room unchanged. Do not dim the whole scene. Preserve identical dimensions, camera, crop, geometry, all character poses, all objects, original detailed illustration style. No new objects, text, borders, sun, or moon. Change only the lamp illumination. Full frame output.
```

### coffee-lift-day

Arquivo: `public/studio/coffee-lift-day.webp`.

Prompt final:

```text
Use case: lighting-weather. Asset type: registered animation frame, 1536x1024. Image 1 is the EDIT TARGET and determines the EXACT pose and every object position. Image 2 is ONLY the daytime lighting reference. Change image 1's nighttime colors to match image 2's gentle warm peach morning sunshine exactly, including wall shadows, city daylight, plants and desk. No moon, stars or sun. The hand is holding the lifted mug at x1030 y610, preserve this exact intermediate pose and remove the resting mug from the desk as in image 1. Do not copy the poses from image 2; preserve all geometry, hands, head, body, cat, mug, background and furniture from image 1. Change only lighting/colors. Same illustration style, exact full 1536x1024 frame, no crop, no new text or objects.
```

### coffee-sip-day

Arquivo: `public/studio/coffee-sip-day.webp`.

Prompt final:

```text
Use case: lighting-weather. Asset type: registered animation frame, 1536x1024. Image 1 is the EDIT TARGET and determines the EXACT pose and every object position. Image 2 is ONLY the daytime lighting reference. Change image 1's nighttime colors to match image 2's gentle warm peach morning sunshine exactly, including wall shadows, city daylight, plants and desk. No moon, stars or sun. The hand holds the mug to the mouth at x1010 y564, preserve this exact sipping pose, and keep the desk mug absent as in image 1. Do not copy the poses from image 2; preserve all geometry, hands, head, body, cat, mug, background and furniture from image 1. Change only lighting/colors. Same illustration style, exact full 1536x1024 frame, no crop, no new text or objects.
```

### cat-awake-day

Arquivo: `public/studio/cat-awake-day.webp`.

Prompt final:

```text
Use case: lighting-weather. Asset type: registered animation frame, 1536x1024. Image 1 is the EDIT TARGET and determines the EXACT pose and every object position. Image 2 is ONLY the daytime lighting reference. Change image 1's nighttime colors to match image 2's gentle warm peach morning sunshine exactly, including wall shadows, city daylight, plants and desk. No moon, stars or sun. The black and white cat has its head lifted, ears perked, eyes open at x720 y702, preserve this exact awake pose and the cushion silhouette. Do not copy the poses from image 2; preserve all geometry, hands, head, body, cat, mug, background and furniture from image 1. Change only lighting/colors. Same illustration style, exact full 1536x1024 frame, no crop, no new text or objects.
```

### Contato de dia

Arquivo: `public/contact-day.webp`.

Prompt final:

```text
Use case: lighting-weather. Asset type: daytime contact section artwork for an existing portfolio. Input image 1 is the edit target. Preserve the exact wide 1672x941 composition, camera, object geometry, sleeping black-and-white cat on the desk, plants, keyboard, monitor, envelope icon, lamp, books and all positions. Change ONLY time of day and colors: warm bright morning sunlight enters the arched window, sky softly blue and pale peach, replace crescent moon and stars with a small warm sun, daytime city. Room becomes cream plaster, pale apricot highlights, warm natural wood and fresh green plants. Monitor becomes dark warm brown with subtle amber waves and a glowing soft amber envelope. Lamp warm white glow. Crucial: the entire LEFT HALF must remain empty negative space but now pale warm cream (#fff7ed), gently blending into the sunlit room on the right, to support DARK brown text. Also fade bottom edges softly toward the same pale cream. Do not add text or new objects, do not crop, preserve original detailed cozy illustration style and all silhouettes. Full frame image in same wide aspect ratio.
```

### Refinamento do contato diurno

Arquivo em uso: `public/contact-day-v2.webp`. A primeira versão em `public/contact-day.webp` foi preservada. Edição feita com a ferramenta integrada `image_gen`, usando `public/contact.png` como alvo e `public/studio/daylight.webp` como referência de iluminação. Convertida para WebP com qualidade 92. As duas imagens do contato alternam a opacidade com o tema; no modo diurno, a camada noturna fica oculta inclusive durante o carregamento da nova arte.

Prompt final:

```text
Use case: lighting-weather.
Asset type: wide background illustration for the contact section of an existing portfolio.
Input images: Image 1 (contact.png) is the EDIT TARGET and defines the exact composition and objects. Image 2 (studio/daylight.webp) is ONLY a lighting, materials and illustration-style reference for the same room during the day.
Primary request: create the daytime version of Image 1 so it belongs to the same cozy sunlit studio as Image 2. Preserve the precise wide 1672x941 framing, camera, desk perspective, monitor with envelope icon, curled black-and-white cat and its resting pose, keyboard, plants, lamp, shelves, books and all positions.
Lighting: gentle peach-gold sunlight through the arched window, subtle blue and peach daytime sky and sun instead of moon/stars. Warm terracotta and wood, dark brown equipment, natural deep green plants, soft highlights and defined warm shadows like Image 2. Preserve detail and depth; avoid an overexposed yellow wash or sepia filter. The monitor remains dark warm brown with a softly glowing amber envelope.
Composition: retain the empty LEFT HALF for webpage text, replacing its dark negative space with pale warm cream #fff7ed blended gradually into the room at the center. Bottom edges also fade subtly toward cream. Most of the illustrated scene remains in the RIGHT HALF at exactly the original scale.
Constraints: change only lighting and palette, maintain the original detailed stylized illustration, exact silhouettes and geometry; keep the cat resting, do not add a person, do not copy Image 2's objects or layout, no new objects, no new text, no borders or watermark. Full original wide frame.
```

## Verificação

Os testes de navegador cobrem troca e reversão da paleta, controles da janela, imagens indisponíveis e nova tentativa, movimento reduzido, interações da hero, jornada e fitas no modo diurno. Também verificam o carregamento lento da imagem do contato, a transparência e o contraste da navbar ao sair da hero, e o preenchimento do fundo em larguras de 320, 768, 1920 e 2560px.
