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
	TouchableWithoutFeedback,
} from "react-native"
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons"
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
	setAllGoals,
} from "./../../redux/actions"
import {
	getClickedGoalFromAsyncStorage,
	getFirstTimeTaskTutorial,
	getFirstTimeTimelineFlow,
} from "./../../utils/asyncStorage"
import {ColorConstants, CommonStyles, forGoals, sizeConstants} from "./../../core/styles"
import firestore from "@react-native-firebase/firestore"
import {CommonHomeButton} from "../../core/CommonComponents"
import {getAllGoalsFromFirestore} from "../../firebase"
import {withPressButtonAnimation} from "../../core/CustomAnimations"
const Height = Dimensions.get("window").height
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
		importData()
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
		console.log("getGoalCompletionPercent", allMilesLen, completedMilesLen, percentCompleted)
		return parseInt(percentCompleted.toFixed(0))
	}

	return (
		<StatusBarScreen style={styles.container}>
			<TouchableOpacity
				style={CommonStyles.titleContainer1}
				onPress={!firstTime ? gotoTaskTutorial : gotoTodaysTask}
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
			<View style={CommonStyles.goalsContainer}>
				<View style={{justifyContent: "center", alignItems: "center"}}>
					<View style={CommonStyles.viewTap}></View>
				</View>

				<View>
					<Text style={CommonStyles.myGoalsText}>My goals</Text>
				</View>

				<ScrollView contentContainerStyle={{paddingHorizontal: 0, marginHorizontal: 0}}>
					<View style={CommonStyles.logoSpacing}>
						{allGoals &&
							allGoals.length > 0 &&
							allGoals.map((task, index) => {
								let completedPercent = getGoalCompletionPercent(task)
								console.log("completedPercent", completedPercent)
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
		allGoals: state.milestone.allGoals,
		currentGoal: state.milestone.currentGoal,
		booleanFlag: state.milestone.booleanFlag,
		newMileStone: state.milestone.newMileStone,
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
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyGoals)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
})
