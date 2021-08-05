import React, {useContext} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {setFirstTimeUser} from "../utils/asyncStorage"
import authContext from "../context/auth/authContext"
import StatusBarScreen from "../screens/MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {ColorConstants, CommonStyles, sizeConstants} from "./../core/constants"

const IntroSlider = ({data}) => {
	// console.log("Data from the Intro Slider---->", data)
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
			style={[CommonStyles.introContainer, CommonStyles.image]}
			source={backImg}
			resizeMode="stretch"
		>
			{/* <LinearGradient colors={[color1, color2]} style={{flex: 1}}> */}
			<View style={CommonStyles.headerMargin}>
				<View></View>
				<View>
					<TouchableOpacity onPress={() => navigation.navigate("slide4")}>
						<Text style={CommonStyles.SkipText}>Skip</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 1}}>
				<View style={CommonStyles.progressContainer}>
					{screen === 1 ? (
						<>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.normalProgress}></View>
							<View style={CommonStyles.normalProgress}></View>
							<View style={CommonStyles.normalProgress}></View>
						</>
					) : screen === 2 ? (
						<>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.normalProgress}></View>
							<View style={CommonStyles.normalProgress}></View>
						</>
					) : screen === 3 ? (
						<>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.normalProgress}></View>
						</>
					) : screen === 4 ? (
						<>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
						</>
					) : null}
				</View>

				<View style={CommonStyles.textContainer}>
					<Text style={CommonStyles.title}>{title}</Text>
					<Text style={styles.subTitle}>{subTitle}</Text>
				</View>

				<View style={CommonStyles.btnContainer}>
					{screen === 4 ? (
						<TouchableOpacity style={CommonStyles.btnStyling} onPress={setLoggedIn}>
							<Text style={CommonStyles.btnText}>Let’s get started!</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={CommonStyles.btnStyling} onPress={handleNavigateScreen}>
							<Text style={CommonStyles.btnText}>Next</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{/* </LinearGradient> */}
		</ImageBackground>
	)
}
const styles = StyleSheet.create({
	subTitle: {
		//  fontSize: sizeConstants.sixteenX, //19
		fontSize: sizeConstants.fourteenScale, //19

		letterSpacing: 0.7,
		color: ColorConstants.faintWhite,
		marginTop: sizeConstants.thirty,
	},
})
export default IntroSlider
