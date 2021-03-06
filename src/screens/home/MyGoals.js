import React, {useEffect, useContext, useState, useFo} from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	StatusBar,
	ScrollView,
	Dimensions,
	TouchableWithoutFeedback,
	BackHandler,
	TextInput,
	Alert,
} from "react-native"
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons"
import {FontAwesome5} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {connect} from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"
import {getAllGoalsFromFirestore, getGoalsOfCurrentUser} from "../../firebase/goals"

import {
	setTestData,
	setFirstTime,
	setFirstTimeForTimeLine,
	setTestDataForTimeline,
	setClickedGoal,
	setAllGoals,
	setShowLoader,
	setTodaysAllTasks,
} from "./../../redux/actions"
import {
	getClickedGoalFromAsyncStorage,
	getFirstTimeTaskTutorial,
	getFirstTimeTimelineFlow,
} from "../../utils/asyncStorage/goalsAsyncStore"
import {
	ColorConstants,
	commonDateFormat,
	CommonStyles,
	forGoals,
	sizeConstants,
} from "../../core/constants"
import firestore from "@react-native-firebase/firestore"
import {CommonHomeButton} from "../../components/CommonComponents"

const Height = Dimensions.get("window").height
import PushNotification, {Importance} from "react-native-push-notification"
import {GoogleSignin} from "@react-native-google-signin/google-signin"
import auth from "@react-native-firebase/auth"
import dayjs from "dayjs"
var utc = require("dayjs/plugin/utc")
dayjs.extend(utc)
const MyGoals = (props) => {
	const {
		testData,
		setTestData,
		firstTime,
		setFirstTime,
		firstTimeTimelineFlow,
		setFirstTimeForTimeLine,
		setClickedGoal,
		setAllGoals,
		allGoals,
		currentGoal,
		booleanFlag,
		clickedGoal,
		newMileStone,
		setShowLoader,
		loading,
		setTodaysAllTasks,
		user,
	} = props
	const [taskCounter, setTaskCounter] = useState(0)
	const [milestoneTaskCounter, setMilestoneTaskCounter] = useState(0)

	useEffect(() => {
		fetchData()
	}, [testData, firstTime, firstTimeTimelineFlow, allGoals])

	// let checkingIfTimeLineIsFirstTimeOrNot = null
	const fetchData = async () => {
		const data = await getFirstTimeTaskTutorial().catch((err) => console.log(err))
		const data1 = await getFirstTimeTimelineFlow().catch((err) => console.log(err))

		setFirstTime(data)
		setFirstTimeForTimeLine(data1)
	}

	const navigation = useNavigation()

	const handleOpenNewGoal = (task) => {
		getClickedGoalFromAsyncStorage(task).then((data) => {
			let clickedGoalObj = JSON.parse(data)

			setClickedGoal(clickedGoalObj)

			clickedGoalObj && clickedGoalObj.goalMilestone.length
				? navigation.navigate("particulargoal")
				: clickedGoalObj && clickedGoalObj.goalMilestone && navigation.navigate("DParticularGoal")
		})
	}

	const gotoGoal = () => {
		navigation.navigate("addgoal")
		// navigation.navigate("particulargoal")
	}

	const gotoTaskTutorial = () => {
		navigation.navigate("taskTutorialSlide1")
	}
	const gotoTodaysTask = () => {
		getAllTodaysTask()
		navigation.navigate("todaysTask")
	}

	// Navigation for TimelineFlow
	const gotoTimelineTutorial = () => {
		navigation.navigate("timelineFlow1")
	}
	const gotoTimelineScreen = () => {
		navigation.navigate("timeline")
	}

	const getColor = (index) => {
		const a = (index + 1) % 6
		return colorArray[a]
	}

	const colorArray = Object.values(forGoals)

	// console.log("ALL GOALS DATA", allGoals[0].goalMilestone[0].date)
	// var today = new Date(allGoals[0].goalMilestone[0].date)
	// console.log("CURRENT DATE", new Date())
	// console.log("Milestone Date", today)
	// console.log("RESULT", Math.abs(today - new Date()))
	// let milestoneOneTaskData = []

	// const getMilestoneIfTaskIsCompleted = () => {
	// 	var today = dayjs().format(commonDateFormat)
	// 	for (let i = 0; i < allGoals.length; i++) {
	// 		for (let j = 0; j < allGoals[i].goalMilestone.length; j++) {
	// 			if (new Date(allGoals[i].goalMilestone[j].date.date - new Date()) < 86400000) {
	// 				counter++
	// 				console.log("hehehe", allGoals[i].goalMilestone[j].name)
	// 			}
	// 		}
	// 	}
	// }
	// const tempRoute = () => {
	// 	navigation.navigate("Login")
	// }

	const getAllTodaysTask = () => {
		let allTodaysTask = []
		let todayDateStr = dayjs().format(commonDateFormat)
		allGoals.map((goal) => {
			if (goal.goalMilestone.length) {
				goal.goalMilestone.map((mile) => {
					if (mile.taskData.length) {
						mile.taskData.map((task) => {
							let tempDateStr = dayjs(task.date).format(commonDateFormat)

							if (
								tempDateStr === todayDateStr &&
								goal.isCompleted !== true &&
								task.isCompleted !== true
							) {
								let newTaskObj = {
									...task,
									key: `${task.task}_${mile.milestone}_${goal.name}`,
								}
								allTodaysTask.push(newTaskObj)
							}
						})
					}
				})
			}
		})
		setTodaysAllTasks(allTodaysTask)
	}

	let count = 0
	const getTodaysTasks = () => {
		var today = dayjs().format(commonDateFormat)
		for (let i = 0; i < allGoals.length; i++) {
			for (let j = 0; j < allGoals[i].goalMilestone.length; j++) {
				for (let k = 0; k < allGoals[i].goalMilestone[j].taskData.length; k++) {
					if (allGoals[i].goalMilestone[j].taskData.length) {
						let taskDatee = JSON.stringify(allGoals[i].goalMilestone[j].taskData[k].date)

						if (
							taskDatee.match(today) &&
							allGoals[i].isCompleted !== true &&
							allGoals[i].goalMilestone[j].taskData[k].isCompleted !== true
						) {
							// console.log(
							// 	"taskDateeee",
							// 	JSON.stringify(allGoals[i].goalMilestone[j].taskData[0].date)
							// )
							count = count + 1
						}
					}
				}
			}
		}
	}
	// Method to check how many task remain to complete within 48 hours
	let counter = 0
	const getMilestoneIfHasOneTaskToComplete = () => {
		for (let i = 0; i < allGoals.length; i++) {
			for (let j = 0; j < allGoals[i].goalMilestone.length; j++) {
				var milestoneDay = new Date(allGoals[i].goalMilestone[j].date)

				let checkingNegative = milestoneDay.getTime() - new Date().getTime()
				let diffMilliseconds = Math.abs(milestoneDay.getTime() - new Date().getTime())
				let temp = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24))
				if (
					checkingNegative > 0 ||
					dayjs(milestoneDay).format(commonDateFormat) === dayjs().format(commonDateFormat)
				) {
					if (temp <= 2) {
						let taskCout = 0
						for (let k = 0; k < allGoals[i].goalMilestone[j].taskData.length; k++) {
							if (allGoals[i].goalMilestone[j].taskData[k].isCompleted === false) {
								taskCout++
							}
						}
						if (taskCout === 1) {
							counter++
						}
					}
				}
			}
		}
	}

	useEffect(() => {
		// console.log("ALL GOALS", allGoals[0].goalMilestone[0].taskData)
		// allGoals.sort((a, b) => dayjs(a.timeStamp) - dayjs(b.timeStamp))

		getTodaysTasks()
		getMilestoneIfHasOneTaskToComplete()
		setTaskCounter(count)
		setMilestoneTaskCounter(counter)

		//new Added
		getAllTodaysTask()
	}, [allGoals])

	useEffect(() => {
		taskCounter > 0 ? testFunction() : null
	}, [taskCounter])
	useEffect(() => {
		milestoneTaskCounter > 0 ? scheduleNotification() : null
	}, [milestoneTaskCounter])

	const importData = async () => {
		try {
			let keys = await AsyncStorage.getAllKeys()
			keys = keys.filter(
				(item) =>
					item !== "FirsttimeIndividual" &&
					item !== "FirsttimeTaskTutorial" &&
					item !== "FirsttimeTimelineFlow" &&
					item !== "Firsttime" &&
					item !== "currentUser"
			)
			let result = []
			for (const key of keys) {
				const val = await AsyncStorage.getItem(key)
				result.push(JSON.parse(val))
			}
			user &&
				user.uid &&
				getGoalsOfCurrentUser(user.uid, (userGoals) => {
					let result = [...userGoals]

					result.sort((a, b) => dayjs(a.timeStamp) - dayjs(b.timeStamp))

					setAllGoals(result)
					allGoals.map((item) => {
						console.log("====================================")
						console.log("CHRCKING TIMESTAMP", item.timeStamp)
						console.log("====================================")
					})
				})
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		setShowLoader(true)
		importData()
		setShowLoader(false)
	}, [currentGoal, booleanFlag, clickedGoal])

	const getGoalCompletionPercent = (goalObj) => {
		let allMilestonesArrayFromCurrentGoal = [...goalObj.goalMilestone]

		let allMilesLen = allMilestonesArrayFromCurrentGoal.length
		if (!allMilesLen) return 0
		let allCompletedMiles = allMilestonesArrayFromCurrentGoal.filter((mile) => {
			return mile.isCompleted
		})

		let completedMilesLen = allCompletedMiles.length
		let percentCompleted = (completedMilesLen / allMilesLen) * 100

		return parseInt(percentCompleted.toFixed(0))
	}
	// HANDLING BACK BUTTON
	const backActionHandler = () => {
		Alert.alert("Alert!", "Are you sure you want to exit the App?", [
			{
				text: "Cancel",
				onPress: () => null,
				style: "cancel",
			},
			{text: "YES", onPress: () => BackHandler.exitApp()},
		])
		return true
	}
	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backActionHandler)
		return () => BackHandler.removeEventListener("hardwareBackPress", backActionHandler)
	}, [])

	useEffect(() => {
		PushNotification.createChannel(
			{
				channelId: "com.goal-oasis", // (required)
				channelName: "My channel", // (required)
				channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
				playSound: false, // (optional) default: true
				soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
				importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
				vibrate: true, // (optional) default: true. Creates the default vibration patten if true.import TodaysTask from './../TodaysTask/TodaysTask';
			},

			(created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
		)

		PushNotification.configure({
			channelId: "com.goal-oasis",
			// (optional) Called when Token is generated (iOS and Android)
			onRegister: function (token) {
				console.log("TOKEN:", token)
			},

			// (required) Called when a remote is received or opened, or local notification is opened
			onNotification: function (notification) {
				console.log("NOTIFICATION:", notification)

				// process the notification

				// (required) Called when a remote is received or opened, or local notification is opened
				// notification.finish(PushNotificationIOS.FetchResult.NoData)
			},

			// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
			onAction: function (notification) {
				console.log("ACTION:", notification.action)
				console.log("NOTIFICATION:", notification)
			},

			onRegistrationError: function (err) {
				console.error(err.message, err)
			},

			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},
			popInitialNotification: true,

			requestPermissions: true,
		})
		PushNotification.popInitialNotification((notification) => {
			console.log("Initial Notification", notification)
		})
	}, [])

	const testFunction = () => {
		PushNotification.localNotification({
			/* Android Only Properties */
			channelId: "com.goal-oasis", // (required) channelId, if the channel doesn't exist, notification will not trigger.
			ticker: "My Notification Ticker", // (optional)

			/* iOS and Android properties */
			id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
			title: "Todays Tasks", // (optional)
			message: `You have ${taskCounter} task to Complete by Today, All the Best`, // (required)
		})
	}
	// localNotificationSchedule
	const scheduleNotification = () => {
		PushNotification.localNotification({
			channelId: "com.goal-oasis",
			ticker: "My Notification Ticker", // (optional)
			title: "Milestone Tasks",
			message: `You have ${milestoneTaskCounter} Milestone, that has only 1 Tasks Left to complete.`,
			// date: new Date(Date.now() + 60 * 1000), // in 60 secs
			// date: new Date(), // in 60 secs
			// allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
			// repeatType: "day",
			/* Android Only Properties */
			// repeatTime: 3, // (optional) Increment of configured repeateType. Check 'Repeating Notifications' section for more info.
		})
	}

	const handleLogout = () => {
		setShowLoader(true)
		auth()
			.signOut()
			.then(async () => {
				console.log("User signed out!")
				await GoogleSignin.signOut()
				setShowLoader(false)
				navigation.navigate("Login")
			})
	}

	return (
		<StatusBarScreen style={styles.container}>
			<View style={CommonStyles.titleContainer1}>
				<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
					<TouchableOpacity
						style={{flexDirection: "row"}}
						onPress={!firstTime ? gotoTaskTutorial : gotoTodaysTask}
						// onPress={() => {
						// 	!firstTime ? gotoTaskTutorial() : gotoTodaysTask()
						// }}
					>
						<Text style={[CommonStyles.mainTitle, {marginBottom: sizeConstants.twelve}]}>
							Today???s tasks
						</Text>
						<View
							style={{
								width: sizeConstants.twentyFour,
								height: sizeConstants.twentyFour,
								backgroundColor: "red",
								borderRadius: sizeConstants.twentyFour,
								justifyContent: "center",
							}}
						>
							<Text style={{color: "#FFFFFF", alignSelf: "center"}}>{taskCounter}</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
						<AntDesign name="logout" size={24} color={ColorConstants.faintWhite} />
					</TouchableOpacity>
				</View>
			</View>

			{/* <View style={CommonStyles.goalsContainer}>
				<View style={{justifyContent: "center", alignItems: "center"}}>
					<View style={CommonStyles.viewTap}></View>
				</View>

				<View>
					<Text style={CommonStyles.myGoalsText}>My goals</Text>
				</View>
			</View> */}

			<View style={CommonStyles.goalsContainer}>
				<View style={{justifyContent: "center", alignItems: "center"}}>
					<View style={CommonStyles.viewTap}></View>
				</View>

				<View>
					<Text style={CommonStyles.myGoalsText}>My goals</Text>
				</View>

				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: 0,
						marginHorizontal: 0,
					}}
				>
					<View style={CommonStyles.logoSpacing}>
						{allGoals &&
							allGoals.length > 0 &&
							allGoals.map((task, index) => {
								let completedPercent = getGoalCompletionPercent(task)
								console.log("TASKKKKK", task)
								// console.log("TASKKKKK", completedPercent)

								return (
									<View key={index}>
										<TouchableOpacity
											style={CommonStyles.logoContainer}
											onPress={() => {
												task.isCompleted ? null : handleOpenNewGoal(task.name)
											}}
										>
											<ProgressCircle
												percent={task.isCompleted ? 100 : completedPercent}
												radius={sizeConstants.fiftyHalf}
												borderWidth={5}
												color={getColor(index)}
												shadowColor="#999"
												bgColor="#FBF5E9"
											>
												<Text
													style={{
														fontSize: sizeConstants.twentyTwoScale, //25
														color: getColor(index),
														fontWeight: "bold",
														padding: sizeConstants.eight,
														// backgroundColor: "pink",
														// alignSelf: "center",
													}}
												>
													{task.isCompleted ? "100%" : `${completedPercent}%`}
												</Text>
											</ProgressCircle>
											<Text style={[CommonStyles.goalText, {maxWidth: 120}]}>{task.name}</Text>
										</TouchableOpacity>
									</View>
								)
							})}

						<View>
							<TouchableOpacity
								style={CommonStyles.logoContainer}
								onPress={() => {
									if (allGoals.length == 0 || allGoals.length < 6) {
										gotoGoal()
									} else {
										alert("You cannot add more than 6 Goals.")
									}
								}}
							>
								<ProgressCircle
									percent={100}
									radius={sizeConstants.fiftyHalf}
									borderWidth={5}
									color={forGoals.fifth}
									shadowColor="#999"
									bgColor="#FBF5E9"
								>
									<AntDesign name="plus" size={sizeConstants.fiftyFive} color={forGoals.fifth} />
								</ProgressCircle>
								<Text style={CommonStyles.goalText}>Add Goal</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</View>

			<CommonHomeButton
				iconName={"file-tree-outline"}
				size={34}
				click={firstTimeTimelineFlow === null ? gotoTimelineTutorial : gotoTimelineScreen}
				iconColor={ColorConstants.white}
				bgColor={ColorConstants.lighterBlue}
				doNotWorkBackFunctionality={true}
			/>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTime: state.milestone.firstTime,
		firstTimeTimelineFlow: state.milestone.firstTimeTimelineFlow,
		clickedGoal: state.milestone.clickedGoal,
		allGoals: state.milestone.allGoals,
		currentGoal: state.milestone.currentGoal,
		booleanFlag: state.milestone.booleanFlag,
		newMileStone: state.milestone.newMileStone,
		loading: state.milestone.loading,
		user: state.milestone.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		settingFirstTime: (data) => {
			dispatch(setTestData(data))
		},
		setFirstTime: (data) => {
			dispatch(setFirstTime(data))
		},
		setFirstTimeForTimeLine: (data) => {
			dispatch(setFirstTimeForTimeLine(data))
		},

		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},

		setAllGoals: (data) => {
			dispatch(setAllGoals(data))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},

		setTodaysAllTasks: (arr) => {
			dispatch(setTodaysAllTasks(arr))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyGoals)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
	logoutBtn: {
		marginRight: sizeConstants.l,
		alignSelf: "flex-start",
	},
})
