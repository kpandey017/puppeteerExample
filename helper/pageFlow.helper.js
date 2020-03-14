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
     
        let allEle =[];
        await page1.evaluate(async () => {
        allEle =document.querySelectorAll('iFrame');
        });
        if(allEle.length>0){
            let clickX=0;
            let clickY=0;
            let elem=allEle[0];
            const rect = await page1.evaluate(el => {
                const { top, left, width, height } = el.getBoundingClientRect();
                return { top, left, width, height };
            }, elem);

            clickX = rect.width / 2;
            clickY = rect.height / 2;

            clickX=clickX+rect.left;
            clickY=clickY+rect.top;
            await page1.mouse.click(rect.left + _x, rect.top + _y);

        }
            
    }


    await page1.waitFor(3000 * randomNo);
    await page1.goto('http://onemboaran.com/afu.php?zoneid=3118682');
    await page1.waitFor(2000 * randomNo);
}



