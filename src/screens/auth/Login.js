import React, {useEffect, useState} from "react"
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {height} from "../../core/constants"
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-google-signin/google-signin"
import auth from "@react-native-firebase/auth"
import {connect} from "react-redux"
import {setShowLoader, setUserInfo} from "../../redux/actions"
import PropTypes from "prop-types"
import {LoginManager, AccessToken} from "react-native-fbsdk-next"

const Login = (props) => {
	const {user, setShowLoader} = props
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	// google sign in starts
	const onGoogleButtonPress = async () => {
		try {
			await GoogleSignin.hasPlayServices()

			// Get the users ID token
			const userInfo = await GoogleSignin.signIn()
			const {idToken} = userInfo

			// Create a Google credential with the token
			const googleCredential = auth.GoogleAuthProvider.credential(idToken)

			// Sign-in the user with the credential
			return auth().signInWithCredential(googleCredential)
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	}

	const GoogleSignIn = () => {
		return (
			<GoogleSigninButton
				title="Google Sign-In"
				onPress={() => {
					setShowLoader(true)
					onGoogleButtonPress().then(() => {
						console.log("Signed in with Google!")
						setShowLoader(false)
					})
				}}
			/>
		)
	}
	// google sign in  ends

	const FacebookSignIn = () => {
		return (
			<Button
				title="Facebook Sign-In"
				onPress={() => onFacebookButtonPress().then(() => console.log("Signed in with Facebook!"))}
			/>
		)
	}

	const onFacebookButtonPress = async () => {
		// Attempt login with permissions
		const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
		console.log("result: ", result)
		if (result.isCancelled) {
			throw "User cancelled the login process"
		}

		// Once signed in, get the users AccesToken
		const data = await AccessToken.getCurrentAccessToken()

		if (!data) {
			throw "Something went wrong obtaining access token"
		}

		// Create a Firebase credential with the AccessToken
		const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

		// Sign-in the user with the credential
		return auth().signInWithCredential(facebookCredential)
	}

	const LogoutButton = () => {
		return (
			<TouchableOpacity onPress={handleLogout}>
				<View>
					<Text>Logout</Text>
				</View>
			</TouchableOpacity>
		)
	}

	const handleLogout = () => {
		setShowLoader(true)
		auth()
			.signOut()
			.then(async () => {
				console.log("User signed out!")
				await GoogleSignin.signOut()
				setShowLoader(false)
			})
	}

	useEffect(() => {
		user ? setIsLoggedIn(true) : setIsLoggedIn(false)

		return () => {
			setIsLoggedIn(false)
		}
	}, [user])
	return (
		<View style={styles.loginContainer}>
			{!isLoggedIn ? (
				<>
					<GoogleSignIn />
					<View style={{height: 100}}>
						<FacebookSignIn />
					</View>
				</>
			) : (
				<LogoutButton />
			)}
		</View>
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

const styles = StyleSheet.create({
	loginContainer: {
		height: height,
		alignItems: "center",
		justifyContent: "center",
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
