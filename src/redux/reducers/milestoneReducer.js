import * as actionTypes from "../actionTypes"

const initialState = {
	test: "Testing...",
	firstTime: null,
	firstTimeTimelineFlow: null,
	firstTimeIndividual: null,
	newMileStone: [], // similar to state objects in class component
	editMileStone: [],
}

const milestoneReducer = (state = initialState, action) => {
	switch (action.type) {
		// Adding new Milestone

		case actionTypes.ADD_NEW_MILESTONE:
			return {
				...state,
				newMileStone: [
					...state.newMileStone,
					{
						id: Math.random(),
						mileStoneData: action.value,
					},
				],
			}

		case actionTypes.EDIT_MILESTONE:
			return {
				...state,
				editMileStone: action.value,
			}

		// Testing for the first time
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

		case actionTypes.SET_FIRSTTIME_FOR_INDIVIDUAL_GOAL:
			return {
				...state,
				firstTimeIndividual: action.value,
			}
		default:
			return state
	}
}

export default milestoneReducer
