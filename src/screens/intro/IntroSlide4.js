import React, {useState} from "react"
import {IntroSlider} from "../../components"

const IntroSlide4 = () => {
	const [screenData] = useState({
		title: "See it all come together on your timeline.",
		subTitle:
			"Never lose sight of the big picture with a comprehensive view of your goals, milestones, and tasks. You can do it!",
		color1: "#B8534F",
		color2: "#CD8784",
		screen: 4,
	})
	return <IntroSlider data={screenData} />
}

export default IntroSlide4
