import React, {useState, useEffect, useRef} from "react"
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native"
import {MaterialCommunityIcons, AntDesign, MaterialIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import AllMilestones from "../../components/AllMilestones"
import RBSheet from "react-native-raw-bottom-sheet"
import StatusBarScreen from "./StatusBarScreen"
import {setFirstTimeForIndividualGoal} from "./../../redux/actions"
import {
	getClickedGoalFromAsyncStorage,
	getFirstTimeIndividual,
	setisFirstTimeIndividual,
} from "./../../utils/asyncStorage"
import {StatusBar} from "expo-status-bar"
import {ColorConstants, CommonStyles, sizeConstants} from "../../core/styles"
import AppButton from "./AppButton"
import {connect} from "react-redux"
import Swipeout from "rc-swipeout"
import {CommonHomeButton} from "../../core/CommonComponents"

const AllMilestonesScreen = (props) => {
	const [DATA, setData] = useState([])
	// Modal Code
	useEffect(() => {
		setModalVisible(false)
		getFirstTimeData()
		getClickedGoalFromAsyncStorage(props.clickedGoal.name).then((goal) => {
			let goals = JSON.parse(goal)
			setData(goals.goalMilestone)
			console.log("all milesss", goals.goalMilestone)
		})
	}, [props.firstTimeIndividual, props.clickedGoal])
	console.log("FROM ALL MILESTONESCREEN", DATA)
	const getFirstTimeData = async () => {
		const data = await getFirstTimeIndividual()
		props.setFirstTimeForIndividualGoal(data)
		const isFirst = props.firstTimeIndividual === null ? true : false
		setModalVisible(isFirst)
	}

	const closeModal = async () => {
		await setisFirstTimeIndividual()
		props.setFirstTimeForIndividualGoal("visited")
		setModalVisible(false)
		// navigation.navigate("milestones")
	}
	const navigation = useNavigation()
	const dataText = ["Congrats! You're one step closer to your goal.", "", ""]
	const buttonText = [
		"Long Press to mark complete",
		"Swipe right to add task",
		"Swipe left to of edit",
	]
	const [page, setPageNo] = useState(0)

	const goBack = () => {
		navigation.goBack()
	}

	const [modalVisible, setModalVisible] = useState(false)
	const [isLongPressed, setLongPressed] = useState(false)
	// Modal Code End
	const refRBSheet = useRef()

	return (
		<StatusBarScreen style={styles.container}>
			<TouchableOpacity onPress={() => refRBSheet.current.open()}>
				<View style={{justifyContent: "flex-end", flexDirection: "row", margin: 20}}>
					<View
						style={{backgroundColor: "black", height: 8, width: 8, borderRadius: 4, margin: 1}}
					></View>
					<View
						style={{backgroundColor: "black", height: 8, width: 8, borderRadius: 4, margin: 1}}
					></View>
					<View
						style={{backgroundColor: "black", height: 8, width: 8, borderRadius: 4, margin: 1}}
					></View>
				</View>
			</TouchableOpacity>

			<View style={styles.titleContainer}></View>
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
									autoClose={true}
									disabled={false}
									style={CommonStyles.borderRadius30}
								>
									<View style={CommonStyles.modalBottomBtn}>
										<Text style={CommonStyles.btnText}>{buttonText[page]}</Text>
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
									style={[CommonStyles.borderRadius30]}
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
									width: "80%",
								}}
								onPress={() => (page === 2 ? closeModal() : setPageNo(page + 1))}
							/>
						</View>
					</View>
				</View>
			</Modal>
			{/* MODAL CODE END */}

			<View style={styles.goalsContainer}>
				<View style={{marginTop: 25, flexDirection: "row"}}>
					<View>
						<Text style={styles.myGoalsText}>My milestoness</Text>
					</View>
					<View style={styles.viewTap}>
						<MaterialCommunityIcons
							name="plus"
							size={28}
							color="#7EC8C9"
							onPress={() => {
								navigation.navigate("FirstMilestone")
							}}
						/>
					</View>
				</View>

				<View>
					<AllMilestones data={DATA} />
				</View>

				{/* <View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn}>
						<MaterialCommunityIcons
							name="home"
							size={34}
							color="white"
							onPress={() => navigation.navigate("mygoals")}
						/>
					</TouchableOpacity>
				</View> */}
				<CommonHomeButton
					iconColor={ColorConstants.white}
					click={() => navigation.navigate("mygoals")}
					bgColor={ColorConstants.lighterBlue}
				/>
			</View>
			<RBSheet
				height={500}
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent",
					},
					draggableIcon: {
						backgroundColor: "#000",
					},
				}}
			>
				<View style={{alignItems: "center", marginTop: 20, width: "100%"}}>
					<TouchableOpacity
						style={styles.BottomTouch}
						onPress={() => navigation.navigate("markcomplete")}
					>
						<Text style={styles.bottomText}>Mark Goal Complete</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.BottomTouch}
						onPress={() => navigation.navigate("editgoal")}
					>
						<Text style={styles.bottomText}>Edit Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.BottomTouch}
						onPress={() => navigation.navigate("deletegoal")}
					>
						<Text style={styles.bottomText}>Delete Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.BottomTouch} onPress={() => navigation.navigate("help")}>
						<Text style={styles.bottomText}>Tutorial</Text>
					</TouchableOpacity>
				</View>
			</RBSheet>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTimeIndividual: state.milestone.firstTimeIndividual,
		clickedGoal: state.milestone.clickedGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFirstTimeForIndividualGoal: (data) => {
			dispatch(setFirstTimeForIndividualGoal(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AllMilestonesScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	viewTap: {
		flexDirection: "row-reverse",
		margin: 120,
		height: 35,
		width: 35,
		backgroundColor: "white",
		marginVertical: 10,
		borderRadius: 35 / 2,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		height: 50,
		justifyContent: "center",
	},
	mainTitle: {
		color: "#FBF5E9",
		fontSize: 24,
		marginLeft: 20,
		fontWeight: "bold",
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
		borderTopRightRadius: 70,
		// marginTop: -50,
	},

	myGoalsText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "black",
		marginHorizontal: 20,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 70,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: ColorConstants.lighterBlue,
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	BottomTouch: {
		height: 100,
		width: "100%",
		borderWidth: 1,
		borderLeftColor: "white",
		borderRightColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},

	// MODAL CODE

	goalsText: {
		fontSize: sizeConstants.sixteen,
	},
	// goalsContainer: {
	// 	flex: 0.75,
	// 	borderTopRightRadius: sizeConstants.seventy,
	// },
	// viewTap: {
	// 	height: sizeConstants.fifty,
	// 	width: sizeConstants.fifty,
	// 	backgroundColor: ColorConstants.white,
	// 	marginBottom: sizeConstants.m,
	// 	borderRadius: sizeConstants.fifty / 2,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },

	// bottomBtn: {
	// 	height: sizeConstants.seventyFive,
	// 	width: sizeConstants.seventyFive,
	// 	borderRadius: sizeConstants.seventyFive / 2,
	// 	backgroundColor: ColorConstants.white,
	// 	elevation: sizeConstants.five,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	swipeBtnStyling: {
		justifyContent: "center",
		paddingHorizontal: sizeConstants.xl,
		backgroundColor: ColorConstants.white,
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
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
		paddingVertical: sizeConstants.thirteen,
		paddingHorizontal: 0,
		width: "80%",
		color: ColorConstants.faintBlack1,
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
