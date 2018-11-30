/*
		Pure javascript implementation of SI sessions and class schedule
		getting connected and parsed through from json endpoints
*/
const TutorAPI = {
	/* TUTOR API WRAPPER */
	tutoringWrapper : function(tutoringData, classData) {
			var dict = populateDict(JSON.parse(tutoringData));
			//var arr =  populateArr(JSON.parse(classData));
			//Add return before getTutorHours

			getTutorHours(dict, arr);
	},

	//Call this from your tutoring session JSON
	populateDict : function(str_json) {
			var dict = [];
			console.log('Went into tutorDict')
			for (var key in str_json.data) {
					dict[key.toString()] = str_json.data[key];
			}
			return dict;
	},

	//Logic to determine class / tutoring overlapping
	//TODO: change console.log to object building to return
	getTutorHours : function(tutorDict, arr) {

			var strToAlert = "";
			for (var i = 0 ; i < arr.length; i++) {
					var curr = arr[i].split("___");
					var instructor = curr[1];
					var class_name = curr[0]

					console.log(class_name + " has tutoring at:")

					if (!tutorDict[class_name]) {
							console.log(" *** No tutoring sessions set");
					}
					else {
							var class_dict = tutorDict[class_name];
							if (!class_dict[instructor]) {
									console.log(" *** A tutoring session exists for this class, but not this instructor");
							}
							else {
								var tutoring_data = class_dict[instructor];
								console.log(" *** A tutoring session exists for this class, and this instructor");
								for (var j = 0; j < tutoring_data.length; j++) {
										console.log(tutoring_data[j]);
								}
							}
					}
					console.log("");
			}
			//Add return with data structure
	},

	populateArr : function(jsonData) {
		//var jsonData = str_json.;
		var arr = [];
		console.log('JsonData: ' + jsonData.data)
		for (var key in jsonData.data) {
			console.log('Inside for loop')
			var instructor = jsonData.data[key]["section_data"][0]["instructor_name"];
			console.log('The result of instructor' + instructor)
			if (jsonData.data.hasOwnProperty(key)) {
					arr.push(jsonData.data[key].subject_code + "_" + jsonData.data[key].course_code
										+ "___" + instructor);
			}
		}
		console.log(arr)
		//arr.push("MATH_3C___Tu, Yucheng");
		return arr;
	},


	/** LEGACY CODE FOR TESTING / DEVELOPMENT **/
	// TODO:
	//COMMENT OUT / REMOVE WHEN SAGA IS DONE
	/*const tutors_url = "https://s3-us-west-1.amazonaws.com/ucsd-mobile-dev/mock-apis/tutoring/tutors-v2.json";
	const classes_url = "https://okx7bcw5rg.execute-api.us-west-2.amazonaws.com/dev/class_list";

	//Print function
	function printDict(dict) {
			for (var key in dict) {
			    if (dict.hasOwnProperty(key)) {
			        console.log(key, dict[key]);
			    }
			}
	}

	//Import tutor JSON data
	function getAPI() {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", tutors_url, true);
			xmlhttp.send();

			xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
							var dict = populateDict(JSON.parse(this.responseText));
							classWithSISession(dict);
			    }
			};
	}

	//Import class JSON data
	function classWithSISession(dict){
			var xmlhttp2 = new XMLHttpRequest();
			xmlhttp2.open("GET", classes_url, true);
			xmlhttp2.send();

			xmlhttp2.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
						getTutorHours(dict, populateArr(JSON.parse(this.responseText)));
				}
		};
	}*/
}

export default TutorAPI

//getAPI();
