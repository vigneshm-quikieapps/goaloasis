import First from "./first"
import Second from "./second"
import Third from "./third"
import IndividualGoal from "../screens/milestones/IndividualGoal"

import React from "react"
import {View, StyleSheet} from "react-native"

function index(props) {
	return (
		<View>
			<IndividualGoal first={First} second={Second} third={Third} />
		</View>
	)
}

export default index
