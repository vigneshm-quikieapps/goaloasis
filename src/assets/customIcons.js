import {StyleSheet, View, Text} from "react-native"
import React from "react"

const SnoozeIcon = ({size, color}) => {
	const firstZSize = size ? size * 2 : 30
	const secondZSize = size ? size * 1.5 : 20
	const textColor = color ? color : "#fff"
	return (
		<View style={styles.textContainer}>
			<Text style={{fontSize: firstZSize, color: textColor}}>Z</Text>
			<Text style={{fontSize: secondZSize, color: textColor}}>Z</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	textContainer: {flexDirection: "row", backgroundColor: "#7b9a95"},
})

export {SnoozeIcon}
