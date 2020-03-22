const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const twitter = async () => {
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


  let allDummylinks=['https://www.rediff.com/','https://www.amazon.com/','https://edition.cnn.com/','https://www.alibaba.com','https://www.wired.com']
  let randomDummyLink= allDummylinks[Math.floor(Math.random() * allDummylinks.length)];  
  await page.goto(randomDummyLink);
  await page.waitFor(2000);
  await page.goto('chrome-extension://hfakmobdogkmkjbjffbdcceefcidoiff/html/welcome.html');
  await page.waitFor(1000);
  await page.evaluate(() => {
    let acceptBtn = document.getElementById('accept');
    acceptBtn.click();
  });
  await page.waitFor(1000);


  page = await browser.newPage();
  await page.goto('https://twitter.com/doc2consult');
  await page.waitFor(3000);
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  await page.evaluate(() => {
  let elements = document.querySelectorAll("a[href='https://t.co/ALxkT7WP8E?amp=1']");

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

module.exports = twitter;