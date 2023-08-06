import { EnqueueStrategy, PuppeteerCrawler } from "crawlee";
import fs from "fs/promises";

const crawler = new PuppeteerCrawler({
	async requestHandler({ request, enqueueLinks, log, page, window }) {
		// Add all links from page to RequestQueue
		const links: any = [];
		await page.waitForFunction(() => {
			// selectors?.forEach((selector) => {
			// 	elements = document.querySelectorAll(selector);
			// });
			const elements = document.querySelectorAll(".text-justify");

			return elements.length > 0;
		});
		const title = await page.title();
		// const h2 = await page.h2();
		log.info(`Title of ${request.url}: ${title}`);
		log.info(request.url);
		if (!links.includes(request?.url)) {
			links.push(request?.url);
			const c = request?.url.toString();
			await fs.appendFile("write.txt", `Title of ${request.url}: ${title}\n`);
			await enqueueLinks({ globs: ["http?(s)://brotee.org/**"] });
		}
	},
	// maxRequestsPerCrawl: 10, // Limitation for only 10 requests (do not use if you want to crawl all links)
});

// Run the crawler with initial request
await crawler.run([
	"http://brotee.org",
	"http://brotee.org/about/iub-at-a-glance",
]);
