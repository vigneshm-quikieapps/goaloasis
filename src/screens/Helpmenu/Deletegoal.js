import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {deleteGoalFromFirestore} from "../../firebase"
import {connect} from "react-redux"
import {sizeConstants} from "../../core/styles"
import {setBooleanFlag} from "./../../redux/actions"

const Deletegoal = ({clickedGoal}) => {
	const navigation = useNavigation()

	const handleOpenNewGoal = () => {
		navigation.navigate("addgoal")
	}

	const gotoGoal = () => {
		navigation.navigate("particulargoal")
	}

	const deleteConfirm = () => {
		deleteGoalFromFirestore(clickedGoal, () => {
			navigation.navigate("mygoals")
			props.setBooleanFlag(!props.booleanFlag)
		})
	}
	return (
		<StatusBarScreen style={styles.container}>
			<View style={styles.titleContainer}></View>

			<View style={styles.goalsContainer}>
				<View style={{marginTop: 50, marginLeft: 20}}>
					<Text style={{color: "#333333", fontSize: 24, fontWeight: "bold"}}>Delete Goal</Text>
					<Text style={{color: "#333333", fontSize: 16, lineHeight: 32, width: "80%"}}>
						Goal will be deleted and removed from your timeline
					</Text>
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.HelpBtn} onPress={deleteConfirm}>
						<Text style={styles.btnText}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</StatusBarScreen>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
		booleanFlag: state.milestone.booleanFlag,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBooleanFlag: (data) => {
			dispatch(setBooleanFlag(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Deletegoal)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
	titleContainer: {
		height: 180,
		backgroundColor: "#588C8D",
		justifyContent: "center",
		borderBottomLeftRadius: 70,
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
		bottom: sizeConstants.eightyFive,
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
		height: sizeConstants.xxxl,
		width: "75%",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		// marginVertical: 20,
	},
	btnText: {
		fontSize: 20,
		color: "#666666",
		fontWeight: "bold",
	},
})
