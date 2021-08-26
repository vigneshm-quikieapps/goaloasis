import firestore from "@react-native-firebase/firestore"
import {firebaseConstants} from "../core/constants"

const {USERS_COLLECTION} = firebaseConstants

export const createNewUser = (data, callback) => {
	let createUser = new Promise((resolve, reject) => {
		firestore()
			.collection(USERS_COLLECTION)
			.add(data)
			.then((user) => {
				resolve(user)
			})
			.catch((err) => {
				reject(err)
			})
	})

	createUser
		.then((user) => {
			callback ? callback(user) : null
			console.log("User added!")
		})
		.catch((err) => {
			console.log("createNewUser failed!", err)
		})
}

export const getUserById = async (uid, callback) => {
	let getUser = new Promise(async (resolve, reject) => {
		console.log("uid", uid)
		firestore()
			.collection(USERS_COLLECTION)
			.where("uid", "==", uid)
			.get()
			.then((userObj) => {
				resolve(userObj)
			})
			.catch((err) => {
				reject(err)
			})
	})
	getUser
		.then((userData) => {
			console.log("userData", userData)
			callback(userData)
		})
		.catch((err) => {
			console.log("getUserByID failed!", err)
		})
}
