const WebsiteAScraper = require('./WebsiteAScraper');

(async () => {
    const nisseiPage = new WebsiteAScraper();
    await nisseiPage.openBrowser();
    await nisseiPage.goToPage('https://nissei.com/py/bebidas/alimentos/chocolates/');
    const pageTitle = await nisseiPage.getCurrentPageTitle();
    const productNames = await nisseiPage.getProductNames();
    const productNamesAndPrices = await nisseiPage.getProductPrices();
    console.log(`Title of the current page: ${ pageTitle }`);
    console.log(`List of product names on the page: ${ JSON.stringify(productNames) }`);
    console.log(`Price of each product: ${ JSON.stringify(productNamesAndPrices) }`);
    await nisseiPage.closeBrowser();
})();
