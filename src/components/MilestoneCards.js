import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {Feather} from "@expo/vector-icons"

const MilestoneCards = () => {
	const [upDown, setUpDown] = useState(false)
	return (
		<View style={styles.mileStones}>
			<TouchableOpacity style={styles.TouchContainer} onPress={() => setUpDown(!upDown)}>
				<View>
					<Text style={styles.mainTitle}>Read 5 books</Text>
					<Text style={styles.subtitle}>Sat, Nov 14</Text>
				</View>
				<View style={{alignItems: "center"}}>
					<Text style={{fontSize: 16}}>Task: 0/1</Text>
					<Feather name={upDown ? "chevron-up" : "chevron-down"} size={25} color="black" />
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default MilestoneCards

const styles = StyleSheet.create({
	mileStones: {
		alignItems: "center",
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
	},
})
