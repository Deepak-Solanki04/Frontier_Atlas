const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', error => console.log('ERROR:', error.message));
  await page.goto('https://frontier-atlas-alpha.vercel.app/models', {waitUntil: 'networkidle0'});
  const content = await page.content();
  if(content.includes("This page couldn't load")) console.log('CRASH DETECTED!');
  else console.log('No crash detected. Page loaded.');
  await browser.close();
})();
