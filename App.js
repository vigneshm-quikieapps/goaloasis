import React, {useEffect} from "react"
import Routing from "./Routing"
import AuthState from "./src/context/auth/AuthState"
import {connect} from "react-redux"
import {setShowLoader, setUserInfo} from "./src/redux/actions"
import auth from "@react-native-firebase/auth"
import {createNewUser, getUserById} from "./src/firebase/users"

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
		user &&
			getUserById(user.uid, (userObj) => {
				if (!userObj.uid) {
					let newUserObj = {
						displayName: user.displayName,
						email: user.email,
						emailVerified: user.emailVerified,
						isAnonymous: user.isAnonymous,
						phoneNumber: user.phoneNumber,
						photoURL: user.photoURL,
						providerId: user.providerId,
						tenantId: user.tenantId,
						uid: user.uid,
					}
					// createNewUser(newUserObj)
				}
			})
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
