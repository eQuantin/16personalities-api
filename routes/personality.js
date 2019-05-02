const express = require('express');
const multer = require('multer');

const all = require('../data/all.json');

const upload = multer();
const Router = express.Router();

const settingArr = arr => {
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

const computPer = (personality, arr) => {
    let ans = settingArr(arr);
    let len = 60;

    let mind = 50;
    let energy = 50;
    let nature = 50;
    let tactics = 50;
    let identity = 50;
    

    for (let i = 0; i < len; i++) {

        if (ans[i].type == "mind") {
            if (ans[i].answer == 0)
                mind += 7.5;
            else if (ans[i].answer == 2)
                mind -= 7.5;
            console.log("mind");
        }
        
        else if (ans[i].type == "energy") {
            if (ans[i].answer == 0)
                energy += 7.5;
            else if (ans[i].answer == 2)
                energy -= 7.5;
            console.log("energy");
        }

        else if (ans[i].type == "nature") {
            if (ans[i].answer == 0)
                nature += 7.5;
            else if (ans[i].answer == 2)
                nature -= 7.5;
            console.log("nature");
        }

        else if (ans[i].type == "tactics") {
            if (ans[i].answer == 0)
                tactics += 7.5;
            else if (ans[i].answer == 2)
                tactics -= 7.5;
            console.log("tactics");
        }

        else if (ans[i].type == "identity") {
            if (ans[i].answer == 0)
                identity += 7.5;
            else if (ans[i].answer == 2)
                identity -= 7.5;
            console.log("identity");
        }
    }
    
    personality.mind = mind;
    personality.nature = nature;
    personality.identity = identity;
    personality.tactics = tactics;
    personality.energy = energy;

    console.log(personality);

    return personality;
};

const findPers = (personality, arr) => {
    personality = computPer(personality, arr);

    personality.mind == 50 && personality.energy == 50 && personality.nature == 50
    && personality.tactics == 50 ? personality.personality = 0 :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = 1 :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = 2 :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = 3 :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = 4 :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = 5 :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = 6 :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = 7 :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = 8 :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = 9 :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = 10 :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = 11 :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = 12 :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = 13 :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = 14 :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = 15 :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = 16 : null;

    return personality;
}

Router.get('/', upload.array(), function (req, res) {
    res.status(200);

    let reqBody = req.query.ans;
    let ans = [];

    for (let i = 0; i < reqBody.length; i+= 2) {
        ans.push(reqBody[i]);
    }

    let personality = {
        mind : 50,
        energy : 50,
        nature : 50,
        tactics : 50,
        identity : 50,
        personality : ""
    }

    ans = findPers(personality, ans);

    res.send(JSON.stringify(ans));
});

module.exports = Router;