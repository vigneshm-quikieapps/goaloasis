import {
	ScaledSheet,
	verticalScale,
	moderateScale,
	scale,
	moderateVerticalScale,
} from "react-native-size-matters"
import Constants from "expo-constants"
import colors from "../../colors"
import {Dimensions} from "react-native"

export const commonDateFormat = "YYYY-MM-DD"

export const sizeConstants = {
	negativeSixty: verticalScale(-160),
	negativeSeventy: verticalScale(-70),
	negativeThirty: verticalScale(-30),
	negativeTwenty: verticalScale(-20),
	negativeTen: verticalScale(-10),
	negativeFive: verticalScale(-5),
	zero: verticalScale(0),
	one: verticalScale(1),
	xs: verticalScale(2),
	xsX: scale(2),
	three: verticalScale(3),
	four: verticalScale(4),
	s: verticalScale(5),
	five: moderateScale(5),
	six: verticalScale(6),
	seven: verticalScale(7),
	eight: verticalScale(8),
	eightX: scale(8),
	eightMX: moderateScale(8),
	m: verticalScale(10),
	mX: scale(10),
	twelve: verticalScale(12),
	thirteen: verticalScale(13),
	thirteenX: scale(13),
	thirteenMX: moderateScale(13),
	fourteen: verticalScale(14),
	fourteenMX: moderateScale(14),
	l: verticalScale(15),
	fifteenX: scale(15),
	fifteenMX: moderateScale(15),
	sixteen: verticalScale(16),
	sixteenX: scale(16),
	seventeen: verticalScale(17),
	eighteen: verticalScale(18),
	nineteen: verticalScale(19),
	nineteenX: moderateScale(19),
	xl: verticalScale(20),
	twentyX: scale(20),
	twentyMX: scale(20),
	twentyOne: moderateScale(21),
	twentyTwo: verticalScale(22),
	twentyFour: verticalScale(24),
	xxl: verticalScale(25),
	twentySix: verticalScale(26),
	twentySeven: verticalScale(27),
	twentyEight: verticalScale(28),
	thirty: verticalScale(30),
	mThirty: moderateScale(30),
	thirtyOne: verticalScale(31),
	thirtyTwo: verticalScale(32),
	thirtyThree: verticalScale(33),
	thirtyFour: verticalScale(34),
	thirtyFive: verticalScale(35),
	thirtySix: verticalScale(36),
	thirtyEight: verticalScale(38),
	fourty: verticalScale(40),
	fourtyMX: moderateScale(40),
	fourtyFour: verticalScale(44),
	fourtyFive: verticalScale(45),
	fourtyEight: verticalScale(48),
	xxxl: verticalScale(50),
	fifty: moderateScale(50),
	fiftyHalf: scale(50.5),
	fiftyFive: verticalScale(55),
	sixty: verticalScale(60),
	mSixty: moderateScale(60),
	sixtyFive: verticalScale(65),

	seventy: verticalScale(70),
	seventyFive: verticalScale(75),
	seventyFiveMX: moderateScale(75),
	eighty: verticalScale(80),
	eightyFive: verticalScale(85),
	ninety: verticalScale(90),
	ninetySeven: verticalScale(97),
	hundred: verticalScale(100),
	hundredMX: moderateScale(100),
	oneTen: verticalScale(110),
	oneTwentyEight: verticalScale(128),
	oneThirty: verticalScale(130),
	oneThirtyFive: verticalScale(135),
	oneThirtyFiveX: scale(135),
	oneFourty: verticalScale(140),
	oneFourtyFive: verticalScale(145),
	oneFifty: verticalScale(150),
	oneFiftyX: scale(150),
	oneEighty: verticalScale(180),
	twoHundred: verticalScale(200),
	twoFifty: verticalScale(250),
	twoSeventyMX: moderateScale(270),
	twoNinetyMX: moderateScale(290),
	threeHundred: verticalScale(300),
	threeTen: verticalScale(310),
	threeFourTeen: moderateScale(314),
	paddingHorizontal: moderateScale(15, 2),
}

export const height = Dimensions.get("window").height
export const width = Dimensions.get("window").width

export const commonImages = {
	firstImage: require("././../assets/images/first.png"),
	firstTimeLineImage: require("././../assets/images/firstTimeLine.png"),
	secondImage: require("./../assets/images/second.png"),
	secondTimeLineImage: require("././../assets/images/secondTimeLine.png"),
	thirdImage: require("././../assets/images/third.png"),
	thirdTimeLineImage: require("././../assets/images/thirdTimeLine.png"),
	fourthImage: require("././../assets/images/fourth.png"),
	timelineImage: require("././../assets/images/timeline.png"),
}

