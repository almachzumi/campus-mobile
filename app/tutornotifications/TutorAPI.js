
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request  = require('request');

const tutors_url = "https://s3-us-west-1.amazonaws.com/ucsd-mobile-dev/mock-apis/tutoring/tutors-v2.json";
const classes_url = "https://okx7bcw5rg.execute-api.us-west-2.amazonaws.com/dev/class_list";


/*
		Pure javascript implementation of SI sessions and class schedule
		getting connected and parsed through from json endpoints
*/

function getAPI() {

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", tutors_url, true);
		xmlhttp.send();

		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
						var dict = populateDict(JSON.parse(this.responseText));
						//printDict(dict);
						classWithSISession(dict);
		    }
		};
}

function populateDict(str_json) {
		var dict = [];

		for (var key in str_json.data) {
		    if (str_json.data.hasOwnProperty(key)) {
						var arr = [];
						for (var key2 in str_json.data[key]) {
								arr.push(str_json.data[key][key2]);
						}
		    }
				console.log(key.toString());
				dict[key.toString()] = arr;

		}

		return dict;
}

function printDict(dict) {
		for (var key in dict) {
		    if (dict.hasOwnProperty(key)) {
		        console.log(key, dict[key]);
		    }
		}
}

function getTutorHours(tutorDict, arr) {
		//console.log(tutorDict["MATH_2"]);

		//var keys = Object.keys(tutorDict);
		//console.log(keys);

		for (var i = 0 ; i < arr.length; i++) {
				console.log(arr[i] + " has tutoring at....")
				if (!tutorDict[arr[i]]) {
						console.log("		No tutoring sessions set");
				}
				else {
						console.log(tutorDict[arr[i]]);
				}
		}

}

function classWithSISession(dict){
	//request gets the JSON object in a string format
	request(classes_url),
			function (error, response, body) {
			if (!error && response.statusCode == 200) {
					//creating a new variable called data, that contains the JSON object after the string is converted
					var jsonData = JSON.parse(body);
					//this section needs to be in a for loop, as we will add all the courses and professors which will
					//have an SI session matching the student's schedule
					var arr = [];
					for (var key in jsonData.data) {
						if (jsonData.data.hasOwnProperty(key)) {
								arr.push(jsonData.data[key].subject_code + "_" + jsonData.data[key].course_code);
						}
					}
					getTutorHours(dict, arr);

					return null;
			}
	});
}

getAPI();
