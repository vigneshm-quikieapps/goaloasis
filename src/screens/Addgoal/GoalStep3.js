import React, {useState, useEffect} from "react"
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import DatePicker from "react-native-date-picker"
import colors from "../../../colors"
import AsyncStorage from "@react-native-community/async-storage"
import {
	ColorConstants,
	colorsForTimeline,
	commonDateFormat,
	CommonStyles,
	forGoals,
	goalsColorArray,
	sizeConstants,
} from "../../core/constants"
import firestore from "@react-native-firebase/firestore"
import {setAllGoals, setCurrentGoal, setShowLoader} from "./../../redux/actions"
import {addGoalToFirestore, updateGoalToFirestore} from "./../../firebase/goals"
import {connect} from "react-redux"
import {
	checkInternetConnectionAlert,
	CommonHomeButton,
	CommonPrevNextButton,
} from "../../components/CommonComponents"

import {scale} from "react-native-size-matters"
import uuid from "react-native-uuid"
import dayjs from "dayjs"
var utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

// const colorArray = Object.values(forGoals)

const GoalStep3 = (props) => {
	const {
		setCurrentGoal,
		currentGoal,
		setShowLoader,
		loading,
		setAllGoals,
		allGoals,
		user,
		internet,
	} = props
	const navigation = useNavigation()

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	const goBack = () => {
		navigation.goBack()
	}

	const storeData = () => {
		if (!internet) {
			checkInternetConnectionAlert(() => {})
			return
		}
		let currentGoalObj = {
			...currentGoal,
			targetDate: date,
			createdAt: firestore.FieldValue.serverTimestamp(),
			goalMilestone: [],
			color: getColorForGoal(),
			isCompleted: false,
			userId: user && user.uid ? user.uid : null,
			timeStamp: dayjs().utc().format(),
			_id: uuid.v4(),
		}
		setShowLoader(true)
		addGoalToFirestore(currentGoalObj, (data) => {
			updateGoalToFirestore(data, data.name, () => {
				console.log("dataa###", data)
				setShowLoader(false)
				navigation.navigate("mygoals")
				setCurrentGoal(currentGoalObj)
			})
		})
	}
	const [date, setDate] = useState(dayjs().utc().format())

	const getColorForGoal = () => {
		return colorsForTimeline[allGoals.length].goal
	}

	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				<View style={{flex: 1}}>
					<View style={CommonStyles.progressContainer}>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.progress}></View>
					</View>

					<View style={CommonStyles.textContainer}>
						<Text style={CommonStyles.title}>Your target date</Text>
						<Text style={CommonStyles.goalsubTitle}>
							When your goal is time-bound, it become measurable. Don’t stress over it if you are
							unsure about the exact date. You can always adjust later.
						</Text>
						<View style={[CommonStyles.centerCont, {height: 250}]}>
							<DatePicker
								androidVariant="iosClone"
								date={dayjs(date)}
								onDateChange={(date) => {
									setDate(dayjs(date).format(commonDateFormat))
								}}
								mode="date"
								textColor="#ffffff"
								locale="en"
								fadeToColor="none"
								dividerHeight={0}
								minimumDate={dayjs(new Date())}
								maximumDate={dayjs("2090-01-01")}
							/>
						</View>
					</View>

					{/* <View style={CommonStyles.homeAndRight}>
						<View style={CommonStyles.rightArrow}>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStylingLeft, CommonStyles.nextBtn]}`
									onPress={goBack}
								>
									<MaterialCommunityIcons name="chevron-left" size={50} color="#7EC8C9" />
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStylingRight, CommonStyles.nextBtn]}
									onPress={storeData}
								>
									<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
								</TouchableOpacity>
							</View>
						</View> */}

					{/* <View style={{alignItems: "center"}}>
							<TouchableOpacity style={CommonStyles.homeBtnStyling} onPress={gotoHome}>
								<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
							</TouchableOpacity>
						</View> */}
					{/* </View> */}
				</View>

				<CommonPrevNextButton
					right={true}
					left={true}
					prevClick={goBack}
					loadingCalled={true}
					nextClick={storeData}
					iconLeftColor={ColorConstants.lighterBlue}
					iconRightColor={ColorConstants.lighterBlue}
				/>
				<CommonHomeButton
					click={gotoHome}
					normalBack={true}
					BackHandle={true}
					clickforBack={() => {
						navigation.navigate("goal2")
					}}
				/>
			</LinearGradient>
		</View>
	)
}
setAllGoals
const mapStateToProps = (state) => {
	return {
		currentGoal: state.milestone.currentGoal,
		loading: state.milestone.loading,
		allGoals: state.milestone.allGoals,
		user: state.milestone.user,
		internet: state.milestone.internet,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentGoal: (data) => {
			dispatch(setCurrentGoal(data))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},

		setAllGoals: (data) => {
			dispatch(setAllGoals(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(GoalStep3)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
})
