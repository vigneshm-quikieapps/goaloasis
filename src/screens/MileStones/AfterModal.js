import React, {useState, useRef} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import {Calendar} from "react-native-calendars"
import colors from "../../../colors"
import StatusBarScreen from "./StatusBarScreen"

import RBSheet from "react-native-raw-bottom-sheet"
import {CommonHomeButton} from "../../core/CommonComponents"
import {ColorConstants} from "../../core/styles"

const AterModal = () => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [date, setDate] = useState(new Date())

	return (
		<StatusBarScreen style={styles.introContainer}>
			<View style={{flex: 1}}>
				<View style={{flexDirection: "row"}}>
					<Text style={styles.mainTitle}>Read 5 books</Text>
					<TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.threeDots}>
						<View style={styles.dots}></View>
						<View style={styles.dots}></View>
						<View style={styles.dots}></View>
					</TouchableOpacity>
				</View>
				<RBSheet
					height={500}
					ref={refRBSheet}
					closeOnDragDown={true}
					closeOnPressMask={false}
					customStyles={{
						wrapper: {
							backgroundColor: "transparent",
						},
						draggableIcon: {
							backgroundColor: "#000",
						},
					}}
				>
					<View style={{alignItems: "center", marginTop: 20, width: "100%"}}>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => navigation.navigate("markcomplete")}
						>
							<Text style={styles.bottomText}>Mark Goal Complete</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => navigation.navigate("editgoal")}
						>
							<Text style={styles.bottomText}>Edit Goal</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => navigation.navigate("deletegoal")}
						>
							<Text style={styles.bottomText}>Delete Goal</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => navigation.navigate("help")}
						>
							<Text style={styles.bottomText}>Tutorial</Text>
						</TouchableOpacity>
					</View>
				</RBSheet>
				<Text style={styles.subTitle}>Enter Tasks</Text>
				<TouchableOpacity
					style={styles.centerCont}
					onPress={() => {
						navigation.navigate("SecondAfterModal")
					}}
				>
					<TextInput style={styles.textInput} placeholder="Type Here" />
				</TouchableOpacity>

				<Text style={styles.bigTitle}>Edit target date</Text>

				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						marginTop: 10,
					}}
				>
					<Text
						style={{
							fontSize: 17,
							color: "#333333",
							alignSelf: "center",
							marginLeft: 20,
							color: "#BDDFDB",
							marginTop: 10,
						}}
					>
						Target Date
					</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("SixthMilestone")
						}}
					>
						<Text style={{fontSize: 14, color: "#BDDFDB", position: "absolute", left: 50}}>
							Done
						</Text>
					</TouchableOpacity>
				</View>
				<Calendar
					// // Initially visible month. Default = Date()
					current={"2012-05-31"}
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
						backgroundColor: "#588C8D",
						calendarBackground: "#588C8D",
						textSectionTitleColor: "#BDDFDB",
						textSectionTitleDisabledColor: "#d9e1e8",
						selectedDayBackgroundColor: "#BDDFDB",
						selectedDayTextColor: "black",
						todayTextColor: "#BDDFDB",
						dayTextColor: "#BDDFDB",
						textDisabledColor: "#d9e1e8",
						dotColor: "#BDDFDB",
						selectedDotColor: "#BDDFDB",
						arrowColor: "#BDDFDB",
						disabledArrowColor: "#d9e1e8",
						monthTextColor: "#BDDFDB",
						indicatorColor: "blue",
						textDayFontFamily: "monospace",
						textMonthFontFamily: "monospace",
						textDayHeaderFontFamily: "monospace",
						textDayFontWeight: "300",
						textMonthFontWeight: "bold",
						textDayHeaderFontWeight: "300",
					}}
					markedDates={{
						"2012-05-31": {selected: true, marked: true, selectedColor: "#BDDFDB"},
					}}
					dayComponent={({date}) => {
						return (
							<TouchableOpacity
								onPress={() => {
									setDate(date.dateString)
								}}
							>
								<Text
									style={{
										padding: 0,
										margin: 0,
										textAlign: "center",
										color: ColorConstants.white,
									}}
								>
									{date.day}
								</Text>
							</TouchableOpacity>
						)
					}}
				/>

				<TouchableOpacity
					style={[styles.btnStyling, styles.nextBtn]}
					onPress={() => {
						navigation.navigate("SecondAfterModal")
					}}
				>
					<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
				</TouchableOpacity>
				{/* <View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View> */}
			</View>
			<CommonHomeButton />
		</StatusBarScreen>
	)
}
export default AterModal
const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},

	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: 21,
	},
	subTitle: {
		fontSize: 16,
		color: "#BDDFDB",
		marginLeft: 21,
		color: "#FDF9F2",
		marginTop: 20,
	},

	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#BDDFDB",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	threeDots: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		margin: 10,
		backgroundColor: "#538586",
		height: 35,
		width: 42,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	dots: {
		backgroundColor: "black",
		height: 8,
		width: 8,
		borderRadius: 4,
		margin: 1,
	},
	BottomTouch: {
		height: 100,
		width: "100%",
		borderWidth: 1,
		borderLeftColor: "white",
		borderRightColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
		right: 0,
		display: "flex",

		alignSelf: "flex-end",
	},
	nextBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 40,
		marginBottom: 20,
		marginTop: 10,
	},
	textInput: {
		width: 314,
		height: 50,
		backgroundColor: "#FDF9F2",
		borderRadius: 50,
		marginTop: 3,
		paddingLeft: 20,
		fontSize: 19,
		color: "#666666",
		elevation: 10,
	},

	bigTitle: {
		color: "#BDDFDB",
		fontSize: 25,
		marginLeft: 21,
		fontWeight: "bold",
		marginTop: 20,
	},
})
