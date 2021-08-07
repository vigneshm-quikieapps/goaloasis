import React from "react"
import {TouchableOpacity, StyleSheet, Text, View} from "react-native"
import {ColorConstants, sizeConstants} from "./../../core/constants"

function DisableAppButton({title, onPress, style}) {
	return (
		<View style={[styles.container, style]}>
			<Text style={[styles.button, style]}>{title}</Text>
		</View>
	)
}

export default DisableAppButton

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.lighterBlue,
		width: sizeConstants.threeFourTeen,
		padding: sizeConstants.eightX,
		borderRadius: sizeConstants.twentyFiveScale,
		flexDirection: "column",
		marginVertical: sizeConstants.s,
		marginTop: sizeConstants.l,
	},
	button: {
		color: "white",
		fontSize: sizeConstants.eighteenScale,
		alignSelf: "center",
	},
})
