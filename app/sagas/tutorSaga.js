import { delay } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import Toast from 'react-native-simple-toast'
import TutorAPI from '../tutornotifications/TutorAPI.js'
import TutorService from '../services/tutoringService.js'
// import { authorizedFetch } from '../util/auth'

import logger from '../util/logger'
import { TUTOR_SAGA_TTL } from '../AppSettings'

const getSchedule = state => (state.schedule)
const getUserData = state => (state.user)
const getTutor = state => (state.tutor)

function* updateNotification() {
 	while (true) {
 		try {
 			yield put({ type: 'SEND_TUTOR_NOTIFICATION' })
 		} catch (err) {
 			console.log(err)
 		}
 		yield delay(TUTOR_SAGA_TTL)
 }
}

function* sendTutorNotification() {
	console.log('attempted send notification')
	Toast.showWithGravity(
		'will have message send out here',
		Toast.LONG,
		Toast.BOTTOM
	)

	const { data } = yield select(getSchedule)
	const { isLoggedIn, profile } = yield select(getUserData)
	const { lastUpdated } = yield select(getTutor)
	const { subscribedTopics } = profile

	console.log(isLoggedIn)
	console.log(data)
	console.log(subscribedTopics)


	//if (!isLoggedIn) return

	// continue if user subscribed to topic
	//if (!subscribedTopics.contains('tutoring')) return

	// continue if schedule is empty or last update is longer than TUTOR_SAGA_TTL
	/*
	if (data != null && lastUpdated < TUTOR_SAGA_TTL) return

	const userEmail = profile.username + '@ucsd.edu'  // change how to set email
	*/
	const sessionList = []
	const tutorData = yield call(TutorService.FetchTutoring)

	TutorAPI.tutoringWrapper(tutorData, data);








	//TESTING
	console.log(tutorData)
	const tutorDict = TutorAPI.(tutorData)
	//console.log(tutorDict)
	console.log(tutorDict)
	//for(var key in tutorDict)
	//{
	//	console.log(key)
	//}

	// todo: get all tutor session for this student and push into sessionList

	sessionList.push()

	for (let i = 0; i < sessionList.length; i++) {
		const messageContent = 'A tutoring session for your class is about to begin! Come to ' + sessionList[i].building +
		' ' + sessionList[i].room + ' at ' + sessionList[i].time + ' for your ' + sessionList[i].course + ' session'
		const message = {
			to: {
				users: [
					userEmail
				]
			},
			body: {
				title: 'Upcoming SI sessions',
				message: messageContent,
				data: {}
			}
		}
		try {
			// const messageID = JSON.parse(yield authorizedFetch(AppSettings.MYMESSAGES_API_URL, message))
			console.log(message)

			Toast.showWithGravity(
				messageContent,
				Toast.LONG,
				Toast.BOTTOM
			)
		} catch (err) {
			logger.trackException(err, false)
		}
	}
	yield put({ type: 'SET_TUTOR' })
}

function* tutorSaga() {
	yield takeLatest('SEND_TUTOR_NOTIFICATION', sendTutorNotification)
	 yield call(updateNotification)
}

export default tutorSaga
