import React, {useState, useRef} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import {Calendar} from "react-native-calendars"
import StatusBarScreen from "./StatusBarScreen"
import RBSheet from "react-native-raw-bottom-sheet"
import {CommonHomeButton} from "../../core/CommonComponents"

const ThirdAfterModal = () => {
	const navigation = useNavigation()
	const refRBSheet = useRef()

	const [value, onChange] = useState(new Date())
	const [date, setDate] = useState(new Date())

	return (
		<StatusBarScreen style={styles.introContainer}>
			<ScrollView>
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
					<Text
						style={{
							fontSize: 16,
							color: "#FDF9F2",
							marginLeft: 21,
						}}
					>
						Enter Task
					</Text>
					<TouchableOpacity style={styles.container2}>
						<Text style={styles.button}>Read One Chapter</Text>
					</TouchableOpacity>
					<Text style={styles.subTitle}>Edit Target Date</Text>

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
								fontSize: 21,
								color: "#333333",
								alignSelf: "center",
								marginLeft: 20,
								color: "#FDF9F2",
								marginTop: 10,
							}}
						>
							Target Date
						</Text>
						<TouchableOpacity>
							<Text style={{fontSize: 14, color: "#FDF9F2", position: "absolute", left: 50}}>
								Done
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate("particulargoal")}>
						<Calendar
							// // Initially visible month. Default = Date()
							current={"2012-03-11"}
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
							markedDates={{
								"2012-03-11": {selected: true, marked: true, selectedColor: "#FDF9F2"},
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.container}>
						<Text style={{color: "#FDF9F2", fontSize: 21}}>Set reoccuring</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity style={styles.bottomBtn}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity> */}
				</View>
			</ScrollView>
			<CommonHomeButton />
		</StatusBarScreen>
	)
}

export default ThirdAfterModal

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#588C8D",
		borderColor: "#FDF9F2",
		// borderEndColor: "#FDF9F2",
		borderEndWidth: 3,
		borderStartWidth: 3,
		borderTopWidth: 3,
		borderBottomWidth: 3,
		width: "70%",
		padding: 8,
		borderRadius: 25,
		flexDirection: "column",
		marginVertical: 5,
		marginTop: 15,
		alignSelf: "center",
	},
	container2: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",

		width: "70%",
		padding: 8,
		borderRadius: 25,
		flexDirection: "column",
		marginVertical: 5,
		marginTop: 15,
		alignSelf: "center",
	},
	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: 21,
	},
	button: {
		color: "black",
		fontSize: 21,
	},
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
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

	subTitle: {
		fontSize: 25,
		color: "#FDF9F2",
		marginLeft: 21,
		fontWeight: "bold",
		marginTop: 20,
	},

	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#FDF9F2",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
})
