const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  try {
    await page.goto('http://localhost:3000/models', { waitUntil: 'networkidle0' });
    const content = await page.content();
    if (content.includes("This page couldn't load")) {
        console.log("CRASH DETECTED IN HTML!");
    } else {
        console.log("Page loaded successfully.");
    }
  } catch (err) {
    console.error("Puppeteer error:", err);
  }

  await browser.close();
  process.exit(0);
})();
