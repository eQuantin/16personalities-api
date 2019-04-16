const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('Bienvenue');
});

app.get('/personality', (req, res) => {

    /* Ressources Dojo

    localhost:3500/personality?ans=[{3: 1},{2 : 1}]

    const ans = req.param(ans);

    ans = ans.map (elem => {
        let type;
        let obj = {};

        type = fetch(https://equantin.github.io/16personalities-api/api/id/`${elem.question}`.json);
        type = type.type;

        obj = {
            answer: elem.answer,
            type: type
        };
        return obj;
    })

    let perso = {
        mind: 50,
        energy: 50,
        nature: 50,
        tactics: 50,
        identity: 5
    }

    let len = ans.length;

    for (let i = 0; i < len; i++) {
        switch (ans[i].type) {
            case 'mind':
                ans[i].answer > 2 ? perso.mind += 5 : ans[i].answer < 2 ? perso.mind -= 5 : null;
                break;
            case 'energy':
                ans[i].answer > 2 ? perso.energy += 5 : ans[i].answer < 2 ? perso.energy -= 5 : null;
                break;
            case 'nature':
                ans[i].answer > 2 ? perso.nature += 5 : ans[i].answer < 2 ? perso.nature -= 5 : null;
                break;
            case 'tactics':
                ans[i].answer > 2 ? perso.tactics += 5 : ans[i].answer < 2 ? perso.tactics -= 5 : null;
                break;
            case 'identity':
                ans[i].answer > 2 ? perso.identity += 5 : ans[i].answer < 2 ? perso.identity -= 5 : null;
                break;
            default:
                break;
        }
    }

    res.send(perso);

    */
});

let server = app.listen(3500, () => {
    console.log('Personalities API listening on port ', server.address().port);
})