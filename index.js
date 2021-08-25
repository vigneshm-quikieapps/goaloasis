// import "react-native-gesture-handler"
// import {registerRootComponent} from "expo"
import {AppRegistry, Platform} from "react-native"
import App from "./App"
import PushNotification from "react-native-push-notification"
import React from "react"

import store from "./src/redux/store"
import {connect, Provider} from "react-redux"

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App)

// PushNotification.configure({
// 	channelId: "com.goal-oasis",

// 	onNotification: function (notification) {
// 		console.log("NOTIFICATION:", notification)
// 	},

// 	permissions: {
// 		alert: true,
// 		badge: true,
// 		sound: true,
// 	},
// 	popInitialNotification: true,

// 	requestPermissions: true,
// 	requestPermissions: (Platform.OS = "ios"),
// })

const ReduxApp = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}
AppRegistry.registerComponent("main", () => ReduxApp)
