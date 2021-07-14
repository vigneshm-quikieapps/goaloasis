import React, {useState} from "react"
import TaskTutorialSlider from "../../components/TaskTutorialSlider"
const TaskTutorialSlide2 = () => {
	const [screenData] = useState({
		title: "Snoozing Tasks",
		subTitle: "Swipe right to snooze a task to tommorow",
		color1: "#B3855C",
		color2: "#E6AB76",
		screen: 2,
	})

	return <TaskTutorialSlider data={screenData} />
}

export default TaskTutorialSlide2
