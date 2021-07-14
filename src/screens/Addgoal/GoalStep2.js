import React from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const GoalStep2 = () => {
	const navigation = useNavigation()

	const nextScreen = () => {
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
				<View style={styles.headerMargin}></View>
				<View style={{flex: 1}}>
					<View style={styles.progressContainer}>
						<View style={styles.progress}></View>
						<View style={styles.progress}></View>
						<View style={styles.normalProgress}></View>
					</View>

					<View style={styles.textContainer}>
						<Text style={styles.title}>Why is it important?</Text>
						<Text style={styles.subTitle}>
							Write out what this goal means to you and make sure it’s something important.
						</Text>
						<View style={styles.centerCont}>
							<TextInput style={styles.textInput} placeholder="Type Here" />
						</View>
					</View>

					{/* <View style={[styles.btnContainer, styles.nextBtnContainer]}>
						<View>
							<TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={goBack}>
								<MaterialCommunityIcons name="chevron-left" size={50} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
						<View>
							<TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={nextScreen}>
								<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.btnContainer}>
						<TouchableOpacity style={styles.btnStyling} onPress={gotoHome}>
							<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
						</TouchableOpacity>
					</View> */}

					<View
						style={{
							position: "absolute",
							bottom: 45,
							width: "100%",
							justifyContent: "center",
						}}
					>
						<View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 14}}>
							<View>
								<TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={goBack}>
									<MaterialCommunityIcons name="chevron-left" size={50} color="#7EC8C9" />
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity style={[styles.btnStyling, styles.nextBtn]} onPress={nextScreen}>
									<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
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
		</View>
	)
}

export default GoalStep2

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerMargin: {
		marginTop: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 26,
	},
	SkipText: {
		color: "#FDF9F2",
		fontSize: 19,
		textAlign: "left",
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
	},

	title: {
		fontSize: 25,
		textAlign: "left",
		fontWeight: "bold",
		color: "white",
	},
	subTitle: {
		fontSize: 19,
		letterSpacing: 0.7,
		color: "#FDF9F2",
		marginTop: 30,
	},
	btnContainer: {
		position: "absolute",
		bottom: 45,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	nextBtnContainer: {
		bottom: 150,
		justifyContent: "space-around",
		flexDirection: "row",
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
	},
	btnText: {
		fontSize: 19,
		color: "#666666",
		letterSpacing: 1.2,
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
})
