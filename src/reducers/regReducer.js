import { DELETE_STUDENT_FAIL, DELETE_STUDENT_REQ, DELETE_STUDENT_RES, FETCH_STUDENTS_FAIL, FETCH_STUDENTS_REQ, FETCH_STUDENTS_RES, REG_STUDENT_FAIL, REG_STUDENT_REQ, REG_STUDENT_RES, REG_STUDENT_RESET } from "../actions/types";

const initialState = {
    items: [],
    item: {}
}
export const fetchStudentReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_STUDENTS_REQ:
            return {
                items: { loading: true }
            }
        case FETCH_STUDENTS_RES:
            return {
                ...state,
                items: actions.payload
            }
        case FETCH_STUDENTS_FAIL:
            return {
                items: { loading: false }
            }
        default:
            return state
    }
}

export const regStudentReducers = (state = initialState, actions) => {
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

export const deleteStudentReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case DELETE_STUDENT_REQ:
            return {
                items: { loading: true }
            }
        case DELETE_STUDENT_RES:
            return {
                ...state,
                items: actions.payload
            }
        case DELETE_STUDENT_FAIL:
            return {
                items: { loading: false }
            }
        default:
            return state
    }
}