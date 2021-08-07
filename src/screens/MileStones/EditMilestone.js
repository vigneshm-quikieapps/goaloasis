import React, {useEffect, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from "react-native"
import {useNavigation} from "@react-navigation/native"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {connect} from "react-redux"
import {ColorConstants, commonDateFormat, sizeConstants} from "../../core/constants"
import {setBooleanFlag, setClickedGoal, setShowLoader} from "./../../redux/actions"
import {Calendar, LocaleConfig} from "react-native-calendars"
import {calendarLocale, CustomDayComponentForCalendar} from "../../components/CommonComponents"
import {addMilestoneToFirestore} from "../../firebase"
import dayjs from "dayjs"

LocaleConfig.locales["en"] = calendarLocale
LocaleConfig.defaultLocale = "en"

const EditMilestone = ({
	route,
	clickedGoal,
	setClickedGoal,
	setBooleanFlag,
	booleanFlag,
	setShowLoader,
	loading,
}) => {
	const {milestoneName, date: mileDate} = route.params

	const navigation = useNavigation()
	const [clickedDate, setDate] = useState(mileDate)
	const [milestone, setMilestone] = useState(milestoneName)

	useEffect(() => {
		console.log("Edit Milestone", milestoneName, clickedDate, mileDate)
	}, [])

	const handleMilestoneEdit = () => {
		setShowLoader(true)
		let newMilestoneArr = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone == milestoneName) {
				return {
					...item,
					milestone: milestone,
					date: clickedDate,
				}
			}
			return item
		})

		let updatedObj = {
			...clickedGoal,
			goalMilestone: newMilestoneArr,
		}
		setClickedGoal(updatedObj)

		addMilestoneToFirestore(clickedGoal, newMilestoneArr, () => {
			setShowLoader(false)

			navigation.navigate("particulargoal")
			setBooleanFlag(!booleanFlag)
		})
	}
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<StatusBarScreen>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Edit Milestone</Text>
				</View>

				<View style={styles.goalsContainer}>
					<View style={styles.topLine}></View>
					<View>
						<View>
							<Text style={styles.mileNameStyle}>{milestoneName}</Text>
						</View>
						<View>
							<Text style={styles.headingText}>Enter name of milestone</Text>
						</View>
						<View style={styles.centerCont}>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								onChangeText={(text) => setMilestone(text)}
								value={milestone}
								maxLength={28}
							/>
						</View>
						<Text style={styles.headingText}>Edit target date</Text>
						<Calendar
							current={dayjs(clickedDate).format(commonDateFormat)}
							minDate={dayjs().format(commonDateFormat)}
							// maxDate={"2050-05-30"}
							// onDayPress={(day) => {
							// 	setDate(day.dateString)
							// }}
							hideArrows={false}
							hideExtraDays={true}
							disableMonthChange={false}
							hideDayNames={false}
							showWeekNumbers={false}
							onPressArrowLeft={(subtractMonth) => subtractMonth()}
							onPressArrowRight={(addMonth) => addMonth()}
							disableArrowLeft={false}
							enableSwipeMonths={true}
							selectedDayBackgroundColor={ColorConstants.white}
							theme={{
								backgroundColor: ColorConstants.transparent,
								calendarBackground: ColorConstants.transparent,
								textSectionTitleColor: ColorConstants.whitishBlue,
								textSectionTitleDisabledColor: ColorConstants.whitishBlue,
								// selectedDayBackgroundColor: ColorConstants.whitishBlue,
								selectedDayBackgroundColor: "pink",
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
							}}
							style={{
								backgroundColor: ColorConstants.transparent,
								// height: sizeConstants.twoSeventyMX,
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
					</View>

					<View style={styles.bottomBtnContainer}>
						<TouchableOpacity style={styles.HelpBtn} onPress={handleMilestoneEdit}>
							<Text style={styles.btnText}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</View>
			</StatusBarScreen>
		</ScrollView>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
		booleanFlag: state.milestone.booleanFlag,
		loading: state.milestone.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBooleanFlag: (data) => {
			dispatch(setBooleanFlag(data))
		},
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMilestone)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ColorConstants.lightestYellow,
	},
	topLine: {
		height: sizeConstants.s,
		backgroundColor: ColorConstants.lightestYellow,
		width: "17%",
		marginTop: sizeConstants.seven,
		borderRadius: sizeConstants.eightyFive,
		alignSelf: "center",
	},

	titleContainer: {
		// height: sizeConstants.oneThirty,
		backgroundColor: ColorConstants.lightestYellow,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: sizeConstants.xxl,
	},
	titleText: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.nineteen,
		fontWeight: "bold",
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: ColorConstants.darkFaintBlue,
		borderTopRightRadius: 70,
		paddingHorizontal: sizeConstants.fourteenMX,
	},
	bottomBtnContainer: {
		marginVertical: sizeConstants.l,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#7EC8C9",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	HelpBtn: {
		backgroundColor: ColorConstants.white,
		height: sizeConstants.xxxl,
		width: "75%",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		// marginVertical: 20,
	},
	btnText: {
		fontSize: sizeConstants.xl,
		color: ColorConstants.darkFaintBlue,
		fontWeight: "bold",
	},
	mileNameStyle: {
		color: ColorConstants.white,
		fontSize: sizeConstants.nineteen,
		marginTop: sizeConstants.l,
	},
	headingText: {
		color: ColorConstants.white,
		fontSize: sizeConstants.twentyTwoScale,
		fontWeight: "bold",
		marginTop: sizeConstants.s,
	},

	centerCont: {
		justifyContent: "center",
		alignItems: "center",
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
})
