import React from "react"
import {TouchableOpacity, StyleSheet, Text} from "react-native"
import {sizeConstants} from "../../core/constants"

function AppButton({title, onPress, style}) {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, style]}>
			<Text style={[styles.button, style, {elevation: 0, textAlign: "center"}]}>{title}</Text>
		</TouchableOpacity>
	)
}

export default AppButton

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#7EC8C9",
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
