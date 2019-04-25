const express = require('express');
const multer = require('multer');

const upload = multer();
const Router = express.Router();

Router.get('/', upload.array(), function (req, res) {
    console.log(req.body);
    res.json(req.body);
});

module.exports = Router;