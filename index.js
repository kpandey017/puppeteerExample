const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')

async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  var randomNo=Math.floor(Math.random() * (20 -10 + 1) + 10);
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 })
  await page.goto('https://www.doc2consult.com');
  const lastPosition = await scrollPageToBottom(page);
  await page.waitFor(randomNo*1000);
  await page.evaluate(() => {
        let elements = document.getElementsByTagName('article');
		console.log(elements);
		var item = elements[Math.floor(Math.random()*elements.length)];
    var aElement= item.getElementsByTagName("a")[0];
    
    aElement.click();
    
    });

  await page.waitFor(randomNo*1000);
  const lastPosition2 = await scrollPageToBottom(page);
  await page.waitFor(randomNo*1000);
  browser.close();
  
}

run();
