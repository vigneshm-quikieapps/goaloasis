import React from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {CommonStyles, ColorConstants, sizeConstants} from "./styles"
import colors from "../../colors"

export const CommonHomeButton = ({
	click = () => {},
	size = 44,
	bgColor = ColorConstants.white,
	iconColor = ColorConstants.lighterBlue,
	iconName = "home",
}) => {
	return (
		<View style={CommonStyles.homeButtonContainer}>
			<TouchableOpacity
				style={[CommonStyles.homeTouchableOpacity, {backgroundColor: bgColor}]}
				// onPress={() => navigation.navigate("particulargoal")}
				onPress={click}
			>
				<MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
			</TouchableOpacity>
		</View>
	)
}

export const CommonNextButton = ({click, iconColor = ColorConstants.lighterBlue, style}) => {
	return (
		<View>
			<TouchableOpacity style={[styles.prevNextBtn, styles.btnStylingRight, style]}>
				<MaterialCommunityIcons
					name="chevron-right"
					size={sizeConstants.fifty}
					color={iconColor}
					onPress={click}
				/>
			</TouchableOpacity>
		</View>
	)
}

export const CommonPrevButton = ({click, iconColor = ColorConstants.faintWhite}) => {
	return (
		<View>
			<TouchableOpacity style={[styles.prevNextBtn, styles.btnStylingLeft]}>
				<MaterialCommunityIcons
					name="chevron-left"
					size={sizeConstants.fifty}
					color={iconColor}
					onPress={click}
				/>
			</TouchableOpacity>
		</View>
	)
}

export const CommonPrevNextButton = ({
	right = false,
	left = false,
	nextClick,
	prevClick,
	iconLeftColor = ColorConstants.lighterBlue,
	iconRightColor = ColorConstants.lighterBlue,
	bottom = sizeConstants.hundred,
	style,
}) => {
	return (
		<View
			style={{
				// position: "absolute",
				bottom: bottom,
				flexDirection: "row",
				alignItems: "flex-end",
				justifyContent:
					right && left ? "space-between" : right && !left ? "flex-end" : "flex-start",
			}}
		>
			{left ? <CommonPrevButton click={prevClick} iconColor={iconLeftColor} /> : null}
			{right ? (
				<CommonNextButton style={style} click={nextClick} iconColor={iconRightColor} />
			) : null}
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
		// backgroundColor: colors.faint,
		backgroundColor: "white",
		right: 0,
		marginRight: sizeConstants.thirty,
		alignSelf: "flex-end",
	},
	btnStylingLeft: {
		backgroundColor: colors.buttonBackGround,
		marginLeft: sizeConstants.thirty,
	},
})
