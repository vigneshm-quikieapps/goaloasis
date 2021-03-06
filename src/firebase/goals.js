import {
	addGoalDataToAsyncStorage,
	deleteGoalDataFromAsyncStorage,
} from "../utils/asyncStorage/goalsAsyncStore"
import firestore from "@react-native-firebase/firestore"
import {firebaseConstants} from "../core/constants"
import dayjs from "dayjs"

const {GOALS_COLLECTION} = firebaseConstants

export const getGoalsOfCurrentUser = (userId, callback) => {
	let userGoals = new Promise(async (resolve, reject) => {
		console.log("userId", userId)
		try {
			let snapshot = await firestore()
				.collection(GOALS_COLLECTION)
				.where("userId", "==", userId)
				.get()
			let allGoals = []
			snapshot.forEach((goal) => {
				allGoals.push(goal.data())
			})
			resolve(allGoals)
		} catch (err) {
			reject(err)
		}
	})
	userGoals
		.then((goalData) => {
			callback(goalData)
			console.log("getGoalsOfCurrentUser success!")
		})
		.catch((err) => {
			console.log("getGoalsOfCurrentUser failed!", err)
		})
}

// Get All Goal Operation
export const getAllGoalsFromFirestore = (callback) => {
	var AllGoalArr = []
	let getAllGoals = new Promise(async (resolve, reject) => {
		firestore()
			.collection("Goals")
			.get()
			.then((querySnapshot) => {
				// console.log("All Goals length", querySnapshot.size)
				querySnapshot.forEach((documentSnapshot) => {
					AllGoalArr.push(documentSnapshot.data())
				})
				// console.log("All Goals ", AllGoalArr)
				resolve(AllGoalArr)
			})
			.catch((err) => {
				reject(err)
			})
	})
	getAllGoals
		.then((data) => {
			// console.log("Goals from firestore: ", data)
			callback ? callback(data) : null
		})
		.catch((err) => {
			console.log("get all goals err", err)
		})
}

// Goal Delete Operation
export const deleteGoalFromFirestore = (target, callback) => {
	let targetObj = target
	let deleteGoal = new Promise((resolve, reject) => {
		firestore()
			.collection(GOALS_COLLECTION)
			.doc(targetObj.id)
			.delete()
			.then(() => {
				resolve(targetObj)
			})
			.catch((err) => {
				reject(err)
			})
	})

	deleteGoal
		.then((deleted) => {
			deleteGoalDataFromAsyncStorage(deleted.name)
			callback ? callback() : null
		})
		.catch((err) => {
			console.log("FB async delete error: ", err)
		})
}

// Goal Add Operation
export const addGoalToFirestore = (data, callback) => {
	// console.log("Firebase Data 1", data)
	let addGoal = new Promise((resolve, reject) => {
		firestore()
			.collection(GOALS_COLLECTION)
			.add(data)
			.then((docRef) => {
				let id = docRef._documentPath._parts[1]
				console.log("id", id)

				let obj = {
					...data,
					id: id,
				}
				resolve(obj)
			})
			.catch((err) => {
				reject(err)
			})
	})
	addGoal
		.then((Obj) => {
			addGoalDataToAsyncStorage(Obj) // adding data to Async Storage
			console.log("FB obj added to async", Obj)
			callback ? callback(Obj) : null
		})
		.catch((err) => {
			console.log("FB async goal add error", err)
		})
}

// goal Update Operation
export const updateGoalToFirestore = (data, oldId = null, callback) => {
	let targetObj = data

	let addGoal = new Promise((resolve, reject) => {
		firestore()
			.collection(GOALS_COLLECTION)
			.doc(targetObj.id)
			.update(targetObj)
			.then(() => {
				resolve(targetObj)
			})
			.catch((err) => {
				reject(err)
			})
	})
	addGoal
		.then((Obj) => {
			if (oldId == null) {
				// adding data to Async Storage
				addGoalDataToAsyncStorage(Obj).then(() => {
					console.log("FB obj added to async", Obj)
					callback ? callback() : null
				})
			} else {
				deleteGoalDataFromAsyncStorage(oldId).then(() => {
					// adding data to Async Storage
					addGoalDataToAsyncStorage(Obj).then(() => {
						console.log("FB obj added to async", Obj)
						callback ? callback() : null
					})
				})
			}
		})
		.catch((err) => {
			console.log("FB async goal add error", err)
		})
}

export const addMilestoneToFirestore = (target, milestoneArr, callback) => {
	// let targetObj = JSON.parse(target)
	console.log("taskItem.date = tomorrow", milestoneArr[0])
	let targetObj = target
	let updatedObj = {
		...targetObj,
		goalMilestone: milestoneArr,
	}
	let addMiletonesToGoal = new Promise((resolve, reject) => {
		firestore()
			.collection(GOALS_COLLECTION)
			.doc(targetObj.id)
			.update(updatedObj)
			.then(() => {
				resolve(updatedObj)
			})
			.catch((err) => {
				reject(err)
			})
	})
	addMiletonesToGoal
		.then((updated) => {
			addGoalDataToAsyncStorage(updated) // adding data to Async Storage//TODO update redux for clicked goals
			console.log("FB milestone updated", updated)
			callback ? callback() : null
		})
		.catch((err) => {
			console.log("FB error", err)
		})
}
