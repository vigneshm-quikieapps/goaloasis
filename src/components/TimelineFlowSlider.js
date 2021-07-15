import React, {useContext} from "react"
import {StyleSheet, Text, TouchableOpacity, View, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {setisFirstTimeTimelineFlow} from "../utils/asyncStorage"
import authContext from "../context/auth/authContext"
import StatusBarScreen from "../screens/MileStones/StatusBarScreen"
import {MaterialCommunityIcons, Fontisto, SimpleLineIcons} from "@expo/vector-icons"
import Constants from "expo-constants"
import {connect} from "react-redux"
import {setFirstTimeForTimeLine} from "../redux/actions"

const TimelineFlowSlider = ({data, setFirstTimeForTimeLine}) => {
	const navigation = useNavigation()
	const {
		title,
		subTitle1,
		subTitle2,
		first,
		second,
		third,
		month,
		day,
		year,
		task,
		milestone,
		goal,
		screen,
	} = data

	const handleNavigateScreen = async () => {
		console.log("screen", screen)
		if (screen === 1) {
			navigation.navigate("timelineFlow2")
		} else if (screen === 2) {
			navigation.navigate("timelineFlow3")
		}
	}
	let backImg
	switch (screen) {
		case 1:
			backImg = require("../assets/images/secondTimeLine.png")
			break

		case 2:
			backImg = require("../assets/images/thirdTimeLine.png")
			break

		case 3:
			backImg = require("../assets/images/firstTimeLine.png")
			break
	}
	const setLoggedIn = async () => {
		await setisFirstTimeTimelineFlow()
		console.log("CAME HEREEEEE 1")

		setFirstTimeForTimeLine("visited")
		console.log("CAME HEREEEEE 2")
		gotoTimeLine()
	}
	const gotoTimeLine = () => {
		navigation.navigate("timeline")
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
				{screen != 3 ? (
					<View>
						<TouchableOpacity onPress={6}>
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
					<Text style={styles.subTitle}>{subTitle1}</Text>
					<Text style={styles.subTitle}> {subTitle2}</Text>
				</View>
				<View style={{marginTop: screen == 2 ? 0 : 20}}>
					<SimpleLineIcons name="arrow-up" size={20} color="white" style={{alignSelf: "center"}} />
					<View
						style={{
							height: 200,
							width: 2,
							backgroundColor: "white",
							borderRadius: 5,
							alignSelf: "center",
							flexDirection: "row",
						}}
					>
						<View
							style={{
								height: 2,
								width: 60,
								backgroundColor: "white",
								borderRadius: 5,
								alignSelf: "center",
							}}
						/>
						<View
							style={{
								height: 50,
								width: 120,
								backgroundColor: "rgb(207, 202, 188)",
								alignSelf: "center",
								borderRadius: 10,
								justifyContent: "center",
							}}
						>
							<Text style={{color: "white", alignSelf: "center", fontSize: 20}}>Milestone</Text>
						</View>
					</View>
					<SimpleLineIcons
						name="arrow-down"
						size={20}
						color="white"
						style={{alignSelf: "center"}}
					/>
				</View>

				<View
					style={{
						width: "100%",
						position: "absolute",
						bottom: 143,
						justifyContent: "flex-start",
						alignItems: "flex-start",
						marginLeft: 29,
					}}
				>
					<TouchableOpacity
						style={{
							height: 50,
							width: 50,
							marginBottom: 10,
							borderRadius: 25,
							backgroundColor: "white",
							justifyContent: "center",
						}}
					>
						<MaterialCommunityIcons
							name="plus"
							size={40}
							color="#E6AB76"
							style={{
								alignSelf: "center",
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							height: 50,
							width: 50,
							borderRadius: 25,
							backgroundColor: "white",
						}}
					>
						<MaterialCommunityIcons
							name="minus"
							size={40}
							style={{
								alignSelf: "center",
							}}
							color="#E6AB76"
						/>
					</TouchableOpacity>
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
		setFirstTimeForTimeLine: (data) => {
			dispatch(setFirstTimeForTimeLine(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TimelineFlowSlider)

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
		marginTop: 20,
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
		marginHorizontal: 21,
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
		marginTop: 15,
	},
	btnContainer: {
		position: "absolute",
		bottom: 60,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	btnContainer2: {
		marginTop: 50,
		width: "100%",
		justifyContent: "flex-start",
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
