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

Router.param('id', (req, res, next, id) => {
    req.id = id;
    next();
});

Router.get('/:id', (req, res) => {
    let data = require(`../data/id/${req.id}.json`);
    res.json(data);
});

Router.get('/:id/update', (req, res) => {
    res.status(404).end();
});

Router.get('/:id/delete', (req, res) => {
    res.status(404).end();
});

Router.get('new', (req, res) => {
    res.status(404).end();
});

module.exports = Router;