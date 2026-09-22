const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 390, height: 844 });
  
  try {
    await page.goto('http://navas.localhost:5173/gym-admin/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
    // Wait a bit for React to render
    await new Promise(r => setTimeout(r, 2000));
    
    const metrics = await page.evaluate(() => {
      const getOverflowingElements = () => {
        const docWidth = document.documentElement.clientWidth;
        const els = Array.from(document.querySelectorAll('*'));
        return els.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.right > docWidth || el.scrollWidth > docWidth;
        }).map(el => {
          return {
             tag: el.tagName,
             className: el.className,
             id: el.id,
             width: el.scrollWidth,
             rectRight: el.getBoundingClientRect().right
          }
        }).slice(0, 15);
      };

      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        overflowingElements: getOverflowingElements()
      };
    });
    
    console.log(JSON.stringify(metrics, null, 2));
    await page.screenshot({ path: 'gym_admin_login_mobile.png' });
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
