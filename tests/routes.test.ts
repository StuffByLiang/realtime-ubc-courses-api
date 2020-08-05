import {app, server} from "../index";
import request from "supertest";
import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

import {Course} from "../src/models/course";
import {Section} from "../src/models/section";
import {SectionInfo} from "../src/models/sectionInfo";
import {Subject} from "../src/models/subject";


jest.setTimeout(10000);

describe("routes.test.ts", () => {

  let db;

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();

      const mongooseOpts = {
          useNewUrlParser: true,
          useUnifiedTopology: true
      };

      db = await mongoose.connect(uri, mongooseOpts);
  });

  /**
   * Returns element of array that contains a name equal to the given name. else return null. used to help for testing
   * 
   * @param  {string} nameKey
   * @param  {Array<any>} myArray
   */
  function search(nameKey: string, myArray: Array<any>) {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
    return null;
  }

  describe("GET / - a simple api endpoint", () => {
    it("Hello API Request", async () => {
      const result = await request(app).get("/");
      expect(result.text).toEqual("An alligator approaches!");
      expect(result.status).toEqual(200);
    });
  });

  // testing json data
  describe("GET /json - a simple json endpoint", () => {
    let expectedJson = {
      "string": "a",
      "number": 1
    };
    
    it("json data", async () => {
      const result = await request(app).get("/json");
      expect(result.status).toEqual(200);
      expect(result.body).toEqual(expectedJson);
    });
  });

  // test course.t - Get ALL Courses
  describe("GET /course/:subject", () => {
    it("success", async () => {
      const result = await request(app).get("/course/CPSC?realtime=1");

      const cpsc221 : Course = {
        name: "CPSC 221",
        subject: "CPSC",
        course: "221",
        title: "Basic Algorithms and Data Structures",
        description: "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency.",
        credits: 4,
        comments: ["Choose one section from all 2 activity types. (e.g. Lecture and Laboratory)"],
        endpoint: "/section/CPSC/221",
        link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=221"
      };

      const data = search("CPSC 221", result.body.courses);
      expect(result.status).toEqual(200);
      expect(data).toMatchObject(cpsc221);

      expect(result.body.courses.length).toBeGreaterThan(0);
    });
    
    it("fail invalid subject ", async () => {
      const result = await request(app).get("/course/LMAO");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Subject Not Found"
      });
    });
  });

  // test section-info.ts - Get info for a specific course section
  describe("GET /sectionInfo/:subject/:number/:section", () => {
    it("success", async () => {
      const result = await request(app).get("/sectionInfo/CPSC/100/101?realtime=1");
      
      const exSectionInfo: SectionInfo = {
        status: expect.any(String),
        activity: "Web-Oriented Course",
        name: "CPSC 100 101 (Web-Oriented Course)",
        subject: "CPSC",
        course: "100",
        section: "101",
        textbooks: expect.any(Array),
        // pre_reqs: expect.any(Array),
        prof: "WONG, JESSICA",
        term: "1",
        year: "2020",
        schedule: [
          {
            day: "Tue",
            term: "1",
            start_time: "15:30",
            end_time: "17:00",
            building: "",
            room: "",
          },
          {
            day: "Thu",
            term: "1",
            start_time: "15:30",
            end_time: "17:00",
            building: "",
            room: "",
          },
        ],
        total_seats_remaining: expect.any(Number),
        currently_registered: expect.any(Number),
        general_seats_remaining: expect.any(Number),
        restricted_seats_remaining: expect.any(Number),
        seats_reserved_for: expect.any(Array),
        credits: "3",
        course_avg: expect.any(Number),
        // prof_rating: expect.anything(),
        link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
      }
      
      expect(result.status).toEqual(200);

      expect(result.body).toMatchObject(exSectionInfo);
    });
    
    

    it("fail invalid subject ", async () => {
      const result = await request(app).get("/sectionInfo/LMAOSHIT/221/420?realtime=1");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Section Not Found"
      });
    });
    
    it("fail invalid course number", async () => { 
      const result = await request(app).get("/sectionInfo/CPSC/69/420?realtime=1");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Section Not Found"
      });
    });

    it("fail invalid section", async () => {  
      const result = await request(app).get("/sectionInfo/CPSC/221/69?realtime=1");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Section Not Found"
      });
    });
  });

  // test section-info.ts - Get all sections' info for a course
  describe("GET /sectionInfo/:subject/:number", () => {
    it("success", async () => {
      const result = await request(app).get("/sectionInfo/CPSC/100?realtime=1");
      expect(result.status).toEqual(200);
      
      const section: SectionInfo = {
        status: expect.any(String),
        activity: "Web-Oriented Course",
        name: "CPSC 100 101 (Web-Oriented Course)",
        subject: "CPSC",
        course: "100",
        section: "101",
        textbooks: [],
        // pre_reqs: [],
        prof: "WONG, JESSICA",
        term: "1",
        year: "2020",
        schedule: [
          {
            day: "Tue",
            term: "1",
            start_time: "15:30",
            end_time: "17:00",
            building: "",
            room: "",
          },
          {
            day: "Thu",
            term: "1",
            start_time: "15:30",
            end_time: "17:00",
            building: "",
            room: "",
          },
        ],
        total_seats_remaining: expect.any(Number),
        currently_registered: expect.any(Number),
        general_seats_remaining: expect.any(Number),
        restricted_seats_remaining: expect.any(Number),
        seats_reserved_for: ["in one of these programs: BSC\nin year: <=2"],
        credits: "3",
        prof_rating: null, // TODO:
        // prof_rating: expect.anything(),
        link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
      }
      const section2: SectionInfo = {
        status: expect.any(String),
        activity: "lol",
        name: "CPSC 69 420",
        subject: "CPSC",
        course: "69",
        section: "420",
        textbooks: [" 600 dollar book"],
        pre_reqs: [],
        prof: "Belleville, Patrice",
        term: "1",
        year: "2020",
        schedule: [
          {
            day: "Mon",
            term: "1",
            start_time: "23:30",
            end_time: "17:00",
            building: "CU",
            room: "ICCS 69420",
          },
        ], 
        total_seats_remaining: 1003,
        currently_registered: 2,
        general_seats_remaining: 3,
        restricted_seats_remaining: 1000,
        seats_reserved_for: ["BSC in year: <=2"],
        credits: "3",
        course_avg: 69,
        prof_rating: 4.20,
        link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
      }

      expect(result.body.length).toBeGreaterThan(1); 
      expect(result.body).not.toContain(section2);

      const actualSection = search("CPSC 100 101 (Web-Oriented Course)", result.body);
      expect(actualSection).toBeTruthy();
      expect(actualSection).toMatchObject(section);
      
    });

    it("fail invalid subject ", async () => {
      const result = await request(app).get("/sectionInfo/LMAOSHIT/221?realtime=1");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Course Not Found"
      });
    });
    
    it("fail invalid course number", async () => { 
      const result = await request(app).get("/sectionInfo/CPSC/69?realtime=1");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Course Not Found"
      });
    });
  });

  // test section.ts - Get ALL Sections (101,102,etc.) 
  describe("GET /section/:subject/:number", () => {
    it("SUCCESS :)", async () => {
      const result = await request(app).get("/section/CPSC/221?realtime=1");
      expect(result.status).toEqual(200);

      const section: Section = {
        status: expect.any(String),
        name: "CPSC 221 101",
        subject: "CPSC",
        course: "221",
        section: "101",
        activity: "Web-Oriented Course",
        term: "1",
        interval: "",
        schedule: [
          {
            day: "Mon",
            term: "1",
            start_time: "14:00",
            end_time: "15:00",
          },
          {
            day: "Wed",
            term: "1",
            start_time: "14:00",
            end_time: "15:00",
          },
          {
            day: "Fri",
            term: "1",
            start_time: "14:00",
            end_time: "15:00",
          }
        ],
        comments: "If all the lab and/or tutorial seats are full the department will ensure that there are enough lab/tutorial seats available for the number of students registered in the course by either adding additional lab/tutorial sections or expenadind the number of seats in the activity once we know how many extra students we will need to accommodate. However, there is no guarantee that these seats will fit your preferred time.  You may need to change your registration in other courses to get access to a lab/tutorial where there are available seats.",
        link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101",
        endpoint: "/sectionInfo/CPSC/221/101",
      }
      expect(result.status).toEqual(200);

      let data = search("CPSC 221 101", result.body.sections);

      expect(data).toMatchObject(section);

      expect(result.body.sections.length).toBeGreaterThan(1);
    });
    
    it("fail invalid subject TODO", async () => {
      const result = await request(app).get("/section/LMAOSHIT/221?realtime=1");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Course Not Found"
      });
    });

    it("fail invalid course number TODO", async () => {
      const result = await request(app).get("/section/CPSC/69?realtime=1");
      expect(result.status).toEqual(404);
      expect(result.body).toMatchObject({
        error: "Course Not Found"
      });
    });
  });

  // test subject
  describe("GET /subject", () => {
    it("SUCCESS :)", async () => {
      const result = await request(app).get("/subject?realtime=1");
      expect(result.status).toEqual(200);

      const subject: Subject ={
        subject: "CPSC",
        title: "Computer Science",
        faculty: "Faculty of Science",
        endpoint: "/course/CPSC",
        link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=CPSC",
        hasCourses: true
      }
      expect(result.status).toEqual(200);

      expect(result.body.subjects).toEqual( 
        expect.arrayContaining([ 
          expect.objectContaining(subject)
        ])
      );
      expect(result.body.subjects.length).toBeGreaterThan(1);
    });
  });

  afterAll( async () => {
    await mongoose.connection.close();
    await server.close();
    mongoose.disconnect();
    mongod.stop();
  });

});