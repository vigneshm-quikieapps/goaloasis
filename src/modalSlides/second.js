import React from "react"
import {View, StyleSheet} from "react-native"

function second(props) {
	return (
		<View>
			<View
				style={{
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
					marginTop: 40,
				}}
			>
				<Text style={{fontSize: 18, marginBottom: 20}}>
					Swipe right on the milestone if you want to add a task within the milestone.
				</Text>
			</View>
			<View
				style={{
					alignItems: "center",
					marginTop: 140,
				}}
			>
				<AppButton
					title="Swipe right to add task"
					style={{
						backgroundColor: "yellowgreen",
						fontSize: 15,
						paddingBottom: 20,
						paddingTop: 20,
					}}
				/>
				<AppButton title="Next" style={{backgroundColor: "white", color: "black"}} />
			</View>
		</View>
	)
}

export default second
