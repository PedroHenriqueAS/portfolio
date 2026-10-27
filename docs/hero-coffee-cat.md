# Café e gato na hero

As ações ficam em `use-studio-moments.ts`. A caneca inicia levantar → beber → devolver (2,7 s). O gato levanta a cabeça e reage por 3,2 s, com movimento localizado nas orelhas e no corpo. Novos cliques durante uma ação são ignorados. Digitar cancela o café; o gato funciona independentemente. Ocultar a aba, sair da hero ou desmontar o componente cancela os temporizadores e os sons, além de invalidar as respostas dos carregamentos pendentes.

As imagens só são carregadas/decodificadas quando a interação é acionada. Falhas permitem tentar novamente. Os controles equivalentes estão no painel Explore o estúdio, incluindo no celular e pelo teclado. Com movimento reduzido, mostra-se uma pose estática por um intervalo menor, sem vapor, pulsação ou deslocamento das orelhas.

O ronronar e o toque da caneca são sintetizados com Web Audio e só tocam após ativar Som. Desativar Som interrompe os nós ativos imediatamente.

## Assets e composição

Gerados com a skill imagegen e a ferramenta integrada, sem CLI/API. Originais preservados. Saídas convertidas para WebP (qualidade 92), 1536 × 1024:

- `public/studio/coffee-lift.webp`
- `public/studio/coffee-sip.webp`
- `public/studio/coffee-lift-off.webp`
- `public/studio/coffee-sip-off.webp`
- `public/studio/cat-awake.webp`

Máscaras SVG locais substituem somente braço/caneca e gato. A região do café é composta antes do monitor, e o contorno do braço/caneca depois, preservando a projeção da tela. A animação usa poses ilustradas, sem rig 3D. A luz pode ser alternada durante a ação.

## Prompts finais

### Beber café (entrada: lights-on.webp)

```text
Use case: precise-object-edit. Asset type: registered animation frame for an existing website illustration. Image 1 is the edit target. Preserve exactly the 1536x1024 composition, fixed camera, all background objects, purple nighttime lighting, linework and character identity. Do not crop, zoom, add text or redesign anything. Outside the requested small region all pixels should match the original as closely as possible. Change ONLY the man's visible right forearm and hand into a natural coffee-drinking pose: elbow stays near his body, forearm bends upward, right hand holds the existing white black-cat-face coffee mug to his mouth. The mug rim touches his lips around x995 y563, the mug extends right from the lips and his hand wraps its handle. Keep his beanie, head silhouette, glasses, torso and chair exactly fixed. Remove the original mug from the desk at x1174..1228 y640..698 and restore the wood underneath, since this SAME mug is now in his hand. Remove the former typing hand; exactly one right arm and one mug. Leave the sleeping cat completely unchanged. Natural plausible anatomy, a quiet small sip.
```

### Gato acordado (entrada: lights-on.webp)

```text
Use case: precise-object-edit. Asset type: registered animation frame for an existing website illustration. Image 1 is the edit target. Preserve exactly the 1536x1024 composition, fixed camera, all background objects, purple nighttime lighting, linework and character identity. Do not crop, zoom, add text or redesign anything. Outside the requested small region all pixels should match the original as closely as possible. Change ONLY the black-and-white cat on its cushion at x610..770 y675..748. Keep its body curled and lying in exactly the same position, but raise its head slightly (about 15 pixels), ears gently perked up, eyes softly open looking toward viewer, a content relaxed expression as if responding to a gentle pet. Keep exact fur markings, body size, cushion outline, floor and plants unchanged. Do not change the man, desk, coffee, monitor or lamp.
```

### Levantar/devolver a caneca (entrada: pose bebendo)

```text
Use case: precise-object-edit. Image 1 is the edit target, a 1536x1024 animation frame of a man sipping coffee in his purple studio. Produce the intermediate lifting/lowering pose: move ONLY the right hand, white sleeve forearm and the mug downward and rightward from the mouth, holding the SAME white cat-face mug around x1080 y610 (about 70 px lower and right from current). Right elbow remains by torso, hand naturally holds handle, relaxed grip; keep upper arm/shoulder, head, face and beanie perfectly stationary. Mug must be off the desk, no duplicate mug or arm. Invariants: EXACT same composition, size, camera, lighting, room, monitor, cat, chair, desk and all geometry. Preserve all pixels outside the changed forearm/mug region as closely as possible. This will crossfade over image 1 in an animation. No added text or objects.
```

### Beber café com luz apagada (entradas: pose bebendo e lights-off.webp)

```text
Use case: lighting-weather. Image 1 is the edit target. Image 2 is ONLY a reference for how the lamp-off lighting should look. Keep image 1's exact coffee-drinking pose, anatomy, mug position, composition and ALL geometry perfectly unchanged. Switch OFF the right desk task lamp: dark violet underside, remove white glow, magenta bloom and bright pink pool on right desk. Retain monitor and city illumination; do not darken whole picture. Match image 2's lamp lighting only, NEVER copy its typing pose or desk mug. Output same 1536x1024 frame with coffee mug held to mouth, and desk mug spot empty.
```

### Levantar/devolver com luz apagada (entradas: pose levantando e lights-off.webp)

O texto do prompt desta variação não foi registrado.
