import React, {useState, useEffect} from "react"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ScrollView,
	ImageBackground,
} from "react-native"
import {
	ColorConstants,
	commonDateFormat,
	commonImages,
	CommonStyles,
	goalsColorArray,
	milestoneColorArray,
	sizeConstants,
} from "./../../core/constants"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Entypo} from "@expo/vector-icons"
import {Calendar, LocaleConfig} from "react-native-calendars"
import StatusBarScreen from "./StatusBarScreen"
import {connect} from "react-redux"
import {
	addNewMilestone,
	EditNewMilestone,
	setClickedGoal,
	setClickedMilestone,
	setShowLoader,
} from "./../../redux/actions"
import {addMilestoneToFirestore, getAllGoalsFromFirestore} from "./../../firebase"
import Spinner from "./../../components/Spinner"
import Constants from "expo-constants"
import {
	calendarLocale,
	CommonHomeButton,
	CommonNextButton,
	CommonPrevNextButton,
	CustomDayComponentForCalendar,
} from "../../components/CommonComponents"
import dayjs from "dayjs"

LocaleConfig.locales["en"] = calendarLocale
LocaleConfig.defaultLocale = "en"

const FirstMilestone = ({
	addNewMilestone,
	newMileStone,
	clickedGoal,
	taskFlowData,
	setClickedGoal,
	setClickedMilestone,
	setShowLoader,
	loading,

	allGoals,
}) => {
	const [milestone, setMilestone] = useState("")
	const [clickedDate, setDate] = useState(dayjs().format(commonDateFormat))
	const navigation = useNavigation()

	const nextScreen = () => {
		let index = 0
		for (let i = 0; i < allGoals.length; i++) {
			if (allGoals[i].color === clickedGoal.color) {
				index = i
				break
			}
		}
		let milestoneArr = [
			...clickedGoal.goalMilestone,
			{
				milestone: milestone,
				date: clickedDate,
				taskData: [],
				isCompleted: false,
				color: milestoneColorArray[index],
			},
		]

		let updatedObj = {
			...clickedGoal,
			goalMilestone: milestoneArr,
		}
		setClickedMilestone(milestone)
		addNewMilestone([
			{
				milestone: milestone,
				date: clickedDate,
				taskData: [],
			},
		])
		setShowLoader(true)

		addMilestoneToFirestore(clickedGoal, milestoneArr, () => {
			setShowLoader(false)
			navigation.navigate("ThirdMileStone")

			setClickedGoal(updatedObj)
		})

		// navigation.navigate("IndividualGoal")
	}

	const handleHomeClick = () => {
		navigation.navigate("mygoals")
	}
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	return (
		<ImageBackground style={[styles.image]} source={commonImages.secondImage} resizeMode="stretch">
			<View style={{flex: 1}}>
				{loading ? <Spinner /> : null}

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
									onPress={() => navigation.navigate("DParticularGoal")}
								/>
							</View>

							<Text style={styles.subTitle}>Enter Milestone</Text>
							<View style={styles.centerCont}>
								<TextInput
									style={styles.textInput}
									placeholder="Type Here"
									onChangeText={(text) => setMilestone(text)}
									maxLength={28}
								/>
							</View>
							<Text style={styles.subTitle}>
								{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
							</Text>
							<Text style={styles.bigTitle}>Edit target date</Text>

							<Calendar
								current={dayjs().format(commonDateFormat)}
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
						</StatusBarScreen>
					</ScrollView>
				</View>
				{milestone === "" ? (
					<CommonPrevNextButton
						right={true}
						style={{backgroundColor: ColorConstants.whiteOp50}}
						size={50}
						bottom={0}
					/>
				) : (
					<CommonPrevNextButton right={true} nextClick={nextScreen} size={50} bottom={0} />
				)}

				<CommonHomeButton
					click={handleHomeClick}
					size={44}
					pressedHome={true}
					BackHandle={true}
					normalBack={true}
					clickforBack={() => navigation.goBack()}
				/>
			</View>
		</ImageBackground>
	)
}

const mapStateToProps = (state) => {
	return {
		newMileStone: state.milestone.newMileStone,
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
		loading: state.milestone.loading,
		allGoals: state.milestone.allGoals,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewMilestone: (milestone) => dispatch(addNewMilestone(milestone)),
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
		setClickedMilestone: (task) => dispatch(setClickedMilestone(task)),
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstMilestone)

const styles = StyleSheet.create({
	mainTitle: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.twentyTwoScale, //25
		marginLeft: sizeConstants.twentyMX,
	},
	subTitle: {
		fontSize: sizeConstants.fourteenScale, //16
		color: "#FDF9F2",
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
		fontSize: sizeConstants.eighteenScale, //19
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
	},

	bigTitle: {
		color: ColorConstants.whitishBlue,
		fontSize: sizeConstants.twentyTwoScale, //25
		marginLeft: sizeConstants.fourteenMX,
		fontWeight: "bold",
		marginTop: sizeConstants.fourteenMX,
	},
})
