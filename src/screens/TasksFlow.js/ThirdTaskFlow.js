import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Calendar} from "react-native-calendars"
import {Entypo} from "@expo/vector-icons"
import {ColorConstants, CommonStyles, sizeConstants, height} from "../../core/styles"
import StatusBarScreen from "./../MileStones/StatusBarScreen"
import {
	CommonHomeButton,
	CustomDayComponentForCalendar,
	getAllDatesBetween,
} from "../../core/CommonComponents"
import {connect} from "react-redux"

const ThirdTaskFlow = ({clickedGoal}) => {
	const navigation = useNavigation()

	// const gotoHome = () => {
	// 	navigation.navigate("secondMileStone")
	// }
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	const [value, onChange] = useState(new Date())
	const [clickedDate, setDate] = useState(null)
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>

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
		}
		var finalArr = markedDates.map((date) => {
			let obj = {}
			obj[date] = markedObj
			return obj
		})
		let allDatesObj = convertArrToObj(finalArr)

		return allDatesObj
	}

	return (
		<StatusBarScreen style={CommonStyles.introContainer}>
			<ScrollView>
				<View style={CommonStyles.flexOne}>
					<View style={CommonStyles.flexDirectionRow}>
						<Text style={CommonStyles.mainTitle}>Read 5 book</Text>
						<Entypo
							name="cross"
							color={ColorConstants.faintWhite}
							size={38}
							style={CommonStyles.cross}
						/>
					</View>
					<Text style={CommonStyles.milestoneText}>Enter Milestone</Text>
					<TouchableOpacity
						style={[CommonStyles.container2, height <= 700 ? {marginTop: sizeConstants.xs} : {}]}
					>
						<Text style={CommonStyles.button}>Read One Book</Text>
					</TouchableOpacity>
					<Text style={CommonStyles.subTitleMilestone}>
						{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
					</Text>

					<View style={CommonStyles.calendarContainer}>
						<Text
							style={[CommonStyles.targetDate, height <= 700 ? {marginTop: sizeConstants.xs} : {}]}
						>
							Target Date
						</Text>
						<TouchableOpacity>
							<Text style={CommonStyles.done}>Done</Text>
						</TouchableOpacity>
					</View>

					<Calendar
						current={new Date()}
						minDate={new Date()}
						maxDate={"2090-01-01"}
						onMonthChange={(month) => {
							console.log("month changed", month)
						}}
						hideArrows={false}
						hideExtraDays={true}
						hideDayNames={false}
						showWeekNumbers={false}
						onPressArrowLeft={(subtractMonth) => subtractMonth()}
						onPressArrowRight={(addMonth) => addMonth()}
						disableArrowLeft={false}
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
						markedDates={clickedDate ? getMarkedDates() : {}}
						dayComponent={({date, state, marking}) => {
							console.log(state)
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
						style={[CommonStyles.containerMilestone, {marginTop: sizeConstants.s}]}
						onPress={() => {
							navigation.navigate("first")
						}}
					>
						<Text style={CommonStyles.reoccuring}>Set reoccuringgg</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity
						style={CommonStyles.bottomBtnMilestone}
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
export default connect(mapStateToProps, mapDispatchToProps)(ThirdTaskFlow)
