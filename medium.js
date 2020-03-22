const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const medium = async () => {
  const basePath = process.cwd();
  const cookieIgnorePath = `${basePath}/extensions/cookieconsent`
  const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        `--disable-extensions-except=${cookieIgnorePath}`,
        `--load-extension=${cookieIgnorePath}`,
    ]
  });

  var randomNo=getRandomArbitrary(3,7);
  let page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto('https://medium.com/@99prmedia/doc2consult-consult-doctor-online-afd04dbb3b55');
  await page.waitFor(4000);
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  await page.evaluate(() => {
  let elements = document.querySelectorAll("a[href='https://www.doc2consult.com']");

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

module.exports = medium;