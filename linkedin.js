const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const linkedin = async () => {
  const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox'
    ]
  });

  var randomNo=getRandomArbitrary(3,7);
  let page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto('https://www.linkedin.com/company/doc2consult/');

  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  await page.evaluate(() => {
  let elements = document.querySelectorAll('.external-link.about-us__link');

  elements[0].click();
})


const page1 = await newPagePromise;
await pageFlow.executeFlow(page1,randomNo);
  browser.close();
};


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//run();

module.exports = linkedin;