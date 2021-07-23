import AsyncStorage from "@react-native-community/async-storage"
import {useDispatch} from "react-redux"
import {setClickedGoal} from "../redux/actions"

export const setFirstTimeUser = async () => {
	try {
		await AsyncStorage.setItem("Firsttime", "false")
	} catch (error) {
		console.log(error.message)
	}
}

export const getFirstTimeUser = async (key) => {
	try {
		console.log("KEY--->", key)
		const value = await AsyncStorage.getItem("Firsttime")
		console.log("Getting the item from the async storage")
		console.log("Value", value)
		return value !== null ? value : null
	} catch (error) {
		console.log(error.message)
	}
}

export const setisFirstTimeTaskTutorial = async () => {
	try {
		await AsyncStorage.setItem("FirsttimeTaskTutorial", "visited")
	} catch (error) {
		console.log(error.message)
	}
}

export const getFirstTimeTaskTutorial = async (key) => {
	try {
		const value = await AsyncStorage.getItem("FirsttimeTaskTutorial")
		return value
	} catch (error) {
		console.log(error.message)
	}
}

// for TimeLine
export const setisFirstTimeTimelineFlow = async () => {
	try {
		await AsyncStorage.setItem("FirsttimeTimelineFlow", "visited")
		console.log("FirsttimeTimelineFlow visited")
	} catch (error) {
		console.log(error.message)
	}
}

export const getFirstTimeTimelineFlow = async (key) => {
	try {
		const value = await AsyncStorage.getItem("FirsttimeTimelineFlow")
		return value
	} catch (error) {
		console.log(error.message)
	}
}

export const setisFirstTimeIndividual = async () => {
	try {
		await AsyncStorage.setItem("FirsttimeIndividual", "visited")
	} catch (error) {
		console.log(error.message)
	}
}

export const getFirstTimeIndividual = async (key) => {
	try {
		const value = await AsyncStorage.getItem("FirsttimeIndividual")
		return value
	} catch (error) {
		console.log(error.message)
	}
}

export const addGoalDataToAsyncStorage = async (data) => {
	try {
		let stringObj = JSON.stringify(data)
		await AsyncStorage.setItem(data.name, stringObj)
		console.log("Async goal: ", stringObj)
	} catch (error) {
		console.log(error.message)
	}
}

export const deleteGoalDataFromAsyncStorage = async (id) => {
	try {
		await AsyncStorage.removeItem(id)
		console.log("Removed from Async Storage: ", id)
	} catch (error) {
		console.log(error.message)
	}
}

export const getClickedGoalFromAsyncStorage = async (key) => {
	let value = null
	try {
		value = await AsyncStorage.getItem(key)
		return value
	} catch (error) {
		console.log(error.message)
	}
	return value !== null ? value : ""
}

// for handling the milestone Data
// export const getMileStoneData = (async = (data) => {
// 	try {
// 		value = await AsyncStorage.setItem(data)
// 		return value
// 	} catch (error) {
// 		console.log(error.message)
// 	}
// })
