import { delay } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import Toast from 'react-native-simple-toast'
import TutorAPI from '../tutornotifications/TutorAPI'
import TutorService from '../services/tutoringService'
// import { authorizedFetch } from '../util/auth'

import logger from '../util/logger'
import { TUTOR_SAGA_TTL } from '../AppSettings'

const getSchedule = state => (state.schedule)
const getUserData = state => (state.user)
const getTutor = state => (state.tutor)

function* updateNotification() {
	while (true) {
		console.log('updateNotification--------------------------------------------------')

		try {
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

			if (!isLoggedIn) return

			// continue if user subscribed to topic
			if (!subscribedTopics.contains('tutoring')) return

			// continue if schedule is empty or last update is longer than TUTOR_SAGA_TTL
			if (data != null && lastUpdated < TUTOR_SAGA_TTL) return

			const tutorData = yield call(TutorService.FetchTutoring)
			const sessionList = TutorAPI.tutoringWrapper(tutorData, data)


			// TESTING
			console.log('tutorData-----------------------------------------')
			console.log(tutorData)
			console.log('sessionList-----------------------------------------')
			console.log(sessionList)
		} catch (err) {
			console.log('errn-----------------------------------')
			console.log(err)
		}
		yield delay(TUTOR_SAGA_TTL)
	}
}

function* tutorSaga() {
	yield call(updateNotification)
}

export default tutorSaga
