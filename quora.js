const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const quora = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox']
  });
  let links=[
    'https://www.quora.com/Is-there-any-reliable-online-doctor/',
    'https://www.quora.com/How-can-I-find-the-best-doctor-online',
    'https://www.quora.com/Is-there-any-way-I-can-talk-to-a-doctor-online-without-paying-to-do-so',
    'https://www.quora.com/What-is-the-best-site-to-use-to-consult-with-an-online-doctor'
    ]
  let randomLink= links[Math.floor(Math.random() * links.length)];  
  var randomNo=getRandomArbitrary(3,7);
  const page = await browser.newPage();
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


//const pageList = await newPagePromise;//await browser.pages();
const page1 = await newPagePromise;
await pageFlow.executeFlow(page1,randomNo);
//   await page1.waitFor(3000 * randomNo);
  
//   const lastPosition = await scrollPageToBottom(page1);
  
//   await page1.waitFor(3500 * randomNo);

//   webpageHelper.pageSrollToSelector(page1,'.question-tab ul li:last-child a');

//   await page1.waitFor(2500);
//   await page1.evaluate(() => {
//     let x = document.querySelectorAll('.question-tab ul li:last-child a');

//     x[0].click();

//   });

//   await page1.waitFor(3000* randomNo);
//   await scrollPageToBottom(page1);

//   await page1.waitFor(2000* randomNo);

//   await page1.evaluate(() => {
//         let elements = document.getElementsByTagName('article');
//         console.log(elements);
//         var item = elements[Math.floor(Math.random()*elements.length)];
//         var aElement= item.getElementsByTagName("a")[0];

//         aElement.click();

//     });

//   await page1.waitFor(3500 * randomNo);
//   await scrollPageToBottom(page1);

//   await page1.waitFor(1000 * randomNo);
//   await page.goto('http://onemboaran.com/afu.php?zoneid=3118682');
//   await page1.waitFor(2000 * randomNo);
  browser.close();
};


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//run();

module.exports = quora;