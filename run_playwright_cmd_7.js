const http = require('http');

const data = JSON.stringify({
  code: `
    await page.goto("https://cloud.skoopsignage.com/playlists");
    await page.waitForTimeout(2000);
    return await snap('playlists_page');
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