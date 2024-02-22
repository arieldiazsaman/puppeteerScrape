const WebsiteCrawler = require('./WebsiteCrawler');

class WebsiteBScraper extends WebsiteCrawler {
    constructor() {
        super();
    }

    async getLatestBlogAuthor() {
        return await this.page.evaluate(() => {
            
        })
    }
}

module.exports = WebsiteBScraper;
