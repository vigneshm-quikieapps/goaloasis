import AsyncStorage from "@react-native-community/async-storage"

export const setFirstTimeUser = async () => {
	try {
		await AsyncStorage.setItem("Firsttime", "false")
		console.log("DONE")
	} catch (error) {
		console.log(error.message)
	}
}

export const getFirstTimeUser = async (key) => {
	try {
		const value = await AsyncStorage.getItem("Firsttime")
		console.log("VALue", value)
		return value !== null ? value : null
	} catch (error) {
		console.log(error.message)
	}
}
