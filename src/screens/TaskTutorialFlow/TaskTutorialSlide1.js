import React, {useState} from "react"
import {Text, View} from "react-native"
import TaskTutorialSlider from "./../../components/TaskTutorialSlider"
const TaskTutorialSlide1 = () => {
	const [screenData] = useState({
		title: "Completing Task",
		subTitle: "Long Press to mark a task complete",
		color1: "#B3855C",
		color2: "#E6AB76",
		screen: 1,
	})

	return <TaskTutorialSlider data={screenData} />
}

export default TaskTutorialSlide1
