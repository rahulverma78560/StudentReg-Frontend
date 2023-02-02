import axiosInstance from "../config/axios.config";
import { FETCH_STUDENTS_FAIL, FETCH_STUDENTS_REQ, FETCH_STUDENTS_RES, REG_STUDENT_FAIL, REG_STUDENT_REQ, REG_STUDENT_RES } from "./types";

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
