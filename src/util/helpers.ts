import axios from "axios";
import * as mongoose from "mongoose";
import { BulkWriteResult } from "mongodb";
import cheerio from "cheerio"
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
    const res = await axios.get(url);
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
  if (string === null || string === undefined) return null;
  return string.trim();
}

/**
 * Takes in a mongoose Model, and updates each document in the list filtering based on the given keys.
 * Creates the document if it doesn't exist.
 * 
 * @param  {mongoose.Model<any>} Model
 * @param  {Array<any>} list
 * @param  {Array<string>} filterKeys
 * @returns Promise<BulkWriteOpResultObject>
 */
async function updateAll(Model: mongoose.Model<any>, list: Array<any>, filterKeys: Array<string>): Promise<BulkWriteResult> {
  return await Model.bulkWrite(
    list.map(item => {
      if (!item) return null;
      return {
        updateOne: {
          filter: filterKeys.reduce((filter, key) => {
            filter[key] = item[key];
            return filter;
          }, {}),
          update: {
            ...item,
            lastUpdated: Date.now()
          },
          upsert: true
        }
      }
    }).filter(x => x), {
    ordered: false, // runs in parallel
  }
  );
}

/**
   * Returns element of array that contains a name equal to the given name. else return null. used to help for testing
   * 
   * @param  {string} key
   * @param  {string} nameKey
   * @param  {Array<any>} myArray
   */
function search(key: string, nameKey: string, myArray: Array<any>) {
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i][key] === nameKey) {
      return myArray[i];
    }
  }
  return null;
}

async function getCurrentSession(): Promise<string> {
  const html = await getSiteHtml("https://courses.students.ubc.ca/")
  const $ = cheerio.load(html);
  return $("button:contains(Session: )").text().split(" ")[1] + $("button:contains(Session: )").text().split(" ")[2][0]
}

export {
  getSiteHtml,
  trim,
  updateAll,
  search,
  getCurrentSession,
}
