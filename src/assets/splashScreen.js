import {Button, Modal, TouchableOpacity, View, Text} from "react-native"
import React, {useEffect, useState, useContext} from "react"
import LottieView from "lottie-react-native"
import {connect} from "react-redux"

const SplashScreen = (props) => {
	useEffect(() => {
		setTimeout(() => {
			props.setHasSplashScreenLoaded(true)
		}, 4000)
	}, [])
	return (
		// <Modal visible={!props.hasSplashScreenLoaded} animationType="fade">

        
		// <LottieView
			
		// 	source={require("./splash.json")}
		// 	loop={false}
		// 	autoPlay
		// 	onAnimationFinish={() => {
		// 		props.setHasSplashScreenLoaded(true)
		// 	}}
		// />
		//  </Modal>
		<View style={{justifyContent: "center", alignItems: "center", marginTop: 300}}>
			<TouchableOpacity
				onPress={() => {
					props.setHasSplashScreenLoaded(true)
				}}
			>
				<Text>Splash Screen</Text>
			</TouchableOpacity>
		</View>
	)
}

export default SplashScreen
