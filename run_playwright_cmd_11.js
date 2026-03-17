const http = require('http');

const data = JSON.stringify({
  code: `
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);

    // Hover over the tags icon
    await page.evaluate(() => {
      const btn = document.querySelector('svg[data-testid="LocalOfferOutlinedIcon"]').parentElement;
      if(btn) {
        // Trigger hover effect programmatically if needed, but playwright has hover
      }
    });

    // Use Playwright hover
    await page.hover('svg[data-testid="LocalOfferOutlinedIcon"]');
    await page.waitForTimeout(1000);

    return await snap('5_playlist_item_tags_hover');
  `
});

const req = http.request({
  hostname: 'localhost',
  port: 7331,
  path: '/command',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(body));
});

req.write(data);
req.end();