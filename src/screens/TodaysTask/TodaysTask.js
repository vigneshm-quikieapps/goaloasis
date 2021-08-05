import React, {useEffect} from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	TouchableWithoutFeedback,
	StatusBar,
	ImageBackground,
	ScrollView,
	Alert,
	FlatList,
} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {FontAwesome5, Entypo, AntDesign} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import Constants from "expo-constants"
import {LongPressGestureHandler} from "react-native-gesture-handler"
import {ColorConstants, sizeConstants} from "../../core/constants"
import {SnoozeIcon} from "../../assets/customIcons"
import Swipeout from "rc-swipeout"
import {connect} from "react-redux"

const TodaysTask = ({todayAllTasksArr}) => {
	const navigation = useNavigation()
	const backImg = require("./../../assets/images/third.png")

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	const deleteTaskAlert = (taskName) => {
		console.log("deletingggg")
		return Alert.alert(taskName, "Delete this Task?", [
			{
				text: "No",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: () => {},
			},
		])
	}
	const deleteTaskIcon = (task) => (
		<View>
			<TouchableOpacity
				onPress={() => {
					deleteTaskAlert(task)
				}}
			>
				<MaterialCommunityIcons
					name="delete"
					size={30}
					color={ColorConstants.faintWhite}
					style={{marginRight: 0}}
				/>
			</TouchableOpacity>
		</View>
	)

	const renderItem = ({item}) => (
		<View style={[styles.swipeButton, styles.taskAccordion]}>
			<Swipeout
				left={[
					{
						text: (
							<SnoozeIcon bgColor={ColorConstants.snoozeIconBg} color={ColorConstants.faintWhite} />
						),
						onPress: () => {
							console.log("Snoozziingg")
						},
						style: {backgroundColor: ColorConstants.snoozeIconBg},
					},
				]}
				right={[
					{
						text: deleteTaskIcon(item.task),

						onPress: () => {},
						style: {backgroundColor: ColorConstants.snoozeIconBg},
					},
				]}
				style={{backgroundColor: "#CDE8E6"}}
				// onOpen={() => console.log("open")}
				// onClose={() => console.log("close")}
				autoClose={true}
				disabled={false}
			>
				<LongPressGestureHandler onHandlerStateChange={(event) => {}} minDurationMs={800}>
					<View style={[styles.swipableBtnContainer]}>
						<TouchableOpacity
							style={[styles.TouchContainer, {backgroundColor: "#CDE8E6"}]}
							onPress={() => {}}
						>
							<View>
								<Text style={styles.mainTitleButton}>{item.task}</Text>
							</View>
							{item.isCompleted ? (
								<View>
									<Text style={{color: ColorConstants.gray, fontWeight: "bold"}}>
										TASK COMPLETED
									</Text>
								</View>
							) : null}
						</TouchableOpacity>
					</View>
				</LongPressGestureHandler>
			</Swipeout>
		</View>
	)

	return (
		<StatusBarScreen style={styles.container}>
			<ImageBackground style={styles.container} source={backImg} resizeMode="stretch">
				<TouchableOpacity style={styles.titleContainer}>
					<Text style={styles.mainTitle}>Today’s tasks</Text>
				</TouchableOpacity>
				<FlatList
					data={todayAllTasksArr}
					renderItem={renderItem}
					keyExtractor={(item, key) => `${item.task}_${key}`}
				/>
				<View style={styles.queIcon}>
					<AntDesign name="questioncircleo" size={50} color={"#fff"} />
				</View>

				<View style={styles.bottomContainer}>
					<TouchableOpacity onPress={gotoHome}>
						<View
							style={[
								styles.circleLogo,
								{
									transform: [{translateY: -38}],
								},
							]}
						>
							<Entypo name="home" size={40} color="#7ec8c9" style={{zIndex: -1}} />
						</View>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {todayAllTasksArr: state.milestone.todayAllTasksArr}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(TodaysTask)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#588C8D",
	},
	btnContainer: {
		marginLeft: 20,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	btnStyling: {
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "white",
		width: 314,
		height: 50,
		paddingLeft: 20,
		borderRadius: 51,
	},
	btnText: {
		fontSize: sizeConstants.eighteenScale, //19
		color: "#666666",
		letterSpacing: 1.2,
	},
	titleContainer: {
		height: 95 - Constants.statusBarHeight,
		backgroundColor: "#588C8D",
		justifyContent: "center",
	},
	mainTitle: {
		color: "#FBF5E9",
		fontSize: sizeConstants.twentyTwoScale, //25
		fontWeight: "bold",
		marginLeft: 20,
		marginVertical: 30,
	},

	circleLogo: {
		height: 70,
		width: 70,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: "#7ec8c9",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},

	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#7EC8C9",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	bottomContainer: {
		height: 90,
		backgroundColor: "#fff",
		borderTopEndRadius: 60,

		alignItems: "center",
	},
	queIcon: {
		padding: 30,
		alignItems: "flex-end",
	},

	taskAccordion: {
		height: 50,
		backgroundColor: "#CDE8E6",
		paddingVertical: sizeConstants.s,
		width: "85%",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		borderRadius: sizeConstants.eightyFive,
		marginTop: sizeConstants.xl,
		elevation: 0,
	},
	swipeButton: {
		alignContent: "center",
		borderRadius: sizeConstants.twentyTwo,
		overflow: "hidden",
		justifyContent: "center",
		marginTop: sizeConstants.xxl,
		elevation: 10,
	},

	swipableBtnContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: sizeConstants.hundredMX,
		justifyContent: "center",
	},
	TouchContainer: {
		width: "100%",
		backgroundColor: "#FDF9F2",
		height: sizeConstants.hundredMX,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	mainTitleButton: {
		fontSize: sizeConstants.eighteenScale, //19
		fontWeight: "bold",
		color: "#333333",
	},
})
