import { combineReducers } from "redux";
import { fetchStudentReducers, regStudentReducers } from "./postReducer";

export default combineReducers({
    fetchStudent: fetchStudentReducers,
    regStudent: regStudentReducers
})