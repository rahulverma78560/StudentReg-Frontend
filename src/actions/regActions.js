import axios from "axios";
import { FETCH_STUDENTS } from "./types";

export const fetchPost = () => async (dispatch) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1',)

    dispatch({
        type: FETCH_STUDENTS,
        payload: data,
    })
}
