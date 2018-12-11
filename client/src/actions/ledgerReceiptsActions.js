import axios from 'axios';
import {GET_LEDGER_RECEIPTS, LEDGER_RECEIPTS_LOADING, LEDGER_RECEIPTS_ERROR, SET_API_USER} from "./types";

//Get Ledger Receipts
export const getLedgerReceipts = accessToken => dispatch => {
    dispatch(setLedgerReceiptsLoading());

    axios.get('/api/ledgerreceipts',
        {
            params: {
                accessToken: accessToken.access_token
            }
        })
        .then(res =>
            dispatch({
                type: GET_LEDGER_RECEIPTS,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: LEDGER_RECEIPTS_ERROR,
                payload: err
            }),
        );
};

// Ledger Receipts are loading
export const setLedgerReceiptsLoading = () => {
    return {
        type: LEDGER_RECEIPTS_LOADING
    }
};

// Set logged in user
export const setCurrentApiUser = decoded => {
    return {
        type: SET_API_USER,
        payload: decoded
    }
};

export const setLedgerReceipts = () => {
    return {
        type: GET_LEDGER_RECEIPTS,
        payload: null
    }
};

// Clear Ledger Receipts
export const clearLedgerReceipts = () => dispatch => {
    dispatch(setLedgerReceipts());
};
