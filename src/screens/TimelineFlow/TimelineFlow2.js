import React, {useState} from "react"
import {Text, View} from "react-native"
import {ColorConstants} from "../../core/constants"
import TimelineFlowSlider from "./../../components/TimelineFlowSlider"
const TimelineFlow1 = () => {
	const [screenData] = useState({
		title: "Completing tasks",
		subTitle1: "You can complete goals, miletsones, and tasks from the timeline",
		first: "mark",
		second: "complete",
		third: "long Press",
		subTitle2: `To mark complete, long press on the item.`,
		day: "Timeline",
		color1: ColorConstants.timelineSkinDarker,
		color2: ColorConstants.timelineSkinDark,
		screen: 2,
	})

	return <TimelineFlowSlider data={screenData} />
}

export default TimelineFlow1
