import React, {useState, useRef} from "react"
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList} from "react-native"
import {Feather} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import MilestoneCards from "./MilestoneCards"

const AllMilestones = () => {
	const [upDown, setUpDown] = useState(false)
	const [upDownTwo, setUpDownTwo] = useState(false)
	const [upDown3, setUpDown3] = useState(false)
	const [upDown4, setUpDown4] = useState(false)
	const panelRef = useRef(null)
	const navigation = useNavigation()
	const [selectedId, setSelectedId] = useState(null)

	const DATA = [
		{
			id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
			title: "First Item",
		},
		{
			id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
			title: "Second Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
			title: "First Item",
		},
		{
			id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
			title: "Second Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
	]

	return (
		<>
			<FlatList
				data={DATA}
				renderItem={() => <MilestoneCards />}
				keyExtractor={(item) => item.id}
				extraData={selectedId}
			/>
		</>
	)
}

export default AllMilestones

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
