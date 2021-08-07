import {StyleSheet, View, Text} from "react-native"
import React from "react"

const SnoozeIcon = ({size, color, bgColor}) => {
	const firstZSize = size ? size * 2 : 30
	const secondZSize = size ? size * 1.5 : 20
	const textColor = color ? color : "#fff"
	const bgC = bgColor ? bgColor : "#7b9a95"
	return (
		<View style={[styles.textContainer, {backgroundColor: bgC}]}>
			<Text style={{fontSize: firstZSize, color: textColor}}>Z</Text>
			<Text style={{fontSize: secondZSize, color: textColor}}>Z</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	textContainer: {flexDirection: "row"},
})

export {SnoozeIcon}
