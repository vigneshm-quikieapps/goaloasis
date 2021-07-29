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
	newMileStone,
}) => {
	// const [test, setTest] = useState({})

	useEffect(() => {
		// getAllGoalsFromFirestore((goals) => {
		// 	// console.log("goals from firestore", goals)
		// })
		// console.log("Height of this device is: ", Height)
		fetchData()
	}, [testData, firstTime, firstTimeTimelineFlow, allGoals])

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

	const getColor = (index) => {
		const a = (index + 1) % 6
		return colorArray[a]
	}
	const colorArray = Object.values(forGoals)

	useEffect(() => {
		importData()
	}, [currentGoal, booleanFlag])

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
			console.log("RESULT", result)
			setAllGoals(result)
		} catch (error) {
			console.error(error)
		}
	}
	console.log("ALL GOALS", allGoals)
	console.log("LATEST MILESTONE", newMileStone)

	return (
		<StatusBarScreen style={styles.container}>
			<TouchableOpacity
				style={CommonStyles.titleContainer1}
				onPress={!firstTime ? gotoTaskTutorial : gotoTodaysTask}
			>
				<View style={{flexDirection: "row"}}>
					{/* <IconBadge
						MainElement={
							<Text style={[CommonStyles.mainTitle, {marginBottom: sizeConstants.twelve}]}>
								Today’s tasks
							</Text>
						}
						BadgeElement={<Text style={{color: "#FFFFFF"}}>0</Text>}
						IconBadgeStyle={{
							width: 30,
							height: 30,
							backgroundColor: ColorConstants.gray,
						}}
					/> */}

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
						<Text style={{color: "#FFFFFF", alignSelf: "center"}}>0</Text>
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
							allGoals.map((task, index) => (
								<View key={index}>
									<TouchableOpacity
										style={CommonStyles.logoContainer}
										onPress={() => {
											task.isCompleted ? null : handleOpenNewGoal(task.name)
										}}
									>
										<ProgressCircle
											percent={task.isCompleted ? 100 : 0}
											radius={sizeConstants.fiftyHalf}
											borderWidth={5}
											color={getColor(index)}
											shadowColor="#999"
											bgColor="#FBF5E9"
										>
											<Text style={{fontSize: 22, color: getColor(index), fontWeight: "bold"}}>
												{task.isCompleted ? "100%" : "0%"}
											</Text>
										</ProgressCircle>
										<Text style={CommonStyles.goalText}>{task.name}</Text>
									</TouchableOpacity>
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
