var tf = require('@tensorflow/tfjs-node');

async function go() {

const model = tf.sequential();
model.add(tf.layers.dense({units: 10, activation: 'sigmoid',inputShape: [30]}));
model.add(tf.layers.dense({units: 1, activation: 'sigmoid',inputShape: [10]}));

model.compile({loss: 'meanSquaredError', optimizer: 'rmsprop'});

/* 
oui = 0
neutre = 1
non = 2
*/

const training_data = tf.tensor2d([
[0,0,2,0,0,2,0,2,0,2,0,2,0,0,2,2,0,0,0,0,0,2,0,2,2,0,2,2,0,2],
[1,2,2,0,1,1,2,1,1,0,2,1,2,1,0,0,2,2,0,2,1,0,0,1,0,1,2,2,2,1/*,1,0,0,0,1,0,2,1,2,0,0,2,1,2,0,1,0,2,2,0,1,0,2,1*/], //aventurier
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //1
]);
/*  0       : Architecte
    0,0625  : Logicien
    0,125   : Commandant
    0,1875  : Innovateur
    0,25    : Avocat
    0,3125  : Mediateur
    0,375   : Protagoniste
    0,4375  : Inspirateur
    0,5     : Logisticien
    0,5625  : Defenseur
    0,625   : Directeur
    0,6875  : Consul
    0,75    : Virtuose
    0,8125  : Aventurier
    0,875   : Entrepreneur
    0,9375  : Amuseur
    1       : Indecis
*/
const target_data = tf.tensor2d([[0.0625],[1],[0.8125]]);

for (let i = 1; i < 100 ; ++i) {
 var h = await model.fit(training_data, target_data, {epochs: 100});
   console.log("Loss after Epoch " + i + " : " + h.history.loss[0]);
}

 model.predict(training_data).print();

}

go();
