import React, {useState} from "react"
import {IntroSlider} from "../../components"
import {ImageBackground} from "react-native"

const IntroSlide2 = () => {
	const [screenData] = useState({
		title: "Break goals down into manageable milestones.",
		subTitle:
			"The key to achieving a goal is breaking it down into manageable milestones. We can help you do just that!",
		color1: "#3F6E6A",
		color2: "#799A97",
		screen: 2,
	})
	return <IntroSlider data={screenData} />
}

export default IntroSlide2
