import React, {useRef, useEffect, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal} from "react-native"
import {MaterialCommunityIcons, Octicons, AntDesign, MaterialIcons} from "@expo/vector-icons"
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
import {getClickedGoalFromAsyncStorage, setisFirstTimeIndividual} from "./../../utils/asyncStorage"
import {setBooleanFlag, setFirstTimeForIndividualGoal} from "../../redux/actions"
import AppButton from "../MileStones/AppButton"
import Swipeout from "rc-swipeout"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"

const ParticularGoal = (props) => {
	const navigation = useNavigation()

	const [DATA, setData] = useState([])
	useEffect(() => {
		getFirstTimeData()
	}, [])
	const [taskCompleted, setCompleted] = useState(true)

	const onLongPress = (event) => {
		if (event.nativeEvent.state === State.ACTIVE) {
			// alert("I've been pressed for 800 milliseconds")
			setCompleted(!taskCompleted)
		}
	}

	const [modalVisible, setModalVisible] = useState(false)

	const closeModal = async () => {
		await setisFirstTimeIndividual()
		props.setFirstTimeForIndividualGoal("visited")
		setModalVisible(false)
		// navigation.navigate("milestones")
	}
	const getFirstTimeData = async () => {
		const data = await getFirstTimeIndividual()
		props.setFirstTimeForIndividualGoal(data)
		const isFirst = props.firstTimeIndividual === null ? true : false
		setModalVisible(isFirst)
	}
	const dataText = ["Congrats! You're one step closer to your goal.", "", ""]
	const buttonText = [
		"Long Press to mark complete",
		"Swipe right to add task",
		"Swipe left to of edit",
	]
	const [page, setPageNo] = useState(0)

	useEffect(() => {
		getClickedGoalFromAsyncStorage(props.clickedGoal.name).then((goal) => {
			let goals = JSON.parse(goal)
			setData(goals.goalMilestone)
		})
	}, [props.clickedGoal, props.booleanFlag])

	const icons = () => (
		<View style={{flexDirection: "row", justifyContent: "space-between"}}>
			<MaterialCommunityIcons name="delete" size={40} color="#77777B" style={{marginRight: 5}} />
			<Octicons name="pencil" size={40} color="#77777B" />
		</View>
	)
	const goBack = () => {
		navigation.goBack()
	}

	return (
		<StatusBarScreen style={styles.container}>
			<View style={CommonStyles.titleContainer}>
				{/* CREATING MODAL */}

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
									<Text style={[{fontSize: sizeConstants.twentyX}, CommonStyles.bold]}>
										Swipe left
										<Text style={CommonStyles.fontW100}> if you want to </Text>
										delete or edit the milestone
									</Text>
								) : null}
							</View>

							<View
								style={{
									alignItems: "center",
									marginTop: page == 0 ? 20 : 50,
								}}
							>
								{page == 0 ? (
									<AppButton title={buttonText[page]} style={styles.appBtn} />
								) : page == 1 ? (
									<Swipeout
										left={[
											{
												text: "ADD",
												onPress: () => {},
												style: CommonStyles.bgWhite,
											},
										]}
										right={[
											{
												text: icons(),

												onPress: () => {},
												style: CommonStyles.bgWhite,
											},
										]}
										autoClose={true}
										disabled={false}
										style={[CommonStyles.borderRadius30]}
									>
										<View style={CommonStyles.modalBottomBtn}>
											<Text style={[CommonStyles.btnText, styles.appBtn]}>{buttonText[page]}</Text>
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
												text: (
													<View style={CommonStyles.flexDirectionRow}>
														<View style={styles.swipableBtnIconContainer}>
															<AntDesign name="delete" size={24} color={ColorConstants.black} />
														</View>
														<View style={styles.swipableBtnIconContainer}>
															<MaterialIcons name="edit" size={24} color={ColorConstants.black} />
														</View>
													</View>
												),
												onPress: () => {},
												style: CommonStyles.bgWhite,
											},
										]}
										autoClose={true}
										disabled={false}
										style={CommonStyles.borderRadius30}
									>
										<View style={styles.btnTextContainer}>
											<Text style={[CommonStyles.btnText, {color: ColorConstants.black}]}>
												{buttonText[page]}
											</Text>
										</View>
									</Swipeout>
								)}
								<AppButton
									title="Next"
									style={{
										backgroundColor: ColorConstants.faintWhite,
										color: ColorConstants.faintBlack1,
									}}
									onPress={() => (page === 2 ? closeModal() : setPageNo(page + 1))}
								/>
							</View>
						</View>
					</View>
				</Modal>

				{/* MODEL CREATION END */}
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

	addMileStone: {
		// marginLeft: "auto",
		flexDirection: "row",
		marginRight: 40,
		marginTop: 20,
		justifyContent: "space-between",
	},
	blackOp60: {backgroundColor: ColorConstants.blackOp60},

	modalContainer: {
		flex: 1,
		backgroundColor: ColorConstants.lightestBlue,
		marginVertical: sizeConstants.hundred,
		marginHorizontal: sizeConstants.mThirty,
		borderRadius: sizeConstants.m,
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
		fontSize: sizeConstants.fifteenX,
	},
	modalContentContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		paddingHorizontal: sizeConstants.twentyX,
	},

	dataTextStyle: {
		fontSize: sizeConstants.twentyX,
		marginBottom: sizeConstants.m,
		color: ColorConstants.faintBlack1,
	},
	contentText: {fontSize: sizeConstants.twentyX, color: ColorConstants.faintBlack1},
	appBtn: {
		backgroundColor: ColorConstants.lighterBlue,
		fontSize: sizeConstants.fifteenMX,
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
