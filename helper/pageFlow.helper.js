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

    await page1.waitFor(1000 * randomNo);
    await page1.goto('http://onemboaran.com/afu.php?zoneid=3118682');
    await page1.waitFor(2000 * randomNo);
}
