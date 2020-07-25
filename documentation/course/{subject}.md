# Get All Courses

return all courses in a subject eg. (CPSC)

**URL** : `/course/:subject`

**example** : `/course/CPSC`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

Given a specific subject code, return all course names, titles, and endpoints

eg CPSC --> CPSC 100, CPSC 103, CPSC 107, etc. 

```json
{
  "courses": [
    {
            "name": "CPSC 100",
            "subject": "CPSC",
            "course": "100",
            "title": "Computational Thinking",
            "link": "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=100",
            "description": "Meaning and impact of computational thinking. Solving problems using computational thinking, testing, debugging. How computers work. No prior computing experience required. Not for students with existing credit for or exemption from CPSC 107, CPSC 110 or APSC 160.",
            "credits": 3,
            "comments": [
                "Choose one section from all 2 activity types. (e.g. Lecture and Laboratory)"
            ],
            "endpoint": "/section/CPSC/100"
        },
    {
            "name": "CPSC 103",
            "subject": "CPSC",
            "course": "103",
            "title": "Introduction to Systematic Program Design",
            "link": "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=103",
            "description": "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
            "credits": 3,
            "comments": [
                "Choose one section from all 2 activity types. (e.g. Lecture and Laboratory)"
            ],
            "endpoint": "/section/CPSC/103"
        },
    // etc.
  ]
}
```

## Error Responses

**Condition** : If the subject is not found

**Code** : `404 NOT FOUND`

**Content** :
```json
{
  "error": "subject not found"
}

## Notes

* None
