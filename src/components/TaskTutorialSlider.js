import React, {useContext, useState} from "react"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ImageBackground,
	TouchableHighlight,
} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {setisFirstTimeTaskTutorial} from "../utils/asyncStorage"
import authContext from "../context/auth/authContext"
import StatusBarScreen from "../screens/MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {connect} from "react-redux"
import {setFirstTime} from "../redux/actions"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"
import Swipeout from "rc-swipeout"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {SnoozeIcon} from "../assets/customIcons"
import {AntDesign} from "@expo/vector-icons"
import {ColorConstants, sizeConstants} from "../core/constants"

const TaskTutorialSlider = ({data, setFirstTime, loading, helpMenu = false}) => {
	const [taskCompleted, setCompleted] = useState(false)
	const [taskSnoozed, setSnoozed] = useState(false)
	const navigation = useNavigation()
	const {title, subTitle, color1, color2, screen, img} = data

	const onLongPress = (event) => {
		if (event.nativeEvent.state === State.ACTIVE) {
			setCompleted(!taskCompleted)
		}
	}

	const handleNavigateScreen = async () => {
		console.log("screen", screen)
		if (screen === 1) {
			navigation.navigate("taskTutorialSlide2")
		} else if (screen === 2) {
			navigation.navigate("taskTutorialSlide3")
		}
	}
	// const completeTask = () => {
	// 	setCompleted(!taskCompleted)
	// }
	console.log("HELPMENU from taskbap", helpMenu)
	const [helpMenuState, setHelpMenuState] = useState(helpMenu)
	const setLoggedIn = async () => {
		if (helpMenuState) {
			setHelpMenuState(!helpMenuState)
			gotoTodaysTask()
		} else {
			await setisFirstTimeTaskTutorial()
			setFirstTime("visited")
			gotoTodaysTask()
		}
	}

	const gotoTodaysTask = () => {
		navigation.navigate("todaysTask")
	}

	let backImg = require("../assets/images/third.png")

	return (
		<ImageBackground
			style={[styles.introContainer, styles.image]}
			source={backImg}
			resizeMode="stretch"
		>
			{/* <LinearGradient colors={[color1, color2]} style={{flex: 1}}> */}
			<View style={styles.headerMargin}>
				<View></View>
				{screen != 3 ? (
					<View>
						<TouchableOpacity onPress={setLoggedIn}>
							<Text style={styles.SkipText}>Skip</Text>
						</TouchableOpacity>
					</View>
				) : null}
			</View>
			<View style={{flex: 1}}>
				<View style={styles.progressContainer}>
					{screen === 1 ? (
						<>
							<View style={styles.progress}></View>
							<View style={styles.normalProgress}></View>
							<View style={styles.normalProgress}></View>
						</>
					) : screen === 2 ? (
						<>
							<View style={styles.progress}></View>
							<View style={styles.progress}></View>
							<View style={styles.normalProgress}></View>
						</>
					) : screen === 3 ? (
						<>
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
				<View style={styles.btnContainer2}>
					{screen === 1 ? (
						<LongPressGestureHandler onHandlerStateChange={onLongPress} minDurationMs={800}>
							<View>
								<TouchableOpacity style={styles.centerBtn}>
									<Text
										style={[
											taskCompleted ? styles.btnTextCompleted : styles.btnText,
											{fontSize: sizeConstants.sixteenX},
										]}
									>
										{taskCompleted ? "Completed Task" : "Long Press"}
									</Text>
								</TouchableOpacity>
							</View>
						</LongPressGestureHandler>
					) : screen === 2 ? (
						<View style={styles.swipeButton}>
							{taskSnoozed ? (
								<View style={styles.centerBtn}>
									<Text style={styles.btnText}>Snoozed Task</Text>
								</View>
							) : (
								<Swipeout
									left={[
										{
											text: <SnoozeIcon size={15} color={"#fff"} />,
											// text: "Zz",
											onPress: () => {
												setSnoozed
											},
											style: {backgroundColor: "#7b9a95"},
										},
									]}
									autoClose={true}
									disabled={false}
								>
									<View style={styles.swipeBtnStyling}>
										<Text style={[styles.btnText, {fontSize: sizeConstants.sixteenX}]}>
											Swipe right
										</Text>
									</View>
								</Swipeout>
							)}
						</View>
					) : (
						// <TouchableOpacity style={styles.centerBtn}>
						// 	<Text style={styles.btnText}>Swipe Right</Text>
						// </TouchableOpacity>

						<View style={styles.swipeButton}>
							<Swipeout
								right={[
									{
										text: <AntDesign name="delete" size={24} color="black" />,
										// text: "Zz",
										onPress: () => {},
										style: {backgroundColor: "#7b9a95"},
									},
								]}
								autoClose={() => true}
								disabled={false}
							>
								<View style={styles.swipeBtnStyling}>
									<Text style={styles.btnText}>Swipe left</Text>
								</View>
							</Swipeout>
						</View>
						// <TouchableOpacity style={styles.centerBtn}>
						// 	<Text style={styles.btnText}>Swipe Left</Text>
						// </TouchableOpacity>
					)}
				</View>
				<View style={styles.btnContainer}>
					{screen === 3 ? (
						<TouchableOpacity style={styles.btnStyling} onPress={setLoggedIn}>
							<Text style={styles.btnText}>Got it!</Text>
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

const mapStateToProps = (state) => {
	return {
		firstTime: state.milestone.firstTime,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFirstTime: (data) => {
			dispatch(setFirstTime(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskTutorialSlider)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
	headerMargin: {
		marginTop: 97 - Constants.statusBarHeight,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: sizeConstants.twentySixScale,
	},
	SkipText: {
		color: "#FDF9F2",
		fontSize: sizeConstants.fourteenScale, //19

		textAlign: "left",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	progressContainer: {
		marginTop: sizeConstants.seventy,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	progress: {
		height: sizeConstants.s,
		width: sizeConstants.sixtyScale,
		backgroundColor: "white",
		borderRadius: sizeConstants.mX,
		marginHorizontal: sizeConstants.xsX,
	},
	normalProgress: {
		height: sizeConstants.s,
		width: sizeConstants.sixtyScale,
		backgroundColor: "rgba(255, 255, 255, 0.274)",
		borderRadius: sizeConstants.m,
		marginHorizontal: sizeConstants.xs,
	},
	textContainer: {
		marginTop: sizeConstants.xxxl,
		marginHorizontal: sizeConstants.twentyX,
	},
	title: {
		fontSize: sizeConstants.twentyTwoScale, //25

		textAlign: "left",
		fontWeight: "bold",
		color: "white",
	},
	subTitle: {
		fontSize: sizeConstants.fourteenScale, //19
		letterSpacing: 0.7,
		color: ColorConstants.faintWhite,
		marginTop: sizeConstants.thirty,
	},
	btnContainer: {
		position: "absolute",
		bottom: sizeConstants.hundred,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	btnContainer2: {
		marginTop: sizeConstants.xxxl,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.xxxl,
		borderRadius: sizeConstants.xxxl,
	},
	swipeBtnStyling: {
		justifyContent: "center",
		paddingHorizontal: sizeConstants.twentyX,
		backgroundColor: "white",
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.xxxl,
	},
	centerBtn: {
		justifyContent: "center",
		alignItems: "flex-start",
		paddingHorizontal: sizeConstants.twentyX,
		backgroundColor: "white",
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.xxxl,
		borderRadius: sizeConstants.xxxl,
	},
	btnText: {
		fontSize: sizeConstants.sixteenX, //19
		color: "#666666",
		letterSpacing: 1.2,
	},
	btnTextCompleted: {
		fontSize: sizeConstants.fourteenScale, //19

		color: "#666666",
		letterSpacing: 1.2,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
	},
	swipeButton: {
		alignContent: "center",
		borderRadius: sizeConstants.xxxl,
		backgroundColor: "#fff",
		overflow: "hidden",
		marginLeft: sizeConstants.twentyOneScale,
		marginRight: sizeConstants.twentyOneScale,
		justifyContent: "center",
		marginTop: sizeConstants.xxxl,
		// shadowColor: "#00000029",
	},
})
