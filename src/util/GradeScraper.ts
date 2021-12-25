import { GradeInfo } from "../models/gradeInfo";

/**
 * High level class that parses the grades for a specific course section
 */
import axios from "axios"

export default class GradeScraper {
    /**
     * Returns the html document of the webpage at the url as a string
     * 
     * @param  {string} url  - url of the webpage
     * @returns Promise      - html document (string)
     */
    async getSiteHtml(url: string): Promise<any> {
        try {
            const result = await axios.get(url);
            return result.data;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 
     * Returns the average of the last 4 sessions that are of the same type as the given session, or returns null 
     * if data is not available for the course or it doesn't exist 
     * e.g. exception is thrown if we try to get the average for /W/CPSC/221/169
     * //TODO: Open for change
     * 
     *  - e.g. If the user specifies a Winter Session, then it will return the average of the previous 4 Winter sessions
     * 
     * NOTE: W session represents the Fall + Winter Term
     * 
     * @param  {string} term
     * @param  {string} subject
     * @param  {string} course  // course number
     * @param  {string} section
     */
    async getSectionAverage(term: string, subject: string, course: string, section: string, year: number): Promise<number> {
        // Lowkey can't get the average of the previous year since 2019W counts for both the Fall & Winter Term

        return 0;

        let url1 = "";              // The URL's for the 4 previous years
        let url2 = "";
        let url3 = "";
        let url4 = "";

        const currentYear: number = year;
        const previousYear1: number = currentYear - 2;    //Gotta start from 2nd year back rip 
        const previousYear2: number = currentYear - 3;
        const previousYear3: number = currentYear - 4;
        const previousYear4: number = currentYear - 5;

        const urlArray: Array<string> = [];
        url1 = `https://ubcgrades.com/api/grades/${previousYear1}${term}/${subject}/${course}/${section}`;
        url2 = `https://ubcgrades.com/api/grades/${previousYear2}${term}/${subject}/${course}/${section}`;
        url3 = `https://ubcgrades.com/api/grades/${previousYear3}${term}/${subject}/${course}/${section}`;
        url4 = `https://ubcgrades.com/api/grades/${previousYear4}${term}/${subject}/${course}/${section}`;

        urlArray.push(url1);
        urlArray.push(url2);
        urlArray.push(url3);
        urlArray.push(url4);

        const jsonArray: Array<GradeInfo> = [];

        for (let i = 0; i < urlArray.length; i++) {
            const jsonObject: GradeInfo = await this.getSiteHtml(urlArray[i]);
            if (Object.keys(jsonObject).length !== 0 && jsonObject.constructor === Object) {
                jsonArray.push(jsonObject);
            }
        }

        if (jsonArray.length === 0) {
            // no results
            return 0;
        }

        let counter = 0;
        for (let i = 0; i < jsonArray.length; i++) {
            if (Object.keys(jsonArray[i]).length === 0) counter++;
        }
        if (counter == 4) return null // if we cant get any average data from the course. 

        const averageArray: Array<number> = [];

        for (let i = 0; i < jsonArray.length; i++) {
            averageArray.push(jsonArray[i].stats.average);
        }

        let overallAverage = 0;

        averageArray.forEach((yearAverage) => {
            overallAverage += yearAverage;
        })

        overallAverage /= averageArray.length;

        return parseFloat(overallAverage.toFixed(2));
    }

    //TODO: Add DOC COMMENTS
    //Return the average % of students that pass the course in the past 4 terms (same term as the given term, W/S)
    async getSectionPassPercentage() { }


}

