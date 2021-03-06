import React, {useEffect, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"
import {useNavigation} from "@react-navigation/native"
import colors from "../../../colors"
import {Entypo} from "@expo/vector-icons"
import Constants from "expo-constants"
import {
	ColorConstants,
	colorsForTimeline,
	commonImages,
	CommonStyles,
	sizeConstants,
	TaskColorArray,
} from "../../core/constants"
import AppButton from "./../MileStones/AppButton"
import {
	checkInternetConnectionAlert,
	CommonHomeButton,
	CommonPrevNextButton,
	reoccuringDefaultDailyArray,
} from "../../components/CommonComponents"
import DisableAppButton from "../MileStones/DisableAppButton"
import {connect} from "react-redux"
import {addMilestoneToFirestore} from "../../firebase/goals"
import {setShowLoader, setBooleanFlag, setClickedGoal} from "../../redux/actions"

const SecondTaskFlow = (props) => {
	const {
		setShowLoader,
		loading,
		clickedGoal,
		clickedMilestone,
		route,
		setClickedGoal,
		setBooleanFlag,
		internet,
		allGoals,
	} = props
	const navigation = useNavigation()
	const {currentTaskData} = route.params

	useEffect(() => {}, [clickedGoal])

	const [taskName, setTaskName] = useState(currentTaskData.task)
	// const [taskName, setTaskName] = useState("")

	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>

	const navigationCallback = () => {
		setBooleanFlag(true)
		navigation.navigate("particulargoal")
	}
	const nextScreen = () => {
		if (!internet) {
			checkInternetConnectionAlert(() => {})
			return
		}
		let newMilestoneItemWithTask = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone == clickedMilestone) {
				let filteredTasks = item.taskData.filter((tsk) => tsk.task != taskName)
				let color = colorsForTimeline.find((itemColor) => itemColor.goal === clickedGoal.color)

				return {
					...item,
					taskData: [
						...filteredTasks,
						{
							isCompleted: false,
							task: taskName,
							date: currentTaskData.date,
							color: color[task],
							reoccuring: {
								startDate: null,
								reoccuringType: "none",
								reoccuringDays: [],
							},
						},
					],
				}
			} else return item
		})

		let updatedObj = {
			...clickedGoal,
			goalMilestone: newMilestoneItemWithTask,
		}
		setShowLoader(true)

		addMilestoneToFirestore(clickedGoal, newMilestoneItemWithTask, () => {
			setShowLoader(false)

			setClickedGoal(updatedObj)
			navigationCallback()
		})
	}

	return (
		<ImageBackground
			style={[CommonStyles.introContainer]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<View style={[CommonStyles.flexDirectionRow, {marginTop: Constants.statusBarHeight}]}>
				<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
				<Entypo
					name="cross"
					color={ColorConstants.faintWhite}
					size={38}
					style={{
						backgroundColor: ColorConstants.greyishBlue,
						borderRadius: sizeConstants.twentyMX,
						position: "absolute",
						top: sizeConstants.s,
						right: sizeConstants.m,
					}}
					onPress={() => {
						if (clickedGoal.goalMilestone === null || clickedGoal.goalMilestone.length === 0) {
							navigation.navigate("DParticularGoal")
						} else {
							navigation.navigate("particulargoal")
						}
					}}
				/>
			</View>

			<Text style={styles.milestoneText}>Enter Task</Text>
			<View style={CommonStyles.centerCont}>
				<TextInput
					style={styles.textInput}
					placeholder="Type Here"
					value={taskName}
					onChangeText={(text) => setTaskName(text)}
					maxLength={28}
				/>
			</View>

			{taskName === "" ? (
				<View style={[CommonStyles.mt20, CommonStyles.alignItemsCenter]}>
					<DisableAppButton
						title="Edit Date"
						style={{backgroundColor: ColorConstants.lightestBlue}}
					/>
				</View>
			) : (
				<View style={[CommonStyles.mt20, CommonStyles.alignItemsCenter]}>
					<AppButton
						onPress={() => {
							navigation.navigate("thirdtaskflow", {
								currentTaskData: {taskDate: currentTaskData.date, taskName: taskName},
							})
						}}
						title="Edit Date"
						style={styles.editButton}
					/>
				</View>
			)}

			<Text style={styles.subTitle}>
				{tip()} adding a target date will help you stay on track. Dont't worry! You can always
				change it.
			</Text>

			<View style={styles.nextBtnContainer}>
				<View style={styles.nextBtnInner}>
					<View></View>
				</View>

				<CommonPrevNextButton
					right={true}
					style={taskName === "" ? {backgroundColor: ColorConstants.whiteOp50} : {}}
					nextClick={() => {
						taskName === "" ? null : nextScreen()
					}}
					size={50}
				/>
			</View>

			<CommonHomeButton
				click={() => navigation.navigate("particulargoal")}
				BackHandle={true}
				normalBack={true}
				clickforBack={() => navigation.goBack()}
			/>
		</ImageBackground>
	)
}
const mapStateToProps = (state) => {
	return {
		taskFlowData: state.milestone.taskFlowData,
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
		loading: state.milestone.loading,
		allGoals: state.milestone.allGoals,
		internet: state.milestone.internet,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTaskFlowData: (task) => dispatch(setTaskFlowData(task)),
		setClickedGoal: (task) => dispatch(setClickedGoal(task)),
		setBooleanFlag: (task) => dispatch(setBooleanFlag(task)),
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SecondTaskFlow)
const styles = StyleSheet.create({
	subTitle: {
		fontSize: sizeConstants.fourteenScale, //16

		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyOne,
		marginTop: sizeConstants.m,
		paddingLeft: sizeConstants.three,
		marginRight: sizeConstants.twentyOne,
	},
	// mainTitle: {
	// 	color: ColorConstants.faintWhite,
	// 	fontSize: sizeConstants.eighteenScale, //25
	// 	marginLeft: sizeConstants.twentyOne,
	// },
	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: sizeConstants.twentyX,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: ColorConstants.white,
		elevation: sizeConstants.s,
		justifyContent: "center",
		alignItems: "center",
	},
	btnStylingRight: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
	},

	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		backgroundColor: ColorConstants.faintWhite,
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.three,
		paddingLeft: sizeConstants.twentyX,
		fontSize: sizeConstants.eighteenScale, //19
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
		alignSelf: "center",
	},

	cross: {
		backgroundColor: ColorConstants.darkFaintBlue,
		borderRadius: sizeConstants.twentyX,
		position: "absolute",
		right: 0,
		marginRight: sizeConstants.m,
	},
	milestoneText: {
		marginTop: sizeConstants.twentyX,
		fontSize: sizeConstants.fourteenScale, //16
		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyOne,
	},
	editButton: {color: ColorConstants.gray, backgroundColor: ColorConstants.faintWhite},
	nextBtnContainer: {
		position: "absolute",
		bottom: sizeConstants.mThirty,
		width: "100%",
		justifyContent: "center",
	},
	nextBtn: {
		width: sizeConstants.fiftyX,
		height: sizeConstants.fiftyX,
		borderRadius: sizeConstants.xxl,
	},
	nextBtnInner: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: sizeConstants.thirtySix,
	},
})
