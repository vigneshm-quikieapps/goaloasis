import React, {useRef} from "react"
import {StyleSheet, View, TouchableOpacity, Text} from "react-native"
import RBSheet from "react-native-raw-bottom-sheet"
import {useNavigation} from "@react-navigation/native"
import {sizeConstants} from "../../core/constants"
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
	)
}

export default RBBottomSheet

const styles = StyleSheet.create({
	container: {},

	mainTitle: {
		color: "#333333",
		fontSize: 25,
		marginLeft: sizeConstants.xl,
	},
	threeDots: {
		backgroundColor: "#F4EFE7",
		flexDirection: "row",
		position: "absolute",
		right: scale(0),
		bottom: verticalScale(6),
		margin: scale(10),
		height: sizeConstants.fifteenMX,
		width: scale(35),
		borderRadius: scale(30),
		alignItems: "center",
		justifyContent: "center",
	},
	dots: {
		backgroundColor: "black",
		height: 8,
		width: 8,
		borderRadius: 4,
		margin: 1,

		margin: scale(1),
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
