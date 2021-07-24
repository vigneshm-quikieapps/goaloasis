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
import {addNewMilestone, EditNewMilestone, setClickedGoal} from "./../../redux/actions"
import {addMilestoneToFirestore, getAllGoalsFromFirestore} from "./../../firebase"
import Constants from "expo-constants"
import {CommonHomeButton, CommonNextButton} from "../../core/CommonComponents"

const FirstMilestone = ({
	addNewMilestone,
	newMileStone,
	clickedGoal,
	taskFlowData,
	setClickedGoal,
}) => {
	const [milestone, setMilestone] = useState("")
	const [date, setDate] = useState()
	const navigation = useNavigation()

	const nextScreen = () => {
		// let milestoneArr = [
		// 	...clickedGoal.goalMilestone,
		// 	{
		// 		milestone: milestone,
		// 		date: date,
		// 		taskData: [],
		// 	},
		// ]

		// let updatedObj = {
		// 	...clickedGoal,
		// 	goalMilestone: milestoneArr,
		// }
		// console.log("setttiiinngggClickedGoal(updatedObj)", updatedObj)
		// setClickedGoal(updatedObj)
		// console.log("setClickedGoal(updatedObj) donnee", updatedObj)
		// addNewMilestone(milestoneArr)
		// addMilestoneToFirestore(clickedGoal, milestoneArr)

		navigation.navigate("ThirdMileStone")
	}

	const handleHomeClick = () => {
		navigation.navigate("ThirdMileStone")
	}
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	return (
		<ImageBackground style={[styles.image]} source={commonImages.secondImage} resizeMode="stretch">
			<View style={{flex: 1}}>
				<View>
					<ScrollView>
						<StatusBarScreen>
							<View style={CommonStyles.flexDirectionRow}>
								<Text style={CommonStyles.mainTitle}>{clickedGoal.name}</Text>
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
								current={new Date()}
								minDate={"2001-05-10"}
								maxDate={"2050-05-30"}
								onDayPress={(day) => {
									setDate(day.dateString)
								}}
								hideArrows={false}
								hideExtraDays={true}
								disableMonthChange={false}
								hideDayNames={false}
								showWeekNumbers={false}
								onPressArrowLeft={(subtractMonth) => subtractMonth()}
								onPressArrowRight={(addMonth) => addMonth()}
								disableArrowLeft={false}
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
								}}
								style={{
									backgroundColor: ColorConstants.transparent,
									// height: sizeConstants.twoSeventyMX,
								}}
							/>

							<CommonNextButton click={nextScreen} size={50} />
						</StatusBarScreen>
					</ScrollView>
				</View>
				<CommonHomeButton click={handleHomeClick} size={44} />
			</View>
		</ImageBackground>
	)
}

const mapStateToProps = (state) => {
	return {
		newMileStone: state.milestone.newMileStone,
		clickedGoal: state.milestone.clickedGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewMilestone: (milestone) => dispatch(addNewMilestone(milestone)),
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
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
		flex: 1,
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
		position: "absolute",
		bottom: sizeConstants.sixteenX,
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.faintWhite,
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
