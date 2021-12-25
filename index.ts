import express from 'express';
import mongoose from "mongoose"
import dotenv from 'dotenv';
import morgan from 'mongoose-morgan';

import courseRoutes from './src/routes/courseRoutes';
import sectionRoutes from './src/routes/sectionRoutes';
import sectionInfoRoutes from './src/routes/sectionInfoRoutes';
import subjectRoutes from './src/routes/subjectRoutes';

import cors from 'cors';

import http from "http"
import https from "https"

https.globalAgent.maxSockets = 30;
http.globalAgent.maxSockets = 30;

// set up environment variables from .env file
dotenv.config();

// set up express
const app = express();

// enable cross origin
app.use(cors());


function isJestRunning() {
    return process.env.JEST_WORKER_ID !== undefined;
}

// set up mongoose
if (!isJestRunning()) {
    // setup logging
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.use(morgan({
        connectionString: process.env.MONGO_URI
    }))

    mongoose.connect(process.env.MONGO_URI || "")
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

const defaultPort = isJestRunning() ? 3001 : 3000;

const port = process.env.PORT || defaultPort;

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