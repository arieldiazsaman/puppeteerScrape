const WebsiteCrawler = require('./WebsiteCrawler');

class WebsiteAScraper extends WebsiteCrawler {
    constructor() {
        super();
    }

    async getCurrentPageTitle() {
        return this.page.title();
    }

    async getProductNames() {
        return await this.page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('.product-item-info')
            ).map(
                (product) => product.querySelector('.product.name.product-item-name').innerText
            )
        })
    }

    async getProductPrices() {
        const productNames = await this.getProductNames();
        return await this.page.evaluate((productNames) => {
            return Array.from(
                document.querySelectorAll('.product-item-info')
            ).map((product, index) => ({
                product: productNames[index],
                price: product.querySelector('.price').innerText,
            }))
        }, productNames)
    }
}

module.exports = WebsiteAScraper;
