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
    && personality.tactics == 50 ? personality.personality = "Logician" :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = "Architect" :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = "Logician" :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = "Commander" :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics >= 50 ? personality.personality = "Debater" :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = "Advocate" :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = "Mediator" :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = "Protagonist" :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics >= 50 ? personality.personality = "Compaigner" :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = "Logistician" :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = "Defender" :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = "Executive" :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature >= 50
    && personality.tactics <= 50 ? personality.personality = "Consul" :

    personality.mind >= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = "Virtuoso" :

    personality.mind <= 50 && personality.energy >= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = "Adventurer" :

    personality.mind >= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = "Entrepreneur" :

    personality.mind <= 50 && personality.energy <= 50 && personality.nature <= 50
    && personality.tactics <= 50 ? personality.personality = "Entertainer" : null;

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