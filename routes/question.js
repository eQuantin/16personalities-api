const express = require('express');
const bodyParser = require('body-parser');

const Router = express.Router();
const app = express();

app.use(bodyParser.json());

Router.get('/', (req, res) => {
    res.status(404).end();
});

Router.get('/all', (req, res) => {
    let data = require('../data/all.json');
    res.json(data);
});

Router.get('/:id', (req, res) => {
    res.send('id');
});

module.exports = Router;