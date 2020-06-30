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
      "name"    : "CPSC 100",
      "subject" : "CPSC",
      "number"  : "100",
      "title"   : "Computational Thinking", 
      "endpoint": "/course/CPSC/100/"
    },
    {
      "name"    : "CPSC 103",
      "subject" : "CPSC",
      "number"  : "103",
      "title"   : "Introduction to Systematic Program Design",
      "endpoint": "/course/CPSC/103/"  
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
