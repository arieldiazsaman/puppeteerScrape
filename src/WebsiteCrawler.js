const puppeteer = require('puppeteer');

class WebsiteCrawler {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async openBrowser() {
        this.browser = await puppeteer.launch(/*{ headless: false }*/);
        this.page = await this.browser.newPage();
    }

    async goToPage(url) {
        if (!this.browser) {
            throw new Error('The browser was not initialized.');
        }
        await this.page.goto(url, { waitUntil: 'networkidle2' });
    }

    async waitForLoad() {
        if(!this.page) {
            throw new Error('The page was not initialized');
        }
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    }

    async closeBrowser() {
        if (this.browser){
            await this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}

module.exports = WebsiteCrawler;