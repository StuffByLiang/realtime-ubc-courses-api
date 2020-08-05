# Documentation

features that are nice to have:
- return average grades too 
- return prof of that course's ratemyprof score 
- find courses related to a topic of study (machine learning, swe, etc.)
- return courses that are available in a certain time frame

Essential features:
* [retrieve all subject codes](subject/index.md) : `GET /subject`
* [retrieve all sections at UBC](sectionInfo/index.md) : `GET /sectionInfo`
* [retrieve all sections for a subject](sectionInfo/{subject}.md) : `GET /sectionInfo/{subject}`
* [retrieve all sections for a course](sectionInfo/{subject}{number}.md) : `GET /sectionInfo/{subject}/{number}`
* [retrieve section for a specified section](sectionInfo/{subject}{number}{section}.md) : `GET /sectionInfo/{subject}/{number}/{section}`
* [retrieve all courses at UBC](course/index.md) : `GET /course`
* [retrieve all courses in a subject](course/{subject}.md) : `GET /course/{subject}`
* [retrieve sections in a course with only basic data](section/{subject}{number}.md) : `GET /section/{subject}/{number}`

Use cases:
- course timetable picker
- prof searcher
- prerequisite checker 
- course searcher