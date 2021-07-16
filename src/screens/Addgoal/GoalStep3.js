import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import DatePicker from "react-native-date-picker"
import colors from "../../../colors"
import AsyncStorage from "@react-native-community/async-storage"

const GoalStep3 = ({route}) => {
	const navigation = useNavigation()

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	const goBack = () => {
		navigation.goBack()
	}
	const [date, setDate] = useState(new Date())
	const {name} = route.params
	const {description} = route.params

	// let asyncData = []
	// asyncData.push(name)
	// asyncData.push(description)
	// asyncData.push(date.toISOString())

	// async Task
	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem(name, name)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				{/* <View style={styles.headerMargin}></View> */}
				<View style={{flex: 1}}>
					<View style={styles.progressContainer}>
						<View style={styles.progress}></View>
						<View style={styles.progress}></View>
						<View style={styles.progress}></View>
					</View>

					<View style={styles.textContainer}>
						<Text style={styles.title}>Your target date</Text>
						<Text style={styles.subTitle}>
							When your goal is time-bound, it become measurable. Don’t stress over it if you are
							unsure about the exact date. You can always adjust later.
						</Text>
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

					<View
						style={{
							position: "absolute",
							bottom: 45,
							width: "100%",
							justifyContent: "center",
						}}
					>
						<View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 12}}>
							<View>
								<TouchableOpacity style={[styles.btnStylingLeft, styles.nextBtn]} onPress={goBack}>
									<MaterialCommunityIcons name="chevron-left" size={50} color="#FDF9F2" />
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={[styles.btnStylingRight, styles.nextBtn]}
									onPress={() => {
										storeData()
										navigation.navigate("mygoals")
									}}
								>
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

export default GoalStep3

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerMargin: {
		marginTop: 60,
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
		backgroundColor: "#FDF9F2",
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
		color: "#FDF9F2",
	},
	subTitle: {
		fontSize: 19,
		letterSpacing: 0.7,
		color: "#FDF9F2",
		marginTop: 30,
		marginRight: 8,
	},
	btnContainer: {
		position: "absolute",
		bottom: 20,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	nextBtnContainer: {
		justifyContent: "space-around",
		flexDirection: "row",
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
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
