import { expect, Locator, test } from '@playwright/test';

async function expectContained(locator: Locator) {
  await expect(locator).toBeVisible();
  expect(
    await locator.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.left >= -1 &&
        rect.right <= document.documentElement.clientWidth + 1 &&
        element.scrollWidth <= element.clientWidth + 1
      );
    }),
  ).toBe(true);
}

async function clickControl(
  toolbar: Locator,
  name: string,
  side: 'left' | 'right',
) {
  const control = toolbar.getByRole('button', { name, exact: true });
  if (!(await control.isVisible())) {
    await toolbar.locator(`.pdf__toolbar__side--${side} > button`).click();
  }
  await control.click();
}

for (const width of [320, 768, 1280]) {
  test(`responsive viewer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 720 });
    await page.goto('/');
    await page
      .locator('#fileInput')
      .setInputFiles(__dirname + '/../../react/tests/prolog.pdf');
    await expect(page.locator('#status')).toContainText('Loaded:');

    const toolbar = page.locator('pdf-toolbar .pdf__toolbar');
    await expectContained(toolbar);
    for (const control of await toolbar
      .locator('button:visible, input:visible, select:visible')
      .all()) {
      await expectContained(control);
    }

    const tools = toolbar.getByRole('button', { name: 'Tools', exact: true });
    const actions = toolbar.getByRole('button', {
      name: 'Actions',
      exact: true,
    });
    if (width <= 768) {
      await expect(tools).toBeVisible();
      await expect(actions).toBeVisible();
      await expect(
        toolbar.getByRole('button', { name: 'Metadata', exact: true }),
      ).toBeHidden();
      await tools.focus();
      await tools.press('Enter');
      await expect(tools).toHaveAttribute('aria-expanded', 'true');
      await tools.press('Tab');
      await expect(
        toolbar.getByRole('button', { name: 'Metadata', exact: true }),
      ).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(tools).toBeFocused();
      await expect(tools).toHaveAttribute('aria-expanded', 'false');
      await tools.click();
      await actions.click();
      await expect(tools).toHaveAttribute('aria-expanded', 'false');
      await expect(actions).toHaveAttribute('aria-expanded', 'true');
      await expectContained(
        toolbar.locator(
          '.pdf__toolbar__side--right .pdf__toolbar__item__group',
        ),
      );
      await page.locator('pdf-pages').click({ position: { x: 1, y: 200 } });
      await expect(actions).toHaveAttribute('aria-expanded', 'false');
    } else {
      await expect(tools).toBeHidden();
      await expect(actions).toBeHidden();
      await expect(
        toolbar.getByRole('button', { name: 'Metadata', exact: true }),
      ).toBeVisible();
    }

    const pages = page.locator('pdf-pages');
    const content = pages.locator('.pdf__page__content').first();
    await expect(content).toBeVisible();
    const initialWidth = await content.evaluate((el) => el.clientWidth);
    await toolbar.locator('.pdf__toolbar__scalefactor').fill('3');
    await toolbar.locator('.pdf__toolbar__scalefactor').blur();
    await expect
      .poll(async () =>
        Math.abs(
          (await content.evaluate((el) => el.clientWidth)) - initialWidth * 3,
        ),
      )
      .toBeLessThanOrEqual(2);
    expect(await pages.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(
      true,
    );
    await pages.evaluate((el) => {
      el.scrollLeft = 0;
    });
    expect(
      await content.evaluate((el) => el.getBoundingClientRect().left),
    ).toBe(await pages.evaluate((el) => el.getBoundingClientRect().left));

    for (const name of [
      'Metadata',
      'Thumbnails',
      'Bookmarks',
      'Search',
      'Attachments',
      'Signatures',
    ]) {
      await clickControl(toolbar, name, 'left');
      const panel = page.locator('.sidebar');
      await expectContained(panel);
      if (name === 'Metadata') {
        await panel
          .locator('td')
          .last()
          .evaluate((el) => {
            el.textContent = 'long-metadata-value'.repeat(50);
          });
        await expectContained(panel);
      }
      if (width === 320) {
        expect(
          await panel.evaluate((el) => el.getBoundingClientRect().bottom),
        ).toBeLessThanOrEqual(
          await pages.evaluate((el) => el.getBoundingClientRect().top),
        );
      }
      await clickControl(toolbar, name, 'left');
    }

    await clickControl(toolbar, 'Save As', 'right');
    const dialog = page.locator('.pdf__downloader__content');
    await expectContained(dialog);
    await page.setViewportSize({ width, height: 240 });
    expect(
      await dialog.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      }),
    ).toBe(true);
    await page.locator('.pdf__downloader__close').click();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.locator('pdf-application').evaluate((el) => {
      el.style.width = '280px';
    });
    await expectContained(toolbar);
    expect(await toolbar.evaluate((el) => el.clientWidth)).toBeLessThanOrEqual(
      280,
    );
    await expect(tools).toBeVisible();
    await expect(actions).toBeVisible();
    await clickControl(toolbar, 'Edit', 'right');
    await expectContained(toolbar);
    await expectContained(page.locator('.pdf__editor__toolbar'));
    for (const control of await page
      .locator('.pdf__editor__toolbar button')
      .all()) {
      await expectContained(control);
    }
    await toolbar.getByRole('button', { name: 'Tools', exact: true }).click();
    await toolbar.getByRole('button', { name: 'Exit', exact: true }).click();
    await expect(
      toolbar.getByRole('button', { name: 'Tools', exact: true }),
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
}
