import React, {useState} from "react"
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {ColorConstants, forGoals, height, sizeConstants} from "../../core/constants"
import auth from "@react-native-firebase/auth"
import {connect} from "react-redux"
import {setShowLoader} from "../../redux/actions"
import {useNavigation} from "@react-navigation/native"

const ForgotPassword = (props) => {
	const {setShowLoader} = props
	const [email, setEmail] = useState("")
	const [errMsg, setErrMsg] = useState("")
	const navigation = useNavigation()

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
		if (error.code === 'auth/user-not-found'){
			console.log("No user found! Please sign up")
			setErrMsg("No user found! Please sign up")
		}
		console.error(error)
	}

	const areEmailPassEmpty = () => {
		console.log("email: ", email)
		if (!email.length) {
			setErrMsg("Please enter email")
			return true
		}

		setErrMsg("")
		return false
	}

	const handleForgotPassword = () => {
		setShowLoader(true)
		if (areEmailPassEmpty()) {
			setShowLoader(false)
			return
		}
		auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				Alert.alert("Check your mail", `Reset password link sent to ${email}`, [
					{text: "Got it", onPress: () => {}},
				])
				setShowLoader(false)
			})
			.catch((error) => {
				handleError(error)
				setShowLoader(false)
			})
	}
	return (
		<ScrollView>
			<View style={styles.loginContainer}>
				<View style={{alignSelf: "flex-start"}}>
					<Text>Forgot password</Text>
				</View>
				<View style={styles.inputContainer}>
					<View style={styles.inputView}>
						{errMsg.length ? <Text style={styles.errMsg}>{errMsg}</Text> : null}
						<TextInput
							placeholder="Email your email"
							style={styles.input}
							onChangeText={setEmail}
							value={email}
							keyboardType={"email-address"}
						/>
					</View>
					<View style={styles.bottomContainer}>
						<TouchableOpacity
							onPress={() => {
								// auth().sendPasswordResetEmail(email).then()
								// setErrMsg("")
								// setPass("")
								navigation.goBack()
							}}
						>
							<Text style={styles.signUp}>Go back to Login</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity onPress={handleForgotPassword}>
						<View>
							<Text style={styles.signInBtn}>Submit</Text>
						</View>
					</TouchableOpacity>
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
		setShowLoader: (data) => {
			dispatch(setShowLoader(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
