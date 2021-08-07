import React, {useState} from "react"
import TaskTutorialSlider from "../../components/TaskTutorialSlider"
const TaskTutorialSlide3 = () => {
	const [screenData] = useState({
		title: "Deleting Task",
		subTitle: "Swipe Left to delete a task",
		color1: "#B3855C33",
		color2: "#E6AB7633",
		screen: 3,
	})

	return <TaskTutorialSlider data={screenData} />
}

export default TaskTutorialSlide3
