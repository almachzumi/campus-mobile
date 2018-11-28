const AppSettings = require('../AppSettings')

const TutoringService = {
	FetchClasses() {
		return fetch(AppSettings.TUTORING_CLASSES_URL)
			.then(response => response.json())
			.then(responseData => responseData)
			.catch(err => console.log('Error fetching student classes: ' + err))
	}

	FetchTutoring() {
		return fetch(AppSettings.TUTORING_SCHE_URL)
			.then(response => response.json())
			.then(responseData => responseData)
			.catch(err => console.log('Error fetching tutoring schedule: ' + err))
	}
}

export default TutoringService
