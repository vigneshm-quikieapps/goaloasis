import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import DatePicker from "react-native-date-picker"
import AppButton from "./AppButton"
import {Calendar} from "react-native-calendars"
import StatusBarScreen from "./StatusBarScreen"
import {Entypo} from "@expo/vector-icons"
import {ColorConstants, CommonStyles, sizeConstants} from "../../core/styles"
import {CommonHomeButton} from "../../core/CommonComponents"

const FourthMilestone = () => {
	const navigation = useNavigation()

	// const gotoHome = () => {
	// 	navigation.navigate("secondMileStone")
	// }
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	const [value, onChange] = useState(new Date())
	const [date, setDate] = useState(new Date())
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	return (
		<StatusBarScreen style={CommonStyles.introContainer}>
			<ScrollView>
				<View style={CommonStyles.flexOne}>
					<View style={CommonStyles.flexDirectionRow}>
						<Text style={CommonStyles.mainTitle}>Read 5 books</Text>
						<Entypo
							name="cross"
							color={ColorConstants.faintWhite}
							size={38}
							style={CommonStyles.cross}
						/>
					</View>
					<Text style={CommonStyles.milestoneText}>Enter Milestone</Text>
					<TouchableOpacity style={CommonStyles.container2}>
						<Text style={CommonStyles.button}>Read One Book</Text>
					</TouchableOpacity>
					<Text style={CommonStyles.subTitleMilestone}>
						{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
					</Text>

					<View style={CommonStyles.calendarContainer}>
						<Text style={CommonStyles.targetDate}>Target Date</Text>
						<TouchableOpacity onPress={() => navigation.navigate("FifthMilestone")}>
							<Text style={CommonStyles.done}>Done</Text>
						</TouchableOpacity>
					</View>

					<Calendar
						// // Initially visible month. Default = Date()
						current={"2012-03-01"}
						// // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
						minDate={"2001-05-10"}
						// // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
						maxDate={"2020-05-30"}
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
						markedDates={{
							"2012-03-01": {
								selected: true,
								marked: true,
								selectedColor: ColorConstants.faintWhite,
							},
						}}
					/>
					<TouchableOpacity
						style={CommonStyles.containerMilestone}
						onPress={() => navigation.navigate("FifthMilestone")}
					>
						<Text style={CommonStyles.reoccuring}>Set reoccuring</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity
						style={CommonStyles.bottomBtnMilestone}
						onPress={() => navigation.navigate("particulargoal")}
					>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity> */}
				</View>
			</ScrollView>
			<CommonHomeButton click={() => navigation.navigate("particulargoal")} size={44} />
		</StatusBarScreen>
	)
}

export default FourthMilestone
