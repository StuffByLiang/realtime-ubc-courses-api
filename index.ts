import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv";

import courseRoutes from './src/routes/courseRoutes';
import sectionRoutes from './src/routes/sectionRoutes';
import sectionInfoRoutes from './src/routes/sectionInfoRoutes';
import subjectRoutes from './src/routes/subjectRoutes';

import cors from 'cors';

let http = require('http');
let https = require('https');

https.globalAgent.maxSockets = 50;
http.globalAgent.maxSockets = 50;

// set up environment variables from .env file
dotenv.config();

// set up mongoose
if(!isJestRunning()) {
    mongoose.connect(process.env.MONGO_URI || "", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        () => {
            // success
            console.log('Connected to mongodb database')
        },
        err => {
            console.error(err)
        }
    );

    mongoose.connection.on('error', err => {
        console.error(err);
    });
}

// set up express
const app = express();

app.use(cors()) // Use this after the variable declaration

function isJestRunning() {
    return process.env.JEST_WORKER_ID !== undefined;
}

const defaultPort = isJestRunning() ? 3001 : 3000;

let port = process.env.PORT || defaultPort;

// set up routes
app.use('/course', courseRoutes);
app.use('/section', sectionRoutes);
app.use('/sectionInfo', sectionInfoRoutes);
app.use('/subject', subjectRoutes);

app.get('/', (req, res) => {
    res.send('You\'re probably looking for the documentation. Here ya go. <a href="https://docs.ubccourses.com">https://docs.ubccourses.com</a>');
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