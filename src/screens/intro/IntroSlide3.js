import React, {useState} from "react"
import {IntroSlider} from "../../components"

const IntroSlide3 = () => {
	const [screenData] = useState({
		title: "Keep moving forward with key tasks.",
		subTitle:
			"Progress is made one step at a time! We’ll help keep your daily task list focused on what matters to you.",
		color1: "#588C8D",
		color2: "#7EC8C9",
		screen: 3,
	})
	return <IntroSlider data={screenData} />
}

export default IntroSlide3
