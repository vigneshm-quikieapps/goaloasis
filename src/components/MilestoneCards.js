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

const MilestoneCards = ({
	data,
	setClickedMilestone,
	setClickedGoal,
	clickedMilestone,
	clickedGoal,
	style,
}) => {
	useEffect(() => {}, [clickedGoal])
	const [taskCompleted, setCompleted] = useState(true)
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

	let mileStoneArray = []
	mileStoneArray.push(clickedGoal.goalMilestone)

	const deleteMilestoneAlert = (milestoneName) => {
		console.log("clicked mile name: ", milestoneName)
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
					})
					console.log("clickedGoal", updatedObj)
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

			setCompleted(!taskCompleted)
		}
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
	console.log("cards: ", data && data.taskData && data.taskData.length)
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
						{/* {taskCompleted && !boolean */}
						<View style={[styles.swipableBtnContainer]}>
							<TouchableOpacity
								style={[styles.TouchContainer, style]}
								onPress={() => setUpDown(!upDown)}
							>
								<View>
									<Text style={styles.mainTitle}>{data && data.milestone}</Text>
									<Text style={styles.subtitle}>{data && data.date}</Text>
								</View>

								{taskCompleted && data && !data.isCompleted ? (
									<View style={{alignItems: "center"}}>
										<Text
											style={{fontSize: 16, color: "#333333"}}
										>{`Task: 0/${data.taskData.length}`}</Text>
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
			{/* {console.log("TESTINGNGNGNG", clickedMilestone)} */}
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
						let bottomItem = item.item.reoccuring
							? item.item.reoccuring.reoccuringType == "Daily"
								? "Reoccuring Daily"
								: item.item.date
							: item.item.date
						return (
							<TouchableOpacity
								style={[styles.accordian, {alignSelf: "flex-end"}]}
								onPress={() => navigation.navigate("firsttaskflow")}
							>
								<View>
									<Text style={styles.mainTitle}>{item.item.task}</Text>
									<Text style={styles.subtitle}>{bottomItem}</Text>
								</View>
							</TouchableOpacity>
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

	swipeButton: {
		alignContent: "center",
		borderRadius: sizeConstants.twentyTwo,
		overflow: "hidden",
		justifyContent: "center",
		marginTop: sizeConstants.xxl,
		shadowColor: ColorConstants.darkGrey,
		shadowRadius: sizeConstants.twentyTwo,
		shadowOffset: {width: 5, height: 5},
		shadowOpacity: 0.5,
		elevation: 10,
	},
})
