import React, {useContext} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {setFirstTimeUser} from "../utils/asyncStorage"
import authContext from "../context/auth/authContext"
import StatusBarScreen from "../screens/MileStones/StatusBarScreen"
import Constants from "expo-constants"

const IntroSlider = ({data}) => {
	console.log("Data from the Intro Slider---->", data)
	const AuthContext = useContext(authContext)
	const {loadUser} = AuthContext

	const navigation = useNavigation()
	const {title, subTitle, color1, color2, screen, img} = data

	const handleNavigateScreen = async () => {
		if (screen === 1) {
			navigation.navigate("slide2")
		} else if (screen === 2) {
			navigation.navigate("slide3")
		} else if (screen === 3) {
			navigation.navigate("slide4")
		}
	}

	const setLoggedIn = async () => {
		await setFirstTimeUser()
		loadUser()
	}

	let backImg
	switch (screen) {
		case 1:
			backImg = require("../assets/images/first.png")
			break

		case 2:
			backImg = require("../assets/images/second.png")
			break

		case 3:
			backImg = require("../assets/images/third.png")
			break

		case 4:
			backImg = require("../assets/images/fourth.png")
			break
	}

	return (
		<ImageBackground
			style={[styles.introContainer, styles.image]}
			source={backImg}
			resizeMode="stretch"
		>
			{/* <LinearGradient colors={[color1, color2]} style={{flex: 1}}> */}
			<View style={styles.headerMargin}>
				<View></View>
				<View>
					<TouchableOpacity onPress={() => navigation.navigate("slide4")}>
						<Text style={styles.SkipText}>Skip</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 1}}>
				<View style={styles.progressContainer}>
					{screen === 1 ? (
						<>
							<View style={styles.progress}></View>
							<View style={styles.normalProgress}></View>
							<View style={styles.normalProgress}></View>
							<View style={styles.normalProgress}></View>
						</>
					) : screen === 2 ? (
						<>
							<View style={styles.progress}></View>
							<View style={styles.progress}></View>
							<View style={styles.normalProgress}></View>
							<View style={styles.normalProgress}></View>
						</>
					) : screen === 3 ? (
						<>
							<View style={styles.progress}></View>
							<View style={styles.progress}></View>
							<View style={styles.progress}></View>
							<View style={styles.normalProgress}></View>
						</>
					) : screen === 4 ? (
						<>
							<View style={styles.progress}></View>
							<View style={styles.progress}></View>
							<View style={styles.progress}></View>
							<View style={styles.progress}></View>
						</>
					) : null}
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subTitle}>{subTitle}</Text>
				</View>

				<View style={styles.btnContainer}>
					{screen === 4 ? (
						<TouchableOpacity style={styles.btnStyling} onPress={setLoggedIn}>
							<Text style={styles.btnText}>Let’s get started!</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.btnStyling} onPress={handleNavigateScreen}>
							<Text style={styles.btnText}>Next</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{/* </LinearGradient> */}
		</ImageBackground>
	)
}

export default IntroSlider

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
	headerMargin: {
		marginTop: 97 - Constants.statusBarHeight,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 26,
	},
	SkipText: {
		color: "#FDF9F2",
		fontSize: 19,
		textAlign: "left",
	},
	image: {
		width: "100%",
		height: "100%",
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
		color: "rgba(255, 255, 255, 0.651)",
		marginTop: 30,
	},
	btnContainer: {
		position: "absolute",
		bottom: 100,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: 314,
		height: 50,
		borderRadius: 51,
	},
	btnText: {
		fontSize: 19,
		color: "#666666",
		letterSpacing: 1.2,
	},
})
