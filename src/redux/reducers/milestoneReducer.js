import * as actionTypes from "../actionTypes"

const initialState = {test: "Testing...", firstTime: null}

const milestoneReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_NEW_MILESTONE:
			return {
				...state,
				milestone: action.value,
			}
		case actionTypes.SET_TEST_DATA:
			return {
				...state,
				test: action.value,
			}
		case actionTypes.SET_FIRSTTIME:
			return {
				...state,
				firstTime: action.value,
			}
		default:
			return state
	}
}

export default milestoneReducer
