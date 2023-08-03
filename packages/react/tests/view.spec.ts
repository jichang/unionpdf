import { test } from '@playwright/test';
import { PdfApplicatinPluginKey } from '../src/core/application.configuration';

test('view document', async ({ page }) => {
  await page.goto('http://localhost:1234');

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByTestId('demo__app__select__file__btn').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(__dirname + '/prolog.pdf');

  await page.getByTestId('pdf__toolbar__plugin__pages__group');

  await page
    .getByTestId(
      `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Metadata}`,
    )
    .click();
  await page.getByTestId('pdf__plugin__metadata__content');
  await page.getByTestId('pdf__ui__dialog__close__btn').click();

  await page
    .getByTestId(
      `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Bookmarks}`,
    )
    .click();
  await page.getByTestId('pdf__plugin__bookmarks__content');
  await page
    .getByTestId(
      `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Bookmarks}`,
    )
    .click();

  await page
    .getByTestId(
      `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Thumbnails}`,
    )
    .click();
  await page.getByTestId('pdf__plugin__thumbnails__content');
  await page
    .getByTestId(
      `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Thumbnails}`,
    )
    .click();

  await page
    .getByTestId(
      `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Attachments}`,
    )
    .click();
  await page.getByTestId('pdf__plugin__attachments__content');
  await page.getByTestId('pdf__ui__dialog__close__btn').click();

  await page
    .getByTestId(
      `pdf__toolbar__item__plugin__${PdfApplicatinPluginKey.Signatures}`,
    )
    .click();
  await page.getByTestId('pdf__plugin__signatures__content');
  await page.getByTestId('pdf__ui__dialog__close__btn').click();
});
