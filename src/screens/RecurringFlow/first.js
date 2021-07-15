import React, {useState, useRef} from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import StatusBarScreen from "./StatusBarScreen"
import RBSheet from "react-native-raw-bottom-sheet"
import SwitchSelector from "react-native-switch-selector"

const First = () => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [toggle, setToggle] = useState()

	const [value, onChange] = useState(new Date())
	const [date, setDate] = useState(new Date())
	const options = [
		{label: "Day", value: "Day"},
		{label: "Weekly", value: "Weekly"},
	]

	return (
		<StatusBarScreen style={styles.introContainer}>
			<View style={{flexDirection: "row"}}>
				<Text style={styles.mainTitle}>Read 5 books</Text>
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
			<Text
				style={{
					fontSize: 16,
					color: "#FDF9F2",
					marginLeft: 21,
				}}
			>
				Enter Task
			</Text>
			<TouchableOpacity style={styles.container2}>
				<Text style={styles.button}>Read One Chapter</Text>
			</TouchableOpacity>
			<Text style={styles.subTitle}>Edit reoccuring</Text>

			<SwitchSelector
				style={{marginTop: 35, paddingLeft: 20, paddingRight: 20}}
				options={options}
				initial={0}
				onPress={(value) => setToggle(value)}
				textColor="#333333"
				selectedColor="#333333"
				buttonColor="#FDF9F2"
				borderColor="#76BBBC"
				hasPadding
				testID="gender-switch-selector"
				accessibilityLabel="gender-switch-selector"
				backgroundColor="#76BBBC"
				height={60}
				fontSize={27}
			/>
			{toggle == "Weekly" && (
				<View style={{flexDirection: "row", alignSelf: "center", marginTop: 20}}>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							justifyContent: "center",
							backgroundColor: "#76BBBC",
							margin: 8,
						}}
					>
						<Text style={{alignSelf: "center", fontSize: 20, color: "#FDF9F2"}}>S</Text>
					</View>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							justifyContent: "center",
							backgroundColor: "#76BBBC",
							margin: 8,
						}}
					>
						<Text style={{alignSelf: "center", fontSize: 20, color: "#FDF9F2"}}>M</Text>
					</View>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							justifyContent: "center",
							backgroundColor: "#76BBBC",
							margin: 8,
						}}
					>
						<Text style={{alignSelf: "center", fontSize: 20, color: "#FDF9F2"}}>T</Text>
					</View>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							justifyContent: "center",
							backgroundColor: "#76BBBC",
							margin: 8,
						}}
					>
						<Text style={{alignSelf: "center", fontSize: 20, color: "#FDF9F2"}}>W</Text>
					</View>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							justifyContent: "center",
							backgroundColor: "#76BBBC",
							margin: 8,
						}}
					>
						<Text style={{alignSelf: "center", fontSize: 20, color: "#FDF9F2"}}>T</Text>
					</View>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							justifyContent: "center",
							backgroundColor: "#76BBBC",
							margin: 8,
						}}
					>
						<Text style={{alignSelf: "center", fontSize: 20, color: "#FDF9F2"}}>F</Text>
					</View>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							justifyContent: "center",
							backgroundColor: "#76BBBC",
							margin: 8,
						}}
					>
						<Text style={{alignSelf: "center", fontSize: 20, color: "#FDF9F2"}}>S</Text>
					</View>
				</View>
			)}

			<TouchableOpacity style={styles.container}>
				<Text style={{color: "#FDF9F2", fontSize: 21}}>Cancel reoccuring</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bottomBtn}>
				<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
			</TouchableOpacity>
		</StatusBarScreen>
	)
}

export default First

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#588C8D",
		borderColor: "#FDF9F2",
		// borderEndColor: "#FDF9F2",
		borderEndWidth: 3,
		borderStartWidth: 3,
		borderTopWidth: 3,
		borderBottomWidth: 3,
		width: "70%",
		padding: 8,
		borderRadius: 25,
		flexDirection: "column",
		marginVertical: 5,
		marginTop: 15,
		alignSelf: "center",
	},
	container2: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",

		width: "70%",
		padding: 8,
		borderRadius: 25,
		flexDirection: "column",
		marginVertical: 5,
		marginTop: 15,
		alignSelf: "center",
	},
	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: 21,
	},
	button: {
		color: "black",
		fontSize: 21,
	},
	introContainer: {
		// flex: 1,
		backgroundColor: "#588C8D",
		// backgroundColor: "green",
	},
	threeDots: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		margin: 10,
		backgroundColor: "#538586",
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

	subTitle: {
		fontSize: 25,
		color: "#FDF9F2",
		marginLeft: 21,
		fontWeight: "bold",
		marginTop: 20,
	},

	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#FDF9F2",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
})
