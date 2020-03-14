
const google = require('./google');
const fb = require('./fb');
const linkedin = require('./linkedin');


var array = ['F1','F1','F2','F2','F3','F3']

var ranFunc;

function start() { // Randomly Execute Function
 ranFunc = array[Math.floor(Math.random() * array.length)];
 if (ranFunc == 'F1') {
    google()
 }
 if (ranFunc == 'F2') {
    fb()
 }
 if (ranFunc == 'F3') {
    linkedin()
   }

}
start()
