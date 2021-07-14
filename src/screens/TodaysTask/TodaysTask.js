import React, {useEffect} from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	TouchableWithoutFeedback,
	StatusBar,
	ImageBackground,
	ScrollView,
} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {FontAwesome5, Entypo, AntDesign} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import Constants from "expo-constants"

const TodaysTask = () => {
	const navigation = useNavigation()
	const backImg = require("./../../assets/images/third.png")

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}

	return (
		<StatusBarScreen style={styles.container}>
			<ImageBackground style={styles.container} source={backImg} resizeMode="stretch">
				<TouchableOpacity style={styles.titleContainer}>
					<Text style={styles.mainTitle}>Today’s tasks</Text>
				</TouchableOpacity>
				<ScrollView>
					<View style={styles.btnContainer}>
						<TouchableOpacity style={styles.btnStyling}>
							<Text style={styles.btnText}>Read 1 chapter</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
				<View style={styles.queIcon}>
					<AntDesign name="questioncircleo" size={50} color={"#fff"} />
				</View>

				<View style={styles.bottomContainer}>
					<TouchableOpacity onPress={gotoHome}>
						<View
							style={[
								styles.circleLogo,
								{
									transform: [{translateY: -38}],
								},
							]}
						>
							<Entypo name="home" size={40} color="#7ec8c9" />
						</View>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</StatusBarScreen>
	)
}
export default TodaysTask

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
	btnContainer: {
		marginLeft: 20,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "white",
		width: 314,
		height: 50,
		paddingLeft: 20,
		borderRadius: 51,
	},
	btnText: {
		fontSize: 19,
		color: "#666666",
		letterSpacing: 1.2,
	},
	titleContainer: {
		height: 95 - Constants.statusBarHeight,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},
	mainTitle: {
		color: "#FBF5E9",
		fontSize: 25,
		fontWeight: "bold",
		marginLeft: 20,
		marginVertical: 30,
	},

	circleLogo: {
		height: 70,
		width: 70,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: "#7ec8c9",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},

	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#7EC8C9",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	bottomContainer: {
		height: 90,
		backgroundColor: "#fff",
		borderTopEndRadius: 60,

		alignItems: "center",
	},
	queIcon: {
		padding: 30,
		alignItems: "flex-end",
	},
})
