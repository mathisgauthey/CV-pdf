const puppeteer = require("puppeteer");
const path = require("path");
const filePath = path.resolve(__dirname, "index.html");

(async () => {
  try {
    const browser = await puppeteer.launch({
      product: 'firefox',
      headless: false, // Use true to run headless, not 'new'
      dumpio :true,
    });
    const page = await browser.newPage();
    await page.goto(`file:///${filePath}`, {});
    await page.pdf({
      path: "GAUTHEY_Mathis.pdf",
      format: "A4",
      // printBackground: false, // Change to true if you want to include background
      // displayHeaderFooter: false,
      // margin: { top: 0, right: 0, bottom: 0, left: 0 },
      // preferCSSPageSize: true,
    });
    await browser.close();
    console.log("✅ PDF built");
  } catch (error) {
    console.error("❌ Error building PDF:", error);
    process.exit(1);
  }
})();
