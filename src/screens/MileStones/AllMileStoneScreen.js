import React, {useRef} from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import AllMilestones from "../../components/AllMilestones"
import RBSheet from "react-native-raw-bottom-sheet"
import StatusBarScreen from "./StatusBarScreen"

const AllMilestonesScreen = () => {
	const refRBSheet = useRef()

	const navigation = useNavigation()

	return (
		<StatusBarScreen style={styles.container}>
			<TouchableOpacity onPress={() => refRBSheet.current.open()}>
				<View style={{justifyContent: "flex-end", flexDirection: "row", margin: 20}}>
					<View
						style={{backgroundColor: "black", height: 8, width: 8, borderRadius: 4, margin: 1}}
					></View>
					<View
						style={{backgroundColor: "black", height: 8, width: 8, borderRadius: 4, margin: 1}}
					></View>
					<View
						style={{backgroundColor: "black", height: 8, width: 8, borderRadius: 4, margin: 1}}
					></View>
				</View>
			</TouchableOpacity>

			<View style={styles.titleContainer}></View>

			<View style={styles.goalsContainer}>
				<View style={{marginTop: 25, flexDirection: "row"}}>
					<View>
						<Text style={styles.myGoalsText}>My milestones</Text>
					</View>
					<View style={styles.viewTap}>
						<MaterialCommunityIcons
							name="plus"
							size={28}
							color="#7EC8C9"
							onPress={() => {
								navigation.navigate("FirstMilestone")
							}}
						/>
					</View>
				</View>

				<View>
					<AllMilestones />
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn}>
						<MaterialCommunityIcons
							name="home"
							size={34}
							color="white"
							onPress={() => navigation.navigate("mygoals")}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<RBSheet
				height={500}
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent",
					},
					draggableIcon: {
						backgroundColor: "#000",
					},
				}}
			>
				<View style={{alignItems: "center", marginTop: 20, width: "100%"}}>
					<TouchableOpacity
						style={styles.BottomTouch}
						onPress={() => navigation.navigate("markcomplete")}
					>
						<Text style={styles.bottomText}>Mark Goal Complete</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.BottomTouch}
						onPress={() => navigation.navigate("editgoal")}
					>
						<Text style={styles.bottomText}>Edit Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.BottomTouch}
						onPress={() => navigation.navigate("deletegoal")}
					>
						<Text style={styles.bottomText}>Delete Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.BottomTouch} onPress={() => navigation.navigate("help")}>
						<Text style={styles.bottomText}>Tutorial</Text>
					</TouchableOpacity>
				</View>
			</RBSheet>
		</StatusBarScreen>
	)
}

export default AllMilestonesScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	viewTap: {
		flexDirection: "row-reverse",
		margin: 120,
		height: 35,
		width: 35,
		backgroundColor: "white",
		marginVertical: 10,
		borderRadius: 35 / 2,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		height: 50,
		justifyContent: "center",
	},
	mainTitle: {
		color: "#FBF5E9",
		fontSize: 24,
		marginLeft: 20,
		fontWeight: "bold",
	},
	goalsContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
		borderTopRightRadius: 70,
		// marginTop: -50,
	},

	myGoalsText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "black",
		marginHorizontal: 20,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 70,
		justifyContent: "center",
		alignItems: "center",
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

	BottomTouch: {
		height: 100,
		width: "100%",
		borderWidth: 1,
		borderLeftColor: "white",
		borderRightColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},
})
