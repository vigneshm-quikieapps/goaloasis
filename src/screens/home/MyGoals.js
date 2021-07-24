import React, {useEffect, useContext, useState} from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	StatusBar,
	ScrollView,
} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {FontAwesome5} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {connect} from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"

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
import {CommonStyles, forGoals, sizeConstants} from "./../../core/styles"
import firestore from "@react-native-firebase/firestore"

const MyGoals = ({
	testData,
	setTestData,
	firstTime,
	setFirstTime,
	firstTimeTimelineFlow,
	setClickedGoal,
}) => {
	const [test, setTest] = useState({})

	useEffect(() => {
		fetchData()
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
				? navigation.navigate("milestones")
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

	//async code
	const [tasks, setTasks] = useState([])

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
		getData()
		// console.log("GOAL DATA", allTasks);
	}, [allTasks])

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
									{/* <TouchableOpacity
									style={CommonStyles.logoContainer}
									onPress={() => navigation.navigate("third")}
								> */}
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
							<TouchableOpacity style={CommonStyles.logoContainer} onPress={gotoGoal}>
								<View style={CommonStyles.circleLogo}>
									<View style={CommonStyles.iconVertical}></View>
									<View style={CommonStyles.iconHorizontal}></View>
								</View>
								<TouchableOpacity onPress={gotoGoal}>
									<View>
										<Text style={CommonStyles.goalText}>Add Goal</Text>
									</View>
								</TouchableOpacity>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
				<View style={CommonStyles.bottomBtnContainer}>
					<TouchableOpacity
						style={CommonStyles.bottomBtn2}
						// onPress={!firstTimeTimelineFlow ? gotoTimelineTutorial : gotoTimelineScreen}
						onPress={() => navigation.navigate("DParticularGoal")}
					>
						<MaterialCommunityIcons name="file-tree-outline" size={34} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTime: state.milestone.firstTime,
		firstTimeTimelineFlow: state.milestone.firstTimeTimelineFlow,
		clickedGoal: state.milestone.clickedGoal,
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
