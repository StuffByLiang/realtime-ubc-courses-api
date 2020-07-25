# Get All Sections

return all course sections in a specific course eg. (CPSC 210)

**URL** : `/section/:subject/:number`

**example** : `/course/CPSC/221`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a specific course given department code and number, return all sections

eg CPSC 221 101

```json
{
    "sections": [
       {
            "status": "Restricted",
            "name": "CPSC 221 101",
            "subject": "CPSC",
            "course": "221",
            "section": "101",
            "activity": "Web-Oriented Course",
            "term": "1",
            "interval": "",
            "days": [
                "Mon",
                "Wed",
                "Fri"
            ],
            "start_time": "14:00",
            "end_time": "15:00",
            "comments": "If all the lab and/or tutorial seats are full the department will ensure that there are enough lab/tutorial seats available for the number of students registered in the course by either adding additional lab/tutorial sections or expenadind the number of seats in the activity once we know how many extra students we will need to accommodate. However, there is no guarantee that these seats will fit your preferred time.  You may need to change your registration in other courses to get access to a lab/tutorial where there are available seats.",
            "link": "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101",
            "endpoint": "/sectionInfo/CPSC/221/101"
        },
        {
            "status": "Full",
            "name": "CPSC 221 L1A",
            "subject": "CPSC",
            "course": "221",
            "section": "L1A",
            "activity": "Laboratory",
            "term": "1",
            "interval": "",
            "days": [
                "Tue"
            ],
            "start_time": "11:00",
            "end_time": "13:00",
            "comments": "",
            "link": "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=L1A",
            "endpoint": "/sectionInfo/CPSC/221/L1A"
        },
    ]
}
```

## Error Responses

**Condition** : If the departmentCode or number is not found

**Code** : `404 NOT FOUND`

**Content** :
```json
{
  "error": "Course Not Found"
}
```

## Notes

* None