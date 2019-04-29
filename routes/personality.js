const express = require('express');
const multer = require('multer');

const all = require('../data/all.json');

const upload = multer();
const Router = express.Router();

const process = arr => {
    let ans = arr.map(elem => {
        let obj = {
            id : 0,
            type : "",
            answer : elem
        }
        return obj;
    });

    for (let i = 0; i < ans.length; i++) {
        ans[i].id = all[i].id;
        ans[i].type = all[i].type;
    }

    return ans;
};

const perso = (personality, arr) => {
    let ans = process(arr);

    let len = ans.length;

    for (let i = 0; i < len; i++) {
        if (ans[i].answer === 0) {

        }
        
        else if (ans[i].answer === 1) {

        }

        else if (ans[i].answer === 2) {

        }
    }

    return personality;
};

Router.get('/', upload.array(), function (req, res) {
    console.log(req.body);
    res.status(200);

    let reqBody =[{answer: [2, ""]}, {answer: [1, ""]}];

    let ans = [];

    reqBody.map(obj => {
        ans.push(obj.answer[0]);
    });

    let personality = {
        mind : 50,
        energy : 50,
        nature : 50,
        tactics : 50,
        identity : 50,
        personality : ""
    }

    ans = perso(personality, ans);

    console.log(ans)

    res.send(ans).end();
});

module.exports = Router;