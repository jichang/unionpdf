import { expect, Locator, test } from '@playwright/test';
import { PdfApplicatinPluginKey } from '../src/core/application.configuration';

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
  control: Locator,
  side: 'left' | 'right',
) {
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
      .getByTestId('demo__app__select__file__btn')
      .setInputFiles(__dirname + '/prolog.pdf');

    const toolbar = page.locator('.pdf__toolbar');
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
      await page.locator('.pdf__pages').click({ position: { x: 1, y: 200 } });
      await expect(actions).toHaveAttribute('aria-expanded', 'false');
    } else {
      await expect(tools).toBeHidden();
      await expect(actions).toBeHidden();
      await expect(
        toolbar.getByRole('button', { name: 'Metadata', exact: true }),
      ).toBeVisible();
    }

    const pages = page.locator('.pdf__pages');
    const content = page.locator('.pdf__page__content').first();
    await expect(content).toBeVisible();
    const initialWidth = await content.evaluate((el) => el.clientWidth);
    await page.getByTestId('pdf__toolbar__pages__scale__factor').fill('3');
    await page.getByTestId('pdf__toolbar__pages__scale__factor').blur();
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
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);

    for (const plugin of [
      PdfApplicatinPluginKey.Metadata,
      PdfApplicatinPluginKey.Thumbnails,
      PdfApplicatinPluginKey.Bookmarks,
      PdfApplicatinPluginKey.Search,
      PdfApplicatinPluginKey.Attachments,
      PdfApplicatinPluginKey.Signatures,
    ]) {
      const toggle = page.getByTestId(`pdf__toolbar__item__plugin__${plugin}`);
      await clickControl(toolbar, toggle, 'left');
      const panel = page.getByTestId(`pdf__plugin__panel__${plugin}`);
      await expectContained(panel);
      if (plugin === PdfApplicatinPluginKey.Metadata) {
        await panel
          .locator('td')
          .last()
          .evaluate((el) => {
            el.textContent = 'long-metadata-value'.repeat(50);
          });
        await expectContained(panel);
      }
      await clickControl(toolbar, toggle, 'left');
    }

    await clickControl(
      toolbar,
      page.getByTestId(
        `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Downloader}`,
      ),
      'right',
    );
    const dialog = page.locator('dialog[open]');
    await expectContained(dialog);
    await page.setViewportSize({ width, height: 240 });
    expect(
      await dialog.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      }),
    ).toBe(true);
    await dialog.getByTestId('pdf__ui__dialog__close__btn').click();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.locator('.App').evaluate((el) => {
      el.style.width = '280px';
    });
    await expectContained(toolbar);
    expect(await toolbar.evaluate((el) => el.clientWidth)).toBeLessThanOrEqual(
      280,
    );

    await expect(tools).toBeVisible();
    await expect(actions).toBeVisible();
    await clickControl(
      toolbar,
      page.getByTestId(
        `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Editor}`,
      ),
      'right',
    );
    await expectContained(toolbar);
    for (const control of await toolbar
      .locator('button:visible, input:visible, select:visible')
      .all()) {
      await expectContained(control);
    }
    await toolbar.getByRole('button', { name: 'Tools', exact: true }).click();
    await expect(
      page.getByTestId('pdf__toolbar__item__annotation'),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await toolbar.getByRole('button', { name: 'Actions', exact: true }).click();
    await expect(page.getByTestId('pdf__toolbar__item__exit')).toBeVisible();
    await page.getByTestId('pdf__toolbar__item__exit').click();
    await expect(
      toolbar.getByRole('button', { name: 'Tools', exact: true }),
    ).toHaveAttribute('aria-expanded', 'false');
  });
}
