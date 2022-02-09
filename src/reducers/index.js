import { combineReducers } from "redux";
import netsale from './netsale';
import expense from './expense';


export default combineReducers({
    netsale,
    expense,
})