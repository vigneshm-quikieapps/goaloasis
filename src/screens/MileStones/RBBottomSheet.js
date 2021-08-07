import React, {useRef} from "react"
import {StyleSheet, View, TouchableOpacity, Text} from "react-native"
import RBSheet from "react-native-raw-bottom-sheet"
import {useNavigation} from "@react-navigation/native"
import {CommonStyles, sizeConstants} from "../../core/constants"
import {height} from "./../../core/constants"
import {
	ScaledSheet,
	verticalScale,
	moderateScale,
	scale,
	moderateVerticalScale,
} from "react-native-size-matters"

const RBBottomSheet = ({name = "MileStone Title", flag = true}) => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const goBack = () => {
		navigation.goBack()
	}
	return (
		<View style={styles.container}>
			<View style={{flexDirection: "row"}}>
				{flag && <Text style={styles.mainTitle}>{name}</Text>}
				<TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.threeDots}>
					<View style={styles.dots}></View>
					<View style={styles.dots}></View>
					<View style={styles.dots}></View>
				</TouchableOpacity>
			</View>

			<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
				<RBSheet
					height={height * 0.7}
					ref={refRBSheet}
					closeOnDragDown={true}
					closeOnPressMask={false}
					customStyles={{
						wrapper: {
							backgroundColor: "transparent",
							borderRadius: 50,
						},
						draggableIcon: {
							backgroundColor: "#000",
							borderRadius: 50,
						},
						container: {
							borderTopRightRadius: 40,
							borderTopLeftRadius: 40,
						},
					}}
				>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							marginTop: 20,
							width: "100%",
						}}
					>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => {
								refRBSheet.current.close()
								navigation.navigate("markcomplete")
							}}
						>
							<Text style={styles.bottomText}>Mark Goal Complete</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => {
								refRBSheet.current.close()
								navigation.navigate("editgoal")
							}}
						>
							<Text style={styles.bottomText}>Edit Goal</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => {
								refRBSheet.current.close()
								navigation.navigate("deletegoal")
							}}
						>
							<Text style={styles.bottomText}>Delete Goal</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.BottomTouch}
							onPress={() => {
								refRBSheet.current.close()
								navigation.navigate("help")
							}}
						>
							<Text style={styles.bottomText}>Tutorial</Text>
						</TouchableOpacity>
					</View>
				</RBSheet>
			</View>
		</View>
	)
}

export default RBBottomSheet

const styles = StyleSheet.create({
	container: {},

	mainTitle: {
		color: "#333333",
		fontSize: sizeConstants.twentyTwoScale,
		marginLeft: sizeConstants.xl,
	},
	threeDots: {
		backgroundColor: "#F4EFE7",
		flexDirection: "row",
		position: "absolute",
		right: scale(0),
		// bottom: verticalScale(0.2),
		margin: scale(10),
		width: verticalScale(40),
		height: verticalScale(27),
		borderRadius: scale(30),
		alignItems: "center",
		justifyContent: "center",
	},
	dots: {
		backgroundColor: "black",
		height: sizeConstants.eight,
		width: sizeConstants.eight,
		borderRadius: sizeConstants.eight,

		margin: scale(1),
	},
	BottomTouch: {
		height: sizeConstants.hundred,
		width: "100%",
		borderWidth: scale(1),
		borderLeftColor: "white",
		borderRightColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomText: {
		fontSize: sizeConstants.twentyX,
		fontWeight: "bold",
		color: "black",
		alignSelf: "center",
		textAlign: "center",
	},
})
