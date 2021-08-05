import React, {useState} from "react"
import {Text, View} from "react-native"
import {ColorConstants} from "../../core/constants"
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
		color1: ColorConstants.timelineSkinDarker,
		color2: ColorConstants.timelineSkinDark,
		screen: 1,
	})

	return <TimelineFlowSlider data={screenData} />
}

export default TimelineFlow1
