import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import AppButton from "./AppButton"
import colors from "../../../colors"

import {Entypo} from "@expo/vector-icons"
import Constants from "expo-constants"
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "../../core/styles"
import StatusBarScreen from "./StatusBarScreen"
import {addNewMilestone, EditNewMilestone, setClickedGoal} from "./../../redux/actions"
import {addMilestoneToFirestore, getAllGoalsFromFirestore} from "./../../firebase"
import {connect} from "react-redux"
import {CommonHomeButton, CommonNextButton, CommonPrevNextButton} from "../../core/CommonComponents"

const ThirdMilestone = ({addNewMilestone, newMileStone, clickedGoal}) => {
	const navigation = useNavigation()
	const FourthMileStone = () => {
		navigation.navigate("FourthMilestone")
	}
	const particularGoal = () => {
		navigation.navigate("particulargoal")
	}
	// const goBack = () => {
	// 	navigation.goBack()
	// }
	// const [date, setDate] = useState(new Date())
	console.log("TESTTTTTTTTING", newMileStone)
	let temp = newMileStone[0].milestone
	const [milestone, setMilestone] = useState(temp)
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>

	return (
		<ImageBackground
			style={[styles.introContainer, styles.image]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<StatusBarScreen>
				<View style={CommonStyles.flexDirectionRow}>
					<Text style={CommonStyles.mainTitle}>{clickedGoal.name}</Text>
					<Entypo
						name="cross"
						color={ColorConstants.faintWhite}
						size={38}
						style={CommonStyles.cross}
						onPress={() => navigation.navigate("DParticularGoal")}
					/>
				</View>

				<View>
					<Text style={styles.milestoneText}>Enter Milestone</Text>
					<View style={styles.centerCont}>
						<TextInput
							style={styles.textInput}
							placeholder="Type here"
							onChangeText={(text) => setMilestone(text)}
							value={milestone}
						/>
					</View>
					<Text style={styles.subTitle}>
						{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
					</Text>
					<View style={[CommonStyles.mt20, CommonStyles.alignItemsCenter]}>
						<AppButton title="Edit Date" onPress={FourthMileStone} style={styles.editButton} />
					</View>
					<Text style={styles.subTitle}>
						{tip()} adding a target date will help you stay on track. Dont't worry! You can always
						change it.
					</Text>
				</View>

				{/* <View style={styles.nextBtnContainer}>
					<View style={styles.nextBtnInner}>
						<View></View>
						<View>
							<TouchableOpacity
								style={[styles.btnStylingRight, styles.nextBtn]}
								// onPress={FourthMileStone}

								onPress={() => navigation.navigate("milestones")}
							>
								<MaterialCommunityIcons
									name="chevron-right"
									size={sizeConstants.fifty}
									color="#7EC8C9"
								/>
							</TouchableOpacity>
							
						</View>
					</View>

					<View style={CommonStyles.alignItemsCenter}></View>
				</View> */}
			</StatusBarScreen>
			<CommonPrevNextButton
				right={true}
				nextClick={() => {
					navigation.navigate("firsttaskflow")
				}}
			/>
			<CommonHomeButton
				click={() => {
					navigation.navigate("mygoals")
				}}
				size={44}
			/>
		</ImageBackground>
	)
}
const mapStateToProps = (state) => {
	return {
		newMileStone: state.milestone.newMileStone,
		clickedGoal: state.milestone.clickedGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewMilestone: (milestone) => dispatch(addNewMilestone(milestone)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdMilestone)
const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: ColorConstants.darkFaintBlue,
	},

	subTitle: {
		fontSize: sizeConstants.sixteenX,
		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyOne,
		marginTop: sizeConstants.m,
		paddingLeft: sizeConstants.three,
		paddingRight: sizeConstants.xs,
	},
	mainTitle: {
		color: ColorConstants.faintWhite,
		fontSize: sizeConstants.xxl,
		marginLeft: sizeConstants.twentyOne,
	},
	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: sizeConstants.twentyX,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: ColorConstants.white,
		elevation: sizeConstants.s,
		justifyContent: "center",
		alignItems: "center",
	},
	btnStylingRight: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
	},
	nextBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		backgroundColor: ColorConstants.faintWhite,
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.three,
		paddingLeft: sizeConstants.twentyX,
		fontSize: sizeConstants.nineteenX,
		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.m,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	cross: {
		backgroundColor: ColorConstants.darkFaintBlue,
		borderRadius: sizeConstants.twentyX,
		position: "absolute",
		right: 0,
		marginRight: sizeConstants.m,
	},
	milestoneText: {
		marginTop: sizeConstants.twentyX,
		fontSize: sizeConstants.sixteenX,
		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyOne,
	},
	editButton: {
		backgroundColor: ColorConstants.white,
		color: ColorConstants.gray,
	},
	nextBtnContainer: {
		position: "absolute",
		bottom: sizeConstants.mThirty,
		width: "100%",
		justifyContent: "center",
		right: 0,
	},
	nextBtnInner: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: sizeConstants.thirtySix,
	},
})
