import React, {useState, useRef} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import AppButton from "./AppButton"
import colors from "../../../colors"
import Constants from "expo-constants"
import RBSheet from "react-native-raw-bottom-sheet"
import {commonImages} from "../../core/constants"
import {CommonHomeButton} from "../../components/CommonComponents"
import dayjs from "dayjs"
import {height} from "./../../core/constants"

const SecondAfterModal = () => {
	const navigation = useNavigation()
	const refRBSheet = useRef()

	const [date, setDate] = useState(dayjs())
	const tip = () => <Text style={{fontWeight: "bold"}}>Tip:</Text>

	return (
		<ImageBackground
			style={[styles.introContainer, styles.image]}
			source={commonImages.secondImage}
			resizeMode="stretch"
		>
			<View style={{flexDirection: "row", marginTop: Constants.statusBarHeight}}>
				<Text style={styles.mainTitle}>Read 5 books</Text>
				<TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.threeDots}>
					<View style={styles.dots}></View>
					<View style={styles.dots}></View>
					<View style={styles.dots}></View>
				</TouchableOpacity>
			</View>
			<RBSheet
				height={height * 0.7}
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
					fontWeight: "bold",
					marginTop: 20,
					fontSize: 16,
					color: "#FDF9F2",
					marginLeft: 20,
				}}
			>
				Enter Task
			</Text>
			<View style={styles.centerCont}>
				<TextInput style={styles.textInput} placeholder="Type Here" />
			</View>
			<Text
				style={{
					fontSize: 18,
					color: "#FDF9F2",
					paddingLeft: 20,
					marginTop: 10,
					paddingRight: 24,
				}}
			>
				Target Date
			</Text>
			<View style={{display: "flex", alignItems: "center"}}>
				<AppButton title="Edit Date" style={{backgroundColor: "#FDF9F2", color: "gray"}} />
			</View>
			<Text style={styles.subTitle1}>
				{tip()} adding a target date will help you stay on track. Dont't worry! You can always
				change it.
			</Text>

			<View
				style={{
					position: "absolute",
					bottom: 30,
					width: "100%",
					justifyContent: "center",
				}}
			>
				<View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 12}}>
					<View>
						{/* <TouchableOpacity style={[styles.btnStylingLeft, styles.nextBtn]} onPress={}>
									<MaterialCommunityIcons name="chevron-left" size={50} color="#FDF9F2" />
								</TouchableOpacity> */}
					</View>
					<View>
						<TouchableOpacity
							style={[styles.btnStylingRight, styles.nextBtn]}
							onPress={() => navigation.navigate("ThirdAfterModal")}
						>
							<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
						</TouchableOpacity>
					</View>
				</View>

				{/* <View style={{alignItems: "center"}}>
					<TouchableOpacity style={styles.btnStyling}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View> */}
			</View>
			<CommonHomeButton />
			{/* </LinearGradient> */}
		</ImageBackground>
	)
}
export default SecondAfterModal
const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#588C8D",
	},

	subTitle: {
		fontSize: 16,
		color: "#FDF9F2",
		paddingLeft: 20,
		marginTop: 10,
		paddingRight: 20,
	},
	subTitle1: {
		fontSize: 18,
		color: "#FDF9F2",
		paddingLeft: 20,
		marginTop: 10,
		paddingRight: 24,
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "#FDF9F2",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	mainTitle: {
		color: "#FDF9F2",
		fontSize: 25,
		marginLeft: 21,
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

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
		right: 0,
		display: "flex",
		alignSelf: "flex-end",
		marginTop: 70,
		marginRight: 70,
	},
	nextBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	textInput: {
		width: 300,
		height: 50,
		backgroundColor: "#FDF9F2",
		borderRadius: 50,
		marginTop: 3,
		paddingLeft: 20,
		fontSize: 19,
		color: "#666666",
		elevation: 10,
	},
	centerCont: {
		justifyContent: "center",
		alignItems: "center",
	},
	btnContainer: {
		position: "absolute",
		bottom: 20,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	btnStylingRight: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.faint,
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
	},
	btnStylingLeft: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.buttonBackGround,
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
	},

	btnStyling: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDF9F2",
		width: 75,
		height: 75,
		borderRadius: 75 / 2,
	},
	nextBtn: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
})
