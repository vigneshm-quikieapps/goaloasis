import {addGoalDataToAsyncStorage, deleteGoalDataFromAsyncStorage} from "./../utils/asyncStorage"
import firestore from "@react-native-firebase/firestore"
import {firebaseConstants} from "./../core/styles"
import {setAllGoals} from "../redux/actions"

const {GOALS_COLLECTION} = firebaseConstants

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
			callback ? callback() : null
		})
		.catch((err) => {
			console.log("FB async goal add error", err)
		})
}

// goal Update Operation
export const updateGoalToFirestore = (data, callback) => {
	let targetObj = data
	let updatedObj = {
		...targetObj,
		isCompleted: true,
	}
	let addGoal = new Promise((resolve, reject) => {
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
	addGoal
		.then((Obj) => {
			addGoalDataToAsyncStorage(Obj) // adding data to Async Storage
			console.log("FB obj added to async", Obj)
			callback ? callback() : null
		})
		.catch((err) => {
			console.log("FB async goal add error", err)
		})
}

export const addMilestoneToFirestore = (target, milestoneArr, navigationCallback) => {
	// let targetObj = JSON.parse(target)
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
			navigationCallback ? navigationCallback() : null
		})
		.catch((err) => {
			console.log("FB error", err)
		})
}
