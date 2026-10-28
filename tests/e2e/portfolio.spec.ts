import { expect, test, type Page } from "@playwright/test";

declare global {
  interface Window {
    audioProbe: { pending: (() => void)[]; tones: number };
  }
}

const browserErrors = new WeakMap<Page, string[]>();

test("atalhos de projetos e início usam rolagem suave e respeitam movimento reduzido", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("smooth");
  const scrollPadding = await page.evaluate(() =>
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop),
  );
  await page
    .getByRole("link", { name: "Explorar Projetos", exact: true })
    .click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect
    .poll(() =>
      page
        .locator("#projetos")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(Math.round(scrollPadding));
  await page
    .getByRole("link", { name: "Voltar ao início", exact: true })
    .click();
  await expect(page).toHaveURL(/#inicio$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page)).toEqual([]);
});

test("seleção, pausa e ejeção das fitas", async ({ page }) => {
  const tapes = page.locator("[data-tape-id]");
  const screen = page.locator("[data-playback]");
  await tapes.nth(1).click();
  await expect(tapes.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(screen).toHaveAttribute("data-playback", "playing");
  await page.getByRole("button", { name: "Pausar apresentação" }).click();
  await expect(screen).toHaveAttribute("data-playback", "paused");
  await page.getByRole("button", { name: "Reproduzir apresentação" }).click();
  await expect(screen).toHaveAttribute("data-playback", "playing");
  await page.getByRole("button", { name: "Ejetar fita" }).click();
  await expect(screen).toHaveAttribute("data-playback", "empty");
  await expect(page.locator('[data-tape-id][aria-pressed="true"]')).toHaveCount(
    0,
  );
  await tapes.last().focus();
  await page.keyboard.press("Enter");
  await expect(tapes.last()).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Ejetar fita" }).click();
  await page.getByRole("button", { name: "Projeto anterior" }).click();
  await expect(tapes.last()).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Próximo projeto" }).click();
  await expect(tapes.first()).toHaveAttribute("aria-pressed", "true");
});

test("ejetar durante o carregamento cancela a reprodução pendente", async ({
  page,
}) => {
  await page.locator("[data-tape-id]").nth(1).click();
  await expect(page.locator("[data-playback]")).toHaveAttribute(
    "data-playback",
    "loading",
  );
  await page.getByRole("button", { name: "Ejetar fita" }).click();
  await page.waitForTimeout(800);
  await expect(page.locator("[data-playback]")).toHaveAttribute(
    "data-playback",
    "empty",
  );
});

test("arraste carrega uma fita e Escape cancela o próximo arraste", async ({
  page,
  isMobile,
}) => {
  const tapes = page.locator("[data-tape-id]");
  const player = page.locator("[data-player-drop-zone]");
  const touchSession = isMobile
    ? await page.context().newCDPSession(page)
    : null;
  const drag = async (
    from: { x: number; y: number },
    to: { x: number; y: number },
    cancel = false,
  ) => {
    if (touchSession) {
      await touchSession.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ ...from, id: 1 }],
      });
      for (let step = 1; step <= 12; step++) {
        await touchSession.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [
            {
              x: from.x + ((to.x - from.x) * step) / 12,
              y: from.y + ((to.y - from.y) * step) / 12,
              id: 1,
            },
          ],
        });
      }
    } else {
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      await page.mouse.move(to.x, to.y, { steps: 12 });
    }
    await expect(page.locator('[class*="dragGhost"]')).toHaveCount(1);
    if (cancel) await page.keyboard.press("Escape");
    if (touchSession)
      await touchSession.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
    else await page.mouse.up();
    await expect(page.locator('[class*="dragGhost"]')).toHaveCount(0);
  };
  await tapes.nth(1).scrollIntoViewIfNeeded();
  const source = await tapes.nth(1).boundingBox();
  const target = await player.boundingBox();
  const navBottom = await page
    .getByRole("navigation")
    .evaluate((el) => el.getBoundingClientRect().bottom);
  if (!source || !target) throw new Error("Fita ou tocador fora do layout");
  await drag(
    { x: source.x + source.width / 2, y: source.y + source.height / 2 },
    {
      x: target.x + target.width / 2,
      y: Math.max(navBottom + 20, target.y + target.height * 0.7),
    },
  );
  await expect(tapes.nth(1)).toHaveAttribute("aria-pressed", "true");
  await tapes.last().scrollIntoViewIfNeeded();
  const next = await tapes.last().boundingBox();
  if (!next) throw new Error("Próxima fita fora do layout");
  await drag(
    { x: next.x + next.width / 2, y: next.y + next.height / 2 },
    { x: next.x + next.width / 2, y: next.y - 30 },
    true,
  );
  await expect(tapes.nth(1)).toHaveAttribute("aria-pressed", "true");
  await touchSession?.detach();
});

