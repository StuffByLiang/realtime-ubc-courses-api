import axios from "axios";
import { Mongoose, Model } from "mongoose";
import { BulkWriteOpResultObject } from "mongodb";
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

/**
 * Takes in a mongoose Model, and updates each document in the list filtering based on the given keys.
 * Creates the document if it doesn't exist.
 * 
 * @param  {Model<any>} Model
 * @param  {Array<any>} list
 * @param  {Array<string>} filterKeys
 * @returns Promise<BulkWriteOpResultObject>
 */
async function updateAll(Model: Model<any>, list: Array<any>, filterKeys: Array<string>): Promise<BulkWriteOpResultObject> {
  return await Model.bulkWrite(
    list.map(item => {
      if(!item) return null;
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

export {
  getSiteHtml,
  trim,
  updateAll
}