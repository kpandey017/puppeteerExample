const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const google = async () => {
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

  let keyWords=['consult doctor online free','ask free doctor online consult']
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

  await page.goto('https://www.google.com');
  await page.type('input.gLFyf.gsfi', keyWords[Math.floor(Math.random() * keyWords.length)]);
  page.keyboard.press('Enter');

  await page.waitForSelector('h3.LC20lb', {timeout: 10000});

  var ele;
  for (let k = 0; k < 12; k++) {
    await page.waitFor(1000 * randomNo);
    if(ele == undefined || ele== null){
      
      await page.click("#pnnext")
      await page.waitFor(2000);
    }
    else{
      break;
    }

    const getData = async() => {
      return await page.evaluate(async () => {
          return await new Promise(resolve => {

              let elements = document.querySelectorAll('h3.LC20lb')
              let Gindex=-1;
              for (let index = 0; index < elements.length; index++) {
                const title = elements[index].innerText;
                if(title.includes("Doc2Consult")){
                  Gindex=index;
                }
              }
              
              if(Gindex>-1)
              {
                elements[Gindex].click();
                resolve(elements[Gindex]);    
              }
              else{
                resolve(null);
              }
            let allPage = document.getElementsByClassName('pn');
            resolve(allPage[0]);
        })
      })
    }  
  
    ele = await getData();

  }

  await pageFlow.executeFlow(page,randomNo);
  // await page.waitFor(1500 * randomNo);
  
  // const lastPosition = await scrollPageToBottom(page);
  
  // await page.waitFor(3500 * randomNo);

  // webpageHelper.pageSrollToSelector(page,'.question-tab ul li:last-child a');

  // await page.waitFor(2500);
  // await page.evaluate(() => {
  //   let x = document.querySelectorAll('.question-tab ul li:last-child a');

  //   x[0].click();

  // });

  // await page.waitFor(3500* randomNo);
  // await scrollPageToBottom(page);

  // await page.waitFor(2000* randomNo);

  // await page.evaluate(() => {
  //       let elements = document.getElementsByTagName('article');
  //       console.log(elements);
  //       var item = elements[Math.floor(Math.random()*elements.length)];
  //       var aElement= item.getElementsByTagName("a")[0];

  //       aElement.click();

  //   });

  // await page.waitFor(3000 * randomNo);
  // await scrollPageToBottom(page);
  // await page.waitFor(1000 * randomNo);
  // await page.goto('http://onemboaran.com/afu.php?zoneid=3118682');
  // await page1.waitFor(2000 * randomNo);
  // //http://onemboaran.com/afu.php?zoneid=3118682
  browser.close();
};


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//run();


module.exports = google;