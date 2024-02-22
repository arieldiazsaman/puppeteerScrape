const fs = require('fs');
const { WebsiteAScraper, WebsiteBScraper } = require('./modules/scrapers');

const scrapeWebsiteA = async () => {
    const nisseiPage = new WebsiteAScraper();
    await nisseiPage.openBrowser();
    await nisseiPage.goToPage('https://nissei.com/py/bebidas/alimentos/chocolates/');
    const pageTitle = await nisseiPage.getCurrentPageTitle();
    const productNames = await nisseiPage.getProductNames();
    const productNamesAndPrices = await nisseiPage.getProductPrices();
    const scrapedData = {
        'Title of the current page': pageTitle,
        'List of product names on the page': productNames,
        'Price of each product': productNamesAndPrices,
    }
    await nisseiPage.closeBrowser();
    return scrapedData;
}

const scrapeWebsiteB = async () => {
    const stackoverflowPage = new WebsiteBScraper();
    await stackoverflowPage.openBrowser();
    await stackoverflowPage.goToPage('https://stackoverflow.com/questions/');
    const latestBlogAuthor = await stackoverflowPage.getLatestBlogAuthor();
    const latestBlogTitle = await stackoverflowPage.getLatestBlogTitle();
    const numberOfCommentsFromLatestBlog = await stackoverflowPage.getNumberOfCommentsFromLatestBlog();
    const scrapedData = {
        'Author of the latest blog post': latestBlogAuthor,
        'Title of the latest blog post': latestBlogTitle,
        'Number of comments on the post': numberOfCommentsFromLatestBlog,
    }
    await stackoverflowPage.closeBrowser();
    return scrapedData;
}

const main = async () => {
    try {
        const scrappedWebsiteA = await scrapeWebsiteA();
        const scrappedWebsiteB = await scrapeWebsiteB();
        const scrapedData = {
            scrappedWebsiteA,
            scrappedWebsiteB
        }
        fs.writeFileSync('scrapedData.json', JSON.stringify(scrapedData, null, 2));
        console.log('Scraped data saved in scrapedData.json');
    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

main();
