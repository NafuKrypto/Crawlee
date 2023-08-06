import { EnqueueStrategy, PuppeteerCrawler } from "crawlee";
import fs from "fs/promises";
import fss from "fs";

const crawler = new PuppeteerCrawler({
	async requestHandler({ request, page, enqueueLinks }) {
		// Add all links from page to RequestQueue
		// request, enqueueLinks, log, page
		const links: any = [];
		let jsonData = {};

		const filePath = "/home/kim/Code/Crawlee/my-crawler/src/read.txt";
		let linesList: any = [];
		fss.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				console.error("Error reading the file:", err);
			} else {
				linesList = data.split("\n");
			}
		});
		// await page.goto("https://brotee.org");
		await page.waitForFunction(() => {
			// selectors?.forEach((selector) => {
			// 	elements = document.querySelectorAll(selector);
			// });
			const elements = document.querySelectorAll(".text-justify");

			return elements.length > 0;
		});
		const title = await page.title();
		// const h2 = await page.h2();
		// log.info(`Title of ${request.url}: ${title}`);
		// log.info(request.url);
		// const x = c?.some((item: any) => item.url.includes("http://brotee.org"));
		if (!linesList.includes(request?.url)) {
			// links.push(request?.url);
			const c = request?.url?.toString();
			const pageContent = await page.$$eval("h2", (elements) =>
				elements.map((el) => el.textContent)
			);
			await fs.appendFile("read.txt", `${c}\n`);
			await fs.appendFile(
				"write.txt",
				`Title of ${request.url}: ${pageContent}\n`
			);
			await enqueueLinks({ globs: ["http?(s)://brotee.org/**"] });
		}
	},
	// maxRequestsPerCrawl: 50, // Limitation for only 10 requests (do not use if you want to crawl all links)
});

// Run the crawler with initial request
await crawler.run(["http://brotee.org"]);

// "http://brotee.org/about/iub-at-a-glance",
