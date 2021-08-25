import React, {useEffect} from "react"
import Routing from "./Routing"
import AuthState from "./src/context/auth/AuthState"
import {connect} from "react-redux"
import {setShowLoader, setUserInfo} from "./src/redux/actions"
import auth from "@react-native-firebase/auth"

require("./src/firebase/authentication/googleAuth")
require("./src/firebase/authentication/twitterAuth")

const App = (props) => {
	const {setUserInfo, setShowLoader} = props
	setShowLoader(true)
	//  waiting for firebase initialization
	// const [initializing, setInitializing] = useState(true);

	function onAuthStateChanged(user) {
		console.log("state changed###################: ", user)
		setUserInfo(user)
		// if (initializing) setInitializing(false);
		setShowLoader(false)
	}

	useEffect(() => {
		const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)
		return authSubscriber // unsubscribe on unmount
	}, [])
	return (
		<AuthState>
			<Routing />
		</AuthState>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.milestone.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUserInfo: (data) => dispatch(setUserInfo(data)),
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
