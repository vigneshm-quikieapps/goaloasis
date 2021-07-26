import React from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {CommonStyles, ColorConstants, sizeConstants, height} from "./styles"
import colors from "../../colors"

const convertToDateString = (date) => {
	let month = date.getMonth() + 1
	let day = date.getDate()
	return `${date.getFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
}

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

export const CustomDayComponentForCalendar = ({clickedDate, date, state, dayClick}) => {
	let today = convertToDateString(new Date())
	let selectedDate = convertToDateString(new Date(clickedDate))
	return (
		<TouchableOpacity
			onPress={() => {
				dayClick(date.dateString)
			}}
		>
			<View
				style={[
					styles.dayContainer,
					date.dateString == selectedDate
						? styles.selectedDateContainer
						: date.dateString == today
						? styles.todayContainer
						: {},
				]}
			>
				<Text
					style={[
						styles.dayText,
						date.dateString == selectedDate
							? styles.selectedDate
							: date.dateString == today
							? styles.todayText
							: {},
					]}
				>
					{date.day}
				</Text>
			</View>
		</TouchableOpacity>
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

	// ---- styles for Day Component -----
	dayContainer: {
		height: height <= 700 ? sizeConstants.twentyTwo : sizeConstants.twentySix,
		width: height <= 700 ? sizeConstants.twentyTwo : sizeConstants.twentySix,
		borderRadius: sizeConstants.eightyFive,
		borderWidth: height < 700 ? 1 : 1.5,
		borderColor: ColorConstants.transparent,
		padding: sizeConstants.xs,
		justifyContent: "center",
		alignItems: "center",
	},
	todayContainer: {
		borderColor: ColorConstants.white,
	},
	selectedDateContainer: {
		backgroundColor: ColorConstants.white,
		borderColor: ColorConstants.white,
	},

	dayText: {
		textAlign: "center",
		color: ColorConstants.white,
		fontSize: height < 700 ? sizeConstants.twelve : sizeConstants.thirteen,
	},
	todayText: {
		fontWeight: "bold",
	},
	selectedDate: {
		color: ColorConstants.greyishBlue,
	},

	// ---- styles for Day Component ends -----
})
