import { GET_NETSALE } from "../actions/types";

const initialState = {
    netsale:[],
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_NETSALE:
            return {
                ...state,
                netsale: payload.netsale,
            } 
        default:
            return state;
    }
}