test("som ignora a ativação antiga quando há cliques rápidos", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const pending: (() => void)[] = [];
    const probe = { pending, tones: 0 };
    window.audioProbe = probe;
    const BrowserAudioContext = window.AudioContext;
    window.AudioContext = class extends BrowserAudioContext {
      async resume() {
        await super.resume();
        await new Promise<void>((resolve) => pending.push(resolve));
      }
      createOscillator() {
        probe.tones++;
        return super.createOscillator();
      }
    };
  });
  await page.reload();
  const sound = page.getByRole("button", { name: "Ativar som", exact: true });
  await sound.click();
  await sound.click();
  await sound.click();
  await expect
    .poll(() =>
      page.evaluate(() => {
        return window.audioProbe.pending.length;
      }),
    )
    .toBe(2);
  await page.evaluate(async () => {
    window.audioProbe.pending[0]();
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  });
  await expect(page.locator("#inicio")).toHaveAttribute("data-sound", "false");
  await page.evaluate(() => {
    window.audioProbe.pending[1]();
  });
  await expect(page.locator("#inicio")).toHaveAttribute("data-sound", "true");
  expect(
    await page.evaluate(() => {
      return window.audioProbe.tones;
    }),
  ).toBe(1);
  await page
    .getByRole("button", { name: "Desativar som", exact: true })
    .click();
  await expect(page.locator("#inicio")).toHaveAttribute("data-sound", "false");
});

test("jornada mantém seleção e foco pelo teclado", async ({
  page,
  isMobile,
}) => {
  const tabs = page.getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press(isMobile ? "ArrowRight" : "ArrowDown");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(1)).toBeFocused();
  await page.keyboard.press("End");
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("button", { name: "Próxima etapa" }),
  ).toBeDisabled();
  await page.keyboard.press("Home");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("button", { name: "Anterior", exact: true }),
  ).toBeDisabled();
});

test("controles do estúdio e limpeza ao sair da hero", async ({ page }) => {
  const hero = page.locator("#inicio");
  const explorer = page.getByRole("button", {
    name: "Explore o estúdio",
    exact: true,
  });
  await page.getByRole("button", { name: "Apagar luz", exact: true }).click();
  await expect(hero).toHaveAttribute("data-lights", "off");
  await explorer.click();
  const panel = page.getByRole("group", { name: "Controles do estúdio" });
  await expect(
    page.getByRole("button", { name: "Fechar controles do estúdio" }),
  ).toBeFocused();
  await panel.getByRole("button", { name: "Digitar", exact: true }).click();
  await expect(hero).toHaveAttribute("data-typing", "true");
  await panel.getByRole("button", { name: "Trocar tela" }).click();
  await expect(hero).toHaveAttribute("data-screen", "preview");
  await panel.getByRole("button", { name: "Tomar café", exact: true }).click();
  await expect(hero).toHaveAttribute("data-coffee", "sip");
  await panel
    .getByRole("button", { name: "Fazer carinho", exact: true })
    .click();
  await expect(hero).toHaveAttribute("data-cat", "awake");
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(explorer).toBeFocused();
  await explorer.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "projetos", exact: true })
    .click();
  await expect(panel).toHaveCount(0);
  await expect(hero).toHaveAttribute("data-coffee", "idle");
  await expect(hero).toHaveAttribute("data-cat", "idle");
  await expect(hero).toHaveAttribute("data-typing", "false");
});

test("movimento reduzido e navegação sem transbordamento", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
      .toBe(width);
    for (const id of ["projetos", "jornada", "contato"]) {
      await page.locator(`nav a[href="#${id}"]`).click();
      const navBottom = await page
        .getByRole("navigation")
        .evaluate((el) => el.getBoundingClientRect().bottom);
      expect(
        await page
          .locator(`#${id}`)
          .evaluate((el) => el.getBoundingClientRect().top),
      ).toBeGreaterThanOrEqual(navBottom);
    }
  }
  await page.locator("[data-tape-id]").last().click();
  await expect(page.locator("[data-playback]")).toHaveAttribute(
    "data-playback",
    "playing",
  );
});

