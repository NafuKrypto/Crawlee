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
		for (const selector of selectors) {
			await page.waitForFunction(() => {
				// selectors?.forEach((selector) => {
				// 	elements = document.querySelectorAll(selector);
				// });
				const elements = document.querySelectorAll(selector);

				return elements.length > 0;
			});

			// const myPromise = Promise.resolve(res);
			const actorText = await textContent(page, selector);
			// const myPromise2 = Promise.resolve(actorText);
			const c = actorText?.toString() || "";
			fs.appendFile("example.txt", c, (err) => {
				if (err) {
					console.error("Error writing to file:", err);
				} else {
					console.log("Content written to the file successfully.");
				}
			});
			// await Dataset.pushData({ c });
			console.log(`ACTOR: ${actorText}`);
		}

		// await page.waitForSelector(".text-justify");

		// let actorText: any;
		// selectors?.forEach(async (selector) => {
		// 	actorText = await page.$$eval(selector, (elements) => {
		// 		return Array.from(elements).map((element) => element.textContent);
		// 	});
		// });

		// const t = Array.from(document.querySelectorAll("div[.class]")).map(
		// 	(div: any) => div.class
		// );
	},
});

// const crawler = new BasicCrawler({
// 	async requestHandler({ sendRequest, log }) {
// 		const res: any = await sendRequest();
// 		log.info("received body", res.body);
// 	},
// });
const textExtract = async (page: any, selector: any) => {
	let elements;

	return elements;
};

const textContent = async (page: any, selector: any) => {
	const actorText = await page.$$eval(selector, (elements: any) => {
		console.log(elements);
		return Array.from(elements).map((element: any) => element.textContent);
	});
	return actorText;
};
await crawler.run(["http://brotee.org"]);
