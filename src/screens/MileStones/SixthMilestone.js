import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import colors from "../../../colors"
import {Entypo} from "@expo/vector-icons"

import Constants from "expo-constants"

const SixthMilestone = () => {
	const navigation = useNavigation()

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
						backgroundColor: "#538586",
						borderRadius: 20,
						position: "absolute",
						right: 0,
						marginRight: 10,
					}}
				/>
			</View>
			<Text style={{fontSize: 16, color: "#FDF9F2", marginLeft: 21, marginTop: 20}}>
				Enter Milestone
			</Text>
			<View style={styles.centerCont}>
				<TextInput style={styles.textInput} placeholder="Type Here" />
			</View>
			<Text style={styles.subTitle}>
				{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
			</Text>
			<TouchableOpacity
				style={{
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#588C8D",
					borderColor: "#FDF9F2",
					borderEndWidth: 3,
					borderStartWidth: 3,
					borderTopWidth: 3,
					borderBottomWidth: 3,
					width: "70%",
					padding: 8,
					borderRadius: 25,
					flexDirection: "column",
					marginVertical: 5,
					marginTop: 35,
					alignSelf: "center",
				}}
				onPress={() => navigation.navigate("SixthMilestone")}
			>
				<Text style={{color: "#FDF9F2", fontSize: 21}}>Edit Date</Text>
			</TouchableOpacity>
			<Text style={styles.subTitle}>
				{tip()} adding a target date will help you stay on track.Dont't worry!
			</Text>
			<Text style={styles.subTitle}> You can always change it.</Text>

			<View
				style={{
					position: "absolute",
					bottom: 30,
					width: "100%",
					justifyContent: "center",
				}}
			>
				<View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 12}}>
					<View>
						<TouchableOpacity style={[styles.btnStylingLeft, styles.nextBtn]}>
							<MaterialCommunityIcons
								name="chevron-left"
								size={50}
								color="#FDF9F2"
								onPress={() => navigation.navigate("addgoal")}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={[styles.btnStylingRight, styles.nextBtn]}>
							<MaterialCommunityIcons
								name="chevron-right"
								size={50}
								color="#7EC8C9"
								onPress={() => navigation.navigate("IndividualGoal")}
							/>
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
export default SixthMilestone
const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},

	subTitle: {
		fontSize: 16,
		color: "#FDF9F2",
		marginLeft: 21,
		marginRight: 10,
		marginTop: 5,
	},

	btnStyling: {
		backgroundColor: "#FDF9F2",
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
		right: 0,
		marginTop: 150,
		marginLeft: 70,
		marginRight: 70,
	},
	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: 21,
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
	btnContainer: {
		position: "absolute",
		bottom: 20,
		width: "100%",
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
	btnStylingLeft: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.buttonBackGround,
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
	},
})
