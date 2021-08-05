import React, {useEffect, useState} from "react"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ScrollView,
	Dimensions,
} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Calendar, LocaleConfig} from "react-native-calendars"
import {Entypo} from "@expo/vector-icons"
import {
	ColorConstants,
	CommonStyles,
	sizeConstants,
	height,
	commonDateFormat,
	TaskColorArray,
} from "../../core/constants"
import StatusBarScreen from "./../MileStones/StatusBarScreen"
import {
	CommonHomeButton,
	CustomDayComponentForCalendar,
	CommonPrevNextButton,
	calendarLocale,
} from "../../components/CommonComponents"
import {connect} from "react-redux"
import Spinner from "../../components/Spinner"

import {addMilestoneToFirestore} from "../../firebase"
import {setBooleanFlag, setClickedGoal, setShowLoader, setHideLoader} from "../../redux/actions"
import dayjs from "dayjs"

LocaleConfig.locales["en"] = calendarLocale
LocaleConfig.defaultLocale = "en"

const ThirdTaskFlow = ({
	setShowLoader,
	loading,
	setHideLoader,
	clickedGoal,
	route,
	clickedMilestone,
	setBooleanFlag,
	setClickedGoal,
	allGoals,
}) => {
	const navigation = useNavigation()
	const {currentTaskData} = route.params

	// const gotoHome = () => {
	// 	navigation.navigate("secondMileStone")
	// }
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	const [taskName, setTaskName] = useState(currentTaskData.taskName)
	const [clickedDate, setDate] = useState(currentTaskData.taskDate)

	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>

	const navigationCallback = () => {
		setBooleanFlag(true)
		navigation.navigate("particulargoal")
	}

	const nextScreen = () => {
		let newMilestoneItemWithTask = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone == clickedMilestone) {
				let filteredTasks = item.taskData.filter((tsk) => tsk.task != taskName)
				let index = 0
				for (let i = 0; i < allGoals.length; i++) {
					if (allGoals[i].color === clickedGoal.color) {
						index = i
						break
					}
				}
				return {
					...item,
					taskData: [
						...filteredTasks,
						{
							isCompleted: false,
							task: taskName,
							date: clickedDate,
							color: TaskColorArray[index],
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
			setHideLoader(false)

			setClickedGoal(updatedObj)
			navigationCallback()
		})
	}

	return (
		<StatusBarScreen style={CommonStyles.introContainer}>
			{loading ? <Spinner /> : null}

			<ScrollView>
				<View style={CommonStyles.flexOne}>
					<View style={CommonStyles.flexDirectionRow}>
						<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
						<Entypo
							name="cross"
							color={ColorConstants.faintWhite}
							size={38}
							style={CommonStyles.cross}
							onPress={() => navigation.navigate("DParticularGoal")}
						/>
					</View>
					<Text style={CommonStyles.milestoneText}>Enter Task</Text>
					<TouchableOpacity style={[height <= 700 ? {marginTop: sizeConstants.xs} : {}]}>
						{/* <Text style={CommonStyles.button}>Read One Book</Text> */}
						<View style={CommonStyles.centerCont}>
							<TextInput
								style={CommonStyles.textInput}
								placeholder="Type Here"
								value={taskName}
								onChangeText={(text) => setTaskName(text)}
								maxLength={28}
							/>
						</View>
					</TouchableOpacity>
					<Text style={CommonStyles.subTitleMilestone}>
						{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
					</Text>

					<View style={CommonStyles.calendarContainer}>
						<Text style={CommonStyles.targetDate}>Target Date</Text>

						<TouchableOpacity
							onPress={() => {
								navigation.navigate("first")
							}}
							style={{alignSelf: "flex-end"}}
						>
							<Text style={[CommonStyles.done, {color: ColorConstants.faintWhite}]}>Done</Text>
						</TouchableOpacity>

						{/* <Text
							style={[CommonStyles.targetDate, height <= 700 ? {marginTop: sizeConstants.xs} : {}]}
						>
							Target Date
						</Text>
						<TouchableOpacity
							onPress={() => {
								clickedDate && navigation.navigate("particulargoal")
							}}
						>
							<Text style={CommonStyles.done}>Done</Text>
						</TouchableOpacity> */}
						{/* <Text
							style={[CommonStyles.targetDate, height <= 700 ? {marginTop: sizeConstants.xs} : {}]}
						>
							Target Date
						</Text> */}
						<TouchableOpacity>
							<Text style={CommonStyles.done}>Done</Text>
						</TouchableOpacity>
					</View>

					<Calendar
						current={
							clickedDate
								? dayjs(clickedDate).format(commonDateFormat)
								: dayjs().format(commonDateFormat)
						}
						minDate={dayjs().format(commonDateFormat)}
						maxDate={"2090-01-01"}
						onMonthChange={(month) => {
							console.log("month changed", month)
						}}
						hideArrows={false}
						hideExtraDays={true}
						hideDayNames={false}
						showWeekNumbers={false}
						onPressArrowLeft={(subtractMonth) => subtractMonth()}
						onPressArrowRight={(addMonth) => addMonth()}
						disableArrowLeft={false}
						enableSwipeMonths={true}
						theme={{
							backgroundColor: ColorConstants.darkFaintBlue,
							calendarBackground: ColorConstants.darkFaintBlue,
							textSectionTitleColor: ColorConstants.faintWhite,
							textSectionTitleDisabledColor: "#d9e1e8",
							selectedDayBackgroundColor: ColorConstants.faintWhite,
							selectedDayTextColor: ColorConstants.black,
							todayTextColor: "#00adf5",
							dayTextColor: ColorConstants.faintWhite,
							textDisabledColor: "#d9e1e8",
							dotColor: ColorConstants.faintWhite,
							selectedDotColor: ColorConstants.faintWhite,
							arrowColor: ColorConstants.faintWhite,
							disabledArrowColor: "#d9e1e8",
							monthTextColor: ColorConstants.faintWhite,
							indicatorColor: "blue",
							textDayFontFamily: "monospace",
							textMonthFontFamily: "monospace",
							textDayHeaderFontFamily: "monospace",
							textDayFontWeight: "300",
							textMonthFontWeight: "bold",
							textDayHeaderFontWeight: "300",
						}}
						// markedDates={clickedDate ? getMarkedDates() : {}}
						dayComponent={({date, state, marking}) => {
							return (
								<CustomDayComponentForCalendar
									date={date}
									state={state}
									clickedDate={clickedDate}
									dayClick={setDate}
									marking={marking}
								/>
							)
						}}
					/>
					<TouchableOpacity
						style={[CommonStyles.containerMilestone, {marginTop: sizeConstants.s}]}
						onPress={() => {
							navigation.navigate("first", {
								taskDate: clickedDate,
								taskName: taskName,
							})
						}}
					>
						<Text style={CommonStyles.reoccuring}>Set reoccuring</Text>
					</TouchableOpacity>

					<CommonPrevNextButton
						right={true}
						style={taskName === "" ? {backgroundColor: ColorConstants.whiteOp50} : {}}
						nextClick={() => {
							taskName != "" && nextScreen()
						}}
						size={50}
						bottom={0}
					/>
				</View>
			</ScrollView>
			<CommonHomeButton
				click={() => navigation.navigate("particulargoal")}
				BackHandle={true}
				clickforBack={() => navigation.goBack()}
				normalBack={true}
			/>
		</StatusBarScreen>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
		loading: state.milestone.loading,
		allGoals: state.milestone.allGoals,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setClickedGoal: (goal) => {
			dispatch(setClickedGoal(goal))
		},
		setBooleanFlag: (flag) => {
			dispatch(setBooleanFlag(flag))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
		setHideLoader: (data) => {
			dispatch(setHideLoader(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ThirdTaskFlow)
