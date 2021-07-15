import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import DatePicker from "react-native-date-picker"

const EditGoalhelp = () => {
	const navigation = useNavigation()

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	const goBack = () => {
		navigation.goBack()
	}
	const [date, setDate] = useState(new Date())

	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				<View style={styles.headerMargin}></View>
				<View style={{flex: 1}}>
					<View style={styles.textContainer}>
						<Text style={styles.title}>Edit name of goal</Text>
						<View style={styles.centerCont}>
							<TextInput style={styles.textInput} placeholder="Type Here" />
						</View>
						<Text style={[styles.title, {marginTop: 50, marginLeft: 20}]}>Edit target date</Text>
						<View style={[styles.centerCont, {height: 250}]}>
							<DatePicker
								androidVariant="iosClone"
								date={date}
								onDateChange={setDate}
								mode="date"
								textColor="#ffffff"
								locale="en"
								fadeToColor="none"
								dividerHeight={0}
							/>
						</View>
					</View>

					<View style={[styles.btnContainer, styles.nextBtnContainer]}>
						<View></View>
						<View>
							<TouchableOpacity
								style={[styles.btnStyling, styles.nextBtn]}
								onPress={() => navigation.navigate("mygoals")}
							>
								<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
}

export default EditGoalhelp

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerMargin: {
		marginTop: 40,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 26,
	},
	SkipText: {
		color: "#FDF9F2",
		fontSize: 19,
		textAlign: "left",
	},

	textContainer: {
		marginTop: 30,
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
		bottom: 70,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	nextBtnContainer: {
		bottom: 45,
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