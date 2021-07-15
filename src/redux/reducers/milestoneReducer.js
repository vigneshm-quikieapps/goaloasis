import * as actionTypes from "../actionTypes"

const initialState = {test: "Testing...", firstTime: null, firstTimeTimelineFlow: null}

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
		// for timeline

		// case actionTypes.ADD_NEW_MILESTONE_TIMELINE_FLOW:
		// 	return {
		// 		...state1,
		// 		milestone1: action.value,
		// 	}
		// case actionTypes.SET_TEST_DATA_TIMELINE_FLOW:
		// 	return {
		// 		...state1,
		// 		test1: action.value,
		// 	}
		case actionTypes.SET_FIRSTTIME_TIMELINEFLOW:
			return {
				...state,
				firstTimeTimelineFlow: action.value,
			}
		default:
			return state
	}
}

export default milestoneReducer
