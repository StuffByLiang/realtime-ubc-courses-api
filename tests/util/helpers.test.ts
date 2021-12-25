import { getSiteHtml } from "src/util/helpers";

describe("test helpers.ts", () => {
  it("getSiteHtml on google should return valid html", async () => {
    const html = await getSiteHtml("https://google.com");
    expect(html).toMatch(/[Gg]oogle/); // testing to see if html contains Google using regex
  })
})