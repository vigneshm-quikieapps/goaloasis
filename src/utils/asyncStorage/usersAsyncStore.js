import AsyncStorage from "@react-native-community/async-storage"

export const getCurrentUserFromAsyncStorage = async () => {
	let value = null
	try {
		value = await AsyncStorage.getItem("currentUser")
		return value
	} catch (error) {
		console.log(error.message)
	}
	return value !== null ? value : ""
}

export const addCurrentUserToAsyncStorage = async (user) => {
	try {
		let stringObj = JSON.stringify(user)
		await AsyncStorage.setItem("currentUser", stringObj)
		console.log("Current User added to Async Storage: ", stringObj)
	} catch (error) {
		console.log(error.message)
	}
}

export const removeCurrentUserFromAsyncStorage = async () => {
	try {
		await AsyncStorage.removeItem("currentUser")
		console.log("Removed Current User from Async Storage: ", uid)
	} catch (error) {
		console.log(error.message)
	}
}
