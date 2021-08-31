import React, {useState, useEffect} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {black} from "color-name"
import GoalStep2 from "./GoalStep2"
import {CommonStyles, sizeConstants} from "../../core/constants"
import {setCurrentGoal} from "./../../redux/actions"
import {connect} from "react-redux"
import {CommonHomeButton, CommonPrevNextButton} from "../../components/CommonComponents"
import {ColorConstants} from "./../../core/constants"
import {scale} from "react-native-size-matters"
import dayjs from "dayjs"

const NameGoal = ({setCurrentGoal, currentGoal}) => {
	const navigation = useNavigation()
	const [goalName, setGoalName] = useState("")

	const gotoHome = () => {
		navigation.goBack()
	}
	const nextScreen = () => {
		let currentGoalObj = {
			...currentGoal,
			name: goalName,
		}
		setCurrentGoal(currentGoalObj)
		navigation.navigate("goal2")
	}

	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				{/* <ImageBackground
				style={styles.image}
				source={require("./nameGoalBg.png")}
				resizeMode="stretch"
			> */}
				<View style={{flex: 1}}>
					<View style={CommonStyles.progressContainer}>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.normalProgress}></View>
						<View style={CommonStyles.normalProgress}></View>
					</View>

					<View style={CommonStyles.textContainer}>
						<Text style={CommonStyles.title}>Name your goal</Text>
						<Text style={CommonStyles.goalsubTitle}>
							Be specific, try to put a real and exact figure on it. Make sure it’s achievable so
							that you build on your momentum.
						</Text>
						<View style={CommonStyles.centerCont}>
							<TextInput
								style={[CommonStyles.textInput, {marginTop: sizeConstants.xxxl}]}
								placeholder="Type Here"
								onChangeText={(text) => {
									setGoalName(text)
								}}
								maxLength={15}
							/>
						</View>
					</View>

					{/* <View style={CommonStyles.homeAndRight}> */}
					{/* <View style={CommonStyles.rightArrow}>
							<View></View>
							<View>
								<TouchableOpacity style={CommonStyles.nextBtn} onPress={nextScreen}>
									<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
									<GoalStep2 />
								</TouchableOpacity>
							</View>
						</View> */}

					{/* <View style={CommonStyles.homeContainer}>
							<TouchableOpacity style={CommonStyles.homeBtnStyling} onPress={gotoHome}>
								<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
							</TouchableOpacity>
						</View> */}
					{/* </View> */}
				</View>
				{/* <CommonPrevNextButton right={true} nextClick={nextScreen} /> */}

				{goalName === "" ? (
					<CommonPrevNextButton
						right={true}
						style={{backgroundColor: ColorConstants.whiteOp50}}
						size={50}
					/>
				) : (
					<CommonPrevNextButton right={true} nextClick={nextScreen} size={50} />
				)}
				<CommonHomeButton
					click={gotoHome}
					BackHandle={true}
					normalBack={true}
					clickforBack={gotoHome}
				/>
			</LinearGradient>
			{/* </ImageBackground> */}
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		currentGoal: state.milestone.currentGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentGoal: (data) => {
			dispatch(setCurrentGoal(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(NameGoal)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
})
