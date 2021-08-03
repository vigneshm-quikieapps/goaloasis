import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Calendar, LocaleConfig} from "react-native-calendars"
import {Entypo} from "@expo/vector-icons"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {ColorConstants, commonDateFormat, CommonStyles} from "../../core/constants"
import {
	calendarLocale,
	CommonHomeButton,
	CustomDayComponentForCalendar,
} from "../../components/CommonComponents"
import dayjs from "dayjs"

LocaleConfig.locales["en"] = calendarLocale
LocaleConfig.defaultLocale = "en"

const Third = () => {
	const navigation = useNavigation()

	// const gotoHome = () => {
	// 	navigation.navigate("ThirdMileStone")
	// }
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	const [value, onChange] = useState(dayjs().format(commonDateFormat))
	const [clickedDate, setDate] = useState(dayjs().format(commonDateFormat))

	return (
		<StatusBarScreen style={styles.introContainer}>
			<ScrollView>
				<View style={{flex: 1}}>
					<View style={{flexDirection: "row"}}>
						<Text style={CommonStyles.mainTitle}>Read 1 books</Text>
						<Entypo name="cross" color="#FDF9F2" size={38} style={CommonStyles.cross} />
					</View>
					<Text style={CommonStyles.enterTask}>Enter Task</Text>
					<TouchableOpacity style={CommonStyles.container2}>
						<Text style={CommonStyles.button}>Read One Chapter</Text>
					</TouchableOpacity>
					<View style={CommonStyles.editContainer}>
						<Text style={CommonStyles.editOccuringText}>Edit Target Date</Text>
					</View>
					<View style={CommonStyles.calendarContainer}>
						<Text style={CommonStyles.targetDate}>Reoccuring Date</Text>
						<TouchableOpacity onPress={() => navigation.navigate("FifthMilestone")}>
							<Text style={CommonStyles.done}>Done</Text>
						</TouchableOpacity>
					</View>

					<Calendar
						style={{paddingLeft: 20, paddingRight: 20}}
						// // Initially visible month. Default = Date()
						current={dayjs().format(commonDateFormat)}
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
					<TouchableOpacity
						style={CommonStyles.containerMilestone}
						onPress={() => navigation.navigate("secondtaskflow")}
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

export default Third

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
})
