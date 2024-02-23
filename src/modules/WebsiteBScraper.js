const WebsiteCrawler = require('./WebsiteCrawler');

class WebsiteBScraper extends WebsiteCrawler {
    constructor() {
        super();
    }

    /**
     * @returns The Author from the latest blog
     */
    async getLatestBlogAuthor() {
        return await this.page.evaluate(() => {
            const posts = Array.from(
                document.querySelectorAll('.s-post-summary.js-post-summary')
            )
            if (posts?.length <= 0) throw new Error('There are no posts available');
            return posts[0].querySelector('.s-user-card--link.d-flex.gs4').innerText;
        })
    }

    /**
    * @returns The title from the latest blog
    */
    async getLatestBlogTitle() {
        return await this.page.evaluate(() => {
            const posts = Array.from(
                document.querySelectorAll('.s-post-summary.js-post-summary')
            )
            if (posts?.length <= 0) throw new Error('There are no posts available');
            return posts[0].querySelector('.s-post-summary--content-title').innerText;
        })
    }

    /**
    * @returns The number of comments from the latest blog
    */
    async getNumberOfCommentsFromLatestBlog() {
        return await this.page.evaluate(() => {
            const posts = Array.from(
                document.querySelectorAll('.s-post-summary.js-post-summary')
            )
            if (posts?.length <= 0) throw new Error('There are no posts available');
            return posts[0].querySelector('.s-post-summary--stats-item').innerText;
        })
    }

    /**
    * @returns A list with the latest blog title from each page
    */
    async getLatestBlogTitleFromPages(pages) {
        const hardLimit = 10;
        const latestBlogTitleFromPages = [];
        for ( let currentPageNumber = 1; currentPageNumber <= pages && currentPageNumber <= hardLimit; currentPageNumber++){
            const latestBlogTitle = await this.getLatestBlogTitle();
            latestBlogTitleFromPages.push({
                'page': currentPageNumber,
                'Blog Title': latestBlogTitle,
            })
            await this.gotoNextPage();
        }
        await this.goToPage(this.mainURL, 1);
        return latestBlogTitleFromPages;
    }

    async gotoNextPage() {
        await Promise.all([
            this.waitForLoad(),
            this.page.click('.s-pagination--item.js-pagination-item:last-of-type')
        ]);
    }
}

module.exports = WebsiteBScraper;
