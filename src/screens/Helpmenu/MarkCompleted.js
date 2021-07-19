import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"

const MarkCompleted = () => {
	const navigation = useNavigation()

	const handleOpenNewGoal = () => {
		navigation.navigate("addgoal")
	}

	const gotoGoal = () => {
		navigation.navigate("particulargoal")
	}
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}></View>

			<View style={styles.goalsContainer}>
				<View style={{marginTop: 50, marginLeft: 20}}>
					<Text style={{color: "#333333", fontSize: 24, fontWeight: "bold"}}>
						Mark Goal Complete
					</Text>
					<Text style={{color: "#333333", fontSize: 16, lineHeight: 32, width: "80%"}}>
						Goal will crossed out your timeline but not deleted
					</Text>
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity
						style={styles.HelpBtn}
						onPress={() => navigation.navigate("milestones")}
					>
						<Text style={styles.btnText}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default MarkCompleted

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		height: 170,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},

	goalsContainer: {
		flex: 1,
		backgroundColor: "#FBF5E9",
		borderTopRightRadius: 70,
		marginTop: -50,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 150,
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
		backgroundColor: "#76BBBC",
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
		color: "#666666",
		fontWeight: "bold",
	},
})
