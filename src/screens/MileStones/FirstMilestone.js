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
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "./../../core/styles"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Entypo} from "@expo/vector-icons"
import {Calendar} from "react-native-calendars"
import StatusBarScreen from "./StatusBarScreen"
import {connect} from "react-redux"
import {addNewMilestone, EditNewMilestone} from "./../../redux/actions"
const FirstMilestone = ({addNewMilestone, newMileStone}) => {
	const [milestone, setMilestone] = useState([])
	const [date, setDate] = useState()

	console.log("Milestone", milestone)
	console.log("Date", date)

	const navigation = useNavigation()

	const nextScreen = () => {
		navigation.navigate("ThirdMileStone")
	}
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	// const [date, setDate] = useState(new Date())
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	return (
		<ImageBackground
			style={[CommonStyles.mainContainer, styles.image, CommonStyles.pt10]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<ScrollView style={CommonStyles.mainContainer}>
				<StatusBarScreen>
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

						<Text style={styles.subTitle}>Enter Milestone</Text>
						<View style={styles.centerCont}>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								onChangeText={(text) => setMilestone(text)}
							/>
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
								addNewMilestone(day)
							}}
							// // Handler which gets executed on day long press. Default = undefined
							// onDayLongPress={(day) => {
							// 	console.log("selected day", day)
							// }}
							// // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
							// // monthFormat={"yyyy MM"}
							// // Handler which gets executed when visible month changes in calendar. Default = undefined
							// onMonthChange={(month) => {
							// 	console.log("month changed", month)
							// }}
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
								backgroundColor: ColorConstants.transparent,
								calendarBackground: ColorConstants.transparent,
								textSectionTitleColor: ColorConstants.whitishBlue,
								textSectionTitleDisabledColor: ColorConstants.whitishBlue,
								selectedDayBackgroundColor: ColorConstants.whitishBlue,
								selectedDayTextColor: ColorConstants.black,
								todayTextColor: "#00adf5",
								dayTextColor: ColorConstants.whitishBlue,
								textDisabledColor: ColorConstants.whitishBlue,
								dotColor: ColorConstants.whitishBlue,
								selectedDotColor: ColorConstants.whitishBlue,
								arrowColor: ColorConstants.whitishBlue,
								disabledArrowColor: ColorConstants.whitishBlue,
								monthTextColor: ColorConstants.whitishBlue,
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
							style={ColorConstants.transparent}
						/>

						<TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={nextScreen}>
							<MaterialCommunityIcons
								name="chevron-right"
								size={50}
								color={ColorConstants.lighterBlue}
								onPress={() => {
									addNewMilestone(milestone)
								}}
							/>
						</TouchableOpacity>

						<View style={styles.bottomBtnContainer}>
							<TouchableOpacity
								style={styles.bottomBtn}
								onPress={() => navigation.navigate("particulargoal")}
							>
								<MaterialCommunityIcons name="home" size={44} color={ColorConstants.lighterBlue} />
							</TouchableOpacity>
						</View>
					</View>
				</StatusBarScreen>
			</ScrollView>
		</ImageBackground>
	)
}

const mapStateToProps = (state) => {
	console.log("Milestone", state.newMileStone)

	return {
		newMileStone: state.milestone.newMileStone,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewMilestone: (milestone) => dispatch(addNewMilestone(milestone)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstMilestone)

const styles = StyleSheet.create({
	mainTitle: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.xxl,
		marginLeft: sizeConstants.twentyMX,
	},
	subTitle: {
		fontSize: sizeConstants.sixteenX,
		color: ColorConstants.faintWhite,
		paddingLeft: sizeConstants.twentyOne,
		marginTop: sizeConstants.l,
		paddingRight: sizeConstants.twentyMX,
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
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: "white",
		elevation: sizeConstants.s,
		justifyContent: "center",
		alignItems: "center",
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.faintWhite,
		// width: 75,
		// height: 75,
		// borderRadius: 75 / 2,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		right: 0,
		display: "flex",
		alignSelf: "flex-end",
	},
	nextBtn: {
		width: sizeConstants.fifty,
		height: sizeConstants.fifty,
		borderRadius: sizeConstants.fifty,
		marginRight: sizeConstants.fourtyMX,
		marginBottom: sizeConstants.twentyMX,
		marginTop: sizeConstants.m,
	},
	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		backgroundColor: ColorConstants.faintWhite,
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.three,
		paddingLeft: sizeConstants.twentyMX,
		fontSize: sizeConstants.nineteenX,
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
	},

	bigTitle: {
		color: ColorConstants.whitishBlue,
		fontSize: sizeConstants.mThirty,
		marginLeft: sizeConstants.fourteenMX,
		fontWeight: "bold",
		marginTop: sizeConstants.fourteenMX,
	},
})
