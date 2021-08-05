import React, {useState} from "react"
import {Text, View} from "react-native"
import {ColorConstants} from "../../core/constants"
import TaskTutorialSlider from "./../../components/TaskTutorialSlider"
const TaskTutorialSlide1 = ({route}) => {
	const {helpMenu} = route.params ? route.params : {helpMenu: false}
	const [screenData] = useState({
		title: "Completing Task",
		subTitle: "Long Press to mark a task complete",
		color1: ColorConstants.timelineSkinDarker,
		color2: ColorConstants.timelineSkinDark,
		screen: 1,
	})
	// console.log("HELPMENU from slider 1", route)

	return <TaskTutorialSlider data={screenData} helpMenu={helpMenu} />
}

export default TaskTutorialSlide1
