const http = require('http');

const data = JSON.stringify({
  code: `
    await page.fill('input[placeholder="Search or add tags..."]', 'Promo');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);
    return await snap('4_screen_tags');
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