import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.get('/allsaints', (req, res) => {
    res.send("It's not an ocean it's a lake.");
});

app.listen(3000, () => console.log('Course Scraper app listening on port 3000!'));  

export default app;