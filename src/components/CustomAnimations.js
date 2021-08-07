import React, {useState} from "react"
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {CommonHomeButton} from "./CommonComponents"
import {ColorConstants} from "../core/constants"

export const WithPressButtonAnimation = ({children}) => {
	const [scale, setSize] = useState(1)
	console.log("children", children)
	return (
		<View
			style={{
				flex: 1,
				width: "100%",
				transform: [{scale: scale}],
				overflow: "hidden",
				backgroundColor: "#ff0000",
			}}
			onPressIn={() => {
				setSize(0.7)
			}}
			onPressOut={() => {
				setSize(1)
				click()
			}}
		>
			{children}
		</View>
	)
}
