import React from "react"
import {TouchableOpacity, StyleSheet, Text, View} from "react-native"
import {ColorConstants, sizeConstants} from "./../../core/styles"

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
		padding: 8,
		borderRadius: 25,
		flexDirection: "column",
		marginVertical: 5,
		marginTop: 15,
	},
	button: {
		color: "white",
		fontSize: 25,
		alignSelf: "center",
	},
})
