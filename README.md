### Ariel Diaz Samaniego NodeJS scrape application challenge
This is a scrape application challenge implementing Puppeteer package.
Includes a base class for generic web crawling functionalities, scraper classes for specific websites, a demonstration of a login procedure, script example responses and tests.

### Setup
```
git clone https://github.com/arieldiazsaman/puppeteerScrape.git
```
```
cd puppeteerScrape/
```
```
npm install
```

### Configuration
You can change some env variables to alter the script result:

`STACK_OVERFLOW_NEXT_PAGES`: Number of times the Stackoverflow scrap is going to try to go to the next page.

`RETRY_CONNECTION_ATTEMPTS`: Number of retry after a failed goto to a webpage.
The error attempt messages will be displayed in the console.

### Run code and tests
To run main
```
npm start
```

To run tests
```
npm test
```

To test the attempts error messages you can disconnect the computer from the internet, run npm start and then connect it back while it is running.

### Project Structure
`src` folder: Contains the main file and the scraper modules.

`WebsiteCrawler.js`: The base class providing common functionalities for web scraping, such as opening a browser session, navigating to URLs, and closing the browser.

`WebsiteAScraper.js` & `WebsiteBScraper.js`: Derived classes that extend `WebsiteCrawler` to perform specific scraping tasks on specific web pages. They include methods for extracting unique data from each website.

`WebsiteCScraper.js`: A demostration in how to automate the login process for a demo website.

`exampleResponses` folder: Contains example responses obtained during the project development.

`test` folder: Contains the test files.
