const puppeteer = require('puppeteer-core');
(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\\\Users\\\\Deepak Solanki\\\\.cache\\\\puppeteer\\\\chrome\\\\win64-150.0.7871.24\\\\chrome-win64\\\\chrome.exe',
      headless: true
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    
    console.log("Navigating to page...");
    await page.goto('https://frontier-atlas-alpha.vercel.app/models', {waitUntil: 'networkidle0'});
    console.log("Page loaded. Checking content...");
    
    const content = await page.content();
    if(content.includes("This page couldn't load")) {
        console.log('CRASH DETECTED!');
    } else {
        console.log('No crash detected. Page rendered successfully.');
    }
    
    await browser.close();
  } catch (err) {
    console.error("Script error:", err);
  }
})();
