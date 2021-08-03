import React, {useState, useRef, useEffect} from "react"
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList} from "react-native"
import {Feather} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import MilestoneCards from "./MilestoneCards"
import {connect} from "react-redux"
import {getClickedGoalFromAsyncStorage} from "../utils/asyncStorage"
import {sizeConstants, ColorConstants} from "../core/constants"

const AllMilestones = ({data, boolean}) => {
	const [upDown, setUpDown] = useState(false)
	const [upDownTwo, setUpDownTwo] = useState(false)
	const [upDown3, setUpDown3] = useState(false)
	const [upDown4, setUpDown4] = useState(false)
	const panelRef = useRef(null)
	const navigation = useNavigation()
	const [selectedId, setSelectedId] = useState(null)

	console.log(data)

	return (
		<View
			style={{
				overflow: "hidden",
				marginBottom: sizeConstants.hundred,
			}}
		>
			<FlatList
				data={data}
				renderItem={(item) => {
					return (
						<View>
							<MilestoneCards data={item.item} />
						</View>
					)
				}}
				keyExtractor={(item) => item.index}
				extraData={selectedId}
			/>
			<View
				style={{
					position: "absolute",
					borderLeftColor: ColorConstants.blackOp60,
					borderStartWidth: 2,
					top: sizeConstants.xxl,
					height: "100%",
					alignSelf: "center",
					width: "50%",
					// left: sizeConstants.negativeTen,
					zIndex: -1,
				}}
			></View>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		clickedGoal: state.milestone.clickedGoal,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMilestones)

const styles = StyleSheet.create({
	mileStones: {
		alignItems: "center",
		marginVertical: 10,
	},
	TouchContainer: {
		width: "90%",
		backgroundColor: "#FDF9F2",
		height: 83,
		borderRadius: 20,
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
		marginVertical: 10,
	},
})
