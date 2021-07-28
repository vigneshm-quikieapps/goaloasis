import {StatusBar} from "expo-status-bar"
import React from "react"
import Routing from "./Routing"
import AuthState from "./src/context/auth/AuthState"

import store from "./src/redux/store"
import {Provider} from "react-redux"
import SplashScreen from "./src/assets/splashScreen"

export default function App() {
	return (
		<Provider store={store}>
			<AuthState>
				<Routing />
			</AuthState>
		</Provider>
	)
}
