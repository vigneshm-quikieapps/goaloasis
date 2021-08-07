import React from "react"
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack"
import {IntroSlide1, IntroSlide2, IntroSlide3, IntroSlide4} from "../screens"

const Stack = createStackNavigator()
const options = {
	gestureEnabled: true, // If you want to swipe back like iOS on Android
	...TransitionPresets.SlideFromRightIOS,
}
const IntroStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="slide1" component={IntroSlide1} options={options} />
			<Stack.Screen name="slide2" component={IntroSlide2} options={options} />
			<Stack.Screen name="slide3" component={IntroSlide3} options={options} />
			<Stack.Screen name="slide4" component={IntroSlide4} options={options} />
		</Stack.Navigator>
	)
}

export default IntroStack
