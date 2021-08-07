import React from "react"
import {View, Text} from "react-native"

const modify1 = () => <Text style={{fontWeight: "bold"}}>Long Press</Text>
const modify2 = () => <Text style={{fontWeight: "bold"}}>Mark Complete</Text>
const first = () => {
	return (
		<View>
			<Text>"Congrats! You're one step closer to your goal.</Text>
			{modify1}
			<Text>on the milestone when ready to</Text>
			{modify2}
		</View>
	)
}

export default first
