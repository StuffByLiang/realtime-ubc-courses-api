import {app, server} from "../index";
import request from "supertest";

import Course from "../src/models/course";
import Section from "../src/models/section";
import sectionInfo from "../src/models/sectionInfo";

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
    const result = await request(app).get("/course/CPSC");
    expect(result.status).toEqual(200);

    const cpsc221 : Course = {
      name: "CPSC 221",
      subject: "CPSC",
      number: 221,
      title: "Basic Algorithms and Data Structures",
      endpoint: "/course/CPSC/221/",
      link: "/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=221"
    };
    expect(result.body.courses).toContainEqual(cpsc221);
    expect(result.body.courses.length).toBeGreaterThan(0);
  });
  
  it("fail invalid subject ", async () => {
    const result = await request(app).get("/course/LMAO");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("subject not found");
  });
});

// test section-info.ts - Get info for a specific course section
describe("GET /sectionInfo/:subject/:number/:section", () => {
  it("success", async () => {
    const result = await request(app).get("/sectionInfo/CPSC/221/103");
    
    const cpsc100Sect101: sectionInfo = {
      textbooks: [],
      pre_reqs: [],
      prof: "Wong, Jessica",
      term: 1,
      days: ["Tue", "Thu"],
      start_time: "15:30",
      end_time: "17:00", 
      topic: "Computation Thinking",
      description: "Meaning and impact of computational thinking Solving problems using computational thinking, testing, debugging. How computers work. No prior computing experience required. Not for students with existing credit for or exemption from CPSC 107, CPSC 1 ",
      total_seats_remaining: 69420,
      currently_registered: 69,
      general_seats_remaining: 420,
      restricted_seats_remaining: 42,
      seats_reserved_for: ["BSC in year: <=2"],
      building: "CU",
      room: "ICCS 69420",
      num_credits: 3,
      course_avg: 69,
      prof_rating: 4.20,
      link: "cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
    }
    
    expect(result.status).toEqual(200);

    expect(result.body.textbooks).toContainEqual({
      name: "textbookName" 
    });
    
    expect(result.body.pre_reqs).toContainEqual({});
  });

  it("fail invalid subject ", async () => {
    const result = await request(app).get("/sectionInfo/LMAOSHIT/221/420");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("subject not found");
  });
  
  it("fail invalid course number", async () => { 
    const result = await request(app).get("/sectionInfo/CPSC/69/420");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("course number not found");
  });

  it("fail invalid section", async () => {  
    const result = await request(app).get("/sectionInfo/CPSC/221/69");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("section not found");
  });
});

// test section-info.ts - Get all sections' info for a course
describe("GET /sectionInfo/:subject/:number", () => {
  it("success", async () => {
    const result = await request(app).get("/sectionInfo/CPSC/100");
    expect(result.status).toEqual(200);
    
  });

  it("fail invalid subject ", async () => {
    const result = await request(app).get("/sectionInfo/LMAOSHIT/221");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("subject not found");
  });
  
  it("fail invalid course number", async () => { 
    const result = await request(app).get("/sectionInfo/CPSC/69");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("course number not found");
  });
});

// test section.ts - Get ALL Sections (101,102,etc.) 
describe("GET /section/:subject/:number", () => {
  it("SUCCESS :)", async () => {
    const result = await request(app).get("/course/CPSC/221");
    expect(result.status).toEqual(200);

    const lectSection1: Section = {
      section_name: "101",
      status: "Full",
      endpoint: "/course/CPSC/221/101",
      link: "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101"
    }
    expect(result.body.sections).toContainEqual(lectSection1);
    expect(result.body.sections.length).toBeGreaterThan(0);
  });
  
  it("fail invalid subject ", async () => {
    const result = await request(app).get("/section/LMAOSHIT/221");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("subject not found");
  });

  it("fail invalid course number ", async () => {
    const result = await request(app).get("/section/CPSC/69");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("course number not found");
  });
});

afterAll( async () => {
  server.close();
});