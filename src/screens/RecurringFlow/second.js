import React, {useEffect, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Calendar, LocaleConfig} from "react-native-calendars"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {Entypo} from "@expo/vector-icons"
import {
	ColorConstants,
	commonDateFormat,
	CommonStyles,
	height,
	sizeConstants,
} from "../../core/constants"
import {
	calendarLocale,
	CommonHomeButton,
	CustomDayComponentForCalendar,
	getAllDatesBetween,
} from "../../components/CommonComponents"
import Spinner from "../../components/Spinner"

import {connect} from "react-redux"
import {setClickedGoal, setBooleanFlag, setShowLoader, setHideLoader} from "../../redux/actions"
import {addMilestoneToFirestore} from "../../firebase"
import dayjs from "dayjs"

LocaleConfig.locales["en"] = calendarLocale
LocaleConfig.defaultLocale = "en"

const Second = ({
	route,
	clickedGoal,
	clickedMilestone,
	setBooleanFlag,
	booleanFlag,
	setClickedGoal,
	setShowLoader,
	loading,
	setHideLoader,
}) => {
	const navigation = useNavigation()

	useEffect(() => {
		getMarkedDates()
	}, [])

	const {reoccuring, reoccuringDays, taskDate, taskName} = route.params
	const [tName, setTaskName] = useState(taskName)
	const [clickedDate, setDate] = useState(
		taskDate ? dayjs(taskDate).format(commonDateFormat) : dayjs().format(commonDateFormat)
	)

	const getMarkedDates = () => {
		var markedDates = getAllDatesBetween(clickedDate, clickedGoal.targetDate)

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
				obj[date] = {
					...markedObj,
					start: true,
				}
			}

			if (index == markedDates.length - 1) {
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

	const navigationCallback = () => {}

	const nextScreen = () => {
		setShowLoader(true)

		let newMilestoneItemWithTask = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone === clickedMilestone) {
				let filteredTasks = item.taskData.filter((tsk) => tsk.task != tName)
				return {
					...item,
					taskData: [
						...filteredTasks,
						{
							isCompleted: false,
							task: tName,
							date: clickedDate,
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

			setHideLoader(false)

			navigation.navigate("particulargoal")
		})
	}

	return (
		<StatusBarScreen style={styles.introContainer}>
			{loading ? <Spinner /> : null}
			<ScrollView>
				<View>
					<View style={{flexDirection: "row"}}>
						<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
						<Entypo name="cross" color="#FDF9F2" size={38} style={CommonStyles.cross} />
					</View>
					<Text style={[CommonStyles.enterTask, {marginTop: 10}]}>Enter Task</Text>
					<View style={CommonStyles.centerCont}>
						<TextInput
							style={CommonStyles.textInput}
							placeholder="Type Here"
							onChangeText={(text) => setTaskName(text)}
							value={taskName}
							maxLength={28}
						/>
					</View>
					<View style={[CommonStyles.editContainer, {marginVertical: height > 700 ? 20 : 0}]}>
						<Text style={CommonStyles.editOccuringText}>Edit Reoccuring</Text>
					</View>
					<View style={CommonStyles.calendarContainer}>
						<Text
							style={[CommonStyles.targetDate, {marginTop: height > 700 ? sizeConstants.xs : 0}]}
						>
							Reoccuring Date
						</Text>

						<TouchableOpacity onPress={() => nextScreen()} style={{alignSelf: "flex-end"}}>
							<Text style={[CommonStyles.done, {color: ColorConstants.faintWhite}]}>Done</Text>
						</TouchableOpacity>
					</View>
					<Calendar
						style={{paddingLeft: 20, paddingRight: 20}}
						current={
							clickedDate
								? dayjs(clickedDate).format(commonDateFormat)
								: dayjs().format(commonDateFormat)
						}
						minDate={dayjs().format(commonDateFormat)}
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
							backgroundColor: "#588C8D",
							calendarBackground: "#588C8D",
							textSectionTitleColor: "#FDF9F2",
							textSectionTitleDisabledColor: "#d9e1e8",
							selectedDayBackgroundColor: "#FDF9F2",
							selectedDayTextColor: "black",
							todayTextColor: "#00adf5",
							dayTextColor: "#FDF9F2",
							textDisabledColor: "#d9e1e8",
							dotColor: "#FDF9F2",
							selectedDotColor: "#FDF9F2",
							arrowColor: "#FDF9F2",
							disabledArrowColor: "#d9e1e8",
							monthTextColor: "#FDF9F2",
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
									clickedDate={clickedDate}
									dayClick={setDate}
									marking={marking}
								/>
							)
						}}
					/>
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
		setHideLoader: (data) => {
			dispatch(setHideLoader(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Second)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
})

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
