import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {black} from "color-name"
import GoalStep2 from "./GoalStep2"

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
					<View style={styles.progressContainer}>
						<View style={styles.progress}></View>
						<View style={styles.normalProgress}></View>
						<View style={styles.normalProgress}></View>
					</View>

					<View style={styles.textContainer}>
						<Text style={styles.title}>Name your goal</Text>
						<Text style={styles.subTitle}>
							Be specific, try to put a real and exact figure on it. Make sure it’s achievable so
							that you build on your momentum.
						</Text>
						<View style={styles.centerCont}>
							<TextInput
								style={styles.textInput}
								placeholder="Type Here"
								onChangeText={(text) => {
									setGoalName(text)
								}}
							/>
						</View>
					</View>

					<View
						style={{
							position: "absolute",
							bottom: 45,
							width: "100%",
							justifyContent: "center",
						}}
					>
						<View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 14}}>
							<View></View>
							<View>
								<TouchableOpacity
									style={[styles.btnStylingRight, styles.nextBtn]}
									onPress={nextScreen}
								>
									<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
									{/* <GoalStep2 /> */}
								</TouchableOpacity>
							</View>
						</View>

						<View style={{alignItems: "center"}}>
							<TouchableOpacity style={styles.btnStyling} onPress={gotoHome}>
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
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},

	progressContainer: {
		marginTop: 70,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	progress: {
		height: 5,
		width: 60,
		backgroundColor: "white",
		borderRadius: 10,
		marginHorizontal: 2,
	},
	normalProgress: {
		height: 5,
		width: 60,
		backgroundColor: "rgba(255, 255, 255, 0.274)",
		borderRadius: 10,
		marginHorizontal: 2,
	},
	textContainer: {
		marginTop: 50,
		marginHorizontal: 20,
		marginLeft: 20,
		marginRight: 20,
	},

	title: {
		fontSize: 25,
		textAlign: "left",
		fontWeight: "bold",
		color: "white",
		// fontFamily: Fonts.AvenerLTStd - black.otf,
	},
	subTitle: {
		fontSize: 19,
		letterSpacing: 0.7,
		color: "white",
		marginTop: 30,
	},
	btnContainer: {
		position: "absolute",
		bottom: 20,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
	},

	nextBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#FDF9F2",
	},

	textInput: {
		width: 314,
		height: 50,
		backgroundColor: "#FDF9F2",
		borderRadius: 50,
		marginTop: 50,
		paddingLeft: 20,
		fontSize: 19,
		color: "#666666",
		elevation: 10,
	},
	image: {
		width: "100%",
		height: "100%",
	},
})
