import * as actionTypes from "./actionTypes"

// Adding new Milestone
export const addNewMilestone = (newMilestone) => {
	return {
		type: actionTypes.ADD_NEW_MILESTONE,
		value: newMilestone,
	}
}

export const EditNewMilestone = (editMilestone) => {
	return {
		type: actionTypes.EDIT_MILESTONE,
		value: editMilestone,
	}
}

// For testing the first time User
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
