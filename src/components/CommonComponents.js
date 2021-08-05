import React, {useState, useEffect} from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Alert, StyleSheet, Text, TouchableOpacity, View, BackHandler} from "react-native"
import {
	CommonStyles,
	ColorConstants,
	sizeConstants,
	height,
	commonDataFormat,
	commonDateFormat,
	width,
} from "../core/constants"
import colors from "../../colors"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
dayjs.extend(isSameOrBefore)

export const reoccuringDefaultDailyArray = [0, 1, 2, 3, 4, 5, 6]
export const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
]
export const weekArray = ["S", "M", "T", "W", "T", "F", "S"]
export const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]
export const monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]
export const calendarLocale = {
	monthNames: monthNames,
	monthNamesShort: monthNamesShort,
	dayNames: dayNames,
	dayNamesShort: weekArray,
}

export const getAllDatesBetween = (startDate, endDate) => {
	var tempDate = startDate
	var targetDate = endDate
	let isSmall = dayjs(tempDate).isSameOrBefore(targetDate)
	let datesArr = []
	while (isSmall) {
		datesArr.push(dayjs(tempDate).format(commonDateFormat))
		tempDate = dayjs(tempDate).add(1, "day")
		isSmall = dayjs(tempDate).isSameOrBefore(targetDate)
	}
	return datesArr
}

export const CommonHomeButton = ({
	click = () => {},
	clickforBack = () => {},
	size = 44,
	bgColor = ColorConstants.white,
	iconColor = ColorConstants.lighterBlue,
	iconName = "home",
	BackHandle = false,
	normalBack = false,
	doNotWorkBackFunctionality = false,
}) => {
	const [scale, setScale] = useState(1)
	if (BackHandle) {
		console.log("back button working")
		const backActionHandler = () => {
			if (normalBack) {
				clickforBack()
				return true
			} else {
				Alert.alert("Alert!", "Are you sure you want to go Back?", [
					{
						text: "Cancel",
						onPress: () => null,
						style: "cancel",
					},
					{text: "YES", onPress: () => clickforBack()},
				])
				return true
			}
		}
		useEffect(() => {
			BackHandler.addEventListener("hardwareBackPress", backActionHandler)
			return () => BackHandler.removeEventListener("hardwareBackPress", backActionHandler)
		}, [])
	}
	return (
		<View style={[CommonStyles.homeButtonContainer]}>
			<TouchableOpacity
				activeOpacity={1}
				style={[
					CommonStyles.homeTouchableOpacity,
					{
						backgroundColor: bgColor,
						transform: [{scale: scale}],
					},
				]}
				// onPress={click}
				onPressIn={() => {
					setScale(0.9)
				}}
				onPressOut={() => {
					if (doNotWorkBackFunctionality) {
						click()
					} else {
						Alert.alert("Alert!", "Are you sure you want to go Home?", [
							{
								text: "Cancel",
								onPress: () => null,
								style: "cancel",
							},
							{text: "YES", onPress: () => click()},
						])
					}
					setScale(1)
				}}
			>
				<MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
			</TouchableOpacity>
		</View>
	)
}

export const CommonNextButton = ({click, iconColor = ColorConstants.lighterBlue, style}) => {
	const [scale, setScale] = useState(1)
	return (
		<View>
			<TouchableOpacity
				activeOpacity={1}
				style={[
					styles.prevNextBtn,
					styles.btnStylingRight,
					style,
					{
						transform: [{scale: scale}],
					},
				]}
				onPressIn={() => {
					setScale(0.9)
				}}
				onPressOut={() => {
					setScale(1)
					click()
				}}
			>
				<MaterialCommunityIcons name="chevron-right" size={sizeConstants.fifty} color={iconColor} />
			</TouchableOpacity>
		</View>
	)
}

export const CommonPrevButton = ({click, iconColor = ColorConstants.faintWhite}) => {
	const [scale, setScale] = useState(1)
	return (
		<View>
			<TouchableOpacity
				style={[styles.prevNextBtn, styles.btnStylingLeft]}
				onPressIn={() => {
					setScale(0.9)
				}}
				onPressOut={() => {
					setScale(1)
					click()
				}}
			>
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
	nextClick = () => {},
	prevClick = () => {},
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
export const customTimelineFlatList = ({}) => {}
export const CustomDayComponentForCalendar = ({clickedDate, date, state, dayClick, marking}) => {
	let today = dayjs().format(commonDateFormat)
	let selectedDate = dayjs(clickedDate).format(commonDateFormat)
	let isMarked = marking && marking.marked
	let isStart = marking && marking.start
	let isEnd = marking && marking.end

	return (
		<View style={styles.mainDayContainer}>
			{state == "disabled" ? (
				<View style={styles.dayContainer}>
					<Text style={[styles.dayText, styles.disabledDate]}>{date.day}</Text>
				</View>
			) : (
				<TouchableOpacity
					onPress={() => {
						dayClick(date.dateString)
					}}
				>
					<View
						style={[
							styles.dayContainer,
							isEnd
								? styles.endContainer
								: isStart
								? styles.startConatainer
								: isMarked
								? styles.markedDateContainer
								: date.dateString == selectedDate
								? styles.selectedDateContainer
								: date.dateString == today
								? styles.todayContainer
								: {},
						]}
					>
						<Text
							style={[
								styles.dayText,
								isMarked
									? styles.markedDate
									: date.dateString == selectedDate
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
			)}
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

	// ---- styles for Day Component -----
	mainDayContainer: {
		margin: 0,
		padding: 0,
	},

	markedDateContainer: {
		height: sizeConstants.xxl,
		width: width / 7.825,
		borderRadius: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.white,
		margin: 0,
	},
	startConatainer: {
		height: sizeConstants.xxl,
		width: width / 7.825,
		borderRadius: 0,
		borderWidth: height < 700 ? 1 : 1.5,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.white,
		margin: 0,
		padding: sizeConstants.xs,
		borderTopLeftRadius: sizeConstants.eightyFive,
		borderBottomLeftRadius: sizeConstants.eightyFive,
		borderColor: ColorConstants.white,
	},
	endContainer: {
		height: sizeConstants.xxl,
		width: width / 7.825,
		borderRadius: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.white,
		margin: 0,
		padding: sizeConstants.xs,
		borderColor: ColorConstants.white,
		borderTopRightRadius: sizeConstants.eightyFive,
		borderBottomRightRadius: sizeConstants.eightyFive,
	},
	markedDate: {
		color: ColorConstants.greyishBlue,
	},
	disabledDate: {
		color: ColorConstants.mediumFaintBlue,
	},
	dayContainer: {
		height: height <= 700 ? sizeConstants.twentyFour : sizeConstants.twentySix,
		width: height <= 700 ? sizeConstants.twentyFour : sizeConstants.twentySix,

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
		fontSize: height > 700 ? sizeConstants.thirteenX : sizeConstants.twelve,
		flex: 1,
		width: sizeConstants.thirty,
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "nowrap",
		// paddingTop: 1,
	},
	todayText: {
		fontWeight: "bold",
	},
	selectedDate: {
		color: ColorConstants.greyishBlue,
	},

	// ---- styles for Day Component ends -----
})
