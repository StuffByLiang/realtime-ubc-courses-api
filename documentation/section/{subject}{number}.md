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
    "lect_sections": [
      {
        "section" : "101", 
        "status"  : "Full", 
        "endpoint": "/course/CPSC/221/101",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101",
      }, 
      {
        "section" : "102", 
        "status"  : "Available", 
        "endpoint": "/course/CPSC/221/102",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=102"
      }, 
    ],
    "lab_sections": [
      {
        "section" : "L1A", 
        "status"  : "Full", 
        "endpoint": "/course/CPSC/221/L1A",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=L1A" 
      },
    ],
    "tutorial_sections": [
      {
        "section" : "T1A", 
        "status"  : "Full", 
        "endpoint": "/course/CPSC/221/T1A",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=T1A"
      }, 
      {
        "section" : "T1B", 
        "status"  : "Available", 
        "endpoint": "/course/CPSC/221/T1B",
        "link"    : "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=T1B"
      }
    ]
}
```

## Error Responses

**Condition** : If the departmentCode is not found

**Code** : `404 NOT FOUND`

**Content** :
```json
{
  "error": "subject not found"
}
{
  "error": "course number not found"
}
```

## Notes

* None