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
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "./../../core/styles"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Entypo} from "@expo/vector-icons"

import {Calendar} from "react-native-calendars"
import StatusBarScreen from "./../MileStones/StatusBarScreen"
import {
	addNewMilestone,
	EditNewMilestone,
	setBooleanFlag,
	setClickedGoal,
	setTaskFlowData,
} from "./../../redux/actions"
import {addMilestoneToFirestore, getAllGoalsFromFirestore} from "./../../firebase"
import {connect} from "react-redux"
import {
	checkDate,
	CommonHomeButton,
	CommonPrevNextButton,
	CustomDayComponentForCalendar,
	reoccuringDefaultDailyArray,
} from "../../core/CommonComponents"

const FirstTaskFlow = ({
	setTaskFlowData,
	clickedGoal,
	newMileStone,
	clickedMilestone,
	taskFlowData,
	setBooleanFlag,
	setClickedGoal,
}) => {
	useEffect(() => {
		console.log("newMileStone", newMileStone)
	}, [])
	const navigation = useNavigation()
	const [taskName, setTaskName] = useState("")
	const [clickedDate, setDate] = useState(new Date())

	const nextScreen = () => {
		navigation.navigate("secondtaskflow", {
			currentTaskData: {
				task: taskName,
				date: clickedDate,
			},
		})
	}

	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>
	return (
		<ImageBackground
			style={[CommonStyles.mainContainer, styles.image]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<ScrollView style={CommonStyles.mainContainer}>
				<StatusBarScreen>
					<View style={CommonStyles.flexOne}>
						<View style={CommonStyles.flexDirectionRow}>
							<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
							<Entypo
								name="cross"
								color={ColorConstants.faintWhite}
								size={38}
								style={CommonStyles.cross}
								onPress={() => navigation.navigate("DParticularGoal")}
							/>
						</View>

						<Text style={styles.subTitle}>Enter Task</Text>
						<View style={styles.centerCont}>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								onChangeText={(text) => setTaskName(text)}
							/>
						</View>
						<Text style={styles.bigTitle}>Edit target date</Text>

						<View style={CommonStyles.calendarContainer}>
							<Text style={CommonStyles.targetDate}>Target Date</Text>
							<TouchableOpacity onPress={() => {}} style={{alignSelf: "flex-end"}}>
								<Text style={CommonStyles.done}>Done</Text>
							</TouchableOpacity>
						</View>

						<Calendar
							current={new Date()}
							minDate={new Date()}
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

						{taskName === "" ? (
							<CommonPrevNextButton
								right={true}
								style={{backgroundColor: ColorConstants.whiteOp50}}
								size={50}
								bottom={0}
							/>
						) : (
							<CommonPrevNextButton right={true} nextClick={nextScreen} size={50} bottom={0} />
						)}
					</View>
				</StatusBarScreen>
			</ScrollView>

			<CommonHomeButton
				click={() => navigation.navigate("particulargoal")}
				BackHandle={true}
				normalBack={true}
				clickforBack={() => navigation.navigate("particulargoal")}
			/>
		</ImageBackground>
	)
}
const mapStateToProps = (state) => {
	return {
		taskFlowData: state.milestone.taskFlowData,
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
		booleanFlag: state.milestone.booleanFlag,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTaskFlowData: (task) => dispatch(setTaskFlowData(task)),
		setBooleanFlag: (task) => dispatch(setBooleanFlag(task)),
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstTaskFlow)
const styles = StyleSheet.create({
	mainTitle: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.xxl,
		marginLeft: sizeConstants.twentyMX,
	},
	subTitle: {
		fontSize: 16,
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
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		right: 0,
		display: "flex",
		alignSelf: "flex-end",
	},
	nextBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
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
		fontSize: 19,
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
	},

	bigTitle: {
		color: ColorConstants.whitishBlue,
		fontSize: sizeConstants.thirty,
		marginLeft: sizeConstants.fourteen,
		fontWeight: "bold",
		marginTop: sizeConstants.fourteen,
	},
})
