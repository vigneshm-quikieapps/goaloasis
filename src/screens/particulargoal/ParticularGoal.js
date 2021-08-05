import React, {useRef, useEffect, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal} from "react-native"
import {
	MaterialCommunityIcons,
	Octicons,
	AntDesign,
	MaterialIcons,
	Entypo,
} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import MilestoneCards from "../../components/MilestoneCards"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import RBBottomSheet from "../MileStones/RBBottomSheet"
import {CommonHomeButton} from "../../components/CommonComponents"
import {CommonStyles, height} from "../../core/constants"
import {sizeConstants, ColorConstants} from "../../core/constants"
import {scale, verticalScale} from "react-native-size-matters"
import GestureRecognizer from "react-native-swipe-gestures"
import {connect} from "react-redux"
import {
	getClickedGoalFromAsyncStorage,
	getFirstTimeIndividual,
	setisFirstTimeIndividual,
} from "./../../utils/asyncStorage"
import {setBooleanFlag, setFirstTimeForIndividualGoal} from "../../redux/actions"
import AppButton from "../MileStones/AppButton"
import Swipeout from "rc-swipeout"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"

const ParticularGoal = (props) => {
	const navigation = useNavigation()
	const [DATA, setData] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [allMilestonesLength, setMilestonesLength] = useState(0)
	const [completedMilestonesLength, setCompletedMilestonesLength] = useState(0)
	const [goalCompletedPercent, setGoalPercent] = useState(0)

	useEffect(() => {
		setModalVisible(false)
		getClickedGoalFromAsyncStorage(props.clickedGoal.name).then((goal) => {
			let goals = JSON.parse(goal)
			setData(goals.goalMilestone)
			getGoalCompletionPercent()
		})
	}, [props.clickedGoal, props.booleanFlag])

	useEffect(() => {
		getFirstTimeData()
	}, [props.firstTimeIndividual])

	const getFirstTimeData = async () => {
		setPageNo(0)
		const data = await getFirstTimeIndividual()
		console.log("data", data)
		props.setFirstTimeForIndividualGoal(data)
		const isFirst = data === "visited" ? false : true
		console.log("isFirst", isFirst)
		setModalVisible(isFirst)
	}

	const closeModal = async () => {
		await setisFirstTimeIndividual()
		props.setFirstTimeForIndividualGoal("visited")
		setModalVisible(false)
		// navigation.navigate("milestones")
	}

	const dataText = ["Congrats! You're one step closer to your goal.", "", ""]
	const buttonText = [
		"Long Press to mark complete",
		"Swipe right to add task",
		"Swipe left to of edit",
	]
	const [page, setPageNo] = useState(0)

	const getGoalCompletionPercent = () => {
		let allMilestonesArrayFromCurrentGoal = [...props.clickedGoal.goalMilestone]
		let allMilesLen = allMilestonesArrayFromCurrentGoal.length

		let allCompletedMiles = allMilestonesArrayFromCurrentGoal.filter((mile) => {
			return mile.isCompleted
		})

		console.log("allCompletedMiles", allCompletedMiles.length)
		let completedMilesLen = allCompletedMiles.length

		let percentCompleted = (completedMilesLen / allMilesLen) * 100
		console.log("getGoalCompletionPercent", allMilesLen, completedMilesLen, percentCompleted)

		setMilestonesLength(allMilesLen)
		setCompletedMilestonesLength(completedMilesLen)
		setGoalPercent(parseInt(percentCompleted.toFixed(1)))
	}

	const icons = () => (
		<View style={{flexDirection: "row", justifyContent: "space-between"}}>
			<MaterialCommunityIcons name="delete" size={25} color="#77777B" style={{marginRight: 0}} />
			<View style={{height: 35, width: 2, backgroundColor: "#77777B", borderRadius: 20}} />
			<Octicons name="pencil" size={25} color="#77777B" style={{marginLeft: 4}} />
		</View>
	)
	const goBack = () => {
		navigation.goBack()
	}
	const [taskCompleted, setCompleted] = useState(false)

	const onLongPress = (event) => {
		if (event.nativeEvent.state === State.ACTIVE) {
			console.log("LONGPRESS CALLED")
			setCompleted(true)
		}
	}

	// console.log("DATA FROM", DATA)
	return (
		<StatusBarScreen style={styles.container}>
			<View style={CommonStyles.titleContainer}>
				{/* MODAL CODE START */}
				<Modal animationType="slide" transparent={true} visible={modalVisible}>
					<View style={[CommonStyles.mainContainer, styles.blackOp60]}>
						<View style={styles.modalContainer}>
							<View style={styles.modalInnerContainer}>
								<View
									style={[
										styles.modalCommonStyle,
										CommonStyles.ML30,
										{backgroundColor: page >= 0 ? "white" : "gray"},
									]}
								/>
								<View
									style={[styles.modalCommonStyle, {backgroundColor: page >= 1 ? "white" : "gray"}]}
								/>
								<View
									style={[styles.modalCommonStyle, {backgroundColor: page >= 2 ? "white" : "gray"}]}
								/>
								<TouchableOpacity onPress={() => closeModal()}>
									<Text style={[styles.skipText, CommonStyles.ML30]}>Skip</Text>
								</TouchableOpacity>
							</View>

							<View style={[styles.modalContentContainer, {marginTop: page === 0 ? 30 : 0}]}>
								<Text style={styles.dataTextStyle}>{dataText[page]}</Text>
								{page == 0 ? (
									<Text style={[styles.contentText, CommonStyles.bold]}>
										Long press
										<Text style={CommonStyles.fontW100}> on the milestone when ready to </Text>
										mark complete
									</Text>
								) : null}
								{page == 1 ? (
									<Text style={[styles.contentText, CommonStyles.bold]}>
										Swipe right
										<Text style={CommonStyles.fontW100}> on the milestone if you want to </Text>
										add a task
										<Text style={CommonStyles.fontW100}> within the milestone.</Text>
									</Text>
								) : null}
								{page == 2 ? (
									<Text style={[{fontSize: sizeConstants.fourteenScale}, CommonStyles.bold]}>
										Swipe left
										<Text style={CommonStyles.fontW100}> if you want to </Text>
										delete or edit the milestone
									</Text>
								) : null}
							</View>
							<View style={{height: "30%", marginHorizontal: 15}}>
								<View
									style={{
										width: "100%",
										// position: "absolute",
										alignItems: "center",
										// bottom: -50,
									}}
								>
									{page == 0 ? (
										<LongPressGestureHandler
											onHandlerStateChange={onLongPress}
											minDurationMs={800}
											style={{alignSelf: "center"}}
										>
											{/* <AppButton
												title={taskCompleted ? "MISSION COMPLETE" : buttonText[page]}
												style={[
													styles.appBtn,
													{width: "80%", justifyContent: "center", borderRadius: 35, padding: 0},
												]}
											/> */}
											<TouchableOpacity style={{alignSelf: "center", width: "100%"}}>
												<View
													style={[
														styles.btnTextContainer,
														{
															borderRadius: sizeConstants.xl,
															marginVertical: sizeConstants.xl,
															width: "100%",
															elevation: 7,
															backgroundColor: taskCompleted ? "white" : ColorConstants.lighterBlue,
														},
													]}
												>
													<Text
														style={{
															fontSize: sizeConstants.fourteenScale,
															fontWeight: "bold",
															alignSelf: "center",
															color: ColorConstants.faintBlack1,
														}}
													>
														{taskCompleted ? "MISSION COMPLETE!" : buttonText[page]}
													</Text>
												</View>
											</TouchableOpacity>
										</LongPressGestureHandler>
									) : page == 1 ? (
										<Swipeout
											left={[
												{
													text: "ADD",
													onPress: () => {},
													style: CommonStyles.bgWhite,
												},
											]}
											autoClose={true}
											disabled={false}
											style={[
												CommonStyles.borderRadius20,
												{
													elevation: 7,
													marginTop: sizeConstants.xxl,
													marginBottom: sizeConstants.xxl,
													width: "100%",
													backgroundColor: ColorConstants.lighterBlue,
												},
											]}
										>
											<View style={styles.btnTextContainer}>
												<Text style={styles.btnText}>{buttonText[page]}</Text>
											</View>
										</Swipeout>
									) : (
										// <AppButton
										// 	title={buttonText[page]}
										// 	style={{
										// 		backgroundColor: "#7EC8C9",
										// 		fontSize: 15,
										// 		paddingTop: 13,
										// 		paddingBottom: 13,
										// 		color: "#333333",
										// 	}}
										// />

										<Swipeout
											right={[
												{
													text: icons(),
													onPress: () => {},
													style: CommonStyles.bgWhite,
												},
											]}
											autoClose={true}
											disabled={false}
											style={[
												CommonStyles.borderRadius20,
												{
													elevation: 7,
													marginTop: sizeConstants.xxl,
													marginBottom: sizeConstants.xxl,
													width: "100%",
													backgroundColor: ColorConstants.lighterBlue,
												},
											]}
										>
											<View style={styles.btnTextContainer}>
												<Text style={[styles.btnText]}>{buttonText[page]}</Text>
											</View>
										</Swipeout>
									)}
									<AppButton
										title="Next"
										style={{
											backgroundColor: ColorConstants.faintWhite,
											color: ColorConstants.faintBlack1,
											width: "100%",
											paddingVertical: sizeConstants.s,
											fontSize: sizeConstants.fourteenScale,
											elevation: 7,
											fontWeight: "bold",
											alignSelf: "center",
											color: ColorConstants.faintBlack2,
										}}
										onPress={() => (page === 2 ? closeModal() : setPageNo(page + 1))}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
				{/* MODAL CODE END */}
				<RBBottomSheet name={props.clickedGoal.name} />

				<ScrollView>
					<Text style={styles.subTitle}>{props.clickedGoal.description}</Text>
				</ScrollView>
				<View style={CommonStyles.trackingcont}>
					<ProgressCircle
						percent={goalCompletedPercent}
						radius={86}
						borderWidth={5}
						color="#588C8D"
						shadowColor="#999"
						bgColor="#FBF5E9"
					>
						<View style={CommonStyles.percentageCont}>
							<Text style={{fontSize: sizeConstants.fourteenScale, color: "#333333"}}>
								Target Date
							</Text>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: sizeConstants.fourteenScale,
									color: "#333333",
								}}
							>
								01/01/21
							</Text>
						</View>
					</ProgressCircle>

					<View style={{flexDirection: "row"}}>
						<View style={{marginHorizontal: 10, alignItems: "flex-start"}}>
							<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
								<View
									style={{
										height: 8,
										width: 8,
										borderRadius: 8,
										marginRight: 5,
										backgroundColor: "#588C8D",
									}}
								></View>
								<Text style={styles.goalsText}>Goal</Text>
							</View>

							<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
								<View
									style={{
										height: 8,
										width: 8,
										borderRadius: 8,
										marginRight: 5,
										backgroundColor: "#86C7C8",
									}}
								></View>
								<Text style={styles.goalsText}>Milestone</Text>
							</View>
						</View>
						<View>
							<Text style={styles.goalsText}>{`• ${goalCompletedPercent}%`}</Text>
							<Text
								style={styles.goalsText}
							>{`• ${completedMilestonesLength}/${allMilestonesLength}`}</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.goalsContainer}>
				<GestureRecognizer
					onSwipeUp={() => {
						navigation.navigate("milestones", {
							paramsItinerary: true,
						})
					}}
					// style={{backgroundColor: "#ff0000"}}
				>
					<View style={[styles.addMileStone]}>
						<Text style={styles.myGoalsText}>Add Milestones</Text>
						<View style={styles.viewTap}>
							<Entypo
								name="plus"
								size={33}
								color="#66A3A4"
								onPress={() => {
									navigation.navigate("FirstMilestone")
								}}
								style={{fontWeight: "bold"}}
							/>
						</View>
					</View>
				</GestureRecognizer>
				<View>
					<View>
						{/* <Text style={styles.myGoalsubtext}>
						It looks like you don’t have a plan to achieve your goal yet. Don’t worry! Tap (+) to
						add a milestone and get on your way.
					</Text> */}
						<ScrollView>
							<MilestoneCards
								style={{backgroundColor: ColorConstants.lighterBlue}}
								data={DATA[DATA.length - 1]}
								style={{marginTop: 0}}
							/>
						</ScrollView>
						{/* <View
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
						</View> */}
					</View>

					{/* <View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn} onPress={goBack}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View> */}
				</View>
			</View>

			<CommonHomeButton
				click={() => {
					navigation.navigate("mygoals")
				}}
				doNotWorkBackFunctionality={true}
				BackHandle={true}
				normalBack={true}
				clickforBack={() => navigation.navigate("mygoals")}
			/>
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
		fontSize: sizeConstants.fourteenScale, //16
		color: "#333333",
		marginLeft: scale(20),
		marginRight: scale(20),
	},

	goalsText: {
		fontSize: sizeConstants.fourteenScale, //19
		color: "black",
	},
	goalsContainer: {
		flex: 0.8,
		backgroundColor: "#588C8D",
		borderTopRightRadius: sizeConstants.fourty,
	},
	btnText: {
		fontSize: sizeConstants.fourteenScale,
		color: ColorConstants.faintBlack1,
		fontWeight: "bold",
		textAlign: "center",
		// letterSpacing: "1.2@s",
	},
	viewTap: {
		height: sizeConstants.fourty,
		width: sizeConstants.fourty,
		backgroundColor: "white",
		marginVertical: sizeConstants.m,
		borderRadius: sizeConstants.xxxl,
		justifyContent: "center",
		alignItems: "center",
	},
	myGoalsText: {
		fontSize: sizeConstants.twentyTwoScale,
		fontWeight: "bold",
		color: "black",
		marginHorizontal: verticalScale(20),
	},
	myGoalsubtext: {
		fontSize: sizeConstants.fourteenScale,
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

	addMileStone: {
		// marginLeft: "auto",
		flexDirection: "row",
		marginRight: sizeConstants.xl,
		marginVertical: sizeConstants.s,
		alignItems: "center",
		justifyContent: "space-between",
	},
	blackOp60: {backgroundColor: ColorConstants.blackOp60},

	modalContainer: {
		flex: 1,
		backgroundColor: ColorConstants.lightestBlue,
		marginVertical: height * 0.21,
		marginHorizontal: sizeConstants.mThirty,
		borderRadius: sizeConstants.m,
		minHeight: height * 0.48,
	},
	modalInnerContainer: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
		marginTop: sizeConstants.m,
	},
	modalCommonStyle: {
		height: sizeConstants.five,
		width: sizeConstants.sixty,
		marginTop: sizeConstants.mX,
		marginRight: sizeConstants.xsX,
	},

	skipText: {
		color: ColorConstants.darkGrey,
		fontSize: sizeConstants.fourteenScale,
	},
	modalContentContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		paddingHorizontal: sizeConstants.twentyX,
	},

	dataTextStyle: {
		fontSize: sizeConstants.fourteenScale,
		marginBottom: sizeConstants.m,
		color: ColorConstants.faintBlack1,
	},
	contentText: {fontSize: sizeConstants.fourteenScale, color: ColorConstants.faintBlack1},

	appBtn: {
		backgroundColor: ColorConstants.lighterBlue,
		fontSize: sizeConstants.fourteenScale,
		paddingVertical: sizeConstants.thirteenMX,
		color: ColorConstants.faintBlack1,
	},
	swipableBtnContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: sizeConstants.hundredMX,
		backgroundColor: ColorConstants.lighterBlue,
		justifyContent: "center",
	},
	swipableBtnIconContainer: {
		padding: sizeConstants.s,
		borderRightWidth: 1,
		borderRightColor: ColorConstants.black,
	},
	btnTextContainer: {
		justifyContent: "center",
		paddingHorizontal: sizeConstants.twentyMX,
		backgroundColor: ColorConstants.lighterBlue,
		width: sizeConstants.twoSeventyMX,
		height: sizeConstants.seventy,
	},
})
