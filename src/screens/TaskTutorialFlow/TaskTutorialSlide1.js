import React, {useState} from "react"
import {Text, View} from "react-native"
import TaskTutorialSlider from "./../../components/TaskTutorialSlider"
const TaskTutorialSlide1 = ({route}) => {
	const {helpMenu} = route.params ? route.params : {helpMenu: false}
	const [screenData] = useState({
		title: "Completing Task",
		subTitle: "Long Press to mark a task complete",
		color1: "#B3855C",
		color2: "#E6AB76",
		screen: 1,
	})
	// console.log("HELPMENU from slider 1", route)

	return <TaskTutorialSlider data={screenData} helpMenu={helpMenu} />
}

export default TaskTutorialSlide1
