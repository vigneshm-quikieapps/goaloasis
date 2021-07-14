import React from "react"
import {View, StyleSheet} from "react-native"

function third(props) {
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
					Swipe left if you want to delete or edit the milestone.
				</Text>
			</View>
			<View
				style={{
					alignItems: "center",
					marginTop: 140,
				}}
			>
				<AppButton
					title="Swipe left to of edit"
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

export default third
