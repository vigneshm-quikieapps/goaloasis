import React, {useEffect, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, ScrollView} from "react-native"
import {Feather} from "@expo/vector-icons"
import Swipeout from "rc-swipeout"
import {MaterialCommunityIcons, AntDesign, MaterialIcons, Octicons} from "@expo/vector-icons"
import {ColorConstants, commonDateFormat, sizeConstants} from "../core/constants"
import {useNavigation} from "@react-navigation/native"
import {setClickedGoal, setClickedMilestone, setShowLoader} from "./../redux/actions"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"

import {connect} from "react-redux"
import {addMilestoneToFirestore} from "./../firebase/index"
import {SnoozeIcon} from "../assets/customIcons"
import dayjs from "dayjs"
import PushNotification, {Importance} from "react-native-push-notification"

const MilestoneCards = ({
	data,
	setClickedMilestone,
	setClickedGoal,
	clickedMilestone,
	clickedGoal,
	style,
	allGoals,
	setShowLoader,
	loading,
}) => {
	const navigation = useNavigation()
	const [isMilestoneCompleted, setIsMilestoneCompleted] = useState(false)
	// console.log("CLICKED GOAL", clickedGoal.goalMilestone[0].taskData)
	const icons = (milestoneObj) => (
		<View style={{flexDirection: "row", justifyContent: "space-between"}}>
			<TouchableOpacity
				onPress={() => {
					deleteMilestoneAlert(milestoneObj.milestone)
				}}
			>
				<MaterialCommunityIcons name="delete" size={30} color="#77777B" style={{marginRight: 0}} />
			</TouchableOpacity>

			<View style={{height: 40, width: 3, backgroundColor: "#77777B", borderRadius: 20}} />
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("EditMilestone", {
						milestoneName: milestoneObj.milestone,
						date: milestoneObj.date,
					})
				}}
			>
				<Octicons name="pencil" size={30} color="#77777B" style={{marginLeft: 4}} />
			</TouchableOpacity>
		</View>
	)

	const deleteTaskIcon = (task, milestone) => (
		<View>
			<TouchableOpacity
				onPress={() => {
					deleteTaskAlert(task, milestone)
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

	const deleteMilestoneAlert = (milestoneName) => {
		return Alert.alert(milestoneName, "Delete this milestone?", [
			{
				text: "No",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: () => {
					setShowLoader(true)
					let filteredMilestoneArr = clickedGoal.goalMilestone.filter(
						(mile) => mile.milestone != milestoneName
					)
					let updatedObj = {
						...clickedGoal,
						goalMilestone: filteredMilestoneArr,
					}

					addMilestoneToFirestore(clickedGoal, filteredMilestoneArr, () => {
						setShowLoader(false)

						setClickedGoal(updatedObj)
						let milesCount = updatedObj.goalMilestone.length
						milesCount
							? navigation.navigate("particulargoal")
							: navigation.navigate("DParticularGoal")
					})
				},
			},
		])
	}

	const deleteTaskAlert = (taskName, milestone) => {
		console.log("deletingggg")
		return Alert.alert(taskName, "Delete this Task?", [
			{
				text: "No",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: () => {
					handleTaskDelete(taskName, milestone)
				},
			},
		])
	}
	const onLongPress = (event, name) => {
		if (event === "allTasksCompleted" || event.nativeEvent.state === State.ACTIVE) {
			// clickedGoal.goalMilestone[clickedGoal.goalMilestone.length - 1].isCompleted = true
			console.log("CAME HERE")
			let newMilestone = clickedGoal.goalMilestone.map((item) => {
				if (item.milestone === name) {
					return {
						...item,
						isCompleted: true,
						taskData: item.taskData.map((task) => {
							return {
								...task,
								isCompleted: true,
							}
						}),
					}
				} else {
					return item
				}
			})
			let updatedObj = {
				...clickedGoal,
				goalMilestone: newMilestone,
			}
			// PushNotification.localNotification({
			// 	channelId: "com.goal-oasis",
			// 	ticker: "My Notification Ticker",
			// 	id: 0,
			// 	title: "Congratulations",
			// 	message: `Your ${name} Milestone is Completed`,
			// })

			addMilestoneToFirestore(clickedGoal, newMilestone, () => {
				setClickedGoal(updatedObj)
			})
		}
	}
	handleTaskLongPress = (event, clickedTask, currentMilestone) => {
		if (event.nativeEvent.state === State.ACTIVE) {
			let newMilestone = clickedGoal.goalMilestone.map((item) => {
				if (item.milestone === currentMilestone) {
					return {
						...item,
						taskData: item.taskData.map((task) => {
							if (task.task == clickedTask) {
								return {
									...task,
									isCompleted: true,
								}
							}
							return task
						}),
					}
				}
				return item
			})
			let updatedObj = {
				...clickedGoal,
				goalMilestone: newMilestone,
			}

			addMilestoneToFirestore(clickedGoal, newMilestone, () => {
				setClickedGoal(updatedObj)
			})
		}
	}
	if (data && data.isCompleted) {
		data.taskData.map((i) => {})
	}
	handleTaskDelete = (clickedTask, currentMilestone) => {
		let newMilestone = clickedGoal.goalMilestone.map((item) => {
			if (item.milestone === currentMilestone) {
				return {
					...item,
					taskData: item.taskData.filter((task) => {
						return task.task != clickedTask
					}),
				}
			}
			return item
		})
		let updatedObj = {
			...clickedGoal,
			goalMilestone: newMilestone,
		}

		addMilestoneToFirestore(clickedGoal, newMilestone, () => {
			setClickedGoal(updatedObj)
		})
	}
	const [upDown, setUpDown] = useState(false)
	const [upDown1, setUpDown1] = useState(false)
	const [allIncompleteTasks, setAllIncompleteTasks] = useState([])
	const [allCompleteTasks, setAllCompleteTasks] = useState([])
	const [firstCompletedTask, setFirstCompletedTask] = useState({})

	const emptyComponent = () => {
		return (
			<View style={[styles.accordian, {alignSelf: "flex-end"}]}>
				<Text style={{padding: 15, backgroundColor: ColorConstants.lightestBlue}}>
					There are no tasks for this milestone
				</Text>
			</View>
		)
	}

	var milestoneDate = data ? dayjs(data.date).format(commonDateFormat) : ""
	let completedTasks =
		data &&
		data.taskData &&
		data.taskData.length &&
		data.taskData.filter((task) => task.isCompleted === true)
	let completedTaskCount = completedTasks && completedTasks.length
	let totalTasks = data && data.taskData && data.taskData.length

	useEffect(() => {
		if (data && !data.isCompleted) {
			var crntMile = clickedGoal.goalMilestone.find((mile) => mile.milestone == data.milestone)
			var totalTaskCount = crntMile && crntMile.taskData.length

			if (totalTaskCount && completedTasks && totalTaskCount === completedTasks.length) {
				PushNotification.localNotification({
					channelId: "com.goal-oasis",
					ticker: "My Notification Ticker",
					id: 0,
					title: "Congratulations",
					message: `Your ${crntMile.milestone} Milestone is Completed`,
				})
				onLongPress("allTasksCompleted", crntMile.milestone)
			}
		}

		getDataAboutCurrentMilestone()
	}, [clickedGoal, allGoals])

	const getDataAboutCurrentMilestone = () => {
		if (data && !data.isCompleted) {
			var crntMile = clickedGoal.goalMilestone.find((mile) => mile.milestone == data.milestone)
			var allCompletedTask = []
			var inCompletedTasks = []

			crntMile &&
				crntMile.taskData.forEach((tsk) => {
					if (tsk.isCompleted == true) {
						allCompletedTask.push(tsk)
					} else {
						inCompletedTasks.push(tsk)
					}
				})

			setAllIncompleteTasks(inCompletedTasks)

			setAllCompleteTasks(
				allCompletedTask.filter((task, index) => {
					console.log("task filter", index != 0)
					return index != 0
				})
			)
			setFirstCompletedTask(allCompletedTask.length ? completedTasks[0] : {})
		}
	}

	return (
		<View
			style={{
				marginHorizontal: sizeConstants.twentyOne,
			}}
		>
			<View style={[styles.swipeButton, style]}>
				<Swipeout
					left={[
						{
							text: <MaterialCommunityIcons name="plus" size={40} color="#77777B" />,
							onPress: () => {
								data && data.milestone && setClickedMilestone(data.milestone)
								navigation.navigate("firsttaskflow")
							},
							style: {backgroundColor: ColorConstants.faintWhite},
						},
					]}
					right={[
						{
							text: icons(data && {milestone: data.milestone, date: data.date}),

							onPress: () => {},
							style: {backgroundColor: ColorConstants.faintWhite},
						},
					]}
					// onOpen={() => console.log("open")}
					// onClose={() => console.log("close")}
					autoClose={true}
					disabled={false}
				>
					<LongPressGestureHandler
						onHandlerStateChange={(event) => {
							onLongPress(event, data.milestone)
						}}
						minDurationMs={800}
					>
						<View style={[styles.swipableBtnContainer]}>
							<TouchableOpacity
								style={[styles.TouchContainer, style]}
								onPress={() => {
									if (!data.isCompleted) {
										getDataAboutCurrentMilestone()
										setUpDown1(false)
										setUpDown(!upDown)
										console.log(
											"allIncompleteTasks gggggggggggggggggggggg",
											allIncompleteTasks.length
										)

										console.log("working 1")
									} else {
										let temp = []
										var temp1 = clickedGoal.goalMilestone.find(
											(mile) => mile.milestone == data.milestone
										)

										temp1 &&
											temp1.taskData.forEach((tsk) => {
												if (tsk.isCompleted == true) {
													temp.push(tsk)
												}
											})

										setAllCompleteTasks(temp)
										console.log("allIncompleteTasks", allCompleteTasks.length)
										setUpDown1(!upDown1)
										setUpDown(false)

										console.log("working 2")
									}
									console.log("working 3")
								}}
							>
								<ScrollView>
									<Text style={styles.mainTitle}>{data && data.milestone}</Text>
									<Text style={styles.subtitle}>{milestoneDate}</Text>
								</ScrollView>

								{data && !data.isCompleted ? (
									<View style={{alignItems: "center"}}>
										<Text
											style={{fontSize: sizeConstants.fourteenScale, color: "#333333"}} //16
										>{`Task: ${completedTaskCount}/${totalTasks}`}</Text>
										<Feather
											name={upDown ? "chevron-up" : "chevron-down"}
											size={25}
											color="black"
										/>
									</View>
								) : (
									<View style={{alignItems: "center"}}>
										<Text style={{color: ColorConstants.gray, fontWeight: "bold"}}>
											MILESTONE COMPLETED
										</Text>
									</View>
								)}
							</TouchableOpacity>
						</View>
					</LongPressGestureHandler>
				</Swipeout>
			</View>

			{upDown && allIncompleteTasks && allIncompleteTasks.length ? (
				<FlatList
					data={allIncompleteTasks}
					listKey={(item, index) => {
						return (
							this.props.index + "_" + index + "_" + item.id + "_" + moment().valueOf().toString()
						)
					}}
					ListEmptyComponent={emptyComponent}
					renderItem={(item) => {
						let dateStr = dayjs(item.item.date).format(commonDateFormat)
						let bottomItem = item.item.reoccuring
							? item.item.reoccuring.reoccuringType == "Daily"
								? "Reoccuring Daily"
								: dateStr
							: dateStr

						return (
							<View style={[styles.swipeButton, styles.taskAccordion]}>
								<Swipeout
									left={[
										{
											text: (
												<SnoozeIcon
													bgColor={ColorConstants.snoozeIconBg}
													color={ColorConstants.faintWhite}
												/>
											),
											onPress: () => {
												console.log("Snoozziingg")
											},
											style: {backgroundColor: ColorConstants.snoozeIconBg},
										},
									]}
									right={[
										{
											text: deleteTaskIcon(item.item.task, data.milestone),

											onPress: () => {
												deleteTaskAlert(item.item.task, data.milestone)
											},
											style: {backgroundColor: ColorConstants.snoozeIconBg},
										},
									]}
									style={{backgroundColor: "#CDE8E6"}}
									// onOpen={() => console.log("open")}
									// onClose={() => console.log("close")}
									autoClose={true}
									disabled={false}
								>
									<LongPressGestureHandler
										onHandlerStateChange={(event) => {
											handleTaskLongPress(event, item.item.task, data.milestone)
										}}
										minDurationMs={800}
									>
										<View style={[styles.swipableBtnContainer]}>
											<TouchableOpacity
												style={[styles.TouchContainer, style, styles.back2]}
												onPress={() => {}}
											>
												<View>
													<Text style={[styles.mainTitleTask]}>{item.item.task}</Text>

													<Text style={styles.subtitleTask}>{bottomItem}</Text>
												</View>
											</TouchableOpacity>
										</View>
									</LongPressGestureHandler>
								</Swipeout>
							</View>
						)
					}}
					keyExtractor={(item) => item.milestone}
					extraData={null}
				/>
			) : null}

			{/* FOR COMPLETED TASKS */}

			{upDown1 && allCompleteTasks && allCompleteTasks.length ? (
				<FlatList
					data={allCompleteTasks}
					listKey={(item, index) => {
						return index + "_" + item.id + "_" + moment().valueOf().toString()
					}}
					renderItem={(item) => {
						let dateStr = dayjs(item.item.date).format(commonDateFormat)
						let bottomItem = item.item.reoccuring
							? item.item.reoccuring.reoccuringType == "Daily"
								? "Reoccuring Daily"
								: dateStr
							: dateStr

						return (
							<View style={[styles.swipeButton, styles.taskAccordion]}>
								<Swipeout
									left={[
										{
											text: (
												<SnoozeIcon
													bgColor={ColorConstants.snoozeIconBg}
													color={ColorConstants.faintWhite}
												/>
											),
											onPress: () => {
												console.log("Snoozziingg")
											},
											style: {backgroundColor: ColorConstants.snoozeIconBg},
										},
									]}
									right={[
										{
											text: deleteTaskIcon(item.item.task, data.milestone),

											onPress: () => {
												deleteTaskAlert(item.item.task, data.milestone)
											},
											style: {backgroundColor: ColorConstants.snoozeIconBg},
										},
									]}
									style={{backgroundColor: "#CDE8E6"}}
									autoClose={true}
									disabled={false}
								>
									<LongPressGestureHandler
										onHandlerStateChange={(event) => {
											handleTaskLongPress(event, item.item.task, data.milestone)
										}}
										minDurationMs={800}
									>
										<View style={[styles.swipableBtnContainer]}>
											<TouchableOpacity
												style={[styles.TouchContainer, style, styles.back]}
												onPress={() => {}}
											>
												<View>
													<Text style={[styles.mainTitleTask]}>Completed Task</Text>
													<Text style={styles.subtitleTask}>{bottomItem}</Text>
												</View>
											</TouchableOpacity>
										</View>
									</LongPressGestureHandler>
								</Swipeout>
							</View>
						)
					}}
					keyExtractor={(item) => item.milestone}
					extraData={null}
				/>
			) : null}

			{/* {upDown && firstCompletedTask.task ? (  */}
			{upDown && firstCompletedTask && firstCompletedTask.task ? (
				<View style={[styles.swipeButton, styles.taskAccordion]}>
					<Swipeout
						left={[
							{
								text: (
									<SnoozeIcon
										bgColor={ColorConstants.snoozeIconBg}
										color={ColorConstants.faintWhite}
									/>
								),
								onPress: () => {
									console.log("Snoozziingg")
								},
								style: {backgroundColor: ColorConstants.snoozeIconBg},
							},
						]}
						right={[
							{
								text: deleteTaskIcon(firstCompletedTask.task, data && data.milestone),

								onPress: () => {
									deleteTaskAlert(firstCompletedTask.task, data && data.milestone)
								},
								style: {backgroundColor: ColorConstants.snoozeIconBg},
							},
						]}
						style={{backgroundColor: "#CDE8E6"}}
						autoClose={true}
						disabled={false}
					>
						<LongPressGestureHandler
							onHandlerStateChange={(event) => {
								handleTaskLongPress(event, firstCompletedTask.task, data && data.milestone)
							}}
							minDurationMs={800}
						>
							<View style={[styles.swipableBtnContainer]}>
								<TouchableOpacity
									style={[styles.TouchContainer, style, styles.back]}
									onPress={() => {
										getDataAboutCurrentMilestone()

										setUpDown1(!upDown1)
									}}
								>
									<View>
										<Text style={[styles.mainTitleTask]}>Completed Task</Text>
										<Text style={styles.subtitleTask}>
											{firstCompletedTask.reoccuring
												? firstCompletedTask.reoccuring.reoccuringType == "Daily"
													? "Reoccuring Daily"
													: dayjs(firstCompletedTask.date).format(commonDateFormat)
												: dayjs(firstCompletedTask.date).format(commonDateFormat)}
										</Text>
									</View>
									<Feather name={upDown1 ? "chevron-up" : "chevron-down"} size={25} color="black" />
								</TouchableOpacity>
							</View>
						</LongPressGestureHandler>
					</Swipeout>
				</View>
			) : null}
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedMilestone: state.milestone.clickedMilestone,
		clickedGoal: state.milestone.clickedGoal,
		loading: state.milestone.loading,
		allGoals: state.milestone.allGoals,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setClickedMilestone: (task) => dispatch(setClickedMilestone(task)),
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
		},
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},

		setClickedGoal: (task) => dispatch(setClickedGoal(task)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MilestoneCards)

const styles = StyleSheet.create({
	mileStones: {
		alignItems: "center",
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
		paddingHorizontal: sizeConstants.twentyOneScale,
	},
	mainTitle: {
		fontSize: sizeConstants.eighteenScale, //19
		fontWeight: "bold",
		color: "#333333",
	},
	subtitle: {
		fontSize: sizeConstants.fourteenScale, //16
		color: "#333333",
	},

	mainTitleTask: {
		fontSize: sizeConstants.sixteenX, //19
		fontWeight: "bold",
		color: "#333333",
	},
	subtitleTask: {
		fontSize: sizeConstants.twelveScale, //16
		color: "#333333",
	},
	accordian: {
		backgroundColor: "#CDE8E6",
		height: sizeConstants.seventy,
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: sizeConstants.twentyX,
		borderRadius: sizeConstants.twentyX,
		marginTop: sizeConstants.xl,
		marginLeft: sizeConstants.xxxlScale,
	},
	taskAccordion: {
		backgroundColor: "#CDE8E6",
		height: sizeConstants.seventy,
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end",
		borderRadius: sizeConstants.twentyX,
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
	btnTextCompleted: {
		fontSize: sizeConstants.fourteenScale, //19

		color: ColorConstants.faintBlack2,
		letterSpacing: 1.2,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
	},
	back: {
		backgroundColor: "#CDE8E6",
	},

	back2: {
		backgroundColor: "#7EC8C9",
	},
})
