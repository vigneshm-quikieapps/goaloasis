import AsyncStorage from "@react-native-community/async-storage"

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
