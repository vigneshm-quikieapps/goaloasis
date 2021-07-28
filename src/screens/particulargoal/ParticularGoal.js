import React, {useRef, useEffect, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import MilestoneCards from "../../components/MilestoneCards"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import RBBottomSheet from "../MileStones/RBBottomSheet"
import {CommonHomeButton} from "../../core/CommonComponents"
import {CommonStyles} from "../../core/styles"
import {sizeConstants, ColorConstants} from "./../../core/styles"
import {scale, verticalScale} from "react-native-size-matters"
import {connect} from "react-redux"
import {getClickedGoalFromAsyncStorage} from "./../../utils/asyncStorage"
import {setBooleanFlag} from "../../redux/actions"

const ParticularGoal = (props) => {
	const navigation = useNavigation()

	const [DATA, setData] = useState([])
	// useEffect(() => {
	// 	// setModalVisible(false)
	// 	// getFirstTimeData()
	// 	// setData(props.newMileStone)
	// 	setData(props.clickedGoal.goalMilestone)
	// }, [props.clickedGoal])

	useEffect(() => {
		// setModalVisible(false)
		getClickedGoalFromAsyncStorage(props.clickedGoal.name).then((goal) => {
			let goals = JSON.parse(goal)
			setData(goals.goalMilestone)
		})
	}, [props.clickedGoal, props.booleanFlag])

	console.log("Particular Goal", props.clickedGoal.goalMilestone)

	const goBack = () => {
		navigation.goBack()
	}

	return (
		<StatusBarScreen style={styles.container}>
			<View style={CommonStyles.titleContainer}>
				{/* <Text style={styles.mainTitle}>Read 5 books</Text> */}
				<RBBottomSheet name={props.clickedGoal.name} />
				<Text style={styles.subTitle}>I want to continue improve myself and my state of mind.</Text>
				<View style={CommonStyles.trackingcont}>
					<ProgressCircle
						percent={5}
						radius={86}
						borderWidth={5}
						color="#588C8D"
						shadowColor="#999"
						bgColor="#FBF5E9"
					>
						<View style={CommonStyles.percentageCont}>
							<Text>Target Date</Text>
							<Text style={{fontWeight: "bold"}}>01/01/21</Text>
						</View>
					</ProgressCircle>

					<View style={{flexDirection: "row"}}>
						<View style={{marginHorizontal: 10}}>
							<Text style={styles.goalsText}>
								<View
									style={{height: 8, width: 8, borderRadius: 8 / 2, backgroundColor: "#588C8D"}}
								></View>{" "}
								Goal
							</Text>
							<Text style={styles.goalsText}>
								<View
									style={{height: 8, width: 8, borderRadius: 8 / 2, backgroundColor: "#86C7C8"}}
								></View>{" "}
								Milestone
							</Text>
						</View>
						<View>
							<Text style={styles.goalsText}>• 0%</Text>
							<Text style={styles.goalsText}>• 0/0</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.goalsContainer}>
				<View style={styles.addMileStone}>
					<Text style={styles.myGoalsText}>Add Milestones</Text>
					<View style={styles.viewTap}>
						<MaterialCommunityIcons
							name="plus"
							size={40}
							color="#7EC8C9"
							onPress={() => {
								navigation.navigate("FirstMilestone")
							}}
						/>
					</View>
				</View>

				<View>
					{/* <Text style={styles.myGoalsubtext}>
						It looks like you don’t have a plan to achieve your goal yet. Don’t worry! Tap (+) to
						add a milestone and get on your way.
					</Text> */}
					<ScrollView>
						<MilestoneCards
							style={{backgroundColor: ColorConstants.lighterBlue}}
							fromParticularData={DATA}
							style={{marginTop: 0}}
						/>
					</ScrollView>
					<View
						style={{
							alignItems: "center",
							flexDirection: "row",
							justifyContent: "space-around",
							marginTop: verticalScale(10),
						}}
					>
						<View>
							<Text style={{fontSize: 24, color: "#FDF9F2", fontWeight: "bold"}}>
								See all milestones
							</Text>
						</View>
						<View>
							<TouchableOpacity
								style={[styles.btnStyling, styles.nextBtn]}
								onPress={() => navigation.navigate("milestones")}
							>
								<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
					</View>
				</View>

				{/* <View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn} onPress={goBack}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View> */}
			</View>
			<CommonHomeButton click={goBack} />
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTimeIndividual: state.milestone.firstTimeIndividual,
		clickedGoal: state.milestone.clickedGoal,
		newMileStone: state.milestone.newMileStone,
		clickedMilestone: state.milestone.clickedMilestone,
		booleanFlag: state.milestone.booleanFlag,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFirstTimeForIndividualGoal: (data) => {
			dispatch(setFirstTimeForIndividualGoal(data))
		},

		setBooleanFlag: (data) => {
			dispatch(setBooleanFlag(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ParticularGoal)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ColorConstants.faintWhite,
	},

	subTitle: {
		fontSize: sizeConstants.sixteen,
		color: "#333333",
		marginLeft: scale(20),
	},

	goalsText: {
		fontSize: sizeConstants.sixteen,
		color: "black",
	},
	goalsContainer: {
		flex: 0.8,
		backgroundColor: "#588C8D",
		borderTopRightRadius: sizeConstants.seventy,
	},
	viewTap: {
		height: sizeConstants.xxxl,
		width: sizeConstants.xxxl,
		backgroundColor: "white",
		marginVertical: sizeConstants.m,
		borderRadius: sizeConstants.xxxl,
		justifyContent: "center",
		alignItems: "center",
	},
	myGoalsText: {
		fontSize: sizeConstants.xxl,
		fontWeight: "bold",
		color: "black",
		marginHorizontal: verticalScale(20),
	},
	myGoalsubtext: {
		fontSize: 16,
		marginHorizontal: verticalScale(20),
		marginTop: sizeConstants.m,
		color: "#333333",
		lineHeight: sizeConstants.thirty,
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(204, 217, 237)",
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
	},
	nextBtn: {
		width: sizeConstants.fifty,
		height: sizeConstants.fifty,
		borderRadius: sizeConstants.fifty,
	},
	// container: {
	// 	flex: 1,
	// 	backgroundColor: "#FBF5E9",
	// },
	// titleContainer: {
	// 	flex: 0.5,
	// 	justifyContent: "center",
	// },
	// mainTitle: {
	// 	color: "#333333",
	// 	fontSize: 25,
	// 	marginLeft: 20,
	// 	fontWeight: "bold",
	// },

	// subTitle: {
	// 	fontSize: 16,
	// 	color: "#333333",
	// 	marginLeft: 20,
	// },
	addMileStone: {
		// marginLeft: "auto",
		flexDirection: "row",
		marginRight: 40,
		marginTop: 20,
		justifyContent: "space-between",
	},
	// trackingcont: {
	// 	//
	// 	marginHorizontal: 20,
	// 	marginVertical: 20,
	// 	flexDirection: "row",
	// 	marginTop: 20,
	// 	alignItems: "center",
	// 	justifyContent: "space-between",
	// },
	// percentageCont: {
	// 	height: 150,
	// 	width: 150,
	// 	borderRadius: 150 / 2,
	// 	backgroundColor: "#FBF5E9",
	// 	borderWidth: 5,
	// 	borderColor: "#C0E5E4",
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// goalsText: {
	// 	fontSize: 16,
	// },
	// goalsContainer: {
	// 	flex: 0.75,
	// 	backgroundColor: "#588C8D",
	// 	borderTopRightRadius: 70,
	// },
	// viewTap: {
	// 	height: 50,
	// 	width: 50,
	// 	backgroundColor: "white",
	// 	marginVertical: 10,
	// 	borderRadius: 50 / 2,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// myGoalsText: {
	// 	fontSize: 25,
	// 	fontWeight: "bold",
	// 	color: "black",
	// 	marginHorizontal: 20,
	// 	marginTop: -30,
	// 	marginBottom: 10,
	// },
	// myGoalsubtext: {
	// 	fontSize: 16,
	// 	marginHorizontal: 20,
	// 	marginTop: 10,
	// 	color: "#333333",
	// 	lineHeight: 30,
	// },
	// bottomBtnContainer: {
	// 	width: "100%",
	// 	position: "absolute",
	// 	bottom: 10,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// bottomBtn: {
	// 	height: 75,
	// 	width: 75,
	// 	borderRadius: 75 / 2,
	// 	backgroundColor: "white",
	// 	elevation: 5,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
})
