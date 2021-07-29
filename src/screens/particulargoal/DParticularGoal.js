import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import RBBottomSheet from "../MileStones/RBBottomSheet"
import {connect} from "react-redux"
import {ColorConstants, CommonStyles, sizeConstants} from "../../core/styles"
import {moderateScale, scale, verticalScale} from "react-native-size-matters"
import {CommonHomeButton} from "../../core/CommonComponents"

const DParticularGoals = ({clickedGoal}) => {
	const navigation = useNavigation()

	const goBack = () => {
		navigation.goBack()
	}
	return (
		<StatusBarScreen style={styles.container}>
			<View style={CommonStyles.titleContainer}>
				<RBBottomSheet name={clickedGoal.name} id={clickedGoal.name} />
				<Text style={styles.subTitle}>I want to continue improve myself and my state of mind.</Text>

				<View style={CommonStyles.trackingcont}>
					<ProgressCircle
						percent={5}
						radius={86}
						borderWidth={5}
						color="#588C8D"
						shadowColor="#999"
						bgColor="#FBF5E9"
					>
						<View style={CommonStyles.percentageCont}>
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
				<View style={CommonStyles.addMileStone}>
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

				{/* <View style={CommonStyles.bottomBtnContainer}>
					<TouchableOpacity style={CommonStyles.bottomBtn} onPress={goBack}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View> */}
			</View>
			<CommonHomeButton click={goBack} />
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
		backgroundColor: ColorConstants.faintWhite,
	},

	subTitle: {
		fontSize: sizeConstants.sixteen,
		color: "#333333",
		marginLeft: scale(20),
	},

	goalsText: {
		fontSize: sizeConstants.sixteen,
		color: "black",
	},
	goalsContainer: {
		flex: 0.8,
		backgroundColor: "#588C8D",
		borderTopRightRadius: sizeConstants.seventy,
	},
	viewTap: {
		height: sizeConstants.xxxl,
		width: sizeConstants.xxxl,
		backgroundColor: "white",
		marginVertical: sizeConstants.m,
		borderRadius: sizeConstants.xxxl,
		justifyContent: "center",
		alignItems: "center",
	},
	myGoalsText: {
		fontSize: sizeConstants.xxl,
		fontWeight: "bold",
		color: "black",
		marginHorizontal: verticalScale(20),
	},
	myGoalsubtext: {
		fontSize: 16,
		marginHorizontal: verticalScale(20),
		marginTop: sizeConstants.m,
		color: "#333333",
		lineHeight: sizeConstants.thirty,
	},
})
