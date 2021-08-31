import React, {useEffect} from "react"
import Routing from "./Routing"
import AuthState from "./src/context/auth/AuthState"
import {connect} from "react-redux"
import {setNetInfo, setShowLoader, setUserInfo} from "./src/redux/actions"
import auth from "@react-native-firebase/auth"
import {createNewUser, getUserById} from "./src/firebase/users"
import {getCurrentUserFromAsyncStorage} from "./src/utils/asyncStorage/usersAsyncStore"
import NetInfo from "@react-native-community/netinfo"

require("./src/firebase/authentication/googleAuth")
require("./src/firebase/authentication/twitterAuth")

const App = (props) => {
	const {setUserInfo, setShowLoader, user, setNetInfo, internet} = props
	setShowLoader(true)
	//  waiting for firebase initialization
	// const [initializing, setInitializing] = useState(true);

	function onAuthStateChanged(user) {
		console.log("state changed###################: ", user)
		setUserInfo(user)
		user &&
			user.uid &&
			getUserById(user.uid, (userObj) => {
				if (!userObj.length) {
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
					createNewUser(newUserObj, (newUser) => {
						console.log("user created", newUser)
					})
				}
			})
		setShowLoader(false)
	}

	useEffect(() => {
		const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
			internet !== state.isConnected && setNetInfo(state.isConnected)
			console.log("Connection type", state.type)
			console.log("Is connected?", state.isConnected)
		})
		const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)
		return () => [authSubscriber, unsubscribeNetInfo]
		// unsubscribe on unmount
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
		internet: state.milestone.internet,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUserInfo: (data) => dispatch(setUserInfo(data)),
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
		setNetInfo: (data) => {
			dispatch(setNetInfo(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
