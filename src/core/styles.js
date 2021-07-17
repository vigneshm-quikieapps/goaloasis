import {StyleSheet} from "react-native"
import {ScaledSheet, verticalScale, moderateScale} from "react-native-size-matters"
import Constants from "expo-constants"

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

	title: {
		fontSize: 25,
		textAlign: "left",
		fontWeight: "bold",
		color: ColorConstants.white,
	},

	subTitle: {
		fontSize: 19,
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
})
