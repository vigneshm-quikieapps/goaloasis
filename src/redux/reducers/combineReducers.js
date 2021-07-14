import { combineReducers } from "redux";
import milestoneReducer from "./milestoneReducer";

const rootReducer = combineReducers({
    milestone: milestoneReducer
})

export default rootReducer;