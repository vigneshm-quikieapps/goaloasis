import React, {useEffect, useRef, useState} from "react"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ImageBackground,
	Animated,
	Dimensions,
} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import Timeline from "react-native-timeline-flatlist"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"

import RBSheet from "react-native-raw-bottom-sheet"
import {Calendar, LocaleConfig} from "react-native-calendars"
import DatePicker from "react-native-date-picker"
import TimelineScreen from "./Timeline"
import {CommonHomeButton, monthNames} from "../../components/CommonComponents"
import {connect} from "react-redux"
import {
	ColorConstants,
	commonDateFormat,
	CommonStyles,
	height,
	sizeConstants,
	width,
} from "../../core/constants"
import {setAllGoals, setBooleanFlag, setClickedGoal, setShowLoader} from "../../redux/actions"
import AsyncStorage from "@react-native-community/async-storage"
import {addMilestoneToFirestore, getGoalsOfCurrentUser} from "../../firebase/goals"
import GestureHandler, {PinchGestureHandler, State} from "react-native-gesture-handler"

import dayjs from "dayjs"
var utc = require("dayjs/plugin/utc")
dayjs.extend(utc)
const DailyTimeline = (props) => {
	const {
		allGoals,
		clickedGoal,
		setClickedGoal,
		// setAllGoals,
		booleanFlag,
		setShowLoader,
		loading,
		user,
	} = props
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [date, setDate] = useState(dayjs().utc().format())
	const [allTasks, setAllTasks] = useState([])
	const [clickedTaskDate, setClickedTaskDate] = useState(dayjs().utc().format())
	const [clickedTaskName, setClickedTaskName] = useState("")
	const [clickedMilestone, setClickedMilestone] = useState("")
	const [oldTask, setOldTask] = useState("")
	console.log("====================================")
	console.log("FROM DAILY TIMELINE")
	console.log("====================================")
	useEffect(() => {
		var allTasks = []
		allGoals.forEach((goal) => {
			goal.goalMilestone.forEach((mile) => {
				if (mile.taskData.length) {
					mile.taskData.forEach((task) => {
						let date = dayjs(task.date).format(commonDateFormat)
						let sortDate = dayjs(task.date).toDate()

						allTasks.push({
							// key: `${goal.id}_${mile.milestone}_${task.task}`,
							key: `${goal.id}${mile.milestone}${task.task}`,

							title: task.task,
							description: "",
							time: date,
							date: sortDate,
							isCompleted: task.isCompleted,
							color: task.color,
						})
					})
				}
			})
		})

		setAllTasks(allTasks.filter((item) => item.isCompleted !== true))

		// renderDetail(allTasks)

		// renderCircle(allTasks)
	}, [allGoals])
	let datee = {time: dayjs().toISOString().slice(0, 10)}
	allTasks.push(datee)
	allTasks.sort((a, b) => new Date(a.time) - new Date(b.time))
	// allTasks.map((item) => {
	// 	console.log(`TASK NAME = ${item.title} DATE = ${item.date} TIME =${item.time}`)
	// })
	useEffect(() => {
		importData()
	}, [booleanFlag])

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
					let allGoals = [...userGoals]
					allGoals.sort((a, b) => dayjs(a.timeStamp) - dayjs(b.timeStamp))
					setAllGoals(allGoals)
				})
		} catch (error) {
			console.error(error)
		}
	}

	const updateTask = () => {
		var newMilestoneArray = clickedGoal.goalMilestone.map((mile) => {
			if (mile.milestone == clickedMilestone) {
				return {
					...mile,
					taskData: mile.taskData.map((task) => {
						if (task.task == oldTask) {
							let date = dayjs(clickedTaskDate).format(commonDateFormat)
							return {
								...task,
								date: date,
								task: clickedTaskName,
							}
						}
						return task
					}),
				}
			}
			return mile
		})

		let updatedObj = {
			...clickedGoal,
			goalMilestone: newMilestoneArray,
		}
		setShowLoader(true)

		addMilestoneToFirestore(clickedGoal, newMilestoneArray, () => {
			setShowLoader(false)

			setClickedGoal(updatedObj)
			setBooleanFlag(!booleanFlag)
			refRBSheet.current.close()
		})
	}
	scale = new Animated.Value(1)
	_onPinchGestureEvent = Animated.event([{nativeEvent: {scale: scale}}], {
		useNativeDriver: true,
	})

	_onPinchHandlerStateChange = (event) => {
		if (event.nativeEvent.oldState === State.ACTIVE && 1 < event.nativeEvent.scale) {
			Animated.spring(this.scale, {
				toValue: 1,
				useNativeDriver: true,
				bounciness: 1,
			}).start()

			// console.log("EVENT 1", event.nativeEvent)
			// navigation.navigate("monthTimeline")
		}

		if (event.nativeEvent.oldState === State.ACTIVE && 1 >= event.nativeEvent.scale) {
			Animated.spring(this.scale, {
				toValue: 1,
				useNativeDriver: true,
				bounciness: 1,
			}).start()

			// console.log("EVENT 1", event.nativeEvent)
			navigation.navigate("monthTimeline")
		}
	}
	const renderDetail = (rowData, sectionID, rowID) => {
		// console.log("THIS is ROW DATA", rowData)
		// console.log("sectionID", sectionID)
		// console.log("rowID", rowID)

		let title = <Text style={[styles.title]}>{rowData.title}</Text>
		// var desc = null
		// if (rowData.description)
		// 	desc = (
		// 		<View style={[styles.descriptionContainer]}>
		// 			<Text>{rowData.description}</Text>
		// 		</View>
		// 	)

		return (
			<View
				style={{
					flex: 1,
					backgroundColor: rowData.color,
					padding: 10,
					borderRadius: 15,
				}}
			>
				{title}
				{/* {desc} */}
			</View>
		)
	}
	const renderCircle = (rowData, sectionID, rowID) => {
		let state = false

		if (dayjs().format(commonDateFormat).match(rowData.date) && rowData.title === undefined) {
			state = true
		}
		return (
			<View
				style={{
					backgroundColor: state ? "#B3855C" : "#B3855C",
					height: 5,
					width: 5,
					borderRadius: 8,
					marginVertical: 10,
					padding: 7,
					position: "absolute",
					left: width * 0.5,
					transform: [{translateX: -30}],
					justifyContent: "center",
				}}
			>
				<View
					style={{
						backgroundColor: state ? "white" : "#B3855C",
						height: 8,
						width: 8,
						borderRadius: 4,
						alignSelf: "center",
					}}
				></View>
			</View>
		)
	}

	return (
		<ImageBackground
			style={{width: "100%", height: "100%"}}
			source={require("../../assets/images/timeline.png")}
			resizeMode="stretch"
		>
			<PinchGestureHandler
				onGestureEvent={_onPinchGestureEvent}
				onHandlerStateChange={_onPinchHandlerStateChange}
			>
				<Animated.View style={[styles.container, {transform: [{scale: scale}]}]}>
					<Text
						style={{
							alignSelf: "center",
							color: "#B3855C",
							fontSize: sizeConstants.eighteenScale, //20
							fontWeight: "bold",
							textAlign: "center",
						}}
					>
						Daily Timeline
					</Text>
					<Timeline
						style={CommonStyles.list}
						data={allTasks}
						circleSize={10}
						circleColor="#B3855C"
						lineColor="#B3855C"
						timeContainerStyle={CommonStyles.timeContainerStyle}
						timeStyle={CommonStyles.timeStyle}
						descriptionStyle={[CommonStyles.descriptionStyle]}
						separator={false}
						detailContainerStyle={CommonStyles.detailContainerStyle}
						titleStyle={CommonStyles.titleStyle}
						renderDetail={renderDetail}
						renderCircle={renderCircle}
						columnFormat="two-column"
						renderFullLine={true}
						// onEventPress={(item) => alert(`${item.title} at ${item.time}`)}
						onEventPress={(item) => {
							let keyArr = item.key.split("_")

							setClickedTaskName(item.title)
							setOldTask(keyArr[2])
							var currentGoal = allGoals.find((goal) => goal.id == keyArr[0])
							setClickedMilestone(keyArr[1])
							setClickedGoal(currentGoal)
							setClickedTaskDate(dayjs(item.time))
							refRBSheet.current.open()
						}}
					/>
				</Animated.View>
			</PinchGestureHandler>

			{/* RB-Bottom Sheet */}
			<RBSheet
				height={height * 0.885}
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent",
						borderRadius: 50,
					},
					draggableIcon: {
						backgroundColor: "#000",
						borderRadius: 50,
					},
					container: {
						borderTopRightRadius: 40,
						borderTopLeftRadius: 40,
					},
				}}
			>
				<LinearGradient
					colors={["#588C8D", "#7EC8C9"]}
					style={{padding: 50, flex: 1, justifycontent: "center"}}
				>
					<View style={{alignSelf: "center"}}>
						<Text style={styles.mainTitle}>Edit Name of Task</Text>
						<View>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								value={clickedTaskName}
								onChangeText={setClickedTaskName}
								maxLength={28}
							/>
						</View>
					</View>
					<Text style={styles.mainTitle}>Edit Target Date</Text>
					<View style={{marginTop: sizeConstants.thirty}}>
						<DatePicker
							androidVariant="iosClone"
							date={clickedTaskDate}
							onDateChange={setClickedTaskDate}
							mode="date"
							textColor="#FDF9F2"
							locale="en"
							fadeToColor="none"
							dividerHeight={0}
							minimumDate={dayjs().utc().format()}
						/>
					</View>
					<View style={styles.cnfrmBtnContainer}>
						<TouchableOpacity style={styles.HelpBtn} onPress={updateTask}>
							<Text style={styles.btnText}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>
			</RBSheet>
			{/* RB-Bottom Sheet End*/}

			<View
				style={{
					width: "100%",
					position: "absolute",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					bottom: sizeConstants.xxxl,
					marginLeft: sizeConstants.thirty,
				}}
			>
				<TouchableOpacity
					style={{
						height: sizeConstants.xxxl,
						width: sizeConstants.xxxl,
						marginBottom: sizeConstants.m,
						borderRadius: sizeConstants.xxxl,
						backgroundColor: "#F8E6D3",
						justifyContent: "center",
					}}
				>
					<MaterialCommunityIcons
						name="plus"
						size={40}
						color="#E6AB76"
						style={{
							alignSelf: "center",
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						justifyContent: "center",
						height: sizeConstants.xxxl,
						width: sizeConstants.xxxl,
						borderRadius: sizeConstants.xxxl,
						backgroundColor: "#F8E6D3",
					}}
					onPress={() => navigation.navigate("monthTimeline")}
				>
					<MaterialCommunityIcons
						name="minus"
						size={40}
						style={{
							alignSelf: "center",
						}}
						color="#E6AB76"
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.bottomBtnContainer}>
				{/* <TouchableOpacity style={styles.bottomBtn} onPress={() => navigation.navigate("mygoals")}>
					<MaterialCommunityIcons name="home" size={40} color="#E4AB76" />
				</TouchableOpacity> */}
				<View
					style={{
						position: "absolute",
						right: 0,
						marginRight: sizeConstants.thirtyFiveX,
					}}
				>
					<AntDesign name="questioncircleo" size={53} color="white" />
				</View>
			</View>
			<CommonHomeButton
				iconColor={"#E4AB76"}
				size={40}
				click={() => navigation.navigate("mygoals")}
				doNotWorkBackFunctionality={true}
			/>
		</ImageBackground>
	)
}

