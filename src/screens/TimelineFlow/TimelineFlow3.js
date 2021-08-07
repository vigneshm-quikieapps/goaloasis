import React, {useState} from "react"
import {Text, View} from "react-native"
import {ColorConstants} from "../../core/constants"
import TimelineFlowSlider from "./../../components/TimelineFlowSlider"
const TimelineFlow3 = () => {
	const [screenData] = useState({
		title: "Editing tasks",
		subTitle1: "You can also edit your goals, milestones, or tasks.",
		first: "edit",
		second: "tap",
		subTitle2: `To edit, tap on the item.`,
		day: "Timeline",
		color1: ColorConstants.timelineSkinDarker,
		color2: ColorConstants.timelineSkinDark,
		screen: 3,
	})

	return <TimelineFlowSlider data={screenData} />
}

export default TimelineFlow3
