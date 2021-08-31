import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Alert} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import DatePicker from "react-native-date-picker"
import {connect} from "react-redux"
import {updateGoalToFirestore} from "../../firebase/goals"
import {setClickedGoal, setShowLoader} from "../../redux/actions"

import dayjs from "dayjs"
import {sizeConstants} from "../../core/constants"
import {scale} from "react-native-size-matters"
import {commonDateFormat} from "./../../core/constants"
import {checkInternetConnectionAlert} from "../../components/CommonComponents"

const EditGoalhelp = (props) => {
	const {clickedGoal, setClickedGoal, setShowLoader, loading, internet} = props
	console.log(clickedGoal)
	const [goalName, setGoalName] = useState(clickedGoal.name)
	const [targetDate, setTargetDate] = useState(dayjs(clickedGoal.targetDate))

	const navigation = useNavigation()

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	const goBack = () => {
		navigation.goBack()
	}

	const updateGoal = () => {
		if (!internet) {
			checkInternetConnectionAlert(() => {})
			return
		}
		let updatedObj = {
			...clickedGoal,
			name: goalName,
			targetDate: dayjs(targetDate).format(commonDateFormat),
		}
		setShowLoader(true)
		updateGoalToFirestore(updatedObj, clickedGoal.name, () => {
			setShowLoader(false)
			navigation.navigate("mygoals")
			setClickedGoal(updatedObj)
		})
	}
	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				<View style={styles.headerMargin}></View>
				<View style={{flex: 1}}>
					<View style={styles.textContainer}>
						<Text style={styles.title}>Edit name of goal</Text>
						<View style={styles.centerCont}>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								value={goalName}
								onChangeText={(text) => {
									setGoalName(text)
								}}
								maxLength={15}
							/>
						</View>

						<Text style={[styles.title, {marginTop: 50, marginLeft: 20}]}>Edit target date</Text>
						<View style={[styles.centerCont, {height: 250}]}>
							<DatePicker
								androidVariant="iosClone"
								date={targetDate}
								onDateChange={setTargetDate}
								mode="date"
								textColor="#ffffff"
								locale="en"
								fadeToColor="none"
								dividerHeight={0}
								minimumDate={dayjs()}
							/>
						</View>
					</View>

					<View style={[styles.btnContainer, styles.nextBtnContainer]}>
						<View></View>
						<View>
							<TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={updateGoal}>
								<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
		loading: state.milestone.loading,
		internet: state.milestone.internet,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setClickedGoal: (obj) => {
			dispatch(setClickedGoal(obj))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalhelp)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerMargin: {
		marginTop: sizeConstants.fourty,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: sizeConstants.twentySix,
	},
	textContainer: {
		marginTop: sizeConstants.thirty,
		marginHorizontal: sizeConstants.twentyX,
	},
	title: {
		fontSize: sizeConstants.twentyTwoScale, //25
		textAlign: "left",
		fontWeight: "bold",
		color: "white",
	},
	btnContainer: {
		position: "absolute",
		bottom: sizeConstants.seventy,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	nextBtnContainer: {
		bottom: sizeConstants.fourtyFive,
		justifyContent: "space-around",
		flexDirection: "row",
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
	},
	nextBtn: {
		width: sizeConstants.xxxl,
		height: sizeConstants.xxxl,
		borderRadius: sizeConstants.xxxl,
	},
	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.xxxl,
		backgroundColor: "#FDF9F2",
		borderRadius: sizeConstants.xxxl,
		marginTop: sizeConstants.xxxl,
		paddingLeft: sizeConstants.twentyX,
		fontSize: sizeConstants.eighteenScale, //19
		color: "#666666",
		elevation: 10,
	},
})
