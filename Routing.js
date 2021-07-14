import {StatusBar} from "expo-status-bar"
import React, {useEffect, useState, useContext} from "react"

import {NavigationContainer} from "@react-navigation/native"
import {IntroStack, MainStack} from "./src/navigation"
import {getFirstTimeUser} from "./src/utils/asyncStorage"
import authContext from "./src/context/auth/authContext"

export default function Routing() {
	const AuthContext = useContext(authContext)
	const {reload} = AuthContext

	useEffect(() => {
		fetchData()
	}, [reload])

	const [firstTime, setFirstTime] = useState()
	console.log("TESTING--->", firstTime)
	const fetchData = async () => {
		const data = await getFirstTimeUser()
		setFirstTime(data)
	}
	return (
		<NavigationContainer>
			{/* <IntroStack /> */}
			{firstTime === null ? <IntroStack /> : <MainStack />}
			{/* <MainStack /> */}
			<StatusBar style="auto" />
		</NavigationContainer>
	)
}
