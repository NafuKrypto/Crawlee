import { JSDOMCrawler, log } from "crawlee";
import fs from "fs/promises";
// Create an instance of the JSDOMCrawler class - crawler that automatically
// loads the URLs and parses their HTML using the jsdom library.
const crawler = new JSDOMCrawler({
	// Setting the `runScripts` option to `true` allows the crawler to execute client-side
	// JavaScript code on the page. This is required for some websites (such as the React application in this example), but may pose a security risk.
	runScripts: true,
	// This function will be called for each crawled URL.
	// Here we extract the window object from the options and use it to extract data from the page.
	requestHandler: async ({ window }) => {
		const { document } = window;
		const t = Array.from(document.querySelectorAll("a[href]")).map((a: any) => {
			return a.href;
		});
		await fs.appendFile("example.txt", t + "\n");

		// const result = document.querySelectorAll(".text-justify");
		// The result is passed to the console. Unlike with Playwright or Puppeteer crawlers,
		// this console call goes to the Node.js console, not the browser console. All the code here runs right in Node.js!
		console.log(t);
	},
});

// Run the crawler and wait for it to finish.
await crawler.run(["http://brotee.org/"]);

log.debug("Crawler finished.");
