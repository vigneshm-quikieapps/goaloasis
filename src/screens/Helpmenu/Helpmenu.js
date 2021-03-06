import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import {CommonHomeButton} from "../../components/CommonComponents"
import {ColorConstants, sizeConstants} from "../../core/constants"
// import {getFirstTimeUser} from "./src/utils/asyncStorage"
// import {setisFirstTimeTaskTutorial} from "./../../utils/asyncStorage"
// import {setFirstTime} from "../../redux/actions"
import {connect} from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"
import {setisFirstTimeIndividual} from "../../utils/asyncStorage/goalsAsyncStore"
import {setFirstTimeForIndividualGoal} from "../../redux/actions"

const Helpmenu = ({setFirstTime, setFirstTimeForIndividualGoal, clickedGoal}) => {
	const navigation = useNavigation()

	const handleOpenNewGoal = () => {
		navigation.navigate("addgoal")
	}

	const gotoGoal = () => {
		navigation.navigate("particulargoal")
	}
	const gotoHome = () => {
		navigation.navigate("mygoals")
	}

	const gotoTodaysTask = () => {
		navigation.navigate("taskTutorialSlide1", {helpMenu: true})
	}
	console.log("PRINTED CLICKED GOAL", clickedGoal.goalMilestone.length)
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.mainTitle}>Help Menu</Text>
			</View>

			<View style={styles.goalsContainer}>
				{/* <View style={{justifyContent: "center", alignItems: "center"}}> */}
				{/* <View style={styles.viewTap}></View> */}
				{/* </View> */}

				<View style={{flex: 1, justifyContent: "center"}}>
					<Text
						style={{
							fontSize: sizeConstants.twentyTwoScale, //25
							color: "white",
							fontWeight: "bold",
							marginLeft: 20,
						}}
					>
						Help Menu
					</Text>

					<View style={{alignItems: "center", marginBottom: 20}}>
						<TouchableOpacity
							style={styles.HelpBtn}
							onPress={() => {
								{
									clickedGoal.goalMilestone.length === 0
										? setisFirstTimeIndividual("null").then(() => {
												setFirstTimeForIndividualGoal("null")
												navigation.navigate("DParticularGoal")
										  })
										: setisFirstTimeIndividual("null").then(() => {
												setFirstTimeForIndividualGoal("null")
												navigation.navigate("particulargoal")
										  })
								}
							}}
						>
							<Text style={styles.btnText}>Goal Screen</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.HelpBtn} onPress={gotoTodaysTask}>
							<Text style={styles.btnText}>Today???s Task</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.HelpBtn}
							onPress={() => navigation.navigate("timeline")}
						>
							<Text style={styles.btnText}>Timeline</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.bottomBtnContainer}>
						<TouchableOpacity
							style={styles.bottomBtn}
							onPress={() => navigation.navigate("mygoals")}
						>
							<MaterialCommunityIcons name="home" size={34} color="white" />
						</TouchableOpacity>
					</View> */}
				</View>
			</View>
			<CommonHomeButton
				click={gotoHome}
				size={34}
				iconColor={ColorConstants.white}
				bgColor={ColorConstants.lighterBlue}
			/>
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTime: state.milestone.firstTime,
		clickedGoal: state.milestone.clickedGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFirstTime: (data) => {
			dispatch(setFirstTime(data))
		},
		setFirstTimeForIndividualGoal: (flag) => {
			dispatch(setFirstTimeForIndividualGoal(flag))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Helpmenu)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		height: sizeConstants.ninety,
		backgroundColor: "#FBF5E9",
		justifyContent: "center",
	},
	mainTitle: {
		color: "black",
		fontSize: sizeConstants.twentyTwoScale, //24
		marginLeft: sizeConstants.twentyX,
		fontWeight: "bold",
		textAlign: "center",
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
		borderTopRightRadius: sizeConstants.seventyScale,
	},
	viewTap: {
		height: sizeConstants.six,
		width: sizeConstants.sixtyScale,
		backgroundColor: "#7EC8C9",
		marginVertical: sizeConstants.m,
		borderRadius: sizeConstants.thirtyScale,
		opacity: 0.5,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 40,
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

	HelpBtn: {
		backgroundColor: "#FDF9F2",
		height: 70,
		width: "75%",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		marginVertical: 20,
	},
	btnText: {
		fontSize: sizeConstants.eighteenScale, //20
		color: "black",
		fontWeight: "bold",
	},
})
