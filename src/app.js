const WebsiteAScraper = require('./WebsiteAScraper');
const WebsiteBScraper = require('./WebsiteBScraper');

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
    
    const stackoverflowPage = new WebsiteBScraper();
    await stackoverflowPage.openBrowser();
    await stackoverflowPage.goToPage('https://stackoverflow.com/questions/');
    const latestBlogAuthor = await stackoverflowPage.getLatestBlogAuthor();
    const latestBlogTitle = await stackoverflowPage.getLatestBlogTitle();
    const numberOfCommentsFromLatestBlog = await stackoverflowPage.getNumberOfCommentsFromLatestBlog();
    console.log(`Author of the latest blog post: ${ latestBlogAuthor }`);
    console.log(`Title of the latest blog post: ${ latestBlogTitle }`);
    console.log(`Number of comments on the post: ${ numberOfCommentsFromLatestBlog }`);
    await stackoverflowPage.closeBrowser();
})();
