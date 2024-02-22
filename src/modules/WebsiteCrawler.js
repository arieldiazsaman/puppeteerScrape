const puppeteer = require('puppeteer');

class WebsiteCrawler {
    constructor() {
        this.browser = null;
        this.page = null;
        this.mainURL = null;
    }

    async openBrowser() {
        this.browser = await puppeteer.launch(/*{ headless: false }*/);
        this.page = await this.browser.newPage();
    }

    async goToPage(url, attempts = 1) {
        if (!this.browser) throw new Error('The browser was not initialized.');
        this.mainURL = url;
        await this.retryConnection(attempts)
    }

    async waitForLoad() {
        if(!this.page) throw new Error('The page was not initialized');
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }

    async retryConnection(attempts) {
        try {
            return await Promise.all([
                this.waitForLoad(),
                this.page.goto(this.mainURL)
            ]);
        } catch (error) {
            if (attempts - 1 <= 0) throw error;
            console.error(`Failed page connection. ${attempts - 1} attempts left`, error);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return await this.retryConnection(attempts - 1);
        }
    }
}

module.exports = WebsiteCrawler;
