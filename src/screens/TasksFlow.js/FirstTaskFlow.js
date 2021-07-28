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
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "./../../core/styles"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Entypo} from "@expo/vector-icons"

import {Calendar} from "react-native-calendars"
import StatusBarScreen from "./../MileStones/StatusBarScreen"
import {
	addNewMilestone,
	EditNewMilestone,
	setBooleanFlag,
	setClickedGoal,
	setTaskFlowData,
} from "./../../redux/actions"
import {addMilestoneToFirestore, getAllGoalsFromFirestore} from "./../../firebase"
import {connect} from "react-redux"
import {
	CommonHomeButton,
	CommonPrevNextButton,
	CustomDayComponentForCalendar,
} from "../../core/CommonComponents"
const FirstTaskFlow = ({
	setTaskFlowData,
	clickedGoal,
	newMileStone,
	clickedMilestone,
	taskFlowData,
	setBooleanFlag,
}) => {
	useEffect(() => {
		console.log("newMileStone", newMileStone)
	}, [])
	const navigation = useNavigation()
	const [task, setTask] = useState("")
	const [clickedDate, setDate] = useState()

	const navigationCallback = () => {
		setBooleanFlag(true)
		navigation.navigate("secondtaskflow", {
			task: task,
			date: clickedDate,
		})
	}
	const nextScreen = () => {
		console.log("Testing First task Flow", clickedMilestone)
		let newMilestoneItemWithTask = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone == clickedMilestone) {
				return {
					...item,
					taskData: [
						...item.taskData,
						{
							task: task,
							date: clickedDate,
						},
					],
				}
			} else return item
		})

		addMilestoneToFirestore(clickedGoal, newMilestoneItemWithTask, navigationCallback)
		// console.log(
		// 	"CLICKED GOAL",
		// 	clickedGoal.goalMilestone[clickedGoal.goalMilestone.length - 1].taskData
		// )
		// console.log(
		// 	"newMilestoneItemWithTask",
		// 	newMilestoneItemWithTask[newMilestoneItemWithTask.length - 1].taskData[0].task
		// )
		// console.log(
		// 	"Checking ADDING DATA OR NOT",
		// 	clickedGoal.goalMilestone[clickedGoal.goalMilestone.length - 1]
		// )
		// console.log("CLICKED MILESTONE", clickedMilestone)
		// console.log("Checking ADDING DATA OR NOT", newMilestoneItemWithTask.taskData)
		// addMilestoneToFirestore(clickedGoal, newMilestoneItemWithTask)
		// console.log("FROM FIRST FLOW", clickedGoal)
		// navigation.navigate("secondtaskflow")
		// navigation.navigate("particulargoal")

		// navigation.navigate("particulargoal")
	}

	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	return (
		<ImageBackground
			style={[CommonStyles.mainContainer, styles.image, CommonStyles.pt10]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<ScrollView style={CommonStyles.mainContainer}>
				<StatusBarScreen>
					<View style={CommonStyles.flexOne}>
						<View style={CommonStyles.flexDirectionRow}>
							<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
							<Entypo
								name="cross"
								color={ColorConstants.faintWhite}
								size={38}
								style={CommonStyles.cross}
							/>
						</View>

						<Text style={styles.subTitle}>Enter Task</Text>
						<View style={styles.centerCont}>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								onChangeText={(text) => setTask(text)}
							/>
						</View>
						<Text style={styles.bigTitle}>Edit target date</Text>

						<View style={CommonStyles.calendarContainer}>
							<Text style={CommonStyles.targetDate}>Target Date</Text>
							<TouchableOpacity onPress={() => {}}>
								<Text style={CommonStyles.done}>Done</Text>
							</TouchableOpacity>
						</View>

						<Calendar
							// // Initially visible month. Default = Date()
							current={new Date()}
							minDate={new Date()}
							// // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
							// maxDate={"2020-05-30"}
							// // Handler which gets executed on day press. Default = undefined
							// onDayPress={(day) => {
							// 	setDate(day.dateString)
							// }}
							// // Handler which gets executed on day long press. Default = undefined
							// onDayLongPress={(day) => {
							// 	console.log("selected day", day)
							// }}
							// // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
							// // monthFormat={"yyyy MM"}
							// // Handler which gets executed when visible month changes in calendar. Default = undefined
							// onMonthChange={(month) => {
							// 	console.log("month changed", month)
							// }}
							// // Hide month navigation arrows. Default = false
							hideArrows={false}
							// // Replace default arrows with custom ones (direction can be 'left' or 'right')
							// //   renderArrow={(direction) => (<Arrow/>)}
							// // Do not show days of other months in month page. Default = false
							hideExtraDays={true}
							// // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
							// // day from another month that is visible in calendar page. Default = false
							disableMonthChange={false}
							// // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
							// firstDay={1}
							// // Hide day names. Default = false
							hideDayNames={false}
							// // Show week numbers to the left. Default = false
							showWeekNumbers={false}
							onPressArrowLeft={(subtractMonth) => subtractMonth()}
							onPressArrowRight={(addMonth) => addMonth()}
							// // Disable left arrow. Default = false
							disableArrowLeft={false}
							// // Disable right arrow. Default = false
							// disableArrowRight={false}
							// // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
							// disableAllTouchEventsForDisabledDays={false}
							// // Replace default month and year title with custom one. the function receive a date as parameter.
							// renderHeader={(date) => {
							// 	/*Return JSX*/
							// }}
							// Enable the option to swipe between months. Default = false
							enableSwipeMonths={true}
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
								// textDayFontSize: 16,
								// textMonthFontSize: 16,
								// textDayHeaderFontSize: 40,
							}}
							style={ColorConstants.transparent}
							dayComponent={({date, state}) => {
								return (
									<CustomDayComponentForCalendar
										date={date}
										state={state}
										clickedDate={clickedDate}
										dayClick={setDate}
									/>
								)
							}}
						/>

						{/* <TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={nextScreen}>
							<MaterialCommunityIcons
								name="chevron-right"
								size={50}
								color={ColorConstants.lighterBlue}
							/>
						</TouchableOpacity> */}

						{/* <View style={styles.bottomBtnContainer}>
							<TouchableOpacity
								style={styles.bottomBtn}
								onPress={() => navigation.navigate("particulargoal")}
							>
								<MaterialCommunityIcons name="home" size={44} color={ColorConstants.lighterBlue} />
							</TouchableOpacity>
						</View> */}
						{task === "" ? (
							<CommonPrevNextButton
								right={true}
								style={{backgroundColor: ColorConstants.whiteOp50}}
								size={50}
								bottom={0}
							/>
						) : (
							<CommonPrevNextButton right={true} nextClick={nextScreen} size={50} bottom={0} />
						)}
					</View>
				</StatusBarScreen>
			</ScrollView>

			<CommonHomeButton click={() => navigation.navigate("particulargoal")} />
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
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstTaskFlow)
const styles = StyleSheet.create({
	mainTitle: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.xxl,
		marginLeft: sizeConstants.twentyMX,
	},
	subTitle: {
		fontSize: sizeConstants.sixteenX,
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
		width: 50,
		height: 50,
		borderRadius: 25,
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
		fontSize: sizeConstants.nineteenX,
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
	},

	bigTitle: {
		color: ColorConstants.whitishBlue,
		fontSize: sizeConstants.thirty,
		marginLeft: sizeConstants.fourteen,
		fontWeight: "bold",
		marginTop: sizeConstants.fourteen,
	},
})
