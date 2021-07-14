import React, {useEffect, useContext, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, StatusBar} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {FontAwesome5} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {connect} from "react-redux"
import {setTestData} from "./../../redux/actions"

import {getFirstTimeUser} from "./../../utils/asyncStorage"
import authContext from "../../../src/context/auth/authContext"

const MyGoals = ({testData, setTestData}) => {
	const AuthContext = useContext(authContext)
	const {reload} = AuthContext
	useEffect(() => {
		console.log("check1", testData)

		fetchData()
	}, [testData, reload])

	const [firstTime, setFirstTime] = useState()
	console.log("TESTING--->", firstTime)
	const fetchData = async () => {
		const data = await getFirstTimeUser()
		setFirstTime(data)
	}
	const temp = () => {
		var data = testData == "tested" ? "testing..." : "tested"
		console.log(data)
		setTestData(data)
	}
	const navigation = useNavigation()

	const handleOpenNewGoal = () => {
		navigation.navigate("DParticularGoal")
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

	return (
		<StatusBarScreen style={styles.container}>
			<TouchableOpacity
				style={styles.titleContainer}
				onPress={firstTime ? gotoTaskTutorial : gotoTodaysTask}
			>
				<Text style={styles.mainTitle}>Today’s tasks</Text>
			</TouchableOpacity>

			<View style={styles.goalsContainer}>
				<View style={{justifyContent: "center", alignItems: "center"}}>
					<View style={styles.viewTap}></View>
				</View>

				<View>
					<Text style={styles.myGoalsText}>My goals</Text>
				</View>

				<View style={styles.logoSpacing}>
					<View>
						<TouchableOpacity style={styles.logoContainer} onPress={handleOpenNewGoal}>
							<ProgressCircle
								percent={5}
								radius={49}
								borderWidth={5}
								color="#588C8D"
								shadowColor="#999"
								bgColor="#FBF5E9"
							>
								<Text style={{fontSize: 18}}>{"5%"}</Text>
							</ProgressCircle>
							<Text style={styles.goalText}>Read five books</Text>
						</TouchableOpacity>

						{/* redux check  */}
						{/* <Text style={styles.goalText}>{testData}</Text>
						<TouchableOpacity style={styles.logoContainer} onPress={temp}>
							<Text style={styles.goalText}>test</Text>
						</TouchableOpacity> */}
						{/* redux check */}
					</View>

					<View>
						<TouchableOpacity style={styles.logoContainer} onPress={gotoGoal}>
							<View style={styles.circleLogo}>
								<View style={styles.iconVertical}></View>
								<View style={styles.iconHorizontal}></View>
							</View>
							<TouchableOpacity onPress={gotoGoal}>
								<View>
									<Text style={styles.goalText}>Add Goal</Text>
								</View>
							</TouchableOpacity>
						</TouchableOpacity>
					</View>

					<View></View>
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn}>
						<MaterialCommunityIcons name="file-tree-outline" size={34} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		testData: state.milestone.test,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTestData: (data) => {
			dispatch(setTestData(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyGoals)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
	titleContainer: {
		height: 95 - Constants.statusBarHeight,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},
	mainTitle: {
		color: "#FBF5E9",
		fontSize: 25,
		marginLeft: 20,
		marginVertical: 30,
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#FBF5E9",
		borderTopRightRadius: 70,
	},
	viewTap: {
		height: 6,
		width: 60,
		backgroundColor: "#588C8D",
		marginVertical: 10,
		borderRadius: 30,
		opacity: 0.5,
	},
	myGoalsText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#588C8D",
		marginHorizontal: 20,
	},
	logoSpacing: {
		flex: 1,
		flexDirection: "row",
		marginTop: "8%",
	},
	logoContainer: {
		alignItems: "center",
		marginLeft: 47,
	},
	circleLogo: {
		height: 100,
		width: 100,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: "#588C8D",
		justifyContent: "center",
		alignItems: "center",
	},
	iconVertical: {
		height: 30,
		width: 4,
		backgroundColor: "#588C8D",
	},
	iconHorizontal: {
		height: 4,
		width: 30,
		backgroundColor: "#588C8D",
		position: "absolute",
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 45,
		justifyContent: "center",
		alignItems: "center",
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
	goalText: {
		fontSize: 16,
		color: "#666666",
		textAlign: "center",
	},
})
