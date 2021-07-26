import React from "react"
import {View, ActivityIndicator} from "react-native"
import {connect} from "react-redux"
import {setShowLoader} from "../redux/actions"
import {setHideLoader} from "./../redux/actions"

const Spinner = ({size, loading, setHideLoader, setShowLoader}) => {
	return (
		<View>
			<View style={styles.spinnerStyle}>
				<ActivityIndicator size={size || "large"} />
			</View>
		</View>
	)
}

const styles = {
	spinnerStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "pink",
	},
}

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
