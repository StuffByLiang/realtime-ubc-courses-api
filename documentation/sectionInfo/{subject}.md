# Get Course/Section Info

Get all sections from a subject

**URL** : `/sectionInfo/:subject`

**example** : `/course/CPSC`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a specific department code return the info for all sections within that subject in a list

eg CPSC 221

```json
[
  {
    // section info here
  },
  {
    // another section info here
  },
]
```

see [GET sectionInfo/:subject/:number/:section]({subject}{number}{section}.md)

## Error Responses

**Condition** : If the course is not found

**Code** : `404 NOT FOUND`

**Content** :
```json
{
  "error": "Subject Not Found"
}
```

## Notes

* None
