import React, {useState} from "react"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ScrollView,
	ImageBackground,
} from "react-native"
import {commonImages} from "./../../core/styles"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Entypo} from "@expo/vector-icons"

import {Calendar} from "react-native-calendars"
import StatusBarScreen from "./StatusBarScreen"

const FirstMilestone = () => {
	const navigation = useNavigation()

	const nextScreen = () => {
		navigation.navigate("ThirdMileStone")
	}
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	const [date, setDate] = useState(new Date())
	const tip = () => <Text style={{fontWeight: "bold"}}>Tip:</Text>
	return (
		<ImageBackground
			style={[styles.introContainer, styles.image]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<ScrollView style={styles.introContainer}>
				<StatusBarScreen>
					<View style={{flex: 1}}>
						<View style={{flexDirection: "row"}}>
							<Text style={styles.mainTitle}>Read 5 books</Text>
							<Entypo
								name="cross"
								color="#FDF9F2"
								size={30}
								style={{
									backgroundColor: "#538586",
									borderRadius: 20,
									position: "absolute",
									right: 0,
									marginRight: 10,
								}}
							/>
						</View>

						<Text style={styles.subTitle}>Enter Milestone</Text>
						<View style={styles.centerCont}>
							<TextInput style={styles.textInput} placeholder="Type Here" />
						</View>
						<Text style={styles.subTitle}>
							{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
						</Text>
						<Text style={styles.bigTitle}>Edit target date</Text>

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
								backgroundColor: "rgba(255,255,255,0)",
								calendarBackground: "rgba(255,255,255,0)",
								textSectionTitleColor: "#BDDFDB",
								textSectionTitleDisabledColor: "#BDDFDB",
								selectedDayBackgroundColor: "#BDDFDB",
								selectedDayTextColor: "black",
								todayTextColor: "#00adf5",
								dayTextColor: "#BDDFDB",
								textDisabledColor: "#BDDFDB",
								dotColor: "#BDDFDB",
								selectedDotColor: "#BDDFDB",
								arrowColor: "#BDDFDB",
								disabledArrowColor: "#BDDFDB",
								monthTextColor: "#BDDFDB",
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
							style={{
								backgroundColor: "rgba(255,255,255,0)",
							}}
						/>

						<TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={nextScreen}>
							<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
						</TouchableOpacity>

						<View style={styles.bottomBtnContainer}>
							<TouchableOpacity
								style={styles.bottomBtn}
								onPress={() => navigation.navigate("particulargoal")}
							>
								<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
					</View>
				</StatusBarScreen>
			</ScrollView>
		</ImageBackground>
	)
}
export default FirstMilestone
const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		// backgroundColor: "#588C8D",
	},

	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: 20,
	},
	subTitle: {
		fontSize: 16,
		color: "#FDF9F2",
		paddingLeft: 21,
		marginTop: 15,
		paddingRight: 20,
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
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "white",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",
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
		fontSize: 30,
		marginLeft: 14,
		fontWeight: "bold",
		marginTop: 14,
	},
})
