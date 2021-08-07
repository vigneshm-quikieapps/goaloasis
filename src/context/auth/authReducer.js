export default (state, action) => {
	switch (action.type) {
		case "RELOAD":
			return {
				...state,
				reload: true,
			}
		default:
			return state
	}
}
