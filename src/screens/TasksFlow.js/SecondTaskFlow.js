import React, {useEffect, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import colors from "../../../colors"

import {Entypo} from "@expo/vector-icons"
import Constants from "expo-constants"
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "../../core/styles"
import AppButton from "./../MileStones/AppButton"
import {CommonHomeButton, CommonPrevNextButton} from "../../core/CommonComponents"
import DisableAppButton from "../MileStones/DisableAppButton"
import {connect} from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"

const SecondTaskFlow = ({clickedGoal, clickedMilestone, route}) => {
	const navigation = useNavigation()
	const {task: taskName, date: taskDate} = route.params
	useEffect(() => {}, [clickedGoal])

	const particularGoal = () => {
		navigation.navigate("particulargoal")
	}
	// const goBack = () => {
	// 	navigation.goBack()
	// }

	const [date, setDate] = useState(new Date())

	const [taskData, setTaskData] = useState(taskName)
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	// console.log("taskDATA", taskData)

	return (
		<ImageBackground
			style={[styles.introContainer, styles.image, CommonStyles.pr10]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<View style={[CommonStyles.flexDirectionRow, {marginTop: Constants.statusBarHeight}]}>
				<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
				<Entypo
					name="cross"
					color={ColorConstants.faintWhite}
					size={38}
					style={CommonStyles.cross}
					onPress={() => navigation.navigate("DParticularGoal")}
				/>
			</View>

			<Text style={styles.milestoneText}>Enter Task</Text>
			<View style={styles.centerCont}>
				<TextInput
					style={styles.textInput}
					placeholder="Type Here"
					value={taskData}
					onChangeText={(text) => setTaskData(text)}
				/>
			</View>

			{taskData === "" ? (
				<View style={[CommonStyles.mt20, CommonStyles.alignItemsCenter]}>
					<DisableAppButton title="Edit Date" style={{backgroundColor: "#C0E5E4"}} />
				</View>
			) : (
				<View style={[CommonStyles.mt20, CommonStyles.alignItemsCenter]}>
					<AppButton
						onPress={() => {
							navigation.navigate("thirdtaskflow", {taskDate: taskDate, taskName: taskName})
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
					{/* <View>
						<TouchableOpacity
							style={[styles.btnStylingRight, styles.nextBtn]}
							onPress={() => navigation.navigate("thirdtaskflow")}
						>
							<MaterialCommunityIcons
								name="chevron-right"
								size={sizeConstants.fifty}
								color="#7EC8C9"
							/>
						</TouchableOpacity>
					</View> */}
				</View>

				{/* <View style={CommonStyles.alignItemsCenter}>
					<TouchableOpacity style={styles.btnStyling}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View> */}
				{/* <CommonPrevNextButton right={true} nextClick={() => navigation.navigate("thirdtaskflow")} /> */}

				<CommonPrevNextButton
					right={true}
					style={taskData === "" ? {backgroundColor: ColorConstants.whiteOp50} : {}}
					nextClick={() => {
						taskData === "" ? null : navigation.navigate("particulargoal")
						// navigation.navigate("thirdtaskflow")
					}}
					size={50}
					bottom={0}
				/>
			</View>

			<CommonHomeButton click={() => navigation.navigate("particulargoal")} />
		</ImageBackground>
	)
}
const mapStateToProps = (state) => {
	console.log("TASK FLOW DATA", state.taskFlowData)
	return {
		taskFlowData: state.milestone.taskFlowData,
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTaskFlowData: (task) => dispatch(setTaskFlowData(task)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SecondTaskFlow)
const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: ColorConstants.darkFaintBlue,
	},

	subTitle: {
		fontSize: sizeConstants.sixteenX,
		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyOne,
		marginTop: sizeConstants.m,
		paddingLeft: sizeConstants.three,
		paddingRight: sizeConstants.xs,
	},
	mainTitle: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.xxl,
		marginLeft: sizeConstants.twentyOne,
	},
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
		borderRadius: sizeConstants.seventyFive / 2,
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
		borderRadius: sizeConstants.seventyFive / 2,
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / 2,
	},
	nextBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		backgroundColor: ColorConstants.faintWhite,
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.three,
		paddingLeft: sizeConstants.twentyX,
		fontSize: sizeConstants.nineteenX,
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
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
		fontSize: sizeConstants.sixteenX,
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
	nextBtnInner: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: sizeConstants.thirtySix,
	},
})
