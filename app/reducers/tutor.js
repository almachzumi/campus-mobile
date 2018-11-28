const initialState = {
	lastUpdated: new Date().getTime(),
}

function tutor(state = initialState, action) {
	const newState = { ...state }

	switch (action.type) {
		case 'SET_TUTOR':
			newState.lastUpdated = new Date().getTime()
			return newState
		default:
			return state
	}
}

module.exports = tutor
