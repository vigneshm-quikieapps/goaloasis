import React from "react"
import {View, ActivityIndicator, StyleSheet, Modal} from "react-native"
import {connect} from "react-redux"
import {setShowLoader} from "../redux/actions"
import {setHideLoader} from "./../redux/actions"
import {ColorConstants} from "./../core/constants"

const Spinner = ({size, loading, setHideLoader, setShowLoader, style}) => {
	return (
		<View style={[styles.spinnerStyle, style]}>
			<ActivityIndicator size="large" color="#7EC8C9" />
		</View>
	)
}

const styles = StyleSheet.create({
	spinnerStyle: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorConstants.faintWhite,
		position: "absolute",
		width: 75,
		height: 75,
		borderRadius: 10,
		flex: 1,
		top: "50%",
		left: "40%",
	},
})

const mapStateToProps = (state) => ({
	loading: state.milestone.loading,
})

const mapDispatchToProps = (dispatch) => {
	return {
		setShowLoader: () => {
			dispatch(setShowLoader())
		},

		setHideLoader: () => {
			dispatch(setHideLoader())
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Spinner)
