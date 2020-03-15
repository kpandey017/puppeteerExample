let webpageHelper= require('./webPage.helper');
const scrollPageToBottom = require('puppeteer-autoscroll-down')

exports.executeFlow= async function scrollDown(page1,randomNo) {
    await page1.waitFor(3000 * randomNo);
  
    const lastPosition = await scrollPageToBottom(page1);

    await page1.waitFor(3500 * randomNo);

    webpageHelper.pageSrollToSelector(page1,'.question-tab ul li:last-child a');

    await page1.waitFor(2500);
    await page1.evaluate(() => {
    let x = document.querySelectorAll('.question-tab ul li:last-child a');

    x[0].click();

    });

    await page1.waitFor(3000* randomNo);
    await scrollPageToBottom(page1);

    await page1.waitFor(2000* randomNo);

    await page1.evaluate(() => {
        let elements = document.getElementsByTagName('article');
        console.log(elements);
        var item = elements[Math.floor(Math.random()*elements.length)];
        var aElement= item.getElementsByTagName("a")[0];

        aElement.click();

    });

    await page1.waitFor(3500 * randomNo);
    
    await scrollPageToBottom(page1);

    //adClick   
    if(randomNo>=4 && randomNo<5){
        await page1.waitFor(4000);     
        let cords = await page1.evaluate(() => {
               let allAdElements = document.querySelectorAll('.advertising.advertising-footer iframe');
              if(allAdElements.length>0){
                  let selectedAd=allAdElements[0];
                  let {height,width,left,right,top,x,y}=selectedAd.getBoundingClientRect();
                  return {height, width, left, right, top, x, y};
              }
              else{
                  return null;
              }
      
        });
        if(cords){
            let calX=cords.x+ Math.round(cords.width/2)
            let calY=cords.y+ Math.round(cords.height/2)
          
              await page1.mouse.click( calX, calY );      
        }

    }


    await page1.waitFor(3000 * randomNo);
    await page1.goto('http://onemboaran.com/afu.php?zoneid=3118682');
    await page1.waitFor(2000 * randomNo);
    await page1.goto('https://www.passtechusa.com/hz36846v2?key=1f1bd0c663f21da0d182aa9e2a9b2bf5');
    await page1.waitFor(2000 * randomNo);
}