test("tema diurno sincroniza navbar, seções e fitas e volta ao noturno", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const palette = () =>
    page.evaluate(() => {
      const selectors = [
        "#jornada h2",
        "#jornada h2 > span:last-child",
        "#projetos h2",
        "#contato h2",
      ];
      return selectors.map((selector) => {
        const element = document.querySelector(selector)!;
        return {
          color: getComputedStyle(element).color,
          background: getComputedStyle(element).backgroundColor,
        };
      });
    });
  const night = await palette();
  await page
    .getByRole("button", { name: "Ativar tema diurno", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "day");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  const day = await palette();
  for (let i = 0; i < night.length; i++) expect(day[i]).not.toEqual(night[i]);
  await expect(
    page.locator('[data-studio-scene="main"] [data-celestial="sun"]'),
  ).toHaveCSS("opacity", "1");
  await expect(
    page.locator('[data-studio-scene="main"] [data-celestial="moon"]'),
  ).toHaveCSS("opacity", "0");
  await page.locator("[data-tape-id]").nth(1).click();
  await expect(page.locator("[data-playback]")).toHaveAttribute(
    "data-playback",
    "playing",
  );
  await page.getByRole("tab").last().click();
  await expect(page.getByRole("tab").last()).toHaveAttribute(
    "aria-selected",
    "true",
  );
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
      .toBe(width);
  }
  await page
    .getByRole("button", { name: "Ativar tema noturno", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
  expect(await palette()).toEqual(night);
});

test("janela e controles alternam o dia sem interromper luz, café e gato", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const hero = page.locator("#inicio");
  const explorer = page.getByRole("button", {
    name: "Explore o estúdio",
    exact: true,
  });
  if (isMobile) {
    await explorer.click();
    await page
      .getByRole("button", { name: "Deixar o sol entrar", exact: true })
      .click();
  } else {
    await page
      .getByRole("button", {
        name: "Deixar o sol entrar pela janela",
        exact: true,
      })
      .click();
    await explorer.click();
  }
  await expect(hero).toHaveAttribute("data-theme", "day");
  const panel = page.getByRole("group", { name: "Controles do estúdio" });
  await panel.getByRole("button", { name: "Tomar café", exact: true }).click();
  await expect(hero).toHaveAttribute("data-coffee", "sip");
  await panel
    .getByRole("button", { name: "Fazer carinho", exact: true })
    .click();
  await expect(hero).toHaveAttribute("data-cat", "awake");
  await panel
    .getByRole("button", { name: "Trazer a noite", exact: true })
    .click();
  await expect(hero).toHaveAttribute("data-theme", "night");
  await panel
    .getByRole("button", { name: "Deixar o sol entrar", exact: true })
    .click();
  await expect(hero).toHaveAttribute("data-theme", "day");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Apagar luz", exact: true }).click();
  await expect(hero).toHaveAttribute("data-lights", "off");
  await expect(hero).toHaveAttribute("data-theme", "day");
});

test("contato aguarda a imagem, preenche a tela e mantém a navbar transparente", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const nav = page.getByRole("navigation");
  const brand = nav.getByRole("link", { name: "Pedro HAS — início" });
  const heroColor = await brand.evaluate((el) => getComputedStyle(el).color);
  await expect(nav).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

  let releaseImage = () => {};
  const pendingImage = new Promise<void>((resolve) => {
    releaseImage = resolve;
  });
  await page.route("**/contact-day-v2.webp", async (route) => {
    await pendingImage;
    await route.continue();
  });
  const dayButton = page.getByRole("button", {
    name: "Ativar tema diurno",
    exact: true,
  });
  try {
    await dayButton.click();
    await expect(dayButton).toBeDisabled();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
  } finally {
    releaseImage();
  }
  await expect(page.locator("html")).toHaveAttribute("data-theme", "day");

  const contact = page.locator("#contato");
  const dayImage = contact.locator('img[src="/contact-day-v2.webp"]');
  const nightImage = contact.locator('img[src="/contact-night.webp"]');
  await nav.getByRole("link", { name: "contato", exact: true }).click();
  await expect(nav).toHaveAttribute("data-over-hero", "false");
  await expect
    .poll(() => brand.evaluate((el) => getComputedStyle(el).color))
    .not.toBe(heroColor);

  for (const width of [320, 768, 1920, 2560]) {
    await page.setViewportSize({ width, height: width >= 1920 ? 1080 : 900 });
    await contact.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        dayImage.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expect(dayImage).toHaveCSS("opacity", "1");
    await expect(nightImage).toHaveCSS("opacity", "0");
    const sectionBounds = await contact.boundingBox();
    const imageBounds = await dayImage.boundingBox();
    expect(sectionBounds?.x).toBe(0);
    expect(sectionBounds?.width).toBe(width);
    expect(imageBounds?.x).toBe(0);
    expect(imageBounds?.width).toBe(width);
    if (width >= 768) expect(imageBounds?.height).toBe(sectionBounds?.height);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
    await expect(nav).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }

  await page
    .getByRole("button", { name: "Ativar tema noturno", exact: true })
    .click();
  await expect(nav).toHaveAttribute("data-over-hero", "true");
  await expect(brand).toHaveCSS("color", heroColor);
  await nav.getByRole("link", { name: "contato", exact: true }).click();
  await expect
    .poll(() =>
      nightImage.evaluate(
        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(nightImage).toHaveCSS("opacity", "1");
  await expect(dayImage).toHaveCSS("opacity", "0");
});

for (const [name, path] of [
  ["quarto", "**/studio/daylight.webp"],
  ["contato", "**/contact-day-v2.webp"],
]) {
  test(`falha na imagem do ${name} mantém o tema e permite tentar novamente`, async ({
    page,
  }) => {
    await page.route(path, (route) => route.abort());
    const themeButton = page.getByRole("button", {
      name: "Ativar tema diurno",
      exact: true,
    });
    await themeButton.click();
    await expect(themeButton).toBeEnabled();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
    await expect(page.locator("#inicio [role=status]")).toContainText(
      "Tente trocar o tema novamente",
    );
    await page.unroute(path);
    await themeButton.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "day");
  });
}
