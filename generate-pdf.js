const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const filePath = path.resolve(__dirname, "index.html");

(async () => {
  try {
    const puppeteerVersion = require('puppeteer/package.json').version;
    console.log(`Using Puppeteer version ${puppeteerVersion}`);
    console.log(`This is the path: ${filePath}`)
    
    const browser = await puppeteer.launch({
      product: 'firefox',
      headless: false, // Use true to run headless, not 'new'
      dumpio: false
    });
    const page = await browser.newPage();
    var contentHtml = fs.readFileSync(`${filePath}`, 'utf8');
    await page.setContent(contentHtml);
    // await page.goto(`file:${filePath}`);
    await page.pdf({
      path: "GAUTHEY_Mathis.pdf",
      format: "A4",
      displayHeaderFooter: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      // preferCSSPageSize: true,
      // printBackground: false, // Change to true if you want to include background
    });
    await browser.close();
    console.log("✅ PDF built");
  } catch (error) {
    console.error("❌ Error building PDF:", error);
    process.exit(1);
  }
})();
