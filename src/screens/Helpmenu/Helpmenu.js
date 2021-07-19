import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"

const Helpmenu = () => {
	const navigation = useNavigation()

	const handleOpenNewGoal = () => {
		navigation.navigate("addgoal")
	}

	const gotoGoal = () => {
		navigation.navigate("particulargoal")
	}
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.mainTitle}>Help Menu</Text>
			</View>

			<View style={styles.goalsContainer}>
				{/* <View style={{justifyContent: "center", alignItems: "center"}}> */}
				{/* <View style={styles.viewTap}></View> */}
				{/* </View> */}

				<View style={{flex: 1, justifyContent: "center"}}>
					<Text
						style={{
							fontSize: 30,
							color: "white",
							fontWeight: "bold",
							marginLeft: 20,
						}}
					>
						Help Menu
					</Text>

					<View style={{alignItems: "center"}}>
						<TouchableOpacity style={styles.HelpBtn}>
							<Text style={styles.btnText}>Goal Screen</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.HelpBtn}>
							<Text style={styles.btnText}>Today’s Task</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.HelpBtn}
							onPress={() => navigation.navigate("timeline")}
						>
							<Text style={styles.btnText}>Timeline</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.bottomBtnContainer}>
						<TouchableOpacity
							style={styles.bottomBtn}
							onPress={() => navigation.navigate("mygoals")}
						>
							<MaterialCommunityIcons name="home" size={34} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	)
}

export default Helpmenu

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		height: 90,
		backgroundColor: "#FBF5E9",
		justifyContent: "center",
	},
	mainTitle: {
		color: "black",
		fontSize: 24,
		marginLeft: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
		borderTopRightRadius: 70,
	},
	viewTap: {
		height: 6,
		width: 60,
		backgroundColor: "#7EC8C9",
		marginVertical: 10,
		borderRadius: 30,
		opacity: 0.5,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 40,
		justifyContent: "center",
		alignItems: "center",
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

	HelpBtn: {
		backgroundColor: "#FDF9F2",
		height: 70,
		width: "75%",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		marginVertical: 20,
	},
	btnText: {
		fontSize: 20,
		color: "black",
		fontWeight: "bold",
	},
})
