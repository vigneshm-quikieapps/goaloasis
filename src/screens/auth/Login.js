import React, {useEffect, useState} from "react"
import {
	Button,
	Image,
	NativeModules,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"
import {
	ColorConstants,
	commonImages,
	forGoals,
	height,
	sizeConstants,
	width,
} from "../../core/constants"
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
import {FontAwesome, AntDesign} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"

const {RNTwitterSignIn} = NativeModules

const Login = (props) => {
	const {user, setShowLoader} = props
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [errMsg, setErrMsg] = useState("")
	const [signInMode, setSignInMode] = useState(true)
	const navigation = useNavigation()

	// sign in with email and password starts

	const areEmailPassEmpty = () => {
		console.log("email: ", email, "pass: ", pass)
		if (!email.length) {
			setErrMsg("Please enter email")
			return true
		}
		if (!pass.length) {
			setErrMsg("Please enter password")
			return true
		}
		setErrMsg("")
		return false
	}

	const handleEmailPassSignUp = () => {
		setShowLoader(true)
		if (areEmailPassEmpty()) {
			setShowLoader(false)
			return
		}
		auth()
			.createUserWithEmailAndPassword(email, pass)
			.then(() => {
				setShowLoader(false)
				setErrMsg("")
			})
			.catch((error) => {
				handleError(error)
				setShowLoader(false)
			})
	}

	const handleEmailPassSignIn = () => {
		setShowLoader(true)
		if (areEmailPassEmpty()) {
			setShowLoader(false)
			return
		}
		auth()
			.signInWithEmailAndPassword(email, pass)
			.then(() => {
				setShowLoader(false)
				setErrMsg("")
			})
			.catch((error) => {
				handleError(error)
				setShowLoader(false)
			})
	}

	const handleError = (error) => {
		if (error.code === "auth/email-already-in-use") {
			console.log("That email address is already in use!")
			setErrMsg("Email address is already in use!")
		}

		if (error.code === "auth/invalid-email") {
			console.log("That email address is invalid!")
			setErrMsg("Email address is invalid!")
		}
		if (error.code === "auth/wrong-password") {
			console.log("Wrong password!")
			setErrMsg("Wrong password!")
		}
		if (error.code === "auth/too-many-requests") {
			console.log("Too many requests!")
			setErrMsg("Too many requests! Please try later")
		}

		console.error(error)
	}
	// sign in with email and password  ends

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
			<TouchableOpacity
				style={[styles.FBSignInBtn, {backgroundColor: ColorConstants.white}]}
				onPress={() => {
					setShowLoader(true)
					onGoogleButtonPress().then(() => {
						console.log("Signed in with Google!")
						setShowLoader(false)
					})
				}}
			>
				<View>
					<Image source={commonImages.googleIcon} style={{width: 24, height: 24}} />
				</View>
				<View style={styles.FBBtnTxtContainer}>
					<Text style={styles.GoogleSignInBtnTxt}>Sign In</Text>
				</View>
			</TouchableOpacity>
		)
	}
	// google sign in  ends

	// facebook sign in starts
	const FacebookSignIn = () => {
		return (
			<TouchableOpacity
				style={styles.FBSignInBtn}
				onPress={() => onFacebookButtonPress().then(() => console.log("Signed in with Facebook!"))}
			>
				<View style={styles.FBIconContainer}>
					<FontAwesome name="facebook-f" size={24} style={styles.FBIcon} />
				</View>
				<View style={styles.FBBtnTxtContainer}>
					<Text style={styles.FBSignInBtnTxt}>Sign In</Text>
				</View>
			</TouchableOpacity>
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

	// facebook sign in ends

	// twitter sign in starts

	const TwitterSignIn = () => {
		return (
			<TouchableOpacity
				style={[styles.FBSignInBtn, {backgroundColor: ColorConstants.twitterBlue}]}
				onPress={() => onTwitterButtonPress().then(() => console.log("Signed in with Twitter!"))}
			>
				<View style={styles.FBIconContainer}>
					<AntDesign name="twitter" size={24} style={styles.FBIcon} />
				</View>
				<View style={styles.FBBtnTxtContainer}>
					<Text style={styles.FBSignInBtnTxt}>Sign In</Text>
				</View>
			</TouchableOpacity>
		)
	}

	const onTwitterButtonPress = async () => {
		// Perform the login request
		const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn()
		console.log("authToken", authToken)
		// Create a Twitter credential with the tokens
		const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret)

		// Sign-in the user with the credential
		return auth().signInWithCredential(twitterCredential)
	}
	// twitter sign in ends

	const LogoutButton = () => {
		return (
			<TouchableOpacity onPress={handleLogout}>
				<View>
					<Text style={styles.logout}>Logout</Text>
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
				setErrMsg("")
				setEmail("")
				setPass("")
				setShowLoader(false)
			})
	}
	useEffect(() => {
		console.log("Check for re-render-------------------------------")
		if (user) {
			console.log("cur usr inner------------------------------->", user)
			navigation.navigate("mygoals")
		}
	})
	useEffect(() => {
		if (user) {
			console.log("cur usr inner------------------------------->", user)
			navigation.navigate("mygoals")
		}
	}, [user])
	useEffect(() => {
		if (user != null) {
			setShowLoader(true)
			setTimeout(() => {
				console.log("first render")
				navigation.navigate("mygoals")
				setShowLoader(false)
			}, 3000)
		}

		return () => {}
	}, [])
	return (
		<ScrollView>
			<View style={styles.loginContainer}>
				<View style={{alignSelf: "flex-start"}}>
					<Text>{signInMode ? "Sign In" : "Sign Up"}</Text>
				</View>
				<View style={styles.inputContainer}>
					<View style={styles.inputView}>
						{errMsg.length ? <Text style={styles.errMsg}>{errMsg}</Text> : null}
						<TextInput
							placeholder="Email"
							style={styles.input}
							onChangeText={setEmail}
							value={email}
							keyboardType={"email-address"}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							style={styles.input}
							onChangeText={setPass}
							value={pass}
							placeholder="Password"
							secureTextEntry={true}
						/>
					</View>

					<TouchableOpacity onPress={signInMode ? handleEmailPassSignIn : handleEmailPassSignUp}>
						<View>
							<Text style={styles.signInBtn}>{signInMode ? "Sign In" : "Sign Up"}</Text>
						</View>
					</TouchableOpacity>
					<View style={styles.bottomContainer}>
						<Text>{!signInMode ? "Already registered? " : "Not registered? "}</Text>
						<TouchableOpacity
							onPress={() => {
								setErrMsg("")
								setEmail("")
								setPass("")
								setSignInMode(!signInMode)
							}}
						>
							<Text style={styles.signUp}>{!signInMode ? "Sign In" : "Sign Up"}</Text>
						</TouchableOpacity>
					</View>
					{signInMode ? (
						<View style={styles.bottomContainer}>
							<Text>Forgot Password? </Text>
							<TouchableOpacity
								onPress={() => {
									// auth().sendPasswordResetEmail(email).then()
									// setErrMsg("")
									// setPass("")
									navigation.navigate("ForgotPassword")
								}}
							>
								<Text style={styles.signUp}>Reset</Text>
							</TouchableOpacity>
						</View>
					) : null}
				</View>
				<View>
					<Text style={styles.OrTxt}>Or</Text>
				</View>

				<View>
					<GoogleSignIn />
					<FacebookSignIn />
					<TwitterSignIn />
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	loginContainer: {
		height: height,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "20%",
	},
	logout: {
		paddingHorizontal: sizeConstants.m,
		paddingVertical: sizeConstants.s,
		borderColor: forGoals.sixth,
		borderWidth: 1,
		backgroundColor: forGoals.sixth,
		color: ColorConstants.white,
		borderRadius: 10,
	},
	inputContainer: {width: "100%"},
	inputView: {
		marginVertical: sizeConstants.m,
	},
	input: {
		// width: "100%",
		borderColor: ColorConstants.darkFaintBlue,
		borderWidth: 1,
		borderRadius: sizeConstants.m,
		paddingHorizontal: sizeConstants.m,
	},

	OrTxt: {fontSize: sizeConstants.l, marginVertical: sizeConstants.l},
	FBSignInBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: ColorConstants.fbBlue,
		paddingHorizontal: sizeConstants.m,
		paddingVertical: sizeConstants.s,
		marginVertical: sizeConstants.s,
		elevation: 2,
		marginHorizontal: sizeConstants.eight,
		borderRadius: 3,
	},
	// FBIconContainer: {width: "10%"},
	FBIcon: {
		color: ColorConstants.white,
	},
	FBBtnTxtContainer: {
		alignItems: "center",
		width: "80%",
	},
	FBSignInBtnTxt: {
		color: ColorConstants.white,
		fontWeight: "bold",
	},
	GoogleSignInBtnTxt: {
		color: ColorConstants.blackOp60,
		fontWeight: "bold",
	},

	signInBtn: {
		paddingHorizontal: sizeConstants.m,
		paddingVertical: sizeConstants.s,
		marginVertical: sizeConstants.m,
		borderColor: forGoals.sixth,
		borderWidth: 1,
		width: "55%",
		alignSelf: "center",
		textAlign: "center",
		backgroundColor: forGoals.sixth,
		color: ColorConstants.white,
		borderRadius: sizeConstants.s,
	},
	errMsg: {
		color: forGoals.sixth,
		fontSize: sizeConstants.m,
		paddingVertical: sizeConstants.xs,
	},

	bottomContainer: {
		flexDirection: "row",
	},
	signUp: {
		color: ColorConstants.darkFaintBlue,
		textDecorationLine: "underline",
	},
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
