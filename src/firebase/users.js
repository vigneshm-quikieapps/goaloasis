import firestore from "@react-native-firebase/firestore"
import {firebaseConstants} from "../core/constants"
import {addCurrentUserToAsyncStorage} from "../utils/asyncStorage/usersAsyncStore"

const {USERS_COLLECTION} = firebaseConstants

export const createNewUser = (data, callback) => {
	let createUser = new Promise((resolve, reject) => {
		firestore()
			.collection(USERS_COLLECTION)
			.add(data)
			.then((user) => {
				resolve(data)
			})
			.catch((err) => {
				reject(err)
			})
	})

	createUser
		.then((user) => {
			callback ? callback(user) : null
			console.log("checking user: ", user)
			addCurrentUserToAsyncStorage(user)
			console.log("User added!")
		})
		.catch((err) => {
			console.log("createNewUser failed!", err)
		})
}

export const getUserById = async (uid, callback) => {
	let getUser = new Promise(async (resolve, reject) => {
		console.log("uid", uid)
		try {
			let snapshot = await firestore().collection(USERS_COLLECTION).where("uid", "==", uid).get()
			let allUsers = []
			snapshot.forEach((user) => {
				allUsers.push(user.data())
			})
			resolve(allUsers)
		} catch (err) {
			reject(err)
		}
	})
	getUser
		.then((userData) => {
			callback(userData)
		})
		.catch((err) => {
			console.log("getUserByID failed!", err)
		})
}
