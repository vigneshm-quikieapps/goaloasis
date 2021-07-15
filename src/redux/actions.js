import * as actionTypes from "./actionTypes"

export const addNewMilestone = (milestone) => {
	return {
		type: actionTypes.ADD_NEW_MILESTONE,
		value: milestone,
	}
}

export const setTestData = (data) => {
	return {
		type: actionTypes.SET_TEST_DATA,
		value: data,
	}
}

export const setFirstTime = (data) => {
	return {
		type: actionTypes.SET_FIRSTTIME,
		value: data,
	}
}

// for TimeLine Flow

export const setFirstTimeForTimeLine = (data) => {
	return {
		type: actionTypes.SET_FIRSTTIME_TIMELINEFLOW,
		value: data,
	}
}

export const setTestDataForTimeline = (data) => {
	return {
		type: actionTypes.SET_TEST_DATA_TIMELINE_FLOW,
		value: data,
	}
}
export const setFirstTimeForIndividualGoal = (data) => {
	return {
		type: actionTypes.SET_FIRSTTIME_FOR_INDIVIDUAL_GOAL,
		value: data,
	}
}
