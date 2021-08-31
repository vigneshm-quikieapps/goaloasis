import React, {useRef, useState, useEffect} from "react"
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
import {scale} from "react-native-size-matters"

import RBSheet from "react-native-raw-bottom-sheet"
import {Calendar, LocaleConfig} from "react-native-calendars"
import DatePicker from "react-native-date-picker"
import MonthTimeline from "./MonthTimeline"
import {CommonHomeButton} from "../../components/CommonComponents"
import {connect} from "react-redux"
import {
	ColorConstants,
	commonDateFormat,
	CommonStyles,
	sizeConstants,
	width,
} from "../../core/constants"
import {setAllGoals, setClickedGoal, setShowLoader} from "../../redux/actions"
import {getGoalsOfCurrentUser, updateGoalToFirestore} from "../../firebase/goals"
import AsyncStorage from "@react-native-community/async-storage"
import {Constants} from "react-native-unimodules"
import {height} from "./../../core/constants"
import GestureHandler, {PinchGestureHandler, State} from "react-native-gesture-handler"

import dayjs from "dayjs"
var utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

const TimelineScreen = (props) => {
	const {setShowLoader, loading, user, allGoals, clickedGoal, setClickedGoal} = props
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [clickedGoalDate, setClickedGoalDate] = useState(dayjs().utc().format())
	const [clickedGoalName, setClickedGoalName] = useState("")
	const [allGoalsforTimeline, setAllGoalsforTimeline] = useState([])
	// const [state, setSate] = useState(false)
	useEffect(() => {
		console.log("allGoals", JSON.stringify(allGoals))
		let timelineData = allGoals.map((goal) => {
			// console.log("GOALSSSSSSS", goal.isCompleted)
			let year = dayjs(goal.targetDate).year()
			let date = dayjs(goal.targetDate).toISOString().slice(0, 10)
			// date = dayjs(goal.targetDate)

			return {
				title: goal.name,
				description: goal.description,
				time: year,
				date: date,
				isCompleted: goal.isCompleted,
				color: goal.color,
			}
		})

		// timelineData.filter((item) => item.isCompleted !== true)

		// setAllGoalsforTimeline(timelineData)
		setAllGoalsforTimeline(timelineData.filter((item) => item.isCompleted !== true))
		// renderDetail(allGoalsforTimeline)
		// renderCircle(allGoalsforTimeline)
		// console.log("Testing", allGoalsforTimeline[0].isCompleted)

		// let notCompletedData = allGoalsforTimeline.map((item) => console.log("ITEMS", item))
		// setAllGoalsforTimeline("notCompletedData", notCompletedData)
		// console.log("notCompletedData", notCompletedData)
	}, [allGoals])
	let date = {date: dayjs().toISOString().slice(0, 10), time: dayjs().year()}
	allGoalsforTimeline.push(date)
	// console.log("allGoalsforTimeline", allGoalsforTimeline)

	allGoalsforTimeline.sort((a, b) => new Date(a.date) - new Date(b.date))
	// allGoalsforTimeline.reverse()

	useEffect(() => {
		importData()
	}, [clickedGoal])
	console.log("====================================")
	console.log("All goals from Timeline", allGoalsforTimeline)
	console.log("====================================")

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
					console.log("allGoals", JSON.stringify(allGoals))
					setAllGoals(allGoals)
				})
		} catch (error) {
			console.error(error)
		}
	}

	const updateGoal = () => {
		let updatedObj = {
			...clickedGoal,
			targetDate: dayjs(clickedGoalDate).format(commonDateFormat),
			name: clickedGoalName,
		}
		setShowLoader(true)

		updateGoalToFirestore(updatedObj, clickedGoal.name, () => {
			setShowLoader(false)

			setClickedGoal(updatedObj)
			refRBSheet.current.close()
		})
	}

	let scale = new Animated.Value(1)
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
			navigation.navigate("monthTimeline")
		}

		if (event.nativeEvent.oldState === State.ACTIVE && 1 >= event.nativeEvent.scale) {
			Animated.spring(this.scale, {
				toValue: 1,
				useNativeDriver: true,
				bounciness: 1,
			}).start()

			// console.log("EVENT 1", event.nativeEvent)
			// navigation.navigate("mygoals")
		}
	}

	const renderDetail = (rowData, sectionID, rowID) => {
		// console.log("THIS is ROW DATA", rowData)
		// console.log("sectionID", sectionID)
		// console.log("rowID", rowID)

		let title = <Text style={[styles.title]}>{rowData.title}</Text>
		var desc = null
		if (rowData.description)
			desc = (
				<View style={[styles.descriptionContainer]}>
					<Text>{rowData.description}</Text>
				</View>
			)

		return (
			<View style={{flex: 1, backgroundColor: rowData.color, padding: 10, borderRadius: 15}}>
				{title}
				{desc}
			</View>
		)
	}
	const renderCircle = (rowData, sectionID, rowID) => {
		// let datadate = new Date(rowData.date)
		// console.log("THIS is ROW DATA from circle render", rowData)

		let state = false
		// console.log("datadate", rowData.date)
		// console.log("todaysDate", new Date().toISOString().slice(0, 10))

		if (new Date().toISOString().slice(0, 10).match(rowData.date) && rowData.title === undefined) {
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
			style={{
				width: "100%",
				height: "100%",
			}}
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
						Yearly Timeline
					</Text>
					<Timeline
						style={CommonStyles.list}
						data={allGoalsforTimeline}
						circleSize={10}
						// circleColor="#B3855C"
						lineColor="#B3855C"
						timeContainerStyle={CommonStyles.timeContainerStyle}
						timeStyle={CommonStyles.timeStyle}
						descriptionStyle={CommonStyles.descriptionStyle}
						separator={false}
						detailContainerStyle={[CommonStyles.detailContainerStyle]}
						renderDetail={renderDetail}
						renderCircle={renderCircle}
						renderFullLine={true}
						// renderTime={renderTime}
						titleStyle={CommonStyles.titleStyle}
						columnFormat="two-column"
						onEventPress={(item) => {
							setClickedGoalName(item.title)
							var currentGoal = allGoals.find((goal) => goal.name == item.title)
							setClickedGoal(currentGoal)
							setClickedGoalDate(dayjs(currentGoal.targetDate))
							refRBSheet.current.open()
						}}
						renderFullLine={true}
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
						<Text style={styles.mainTitle}>Edit Name of Goal</Text>
						<View>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								value={clickedGoalName}
								onChangeText={setClickedGoalName}
								maxLength={15}
							/>
						</View>
					</View>
					<Text style={styles.mainTitle}>Edit Target Date</Text>
					<View style={{marginTop: sizeConstants.thirty}}>
						<DatePicker
							androidVariant="iosClone"
							date={clickedGoalDate}
							onDateChange={setClickedGoalDate}
							mode="date"
							textColor="#FDF9F2"
							locale="en"
							fadeToColor="none"
							dividerHeight={0}
							minimumDate={dayjs().utc().format()}
						/>
					</View>
					<View style={styles.cnfrmBtnContainer}>
						<TouchableOpacity style={styles.HelpBtn} onPress={updateGoal}>
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
					onPress={() => navigation.navigate("monthTimeline")}
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
				click={() => navigation.navigate("mygoals")}
				iconColor={"#E4AB76"}
				size={40}
				doNotWorkBackFunctionality={true}
				BackHandle={true}
				normalBack={true}
				clickforBack={() => navigation.navigate("mygoals")}
			/>
		</ImageBackground>
	)
}

