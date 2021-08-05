import React, {useEffect} from "react"
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
import {ColorConstants, commonImages, sizeConstants} from "../../core/constants"
import {SnoozeIcon} from "../../assets/customIcons"
import Swipeout from "rc-swipeout"
import {connect} from "react-redux"
import {addMilestoneToFirestore} from "../../firebase"
import {setClickedGoal, setTodaysAllTasks} from "../../redux/actions"

const TodaysTask = ({todayAllTasksArr, allGoals, setClickedGoal, setTodaysAllTasks}) => {
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
		let updatedObj = {
			...currentGoalObj,
			goalMilestone: newMileArray,
		}

		addMilestoneToFirestore(currentGoalObj, newMileArray, () => {
			setClickedGoal(updatedObj)
			setTodaysAllTasks(updatedTasksArr)
		})
	}

	const completeTask = (task, mile, goal) => {
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
				>
					<View style={[styles.swipableBtnContainer]}>
						<TouchableOpacity style={[styles.TouchContainer]} onPress={() => {}}>
							<View>
								<Text
									style={[styles.mainTitleButton, item.isCompleted ? styles.btnTextCompleted : {}]}
								>
									{item.task}
								</Text>
							</View>
							{item.isCompleted ? (
								<View>
									<Text style={{color: ColorConstants.gray, fontWeight: "bold"}}>
										TASK COMPLETED
									</Text>
								</View>
							) : null}
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
		<StatusBarScreen style={styles.container}>
			<ImageBackground style={styles.container} source={backImg} resizeMode="stretch">
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

				<View style={styles.bottomContainer}>
					<TouchableOpacity onPress={gotoHome}>
						<View
							style={[
								styles.circleLogo,
								{
									transform: [{translateY: -38}],
								},
							]}
						>
							<Entypo name="home" size={40} color="#7ec8c9" style={{zIndex: -1}} />
						</View>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		todayAllTasksArr: state.milestone.todayAllTasksArr,
		allGoals: state.milestone.allGoals,
		clickedGoal: state.milestone.clickedGoal,
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
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TodaysTask)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
	btnContainer: {
		marginLeft: 20,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "white",
		width: 314,
		height: 50,
		paddingLeft: 20,
		borderRadius: 51,
	},
	btnText: {
		fontSize: sizeConstants.eighteenScale, //19
		color: "#666666",
		letterSpacing: 1.2,
	},
	titleContainer: {
		height: 95 - Constants.statusBarHeight,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},
	mainTitle: {
		color: "#FBF5E9",
		fontSize: sizeConstants.twentyTwoScale, //25
		fontWeight: "bold",
		marginLeft: 20,
		marginVertical: 30,
	},

	circleLogo: {
		height: 70,
		width: 70,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: "#7ec8c9",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},

	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#7EC8C9",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	bottomContainer: {
		height: 90,
		backgroundColor: "#fff",
		borderTopEndRadius: 60,

		alignItems: "center",
	},
	queIcon: {
		padding: 30,
		alignItems: "flex-end",
	},

	taskAccordion: {
		height: 50,
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
		paddingHorizontal: 20,
	},
	mainTitleButton: {
		fontSize: sizeConstants.eighteenScale, //19
		fontWeight: "bold",
		color: "#333333",
	},
	btnTextCompleted: {
		fontSize: sizeConstants.fourteenScale, //19

		color: "#666666",
		letterSpacing: 1.2,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
	},
})
