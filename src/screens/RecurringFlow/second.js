import React, {useEffect, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Calendar} from "react-native-calendars"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {Entypo} from "@expo/vector-icons"
import {ColorConstants, CommonStyles, sizeConstants} from "../../core/styles"
import {
	checkDate,
	CommonHomeButton,
	CustomDayComponentForCalendar,
	getAllDatesBetween,
} from "../../core/CommonComponents"
import {connect} from "react-redux"
import {setClickedGoal, setBooleanFlag} from "../../redux/actions"
import {addMilestoneToFirestore} from "../../firebase"

const Second = ({route, clickedGoal, clickedMilestone, setBooleanFlag, booleanFlag}) => {
	const navigation = useNavigation()

	// const gotoHome = () => {
	// 	navigation.navigate("secondMileStone")
	// }
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	useEffect(() => {
		getMarkedDates()
	}, [])

	const {reoccuring, reoccuringDays, taskDate, taskName} = route.params
	const [tName, setTaskName] = useState(taskName)

	const [value, onChange] = useState(new Date())
	const [clickedDate, setDate] = useState(taskDate ? new Date(taskDate) : new Date())

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
			let dayIndex = new Date(key).getDay()

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

	const setReoccuring = () => {
		let newMilestoneItemWithTaskReoccuring = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone == clickedMilestone) {
				return {
					...item,
					taskData: item.taskData.map((taskObj) => {
						if (taskObj.task == taskName) {
							let newTaskObjWithReoccur = {
								...taskObj,
								reoccuring: {
									startDate: clickedDate,
									reoccuringType: reoccuring,
									reoccuringDays: reoccuringDays,
								},
							}

							return newTaskObjWithReoccur
						} else {
							return taskObj
						}
					}),

					// ...item.taskData,
					// {
					// 	task: task,
					// 	date: clickedDate,
					// 	reoccuring: {
					// 		startDate: clickedDate,
					// 		reoccuringType: "Daily",
					// 		reoccuringDays: [0, 1, 2, 3, 4, 5, 6],
					// 	},
					// },
				}
			} else return item
		})

		let updatedGoalObj = {
			...clickedGoal,
			goalMilestone: newMilestoneItemWithTaskReoccuring,
		}
		console.log("New Mile Array ", newMilestoneItemWithTaskReoccuring)

		addMilestoneToFirestore(clickedGoal, newMilestoneItemWithTaskReoccuring, () => {
			setClickedGoal(updatedGoalObj)
			navigation.navigate("particulargoal")
			setBooleanFlag(!booleanFlag)
		})
	}

	return (
		<StatusBarScreen style={styles.introContainer}>
			<ScrollView>
				<View>
					<View style={{flexDirection: "row"}}>
						<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
						<Entypo name="cross" color="#FDF9F2" size={38} style={CommonStyles.cross} />
					</View>
					<Text style={CommonStyles.enterTask}>Enter Task</Text>
					<View style={CommonStyles.centerCont}>
						<TextInput
							style={CommonStyles.textInput}
							placeholder="Type Here"
							onChangeText={(text) => setTaskName(text)}
							value={taskName}
						/>
					</View>
					<View style={[CommonStyles.editContainer, {marginVertical: 0}]}>
						<Text style={CommonStyles.editOccuringText}>Edit Reoccuring</Text>
					</View>
					<View style={CommonStyles.calendarContainer}>
						<Text style={[CommonStyles.targetDate, {marginTop: sizeConstants.xs}]}>
							Reoccuring Date
						</Text>

						<TouchableOpacity
							onPress={() => {
								setReoccuring()
								//  navigation.navigate("FifthMilestone")
							}}
						>
							<Text style={CommonStyles.done}>Done</Text>
						</TouchableOpacity>
					</View>

					<Calendar
						style={{paddingLeft: 20, paddingRight: 20}}
						// // Initially visible month. Default = Date()
						current={clickedDate ? new Date(clickedDate) : new Date()}
						// // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
						// minDate={"2001-05-10"}
						// // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
						// maxDate={"2020-05-30"}
						// // Handler which gets executed on day press. Default = undefined
						onDayPress={(day) => {
							console.log("selected day", day)
						}}
						// // Handler which gets executed on day long press. Default = undefined
						onDayLongPress={(day) => {
							console.log("selected day", day)
						}}
						// // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
						// // monthFormat={"yyyy MM"}
						// // Handler which gets executed when visible month changes in calendar. Default = undefined
						onMonthChange={(month) => {
							console.log("month changed", month)
						}}
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
						// // Handler which gets executed when press arrow icon left. It receive a callback can go back month
						onPressArrowLeft={(subtractMonth) => subtractMonth()}
						// // Handler which gets executed when press arrow icon right. It receive a callback can go next month
						onPressArrowRight={(addMonth) => addMonth()}
						// // Disable left arrow. Default = false
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
						onPress={() => {
							// navigation.navigate("third")

							setReoccuring()

							// navigation.navigate("particulargoal")
						}}
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
			<CommonHomeButton click={() => navigation.navigate("particulargoal")} />
		</StatusBarScreen>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
		booleanFlag: state.milestone.booleanFlag,
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
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Second)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
})
