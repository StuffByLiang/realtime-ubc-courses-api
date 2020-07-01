import express from 'express';
import course from './src/routes/courseRoutes';
import section from './src/routes/sectionRoutes';
import sectionInfo from './src/routes/sectionInfoRoutes';

const app = express();

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

const server = app.listen(3000, () => console.log('Course Scraper app listening on port 3000!'));  

export {
    app,
    server
}