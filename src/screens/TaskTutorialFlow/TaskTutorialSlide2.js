import React, {useState} from "react"
import TaskTutorialSlider from "../../components/TaskTutorialSlider"
import {ColorConstants} from "../../core/constants"
const TaskTutorialSlide2 = () => {
	const [screenData] = useState({
		title: "Snoozing Tasks",
		subTitle: "Swipe right to snooze a task to tommorow",
		color1: ColorConstants.timelineSkinDarker,
		color2: ColorConstants.timelineSkinDark,
		screen: 2,
	})

	return <TaskTutorialSlider data={screenData} />
}

export default TaskTutorialSlide2
