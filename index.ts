import express from 'express';
import courseRoutes from './src/routes/courseRoutes';
import sectionRoutes from './src/routes/sectionRoutes';
import sectionInfoRoutes from './src/routes/sectionInfoRoutes';
import subjectRoutes from './src/routes/subjectRoutes';
import CourseScraper from './src/util/CourseScraper';
import { CoursePageScraper } from './src/util/scraper';

const app = express();

const courseScraper = new CourseScraper()

function isJestRunning() {
    return process.env.JEST_WORKER_ID !== undefined;
}

const defaultPort = isJestRunning() ? 3001 : 3000;

let port = process.env.port || defaultPort;

// set up routes
app.use('/course', courseRoutes);
app.use('/section', sectionRoutes);
app.use('/sectionInfo', sectionInfoRoutes);
app.use('/subject', subjectRoutes);

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.get('/json', (req, res) => {
    res.json({
        "string": "a",
        "number": 1
    });
});

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.get('/allsaints', (req, res) => {
    res.send("It's not an ocean it's a lake.");
});

app.get('/test', async (req, res) => {
    res.json(await (new CoursePageScraper()).getData("CPSC", "221"));
});

const server = app.listen(port, () => console.log('Course Scraper app listening on port 3000!'));  

export {
    app,
    server
}