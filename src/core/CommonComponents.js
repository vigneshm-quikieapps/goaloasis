import React from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {CommonStyles, ColorConstants, sizeConstants} from "./styles"
import colors from "../../colors"

export const CommonHomeButton = ({click, size = 44}) => {
	return (
		<View style={CommonStyles.homeButtonContainer}>
			<TouchableOpacity
				style={CommonStyles.homeTouchableOpacity}
				// onPress={() => navigation.navigate("particulargoal")}
				onPress={click}
			>
				<MaterialCommunityIcons name="home" size={size} color={ColorConstants.lighterBlue} />
			</TouchableOpacity>
		</View>
	)
}

export const CommonNextButton = ({click}) => {
	return (
		<View>
			<TouchableOpacity style={[styles.prevNextBtn, styles.btnStylingRight]}>
				<MaterialCommunityIcons
					name="chevron-right"
					size={sizeConstants.fifty}
					color={ColorConstants.lighterBlue}
					onPress={click}
				/>
			</TouchableOpacity>
		</View>
	)
}

export const CommonPrevButton = ({click}) => {
	return (
		<View>
			<TouchableOpacity style={[styles.prevNextBtn, styles.btnStylingLeft]}>
				<MaterialCommunityIcons
					name="chevron-left"
					size={sizeConstants.fifty}
					color={ColorConstants.faintWhite}
					onPress={click}
				/>
			</TouchableOpacity>
		</View>
	)
}

export const CommonPrevNextButton = ({right = false, left = false, nextClick, prevClick}) => {
	return (
		<View style={{flexDirection: "row", justifyContent: "space-between"}}>
			{left ? <CommonPrevButton click={prevClick} /> : null}
			{right ? <CommonNextButton click={nextClick} /> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	prevNextBtn: {
		justifyContent: "center",
		alignItems: "center",
		width: sizeConstants.fifty,
		height: sizeConstants.fifty,
		borderRadius: sizeConstants.seventyFive,
		marginVertical: "auto",
		bottom: 0,
		position: "relative",
	},
	btnStylingRight: {
		backgroundColor: colors.faint,
		right: 0,
		marginRight: sizeConstants.thirty,
		alignSelf: "flex-end",
	},
	btnStylingLeft: {
		backgroundColor: colors.buttonBackGround,
		marginLeft: sizeConstants.thirty,
	},
})
