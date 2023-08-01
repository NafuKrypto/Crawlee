import { BasicCrawler, Dataset, PuppeteerCrawler } from "crawlee";
import fs from "fs";
import { saveData } from "./savingData";
const crawler = new PuppeteerCrawler({
	async requestHandler({ page }) {
		const selectors = [
			".text-justify",
			".mb-[6px].text-justify",
			".text-xl",
			".text-base",
			".bg-white",
			"px-4 lg:px-6 sm:basis-7/12 xl:basis-auto",
			".flex.flex-col.lg:flex-col.px-2.lg:pr-[50px].lg:basis-8/12.xl:basis-9/12.text-center.lg:text-left.lg:justify-start.justify-center.items-center.lg:items-start",
		];

		// await page.waitForSelector(".text-justify");
		selectors?.forEach((selector) => {
			const elements = document.querySelectorAll(selector);
		});
		await page.waitForFunction(() => {
			const elements = document.querySelectorAll(".text-justify");

			return elements.length > 0;
		});

		// const actorText = await page.$eval(".text-justify", (el) => {
		// 	console.log(el);
		// 	return el.textContent;
		// });
		const actorText = await page.$$eval(".text-justify", (elements) => {
			return Array.from(elements).map((element) => element.textContent);
		});
		const c = actorText?.toString() || "";
		fs.appendFile("example.txt", c, (err) => {
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
	},
});

// const crawler = new BasicCrawler({
// 	async requestHandler({ sendRequest, log }) {
// 		const res: any = await sendRequest();
// 		log.info("received body", res.body);
// 	},
// });
await crawler.run(["http://brotee.org"]);
