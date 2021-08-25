import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import colors from "../../../colors"
import {Entypo} from "@expo/vector-icons"

import Constants from "expo-constants"
import {ColorConstants, commonImages, CommonStyles, sizeConstants} from "../../core/constants"
import {
	CommonHomeButton,
	CommonNextButton,
	CommonPrevButton,
	CommonPrevNextButton,
} from "../../components/CommonComponents"
import {connect} from "react-redux"
import {verticalScale} from "react-native-size-matters"
import dayjs from "dayjs"
const SixthMilestone = ({clickedGoal}) => {
	const navigation = useNavigation()
	let temp = clickedGoal.goalMilestone[clickedGoal.goalMilestone.length - 1].milestone
	const [milestone, setMilestone] = useState(temp)
	const [date, setDate] = useState(dayjs())
	const tip = () => <Text style={CommonStyles.fontWBold}>Tip:</Text>

	return (
		<ImageBackground
			style={[CommonStyles.introContainer, styles.image]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<View style={styles.topHeadingContainer}>
				<Text style={CommonStyles.mainTitle}>{clickedGoal.name}</Text>
				<Entypo
					name="cross"
					color={ColorConstants.faintWhite}
					size={38}
					style={CommonStyles.cross}
					onPress={() => {
						if (clickedGoal.goalMilestone === null || clickedGoal.goalMilestone.length === 0) {
							navigation.navigate("DParticularGoal")
						} else {
							navigation.navigate("particulargoal")
						}
					}}
				/>
			</View>
			<Text style={[CommonStyles.milestoneText, CommonStyles.mt20]}>Enter Milestone</Text>
			<TouchableOpacity style={CommonStyles.centerCont}>
				<TextInput
					style={CommonStyles.textInput}
					placeholder="Type here"
					onChangeText={(text) => setMilestone(text)}
					value={milestone}
					maxLength={28}
				/>
			</TouchableOpacity>
			<Text style={styles.subTitle}>
				{tip()} Think of milestones as a mini goal that helps you reach your ultimate goal.
			</Text>
			<TouchableOpacity style={styles.editBtntext} onPress={() => {}}>
				<Text style={CommonStyles.reoccuring}>Edit Date</Text>
			</TouchableOpacity>
			<Text style={styles.subTitle}>
				{tip()} adding a target date will help you stay on track.Dont't worry!
			</Text>
			<Text style={styles.subTitle}> You can always change it.</Text>

			{/* <View style={styles.middleContainer}>
				<View style={styles.middleInnerContainer}> */}
			{/* <View>
						<TouchableOpacity style={[styles.btnStylingLeft, styles.nextBtn]}>
							<MaterialCommunityIcons
								name="chevron-left"
								size={sizeConstants.fifty}
								color={ColorConstants.faintWhite}
								onPress={() => navigation.navigate("addgoal")}
							/>
						</TouchableOpacity>
					</View> */}
			{/* <View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<CommonPrevButton click={() => navigation.navigate("addgoal")} />
				<CommonNextButton click={() => navigation.navigate("milestones")} />
			</View> */}

			{/* <View>
						<TouchableOpacity style={[styles.btnStylingRight, styles.nextBtn]}>
							<MaterialCommunityIcons
								name="chevron-right"
								size={sizeConstants.fifty}
								color={ColorConstants.lighterBlue}
								onPress={() => navigation.navigate("milestones")}
							/>
						</TouchableOpacity>
					</View> */}
			{/* </View> */}

			{/* <View style={CommonStyles.alignItemsCenter}>
					<TouchableOpacity style={styles.btnStyling}>
						<MaterialCommunityIcons name="home" size={44} color={ColorConstants.lighterBlue} />
					</TouchableOpacity>
				</View> */}
			{/* </View> */}
			<CommonPrevNextButton
				right={true}
				left={true}
				nextClick={() => navigation.navigate("firsttaskflow")}
				prevClick={() => navigation.navigate("FirstMilestone")}
				bottom={sizeConstants.negativeSixty}
			/>
			<CommonHomeButton
				click={() => {
					navigation.navigate("particulargoal")
				}}
				size={44}
				normalBack={true}
				BackHandle={true}
				clickforBack={() => navigation.goBack()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SixthMilestone)

const styles = StyleSheet.create({
	subTitle: {
		fontSize: sizeConstants.fourteenScale, //16
		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyMX,
		marginRight: sizeConstants.mX,
		marginTop: sizeConstants.s,
	},

	btnStyling: {
		backgroundColor: ColorConstants.faintWhite,
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		right: 0,
		marginTop: sizeConstants.oneFifty,
		marginHorizontal: sizeConstants.seventyFive,
	},

	nextBtn: {
		width: sizeConstants.xxxl,
		height: sizeConstants.xxxl,
		borderRadius: sizeConstants.xxxl,
	},
	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		backgroundColor: ColorConstants.faintWhite,
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.three,
		paddingLeft: sizeConstants.twentyMX,
		fontSize: sizeConstants.eighteenScale, //19

		color: ColorConstants.faintBlack2,
		elevation: sizeConstants.mX,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	btnContainer: {
		position: "absolute",
		bottom: sizeConstants.twentyMX,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	btnStylingRight: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / 2,
	},
	btnStylingLeft: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.buttonBackGround,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / 2,
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.faintWhite,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / 2,
	},

	topHeadingContainer: {flexDirection: "row", marginTop: Constants.statusBarHeight},

	editBtntext: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.darkFaintBlue,
		borderColor: ColorConstants.faintWhite,
		borderEndWidth: sizeConstants.three,
		borderStartWidth: sizeConstants.three,
		borderTopWidth: sizeConstants.three,
		borderBottomWidth: sizeConstants.three,
		width: sizeConstants.threeFourTeen,
		padding: sizeConstants.eightMX,
		borderRadius: sizeConstants.xxl,
		flexDirection: "column",
		marginVertical: sizeConstants.s,
		marginTop: sizeConstants.thirtyFive,
		alignSelf: "center",
	},

	middleContainer: {
		position: "absolute",
		bottom: sizeConstants.mThirty,
		width: "100%",
		justifyContent: "center",
	},
	middleInnerContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: sizeConstants.twelve,
	},
})
