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
  "name": "CPSC 221 101 (Web-Oriented Course)",
  "status": "restricted",
  "activity": "Web-Oriented Course",
  "subject": "CPSC",
  "course": "221",
  "section": "101",
  "textbooks": [
    "Algorithms and Data Structures expensive book"
  ],
  "prof": "HEEREN, CINDA",
  "term": "1",
  "year": "2020",
  "schedule": [
    {
      "day": "Mon",
      "term": "1",
      "start_time": "14:00",
      "end_time": "15:00",
      "building": "",
      "room": ""
    },
    {
      "day": "Wed",
      "term": "1",
      "start_time": "14:00",
      "end_time": "15:00",
      "building": "",
      "room": ""
    },
    {
      "day": "Fri",
      "term": "1",
      "start_time": "14:00",
      "end_time": "15:00",
      "building": "",
      "room": ""
    }
  ],
  "total_seats_remaining": 56,
  "currently_registered": 135,
  "general_seats_remaining": 0,
  "restricted_seats_remaining": 56,
  "seats_reserved_for": [
    "with one of these specializations: ****BUCC,****BUCS",
    "with one of these specializations: ****COMI",
    "with one of these specializations: MAJ CPSC,CMJ CPSC,HON CPSC,CHN CPSC",
    "in one of these programs: BCS",
    "with one of these specializations: MAJ MASC"
  ],
  "credits": "4",
  "link": "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101",
  "course_avg": 76.55,
  "prof_rating": null
}
```

## Error Responses

**Condition** : If the section is not found

**Code** : `404 NOT FOUND`

**Content** :
```json
{
  "error": "section not found"
}
```

## Notes

* None
