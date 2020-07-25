# Get Course/Section Info

Get the details of all sections under the given *academic year, subject, and course number

**URL** : `/sectionInfo/:subject/:number`

**example** : `/course/CPSC/221`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a specific course given department code, number, return the info for all sections within that course in a list

eg CPSC 221

```json
{
  "sections": [
    {
      // section info here
    },
    {
      // another section info here
    },
  ]
}
```

see [GET sectionInfo/:subject/:number/:section]({subject}{number}{section}.md)

## Error Responses

**Condition** : If the course is not found

**Code** : `404 NOT FOUND`

**Content** :
```json
{
  "error": "Course Not Found"
}
```

## Notes

* None
