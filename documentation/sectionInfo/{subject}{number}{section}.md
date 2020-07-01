# Get Course/Section Info

Get the details of the courses' section with the given academic year, subject, number, and section.

**URL** : `/sectionInfo/:subject/:number/:section`

**example** : `/course/CPSC/221/911`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples** 

For a specific course given department code, number, and section, return the info for that section.

eg CPSC 221 101

```json
{
  "textbooks": [
    {
      "name": "Algorithms and Data Structures expensive book"
    },
  ],
  "pre_reqs": [
    [
      {
        "name"    : "CPSC 210",
        "subject" : "CPSC",
        "number"  : 210,
        "title"   : "Software Construction", 
        "endpoint": "/course/CPSC/210/",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=210"
      },
      {
        "name"    : "CPEN 221",
        "subject" : "CPEN",
        "number"  :  221,
        "title"   : "Principles of Software Construction", 
        "endpoint": "/course/CPSC/221/",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPEN&course=221"
      }
    ],
    [
      {
        "name"    : "CPSC 121",
        "subject" : "CPSC",
        "number"  : 121,
        "title"   : "Models of Computation", 
        "endpoint": "/course/CPSC/121/",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=121"
      },
      {
        "name"    : "MATH 220",
        "subject" : "MATH",
        "number"  : 220,
        "title"   : "Mathematical Proof", 
        "endpoint": "/course/MATH/220/",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-course&dept=MATH&course=220"
      }
    ]
  ],
  "prof": "Joe Mama",
  "term": 1,
  "days": [
    "Mon",
    "Wed",
    "Fri"
  ],
  "start_time": "00:00", // maybe DateTime format "\"2014-01-01T23:28:56.782Z\""; 
  "end_time": "00:00", 
  "topic": "Basic Algorithms and Data Structures",               
  "description": "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency.",
  "total_seats_remaining": 169,
  "currently_registered": 22,
  "general_seats_remaining": 47,
  "restricted_seats_remaining": 122,
  "seats_reserved_for": [
    "BUCC",
    "BUCCS"
    //etc
  ],
  "building": "collaborate ultra",
  "room": "collaborate ultra room 4",
  "num_credits": 4,
  "course_avg": 69,
  "prof_rating": 4.20,
  "link": "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101"
}
```

## Error Responses

**Condition** : If the course is not found

**Code** : `404 NOT FOUND`

**Content** :
```json
{
  "error": "subject not found"
}
```
or
```json
{
  "error": "course number not found"
}
```
or
```json
{
  "error": "section not found"
}
```

## Notes

* None
