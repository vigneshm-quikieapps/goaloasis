import React, {useState, useRef} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import RBSheet from "react-native-raw-bottom-sheet"
import SwitchSelector from "react-native-switch-selector"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {ColorConstants, CommonStyles, sizeConstants} from "../../core/constants"
import {
	CommonHomeButton,
	reoccuringDefaultDailyArray,
	weekArray,
} from "../../components/CommonComponents"
import {setClickedGoal} from "./../../redux/actions"
import {connect} from "react-redux"
import {height} from "./../../core/constants"

const First = ({route, clickedMilestone}) => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [toggle, setToggle] = useState("Daily")
	const {taskDate, taskName} = route.params
	const [tName, setTaskName] = useState(taskName)

	const [reoccuringDays, setReoccuringDays] = useState([])
	// console.log("====================================")
	// console.log("FROM first", tName)
	// console.log("FROM first", taskDate)
	// console.log("====================================")
	const options = [
		{label: "Daily", value: "Daily"},
		{label: "Weekly", value: "Weekly"},
	]

	const setDaysForWeeklyReoccuring = (dayIndex) => {
		let weekArr = [...reoccuringDays]
		let isPresent = weekArr.find((day) => day == dayIndex) != undefined

		isPresent
			? (weekArr = weekArr.filter((day) => day != dayIndex))
			: (weekArr = [...weekArr, dayIndex])

		setReoccuringDays(weekArr)
	}

	return (
		<StatusBarScreen style={styles.introContainer}>
			<View style={{flexDirection: "row"}}>
				<Text style={CommonStyles.mainTitle}>{clickedMilestone}</Text>
				<TouchableOpacity onPress={() => refRBSheet.current.open()} style={CommonStyles.threeDots}>
					<View style={CommonStyles.dots}></View>
					<View style={CommonStyles.dots}></View>
					<View style={CommonStyles.dots}></View>
				</TouchableOpacity>
			</View>
			<RBSheet
				height={height * 0.7}
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: ColorConstants.transparent,
						borderRadius: 50,
					},
					draggableIcon: {
						backgroundColor: ColorConstants.black,
						borderRadius: 50,
					},
					container: {
						borderTopRightRadius: 40,
						borderTopLeftRadius: 40,
					},
				}}
			>
				<View style={CommonStyles.bottomSheet}>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("markcomplete")}
					>
						<Text style={CommonStyles.bottomText}>Mark Goal Complete</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("editgoal")}
					>
						<Text style={CommonStyles.bottomText}>Edit Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("deletegoal")}
					>
						<Text style={CommonStyles.bottomText}>Delete Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("help")}
					>
						<Text style={CommonStyles.bottomText}>Tutorial</Text>
					</TouchableOpacity>
				</View>
			</RBSheet>
			<Text style={[CommonStyles.enterTask, {marginTop: sizeConstants.m}]}>Enter Task</Text>
			<View style={CommonStyles.centerCont}>
				<TextInput
					style={CommonStyles.textInput}
					placeholder="Type Here"
					onChangeText={(text) => setTaskName(text)}
					value={tName}
					maxLength={28}
				/>
			</View>
			<Text style={CommonStyles.firstSubTitle}>Edit reoccuring</Text>

			<SwitchSelector
				style={{marginTop: sizeConstants.thirtyFive, paddingHorizontal: sizeConstants.twentyX}}
				options={options}
				initial={0}
				onPress={(value) => setToggle(value)}
				textColor="#333333"
				selectedColor="#333333"
				buttonColor="#FDF9F2"
				borderColor={ColorConstants.darkBlue}
				hasPadding
				testID="gender-switch-selector"
				accessibilityLabel="gender-switch-selector"
				backgroundColor={ColorConstants.darkBlue}
				height={sizeConstants.xxxl}
				fontSize={sizeConstants.twentyTwoScale}
			/>
			{toggle == "Weekly" && (
				<View style={CommonStyles.toggle}>
					{weekArray.map((day, index) => {
						let isPresent = reoccuringDays.find((day) => day == index) != undefined
						return (
							<TouchableOpacity
								onPress={() => {
									setDaysForWeeklyReoccuring(index)
								}}
								key={`${index}_${day}`}
							>
								<View style={[CommonStyles.days, isPresent ? styles.daySelected : {}]}>
									<Text style={[CommonStyles.daysText, isPresent ? styles.daySelectedText : {}]}>
										{day}
									</Text>
								</View>
							</TouchableOpacity>
						)
					})}
				</View>
			)}
			<View
				style={{
					height: toggle == "Weekly" ? "29.7%" : "40%",
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						width: "95%",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<TouchableOpacity
						style={CommonStyles.cancelReoccuring}
						onPress={() => {
							navigation.navigate("second", {
								reoccuring: toggle,
								taskDate: taskDate,
								taskName: tName,
								reoccuringDays: toggle == "Daily" ? reoccuringDefaultDailyArray : reoccuringDays,
							})
						}}
					>
						<Text style={CommonStyles.cancelReoccuringText}>Save</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={CommonStyles.cancelReoccuring}
						// onPress={() => {
						// 	navigation.goBack()
						// }}
						onPress={() => navigation.navigate("thirdtaskflow")}
					>
						<Text style={CommonStyles.cancelReoccuringText}>Cancel</Text>
					</TouchableOpacity>

					{/* <TouchableOpacity
					style={CommonStyles.bottomBtn}
					onPress={() => navigation.navigate("mygoals")}
				>
					<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
				</TouchableOpacity> */}
				</View>
			</View>
			<CommonHomeButton
				click={() => navigation.navigate("particulargoal")}
				BackHandle={true}
				clickforBack={() => navigation.goBack()}
				normalBack={true}
			/>
		</StatusBarScreen>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
		clickedMilestone: state.milestone.clickedMilestone,
		booleanFlag: state.milestone.booleanFlag,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(First)

const styles = StyleSheet.create({
	introContainer: {
		backgroundColor: ColorConstants.darkFaintBlue,
	},

	daySelected: {
		backgroundColor: ColorConstants.faintWhite,
		margin: sizeConstants.four,
	},
	daySelectedText: {color: ColorConstants.darkBlue},
})
