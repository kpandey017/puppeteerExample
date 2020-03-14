
const google = require('./google');
const fb = require('./fb');
const linkedin = require('./linkedin');
const quora = require('./quora');


var array = ['F1','F2','F3','F4']

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

if (ranFunc == 'F4') {
    quora()
   }

}
start()
