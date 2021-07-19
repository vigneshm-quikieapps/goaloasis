import {StyleSheet} from "react-native"
import {scale, ScaledSheet, verticalScale, moderateScale} from "react-native-size-matters"
import Constants from "expo-constants"
import colors from "../../colors"

export const sizeConstants = {
	negativeSeventy: verticalScale(-70),
	negativeThirty: verticalScale(-30),
	negativeTwenty: verticalScale(-20),
	negativeTen: verticalScale(-10),
	negativeFive: verticalScale(-5),
	zero: verticalScale(0),
	one: verticalScale(1),
	xs: verticalScale(2),
	three: verticalScale(3),
	four: verticalScale(4),
	s: verticalScale(5),
	six: verticalScale(6),
	seven: verticalScale(7),
	eight: verticalScale(8),
	m: verticalScale(10),
	twelve: verticalScale(12),
	fourteen: verticalScale(14),
	l: verticalScale(15),
	sixteen: verticalScale(16),
	seventeen: verticalScale(17),
	eighteen: verticalScale(18),
	nineteen: verticalScale(19),
	xl: verticalScale(20),
	twentyOne: verticalScale(21),
	twentyTwo: verticalScale(22),
	twentyFour: verticalScale(24),
	xxl: verticalScale(25),
	twentySix: verticalScale(26),
	twentySeven: verticalScale(27),
	twentyEight: verticalScale(28),
	thirty: verticalScale(30),
	thirtyOne: verticalScale(31),
	thirtyTwo: verticalScale(32),
	thirtyThree: verticalScale(33),
	thirtyFour: verticalScale(34),
	thirtyFive: verticalScale(35),
	thirtySix: verticalScale(36),
	thirtyEight: verticalScale(38),
	fourty: verticalScale(40),
	fourtyFour: verticalScale(44),
	fourtyFive: verticalScale(45),
	fourtyEight: verticalScale(48),
	xxxl: verticalScale(50),
	fifty: moderateScale(50),
	fiftyFive: verticalScale(55),
	sixty: verticalScale(60),
	seventy: verticalScale(70),
	seventyFive: verticalScale(75),
	eighty: verticalScale(80),
	eightyFive: verticalScale(85),
	ninety: verticalScale(90),
	ninetySeven: verticalScale(97),
	hundred: verticalScale(100),
	oneTen: verticalScale(110),
	oneTwentyEight: verticalScale(128),
	oneThirty: verticalScale(130),
	oneFourty: verticalScale(140),
	oneFourtyFive: verticalScale(145),
	oneFifty: verticalScale(150),
	oneEighty: verticalScale(180),
	twoHundred: verticalScale(200),
	twoFifty: verticalScale(250),
	threeHundred: verticalScale(300),
	threeTen: verticalScale(310),
	threeFourTeen: moderateScale(314),
	paddingHorizontal: moderateScale(15, 2),
}

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
	darkBlue: "#76BBBC",
	white: "#FFFFFF",
	black: "#000000",
	faintBlack1: "#333333",
	faintBlack2: "#666666",
	faintGray: "#00000029",
	timelineSkinFaint: "#FFCB9C",
	timelineSkinDark: "#E6AB76",
	timelineSkinDarker: "#B3855C",
}

