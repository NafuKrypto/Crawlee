import { BasicCrawler, Dataset, PuppeteerCrawler } from "crawlee";
import fs from "fs";
import { saveData } from "./savingData";
const crawler = new PuppeteerCrawler({
	async requestHandler({ page }) {
		// Puppeteer does not have the automatic waiting functionality
		// of Playwright, so we have to explicitly wait for the element.

		await page.waitForSelector(".xl:mt-12 mt-6");
		// Puppeteer does not have helper methods like locator.textContent,
		// so we have to manually extract the value using in-page JavaScript.
		const actorText = await page.$eval(".xl:mt-12.mt-6", (el) => {
			return el.textContent;
		});
		const c = actorText?.toString() || "";
		fs.writeFile("example.txt", c, (err) => {
			if (err) {
				console.error("Error writing to file:", err);
			} else {
				console.log("Content written to the file successfully.");
			}
		});
		await Dataset.pushData({ c });
		console.log(`ACTOR: ${actorText}`);
		const t = Array.from(document.querySelectorAll("div[.class]")).map(
			(div: any) => div.class
		);
		console.log(t);
		console.log(page);

		// console.log(`LINKS: ${request.url}`);
		// await enqueueLinks();
	},
});
// const crawler = new BasicCrawler({
// 	async requestHandler({ sendRequest, log }) {
// 		const res: any = await sendRequest();
// 		log.info("received body", res.body);
// 	},
// });
await crawler.run(["http://brotee.org"]);
async function main() {
	// Call the saveData function
	// await saveData();
	// Other code in your main function, if needed
}

// Call the main function
main().catch((error) => {
	console.error("Error occurred:", error);
});
