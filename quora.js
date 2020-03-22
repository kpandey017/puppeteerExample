const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const quora = async () => {
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
  let links=[
    'https://www.quora.com/Is-there-any-reliable-online-doctor/',
    'https://www.quora.com/How-can-I-find-the-best-doctor-online',
    'https://www.quora.com/Is-there-any-way-I-can-talk-to-a-doctor-online-without-paying-to-do-so',
    'https://www.quora.com/What-is-the-best-site-to-use-to-consult-with-an-online-doctor'
    ]
  let randomLink= links[Math.floor(Math.random() * links.length)];  
  var randomNo=getRandomArbitrary(3,7);
  let page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });



  await page.goto(randomLink);
  await page.waitFor(2500);
  await scrollPageToBottom(page);
  await page.waitFor(2000);
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  await page.evaluate(() => {
  let elements = document.querySelectorAll("a[href='https://www.doc2consult.com/']");

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

module.exports = quora;