import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import RBBottomSheet from "../MileStones/RBBottomSheet"
import {connect} from "react-redux"

const DParticularGoals = ({clickedGoal}) => {
	const navigation = useNavigation()

	const goBack = () => {
		navigation.goBack()
	}
	return (
		<StatusBarScreen style={styles.container}>
			<View style={styles.titleContainer}>
				<RBBottomSheet name={clickedGoal.name} />
				<Text style={styles.subTitle}>I want to continue improve myself and my state of mind.</Text>

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
							<Text style={{fontSize: 16, color: "#333333"}}>Target Date</Text>
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

			<View style={styles.goalsContainer}>
				<View style={styles.addMileStone}>
					<View style={styles.viewTap}>
						<MaterialCommunityIcons
							name="plus"
							size={40}
							color="#7EC8C9"
							onPress={() => {
								navigation.navigate("FirstMilestone")
							}}
						/>
					</View>
				</View>

				<View>
					<Text style={styles.myGoalsText}>My Milestones</Text>
					<Text style={styles.myGoalsubtext}>
						It looks like you don’t have a plan to achieve your goal yet. Don’t worry! Tap (+) to
						add a milestone and get on your way.
					</Text>
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn} onPress={goBack}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View>
			</View>
		</StatusBarScreen>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DParticularGoals)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FDF9F2",
	},

	titleContainer: {
		flex: 0.5,
		justifyContent: "center",
	},
	mainTitle: {
		color: "#333333",
		fontSize: 25,
		marginLeft: 20,
		fontWeight: "bold",
	},
	threeDots: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		margin: 10,
		backgroundColor: "#F4EFE7",
		height: 35,
		width: 42,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	subTitle: {
		fontSize: 16,
		color: "#333333",
		marginLeft: 20,
	},
	addMileStone: {
		marginLeft: "auto",
		marginRight: 50,
		marginTop: 20,
	},
	trackingcont: {
		marginTop: 18,
		marginVertical: 10,
		marginHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
		color: "black",
	},
	goalsContainer: {
		flex: 0.75,
		backgroundColor: "#588C8D",
		borderTopRightRadius: 70,
	},
	viewTap: {
		height: 50,
		width: 50,
		backgroundColor: "white",
		marginVertical: 10,
		borderRadius: 50 / 2,
		justifyContent: "center",
		alignItems: "center",
	},
	myGoalsText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "black",
		marginHorizontal: 20,
	},
	myGoalsubtext: {
		fontSize: 16,
		marginHorizontal: 20,
		marginTop: 10,
		color: "#333333",
		lineHeight: 30,
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
		backgroundColor: "white",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
})
