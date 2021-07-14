import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import AppButton from "./AppButton"
import colors from "../../../colors"

import {Entypo} from "@expo/vector-icons"
import Constants from "expo-constants"

const ThirdMilestone = () => {
	const navigation = useNavigation()
	const FourthMileStone = () => {
		navigation.navigate("FourthMilestone")
	}
	const particularGoal = () => {
		navigation.navigate("particulargoal")
	}
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	const [date, setDate] = useState(new Date())
	const tip = () => <Text style={{fontWeight: "bold"}}>Tip:</Text>

	return (
		<ImageBackground
			style={[styles.introContainer, styles.image]}
			source={require("../../assets/images/second.png")}
			resizeMode="stretch"
		>
			<View style={{flexDirection: "row", marginTop: Constants.statusBarHeight}}>
				<Text style={styles.mainTitle}>Read 5 books</Text>
				<Entypo
					name="cross"
					color="#FDF9F2"
					size={38}
					style={{
						backgroundColor: "#588C8D",
						borderRadius: 20,
						position: "absolute",
						right: 0,
						marginRight: 10,
					}}
				/>
			</View>

			<Text style={{marginTop: 20, fontSize: 16, color: "#FDF9F2", marginLeft: 21}}>
				Enter Milestone
			</Text>
			<View style={styles.centerCont}>
				<TextInput style={styles.textInput} placeholder="Type Here" />
			</View>
			<Text style={styles.subTitle}>
				{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
			</Text>
			<View style={{display: "flex", alignItems: "center", marginTop: 20}}>
				<AppButton
					title="Edit Date"
					onPress={FourthMileStone}
					style={{backgroundColor: "white", color: "gray"}}
				/>
			</View>
			<Text style={styles.subTitle}>
				{tip()} adding a target date will help you stay on track. Dont't worry! You can always
				change it.
			</Text>

			<View
				style={{
					position: "absolute",
					bottom: 30,
					width: "100%",
					justifyContent: "center",
				}}
			>
				<View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 36}}>
					<View></View>
					<View>
						<TouchableOpacity
							style={[styles.btnStylingRight, styles.nextBtn]}
							onPress={() => navigation.navigate("FourthMilestone")}
						>
							<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
						</TouchableOpacity>
					</View>
				</View>

				<View style={{alignItems: "center"}}>
					<TouchableOpacity style={styles.btnStyling}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}
export default ThirdMilestone
const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},

	subTitle: {
		fontSize: 16,
		color: "#FDF9F2",
		marginLeft: 21,
		marginTop: 10,
		paddingLeft: 3,
		paddingRight: 2,
	},
	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: 21,
	},
	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "white",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	btnStylingRight: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
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
	textInput: {
		width: 314,
		height: 50,
		backgroundColor: "#FDF9F2",
		borderRadius: 50,
		marginTop: 3,
		paddingLeft: 20,
		fontSize: 19,
		color: "#666666",
		elevation: 10,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
})
