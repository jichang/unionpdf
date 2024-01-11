import { test } from '@playwright/test';
import { PdfApplicatinPluginKey } from '../src/core/application.configuration';

test('edit document', async ({ page }) => {
  await page.goto('http://localhost:1234');

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByTestId('demo__app__select__file__btn').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(__dirname + '/prolog.pdf');

  await page
    .getByTestId(`pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Editor}`)
    .click();
  await page.getByTestId('pdf__plugin__editor__content');

  await page.getByTestId(`pdf__editor__panel__tool__1`).click();

  const canvas = await page
    .getByTestId('pdf__editor__canvas__0')
    .elementHandle();
  const boundingBox = await canvas!.boundingBox();
  await page.mouse.move(boundingBox!.x + 10, boundingBox!.y + 10);
  await page.mouse.down();
  await page.mouse.move(boundingBox!.x + 110, boundingBox!.y + 10);
  await page.mouse.move(boundingBox!.x + 110, boundingBox!.y + 110);
  await page.mouse.move(boundingBox!.x + 10, boundingBox!.y + 110);
  await page.mouse.move(boundingBox!.x + 10, boundingBox!.y + 10);
  await page.mouse.up();

  await page.getByTestId(`pdf__editor__panel__tool__0`).click();
  await page.mouse.move(boundingBox!.x + 50, boundingBox!.y + 50);
  await page.mouse.down();
  await page.mouse.move(boundingBox!.x + 100, boundingBox!.y + 100);
  await page.mouse.up();

  await page.getByTestId('pdf__toolbar__item__exit').click();
  await page.getByTestId('pdf__ui__dialog__close__btn').click();
  await page.getByTestId('pdf__toolbar__item__commit').click();
});
