const WebsiteCrawler = require('./WebsiteCrawler');

class WebsiteCScraper extends WebsiteCrawler {
    constructor() {
        super();
    }

    async login() {
        await this.page.screenshot({ path: '1beforeloggingin.png' });
        await Promise.all([
            this.page.type('input[name="username"]', 'user'),
            this.page.type('input[name="password"]', 'pass')
        ])
        await Promise.all([
            this.waitForLoad(),
            this.page.click('input[type="submit"]')
        ])
        await this.page.screenshot({ path: '2afterloggingin.png' });
    }
}

module.exports = WebsiteCScraper;
