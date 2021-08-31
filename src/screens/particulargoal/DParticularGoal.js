import React, {useEffect, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal} from "react-native"

import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import RBBottomSheet from "../MileStones/RBBottomSheet"
import {
	MaterialCommunityIcons,
	Octicons,
	AntDesign,
	MaterialIcons,
	Entypo,
} from "@expo/vector-icons"
import {connect} from "react-redux"
import {
	ColorConstants,
	commonDateFormat,
	commonImages,
	CommonStyles,
	sizeConstants,
} from "../../core/constants"
import Swipeout from "rc-swipeout"

import {moderateScale, scale, verticalScale} from "react-native-size-matters"
import {CommonHomeButton} from "../../components/CommonComponents"
import dayjs from "dayjs"
import {getFirstTimeIndividual} from "../../utils/asyncStorage/goalsAsyncStore"
import {setisFirstTimeIndividual} from "../../utils/asyncStorage/goalsAsyncStore"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"
import AppButton from "./../MileStones/AppButton"
import {setBooleanFlag, setFirstTimeForIndividualGoal} from "../../redux/actions"
import {height} from "./../../core/constants"

const DParticularGoals = (props) => {
	console.log("====================================")
	console.log("PROSP", props)
	console.log("====================================")
	const navigation = useNavigation()
	const [modalVisible, setModalVisible] = useState(false)
	const [taskCompleted, setCompleted] = useState(false)

	const [page, setPageNo] = useState(0)

	// useEffect(() => {
	// 	// setModalVisible(false)
	// }, [props.booleanFlag])
	useEffect(() => {
		getFirstTimeData()
	}, [props.firstTimeIndividual])

	const onLongPress = (event) => {
		if (event.nativeEvent.state === State.ACTIVE) {
			console.log("LONGPRESS CALLED")
			setCompleted(true)
		}
	}
	const getFirstTimeData = async () => {
		setPageNo(0)
		const data = await getFirstTimeIndividual()
		console.log("data", data)
		props.setFirstTimeForIndividualGoal(data)
		const isFirst = data === "visited" ? false : true
		console.log("isFirst", isFirst)
		setModalVisible(isFirst)
	}
	const icons = () => (
		<View style={{flexDirection: "row", justifyContent: "space-between"}}>
			<MaterialCommunityIcons name="delete" size={25} color="#77777B" style={{marginRight: 0}} />
			<View style={{height: 35, width: 2, backgroundColor: "#77777B", borderRadius: 20}} />
			<Octicons name="pencil" size={25} color="#77777B" style={{marginLeft: 4}} />
		</View>
	)
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

	const goBack = () => {
		navigation.goBack()
	}
	const goHome = () => {
		navigation.navigate("mygoals")
	}
	return (
		<StatusBarScreen style={styles.container}>
			<View style={CommonStyles.titleContainer}>
				<RBBottomSheet name={props.clickedGoal.name} id={props.clickedGoal.name} />
				<ScrollView style={{height: 80}}>
					<Text style={styles.subTitle}>{props.clickedGoal.description}</Text>
				</ScrollView>

				<View style={CommonStyles.trackingcont}>
					<ProgressCircle
						percent={0}
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
							<Text style={{fontWeight: "bold", color: "#333333"}}>
								{dayjs(props.clickedGoal.targetDate).format(commonDateFormat)}
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
							<Text style={styles.goalsText}>• 0%</Text>
							<Text style={styles.goalsText}>• 0/0</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.goalsContainer}>
				<View style={[styles.addMileStone]}>
					<Text style={styles.myGoalsText}>My Milestones</Text>
					<View style={styles.viewTap}>
						<Entypo
							name="plus"
							size={33}
							color="#66A3A4"
							onPress={() => {
								navigation.navigate("FirstMilestone", {
									setBackEditScreen: true,
								})
							}}
							style={{fontWeight: "bold"}}
						/>
					</View>
				</View>

				<View>
					<Text style={styles.myGoalsubtext}>
						It looks like you don’t have a plan to achieve your goal yet. Don’t worry! Tap (+) to
						add a milestone and get on your way.
					</Text>
				</View>
			</View>
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
			<CommonHomeButton
				click={() => navigation.navigate("mygoals")}
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

export default connect(mapStateToProps, mapDispatchToProps)(DParticularGoals)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ColorConstants.faintWhite,
	},

	subTitle: {
		fontSize: sizeConstants.fourteenScale,
		color: "#333333",
		marginLeft: scale(20),
	},

	goalsText: {
		fontSize: sizeConstants.fourteenScale,
		color: "#333333",
	},
	goalsContainer: {
		flex: 0.8,
		backgroundColor: "#588C8D",
		borderTopRightRadius: sizeConstants.fourty,
	},
	blackOp60: {backgroundColor: ColorConstants.blackOp60},
	btnText: {
		fontSize: sizeConstants.fourteenScale,
		color: ColorConstants.faintBlack1,
		fontWeight: "bold",
		textAlign: "center",
		// letterSpacing: "1.2@s",
	},
	modalContentContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		paddingHorizontal: sizeConstants.twentyX,
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
		color: "#333333",
		marginHorizontal: verticalScale(20),
		width: "77%",
		// backgroundColor: "pink",
	},
	myGoalsubtext: {
		fontSize: sizeConstants.fourteenScale,
		marginHorizontal: verticalScale(20),
		marginTop: sizeConstants.m,
		color: "#333333",
		lineHeight: sizeConstants.thirty,
	},
	addMileStone: {
		flexDirection: "row",
		marginRight: sizeConstants.xl,
		marginVertical: sizeConstants.s,
		alignItems: "center",
		justifyContent: "space-between",
	},
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
	btnTextContainer: {
		justifyContent: "center",
		paddingHorizontal: sizeConstants.twentyMX,
		backgroundColor: ColorConstants.lighterBlue,
		width: sizeConstants.twoSeventyMX,
		height: sizeConstants.seventy,
	},
	dataTextStyle: {
		fontSize: sizeConstants.fourteenScale,
		marginBottom: sizeConstants.m,
		color: ColorConstants.faintBlack1,
	},
	contentText: {fontSize: sizeConstants.fourteenScale, color: ColorConstants.faintBlack1},
})
