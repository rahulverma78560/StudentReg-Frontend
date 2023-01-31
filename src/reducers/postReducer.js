import { FETCH_STUDENTS } from "../actions/types";

const initialState = {
    items: [],
    item: {}
}


export const fetchStudentReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_STUDENTS:
            return {
                ...state,
                items: actions.payload
            }
        default:
            return state
    }
}