import React, {useEffect, useRef, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import Timeline from "react-native-timeline-flatlist"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"

import RBSheet from "react-native-raw-bottom-sheet"
import {Calendar, LocaleConfig} from "react-native-calendars"
import DatePicker from "react-native-date-picker"
import TimelineScreen from "./Timeline"
import {CommonHomeButton, convertToDateString, monthNames} from "../../core/CommonComponents"
import {connect} from "react-redux"
import {ColorConstants, sizeConstants} from "../../core/styles"
import {setAllGoals, setBooleanFlag, setClickedGoal} from "../../redux/actions"
import AsyncStorage from "@react-native-community/async-storage"
import {addMilestoneToFirestore} from "../../firebase"

const DailyTimeline = ({allGoals, clickedGoal, setClickedGoal, setAllGoals, booleanFlag}) => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [date, setDate] = useState(new Date())
	const [allTasks, setAllTasks] = useState([])
	const [clickedTaskDate, setClickedTaskDate] = useState(new Date())
	const [clickedTaskName, setClickedTaskName] = useState("")
	const [clickedMilestone, setClickedMilestone] = useState("")
	const [oldTask, setOldTask] = useState("")

	useEffect(() => {
		var allTasks = []
		allGoals.forEach((goal) => {
			goal.goalMilestone.forEach((mile) => {
				if (mile.taskData.length) {
					mile.taskData.forEach((task) => {
						let date = convertToDateString(new Date(task.date))
						allTasks.push({
							key: `${goal.id}_${mile.milestone}_${task.task}`,
							title: task.task,
							description: "",
							time: date,
						})
					})
				}
			})
		})
		setAllTasks(allTasks)
	}, [allGoals])

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

	const updateTask = () => {
		var newMilestoneArray = clickedGoal.goalMilestone.map((mile) => {
			if (mile.milestone == clickedMilestone) {
				return {
					...mile,
					taskData: mile.taskData.map((task) => {
						if (task.task == oldTask) {
							let date = convertToDateString(new Date(clickedTaskDate))
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
		addMilestoneToFirestore(clickedGoal, newMilestoneArray, () => {
			setClickedGoal(updatedObj)
			setBooleanFlag(!booleanFlag)
			refRBSheet.current.close()
		})
	}

	return (
		<ImageBackground
			style={{width: "100%", height: "100%"}}
			source={require("../../assets/images/timeline.png")}
			resizeMode="stretch"
		>
			<View style={styles.container}>
				<Text
					style={{
						alignSelf: "center",
						color: "#B3855C",
						fontSize: 20,
						fontWeight: "bold",
					}}
				>
					Daily Timeline
				</Text>
				<Timeline
					style={styles.list}
					data={allTasks}
					circleSize={10}
					circleColor="#B3855C"
					lineColor="#B3855C"
					timeContainerStyle={{minWidth: 52, marginTop: -5}}
					timeStyle={{
						textAlign: "center",
						backgroundColor: "#ff9797",
						color: "white",
						padding: 5,
						borderRadius: 13,
					}}
					descriptionStyle={{color: "white"}}
					options={{
						style: {paddingTop: 0},
					}}
					separator={false}
					detailContainerStyle={{
						marginBottom: 20,
						paddingLeft: 5,
						paddingRight: 5,
						backgroundColor: "#588C8D",
						borderRadius: 15,
					}}
					titleStyle={{color: "white"}}
					columnFormat="two-column"
					// onEventPress={(item) => alert(`${item.title} at ${item.time}`)}
					onEventPress={(item) => {
						let keyArr = item.key.split("_")

						setClickedTaskName(item.title)
						setOldTask(keyArr[2])
						var currentGoal = allGoals.find((goal) => goal.id == keyArr[0])
						setClickedMilestone(keyArr[1])
						setClickedGoal(currentGoal)
						setClickedTaskDate(new Date(item.time))
						refRBSheet.current.open()
					}}
				/>
			</View>

			{/* RB-Bottom Sheet */}
			<RBSheet
				height={600}
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent",
					},
					draggableIcon: {
						backgroundColor: "#000",
					},
				}}
			>
				<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{padding: 50, flex: 1}}>
					<View>
						<Text style={styles.mainTitle}>Edit Name of Task</Text>
						<View>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								value={clickedTaskName}
								onChangeText={setClickedTaskName}
							/>
						</View>
					</View>
					<Text style={styles.mainTitle}>Edit Target Date</Text>
					<View style={{marginTop: 30}}>
						<DatePicker
							androidVariant="iosClone"
							date={clickedTaskDate}
							onDateChange={setClickedTaskDate}
							mode="date"
							textColor="#FDF9F2"
							locale="en"
							fadeToColor="none"
							dividerHeight={0}
							minimumDate={new Date()}
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
						height: 50,
						width: 50,
						marginBottom: 10,
						borderRadius: 25,
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
						height: 50,
						width: 50,
						borderRadius: 25,
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
						marginRight: 35,
					}}
				>
					<AntDesign name="questioncircleo" size={53} color="white" />
				</View>
			</View>
			<CommonHomeButton
				iconColor={"#E4AB76"}
				size={40}
				click={() => navigation.navigate("mygoals")}
			/>
		</ImageBackground>
	)
}

const mapStateToProps = (state) => {
	return {
		allGoals: state.milestone.allGoals,
		clickedGoal: state.milestone.clickedGoal,
		booleanFlag: state.milestone.booleanFlag,
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
		padding: 20,
		marginTop: 30,
	},
	list: {
		flex: 1,
		marginTop: 20,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	descriptionContainer: {
		flexDirection: "row",
		paddingRight: 50,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	textDescription: {
		marginLeft: 10,
		color: "gray",
	},
	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "white",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		fontWeight: "bold",
	},
	textInput: {
		width: 314,
		backgroundColor: "#FDF9F2",
		borderRadius: 50,
		paddingLeft: 20,
		fontSize: 19,
		color: "#666666",
		elevation: 10,
		marginVertical: 30,
		padding: 10,
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
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		// marginVertical: 20,
	},
	btnText: {
		fontSize: sizeConstants.xl,
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
