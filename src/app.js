const fs = require('fs');
const { WebsiteAScraper, WebsiteBScraper, WebsiteCScraper } = require('./modules/scrapers');

require('dotenv').config()

const attempts = process.env.RETRY_CONNECTION_ATTEMPTS

/**
 * Scrapes chocolate options from a local online store
 */
const scrapeWebsiteA = async () => {
    const nisseiPage = new WebsiteAScraper();
    await nisseiPage.openBrowser();
    await nisseiPage.goToPage('https://nissei.com/py/bebidas/alimentos/chocolates/', attempts);
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

/**
 * Scrapes the stackoverflow's questions page
 */
const scrapeWebsiteB = async () => {
    const stackoverflowPage = new WebsiteBScraper();
    await stackoverflowPage.openBrowser();
    await stackoverflowPage.goToPage('https://stackoverflow.com/questions/', attempts);
    const latestBlogAuthor = await stackoverflowPage.getLatestBlogAuthor();
    const latestBlogTitle = await stackoverflowPage.getLatestBlogTitle();
    const numberOfCommentsFromLatestBlog = await stackoverflowPage.getNumberOfCommentsFromLatestBlog();
    let scrapedData = {
        'Author of the latest blog post': latestBlogAuthor,
        'Title of the latest blog post': latestBlogTitle,
        'Number of comments on the post': numberOfCommentsFromLatestBlog,
    }
    if (process.env.STACK_OVERFLOW_NEXT_PAGES) {
        const latestBlogTitleFromPages = await stackoverflowPage.getLatestBlogTitleFromPages(process.env.STACK_OVERFLOW_NEXT_PAGES);
        scrapedData.latestBlogTitleFromPages = latestBlogTitleFromPages;
    }
    await stackoverflowPage.closeBrowser();
    return scrapedData;
}

/**
 * A demonstration of a login procedure
 */
const scrapeWebsiteC = async () => {
    const mockLoginPage = new WebsiteCScraper();
    await mockLoginPage.openBrowser();
    await mockLoginPage.goToPage('https://www.stealmylogin.com/demo.html', attempts);
    await mockLoginPage.login();
    await mockLoginPage.closeBrowser();
}

const main = async () => {
    try {
        await scrapeWebsiteC();
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
