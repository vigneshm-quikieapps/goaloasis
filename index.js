// import "react-native-gesture-handler"
// import {registerRootComponent} from "expo"
import {AppRegistry, Platform} from "react-native"
import App from "./App"
import PushNotification from "react-native-push-notification"

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
AppRegistry.registerComponent("main", () => App)
