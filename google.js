const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down')
let webpageHelper= require('./helper/webPage.helper')
let pageFlow= require('./helper/pageFlow.helper');

const google = async () => {
  const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox'    ]
  });

  let keyWords=['consult doctor online free','ask free doctor online consult','consult doctor online for free','free online doctor consult','ask a doctor online free','ask a doctor free online','free doc consultation'];
  var randomNo=getRandomArbitrary(3,7);
  let page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

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

  browser.close();
};


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//run();


module.exports = google;