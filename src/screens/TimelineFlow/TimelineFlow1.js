import React, {useState} from "react"
import {Text, View} from "react-native"
import TimelineFlowSlider from "./../../components/TimelineFlowSlider"
const TimelineFlow1 = () => {
	const [screenData] = useState({
		title: "Timeline",
		subTitle1: "This is where you can see all your goals, milestones, and tasks.",
		first: "Pinch",
		second: "spread",
		third: "zoom",
		subTitle2: "Pinch and Spread to zoom in and out.",
		Month: "Month",
		Day: "Day",
		Year: "Year",
		task: "Task",
		milestone: "Milestone",
		goal: "Goal",
		color1: "#B3855C",
		color2: "#E6AB76",
		screen: 1,
	})

	return <TimelineFlowSlider data={screenData} />
}

export default TimelineFlow1
