import {Button, Modal, TouchableOpacity, View, Text, ImageBackground} from "react-native"
import React, {useEffect, useState, useContext} from "react"
import LottieView from "lottie-react-native"
import {connect} from "react-redux"
import {ColorConstants} from "./../core/constants"

const SplashScreen = (props) => {
	useEffect(() => {
		setTimeout(() => {
			props.setHasSplashScreenLoaded(true)
		}, 4000)
	}, [])
	return (
		// <Modal visible={!props.hasSplashScreenLoaded} animationType="fade">

		// <View style={{flex: 1, height: "100%", width: "100%"}}>
		// 	{/* <LottieView
		// 		source={require("./lottie.json")}
		// 		loop={false}
		// 		autoPlay
		// 		// onAnimationFinish={() => {
		// 		// 	props.setHasSplashScreenLoaded(true)
		// 		// }}
		// 	/> */}

		// 	<Text>Splash Screen</Text>
		// </View>
		//  </Modal>

		// <View style={{justifyContent: "center", alignItems: "center", he}}>
		/* <TouchableOpacity
				onPress={() => {
					props.setHasSplashScreenLoaded(true)
				}}
			>
				<Text style={{color: "black", fontSize: 20}}>Splash Screen</Text> */
		//  </TouchableOpacity>
		<ImageBackground
			source={require("./images/logos.png")}
			style={{
				width: "100%",
				height: "100%",
				flex: 1,
				backgroundColor: ColorConstants.darkFaintBlue,
			}}
		/>
		// </View>
	)
}

export default SplashScreen
