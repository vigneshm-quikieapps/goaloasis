import React, {useEffect, useContext, useState} from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	StatusBar,
	ScrollView,
	Dimensions,
} from "react-native"
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons"
import {FontAwesome5} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {connect} from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"
import firebase from "firebase"
import {
	setTestData,
	setFirstTime,
	setFirstTimeForTimeLine,
	setTestDataForTimeline,
	setClickedGoal,
} from "./../../redux/actions"
import {
	getClickedGoalFromAsyncStorage,
	getFirstTimeTaskTutorial,
	getFirstTimeTimelineFlow,
} from "./../../utils/asyncStorage"
import {
	ColorConstants,
	CommonStyles,
	firebaseConstants,
	forGoals,
	sizeConstants,
} from "./../../core/styles"
import firestore from "@react-native-firebase/firestore"
import {CommonHomeButton} from "../../core/CommonComponents"
import Spinner from "./../../core/Spinner"
import {getAllGoalsFromFirestore} from "../../firebase"

const {GOALS_COLLECTION} = firebaseConstants
const Height = Dimensions.get("window").height
const MyGoals = ({
	testData,
	setTestData,
	firstTime,
	setFirstTime,
	firstTimeTimelineFlow,
	setClickedGoal,
	setShowLoader,
	setHideLoader,
	loading,
	currentGoal,
	clickedGoal,
}) => {
	const [test, setTest] = useState({})

	useEffect(() => {
		getAllGoalsFromFirestore((goals) => {})
		fetchData()
		gettingAllData()
	}, [testData, firstTime, firstTimeTimelineFlow])

	const fetchData = async () => {
		const data = await getFirstTimeTaskTutorial().catch((err) => console.log(err))
		const data1 = await getFirstTimeTimelineFlow().catch((err) => console.log(err))
		console.log("getFirstTimeTimelineFlow", !firstTimeTimelineFlow)
		setFirstTime(data)
		setFirstTimeForTimeLine(data1)
	}
	const navigation = useNavigation()

	const handleOpenNewGoal = (task) => {
		getClickedGoalFromAsyncStorage(task).then((data) => {
			let clickedGoal = JSON.parse(data)
			console.log("clicked goal from mygoals", clickedGoal)
			setClickedGoal(clickedGoal)

			clickedGoal && clickedGoal.goalMilestone.length
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

	const goToProblem = () => {
		// navigation.navigate("FirstMilestone")
		// navigation.navigate("secondtaskflow")
		navigation.navigate("IndividualGoal")
		// navigation.navigate("particulargoal")
	}
	//async code
	const [tasks, setTasks] = useState([])
	const [goal, setAllGoals] = useState([])

	let allTasks = []
	const getData = async () => {
		try {
			const value = await AsyncStorage.getAllKeys().catch((e) => {
				console.log(e)
			})
			if (value !== null) {
				setTasks(value)
			}
		} catch (e) {
			console.log(e)
		}
	}
	tasks.map((task) => {
		if (
			task !== "FirsttimeIndividual" &&
			task !== "FirsttimeTaskTutorial" &&
			task !== "FirsttimeTimelineFlow" &&
			task !== "Firsttime"
		) {
			allTasks.push(task)
		}
	})

	const getColor = (index) => {
		const a = (index + 1) % 6
		return colorArray[a]
	}
	const colorArray = Object.values(forGoals)

	useEffect(() => {
		// if (loader === false) {
		// 	// setShowLoader()
		// 	setTimeout(() => {
		// 		// setLoader(true)
		// 	}, 2000)
		// } else {
		// 	setTimeout(() => {s
		console.log("second use effect")
		getData()
		// console.log("GOAL DATA", allTasks);
	}, [allTasks])

	const [firebaseData, setFirebaseData] = useState([])
	const [firebaseCompletedGoal, setFirebaseCompletedGoal] = useState([])

	const gettingAllData = () => {
		firestore()
			.collection("Goals")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					setFirebaseData(doc.data())
				})
			})
	}
	// firebaseData.map((item) => {
	// 	if (item.isCompleted === true) {
	// 		setFirebaseCompletedGoal(item)
	// 	}
	// })
	// console.log("FROM HOME SCREEN", firebaseData)

	return (
		<StatusBarScreen style={styles.container}>
			<TouchableOpacity
				style={CommonStyles.titleContainer1}
				onPress={!firstTime ? gotoTaskTutorial : gotoTodaysTask}
			>
				<Text style={CommonStyles.mainTitle}>Today’s tasks</Text>
			</TouchableOpacity>

			<View style={CommonStyles.goalsContainer}>
				<View style={{justifyContent: "center", alignItems: "center"}}>
					<View style={CommonStyles.viewTap}></View>
				</View>

				<View>
					<Text style={CommonStyles.myGoalsText}>My goals</Text>
				</View>
				{/* {getAllGoalsFromFirestore().then((data) => console.log("DATA", data))} */}
				{/* {getAllGoalsFromFirestore()} */}
				<ScrollView contentContainerStyle={{paddingHorizontal: 0, marginHorizontal: 0}}>
					<View style={CommonStyles.logoSpacing}>
						{allTasks.map((task, index) => (
							<View key={index}>
								<TouchableOpacity
									style={CommonStyles.logoContainer}
									onPress={() => {
										handleOpenNewGoal(task)
									}}
								>
									{/* {console.log("TASKKKKKKKKKKK", task)} */}
									{/* <TouchableOpacity
									style={CommonStyles.logoContainer}
									onPress={() => navigation.navigate("third")}
								> */}
									{setFirebaseCompletedGoal.contains(task) ? (
										<ProgressCircle
											percent={100}
											radius={sizeConstants.fiftyHalf}
											borderWidth={5}
											color={getColor(index)}
											shadowColor="#999"
											bgColor="#FBF5E9"
										>
											<Text style={{fontSize: 22, color: getColor(index), fontWeight: "bold"}}>
												{"100%"}
											</Text>
										</ProgressCircle>
									) : (
										<ProgressCircle
											percent={0}
											radius={sizeConstants.fiftyHalf}
											borderWidth={5}
											color={getColor(index)}
											shadowColor="#999"
											bgColor="#FBF5E9"
										>
											<Text style={{fontSize: 22, color: getColor(index), fontWeight: "bold"}}>
												{"0%"}
											</Text>
										</ProgressCircle>
									)}

									<Text style={CommonStyles.goalText}>{task}</Text>
								</TouchableOpacity>

								{/* redux check  */}
								{/* <Text style={styles.goalText}>{testData}</Text>
						<TouchableOpacity style={styles.logoContainer} onPress={temp}>
							<Text style={styles.goalText}>test</Text>
						</TouchableOpacity> */}
								{/* redux check */}
							</View>
						))}

						<View>
							{/* <TouchableOpacity style={CommonStyles.logoContainer} onPress={gotoGoal}>
								<View style={CommonStyles.circleLogo}>
									<View style={CommonStyles.iconVertical}></View>
									<View style={CommonStyles.iconHorizontal}></View>
								</View>
								<TouchableOpacity onPress={gotoGoal}>
									<View>
										<Text style={CommonStyles.goalText}>Add Goal</Text>
									</View>
								</TouchableOpacity>
							</TouchableOpacity> */}

							<TouchableOpacity style={CommonStyles.logoContainer} onPress={gotoGoal}>
								{/* <TouchableOpacity
									style={CommonStyles.logoContainer}
									onPress={() => navigation.navigate("third")}
								> */}
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
			/>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTime: state.milestone.firstTime,
		firstTimeTimelineFlow: state.milestone.firstTimeTimelineFlow,
		clickedGoal: state.milestone.clickedGoal,
		loading: state.milestone.loading,
		currentGoal: state.milestone.currentGoal,
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
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyGoals)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
})
