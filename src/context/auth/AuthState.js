/* eslint-disable no-unused-vars */
import React, {useReducer} from "react"
import authContext from "./authContext"
import authReducer from "./authReducer"

const AuthState = (props) => {
	const initialState = {
		reload: false,
	}

	const [state, dispatch] = useReducer(authReducer, initialState)

	// GET TOKEN
	const loadUser = async () => {
		dispatch({
			type: "RELOAD",
		})
	}

	return (
		<authContext.Provider
			value={{
				reload: state.reload,
				loadUser,
			}}
		>
			{props.children}
		</authContext.Provider>
	)
}
export default AuthState
