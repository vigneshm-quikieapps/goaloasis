import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import {setBooleanFlag, setCurrentGoal, setShowLoader} from "./../../redux/actions"
import {connect} from "react-redux"
import {updateGoalToFirestore} from "./../../firebase/index"
import {sizeConstants} from "../../core/constants"

const MarkCompleted = (props) => {
	const navigation = useNavigation()

	const handleOpenNewGoal = () => {
		navigation.navigate("addgoal")
	}

	let currentGoalObj = {
		...props.clickedGoal,
	}

	const gotoHome = () => {
		let updatedObj = {
			...currentGoalObj,
			isCompleted: true,
		}
		props.setShowLoader(true)
		updateGoalToFirestore(updatedObj, null, () => {
			console.log("TESTINNNNGNNGGG")
			props.setShowLoader(false)
			props.setBooleanFlag(!props.booleanFlag)
			navigation.navigate("mygoals")
		})
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}></View>

			<View style={styles.goalsContainer}>
				<View style={{marginTop: 50, marginLeft: 20}}>
					{/* 24, 16 */}
					<Text
						style={{color: "#333333", fontSize: sizeConstants.twentyTwoScale, fontWeight: "bold"}}
					>
						Mark Goal Complete
					</Text>

					<Text
						style={{
							color: "#333333",
							fontSize: sizeConstants.fourteenScale,
							lineHeight: 32,
							width: "80%",
						}}
					>
						Goal will crossed out your timeline but not deleted
					</Text>
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.HelpBtn} onPress={gotoHome}>
						<Text style={styles.btnText}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		currentGoal: state.milestone.currentGoal,
		clickedGoal: state.milestone.clickedGoal,
		booleanFlag: state.milestone.booleanFlag,
		loading: state.milestone.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentGoal: (data) => {
			dispatch(setCurrentGoal(data))
		},
		setBooleanFlag: (data) => {
			dispatch(setBooleanFlag(data))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkCompleted)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		height: sizeConstants.oneEightyScale,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},

	goalsContainer: {
		flex: 1,
		backgroundColor: "#FBF5E9",
		borderTopRightRadius: sizeConstants.seventy,
		marginTop: sizeConstants.negativeFifty,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: sizeConstants.oneFifty,
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
		height: sizeConstants.seventyFive,
		width: "75%",
		borderRadius: sizeConstants.sixty,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10,
		marginVertical: sizeConstants.xl,
	},
	btnText: {
		fontSize: sizeConstants.eighteenScale, //20
		color: "#666666",
		fontWeight: "bold",
	},
})
