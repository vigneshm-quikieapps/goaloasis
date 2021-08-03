import React, {useState, useEffect} from "react"
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native"
import {MaterialCommunityIcons, AntDesign, MaterialIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import AppButton from "./AppButton"
import StatusBarScreen from "./StatusBarScreen"
import {LinearGradient} from "expo-linear-gradient"
import RBBottomSheet from "./RBBottomSheet"
import Swipeout from "rc-swipeout"
import {setFirstTimeForIndividualGoal} from "./../../redux/actions"
import {getFirstTimeIndividual, setisFirstTimeIndividual} from "./../../utils/asyncStorage"
import {connect} from "react-redux"
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "../../core/constants"
import {CommonHomeButton} from "../../components/CommonComponents"
import MilestoneCards from "../../components/MilestoneCards"

const IndividualGoal = (props) => {
	const [DATA, setData] = useState([])
	useEffect(() => {
		// setModalVisible(false)
		// getFirstTimeData()
		// setData(props.newMileStone)
		setData(props.clickedGoal.goalMilestone)
	}, [props.clickedGoal])
	// console.log("CLICKED FROM PARTICULAR", props.clickedGoal.goalMilestone)
	// console.log("LENGTH", DATA.length)
	// console.log("DATA FROM PARTICULAR", DATA[DATA.length - 1])

	// const getFirstTimeData = async () => {
	// 	const data = await getFirstTimeIndividual()
	// 	props.setFirstTimeForIndividualGoal(data)
	// 	const isFirst = props.firstTimeIndividual === null ? true : false
	// 	// setModalVisible(isFirst)
	// }

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
	return (
		<StatusBarScreen
			style={[CommonStyles.mainContainer, {backgroundColor: ColorConstants.faintWhite}]}
		>
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
				{/* <Text style={styles.mainTitle}>Read 5 books</Text> */}
				<RBBottomSheet name={props.clickedGoal.name} />
				<Text style={styles.subTitle}>I want to continue improve myself and my state of mind.</Text>
				<View style={styles.trackingcont}>
					<ProgressCircle
						percent={5}
						radius={85}
						borderWidth={5}
						color={ColorConstants.darkFaintBlue}
						shadowColor="#999"
						bgColor={ColorConstants.lightestYellow}
					>
						<View style={styles.percentageCont}>
							<Text>Target Date</Text>
							<Text style={CommonStyles.bold}>01/01/21</Text>
						</View>
					</ProgressCircle>

					<View style={CommonStyles.flexDirectionRow}>
						<View style={CommonStyles.MX10}>
							<Text style={styles.goalsText}>
								<View
									style={[
										CommonStyles.dotStyle,
										CommonStyles.borderRadius4,
										{
											backgroundColor: ColorConstants.darkFaintBlue,
										},
									]}
								></View>
								Goal
							</Text>
							<Text style={styles.goalsText}>
								<View
									style={[
										CommonStyles.dotStyle,
										CommonStyles.borderRadius4,
										{
											backgroundColor: ColorConstants.mediumFaintBlue,
										},
									]}
								></View>
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

			<LinearGradient
				colors={[ColorConstants.darkFaintBlue, ColorConstants.lighterBlue]}
				style={styles.goalsContainer}
			>
				<View style={styles.addMileStone}>
					<View style={CommonStyles.MX10}>
						<Text style={[{fontSize: sizeConstants.mThirty}, CommonStyles.bold]}>
							My Milestones
						</Text>
					</View>

					<View style={styles.viewTap}>
						<MaterialCommunityIcons
							name="plus"
							size={40}
							color={ColorConstants.lighterBlue}
							onPress={() => {
								// navigation.navigate("FirstMilestone")
								navigation.navigate("particulargoal")
							}}
						/>
					</View>
				</View>

				{/* <TouchableOpacity
					onPress={() => {
						navigation.navigate("SecondIndividualGoal")
					}}
					style={{
						height: "30%",
						width: "80%",
						borderRadius: 22,
						// backgroundColor: "#7EC8C9",
						backgroundColor: "pink",
						alignSelf: "center",
						marginTop: 10,
					}}
				>
					<Text
						style={[{
							top: "35%",
							color: "#333333",
							fontSize: 20,
							marginLeft: 20,
							
						},CommonStyles.bold]}
					>
						Read 1 Book
					</Text>
					<Text
						style={[{
							top: "35%",
							color: "#333333",
							fontSize: 20,
							right: 20,
							position: "absolute",
						
						},CommonStyles.bold]}
					>
						Task:0/1
					</Text>
				</TouchableOpacity> */}

				{/* <View style={styles.swipeButton}>
					<Swipeout
						left={[
							{
								text: <MaterialCommunityIcons name="plus" size={40} color="#77777B" />,
								onPress: () => navigation.navigate("AfterModal"),
								style: {backgroundColor: ColorConstants.faintWhite},
							},
						]}
						right={[
							{
								text: <MaterialCommunityIcons name="plus" size={40} color="#77777B" />,
								onPress: () => navigation.navigate("AfterModal"),
								style: {backgroundColor: ColorConstants.faintWhite},
							},
						]}
						// onOpen={() => console.log("open")}
						// onClose={() => console.log("close")}
						autoClose={true}
						disabled={false}
					>
						<View style={styles.swipableBtnContainer}>
							<Text style={[styles.sliderText, CommonStyles.bold]}>Read 1 Book</Text>
							<Text style={[styles.sliderText, CommonStyles.bold]}>Task:0/1</Text>
						</View>
					</Swipeout>
				</View> */}

				<MilestoneCards
					style={{backgroundColor: ColorConstants.lighterBlue}}
					fromIndividual={DATA}
				/>

				{/* <View style={[CommonStyles.btnContainer, {bottom: sizeConstants.l}]}>
					<TouchableOpacity style={styles.bottomBtn} onPress={goBack}>
						<MaterialCommunityIcons name="home" size={44} color={ColorConstants.lighterBlue} />
					</TouchableOpacity>
				</View> */}
				<CommonHomeButton click={goBack} />
			</LinearGradient>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTimeIndividual: state.milestone.firstTimeIndividual,
		clickedGoal: state.milestone.clickedGoal,
		newMileStone: state.milestone.newMileStone,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFirstTimeForIndividualGoal: (data) => {
			dispatch(setFirstTimeForIndividualGoal(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(IndividualGoal)

const styles = StyleSheet.create({
	mainTitle: {
		color: ColorConstants.faintBlack1,
		fontSize: sizeConstants.xxl,
		marginLeft: sizeConstants.twentyOne,
	},
	subTitle: {
		fontSize: sizeConstants.sixteen,
		color: ColorConstants.faintBlack1,
		marginLeft: sizeConstants.twentyOne,
	},

	addMileStone: {
		// marginLeft: "auto",
		paddingRight: sizeConstants.fifty,
		marginTop: sizeConstants.xl,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	sliderText: {
		color: sizeConstants.faintBlack1,
		fontSize: sizeConstants.nineteen,
		margin: sizeConstants.thirty,
	},
	trackingcont: {
		margin: sizeConstants.xl,
		marginTop: sizeConstants.m,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	swipeButton: {
		alignContent: "center",
		borderRadius: sizeConstants.twentyTwo,
		overflow: "hidden",
		marginHorizontal: sizeConstants.twentyOne,
		justifyContent: "center",
		marginTop: sizeConstants.fifty,
		// shadowColor: "#00000029",
	},

	percentageCont: {
		height: 160,
		width: 160,
		borderRadius: 80,
		backgroundColor: ColorConstants.lightestYellow,
		borderWidth: sizeConstants.five,
		borderColor: ColorConstants.lightestBlue,
		justifyContent: "center",
		alignItems: "center",
	},

	goalsText: {
		fontSize: sizeConstants.sixteen,
	},
	goalsContainer: {
		flex: 0.75,
		borderTopRightRadius: sizeConstants.seventy,
	},
	viewTap: {
		height: sizeConstants.fourty,
		width: sizeConstants.fourty,
		backgroundColor: ColorConstants.white,
		marginBottom: sizeConstants.m,
		borderRadius: sizeConstants.fourty,
		justifyContent: "center",
		alignItems: "center",
	},

	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / 2,
		backgroundColor: ColorConstants.white,
		elevation: sizeConstants.five,
		justifyContent: "center",
		alignItems: "center",
	},
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