export const ColorConstants = {
	faintWhite: "#FDF9F2",
	whiteOp50: "rgba(255, 255, 255, 0.5)",
	darkBlue: "#76BBBC",
	lightestBlue: "#C0E5E4",
	lighterBlue: "#7ec8c9",
	whitishBlue: "#BDDFDB",
	white: "#FFFFFF",
	black: "#000000",
	faintBlack1: "#333333",
	faintBlack2: "#666666",
	faintGray: "#00000029",
	timelineSkinFaint: "#FFCB9C",
	timelineSkinDark: "#E6AB76",
	timelineSkinDarker: "#B3855C",
	lightestYellow: "#FBF5E9",
	blackOp60: "#000000aa",
	darkGrey: "#707070",
	darkFaintBlue: "#588C8D",
	mediumFaintBlue: "#86C7C8",
	transparent: "#00000000",
	greyishBlue: "#538586",
	gray: "gray",
	backGroundTextDIsable: "#BFE4E4",
	snoozeIconBg: "#7c9b96",
}

export const forGoals = {
	first: ColorConstants.darkFaintBlue,
	second: "#553144",
	third: "#6A5593",
	fourth: "#B3855C",
	fifth: "#3F6E6A",
	sixth: "#B8534F",
}

export const content = {
	My_Milestone:
		"It looks like you don’t have a plan to achieve your goal yet. Don’t worry! Tap (+) to add a milestone and get on your way.",
	Tip1: "Tip: Think of milestones as a mini goal that helps you reach your ultimate goal.",
	Tip2: "Tip: adding a target date will help you stay on track. Don’t worry! You can always change it.",
	First_Slider:
		"Achieving a goal requires dedication and hard work. Goal Oasis will help you stay on track for up to six goals.",
	Second_Slider:
		"The key to achieving a goal is breaking it down into manageable milestones. We can help you do just that!",
	Third_Slider:
		"Progress is made one step at a time! We’ll help keep your daily task list focused on what matters to you.",
	Fourth_Slider:
		"Never lose sight of the big picture with a comprehensive view of your goals, milestones, and tasks. You can do it!",
	Name_Goal:
		"Be specific, try to put a real and exact figure on it. Make sure it’s achievable so that you build on your momentum.",
	Whats_Important: "Write out what this goal means to you and make sure it’s something important.",
	Your_Target_Date:
		"When your goal is time-bound, it become measurable. Don’t stress over it if you are unsure about the exact date. You can always adjust later.",
}
export const CommonStyles = ScaledSheet.create({
	// sliders common styles start

	mainContainer: {
		flex: 1,
	},

	SkipText: {
		color: ColorConstants.faintWhite,
		fontSize: 19,
		textAlign: "left",
	},
	progressContainer: {
		marginTop: sizeConstants.seventy,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	progress: {
		height: sizeConstants.s,
		width: sizeConstants.sixty,
		backgroundColor: ColorConstants.white,
		borderRadius: sizeConstants.m,
		marginHorizontal: sizeConstants.xs,
	},

	normalProgress: {
		height: sizeConstants.s,
		width: sizeConstants.sixty,
		backgroundColor: "rgba(255, 255, 255, 0.274)",
		borderRadius: sizeConstants.m,
		marginHorizontal: sizeConstants.xs,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 25,
		textAlign: "left",
		fontWeight: "bold",
		color: ColorConstants.faintWhite,
	},

	//cricket
	subTitle: {
		fontSize: 19,
		letterSpacing: 0.7,
		color: ColorConstants.faintWhite,
		marginTop: sizeConstants.thirty,
	},

	btnContainer: {
		position: "absolute",
		bottom: sizeConstants.hundred,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.white,
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		borderRadius: sizeConstants.fifty,
	},

	btnText: {
		fontSize: 19,
		color: ColorConstants.faintBlack2,
		letterSpacing: "1.2@s",
	},

	textContainer: {
		marginTop: sizeConstants.xxxl,
		marginHorizontal: sizeConstants.xl,
	},

	image: {
		width: "100%",
		height: "100%",
	},

	headerMargin: {
		marginTop: sizeConstants.ninetySeven - Constants.statusBarHeight,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: sizeConstants.twentySix,
	},

	// sliders common styles ends

	textInput: {
		width: sizeConstants.threeFourTeen,
		height: sizeConstants.fifty,
		backgroundColor: ColorConstants.faintWhite,
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.three,
		paddingLeft: sizeConstants.twentyX,
		fontSize: 19,
		color: "#666666",
		elevation: sizeConstants.m,
	},

	homeAndRight: {
		position: "absolute",
		bottom: verticalScale(sizeConstants.fourtyFive),
		width: "100%",
		justifyContent: "center",
	},
	rightArrow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: sizeConstants.fourteen,
	},
	nextBtn: {
		width: sizeConstants.fifty,
		height: sizeConstants.fifty,
		borderRadius: moderateScale(50),
		backgroundColor: "#FDF9F2",
	},
	homeContainer: {
		alignItems: "center",
	},
	homeBtnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / 2,
	},
	//GoalStep3

	btnStylingLeft: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.buttonBackGround,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / 2,
	},
	btnStylingRight: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		width: sizeConstants.seventyFive,
		height: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
	},

	// Reoccuring Flow
	// first
	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: verticalScale(21),
	},
	threeDots: {
		flexDirection: "row",
		position: "absolute",
		right: scale(0),
		margin: scale(10),
		backgroundColor: "#538586",
		height: sizeConstants.thirty,
		width: scale(35),
		borderRadius: scale(30),
		alignItems: "center",
		justifyContent: "center",
	},
	dots: {
		backgroundColor: "black",
		height: sizeConstants.six,
		width: scale(5),
		borderRadius: sizeConstants.four,
		margin: scale(1),
	},
	enterTask: {
		fontSize: 16,
		color: "#FDF9F2",
		marginLeft: scale(21),
	},
	BottomTouch: {
		height: sizeConstants.hundred,
		width: "100%",
		borderWidth: scale(1),
		borderLeftColor: "white",
		borderRightColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomText: {
		fontSize: 19,
		fontWeight: "bold",
		color: "#333333",
	},

	firstSubTitle: {
		fontSize: 25,
		color: "#BDDFDB",
		marginLeft: scale(21),
		fontWeight: "bold",
		marginTop: sizeConstants.xl,
	},
	toggle: {flexDirection: "row", alignSelf: "center", marginTop: sizeConstants.xl},
	days: {
		height: sizeConstants.fourty,
		width: sizeConstants.fourty,
		borderRadius: sizeConstants.xl,
		justifyContent: "center",
		backgroundColor: "#76BBBC",
		margin: sizeConstants.four,
	},
	daysText: {alignSelf: "center", fontSize: "20@s", color: "#FDF9F2"},
	cancelReoccuring: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		// backgroundColor: "#588C8D",
		borderColor: "#FDF9F2",
		borderWidth: scale(3),
		padding: scale(8),
		borderRadius: scale(25),
		margin: sizeConstants.s,
		marginTop: sizeConstants.l,
		width: "45%",
	},
	cancelReoccuringText: {
		color: "#FDF9F2",
		fontSize: 19,
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: "#FDF9F2",
		// elevation: scale(5),
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginTop: sizeConstants.m,
		bottom: sizeConstants.m,

		// marginBottom: sizeConstants.m,
	},
	bottomSheet: {
		alignItems: "center",
		marginTop: sizeConstants.xl,
		width: "100%",
	},

	// Reoccuring Flow

	editContainer: {
		marginTop: sizeConstants.m,
		marginLeft: sizeConstants.twentyOne,
	},
	editOccuringText: {fontSize: 25, color: "#FDF9F2", fontWeight: "bold"},

	reoccuringDateContainer: {
		//modal styles starts
		padding: sizeConstants.eightMX,
		borderRadius: sizeConstants.xxl,
		flexDirection: "column",
		// marginVertical: sizeConstants.five,
		// marginTop: sizeConstants.fifteenX,
		alignSelf: "center",
	},
	//modal styles starts

	titleContainer: {
		flex: 0.6,
		justifyContent: "center",
		backgroundColor: ColorConstants.faintWhite,
	},

	//modal styles ends

	// common styles starts

	bold: {fontWeight: "bold"},
	fontW100: {fontWeight: "100"},
	fontWBold: {fontWeight: "bold"},
	bgWhite: {backgroundColor: ColorConstants.white},
	borderRadius30: {
		borderRadius: sizeConstants.mThirty,
	},
	borderRadius4: {
		borderRadius: sizeConstants.four,
	},
	borderRadius20: {borderRadius: sizeConstants.xl},
	flexDirectionRow: {
		flexDirection: "row",
	},
	MX10: {
		marginHorizontal: sizeConstants.mX,
	},

	ML30: {
		marginLeft: sizeConstants.mThirty,
	},

	pt10: {
		paddingTop: sizeConstants.mX,
	},
	alignItemsCenter: {
		alignItems: "center",
	},
	mt20: {
		marginTop: sizeConstants.twentyMX,
	},
	pr10: {
		paddingRight: sizeConstants.mX,
	},
	flexOne: {
		flex: 1,
	},
	// common styles ends

	// milestone starts

	reoccuring: {color: ColorConstants.faintWhite, fontSize: 19},
	milestoneText: {
		fontSize: 16,
		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyOne,
		// marginTop: sizeConstants.twentyX,
	},
	container2: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.faintWhite,
		width: "70%",
		padding: sizeConstants.eightMX,
		borderRadius: sizeConstants.xxl,
		flexDirection: "column",
		marginVertical: sizeConstants.five,
		marginTop: sizeConstants.fifteenX,
		alignSelf: "center",
	},

	button: {
		color: ColorConstants.black,
		fontSize: sizeConstants.twentyOne,
	},

	calendarContainer: {
		// display: "flex",
		// flexDirection: "row",
		// justifyContent: "center",
		// alignItems: "center",

		marginTop: sizeConstants.twentyMX,
	},

	doneText: {
		fontSize: 14,
		color: "#FDF9F2",
		// position: "absolute",
		// left: sizeConstants.xxxl,
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#588C8D",
		borderColor: "#FDF9F2",
		marginBottom: sizeConstants.xl,
		// marginTop: sizeConstants.m,
	},

	targetDate: {
		fontSize: 16,
		color: ColorConstants.faintBlack1,
		alignSelf: "center",
		marginLeft: sizeConstants.twentyMX,
		color: ColorConstants.faintWhite,
	},

	containerMilestone: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.darkFaintBlue,
		borderColor: ColorConstants.faintWhite,
		marginBottom: sizeConstants.twentyMX,
		borderEndWidth: sizeConstants.three,
		borderStartWidth: sizeConstants.three,
		borderTopWidth: sizeConstants.three,
		borderBottomWidth: sizeConstants.three,
		width: "70%",
		padding: sizeConstants.eight,
		borderRadius: sizeConstants.twentySix,
		flexDirection: "column",
		marginVertical: sizeConstants.s,
		marginTop: sizeConstants.l,
		alignSelf: "center",
	},

	// MyGoals Home Screen
	// titleContainer: {
	// 	height: scale(90) - Constants.statusBarHeight,
	// 	backgroundColor: "#588C8D",
	// 	justifyContent: "center",
	// },
	titleContainer1: {
		height: scale(90) - Constants.statusBarHeight,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},

	viewTap: {
		height: sizeConstants.six,
		width: scale(60),
		backgroundColor: "#588C8D",
		marginVertical: sizeConstants.m,
		borderRadius: sizeConstants.thirty,
		opacity: 0.5,
	},
	myGoalsText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#588C8D",
		marginHorizontal: scale(20),
		marginBottom: sizeConstants.m,
	},
	logoSpacing: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		// justifyContent: "center",
		width: "100%",
	},
	logoContainer: {
		marginLeft: sizeConstants.fifty, //TODO
		marginTop: sizeConstants.xl,
		// backgroundColor: "green",
	},
	goalText: {
		fontSize: 16,
		color: "#666666",
		textAlign: "center",
		maxWidth: scale(100),

		// backgroundColor: "blue",
	},
	circleLogo: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		borderWidth: sizeConstants.s,
		borderColor: "#588C8D",
		justifyContent: "center",
		alignItems: "center",
	},
	iconVertical: {
		height: sizeConstants.thirty,
		width: scale(4),
		backgroundColor: "#588C8D",
	},
	iconHorizontal: {
		height: sizeConstants.four,
		width: scale(30),
		backgroundColor: "#588C8D",
		position: "absolute",
	},

	modalBottomBtn: {
		justifyContent: "center",
		paddingHorizontal: sizeConstants.twentyX,
		backgroundColor: ColorConstants.lighterBlue,
		width: sizeConstants.twoSeventyMX,
		height: sizeConstants.seventy,
	},
	//modal styles ends

	// common styles starts

	bold: {fontWeight: "bold"},
	fontW100: {fontWeight: "100"},
	fontWBold: {fontWeight: "bold"},
	bgWhite: {backgroundColor: ColorConstants.white},
	borderRadius30: {
		borderRadius: sizeConstants.mThirty,
	},
	borderRadius4: {
		borderRadius: sizeConstants.four,
	},
	flexDirectionRow: {
		flexDirection: "row",
	},
	MX10: {
		marginHorizontal: sizeConstants.mX,
	},
	dotStyle: {
		height: sizeConstants.eightX,
		width: sizeConstants.eightX,
	},
	ML30: {
		marginLeft: sizeConstants.mThirty,
	},

	pt10: {
		paddingTop: sizeConstants.mX,
	},

	mt20: {
		marginTop: sizeConstants.twentyMX,
	},
	pr10: {
		paddingRight: sizeConstants.mX,
	},
	pl10: {
		paddingLeft: sizeConstants.mX,
	},
	flexOne: {
		flex: 1,
	},
	// common styles ends

	// milestone starts

	subTitleMilestone: {
		fontSize: 16,
		color: ColorConstants.faintWhite,
		marginLeft: sizeConstants.twentyOne,
		paddingLeft: sizeConstants.five,
		paddingRight: sizeConstants.twentyMX,
	},

	reoccuringText: {
		fontSize: 19,
		alignSelf: "center",
		marginLeft: scale(20),
		color: "#FDF9F2",
		marginTop: sizeConstants.m,
	},

	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#588C8D",
		borderColor: "#FDF9F2",
		marginBottom: sizeConstants.xl,
		marginTop: sizeConstants.m,
	},

	done: {
		fontSize: 16,
		color: "#89B3B2",

		position: "absolute",
		bottom: 0,
		right: sizeConstants.xxl,
	},

	// MyGoals Home Screen

	goalsContainer: {
		flex: 1,
		backgroundColor: "#FBF5E9",
		borderTopRightRadius: sizeConstants.seventy,
	},

	//duplicate
	circleLogo: {
		height: sizeConstants.hundred,
		width: sizeConstants.hundred,
		borderRadius: sizeConstants.hundred,
		borderWidth: sizeConstants.s,
		borderColor: "#588C8D",
		justifyContent: "center",
		alignItems: "center",
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: sizeConstants.fourtyFive,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn2: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: "#7EC8C9",
		elevation: sizeConstants.s,
		justifyContent: "center",
		alignItems: "center",
	},

	introContainer: {
		flex: 1,
		backgroundColor: ColorConstants.darkFaintBlue,
	},

	// mainTitle: {
	// 	color: ColorConstants.faintWhite,
	// 	fontSize: sizeConstants.xxl,
	// 	marginLeft: sizeConstants.twentyOne,
	// },

	bottomBtnMilestone: {
		marginBottom: sizeConstants.twentyMX,
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: ColorConstants.faintWhite,
		elevation: sizeConstants.five,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	cross: {
		backgroundColor: ColorConstants.greyishBlue,
		borderRadius: sizeConstants.twentyMX,
		position: "absolute",
		right: 0,
		marginRight: sizeConstants.mX,
	},
	// milestone ends

	// home button floating fixed
	homeButtonContainer: {
		flex: 1,
		width: "100%",
		position: "absolute",
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},

	homeTouchableOpacity: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive,
		backgroundColor: "white",
		elevation: sizeConstants.s,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: sizeConstants.sixteenX,
	},

	rightButton: {
		width: sizeConstants.fifty,
		height: sizeConstants.fifty,
		marginRight: sizeConstants.fourtyMX,
		marginBottom: sizeConstants.twentyMX,
		marginTop: sizeConstants.m,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		borderRadius: sizeConstants.seventyFive,
		right: 0,
		top: 0,
		alignSelf: "flex-end",
	},
	//Dparticular Goal
	addMileStone: {
		marginLeft: "auto",
		marginRight: sizeConstants.xxl,
		marginTop: sizeConstants.xl,
	},
	trackingcont: {
		marginTop: sizeConstants.eighteen,
		marginVertical: sizeConstants.m,
		marginHorizontal: sizeConstants.xl,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	percentageCont: {
		height: sizeConstants.oneThirty,
		width: sizeConstants.oneThirty,
		borderRadius: sizeConstants.oneFifty,
		backgroundColor: "#FBF5E9",
		borderWidth: 8,
		borderColor: "#C0E5E4",
		justifyContent: "center",
		alignItems: "center",
	},
	textDisableBackgroundColor: {
		backgroundColor: "#FDF9F2",
		opacity: 0.5,
	},
})

export const firebaseConstants = {
	GOALS_COLLECTION: "Goals",
}