const mapStateToProps = (state) => {
	return {
		allGoals: state.milestone.allGoals,
		clickedGoal: state.milestone.clickedGoal,
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
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineScreen)

const styles = StyleSheet.create({
	detailContainerStyle1: {
		marginVertical: sizeConstants.m,
		paddingHorizontal: sizeConstants.m,
		backgroundColor: "#588C8D",
		borderRadius: 15,
	},
	detailContainerStyle2: {
		marginVertical: sizeConstants.m,
		paddingHorizontal: sizeConstants.m,
		backgroundColor: "#553144",
		borderRadius: 15,
	},
	detailContainerStyle3: {
		marginVertical: sizeConstants.m,
		paddingHorizontal: sizeConstants.m,
		backgroundColor: "#6A5593",
		borderRadius: 15,
	},
	detailContainerStyle4: {
		marginVertical: sizeConstants.m,
		paddingHorizontal: sizeConstants.m,
		backgroundColor: "#B3855C",
		borderRadius: 15,
	},
	detailContainerStyle5: {
		marginVertical: sizeConstants.m,
		paddingHorizontal: sizeConstants.m,
		backgroundColor: "#3F6E6A",
		borderRadius: 15,
	},
	detailContainerStyle6: {
		marginVertical: sizeConstants.m,
		paddingHorizontal: sizeConstants.m,
		// backgroundColor: "#B8534F",
		backgroundColor: "green",
		borderRadius: 15,
	},
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
		fontSize: sizeConstants.eighteenScale, //20
		color: ColorConstants.darkFaintBlue,
		fontWeight: "bold",
	},
})

// const data = [
// 	{
// 		time: "09:00",
// 		title: "Archery Training",
// 		description:
// 			"The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ",
// 		lineColor: "#009688",
// 		imageUrl:
// 			"https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg",
// 	},
// 	{
// 		time: "10:45",
// 		title: "Play Badminton",
// 		description:
// 			"Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",

// 		imageUrl:
// 			"https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg",
// 	},
// 	{
// 		time: "12:00",
// 		title: "Lunch",
// 	},
// 	{
// 		time: "14:00",
// 		title: "Watch Soccer",
// 		description: "Team sport played between two teams of eleven players with a spherical ball. ",
// 		lineColor: "#009688",

// 		imageUrl:
// 			"https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg",
// 	},
// 	{
// 		time: "16:30",
// 		title: "Go to Fitness center",
// 		description: "Look out for the Best Gym & Fitness Centers around me :)",

// 		imageUrl:
// 			"https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg",
// 	},
// ]
