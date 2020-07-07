import SectionInfo from "../models/sectionInfo";
import Section from "../models/section";
import Course from "../models/course";
import CourseScraper from "./CourseScraper";
import GradeInfo from "../models/gradeInfo";

/**
 * High level class that parses the grades for a specific course section
 */
const axios = require('axios').default;

export default class GradeScraper {
    courseScraper: CourseScraper;

    constructor() {
        this.courseScraper = new CourseScraper();
    }
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
     * Returns the average of the last 4 sessions that are of the same type as the given session
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
    async getSectionAverage(term: string, subject: string, course: number, section: string, year: number): Promise<number> {

        // Lowkey can't get the average of the previous year since 2019W counts for both the Fall & Winter Term

        let url1: string = "";              // The URL's for the 4 previous years
        let url2: string = "";
        let url3: string = "";
        let url4: string = "";

        const currentYear: number = year;
        const previousYear1: number = currentYear - 2;    //Gotta start from 2nd year back rip 
        const previousYear2: number = currentYear - 3;
        const previousYear3: number = currentYear - 4;
        const previousYear4: number = currentYear - 5;

        let urlArray: Array<string> = [];
        url1 = `https://ubcgrades.com/api/grades/${previousYear1}${term}/${subject}/${course}/${section}`;
        url2 = `https://ubcgrades.com/api/grades/${previousYear2}${term}/${subject}/${course}/${section}`;
        url3 = `https://ubcgrades.com/api/grades/${previousYear3}${term}/${subject}/${course}/${section}`;
        url4 = `https://ubcgrades.com/api/grades/${previousYear4}${term}/${subject}/${course}/${section}`;
        
        urlArray.push(url1);
        urlArray.push(url2);
        urlArray.push(url3);
        urlArray.push(url4);

        let jsonArray: Array<any> = [];

        for (let i = 0; i < urlArray.length; i++) {
            const jsonObject: any =  await this.getSiteHtml(urlArray[i]);
            if (jsonObject !== {}) {
                jsonArray.push(jsonObject);
            }
        }

        let averageArray: Array<number> = [];
        
        for (let i = 0; i < jsonArray.length; i++) {
            averageArray.push(jsonArray[i].stats.average);
        }

        let overallAverage: number = 0;

        averageArray.forEach((yearAverage) => {
            overallAverage += yearAverage;
        })

        overallAverage /= averageArray.length;
        return parseFloat(overallAverage.toFixed(2));

    }

    //TODO: Add DOC COMMENTS
    //Return the average % of students that pass the course in the past 4 terms (same term as the given term, W/S)
    async getSectionPassPercentage() {}

    
}

 