import React, {useState} from "react"
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {CommonHomeButton} from "./CommonComponents"

export const withPressButtonAnimation = (Component) => {
	const [scale, setSize] = useState(1)

	return (
		<View
			style={{
				transform: [{scale: scale}],
				overflow: "hidden",
			}}
			onPressIn={() => {
				setSize(0.9)
			}}
			onPressOut={() => {
				setSize(1)
				click()
			}}
		>
			<Component />
		</View>
	)
}
