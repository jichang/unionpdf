import { test } from '@playwright/test';

test('open document', async ({ page }) => {
  await page.goto('http://localhost:1234');
});
