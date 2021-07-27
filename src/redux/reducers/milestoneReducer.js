import * as actionTypes from "../actionTypes"

const initialState = {
	test: "Testing...",
	firstTime: null,
	firstTimeTimelineFlow: null,
	firstTimeIndividual: null,
	newMileStone: [], // similar to state objects in class component
	editMileStone: [],
	currentGoal: {},
	clickedGoal: {},
	taskFlowData: [],
	clickedMilestone: "",
	allGoals: [],
}

console.log("NEW MILESTONE DATA", initialState.newMileStone)
const milestoneReducer = (state = initialState, action) => {
	console.log("ACTION FROM THE ACTION FILE", action)
	switch (action.type) {
		// Adding new Milestones
		// case actionTypes.ADD_NEW_MILESTONE:
		// 	return {
		// 		...state,
		// 		newMileStone: [
		// 			...state.newMileStone,
		// 			{
		// 				goalName: action.value,
		// 				mileStoneData: action.value,
		// 			},
		// 		],
		// 	}
		case actionTypes.ADD_NEW_MILESTONE:
			console.log("adding new milestone", action.value)
			return {
				...state,
				newMileStone: action.value,
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
		case actionTypes.SET_CURRENT_GOAL:
			return {
				...state,
				currentGoal: action.value,
			}

		// for current goal

		case actionTypes.SET_CLICKED_GOAL:
			return {
				...state,
				clickedGoal: action.value,
			}

		// for Task Flow

		case actionTypes.SET_CLICKED_MILESTONE:
			return {
				...state,
				clickedMilestone: action.value,
			}

		case actionTypes.SET_TASK_FLOW_DATA:
			return {
				...state,
				taskFlowData: [
					...state.taskFlowData,
					{
						goalName: action.value,
						mileStoneData: action.value,
						taskFlowData: action.value,
					},
				],
			}
		case actionTypes.SET_ALL_GOALS:
			return {
				...state,
				allGoals: action.value,
			}
		default:
			return state
	}
}

export default milestoneReducer
