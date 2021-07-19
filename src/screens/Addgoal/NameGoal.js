import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {black} from "color-name"
import GoalStep2 from "./GoalStep2"
import {CommonStyles} from "../../core/styles"

const NameGoal = () => {
	const navigation = useNavigation()
	const [goalName, setGoalName] = useState()

	const gotoHome = () => {
		navigation.goBack()
	}
	const nextScreen = () => {
		navigation.navigate("goal2", {name: goalName})
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
						<Text style={CommonStyles.subTitle}>
							Be specific, try to put a real and exact figure on it. Make sure it’s achievable so
							that you build on your momentum.
						</Text>
						<View style={CommonStyles.centerCont}>
							<TextInput
								style={CommonStyles.textInput}
								placeholder="Type Here"
								onChangeText={(text) => {
									setGoalName(text)
								}}
							/>
						</View>
					</View>

					<View style={CommonStyles.homeAndRight}>
						<View style={CommonStyles.rightArrow}>
							<View></View>
							<View>
								<TouchableOpacity style={CommonStyles.nextBtn} onPress={nextScreen}>
									<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
									{/* <GoalStep2 /> */}
								</TouchableOpacity>
							</View>
						</View>

						<View style={CommonStyles.homeContainer}>
							<TouchableOpacity style={CommonStyles.homeBtnStyling} onPress={gotoHome}>
								<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</LinearGradient>
			{/* </ImageBackground> */}
		</View>
	)
}

export default NameGoal

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
})
