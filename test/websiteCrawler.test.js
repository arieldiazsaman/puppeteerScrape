const sinon = require('sinon');
const assert = require('assert').strict;
const puppeteer = require('puppeteer');
const WebsiteCrawler = require('../src/modules/WebsiteCrawler'); 

/**
 * It should open and close the browser
 */
const testOpenCloseBrowser = async () => {
    const crawler = new WebsiteCrawler();
    const browserStub = {
        newPage: sinon.stub().resolves(),
        close: sinon.stub().resolves()
    };
    const launchStub = sinon.stub(puppeteer, 'launch').resolves(browserStub);
  
    try {
      await crawler.openBrowser();
      assert.ok(launchStub.calledOnce, 'puppeteer.launch should be called once');
      assert.strictEqual(crawler.browser, browserStub, 'crawler.browser should be set to the browser instance');
  
      await crawler.closeBrowser();
      assert.ok(browserStub.close.calledOnce, 'browserStub.close should be called once');
      console.log('testOpenCloseBrowser passed.');
    } catch (error) {
      console.error('testOpenCloseBrowser failed:', error);
    } finally {
      sinon.restore();
    }
  }

/**
 * It should call goto from the page
 */
const testGoToPage = async () => {
    const crawler = new WebsiteCrawler();
    const pageStub = {
        goto: sinon.stub().resolves(),
        waitForNavigation: sinon.stub().resolves()
    };
    const browserStub = {
        newPage: sinon.stub().resolves(pageStub),
        close: sinon.stub().resolves()
    };
    sinon.stub(puppeteer, 'launch').resolves(browserStub);

    try {
        await crawler.openBrowser();
        await crawler.goToPage('www.google.com', 1)
        assert.ok(pageStub.goto.calledOnce, 'crawler.page.goto should be called once');
        assert.ok(pageStub.waitForNavigation.calledOnce, 'crawler.page.goto should be called once');

        await crawler.closeBrowser();
        console.log('testGoToPage passed.');
    } catch (error) {
        console.error('testGoToPage failed:', error);
      } finally {
        sinon.restore();
      }
  }

/**
 * It should throw an error sicne the browser was not initialized
 */
const testGoToPagefails = async () => {
    const crawler = new WebsiteCrawler();

    try {
        await crawler.goToPage('www.google.com', 1)

        console.error('testGoToPagefails failed.');
    } catch (error) {
        if (error.message === 'The browser was not initialized.') {
            console.log('testGoToPagefails passed.');
        } else {
            console.error('testGoToPagefails failed.');
        }
      } finally {
        sinon.restore();
      }
  }

  (async () => {
    await testOpenCloseBrowser();
    await testGoToPage();
    await testGoToPagefails();
  })();
