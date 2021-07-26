import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native"
import {Feather} from "@expo/vector-icons"
import Swipeout from "rc-swipeout"
import {MaterialCommunityIcons, AntDesign, MaterialIcons} from "@expo/vector-icons"
import {ColorConstants, sizeConstants} from "./../core/styles"
import {useNavigation} from "@react-navigation/native"
import {setClickedMilestone} from "./../redux/actions"
import {connect} from "react-redux"

const MilestoneCards = ({
	data,
	setClickedMilestone,
	clickedMilestone,
	style,
	fromParticularData,
	fromIndividual,
}) => {
	const navigation = useNavigation()

	const [upDown, setUpDown] = useState(false)
	console.log("FROM MILESTONE CARD", fromParticularData)
	if (fromParticularData !== null && fromParticularData !== undefined) {
		data = fromParticularData[fromParticularData.length - 1]
	}

	if (fromIndividual !== null && fromIndividual !== undefined) {
		data = fromIndividual[fromIndividual.length - 1]
	}

	const emptyComponent = () => {
		return (
			<View style={styles.accordian}>
				<Text style={{padding: 15, backgroundColor: ColorConstants.lightestBlue}}>
					There are no tasks for this milestone
				</Text>
			</View>
		)
	}
	return (
		<View>
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
							text: <MaterialCommunityIcons name="plus" size={40} color="#77777B" />,
							onPress: () => {},
							style: {backgroundColor: ColorConstants.faintWhite},
						},
					]}
					// onOpen={() => console.log("open")}
					// onClose={() => console.log("close")}
					autoClose={true}
					disabled={false}
				>
					<View style={[styles.swipableBtnContainer]}>
						<TouchableOpacity
							style={[styles.TouchContainer, style]}
							onPress={() => setUpDown(!upDown)}
						>
							<View>
								<Text style={styles.mainTitle}>{data && data.milestone}</Text>
								<Text style={styles.subtitle}>{data && data.date}</Text>
							</View>
							<View style={{alignItems: "center"}}>
								<Text style={{fontSize: 16}}>{`Task: 0/${
									data && data.taskData && data.taskData.length
								}`}</Text>
								<Feather name={upDown ? "chevron-up" : "chevron-down"} size={25} color="black" />
							</View>
						</TouchableOpacity>
					</View>
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
						console.log("FlatList", item)
						return (
							<TouchableOpacity
								style={styles.accordian}
								onPress={() => navigation.navigate("firsttaskflow")}
							>
								<View>
									<Text style={styles.mainTitle}>{item.item.task}</Text>
									<Text style={styles.subtitle}>{item.item.date}</Text>
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
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setClickedMilestone: (task) => dispatch(setClickedMilestone(task)),
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
		backgroundColor: ColorConstants.lighterBlue,
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
		width: "75%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		borderRadius: 20,
		marginTop: 10,
		marginLeft: 50,
	},
	swipeButton: {
		alignContent: "center",
		borderRadius: sizeConstants.twentyTwo,
		overflow: "hidden",
		marginHorizontal: sizeConstants.twentyOne,
		justifyContent: "center",
		marginTop: sizeConstants.fifty,
	},
})
