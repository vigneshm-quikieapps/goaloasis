import React, {useRef, useState, useEffect} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import Timeline from "react-native-timeline-flatlist"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"

import RBSheet from "react-native-raw-bottom-sheet"
import {Calendar, LocaleConfig} from "react-native-calendars"
import DatePicker from "react-native-date-picker"
import MonthTimeline from "./MonthTimeline"
import {CommonHomeButton} from "../../components/CommonComponents"
import {connect} from "react-redux"
import {ColorConstants, commonDateFormat, sizeConstants} from "../../core/constants"
import {setAllGoals, setClickedGoal, setShowLoader, setHideLoader} from "../../redux/actions"
import {updateGoalToFirestore} from "../../firebase"
import AsyncStorage from "@react-native-community/async-storage"
import Spinner from "../../components/Spinner"
import dayjs from "dayjs"

const TimelineScreen = ({
	setShowLoader,
	loading,
	setHideLoader,
	allGoals,
	clickedGoal,
	setClickedGoal,
}) => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [clickedGoalDate, setClickedGoalDate] = useState(dayjs())
	const [clickedGoalName, setClickedGoalName] = useState("")
	const [allGoalsforTimeline, setAllGoalsforTimeline] = useState([])

	useEffect(() => {
		let timelineData = allGoals.map((goal) => {
			let year = dayjs(goal.targetDate).year()

			return {
				title: goal.name,
				description: goal.description,
				time: year,
			}
		})
		setAllGoalsforTimeline(timelineData)
	}, [allGoals])

	useEffect(() => {
		importData()
	}, [clickedGoal])

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

	const updateGoal = () => {
		let updatedObj = {
			...clickedGoal,
			targetDate: clickedGoalDate,
			name: clickedGoalName,
		}
		setShowLoader(true)

		updateGoalToFirestore(updatedObj, clickedGoal.name, () => {
			setHideLoader(false)

			setClickedGoal(updatedObj)
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
					Yearly Timeline
				</Text>
				<Timeline
					style={styles.list}
					data={allGoalsforTimeline}
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
					onEventPress={(item) => {
						setClickedGoalName(item.title)
						var currentGoal = allGoals.find((goal) => goal.name == item.title)
						setClickedGoal(currentGoal)
						setClickedGoalDate(dayjs(currentGoal.targetDate))
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
						<Text style={styles.mainTitle}>Edit Name of Goal</Text>
						<View>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								value={clickedGoalName}
								onChangeText={setClickedGoalName}
							/>
						</View>
					</View>
					<Text style={styles.mainTitle}>Edit Target Date</Text>
					<View style={{marginTop: 30}}>
						<DatePicker
							androidVariant="iosClone"
							date={clickedGoalDate}
							onDateChange={setClickedGoalDate}
							mode="date"
							textColor="#FDF9F2"
							locale="en"
							fadeToColor="none"
							dividerHeight={0}
							minimumDate={dayjs()}
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
				{loading ? <Spinner /> : null}

				<TouchableOpacity
					style={{
						height: 50,
						width: 50,
						marginBottom: 10,
						borderRadius: 25,
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
						height: 50,
						width: 50,
						borderRadius: 25,
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
						marginRight: 35,
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
		setHideLoader: (data) => {
			dispatch(setHideLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineScreen)

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
		paddingTop: 20,
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
		height: 50,
		backgroundColor: "#FDF9F2",
		borderRadius: 50,
		marginVertical: sizeConstants.l,
		paddingLeft: 20,
		fontSize: 19,
		color: "#666666",
		elevation: 10,
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
