import React, {useEffect, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Calendar, LocaleConfig} from "react-native-calendars"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {Entypo} from "@expo/vector-icons"
import {
	ColorConstants,
	colorsForTimeline,
	commonDateFormat,
	CommonStyles,
	height,
	sizeConstants,
	TaskColorArray,
	width,
} from "../../core/constants"
import {
	calendarLocale,
	checkInternetConnectionAlert,
	CommonHomeButton,
	CustomDayComponentForCalendar,
	getAllDatesBetween,
} from "../../components/CommonComponents"

import {connect} from "react-redux"
import {setClickedGoal, setBooleanFlag, setShowLoader} from "../../redux/actions"
import {addMilestoneToFirestore} from "../../firebase/goals"
import uuid from "react-native-uuid"
import dayjs from "dayjs"
var utc = require("dayjs/plugin/utc")
dayjs.extend(utc)
LocaleConfig.locales["en"] = calendarLocale
LocaleConfig.defaultLocale = "en"

const Second = (props) => {
	const {
		route,
		clickedGoal,
		clickedMilestone,
		setBooleanFlag,
		booleanFlag,
		setClickedGoal,
		setShowLoader,
		loading,
		allGoals,
		internet,
	} = props
	const navigation = useNavigation()

	const {reoccuring, reoccuringDays, taskDate, taskName} = route.params
	const [markedDatesArray, setMarkedDatesArray] = useState([])
	const [tName, setTaskName] = useState(taskName)
	const [clickedDate, setDate] = useState(
		taskDate ? dayjs(taskDate).format(commonDateFormat) : dayjs().format(commonDateFormat)
	)
	console.log("====================================")
	console.log("TASK NAME", tName)
	console.log("====================================")
	const filterMarkedDates = (date) => {
		let markedDates = [...markedDatesArray]
		let isPresent = markedDates.find((item) => item == date)
		if (isPresent) {
			markedDates = markedDates.filter((item) => item != date)
		} else {
			markedDates.push(date)
		}
		setMarkedDatesArray(markedDates)
		setDate(date)
	}

	const getMarkedDates = () => {
		var markedDates = [...markedDatesArray]

		let markedObj = {
			selected: true,
			marked: true,
			selectedColor: ColorConstants.white,
			start: false,
			end: false,
		}

		var finalArr = markedDates.map((date, index) => {
			let obj = {}
			obj[date] = markedObj
			if (index == 0) {
				startDate = date
				obj[date] = {
					...markedObj,
					start: true,
				}
			}

			if (index == markedDates.length - 1) {
				endDate = date
				obj[date] = {
					...markedObj,
					end: true,
				}
			}
			return obj
		})
		let allDatesObj = convertArrToObj(finalArr)

		return allDatesObj
	}
	const convertArrToObj = (arr) => {
		let finalObj = {}
		arr.forEach((item) => {
			let key = Object.keys(item)[0]
			let value = item[key]

			let dayIndex = dayjs(key).day()

			if (reoccuring == "Weekly") {
				if (reoccuringDays.length) {
					if (reoccuringDays.find((day) => day == dayIndex) != undefined) {
						finalObj[key] = value
					}
				} else {
					return {}
				}
			} else {
				finalObj[key] = value
			}
		})
		return finalObj
	}

	const nextScreen = () => {
		if (!internet) {
			checkInternetConnectionAlert(() => {})
			return
		}
		setShowLoader(true)

		let newMilestoneItemWithTask = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone === clickedMilestone) {
				let filteredTasks = item.taskData.filter((tsk) => tsk.task != tName)
				let color = colorsForTimeline.find((itemColor) => itemColor.goal === clickedGoal.color)

				return {
					...item,
					taskData: [
						...filteredTasks,
						{
							_id: uuid.v4(),
							isCompleted: false,
							task: tName,
							date: clickedDate,
							color: color.task,
							reoccuring: {
								startDate: clickedDate,
								reoccuringType: reoccuring,
								reoccuringDays: reoccuringDays,
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
		addMilestoneToFirestore(clickedGoal, newMilestoneItemWithTask, () => {
			setClickedGoal(updatedObj)
			setBooleanFlag(true)

			setShowLoader(false)

			navigation.navigate("particulargoal")
		})
	}

	useEffect(() => {
		let allMarkedDates = getAllDatesBetween(
			taskDate ? dayjs(taskDate).format(commonDateFormat) : dayjs().format(commonDateFormat),
			clickedGoal.targetDate
		)
		setMarkedDatesArray(allMarkedDates)
		console.log("First time all dates: ", allMarkedDates)
	}, [])

	return (
		<StatusBarScreen style={CommonStyles.introContainer}>
			<ScrollView>
				<View>
					<View style={{flexDirection: "row"}}>
						<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
						<Entypo
							name="cross"
							color={ColorConstants.faintWhite}
							size={38}
							style={CommonStyles.cross}
							onPress={() => {
								if (clickedGoal.goalMilestone === null || clickedGoal.goalMilestone.length === 0) {
									navigation.navigate("DParticularGoal")
								} else {
									navigation.navigate("particulargoal")
								}
							}}
						/>
					</View>
					<Text style={[CommonStyles.enterTask, {marginTop: sizeConstants.m}]}>Enter Task</Text>
					<View style={CommonStyles.centerCont}>
						<TextInput
							style={CommonStyles.textInput}
							placeholder="Type Here"
							onChangeText={(text) => setTaskName(text)}
							value={tName}
							maxLength={28}
						/>
					</View>
					<View
						style={[
							CommonStyles.editContainer,
							{marginVertical: height > 700 ? sizeConstants.xl : 0},
						]}
					>
						<Text style={CommonStyles.editOccuringText}>Edit Reoccuring</Text>
					</View>
					<View style={[CommonStyles.calendarContainer, CommonStyles.targetAndDoneContainer]}>
						<Text
							style={[CommonStyles.targetDate, {marginTop: height > 700 ? sizeConstants.xs : 0}]}
						>
							Reoccuring Date
						</Text>

						<TouchableOpacity
							onPress={() => nextScreen()}
							style={{position: "absolute", right: 25}}
						>
							<Text style={[CommonStyles.done, {color: ColorConstants.faintWhite}]}>Done</Text>
						</TouchableOpacity>
					</View>
					<View style={{paddingHorizontal: width * 0.04}}>
						<Calendar
							current={
								taskDate
									? dayjs(taskDate).format(commonDateFormat)
									: dayjs().format(commonDateFormat)
							}
							minDate={dayjs().format(commonDateFormat)}
							maxDate={dayjs(clickedGoal.targetDate).format(commonDateFormat)}
							onDayPress={(day) => {
								console.log("selected day", day)
							}}
							onDayLongPress={(day) => {
								console.log("selected day", day)
							}}
							onMonthChange={(month) => {
								console.log("month changed", month)
							}}
							hideArrows={false}
							hideExtraDays={true}
							disableMonthChange={false}
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
								selectedDayTextColor: "black",
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
							markedDates={clickedDate ? getMarkedDates() : {}}
							dayComponent={({date, state, marking}) => {
								return (
									<CustomDayComponentForCalendar
										date={date}
										state={state}
										clickedDate={
											taskDate
												? dayjs(taskDate).format(commonDateFormat)
												: dayjs().format(commonDateFormat)
										}
										dayClick={(date) => {
											filterMarkedDates(date)
										}}
										marking={marking}
									/>
								)
							}}
						/>
					</View>

					<TouchableOpacity
						style={[CommonStyles.containerMilestone, {marginTop: sizeConstants.xs}]}
						onPress={nextScreen}
					>
						<Text style={CommonStyles.reoccuring}>Set reoccuring</Text>
					</TouchableOpacity>

					{/* <TouchableOpacity
						style={CommonStyles.bottomBtn}
						onPress={() => navigation.navigate("particulargoal")}
					>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity> */}
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
		booleanFlag: state.milestone.booleanFlag,
		loading: state.milestone.loading,
		allGoals: state.milestone.allGoals,
		internet: state.milestone.internet,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
		setBooleanFlag: (data) => {
			dispatch(setBooleanFlag(data))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Second)

// const setReoccuring = () => {
// 	let newMilestoneItemWithTaskReoccuring = clickedGoal.goalMilestone.map((item) => {
// 		if (item.milestone == clickedMilestone) {
// 			return {
// 				...item,
// 				taskData: item.taskData.map((taskObj) => {
// 					console.log("task check: ", JSON.stringify(taskObj), taskName)
// 					if (taskObj.task == taskName) {
// 						let newTaskObjWithReoccur = {
// 							...taskObj,
// 							reoccuring: {
// 								startDate: clickedDate,
// 								reoccuringType: reoccuring,
// 								reoccuringDays: reoccuringDays,
// 							},
// 						}

// 						return newTaskObjWithReoccur
// 					} else {
// 						return taskObj
// 					}
// 				}),
// 			}
// 		} else return item
// 	})

// 	let updatedGoalObj = {
// 		...clickedGoal,
// 		goalMilestone: newMilestoneItemWithTaskReoccuring,
// 	}
// 	console.log("New Mile Array ", JSON.stringify(newMilestoneItemWithTaskReoccuring))
// 	// return

// 	addMilestoneToFirestore(clickedGoal, newMilestoneItemWithTaskReoccuring, () => {
// 		setClickedGoal(updatedGoalObj)
// 		navigation.navigate("particulargoal")
// 		setBooleanFlag(!booleanFlag)
// 	})
// }
