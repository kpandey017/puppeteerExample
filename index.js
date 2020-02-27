//import fb from './fb';
// import google from './google';
// fb()


const google = require('./google');
const fb = require('./fb');

var array = ['F1','F1','F2','F2']

var ranFunc;

function start() { // Randomly Execute Function
 ranFunc = array[Math.floor(Math.random() * array.length)];
 if (ranFunc == 'F1') {
  google()
 }
 if (ranFunc == 'F2') {
  fb()
 }

}
start()
