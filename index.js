// REQUIRES

const express = require('express');
const morgan = require('morgan');

const question = require('./routes/question.js');
const personality = require('./routes/personality.js');

const app = express();

// USE
app.use(morgan('dev'));

app.use('/question', question);
app.use('/personality', personality);

// ROUTES
app.get('/', (req, res) => {
    res.status(404).end();
});

let server = app.listen(3500, () => {
    console.log('Personality API listening on port ', server.address().port);
})