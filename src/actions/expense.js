import { GET_EXPENSE } from "./types";

//GET  EXPENSE
export const getExpenseAction = (newExpense) => ({
    type: GET_EXPENSE,
    payload: {
        expense: newExpense
    }
})