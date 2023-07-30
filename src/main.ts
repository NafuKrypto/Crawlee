import { BasicCrawler, PuppeteerCrawler } from "crawlee";

var huntsman = require("huntsman");
var spider = huntsman.spider();
// const crawler = new PuppeteerCrawler({
// 	async requestHandler({ page, request, enqueueLinks }) {
// 		// Puppeteer does not have the automatic waiting functionality
// 		// of Playwright, so we have to explicitly wait for the element.
// 		await page.waitForSelector(".text-justify");
// 		// Puppeteer does not have helper methods like locator.textContent,
// 		// so we have to manually extract the value using in-page JavaScript.
// 		const actorText = await page.$eval(".text-justify", (el) => {
// 			return el.textContent;
// 		});

// 		console.log(`ACTOR: ${actorText}`);
// 		// console.log(`LINKS: ${request.url}`);
// 		// await enqueueLinks();
// 	},
// });
// const crawler = new BasicCrawler({
// 	async requestHandler({ sendRequest, log }) {
// 		const res: any = await sendRequest();
// 		log.info("received body", res.body);
// 	},
// });
// await crawler.run(["http://brotee.org"]);

spider.extensions = [
	huntsman.extension("recurse"), // load recurse extension & follow anchor links
	huntsman.extension("cheerio"), // load cheerio extension
];

// follow pages which match this uri regex
spider.on(
	/http:\/\/en\.wikipedia\.org\/wiki\/\w+:\w+$/,
	function (err: any, res: any) {
		// use jquery-style selectors & functions
		var $ = res.extension.cheerio;
		if (!$) return; // content is not html

		// extract information from page body
		var wikipedia = {
			uri: res.uri,
			heading: $("h1.firstHeading").text().trim(),
			body: $("div#mw-content-text p").text().trim(),
		};

		console.log(wikipedia);
	}
);

spider.queue.add("http://en.wikipedia.org/wiki/Huntsman_spider");
spider.start();
