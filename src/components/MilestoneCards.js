import React, {useEffect, useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Alert} from "react-native"
import {Feather} from "@expo/vector-icons"
import Swipeout from "rc-swipeout"
import {MaterialCommunityIcons, AntDesign, MaterialIcons, Octicons} from "@expo/vector-icons"
import {ColorConstants, sizeConstants} from "./../core/styles"
import {useNavigation} from "@react-navigation/native"
import {setClickedGoal, setClickedMilestone} from "./../redux/actions"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"

import {connect} from "react-redux"
import {addMilestoneToFirestore} from "./../firebase/index"
import {convertToDateString} from "../core/CommonComponents"
import {SnoozeIcon} from "../assets/customIcons"

const MilestoneCards = ({
	data,
	setClickedMilestone,
	setClickedGoal,
	clickedMilestone,
	clickedGoal,
	style,
}) => {
	const navigation = useNavigation()
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
					let filteredMilestoneArr = clickedGoal.goalMilestone.filter(
						(mile) => mile.milestone != milestoneName
					)
					let updatedObj = {
						...clickedGoal,
						goalMilestone: filteredMilestoneArr,
					}
					addMilestoneToFirestore(clickedGoal, filteredMilestoneArr, () => {
						setClickedGoal(updatedObj)
						navigation.navigate("particulargoal")
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
		if (event.nativeEvent.state === State.ACTIVE) {
			// clickedGoal.goalMilestone[clickedGoal.goalMilestone.length - 1].isCompleted = true

			let newMilestone = clickedGoal.goalMilestone.map((item) => {
				if (item.milestone === name) {
					return {...item, isCompleted: true}
				} else {
					return item
				}
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

	// if (fromIndividual !== null && fromIndividual !== undefined) {
	// 	data = fromIndividual[fromIndividual.length - 1]
	// if (fromParticularData !== null && fromParticularData !== undefined) {
	// 	data = fromParticularData[fromParticularData.length - 1]
	// }

	const emptyComponent = () => {
		return (
			<View style={[styles.accordian, {alignSelf: "flex-end"}]}>
				<Text style={{padding: 15, backgroundColor: ColorConstants.lightestBlue}}>
					There are no tasks for this milestone
				</Text>
			</View>
		)
	}

	var milestoneDate = data ? convertToDateString(new Date(data.date)) : ""
	let completedTasks =
		data &&
		data.taskData &&
		data.taskData.length &&
		data.taskData.filter((task) => task.isCompleted === true)
	let completedTaskCount = completedTasks && completedTasks.length
	let totalTasks = data && data.taskData && data.taskData.length

	useEffect(() => {}, [clickedGoal])
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
								console.log("setting clicked milestone:", data && data.milestone)
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
								onPress={() => setUpDown(!upDown)}
							>
								<View>
									<Text style={styles.mainTitle}>{data && data.milestone}</Text>
									<Text style={styles.subtitle}>{milestoneDate}</Text>
								</View>

								{data && !data.isCompleted ? (
									<View style={{alignItems: "center"}}>
										<Text
											style={{fontSize: 16, color: "#333333"}}
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

			{upDown && data && (
				<FlatList
					data={data.taskData}
					listKey={(item, index) => {
						return (
							this.props.index + "_" + index + "_" + item.id + "_" + moment().valueOf().toString()
						)
					}}
					ListEmptyComponent={emptyComponent}
					renderItem={(item) => {
						let dateStr = convertToDateString(new Date(item.item.date))
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
												style={[styles.TouchContainer, style, {backgroundColor: "#CDE8E6"}]}
												onPress={() => {}}
											>
												<View>
													<Text style={styles.mainTitle}>{item.item.task}</Text>
													<Text style={styles.subtitle}>{bottomItem}</Text>
												</View>
												{item.item.isCompleted ? (
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
					}}
					keyExtractor={(item) => item.milestone}
					extraData={null}
				/>
			)}
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedMilestone: state.milestone.clickedMilestone,
		clickedGoal: state.milestone.clickedGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setClickedMilestone: (task) => dispatch(setClickedMilestone(task)),
		setClickedGoal: (data) => {
			dispatch(setClickedGoal(data))
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
		paddingHorizontal: 20,
	},
	mainTitle: {
		fontSize: 19,
		fontWeight: "bold",
		color: "#333333",
	},
	subtitle: {
		fontSize: 16,
		color: "#333333",
	},
	accordian: {
		backgroundColor: "#CDE8E6",
		height: 70,
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		borderRadius: 20,
		marginTop: sizeConstants.xl,
		marginLeft: 50,
	},
	taskAccordion: {
		backgroundColor: "#CDE8E6",
		height: 70,
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end",
		borderRadius: 20,
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
})
