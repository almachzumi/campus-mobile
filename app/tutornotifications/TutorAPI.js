
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = require('request');

// TODO:
// COMENT OUT / REMOVE WHEN SAGA IS DONE
const tutors_url = 'https://s3-us-west-1.amazonaws.com/ucsd-mobile-dev/mock-apis/tutoring/tutors-v2.json';
const classes_url = 'https://okx7bcw5rg.execute-api.us-west-2.amazonaws.com/dev/class_list';

/*
		Pure javascript implementation of SI sessions and class schedule
		getting connected and parsed through from json endpoints
*/

// TODO: Useless when SAGA is implemented
function getAPI() {
	const xmlhttp = new XMLHttpRequest()
	xmlhttp.open('GET', tutors_url, true)
	xmlhttp.send()

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const dict = populateDict(JSON.parse(this.responseText));
			classWithSISession(dict);
		}
	}
}

// TODO: Useless when SAGA is implemented
function classWithSISession(dict) {
	const xmlhttp2 = new XMLHttpRequest()
	xmlhttp2.open('GET', classes_url, true)
	xmlhttp2.send()

	xmlhttp2.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			getTutorHours(dict, populateArr(JSON.parse(this.responseText)))
		}
	}
}

function populateDict(str_json) {
	const dict = []

	for (var key in str_json.data) {
		dict[key.toString()] = str_json.data[key]
	}
	return dict
}

function printDict(dict) {
	for (var key in dict) {
		if (dict.hasOwnProperty(key)) {
			console.log(key, dict[key])
		}
	}
}

function getTutorHours(tutorDict, arr) {
	for (let i = 0; i < arr.length; i++) {
		const curr = arr[i].split('___')
		const instructor = curr[1]
		const class_name = curr[0]

		console.log(class_name + ' has tutoring at:')

		if (!tutorDict[class_name]) {
			console.log(' *** No tutoring sessions set')
		}
		else {
			const class_dict = tutorDict[class_name]
			if (!class_dict[instructor]) {
				console.log(' *** A tutoring session exists for this class, but not this instructor')
			}
			else {
				const tutoring_data = class_dict[instructor]
				console.log(' *** A tutoring session exists for this class, and this instructor')
				for (let j = 0; j < tutoring_data.length; j++) {
					console.log(tutoring_data[j])
				}
			}
		}
		console.log('')
	}
}

function populateArr(jsonData) {
	// var jsonData = str_json.;
	const arr = [];
	for (var key in jsonData.data) {

		let instructor = jsonData.data[key]['section_data'][0]['instructor_name']
		if (jsonData.data.hasOwnProperty(key)) {
				arr.push(jsonData.data[key].subject_code + "_" + jsonData.data[key].course_code
									+ "___" + instructor)
		}
	}
	arr.push('MATH_3C___Tu, Yucheng')
	return arr
}

getAPI()
