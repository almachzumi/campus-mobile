// import { delay } from 'redux-saga'
import { /* call,*/ put, select, takeLatest } from 'redux-saga/effects'
import Toast from 'react-native-simple-toast'
// import TutorAPI_React from 'TutorAPI_React'
// import { authorizedFetch } from '../util/auth'

import logger from '../util/logger'
import { TUTOR_SAGA_TTL } from '../AppSettings'

const getSchedule = state => (state.schedule)
const getUserData = state => (state.user)
const getTutor = state => (state.tutor)

const dayMapping = {
	MO: 1,
	TU: 2,
	WE: 3,
	TH: 4,
	FR: 5,
	SA: 6,
	SU: 0
}

function getNextSessionTime(session, curTime) {
	const hr = session.time.substring(0,2)
	const min = session.time.substring(3,5)
	const curDay = new Date().getDay()
	const wishDay = dayMapping[session.days]
	const diffDay = (wishDay + 7) - curDay
	const resDate = new Date(curTime + (diffDay * 86400000))
	resDate.setHours(hr)
	resDate.setMinutes(min)
	resDate.setSeconds(0)
	resDate.setMilliseconds(0)
	let resTime = resDate.getTime()
	if (resTime - (7 * 86400000) > curTime) {
		resTime -= 7 * 86400000
	}
	session.nextSessionTime = resTime
	return session
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
	const { sessions } = yield select(getTutor)
	const { subscribedTopics } = profile

	console.log(isLoggedIn)
	console.log(data)
	console.log(subscribedTopics)

	if (!isLoggedIn) return

	// continue if user subscribed to topic
	if (!subscribedTopics.contains('tutoring')) return

	const userEmail = profile.username + '@ucsd.edu'  // change how to set email

	const sessionList = {}
	// todo: get all tutor session for this student and push into sessionList

	const curTime = new Date().getTime()

	const newSessionList = {}
	for (const key in sessionList) {
		if (sessions.hasOwnProperty(key)) {
			newSessionList[key] = sessions[key]
		} else {
			newSessionList[key] = getNextSessionTime(sessionList[key], curTime)
		}
	}

	for (const key in newSessionList) {
		if (curTime + TUTOR_SAGA_TTL >= newSessionList[key].nextSessionTime) {
			const messageContent = 'A tutoring session for your class is about to begin! Come to ' + newSessionList[key].building +
			' ' + newSessionList[key].room + ' at ' + newSessionList[key].time + ' for your ' + newSessionList[key].subject + newSessionList[key].course + ' session'

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

			newSessionList[key].nextSessionTime += 7 * 86400000
		}
		yield put({ type: 'SET_TUTOR' , sessions: newSessionList })
	}
}

function* tutorSaga() {
	yield takeLatest('SEND_TUTOR_NOTIFICATION', sendTutorNotification)
	// yield call(updateNotification)
}

export default tutorSaga