const mapStateToProps = (state) => {
	return {
		allGoals: state.milestone.allGoals,
		clickedGoal: state.milestone.clickedGoal,
		booleanFlag: state.milestone.booleanFlag,
		loading: state.milestone.loading,
		user: state.milestone.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setClickedGoal: (goalObj) => {
			dispatch(setClickedGoal(goalObj))
		},
		setAllGoals: (goalObj) => {
			dispatch(setAllGoals(goalObj))
		},
		setBooleanFlag: (flag) => {
			dispatch(setBooleanFlag(flag))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyTimeline)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	container: {
		flex: 1,
		padding: sizeConstants.twentyX,
		marginTop: sizeConstants.thirtyScale,
		justifyContent: "center",
	},
	list: {
		flex: 1,
		paddingTop: sizeConstants.twentyX,
	},
	title: {
		fontSize: sizeConstants.fourteenScale, //16
		fontWeight: "bold",
	},
	descriptionContainer: {
		flexDirection: "row",
		paddingRight: sizeConstants.xxxl,
	},
	image: {
		width: sizeConstants.xxxl,
		height: sizeConstants.xxxl,
		borderRadius: sizeConstants.xxxl,
	},
	textDescription: {
		marginLeft: sizeConstants.mX,
		color: "gray",
	},
	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: sizeConstants.xxxl,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: "white",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	mainTitle: {
		color: "#FDF9F2",
		fontSize: sizeConstants.twentyTwoScale, //25
		fontWeight: "bold",
	},
	textInput: {
		width: 314,
		backgroundColor: "#FDF9F2",
		borderRadius: sizeConstants.xxxl,
		paddingLeft: sizeConstants.twentyX,
		fontSize: sizeConstants.eighteenScale, //19
		color: "#666666",
		elevation: 10,
		marginVertical: sizeConstants.thirty,
		padding: sizeConstants.mX,
	},
	cnfrmBtnContainer: {
		marginVertical: sizeConstants.xxxl,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	HelpBtn: {
		backgroundColor: ColorConstants.white,
		height: sizeConstants.xxxl,
		width: "75%",
		borderRadius: sizeConstants.sixty,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		// marginVertical: 20,
	},
	btnText: {
		fontSize: sizeConstants.eighteenScale,
		color: ColorConstants.darkFaintBlue,
		fontWeight: "bold",
	},
})

// for getting time from a date
// let date = new Date(mile.date)
// var hours = date.getHours()
// var minutes = "0" + date.getMinutes()
// var seconds = "0" + date.getSeconds()
// var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
