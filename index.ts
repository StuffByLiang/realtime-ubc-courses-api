import express from 'express';
import course from './src/routes/courseRoutes';
import section from './src/routes/sectionRoutes';
import sectionInfo from './src/routes/sectionInfoRoutes';
import CourseScraper from './src/util/CourseScraper';

const app = express();

const courseScraper = new CourseScraper()

function isJestRunning() {
    return process.env.JEST_WORKER_ID !== undefined;
}

const defaultPort = isJestRunning() ? 3001 : 3000;

let port = process.env.port || defaultPort;

// set up routes
app.use('/course', course);
app.use('/section', section);
app.use('/sectionInfo', sectionInfo);

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

const server = app.listen(port, () => console.log('Course Scraper app listening on port 3000!'));  

export {
    app,
    server
}