export const forGoals = {
	first: "#588C8D",
	second: "#553144",
	third: "6A5593",
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
		fontSize: sizeConstants.nineteen,
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
		fontSize: "25@s",
		textAlign: "left",
		fontWeight: "bold",
		color: ColorConstants.white,
	},

	subTitle: {
		fontSize: "19@s",
		letterSpacing: "0.7@ms",
		color: "rgba(255, 255, 255, 0.651)",
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
		fontSize: sizeConstants.nineteen,
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

	// NameGoal
	textInput: {
		width: scale(314),
		height: sizeConstants.fifty,
		backgroundColor: "#FDF9F2",
		borderRadius: sizeConstants.fifty,
		marginTop: sizeConstants.fifty,
		paddingLeft: moderateScale(20),
		fontSize: "19@s",
		color: "#666666",
		elevation: "10@s",
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
		borderRadius: sizeConstants.seventyFive / 2,
	},

	// Reoccuring Flow
	// first
	mainTitle: {
		color: "#FDF9F2",
		fontSize: "25@s",
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
		fontSize: "16@s",
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
		fontSize: "24@s",
		fontWeight: "bold",
		color: "black",
	},
	container2: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",
		width: "70%",
		padding: scale(8),
		borderRadius: sizeConstants.twentyFour,
		flexDirection: "column",
		marginVertical: sizeConstants.s,
		marginTop: sizeConstants.l,
		alignSelf: "center",
	},
	button: {
		color: "black",
		fontSize: "21@s",
	},

	firstSubTitle: {
		fontSize: 25,
		color: "#FDF9F2",
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
		margin: sizeConstants.seven,
	},
	daysText: {alignSelf: "center", fontSize: "20@s", color: "#FDF9F2"},
	cancelReoccuring: {
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "#588C8D",
		borderColor: "#FDF9F2",

		borderEndWidth: scale(3),
		borderStartWidth: scale(3),
		borderTopWidth: scale(3),
		borderBottomWidth: scale(3),
		width: "70%",
		padding: scale(8),
		borderRadius: scale(25),
		flexDirection: "column",
		marginVertical: sizeConstants.s,
		marginTop: sizeConstants.l,
		alignSelf: "center",
	},
	cancelReoccuringText: {
		color: "#FDF9F2",
		fontSize: "21@s",
	},
	bottomBtn: {
		height: sizeConstants.seventyFive,
		width: sizeConstants.seventyFive,
		borderRadius: sizeConstants.seventyFive / sizeConstants.xs,
		backgroundColor: "#FDF9F2",
		elevation: scale(5),
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",

		marginBottom: sizeConstants.m,
	},
	bottomSheet: {
		alignItems: "center",
		marginTop: sizeConstants.xl,
		width: "100%",
	},

	//Reoccuring Flow
	//second
	cross: {
		backgroundColor: "#538586",
		borderRadius: sizeConstants.xl,
		position: "absolute",
		right: sizeConstants.zero,
		marginRight: scale(10),
	},
	editContainer: {
		marginTop: sizeConstants.m,
		marginLeft: sizeConstants.twentyOne,
	},
	editOccuringText: {fontSize: "25@s", color: "#FDF9F2", fontWeight: "bold"},

	reoccuringDateContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginTop: sizeConstants.m,
	},
	reoccuringText: {
		fontSize: "21@s",
		alignSelf: "center",
		marginLeft: scale(20),
		color: "#FDF9F2",
		marginTop: sizeConstants.m,
	},
	doneText: {
		fontSize: "14@s",
		color: "#FDF9F2",
		position: "absolute",
		left: sizeConstants.xxxl,
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#588C8D",
		borderColor: "#FDF9F2",
		marginBottom: sizeConstants.xl,
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
	titleContainer: {
		height: scale(90) - Constants.statusBarHeight,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#FBF5E9",
		borderTopRightRadius: sizeConstants.seventy,
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
		fontSize: "25@s",
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
		marginLeft: scale(65), //TODO
		marginTop: sizeConstants.xl,
		// backgroundColor: "green",
	},
	goalText: {
		fontSize: "16@s",
		color: "#666666",
		textAlign: "center",
		maxWidth: scale(100),

		// backgroundColor: "blue",
	},
	circleLogo: {
		height: sizeConstants.hundred,
		width: sizeConstants.hundred,
		borderRadius: sizeConstants.fifty,
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
		borderRadius: sizeConstants.seventyFive / sizeConstants.xs,
		backgroundColor: "#7EC8C9",
		elevation: sizeConstants.s,
		justifyContent: "center",
		alignItems: "center",
	},
})
