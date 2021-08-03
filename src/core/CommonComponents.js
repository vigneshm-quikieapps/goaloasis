import React, {useState, useEffect} from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"

import {Alert, StyleSheet, Text, TouchableOpacity, View, BackHandler} from "react-native"
import {CommonStyles, ColorConstants, sizeConstants, height} from "./styles"
import colors from "../../colors"
import Spinner from "./Spinner"

export const reoccuringDefaultDailyArray = [0, 1, 2, 3, 4, 5, 6]
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

export const addDays = (date, noOfdays) => {
	var newDate = new Date(date)
	newDate.setDate(newDate.getDate() + noOfdays)
	return newDate
}

export const getAllDatesBetween = (startDate, endDate) => {
	let datesArr = []
	var tempDate = new Date(startDate)
	var targetDate = new Date(endDate)

	while (
		checkDate.compare(tempDate, targetDate) == -1 ||
		checkDate.compare(tempDate, targetDate) == 0
	) {
		datesArr.push(convertToDateString(new Date(tempDate)))
		tempDate = addDays(tempDate, 1)
	}
	return datesArr
}

export const checkDate = {
	convert: function (d) {
		// Converts the date in d to a date-object. The input can be:
		//   a date object: returned without modification
		//  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
		//   a number     : Interpreted as number of milliseconds
		//                  since 1 Jan 1970 (a timestamp)
		//   a string     : Any format supported by the javascript engine, like
		//                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
		//  an object     : Interpreted as an object with year, month and date
		//                  attributes.  **NOTE** month is 0-11.
		return d.constructor === Date
			? d
			: d.constructor === Array
			? new Date(d[0], d[1], d[2])
			: d.constructor === Number
			? new Date(d)
			: d.constructor === String
			? new Date(d)
			: typeof d === "object"
			? new Date(d.year, d.month, d.date)
			: NaN
	},
	compare: function (a, b) {
		// Compare two dates (could be of any type supported by the convert
		// function above) and returns:
		//  -1 : if a < b
		//   0 : if a = b
		//   1 : if a > b
		// NaN : if a or b is an illegal date
		// NOTE: The code inside isFinite does an assignment (=).
		return isFinite((a = this.convert(a).valueOf())) && isFinite((b = this.convert(b).valueOf()))
			? (a > b) - (a < b)
			: NaN
	},
	inRange: function (d, start, end) {
		// Checks if date in d is between dates in start and end.
		// Returns a boolean or NaN:
		//    true  : if d is between start and end (inclusive)
		//    false : if d is before start or after end
		//    NaN   : if one or more of the dates is illegal.
		// NOTE: The code inside isFinite does an assignment (=).
		return isFinite((d = this.convert(d).valueOf())) &&
			isFinite((start = this.convert(start).valueOf())) &&
			isFinite((end = this.convert(end).valueOf()))
			? start <= d && d <= end
			: NaN
	},
}

export const convertToDateString = (date) => {
	let month = date.getMonth() + 1
	let day = date.getDate()
	return `${date.getFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
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
						setScale(1)
						Alert.alert("Alert!", "Are you sure you want to go Home?", [
							{
								text: "Cancel",
								onPress: () => null,
								style: "cancel",
							},
							{text: "YES", onPress: () => click()},
						])
					}
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

export const CustomDayComponentForCalendar = ({clickedDate, date, state, dayClick, marking}) => {
	let today = convertToDateString(new Date())
	let selectedDate = convertToDateString(new Date(clickedDate))
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
		height: height <= 700 ? sizeConstants.twentyTwo : sizeConstants.twentySix,
		width: sizeConstants.fiftyFive,
		borderRadius: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.white,
		margin: 0,
	},
	startConatainer: {
		height: height <= 700 ? sizeConstants.twentyTwo : sizeConstants.twentySix,
		width: sizeConstants.fiftyFive,
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
		height: height <= 700 ? sizeConstants.twentyTwo : sizeConstants.twentySix,
		width: sizeConstants.fiftyFive,
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
