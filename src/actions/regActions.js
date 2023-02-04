import axiosInstance from "../config/axios.config";
import { DELETE_STUDENT_FAIL, DELETE_STUDENT_REQ, FETCH_STUDENTS_FAIL, FETCH_STUDENTS_REQ, FETCH_STUDENTS_RES, REG_STUDENT_FAIL, REG_STUDENT_REQ, REG_STUDENT_RES } from "./types";

export const fetchStudentAction = () => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_STUDENTS_REQ,
        })
        const { data } = await axiosInstance.get('getStudentsList')
        dispatch({
            type: FETCH_STUDENTS_RES,
            payload: data.payload,
        })
    } catch (err) {
        dispatch({ type: FETCH_STUDENTS_FAIL })
    }
}

export const regStudentAction = (regReq) => async (dispatch) => {
    try {
        dispatch({
            type: REG_STUDENT_REQ,
        })
        const { data } = await axiosInstance.post('regStudent', regReq)
        dispatch({
            type: REG_STUDENT_RES,
            payload: data,
        })
    } catch (err) {
        dispatch({ type: REG_STUDENT_FAIL })
    }
}
export const deleteStudentAction = (studId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_STUDENT_REQ,
        })
        const { data } = await axiosInstance.delete(`deleteStudent/${studId}`)
        dispatch({
            type: DELETE_STUDENT_FAIL,
            payload: data,
        })
    } catch (err) {
        dispatch({ type: DELETE_STUDENT_FAIL })
    }
}
