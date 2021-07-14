import React from "react"
import {TouchableOpacity, StyleSheet, Text} from "react-native"

function AppButton({title, onPress, style}) {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, style]}>
			<Text style={[styles.button, style]}>{title}</Text>
		</TouchableOpacity>
	)
}

export default AppButton

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#7EC8C9",
		width: "70%",
		padding: 8,
		borderRadius: 25,
		flexDirection: "column",
		marginVertical: 5,
		marginTop: 15,
	},
	button: {
		color: "white",
		fontSize: 25,
	},
})
