# Documentation

features that are nice to have:
- return average grades too 
- return prof of that course's ratemyprof score 
- find courses related to a topic of study (machine learning, swe, etc.)
- return courses that are available in a certain time frame

Essential features:
* [retrieve course/section info](sectionInfo/{subject}{number}{section}.md) : `GET /sectionInfo/{subject}/{number}/{section}`
* [retrieve course/section info](sectionInfo/{subject}{number}.md) : `GET /sectionInfo/{subject}/{number}`
* [retrieve all courses in a subject](course/{subject}.md) : `GET /course/{subject}`
* [retrieve all sections in a course](section/{subject}{number}.md) : `GET /section/{subject}/{number}`

Use cases:
- course timetable picker
- prof searcher
- prerequisite checker 
- course searcher