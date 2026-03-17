const http = require('http');

const data = JSON.stringify({
  code: `
    await page.evaluate(() => {
      const textNodes = Array.from(document.querySelectorAll('.MuiTypography-body2'));
      const textNode = textNodes.find(e => e.textContent.includes('Pro skoop stick'));
      if(textNode) {
        const row = textNode.parentElement.parentElement.parentElement;
        const btn = row.querySelector('button[aria-label="more"]');
        if (btn) btn.click();
      }
    });
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('li, div[role="menuitem"]'));
      const item = items.find(e => e.textContent.includes('Details'));
      if(item) item.click();
    });
    await page.waitForTimeout(2000);
    return await snap('screen_details');
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