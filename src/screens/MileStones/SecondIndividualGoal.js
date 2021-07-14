import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"

import First from "../../modalSlides/first"
import Second from "../../modalSlides/second"
import Third from "../../modalSlides/third"
import StatusBarScreen from "./StatusBarScreen"
import {LinearGradient} from "expo-linear-gradient"
import RBBottomSheet from "./RBBottomSheet"

const IndividualGoal = (props) => {
	const navigation = useNavigation()

	const goBack = () => {
		navigation.goBack()
	}
	const [modalVisible, setModalVisible] = useState(true)
	return (
		<StatusBarScreen style={styles.introContainer}>
			<View style={styles.titleContainer}>
				{/* <Text style={styles.mainTitle}>Read 5 books</Text> */}
				<RBBottomSheet />
				<Text style={styles.subTitle}>I want to improve myself and my state of mind.</Text>

				<View style={styles.trackingcont}>
					<ProgressCircle
						percent={5}
						radius={86}
						borderWidth={5}
						color="#588C8D"
						shadowColor="#999"
						bgColor="#FBF5E9"
					>
						<View style={styles.percentageCont}>
							<Text>Target Date</Text>
							<Text style={{fontWeight: "bold"}}>01/01/21</Text>
						</View>
					</ProgressCircle>

					<View style={{flexDirection: "row"}}>
						<View style={{marginHorizontal: 10}}>
							<Text style={styles.goalsText}>
								<View
									style={{height: 8, width: 8, borderRadius: 8 / 2, backgroundColor: "#588C8D"}}
								></View>{" "}
								Goal
							</Text>
							<Text style={styles.goalsText}>
								<View
									style={{height: 8, width: 8, borderRadius: 8 / 2, backgroundColor: "#86C7C8"}}
								></View>{" "}
								Milestone
							</Text>
						</View>
						<View>
							<Text style={styles.goalsText}>• 0%</Text>
							<Text style={styles.goalsText}>• 0/0</Text>
						</View>
					</View>
				</View>
			</View>

			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={styles.goalsContainer}>
				<View style={styles.addMileStone}>
					<View style={styles.viewTap}>
						<MaterialCommunityIcons
							name="plus"
							size={40}
							color="#7EC8C9"
							onPress={() => {
								// navigation.navigate("FifthMilestone")
								navigation.navigate("DParticularGoals")
							}}
						/>
					</View>
					<Text style={{right: 150, position: "absolute", fontSize: 30, fontWeight: "bold"}}>
						My Milestones
					</Text>
				</View>

				<View
					style={{
						height: "30%",
						width: "80%",
						borderRadius: 22,
						backgroundColor: "#7EC8C9",
						alignSelf: "center",
						marginTop: 15,
						flexDirection: "row",
						borderLeftColor: "#FDF9F2",
						borderLeftWidth: 90,
					}}
				>
					<View style={{justifyContent: "center", alignContent: "center", right: 87}}>
						<TouchableOpacity onPress={() => navigation.navigate("AfterModal")}>
							<MaterialCommunityIcons name="plus" color="#77777B" size={90} />
						</TouchableOpacity>
					</View>

					<Text
						style={{
							top: "37%",
							color: "#333333",
							fontSize: 20,
							right: 20,
							position: "absolute",
							fontWeight: "bold",
						}}
					>
						Read 1 Book Task:0/1
					</Text>
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn} onPress={goBack}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</StatusBarScreen>
	)
}

export default IndividualGoal

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		flex: 0.48,
		justifyContent: "center",
		backgroundColor: "#FBF5E9",
	},
	mainTitle: {
		color: "#333333",
		fontSize: 25,
		marginLeft: 21,
	},
	subTitle: {
		fontSize: 16,
		color: "#333333",
		marginLeft: 21,
	},
	addMileStone: {
		marginLeft: "auto",
		marginRight: 50,
		marginTop: 20,
		flexDirection: "row",
	},
	trackingcont: {
		marginHorizontal: 20,
		marginVertical: 20,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 15,
	},

	percentageCont: {
		height: 150,
		width: 150,
		borderRadius: 150 / 2,
		backgroundColor: "#FBF5E9",
		borderWidth: 5,
		borderColor: "#C0E5E4",
		justifyContent: "center",
		alignItems: "center",
	},
	goalsText: {
		fontSize: 16,
	},
	goalsContainer: {
		flex: 0.65,
		backgroundColor: "#588C8D",

		borderTopRightRadius: 70,
		// marginTop: -50,
	},
	viewTap: {
		height: 50,
		width: 50,
		backgroundColor: "#FDF9F2",
		marginVertical: 10,
		borderRadius: 50 / 2,
		justifyContent: "center",
		alignItems: "center",
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#FDF9F2",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
})
