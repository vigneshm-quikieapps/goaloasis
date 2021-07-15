import AsyncStorage from "@react-native-community/async-storage"

export const setFirstTimeUser = async () => {
	try {
		await AsyncStorage.setItem("Firsttime", "false")
		console.log("We have set the token for the async storage")
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
