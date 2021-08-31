import React, {useState, useEffect} from "react"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ScrollView,
	ImageBackground,
} from "react-native"
import {
	ColorConstants,
	commonDateFormat,
	commonImages,
	CommonStyles,
	sizeConstants,
} from "./../../core/constants"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Entypo} from "@expo/vector-icons"

import {Calendar, LocaleConfig} from "react-native-calendars"
import StatusBarScreen from "./../MileStones/StatusBarScreen"
import {
	addNewMilestone,
	EditNewMilestone,
	setBooleanFlag,
	setClickedGoal,
	setTaskFlowData,
} from "./../../redux/actions"
import {addMilestoneToFirestore, getAllGoalsFromFirestore} from "../../firebase/goals"
import {connect} from "react-redux"
import {
	calendarLocale,
	CommonHomeButton,
	CommonPrevNextButton,
	CustomDayComponentForCalendar,
	reoccuringDefaultDailyArray,
} from "../../components/CommonComponents"
import AppButton from "../MileStones/AppButton"
import dayjs from "dayjs"
var utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

LocaleConfig.locales["en"] = calendarLocale
LocaleConfig.defaultLocale = "en"

const FirstTaskFlow = ({
	setTaskFlowData,
	clickedGoal,
	newMileStone,
	clickedMilestone,
	taskFlowData,
	setBooleanFlag,
	setClickedGoal,
}) => {
	const [taskName, setTaskName] = useState("")

	useEffect(() => {
		setTaskName("")
	}, [])
	const navigation = useNavigation()
	const [clickedDate, setDate] = useState(dayjs().format(commonDateFormat))

	const nextScreen = () => {
		navigation.navigate("thirdtaskflow", {
			currentTaskData: {taskDate: dayjs().format(commonDateFormat), taskName: taskName},
		})
		setTaskName("")
	}

	const [toggleCalandar, setToggleCalandar] = useState(false)
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	return (
		<ImageBackground
			style={[CommonStyles.mainContainer, styles.image]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<View style={CommonStyles.mainContainer}>
				<StatusBarScreen>
					<View style={CommonStyles.flexOne}>
						<View style={CommonStyles.flexDirectionRow}>
							<ScrollView>
								<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
							</ScrollView>

							<Entypo
								name="cross"
								color={ColorConstants.faintWhite}
								size={38}
								style={CommonStyles.cross}
								onPress={() => {
									if (
										clickedGoal.goalMilestone === null ||
										clickedGoal.goalMilestone.length === 0
									) {
										navigation.navigate("DParticularGoal")
										console.log("clickedGoal.goalMilestone", clickedGoal)
									} else {
										navigation.navigate("particulargoal")
									}
								}}
							/>
						</View>

						<Text style={styles.subTitle}>Enter Task</Text>

						<View style={styles.centerCont}>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								onChangeText={(text) => setTaskName(text)}
								maxLength={28}
								focusable={true}
								value={taskName}
							/>
						</View>

						{taskName === "" || toggleCalandar === true ? (
							<View>
								<Text style={styles.bigTitle}>Edit target date</Text>

								<View style={[CommonStyles.calendarContainer, CommonStyles.targetAndDoneContainer]}>
									<Text style={CommonStyles.targetDate}>Target Date</Text>

									<TouchableOpacity
										activeOpacity={taskName !== "" ? 0.5 : 1}
										// onPress={() => {
										// 	taskName !== "" && nextScreen()
										// }}
										style={{position: "absolute", right: 25}}
									>
										<Text
											style={[
												CommonStyles.done,
												{
													color:
														// taskName !== "" ? ColorConstants.faintWhite :
														ColorConstants.whiteOp50,
												},
											]}
										>
											Done
										</Text>
									</TouchableOpacity>
								</View>

								<Calendar
									current={dayjs().format(commonDateFormat)}
									minDate={dayjs().format(commonDateFormat)}
									hideArrows={taskName === "" ? true : false}
									hideExtraDays={true}
									disableMonthChange={taskName === "" ? true : false}
									hideDayNames={false}
									showWeekNumbers={false}
									onPressArrowLeft={(subtractMonth) => subtractMonth()}
									onPressArrowRight={(addMonth) => addMonth()}
									disableArrowLeft={false}
									enableSwipeMonths={taskName === "" ? false : true}
									theme={{
										backgroundColor: ColorConstants.transparent,
										calendarBackground: ColorConstants.transparent,
										textSectionTitleColor: ColorConstants.whitishBlue,
										textSectionTitleDisabledColor: ColorConstants.whitishBlue,
										selectedDayBackgroundColor: ColorConstants.whitishBlue,
										selectedDayTextColor: ColorConstants.black,
										todayTextColor: "#00adf5",
										dayTextColor: ColorConstants.whitishBlue,
										textDisabledColor: ColorConstants.whitishBlue,
										dotColor: ColorConstants.whitishBlue,
										selectedDotColor: ColorConstants.whitishBlue,
										arrowColor: ColorConstants.whitishBlue,
										disabledArrowColor: ColorConstants.whitishBlue,
										monthTextColor: ColorConstants.whitishBlue,
										indicatorColor: "blue",
										textDayFontFamily: "monospace",
										textMonthFontFamily: "monospace",
										textDayHeaderFontFamily: "monospace",
										textDayFontWeight: "300",
										textMonthFontWeight: "bold",
										textDayHeaderFontWeight: "300",
									}}
									dayComponent={({date, state}) => {
										return (
											<CustomDayComponentForCalendar
												date={date}
												state={state}
												clickedDate={
													toggleCalandar === true && taskName !== "" ? clickedDate : null
												}
												dayClick={setDate}
											/>
										)
									}}
								/>
							</View>
						) : (
							// 				(	{taskName === "" ?
							// 	<View style={[CommonStyles.mt20, CommonStyles.alignItemsCenter]}>
							// 		<DisableAppButton
							// 			title="Edit Date"
							// 			style={{backgroundColor: ColorConstants.lightestBlue}}
							// 		/>
							// 	</View>
							//  :
							<View>
								<View style={[CommonStyles.mt20, CommonStyles.alignItemsCenter]}>
									<AppButton
										onPress={() => {
											// navigation.navigate("thirdtaskflow", {
											// 	// currentTaskData: {taskDate: currentTaskData.date, taskName: taskName},
											// 	currentTaskData: {taskDate: taskName},
											// })
											navigation.navigate("thirdtaskflow", {
												// currentTaskData: {taskDate: currentTaskData.date, taskName: taskName},
												currentTaskData: {taskDate: clickedDate, taskName: taskName},
											})
											// setToggleCalandar(true)
										}}
										title="Edit Date"
										style={styles.editButton}
									/>
								</View>

								<Text style={styles.subTitle}>
									{tip()} adding a target date will help you stay on track. Dont't worry! You can
									always change it.
								</Text>
							</View>
						)}
					</View>
				</StatusBarScreen>
			</View>
			{taskName !== "" && toggleCalandar === true ? (
				<TouchableOpacity
					style={[CommonStyles.containerMilestone]}
					onPress={() => {
						navigation.navigate("first", {
							taskDate: clickedDate,
							taskName: taskName,
						})
					}}
				>
					<Text style={CommonStyles.reoccuring}>Set reoccuring</Text>
				</TouchableOpacity>
			) : null}
			{taskName === "" ? (
				<CommonPrevNextButton
					right={true}
					style={{backgroundColor: ColorConstants.whiteOp50}}
					size={50}
					bottom={100}
				/>
			) : (
				// <CommonPrevNextButton right={true} nextClick={nextScreen} size={50} bottom={0} />
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
						bottom={100}
					/>
				</View>
			)}
			<CommonHomeButton
				click={() => navigation.navigate("particulargoal")}
				BackHandle={true}
				normalBack={true}
				clickforBack={() => navigation.navigate("particulargoal")}
			/>
		</ImageBackground>
	)
}
const mapStateToProps = (state) => {
	return {
		taskFlowData: state.milestone.taskFlowData,
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
		booleanFlag: state.milestone.booleanFlag,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTaskFlowData: (task) => dispatch(setTaskFlowData(task)),
		setBooleanFlag: (task) => dispatch(setBooleanFlag(task)),
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstTaskFlow)
const styles = StyleSheet.create({
	mainTitle: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.eighteenScale, //25
		marginLeft: sizeConstants.twentyMX,
	},
	subTitle: {
		fontSize: sizeConstants.fourteenScale, //16
		color: ColorConstants.faintWhite,
		paddingLeft: sizeConstants.twentyOne,
		marginTop: sizeConstants.l,
		paddingRight: sizeConstants.twentyMX,
	},

	image: {
		width: "100%",
		height: "100%",
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: "white",
		elevation: sizeConstants.s,
		justifyContent: "center",
		alignItems: "center",
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.faintWhite,
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		right: 0,
		display: "flex",
		alignSelf: "flex-end",
	},
	nextBtn: {
		width: sizeConstants.fiftyX,
		height: sizeConstants.fiftyX,
		borderRadius: sizeConstants.xxl,
		marginRight: sizeConstants.fourtyMX,
		marginBottom: sizeConstants.twentyMX,
		marginTop: sizeConstants.m,
	},
	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		backgroundColor: ColorConstants.faintWhite,
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.three,
		paddingLeft: sizeConstants.twentyMX,
		fontSize: sizeConstants.eighteenScale, //19
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
	},

	bigTitle: {
		color: ColorConstants.whitishBlue,
		fontSize: sizeConstants.twentyTwoScale, //30
		marginLeft: sizeConstants.fourteen,
		fontWeight: "bold",
		marginTop: sizeConstants.fourteen,
	},
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
	editButton: {color: ColorConstants.gray, backgroundColor: ColorConstants.faintWhite},
})
