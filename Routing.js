import {StatusBar} from "expo-status-bar"
import React, {useEffect, useState, useContext} from "react"
import {View} from "react-native"
import LottieView from "lottie-react-native"

import {NavigationContainer} from "@react-navigation/native"
import {IntroStack, MainStack} from "./src/navigation"
import {getFirstTimeUser} from "./src/utils/asyncStorage"
import authContext from "./src/context/auth/authContext"
import TimelineFlowSlider from "./src/components/TimelineFlowSlider"
import SplashScreen from "./src/assets/splashScreen"

export default function Routing() {
	const AuthContext = useContext(authContext)
	const {reload} = AuthContext

	useEffect(() => {
		fetchData()
	}, [reload])

	const [firstTime, setFirstTime] = useState()
	// console.log("TESTING--->", firstTime)
	const fetchData = async () => {
		const data = await getFirstTimeUser()
		setFirstTime(data)
	}
	const [hasSplashScreenLoaded, setHasSplashScreenLoaded] = useState(false)
	return (
		<NavigationContainer>
			{hasSplashScreenLoaded ? (
				firstTime === null ? (
					<IntroStack />
				) : (
					<MainStack />
				)
			) : (
				<SplashScreen
					hasSplashScreenLoaded={hasSplashScreenLoaded}
					setHasSplashScreenLoaded={setHasSplashScreenLoaded}
				/>
			)}

			<StatusBar style="auto" />
		</NavigationContainer>
	)
}
