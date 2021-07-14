import React, {useRef} from "react"
import {StyleSheet, View, TouchableOpacity, Text} from "react-native"
import RBSheet from "react-native-raw-bottom-sheet"
import {useNavigation} from "@react-navigation/native"

const RBBottomSheet = ({flag = true}) => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const goBack = () => {
		navigation.goBack()
	}
	return (
		<View style={styles.container}>
			<View style={{flexDirection: "row"}}>
				{flag && <Text style={styles.mainTitle}>Read 5 books</Text>}
				<TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.threeDots}>
					<View style={styles.dots}></View>
					<View style={styles.dots}></View>
					<View style={styles.dots}></View>
				</TouchableOpacity>
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
		</View>
	)
}

export default RBBottomSheet

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	mainTitle: {
		color: "#333333",
		fontSize: 25,
		marginLeft: 20,
	},
	threeDots: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		margin: 10,
		backgroundColor: "#F4EFE7",
		height: 35,
		width: 42,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	dots: {
		backgroundColor: "black",
		height: 8,
		width: 8,
		borderRadius: 4,
		margin: 1,
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
