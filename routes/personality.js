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
    let len = ans.length;
    

    for (let i = 0; i < len; i++) {
        if (ans[i].type === personality.mind) {
            ans[i].ans === 0 ? personality.mind += 7.5 :
            ans[i].ans === 2 ? personality.mind -= 7.5 :
            null;
        }
        
        else if (ans[i].type === personality.energy) {
            ans[i].ans === 0 ? personality.energy += 4.3 :
            ans[i].ans === 2 ? personality.energy -= 4.3 :
            null;
        }

        else if (ans[i].type === personality.nature) {
            ans[i].ans === 0 ? personality.nature += 3.5 :
            ans[i].ans === 2 ? personality.nature -= 3.5 :
            null;
        }

        else if (ans[i].type === personality.tactics) {
            ans[i].ans === 0 ? personality.tactics += 6.7 :
            ans[i].ans === 2 ? personality.tactics -= 6.7 :
            null;
        }

        else if (ans[i].type === personality.identity) {
            ans[i].ans === 0 ? personality.identity += 5 :
            ans[i].ans === 2 ? personality.identity -= 5 :
            null;
        }
    }

    return personality;
};

const findPers = (personality, arr) => {
    personality = computPer(personality, arr);

    personality.mind == 50 && personality.energy == 50 && personality.nature == 50
    && personality.tactics == 50 ? personality.personality = "Logician" :

    personality.mind > 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "Architect" :

    personality.mind < 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "Logician" :

    personality.mind > 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "Commander" :

    personality.mind < 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "Debater" :

    personality.mind > 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "Advocate" :

    personality.mind < 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "Mediator" :

    personality.mind > 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "Protagonist" :

    personality.mind < 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "Compaigner" :

    personality.mind > 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "Logistician" :

    personality.mind < 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "Defender" :

    personality.mind > 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "Executive" :

    personality.mind < 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "Consul" :

    personality.mind > 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "Virtuoso" :

    personality.mind < 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "Adventurer" :

    personality.mind > 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "Entrepreneur" :

    personality.mind < 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "Entertainer" : null;

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