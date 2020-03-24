const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const reddit = async () => {
  const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox'
    ]
  });

  var randomNo=getRandomArbitrary(3,7);
  let page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto('https://www.reddit.com/r/doctorwho/comments/995e2u/online_doctor_service/');
  await page.waitFor(4000);
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  await page.evaluate(() => {
  let elements = document.querySelectorAll("a[href='https://www.doc2consult.com/']");

  elements[0].click();
})


const page1 = await newPagePromise;
await pageFlow.executeFlow(page1,randomNo?randomNo:4);

browser.close();
};


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = reddit;