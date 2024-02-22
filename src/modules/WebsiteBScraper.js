const WebsiteCrawler = require('./WebsiteCrawler');

class WebsiteBScraper extends WebsiteCrawler {
    constructor() {
        super();
    }

    async getLatestBlogAuthor() {
        return await this.page.evaluate(() => {
            const posts = Array.from(
                document.querySelectorAll('.s-post-summary.js-post-summary')
            )
            if (posts?.length <= 0) throw new Error('There are no posts available');
            return posts[0].querySelector('.s-user-card--link.d-flex.gs4').innerText;
        })
    }

    async getLatestBlogTitle() {
        return await this.page.evaluate(() => {
            const posts = Array.from(
                document.querySelectorAll('.s-post-summary.js-post-summary')
            )
            if (posts?.length <= 0) throw new Error('There are no posts available');
            return posts[0].querySelector('.s-post-summary--content-title').innerText;
        })
    }

    async getNumberOfCommentsFromLatestBlog() {
        return await this.page.evaluate(() => {
            const posts = Array.from(
                document.querySelectorAll('.s-post-summary.js-post-summary')
            )
            if (posts?.length <= 0) throw new Error('There are no posts available');
            return posts[0].querySelector('.s-post-summary--stats-item').innerText;
        })
    }
}

module.exports = WebsiteBScraper;
