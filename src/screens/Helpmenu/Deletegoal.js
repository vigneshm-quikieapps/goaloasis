import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {deleteGoalFromFirestore} from "../../firebase"
import {connect} from "react-redux"
import {sizeConstants} from "../../core/constants"
import {setBooleanFlag, setShowLoader} from "./../../redux/actions"

const Deletegoal = (props) => {
	const navigation = useNavigation()

	const handleOpenNewGoal = () => {
		navigation.navigate("addgoal")
	}

	const gotoGoal = () => {
		navigation.navigate("particulargoal")
	}

	const deleteConfirm = () => {
		props.setShowLoader(true)
		deleteGoalFromFirestore(props.clickedGoal, () => {
			props.setShowLoader(false)
			navigation.navigate("mygoals")
			props.setBooleanFlag(!props.booleanFlag)
		})
	}
	return (
		<StatusBarScreen style={styles.container}>
			<View style={styles.titleContainer}></View>

			<View style={styles.goalsContainer}>
				<View style={{marginTop: 50, marginLeft: 20}}>
					{/* 24, 16 */}
					<Text
						style={{color: "#333333", fontSize: sizeConstants.twentyTwoScale, fontWeight: "bold"}}
					>
						Delete Goal
					</Text>

					<Text
						style={{
							color: "#333333",
							fontSize: sizeConstants.fourteenScale,
							lineHeight: 32,
							width: "80%",
						}}
					>
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
		loading: state.milestone.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBooleanFlag: (data) => {
			dispatch(setBooleanFlag(data))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
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
		borderBottomLeftRadius: sizeConstants.xxxl,
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#FBF5E9",
		borderTopRightRadius: sizeConstants.seventyScale,
		marginTop: sizeConstants.negativeFifty,
	},
	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: sizeConstants.eightyFive,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: "#7EC8C9",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	HelpBtn: {
		backgroundColor: "#76BBBC",
		height: sizeConstants.xxxl,
		width: "75%",
		borderRadius: sizeConstants.sixty,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		// marginVertical: 20,
	},
	btnText: {
		fontSize: sizeConstants.eighteenScale, //20
		color: "#666666",
		fontWeight: "bold",
	},
})
