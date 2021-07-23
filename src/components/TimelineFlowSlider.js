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
import {CommonStyles, sizeConstants} from "./../core/styles"

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
			style={[CommonStyles.mainContainer, CommonStyles.image]}
			source={backImg}
			resizeMode="stretch"
		>
			{/* <LinearGradient colors={[color1, color2]} style={{flex: 1}}> */}
			<View style={CommonStyles.headerMargin}>
				<View></View>
				{screen != 3 ? (
					<View>
						<TouchableOpacity onPress={setLoggedIn}>
							<Text style={CommonStyles.SkipText}>Skip</Text>
						</TouchableOpacity>
					</View>
				) : null}
			</View>
			<View style={{flex: 1}}>
				<View style={[CommonStyles.progressContainer, {marginTop: sizeConstants.xl}]}>
					{screen === 1 ? (
						<>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.normalProgress}></View>
							<View style={CommonStyles.normalProgress}></View>
						</>
					) : screen === 2 ? (
						<>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.normalProgress}></View>
						</>
					) : screen === 3 ? (
						<>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
							<View style={CommonStyles.progress}></View>
						</>
					) : null}
				</View>

				<View style={CommonStyles.textContainer}>
					<Text style={CommonStyles.title}>{title}</Text>
					<Text style={[CommonStyles.subTitle, {marginTop: sizeConstants.m}]}>{subTitle1}</Text>
					<Text style={[CommonStyles.subTitle, {marginTop: sizeConstants.m}]}> {subTitle2}</Text>
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

				<View style={[CommonStyles.btnContainer, {bottom: sizeConstants.sixty}]}>
					{screen === 3 ? (
						<TouchableOpacity style={CommonStyles.btnStyling} onPress={setLoggedIn}>
							<Text style={CommonStyles.btnText}>Got it!!</Text>
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
