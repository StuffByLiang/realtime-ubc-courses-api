# Get Subjects

Gets all subject codes in UBC

**URL** : `/subject`

**example** : `/subject`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content examples** 

returns all subjects in UBC in an array in json format

eg CPSC 221 101

```json
{
  "subjects": [{
    "subject": "SUBJECT",
    "title": "TITLE",
    "faculty": "FACULTY/SCHOOL",
    "link": "/cs/courseschedule?pname=subjarea&tname=subj-department&dept=SUBJECT",
    "hasCourses": true
  }],
}
```

example
```json
{
  "subjects": [
    {
      "subject" : "AANB",
      "title": "Applied Animal Biology",
      "faculty": "Faculty of Land and Food Systems",
      "endpoint": "/course/AANB",
      "link": "/cs/courseschedule?pname=subjarea&tname=subj-department&dept=AANB",
      "hasCourses": true
    },
    {
      "subject": "CPSC",
      "title": "Computer Science",
      "faculty": "Faculty of Science",
      "endpoint": "/course/CPSC",
      "link": "/cs/courseschedule?pname=subjarea&tname=subj-department&dept=CPSC",
      "hasCourses": true
    }
  ]
}
```

## Error Responses
* None

## Notes

* None
