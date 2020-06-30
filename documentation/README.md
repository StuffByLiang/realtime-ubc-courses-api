# Documentation

features that are nice to have:
- return average grades too 
- return prof of that course's ratemyprof score 
- find courses related to a topic of study (machine learning, swe, etc.)
- return courses that are available in a certain time frame

essential features:
* retrieve course/section info : `GET /sectionInfo/{subject}/{number}/{section}`
* retrieve course/section info : `GET /sectionInfo/{subject}/{number}`
* retrieve all courses in a subject : `GET /course/{subject}`
* retrieve all sections in a course : `GET /section/{subject}/{number}`

Use cases:
- course timetable picker
- prof searcher
- prerequisite checker 
- course searcher