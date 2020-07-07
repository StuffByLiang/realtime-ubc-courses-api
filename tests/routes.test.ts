import {app, server} from "../index";
import request from "supertest";

import Course from "../src/models/course";
import Section from "../src/models/section";
import SectionInfo from "../src/models/sectionInfo";

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
    const result = await request(app).get("/sectionInfo/CPSC/100/101");
    
    const exSection: SectionInfo = {
      name: "CPSC 100 101",
      subject: "CPSC",
      number: 100,
      section: "101",
      textbooks: [],
      pre_reqs: [],
      prof: "Wong, Jessica",
      term: 1,
      year: 2020,
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
      num_credits: "3",
      course_avg: 69,
      prof_rating: 4.20,
      link: "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
    }
    
    expect(result.status).toEqual(200);

    expect(result.body.textbooks).toContainEqual({
      name: "textbookName" 
    });
    
    expect(result.body.pre_reqs).toContainEqual({});
    expect(result.body.term).toEqual(exSection.term);
    expect(result.body.days).toEqual(exSection.days);
    expect(result.body.start_time).toEqual(exSection.start_time);
    expect(result.body.end_time).toEqual(exSection.end_time);
    expect(result.body.topic).toEqual(exSection.topic);
    expect(result.body.description).toEqual(exSection.description);
    // expect(result.body.total_seats_remaining).toEqual(exSection.total_seats_remaining);
    // expect(result.body.currently_registered.toEqual(exSection.currently_registered));
    // expect(result.body.general_seats_remaining).toEqual(exSection.general_seats_remaining);
    // expect(result.body.restricted_seats_remaining).toEqual(exSection.restricted_seats_remaining);
    expect(result.body.seats_reserved_for).toEqual(exSection.seats_reserved_for);
    expect(result.body.building).toEqual(exSection.building); 
    // expect(result.body.course_avg).toEqual(exSection.course_avg); 
    // expect(result.body.prof_rating).toEqual(exSection.prof_rating); 
    expect(result.body.link).toEqual(exSection.link); 
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
    
    const exSection: SectionInfo = {
      name: "CPSC 100 101",
      subject: "CPSC",
      number: 100,
      section: "101",
      textbooks: [],
      pre_reqs: [],
      prof: "Wong, Jessica",
      term: 1,
      year: 2020,
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
      num_credits: "3",
      course_avg: 69,
      prof_rating: 4.20,
      link: "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
    }
    const exSection2: SectionInfo = {
      name: "CPSC 69 420",
      subject: "CPSC",
      number: 69,
      section: "420",
      textbooks: [" 600 dollar book"],
      pre_reqs: [],
      prof: "Belleville, Patrice",
      term: 1,
      year: 2020,
      days: ["Mon"],
      start_time: "23:30",
      end_time: "17:00", 
      topic: "Thinking Computationally",
      description: "Wine tasting",
      total_seats_remaining: 1003,
      currently_registered: 2,
      general_seats_remaining: 3,
      restricted_seats_remaining: 1000,
      seats_reserved_for: ["BSC in year: <=2"],
      building: "CU",
      room: "ICCS 69420",
      num_credits: "3",
      course_avg: 69,
      prof_rating: 4.20,
      link: "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
    }

    
    
    let sectionInfos = [exSection, exSection2];
    
    expect(result.body.sectionInfos.length).toEqual(1); 
    expect(result.body.sectionInfos).toContain(exSection);
    expect(result.body.sectionInfos).not.toContain(exSection);
    
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
      name: "CPSC 221 101",
      subject: "CPSC",
      number: 221,
      section: "101",
      status: "Full",
      endpoint: "/sectionInfo/CPSC/221/101",
      link: "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101",
      term: 1
    }
    expect(result.status).toEqual(200);
    expect(result.body.sections).toContainEqual(lectSection1);
    expect(result.body.sections.length).toBeGreaterThan(0);
  });
  
  it("fail invalid subject", async () => {
    const result = await request(app).get("/section/LMAOSHIT/221");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("subject not found");
  });

  it("fail invalid course number", async () => {
    const result = await request(app).get("/section/CPSC/69");
    expect(result.status).toEqual(404);
    expect(result.text).toEqual("course number not found");
  });
});

afterAll( async () => {
  server.close();
});