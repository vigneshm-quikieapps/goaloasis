import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native"
import {Feather} from "@expo/vector-icons"
import Swipeout from "rc-swipeout"
import {MaterialCommunityIcons, AntDesign, MaterialIcons, Octicons} from "@expo/vector-icons"
import {ColorConstants, sizeConstants} from "./../core/styles"
import {useNavigation} from "@react-navigation/native"
import {setClickedMilestone} from "./../redux/actions"
import {LongPressGestureHandler, State} from "react-native-gesture-handler"

import {connect} from "react-redux"
import {addMilestoneToFirestore} from "./../firebase/index"

const MilestoneCards = ({
	data,
	setClickedMilestone,
	clickedMilestone,
	style,
	fromParticularData,
	fromIndividual,
	clickedGoal,
}) => {
	const [taskCompleted, setCompleted] = useState(true)
	const navigation = useNavigation()
	if (fromParticularData !== null && fromParticularData !== undefined) {
		data = fromParticularData[fromParticularData.length - 1]
	}

	// console.log("CLICKED GOAL", clickedGoal.goalMilestone[0])
	// console.log("FROM PARTICULAR", data)
	// console.log("FROM ALL MILESTONE", data)

	const icons = () => (
		<View style={{flexDirection: "row", justifyContent: "space-between"}}>
			<MaterialCommunityIcons name="delete" size={30} color="#77777B" style={{marginRight: 0}} />
			<View style={{height: 40, width: 4, backgroundColor: "#77777B", borderRadius: 20}} />
			<Octicons name="pencil" size={30} color="#77777B" style={{marginLeft: 4}} />
		</View>
	)

	let mileStoneArray = []
	mileStoneArray.push(clickedGoal.goalMilestone)

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
			console.log("qwerty", updatedObj)

			addMilestoneToFirestore(clickedGoal, newMilestone, () => {
				console.log("UPDATED", newMilestone)
				setClickedGoal(updatedObj)
			})

			setCompleted(!taskCompleted)
		}
	}

	const [upDown, setUpDown] = useState(false)

	// if (fromIndividual !== null && fromIndividual !== undefined) {
	// 	data = fromIndividual[fromIndividual.length - 1]
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
							text: icons(),

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
										<Text style={{fontSize: 16}}>{`Task: 0/${
											data && data.taskData && data.taskData.length
										}`}</Text>
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
						console.log("FlatList", item.item.reoccuring)
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
		color: "black",
	},
	subtitle: {
		fontSize: 16,
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
