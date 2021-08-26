import React, {useEffect, version, useState} from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	TouchableWithoutFeedback,
	StatusBar,
	ImageBackground,
	ScrollView,
	Alert,
	FlatList,
} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {FontAwesome5, Entypo, AntDesign} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"
import {
	ColorConstants,
	commonDateFormat,
	commonImages,
	CommonStyles,
	sizeConstants,
} from "../../core/constants"
import {SnoozeIcon} from "../../assets/customIcons"
import Swipeout from "rc-swipeout"
import {connect} from "react-redux"
import {addMilestoneToFirestore} from "../../firebase/goals"
import {setClickedGoal, setShowLoader, setTodaysAllTasks} from "../../redux/actions"
import dayjs from "dayjs"

const TodaysTask = ({
	todayAllTasksArr,
	allGoals,
	setClickedGoal,
	setTodaysAllTasks,
	setShowLoader,
}) => {
	const navigation = useNavigation()
	const backImg = commonImages.thirdImage

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	const deleteTaskAlert = (keyArr) =>
		Alert.alert(keyArr[0], "Delete this Task?", [
			{
				text: "No",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: () => {
					deleteTask(keyArr[0], keyArr[1], keyArr[2])
				},
			},
		])

	const deleteTaskIcon = (key) => (
		<View>
			<TouchableOpacity
				onPress={() => {
					deleteTaskAlert(key.split("_"))
					console.log("Testing", key.split("_"))
				}}
			>
				<MaterialCommunityIcons
					name="delete"
					size={30}
					color={ColorConstants.faintWhite}
					style={{marginRight: 0}}
				/>
			</TouchableOpacity>
		</View>
	)
	const deleteTask = (task, mile, goal) => {
		setShowLoader(true)
		let updatedTasksArr = todayAllTasksArr.filter(
			(taskObj) => taskObj.key != `${task}_${mile}_${goal}`
		)

		let currentGoalObj = allGoals.find((goalobj) => goalobj.name == goal)
		let newMileArray = currentGoalObj.goalMilestone.map((mileItem) => {
			if (mileItem.milestone == mile) {
				return {
					...mileItem,
					taskData: mileItem.taskData.filter((taskItem) => taskItem.task != task),
				}
			}
			return mileItem
		})

		console.log("FROM DELETE", newMileArray[0].taskData)
		let updatedObj = {
			...currentGoalObj,
			goalMilestone: newMileArray,
		}

		addMilestoneToFirestore(currentGoalObj, newMileArray, () => {
			setClickedGoal(updatedObj)
			setTodaysAllTasks(updatedTasksArr)
			setShowLoader(false)
		})
	}

	const snoozeTask = (task, mile, goal) => {
		setShowLoader(true)
		let updatedTasksArr = todayAllTasksArr.filter(
			(taskObj) => taskObj.key !== `${task}_${mile}_${goal}`
		)
		// console.log("updatedTasksArr", updatedTasksArr)
		let currentGoalObj = allGoals.find((goalobj) => goalobj.name == goal)
		console.log("currentGoalObj", currentGoalObj)
		let milestoneDate
		let newMileArray1 = currentGoalObj.goalMilestone.map((mileItem) => {
			if (mileItem.milestone === mile) {
				milestoneDate = mileItem.date
			}
		})

		// console.log("milestoneDate", milestoneDate)
		// console.log("READY", newMileArray1)

		const today = dayjs().format(commonDateFormat)
		const tomorrow = dayjs().add(1, "days").format(commonDateFormat)
		const dayAfterTomorrow = dayjs().add(2, "days").format(commonDateFormat)

		if (milestoneDate === dayAfterTomorrow) {
			// setDayAfterTomorrowSnooze(true)
			// console.log("MATCHED")
			Alert.alert(
				task,
				"The Target Date of Milestone for this Task is Day-After-Tomorrow, Are you Sure you want to snooze this task?",
				[
					{
						text: "No",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{
						text: "Yes",
						onPress: () => {
							// let currentGoalObj = allGoals.find((goalobj) => goalobj.name == goal)
							// let newMileArray = currentGoalObj.goalMilestone.map((mileItem) => {
							// 	if (mileItem.milestone === mile) {
							// 		return {
							// 			...mileItem,
							// 			taskData: mileItem.taskData.map((taskItem) => {
							// 				if (taskItem.task === task) {
							// 					// console.log("TASKK", task)
							// 					// console.log("old data", taskItem)
							// 					taskItem.date = tomorrow
							// 					// console.log("new modified data", taskItem)
							// 				}
							// 			}),
							// 		}
							// 	}
							// 	return mileItem
							// })
							let currentGoalObj = allGoals.find((goalobj) => goalobj.name == goal)
							let newMileArray = currentGoalObj.goalMilestone.map((mileItem) => {
								if (mileItem.milestone === mile) {
									mileItem.taskData.forEach((taskItem) => {
										if (taskItem.task == task) taskItem.date = tomorrow
									})
								}
								return mileItem
							})
							let updatedObj = {
								...currentGoalObj,
								goalMilestone: newMileArray,
							}
							// console.log("UNDer", currentGoalObj)
							addMilestoneToFirestore(currentGoalObj, newMileArray, () => {
								setClickedGoal(updatedObj)
								setTodaysAllTasks(updatedTasksArr)
								setShowLoader(false)
							})
						},
					},
				]
			)

			console.log("")
		} else {
			// setDayAfterTomorrowSnooze(true)

			Alert.alert(task, "Are you Sure you want to snooze this task?", [
				{
					text: "No",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "Yes",
					// onPress: () => {
					// 	let currentGoalObj = allGoals.find((goalobj) => goalobj.name == goal)
					// 	let newMileArray = currentGoalObj.goalMilestone.map((mileItem) => {
					// 		if (mileItem.milestone == mile) {
					// 			return {
					// 				...mileItem,
					// 				taskData: mileItem.taskData.forEach((taskItem) => {
					// 					if (taskItem.task == task) taskItem.date = tomorrow
					// 				}),
					// 			}
					// 		}
					// 		return mileItem
					// 	})

					// 	// console.log("newMileArray", newMileArray[0])

					// 	let updatedObj = {
					// 		...currentGoalObj,
					// 		goalMilestone: newMileArray,
					// 	}

					// 	addMilestoneToFirestore(currentGoalObj, newMileArray, () => {
					// 		setClickedGoal(updatedObj)
					// 		setTodaysAllTasks(updatedTasksArr)
					// 		setShowLoader(false)
					// 	})
					// },
					onPress: () => {
						let currentGoalObj = allGoals.find((goalobj) => goalobj.name == goal)
						let newMileArray = currentGoalObj.goalMilestone.map((mileItem) => {
							if (mileItem.milestone === mile) {
								mileItem.taskData.forEach((taskItem) => {
									if (taskItem.task == task) taskItem.date = tomorrow
								})
							}
							return mileItem
						})

						let updatedObj = {
							...currentGoalObj,
							goalMilestone: newMileArray,
						}
						// console.log("====================================")
						// console.log(newMileArray[0].taskData)
						// console.log("====================================")

						addMilestoneToFirestore(currentGoalObj, newMileArray, () => {
							setClickedGoal(updatedObj)
							setTodaysAllTasks(updatedTasksArr)
							setShowLoader(false)
						})
					},
				},
			])
		}
	}
	const completeTask = (task, mile, goal) => {
		setShowLoader(true)
		let updatedTasksArr = todayAllTasksArr.map((taskObj) => {
			if (taskObj.key == `${task}_${mile}_${goal}`) {
				return {
					...taskObj,
					isCompleted: true,
				}
			}
			return taskObj
		})
		let currentGoalObj = allGoals.find((goalobj) => goalobj.name == goal)
		let newMileArray = currentGoalObj.goalMilestone.map((mileItem) => {
			if (mileItem.milestone == mile) {
				return {
					...mileItem,
					taskData: mileItem.taskData.map((taskItem) => {
						if (taskItem.task == task) {
							return {
								...taskItem,
								isCompleted: true,
							}
						}
						return taskItem
					}),
				}
			}
			return mileItem
		})
		let updatedObj = {
			...currentGoalObj,
			goalMilestone: newMileArray,
		}

		addMilestoneToFirestore(currentGoalObj, newMileArray, () => {
			setClickedGoal(updatedObj)
			setTodaysAllTasks(updatedTasksArr)
			setShowLoader(false)
		})
	}
	const renderItem = ({item}) => (
		<View style={[styles.swipeButton, styles.taskAccordion]}>
			<Swipeout
				left={[
					{
						text: (
							<SnoozeIcon bgColor={ColorConstants.snoozeIconBg} color={ColorConstants.faintWhite} />
						),
						onPress: () => {
							console.log("Snoozing")

							console.log("ITEMS", item.key)
							let data = item.key.split("_")
							snoozeTask(data[0], data[1], data[2])
							// console.log("DAta" + data)
						},
						style: {backgroundColor: ColorConstants.snoozeIconBg},
					},
				]}
				right={[
					{
						text: deleteTaskIcon(item.key),

						onPress: () => {},
						style: {backgroundColor: ColorConstants.snoozeIconBg},
					},
				]}
				style={{backgroundColor: "#CDE8E6"}}
				// onOpen={() => console.log("open")}
				// onClose={() => console.log("close")}
				autoClose={true}
				disabled={false}
			>
				<LongPressGestureHandler
					onHandlerStateChange={(event) => {
						handleTaskComplete(event, item.key.split("_"))
					}}
					minDurationMs={800}
					style={{backgroundColor: ColorConstants.faintWhite}}
				>
					<View style={[styles.swipableBtnContainer]}>
						<TouchableOpacity style={[styles.TouchContainer]} onPress={() => {}}>
							<ScrollView horizontal={true}>
								<Text
									style={[styles.mainTitleButton, item.isCompleted ? styles.btnTextCompleted : {}]}
								>
									{item.task}
								</Text>
							</ScrollView>
							{/* {item.isCompleted ? (
								<View>
									<Text style={{color: ColorConstants.gray, fontWeight: "bold"}}>
										TASK COMPLETED
									</Text>
								</View>
							) : null} */}
						</TouchableOpacity>
					</View>
				</LongPressGestureHandler>
			</Swipeout>
		</View>
	)
	const emptyComponent = () => (
		<View style={[styles.swipeButton, styles.taskAccordion]}>
			<View style={[styles.swipableBtnContainer]}>
				<TouchableOpacity activeOpacity={1} style={[styles.TouchContainer]} onPress={() => {}}>
					<View>
						<Text style={styles.mainTitleButton}>There are no tasks for today</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)

	const handleTaskComplete = (event, keyArr) => {
		if (event.nativeEvent.state === State.ACTIVE) {
			completeTask(keyArr[0], keyArr[1], keyArr[2])
		}
	}
	useEffect(() => {}, [todayAllTasksArr])
	return (
		<StatusBarScreen style={CommonStyles.introContainer}>
			<ImageBackground style={CommonStyles.introContainer} source={backImg} resizeMode="stretch">
				<TouchableOpacity style={styles.titleContainer}>
					<Text style={styles.mainTitle}>Today’s tasks</Text>
				</TouchableOpacity>
				<FlatList
					data={todayAllTasksArr}
					renderItem={renderItem}
					ListEmptyComponent={emptyComponent}
					keyExtractor={(item, key) => `${item.key}_${key}`}
				/>
				<View style={styles.queIcon}>
					<AntDesign name="questioncircleo" size={50} color={"#fff"} />
				</View>

				<TouchableOpacity
					onPress={gotoHome}
					style={{
						alignSelf: "center",
						transform: [{translateY: 38}],
						zIndex: 15,
					}}
				>
					<View style={[styles.circleLogo]}>
						<Entypo name="home" size={40} color={ColorConstants.lighterBlue} />
					</View>
				</TouchableOpacity>
				<View style={[styles.bottomContainer, {overflow: "visible"}]}></View>
			</ImageBackground>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		todayAllTasksArr: state.milestone.todayAllTasksArr,
		allGoals: state.milestone.allGoals,
		clickedGoal: state.milestone.clickedGoal,
		loading: state.milestone.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setClickedGoal: (clickedGoalObj) => {
			dispatch(setClickedGoal(clickedGoalObj))
		},
		setTodaysAllTasks: (taskArr) => {
			dispatch(setTodaysAllTasks(taskArr))
		},
		setShowLoader: (flag) => {
			dispatch(setShowLoader(flag))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TodaysTask)
const styles = StyleSheet.create({
	btnContainer: {
		marginLeft: sizeConstants.twentyX,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: ColorConstants.white,
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fiftyX,
		paddingLeft: sizeConstants.twentyX,
		borderRadius: sizeConstants.xxxl,
	},
	btnText: {
		fontSize: sizeConstants.eighteenScale, //19
		color: ColorConstants.faintBlack2,
		letterSpacing: 1.2,
	},
	titleContainer: {
		height: 95 - Constants.statusBarHeight,
		backgroundColor: ColorConstants.darkFaintBlue,
		justifyContent: "center",
	},
	mainTitle: {
		color: ColorConstants.lightestYellow,
		fontSize: sizeConstants.twentyTwoScale, //25
		fontWeight: "bold",
		marginLeft: sizeConstants.twentyX,
		marginVertical: sizeConstants.mThirty,
	},

	circleLogo: {
		height: sizeConstants.seventyScale,
		width: sizeConstants.seventyScale,
		borderRadius: sizeConstants.xxxl,
		borderWidth: sizeConstants.s,
		borderColor: ColorConstants.lighterBlue,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.white,
	},

	bottomContainer: {
		height: sizeConstants.ninetyX,
		backgroundColor: ColorConstants.white,
		borderTopEndRadius: sizeConstants.mSixty,
		alignItems: "center",
	},
	queIcon: {
		bottom: sizeConstants.oneTwentyEight,
		position: "absolute",
		right: sizeConstants.xxl,
	},

	taskAccordion: {
		height: sizeConstants.fiftyX,
		backgroundColor: ColorConstants.white,
		paddingVertical: sizeConstants.s,
		width: "85%",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		borderRadius: sizeConstants.eightyFive,
		marginTop: sizeConstants.xl,
		elevation: 0,
	},
	swipeButton: {
		alignContent: "center",
		borderRadius: sizeConstants.twentyTwo,
		overflow: "hidden",
		justifyContent: "center",
		marginTop: sizeConstants.xxl,
		elevation: 10,
	},

	swipableBtnContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: sizeConstants.hundredMX,
		justifyContent: "center",
	},
	TouchContainer: {
		width: "100%",
		backgroundColor: ColorConstants.white,
		height: sizeConstants.hundredMX,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: sizeConstants.twentyX,
	},
	mainTitleButton: {
		fontSize: sizeConstants.eighteenScale, //19
		fontWeight: "bold",
		color: "#333333",
	},
	btnTextCompleted: {
		fontSize: sizeConstants.fourteenScale, //19

		color: ColorConstants.faintBlack2,
		letterSpacing: 1.2,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
	},
})
