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
import Spinner from "./../../core/Spinner"
import {getAllGoalsFromFirestore} from "./../../firebase/index"

import {
	setTestData,
	setFirstTime,
	setFirstTimeForTimeLine,
	setTestDataForTimeline,
	setClickedGoal,
	setAllGoals,
	setShowLoader,
	setHideLoader,
} from "./../../redux/actions"
import {
	getClickedGoalFromAsyncStorage,
	getFirstTimeTaskTutorial,
	getFirstTimeTimelineFlow,
} from "./../../utils/asyncStorage"
import {ColorConstants, CommonStyles, forGoals, sizeConstants} from "./../../core/styles"
import firestore from "@react-native-firebase/firestore"
import {CommonHomeButton} from "../../core/CommonComponents"
const Height = Dimensions.get("window").height
import PushNotification, {Importance} from "react-native-push-notification"

const MyGoals = ({
	testData,
	setTestData,
	firstTime,
	setFirstTime,
	firstTimeTimelineFlow,
	setClickedGoal,
	setAllGoals,
	allGoals,
	currentGoal,
	booleanFlag,
	clickedGoal,
	newMileStone,
	setShowLoader,
	setHideLoader,
	loading,
}) => {
	const [taskCounter, setTaskCounter] = useState(0)

	useEffect(() => {
		fetchData()
	}, [testData, firstTime, firstTimeTimelineFlow, allGoals])
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
				: navigation.navigate("DParticularGoal")
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

	var today = new Date()
	var dd = String(today.getDate()).padStart(2, "0")
	var mm = String(today.getMonth() + 1).padStart(2, "0")
	var yyyy = today.getFullYear()

	today = yyyy + "-" + mm + "-" + dd
	console.log("loadinggggggg", loading)
	// console.log("TODAYS DATE", today)
	let count = 0

	const getTodaysTasks = () => {
		for (let i = 0; i < allGoals.length; i++) {
			for (let j = 0; j < allGoals[i].goalMilestone.length; j++) {
				for (let k = 0; k < allGoals[i].goalMilestone[j].taskData.length; k++) {
					if (allGoals[i].goalMilestone[j].taskData.length) {
						let taskDatee = JSON.stringify(allGoals[i].goalMilestone[j].taskData[k].date)

						if (taskDatee.match(today)) {
							console.log(
								"taskDateeee",
								JSON.stringify(allGoals[i].goalMilestone[j].taskData[0].date)
							)
							count = count + 1
						}
					}
				}
			}
		}
	}

	useEffect(() => {
		getTodaysTasks()
		setTaskCounter(count)
	}, [allGoals])

	const importData = async () => {
		try {
			let keys = await AsyncStorage.getAllKeys()
			keys = keys.filter(
				(item) =>
					item !== "FirsttimeIndividual" &&
					item !== "FirsttimeTaskTutorial" &&
					item !== "FirsttimeTimelineFlow" &&
					item !== "Firsttime"
			)
			let result = []
			for (const key of keys) {
				const val = await AsyncStorage.getItem(key)
				result.push(JSON.parse(val))
			}

			setAllGoals(result)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		setShowLoader(true)

		importData()

		setHideLoader(false)
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
		// Add event listener for hardware back button press on Android
		BackHandler.addEventListener("hardwareBackPress", backActionHandler)

		return () =>
			// clear/remove event listener
			BackHandler.removeEventListener("hardwareBackPress", backActionHandler)
	}, [])

	useEffect(() => {
		PushNotification.localNotificationSchedule({
			message: `You have ${taskCounter} task to complete Today`,
			date: new Date(Date.now() + 60 * 1000), // in 60 secs
			allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

			/* Android Only Properties */
			repeatTime: 5, // (optional) Increment of configured repeateType. Check 'Repeating Notifications' section for more info.
		})
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
		testFunction()
	}, [])
	const testFunction = () => {
		PushNotification.localNotification({
			/* Android Only Properties */
			channelId: "com.goal-oasis", // (required) channelId, if the channel doesn't exist, notification will not trigger.
			ticker: "My Notification Ticker", // (optional)

			/* iOS and Android properties */
			id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
			title: "Todays Tasks", // (optional)
			message: `You have ${taskCounter} task to Complete by Today, ALL THE BEST`, // (required)
		})
	}
	return (
		<StatusBarScreen style={styles.container}>
			<TouchableOpacity
				style={CommonStyles.titleContainer1}
				onPress={!firstTime ? gotoTaskTutorial : null}
			>
				<View style={{flexDirection: "row"}}>
					<Text style={[CommonStyles.mainTitle, {marginBottom: sizeConstants.twelve}]}>
						Today’s tasks
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
				</View>
			</TouchableOpacity>

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
				{loading ? <Spinner /> : null}

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

								return (
									<View key={index}>
										<TouchableOpacity
											style={CommonStyles.logoContainer}
											onPress={() => {
												task.isCompleted || completedPercent == 100
													? null
													: handleOpenNewGoal(task.name)
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
												<Text style={{fontSize: 25, color: getColor(index), fontWeight: "bold"}}>
													{task.isCompleted ? "100%" : `${completedPercent}%`}
												</Text>
											</ProgressCircle>
											<Text style={CommonStyles.goalText}>{task.name}</Text>
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

				{/* <View style={CommonStyles.bottomBtnContainer}>
					<TouchableOpacity
						style={CommonStyles.bottomBtn2}
						// onPress={!firstTimeTimelineFlow ? gotoTimelineTutorial : gotoTimelineScreen}
						onPress={() => navigation.navigate("DParticularGoal")}
					>
						<MaterialCommunityIcons name="file-tree-outline" size={34} color="white" />
					</TouchableOpacity>
				</View> */}
			</View>

			<CommonHomeButton
				iconName={"file-tree-outline"}
				size={34}
				click={!firstTimeTimelineFlow ? gotoTimelineTutorial : gotoTimelineScreen}
				// click={goToProblem}
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
		setHideLoader: (data) => {
			dispatch(setHideLoader(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyGoals)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
})
