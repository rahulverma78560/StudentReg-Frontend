import { combineReducers } from "redux";
import { deleteStudentReducers, fetchStudentReducers, regStudentReducers } from "./regReducer";

export default combineReducers({
    fetchStudent: fetchStudentReducers,
    regStudent: regStudentReducers,
    deleteStudent: deleteStudentReducers
})