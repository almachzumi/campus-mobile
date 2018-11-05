/*var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('', 'utf8'));
*/

/* Attempt 2, things actuallly are parsed
 */
prof = "Conder, Jonathan"
className = "MATH_3C"

/*
var checkSISession = "config.data.";
checkSISession += className;
checkSISession += "";
//checkSISession += prof;
//checkSISession += "\"]";
var config = require('/Users/seanyeh/tutor.json');
//console.log(checkSISession.stdout);
console.log(config.data.MATH_2["Um, Ko Woon"]);
*/

var config = require('/Users/seanyeh/tutor.json');
console.log(config.data.MATH_3C["Conder, Jonathan"]);
console.log("++++++++++++")

require("fs").readFile('/Users/seanyeh/tutor.json',"utf-8" ,function (err, data) {
  if (err) throw err;
  if(data.indexOf(className) >= 0){
		if(data.indexOf(prof) >= 0) {
   		console.log(prof + " " + className + " has SI sessions available")
		}
  }
});

