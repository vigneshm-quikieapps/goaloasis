import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons, Entypo} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import RBBottomSheet from "../MileStones/RBBottomSheet"
import {connect} from "react-redux"
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "../../core/styles"
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
				<Text style={styles.subTitle}>{clickedGoal.description}</Text>

				<View style={CommonStyles.trackingcont}>
					<ProgressCircle
						percent={0}
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
						<View style={{marginHorizontal: 10, alignItems: "flex-start"}}>
							<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
								<View
									style={{
										height: 8,
										width: 8,
										borderRadius: 8,
										marginRight: 5,
										backgroundColor: "#588C8D",
									}}
								></View>
								<Text style={styles.goalsText}>Goal</Text>
							</View>

							<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
								<View
									style={{
										height: 8,
										width: 8,
										borderRadius: 8,
										marginRight: 5,
										backgroundColor: "#86C7C8",
									}}
								></View>
								<Text style={styles.goalsText}>Milestone</Text>
							</View>
						</View>
						<View>
							<Text style={styles.goalsText}>• 0%</Text>
							<Text style={styles.goalsText}>• 0/0</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.goalsContainer}>
				<View style={[styles.addMileStone]}>
					<Text style={styles.myGoalsText}>My Milestones</Text>
					<View style={styles.viewTap}>
						<Entypo
							name="plus"
							size={33}
							color="#66A3A4"
							onPress={() => {
								navigation.navigate("FirstMilestone")
							}}
							style={{fontWeight: "bold"}}
						/>
					</View>
				</View>

				<View>
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
		fontSize: 16,
		color: "#333333",
		marginLeft: scale(20),
	},

	goalsText: {
		fontSize: 16,
		color: "#333333",
	},
	goalsContainer: {
		flex: 0.8,
		backgroundColor: "#588C8D",
		borderTopRightRadius: sizeConstants.fourty,
	},
	viewTap: {
		height: sizeConstants.fourty,
		width: sizeConstants.fourty,
		backgroundColor: "white",
		marginVertical: sizeConstants.m,
		borderRadius: sizeConstants.xxxl,
		justifyContent: "center",
		alignItems: "center",
	},
	myGoalsText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#333333",
		marginHorizontal: verticalScale(20),
	},
	myGoalsubtext: {
		fontSize: 16,
		marginHorizontal: verticalScale(20),
		marginTop: sizeConstants.m,
		color: "#333333",
		lineHeight: sizeConstants.thirty,
	},
	addMileStone: {
		flexDirection: "row",
		marginRight: sizeConstants.xl,
		marginVertical: sizeConstants.s,
		alignItems: "center",
		justifyContent: "space-between",
	},
})
