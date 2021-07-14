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
