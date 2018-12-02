/*
		Pure javascript implementation of SI sessions and class schedule
		getting connected and parsed through from json endpoints
*/
const TutorAPI = {
	/* TUTOR API WRAPPER */
	tutoringWrapper: (tutoringData, classData) => {
		const dict = this.populateDict(JSON.parse(tutoringData))
		const arr =  this.populateArr(JSON.parse(classData))

		// Add return before getTutorHours
		return this.getTutorHours(dict, arr)
	},

	// Call this from your tutoring session JSON
	populateDict: (str_json) => {
		const dict = []
		for (let key in str_json.data) {
			dict[key.toString()] = str_json.data[key]
		}
		return dict
	},

	// Logic to determine class / tutoring overlapping
	// TODO: change console.log to object building to return
	getTutorHours: (tutorDict, arr) => {
		const arrToReturn = []

		for (let i = 0;  i < arr.length; i++) {
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
						arrToReturn.push(tutoring_data[j])
					}
				}
			}
		}
		return arrToReturn
	},

	populateArr: (jsonData) => {
		const arr = []
		for (var key in jsonData.data) {
			var instructor = jsonData.data[key]['section_data'][0]['instructor_name']
			if (jsonData.data.hasOwnProperty(key)) {
				arr.push(jsonData.data[key].subject_code + '_' + jsonData.data[key].course_code + '___' + instructor)
			}
		}
		return arr
	},
}

export default TutorAPI
