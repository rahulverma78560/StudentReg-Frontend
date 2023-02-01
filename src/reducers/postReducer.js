import { FETCH_STUDENTS_FAIL, FETCH_STUDENTS_REQ, FETCH_STUDENTS_RES, REG_STUDENT_FAIL, REG_STUDENT_REQ, REG_STUDENT_RES, REG_STUDENT_RESET } from "../actions/types";

export const fetchStudentReducers = (state = {
    items: [],
    item: {}
}, actions) => {
    switch (actions.type) {
        case FETCH_STUDENTS_REQ:
            return {
                items: true
            }
        case FETCH_STUDENTS_RES:
            return {
                ...state,
                items: actions.payload
            }
        case FETCH_STUDENTS_FAIL:
            return {
                items: false
            }
        default:
            return state
    }
}

export const regStudentReducers = (state = {
    items: [],
    item: {}
}, actions) => {
    switch (actions.type) {
        case REG_STUDENT_REQ:
            return {
                items: true
            }
        case REG_STUDENT_RESET:
            return {
                items: {}
            }
        case REG_STUDENT_RES:
            return {
                ...state,
                items: actions.payload
            }
        case REG_STUDENT_FAIL:
            return {
                items: false
            }
        default:
            return state
    }
}