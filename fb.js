const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const fb = async () => {
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

  await page.goto('https://www.facebook.com/doc2consult/');

  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  await page.evaluate(() => {
  let elements = document.querySelectorAll('#u_0_p a');

  elements[0].click();
})


//const pageList = await newPagePromise;//await browser.pages();
const page1 = await newPagePromise;
await pageFlow.executeFlow(page1,randomNo);
  // await page1.waitFor(3000 * randomNo);
  
  // const lastPosition = await scrollPageToBottom(page1);
  
  // await page1.waitFor(3500 * randomNo);

  // webpageHelper.pageSrollToSelector(page1,'.question-tab ul li:last-child a');

  // await page1.waitFor(2500);
  // await page1.evaluate(() => {
  //   let x = document.querySelectorAll('.question-tab ul li:last-child a');

  //   x[0].click();

  // });

  // await page1.waitFor(3000* randomNo);
  // await scrollPageToBottom(page1);

  // await page1.waitFor(2000* randomNo);

  // await page1.evaluate(() => {
  //       let elements = document.getElementsByTagName('article');
  //       console.log(elements);
  //       var item = elements[Math.floor(Math.random()*elements.length)];
  //       var aElement= item.getElementsByTagName("a")[0];

  //       aElement.click();

  //   });

  // await page1.waitFor(3500 * randomNo);
  // await scrollPageToBottom(page1);

  // await page1.waitFor(1000 * randomNo);
  // await page.goto('http://onemboaran.com/afu.php?zoneid=3118682');
  // await page1.waitFor(2000 * randomNo);
  browser.close();
};


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//run();

module.exports = fb;