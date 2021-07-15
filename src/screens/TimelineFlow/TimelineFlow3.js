import React, {useState} from "react"
import {Text, View} from "react-native"
import TimelineFlowSlider from "./../../components/TimelineFlowSlider"
const TimelineFlow3 = () => {
	const [screenData] = useState({
		title: "Editing tasks",
		subTitle1: "You can also edit your goals, milestones, or tasks.",
		first: "edit",
		second: "tap",
		subTitle2: `To edit, tap on the item.`,
		day: "Timeline",
		color1: "#B3855C",
		color2: "#E6AB76",
		screen: 3,
	})

	return <TimelineFlowSlider data={screenData} />
}

export default TimelineFlow3
