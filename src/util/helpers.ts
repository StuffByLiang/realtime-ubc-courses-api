import axios from "axios";
/**
   * sends a request to the url and gets the entire html as a string
   * 
   * @param  {string} url - link to the webpage
   * @returns string      - webpage html document as string
   * 
   * @example
   * getSiteContent("https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101")
   */
async function getSiteHtml(url: string): Promise<string> {
  try {
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error)
  }
}
/**
 * Returns a trimmed string with no leading or trailing whitespace, or null if string isn't trimmable
 * 
 * @param  {string} string - string to trim
 * @returns string
 */
function trim(string: string): string {
  if(string === null || string === undefined) return null;
  return string.trim();
}

export {
  getSiteHtml,
  trim
}