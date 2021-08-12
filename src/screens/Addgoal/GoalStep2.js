import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {ColorConstants, CommonStyles, sizeConstants} from "../../core/constants"
import {setCurrentGoal} from "./../../redux/actions"
import {connect} from "react-redux"
import {CommonHomeButton, CommonPrevNextButton} from "../../components/CommonComponents"
import {scale} from "react-native-size-matters"
import TextInputLines from "../../components/TextInputLines"

const GoalStep2 = ({setCurrentGoal, currentGoal}) => {
	const navigation = useNavigation()
	const [description, setDescription] = useState("")
	console.log("DESCRIPTION", description)

	const nextScreen = () => {
		let currentGoalObj = {
			...currentGoal,
			description: description,
		}
		setCurrentGoal(currentGoalObj)
		navigation.navigate("goal3")
	}
	const goBack = () => {
		navigation.goBack()
	}
	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				<View style={{flex: 1}}>
					<View style={CommonStyles.progressContainer}>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.normalProgress}></View>
					</View>

					<View style={CommonStyles.textContainer}>
						<Text style={CommonStyles.title}>Why is it important?</Text>
						<Text style={CommonStyles.goalsubTitle}>
							Write out what this goal means to you and make sure it’s something important.
						</Text>
						<View style={CommonStyles.centerCont}>
							<TextInput
								style={[
									CommonStyles.textInput,
									{marginTop: sizeConstants.xxxl, height: 80, borderRadius: 30},
								]}
								placeholder="Type Here"
								// multiline={true}
								// multiline={true}
								// numberOfLines={2}
								onChangeText={(text) => setDescription(text)}
								maxLength={35}
								// numberOfLines={1}
							/>
							{/* <TextInputLines
								style={[
									CommonStyles.textInput,
									{marginTop: sizeConstants.xxxl, height: 80, borderRadius: 30},
								]}
								autoFocus={true}
								placeholder="Type Here"
								onChangeText={(text) => setDescription(text)}
								// numberOfLines={2}
							/> */}
						</View>
					</View>

					{/* <View style={CommonStyles.homeAndRight}>
						<View style={CommonStyles.rightArrow}>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStyling, CommonStyles.nextBtn]}
									onPress={goBack}
								>
									<MaterialCommunityIcons name="chevron-left" size={50} color="#7EC8C9" />
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStyling, CommonStyles.nextBtn]}
									onPress={nextScreen}
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
				{/* <CommonPrevNextButton
					right={true}
					left={true}
					prevClick={goBack}
					nextClick={nextScreen}
					iconLeftColor={ColorConstants.lighterBlue}
					iconRightColor={ColorConstants.lighterBlue}
				/> */}

				{description === "" ? (
					<CommonPrevNextButton
						right={true}
						left={true}
						// style={{backgroundColor: ColorConstants.whiteOp50}}
						size={50}
						prevClick={() => navigation.navigate("addgoal")}
						iconLeftColor={ColorConstants.lighterBlue}
						iconRightColor={ColorConstants.lighterBlue}
					/>
				) : (
					<CommonPrevNextButton
						right={true}
						left={true}
						nextClick={nextScreen}
						prevClick={() => navigation.navigate("addgoal")}
						size={50}
						iconLeftColor={ColorConstants.lighterBlue}
						iconRightColor={ColorConstants.lighterBlue}
					/>
				)}
				<CommonHomeButton
					click={gotoHome}
					normalBack={true}
					BackHandle={true}
					clickforBack={() => {
						navigation.navigate("addgoal")
					}}
				/>
			</LinearGradient>
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
export default connect(mapStateToProps, mapDispatchToProps)(GoalStep2)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
})
