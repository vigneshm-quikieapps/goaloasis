import React from "react"
import {View, ActivityIndicator, StyleSheet, Modal} from "react-native"
import {connect} from "react-redux"
import {setShowLoader} from "../redux/actions"
import {ColorConstants} from "./../core/constants"

const Spinner = ({size, loading, setShowLoader, style}) => {
	return (
		<View style={[styles.spinnerStyle, style]}>
			<ActivityIndicator hidesWhenStopped={true} size="large" color="#7EC8C9" />
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
		zIndex: 100,
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
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Spinner)
