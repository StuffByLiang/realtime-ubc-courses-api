# Get Course/Section Info

Get all sections at UBC

**URL** : `/sectionInfo/`

**example** : `/course/CPSC`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

return the info for all sections at UBC in a list

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

* None

## Notes

* None
