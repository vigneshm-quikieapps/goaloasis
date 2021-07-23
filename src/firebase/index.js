import {addGoalDataToAsyncStorage, deleteGoalDataFromAsyncStorage} from "./../utils/asyncStorage"
import firestore from "@react-native-firebase/firestore"
import {firebaseConstants} from "./../core/styles"

const {GOALS_COLLECTION} = firebaseConstants

// Get All Goal Operation
export const getAllGoalsFromFirestore = () => {
	var allGoals = null
	let getAllGoals = new Promise((resolve, reject) => {
		const allGoals = firestore()
			.collection(GOALS_COLLECTION)
			.get()
			.then(() => {
				resolve(allGoals)
			})
			.catch((err) => {
				reject(err)
			})
	})

	getAllGoals
		.then((data) => {
			allGoals = data
		})
		.catch((err) => {
			console.log("get all goals err", err)
		})
	if (allGoals) return allGoals
}

// Goal Delete Operation
export const deleteGoalFromFirestore = (target) => {
	let targetObj = JSON.parse(target)
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
		})
		.catch((err) => {
			console.log("FB async delete error: ", err)
		})
}

// Goal Add Operation
export const addGoalToFirestore = (data) => {
	let addGoal = new Promise((resolve, reject) => {
		firestore()
			.collection(GOALS_COLLECTION)
			.add(data)
			.then((docRef) => {
				let id = docRef._documentPath._parts[1]
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
		})
		.catch((err) => {
			console.log("FB async goal add error", err)
		})
}

export const addMilestoneToFirestore = (target, milestoneArr) => {
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
		})
		.catch((err) => {
			console.log("FB error", err)
		})
}
