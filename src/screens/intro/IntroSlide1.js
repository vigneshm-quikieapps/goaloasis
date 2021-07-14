import React, {useState} from "react"
import {IntroSlider} from "../../components"
const IntroSlide1 = () => {
	const [screenData] = useState({
		title: "Congratulations on taking the first step!",
		subTitle:
			"Achieving a goal requires dedication and hard work. Goal Oasis will help you stay on track for up to six goals.",
		color1: "#B3855C",
		color2: "#E6AB76",
		screen: 1,
	})

	return <IntroSlider data={screenData} />
}

export default IntroSlide1
