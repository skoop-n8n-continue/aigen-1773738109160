const http = require('http');

const data = JSON.stringify({
  code: `
    await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('label, div, p, span'));
      const label = inputs.find(e => e.textContent === 'Screen Tags');
      if(label) {
         const container = label.parentElement.parentElement;
         const dropdown = container.querySelector('svg');
         if(dropdown) dropdown.parentElement.click();
      }
    });
    await page.waitForTimeout(1000);
    return await snap('screen_tags_dropdown');
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