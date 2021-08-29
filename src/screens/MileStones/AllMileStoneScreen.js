import React, {useState, useEffect, useRef} from "react"
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native"
import {Entypo} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import AllMilestones from "../../components/AllMilestones"
import RBSheet from "react-native-raw-bottom-sheet"
import StatusBarScreen from "./StatusBarScreen"
import {setFirstTimeForIndividualGoal} from "./../../redux/actions"
import {
	getClickedGoalFromAsyncStorage,
	getFirstTimeIndividual,
	setisFirstTimeIndividual,
} from "../../utils/asyncStorage/goalsAsyncStore"
import {StatusBar} from "expo-status-bar"
import {ColorConstants, CommonStyles, sizeConstants} from "../../core/constants"
import AppButton from "./AppButton"
import {connect} from "react-redux"
import Swipeout from "rc-swipeout"
import {CommonHomeButton} from "../../components/CommonComponents"
import {height} from "./../../core/constants"
import {scale} from "react-native-size-matters"
import {verticalScale} from "react-native-size-matters"
import GestureRecognizer from "react-native-swipe-gestures"

const AllMilestonesScreen = (props) => {
	const [DATA, setData] = useState([])
	const navigation = useNavigation()
	const [modalVisible, setModalVisible] = useState(false)

	// Modal Code

	useEffect(() => {
		setModalVisible(false)
		getFirstTimeData()
		getClickedGoalFromAsyncStorage(props.clickedGoal.name).then((goal) => {
			let goals = JSON.parse(goal)
			setData(goals.goalMilestone)
		})
	}, [props.firstTimeIndividual, props.clickedGoal])

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

	const goBack = () => {
		navigation.goBack()
	}

	const [isLongPressed, setLongPressed] = useState(false)
	// Modal Code End
	const refRBSheet = useRef()

	return (
		<StatusBarScreen style={styles.container}>
			{/* <GestureRecognizer
				onSwipeDown={() => {
					navigation.navigate("particulargoal", {
						paramsItinerary: true,
					})
				}}
			> */}
			<TouchableOpacity
				onPress={() => refRBSheet.current.open()}
				style={[styles.threeDots, {marginTop: verticalScale(35)}]}
			>
				<View style={CommonStyles.dots} />
				<View style={CommonStyles.dots} />
				<View style={CommonStyles.dots} />
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.titleContainer, {width: "85%"}]}
				onPress={() => navigation.navigate("particulargoal")}
			/>
			{/* </GestureRecognizer> */}

			<View style={styles.goalsContainer}>
				<GestureRecognizer
					onSwipeDown={() => {
						navigation.navigate("particulargoal", {
							paramsItinerary: true,
						})
					}}
				>
					<View
						style={{
							marginTop: sizeConstants.xxl,
							flexDirection: "row",
							paddingBottom: 10,
						}}
					>
						<View>
							<Text style={styles.myGoalsText}>My milestones</Text>
						</View>
						<View style={[styles.viewTap]}>
							<Entypo
								name="plus"
								size={33}
								color="#66A3A4"
								onPress={() => {
									navigation.navigate("FirstMilestone")
								}}
							/>
						</View>
					</View>
				</GestureRecognizer>

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
					doNotWorkBackFunctionality={true}
					BackHandle={true}
					normalBack={true}
					clickforBack={() => navigation.navigate("particulargoal")}
				/>
			</View>
			<RBSheet
				height={height * 0.7}
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent",
						borderRadius: 50,
					},
					draggableIcon: {
						backgroundColor: "#000",
						borderRadius: 50,
					},
					container: {
						borderTopRightRadius: 40,
						borderTopLeftRadius: 40,
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
		height: sizeConstants.thirtyFive,
		width: sizeConstants.thirtyFive,
		backgroundColor: ColorConstants.white,
		marginBottom: sizeConstants.m,
		borderRadius: sizeConstants.thirtyFive,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row-reverse",
		position: "absolute",
		right: 0,
		marginRight: sizeConstants.xl,
	},
	titleContainer: {
		height: sizeConstants.xxxl,
		justifyContent: "center",
	},
	mainTitle: {
		color: "#FBF5E9",
		fontSize: sizeConstants.twentyTwoScale, //25

		marginLeft: sizeConstants.twentyX,
		fontWeight: "bold",
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
		borderTopRightRadius: sizeConstants.fourty,
	},

	myGoalsText: {
		fontSize: sizeConstants.twentyTwoScale, //25
		// backgroundColor: "pink",
		fontWeight: "bold",
		color: "black",
		width: "110%",
		marginHorizontal: sizeConstants.twentyX,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 70,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: ColorConstants.lighterBlue,
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	BottomTouch: {
		height: sizeConstants.hundred,
		width: "100%",
		borderWidth: 1,
		borderLeftColor: "white",
		borderRightColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomText: {
		fontSize: sizeConstants.twentyTwoScale, //25

		fontWeight: "bold",
		color: "black",
	},

	// MODAL CODE

	goalsText: {
		fontSize: sizeConstants.sixteenX,
	},
	// goalsContainer: {
	// 	flex: 0.75,
	// 	borderTopRightRadius: sizeConstants.seventy,
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
		fontSize: sizeConstants.sixteenX,
	},
	modalContentContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		paddingHorizontal: sizeConstants.twentyX,
	},

	dataTextStyle: {
		fontSize: sizeConstants.eighteenScale, //20
		marginBottom: sizeConstants.m,
		color: ColorConstants.faintBlack1,
	},
	//20
	contentText: {fontSize: sizeConstants.eighteenScale, color: ColorConstants.faintBlack1},
	appBtn: {
		backgroundColor: ColorConstants.lighterBlue,
		fontSize: sizeConstants.sixteenX, //15
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
	threeDots: {
		backgroundColor: "#F4EFE7",
		flexDirection: "row",
		position: "absolute",
		right: scale(0),
		// bottom: verticalScale(0.2),
		margin: scale(10),
		width: verticalScale(40),
		height: verticalScale(27),
		borderRadius: scale(30),
		alignItems: "center",
		justifyContent: "center",
	},
})
