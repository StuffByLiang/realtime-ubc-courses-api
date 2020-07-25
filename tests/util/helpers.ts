import { getSiteHtml } from "src/util/helpers";

describe("", () => {
  describe("getSiteHtml on google should return valid html", async () => {
    let html = await getSiteHtml("https://google.com");
    expect(html).toMatch(/[Gg]oogle/); // testing to see if html contains Google using regex
  })
})