import { GET_NETSALE } from "./types";

//GET  NETSALE
export const getNetSaleAction = (netSales) => ({
    type: GET_NETSALE,
    payload: {
        netsale: netSales
    }
})