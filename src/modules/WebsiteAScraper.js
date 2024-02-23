const WebsiteCrawler = require('./WebsiteCrawler');

class WebsiteAScraper extends WebsiteCrawler {
    constructor() {
        super();
    }

    /**
     * @returns The title from the current page
     */
    async getCurrentPageTitle() {
        return this.page.title();
    }

    /**
     * @returns A list with the names of the products
     */
    async getProductNames() {
        return await this.page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('.product-item-info')
            ).map(
                (product) => product.querySelector('.product.name.product-item-name').innerText
            )
        })
    }

    /**
     * @returns A list with the prices for each product
     */
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
