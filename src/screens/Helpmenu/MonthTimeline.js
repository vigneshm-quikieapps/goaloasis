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
import {
	setAllGoals,
	setShowLoader,
	setHideLoader,
	setBooleanFlag,
	setClickedGoal,
} from "../../redux/actions"
import AsyncStorage from "@react-native-community/async-storage"
import {addMilestoneToFirestore} from "../../firebase"
import Spinner from "../../core/Spinner"

const MonthTimeline = ({
	setShowLoader,
	loading,
	setHideLoader,
	allGoals,
	clickedGoal,
	setClickedGoal,
	setAllGoals,
	booleanFlag,
}) => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [date, setDate] = useState(new Date())
	const [allMilestones, setAllMilestones] = useState([])
	const [clickedMilestoneDate, setClickedMilestoneDate] = useState(new Date())
	const [clickedMilestoneName, setClickedMilestoneName] = useState("")
	const [oldMilestone, setOldMilestone] = useState("")

	useEffect(() => {
		var allMiles = []
		allGoals.forEach((goal) => {
			goal.goalMilestone.forEach((mile) => {
				let date = new Date(mile.date)
				var month = monthNames[date.getUTCMonth()]
				var year = date.getUTCFullYear()

				allMiles.push({
					key: goal.id,
					title: mile.milestone,
					description: "",
					time: `${month}, ${year}`,
				})
			})
		})

		setAllMilestones(allMiles)
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

	const updateMilestone = () => {
		var newMilestoneArray = clickedGoal.goalMilestone.map((milestone) => {
			if (milestone.milestone == oldMilestone) {
				return {
					...milestone,
					milestone: clickedMilestoneName,
					date: convertToDateString(clickedMilestoneDate),
				}
			}
			return milestone
		})

		let updatedObj = {
			...clickedGoal,
			goalMilestone: newMilestoneArray,
		}
		setShowLoader(true)

		addMilestoneToFirestore(clickedGoal, newMilestoneArray, () => {
			setHideLoader(false)

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
			{loading ? <Spinner /> : null}

			<View style={styles.container}>
				<Text
					style={{
						alignSelf: "center",
						color: "#B3855C",
						fontSize: 20,
						fontWeight: "bold",
					}}
				>
					Monthly Timeline
				</Text>
				<Timeline
					style={styles.list}
					data={allMilestones}
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
						setClickedMilestoneName(item.title)
						setOldMilestone(item.title)
						var currentGoal = allGoals.find((goal) => goal.id == item.key)
						let clickedMileObj = currentGoal.goalMilestone.find(
							(mile) => mile.milestone == item.title
						)
						setClickedGoal(currentGoal)
						setClickedMilestoneDate(new Date(clickedMileObj.date))
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
						<Text style={styles.mainTitle}>Edit Name of Milestone</Text>
						<View>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								value={clickedMilestoneName}
								onChangeText={setClickedMilestoneName}
							/>
						</View>
					</View>
					<Text style={styles.mainTitle}>Edit Target Date</Text>
					<View style={{marginTop: 30}}>
						<DatePicker
							androidVariant="iosClone"
							date={clickedMilestoneDate}
							onDateChange={setClickedMilestoneDate}
							mode="date"
							textColor="#FDF9F2"
							locale="en"
							fadeToColor="none"
							dividerHeight={0}
							minimumDate={new Date()}
						/>
					</View>
					<View style={styles.cnfrmBtnContainer}>
						<TouchableOpacity style={styles.HelpBtn} onPress={updateMilestone}>
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
					onPress={() => navigation.navigate("DailyTimeline")}
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
					onPress={() => navigation.navigate("timeline")}
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
		setHideLoader: (data) => {
			dispatch(setHideLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthTimeline)

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

// for getting time from a date
// let date = new Date(mile.date)
// var hours = date.getHours()
// var minutes = "0" + date.getMinutes()
// var seconds = "0" + date.getSeconds()
// var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
