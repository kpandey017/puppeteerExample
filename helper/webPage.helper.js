exports.pageSrollToSelector= async function scrollDown(page,selector) {
    await page.$eval(selector, e => {
      e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
    });
  }