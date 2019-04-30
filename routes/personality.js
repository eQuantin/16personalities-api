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
            ans[i].ans === 0 ? personality.mind += 5 :
            ans[i].ans === 2 ? personality.mind -= 5 :
            null;
        }
        
        else if (ans[i].type === personality.energy) {
            ans[i].ans === 0 ? personality.energy += 5 :
            ans[i].ans === 2 ? personality.energy -= 5 :
            null;
        }

        else if (ans[i].type === personality.nature) {
            ans[i].ans === 0 ? personality.nature += 5 :
            ans[i].ans === 2 ? personality.nature -= 5 :
            null;
        }

        else if (ans[i].type === personality.tactics) {
            ans[i].ans === 0 ? personality.tactics += 5 :
            ans[i].ans === 2 ? personality.tactics -= 5 :
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
    && personality.tactics == 50 ? personality.personality = "Indecis" :

    personality.mind > 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind > 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind > 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind > 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics > 50 ? personality.personality = "je sais pas" :

    personality.mind > 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy > 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" :

    personality.mind > 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy < 50 && personality.nature > 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" :

    personality.mind > 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy > 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" :

    personality.mind > 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" :

    personality.mind < 50 && personality.energy < 50 && personality.nature < 50
    && personality.tactics < 50 ? personality.personality = "je sais pas" : null;

}

Router.get('/', upload.array(), function (req, res) {
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

    ans = findPers(personality, ans);

    res.send(JSON.stringify(ans)).end();
});

module.exports = Router;