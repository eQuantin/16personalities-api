// REQUIRES

const express = require('express');
const morgan = require('morgan');

const question = require('./routes/question.js');
const personality = require('./routes/personality.js');

const result = require('./data/result.json');

const app = express();

// USE
app.use(morgan('dev'));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Access-Control-Allow-Origin');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/question', question);
app.use('/personality', personality);

// ROUTES
app.get('/', (req, res) => {
    res.status(404).end();
});

app.get('/result', (req, res) => {
    res.send(result);
});

let server = app.listen(3500, () => {
    console.log('Personality API listening on port ', server.address().port);
})