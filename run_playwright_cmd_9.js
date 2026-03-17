const http = require('http');

const data = JSON.stringify({
  code: `
    await page.evaluate(() => {
      const btn = document.querySelector('svg[data-testid="LocalOfferOutlinedIcon"]').parentElement;
      if (btn) btn.click();
    });
    await page.waitForTimeout(1000);
    return await snap('playlist_item_tag_modal');
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