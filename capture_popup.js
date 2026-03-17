const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  console.log("Navigating to login...");
  await page.goto('https://cloud.skoopsignage.com/');
  
  console.log("Logging in...");
  await page.fill('input[name="email"]', 'shahzad@skoop.digital');
  await page.fill('input[name="password"]', 'ABC123abc');
  await page.click('button[type="submit"]');
  
  console.log("Waiting for dashboard...");
  await page.waitForTimeout(5000);
  
  console.log("Navigating to Playlists...");
  await page.goto('https://cloud.skoopsignage.com/playlists');
  await page.waitForTimeout(3000);
  
  console.log("Finding 'Smart Tags' playlist...");
  // Let's just click the first playlist or find it by text
  const playlistLocator = page.locator('text="Smart Tags"').first();
  await playlistLocator.click();
  await page.waitForTimeout(3000);
  
  console.log("Clicking tag icon on a playlist item...");
  // Find the tag icon. It's usually an SVG or button.
  // In previous screenshot, it's next to calendar, hourglass, copy icons.
  const tagIcon = page.locator('[data-testid="LocalOfferIcon"], svg[data-testid="LocalOfferIcon"]').first();
  if (await tagIcon.count() > 0) {
      await tagIcon.click();
      await page.waitForTimeout(2000);
      
      console.log("Taking screenshot of the popup...");
      await page.screenshot({ path: 'run_files/8_playlist_tag_popup.png' });
      console.log("Success! Screenshot saved to run_files/8_playlist_tag_popup.png");
  } else {
      console.log("Tag icon not found. Taking debug screenshot...");
      await page.screenshot({ path: 'run_files/debug_playlist.png' });
  }

  await browser.close();
})();
