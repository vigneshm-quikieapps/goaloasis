import React, {useEffect, useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native"
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

const Second = ({route, clickedGoal}) => {
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
	const {reoccuring, taskDate} = route.params
	const [value, onChange] = useState(new Date())
	const [clickedDate, setDate] = useState(taskDate ? new Date(taskDate) : new Date())

	const convertArrToObj = (arr) => {
		let finalObj = {}
		arr.forEach((item) => {
			let key = Object.keys(item)[0]
			let value = item[key]
			finalObj[key] = value
		})
		return finalObj
	}
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

	return (
		<StatusBarScreen style={styles.introContainer}>
			<ScrollView>
				<View style={{flex: 1}}>
					<View style={{flexDirection: "row"}}>
						<Text style={CommonStyles.mainTitle}>Read 1 books</Text>
						<Entypo name="cross" color="#FDF9F2" size={38} style={CommonStyles.cross} />
					</View>
					<Text style={CommonStyles.enterTask}>Enter Task</Text>
					<TouchableOpacity style={[CommonStyles.container2, {marginTop: sizeConstants.xs}]}>
						<Text style={CommonStyles.button}>Read One Chapter</Text>
					</TouchableOpacity>
					<View style={[CommonStyles.editContainer, {marginVertical: 0}]}>
						<Text style={CommonStyles.editOccuringText}>Edit Reoccuring</Text>
					</View>
					<View style={CommonStyles.calendarContainer}>
						<Text style={[CommonStyles.targetDate, {marginTop: sizeConstants.xs}]}>
							Reoccuring Date
						</Text>

						<TouchableOpacity onPress={() => navigation.navigate("FifthMilestone")}>
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
							navigation.navigate("particulargoal")
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
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Second)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
})
