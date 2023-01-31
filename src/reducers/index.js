import { combineReducers } from "redux";
import { fetchStudentReducers } from "./postReducer";

export default combineReducers({
    posts: fetchStudentReducers
})