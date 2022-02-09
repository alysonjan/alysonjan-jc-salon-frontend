import { GET_EXPENSE } from "../actions/types";

const initialState = {
    expense:[],
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_EXPENSE:
            return {
                ...state,
                expense: payload.expense,
            } 
        default:
            return state;
    }
}