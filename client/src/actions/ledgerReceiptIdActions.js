import axios from 'axios';
import {GET_LEDGER_RECEIPT_ID, LEDGER_RECEIPT_ID_LOADING, LEDGER_RECEIPT_ID_ERROR, SET_API_USER} from "./types";

//Get Ledger Receipt by id
export const getLedgerReceiptId = (accessToken, receiptId) => dispatch => {
    dispatch(setLedgerReceiptIdLoading());

    axios.get('/api/ledgerreceipt',
        {
            params: {
                accessToken: accessToken.access_token,
                receiptId: receiptId
            }
        })
        .then(res =>
            dispatch({
                type: GET_LEDGER_RECEIPT_ID,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: LEDGER_RECEIPT_ID_ERROR,
                payload: err
            }),
        );
};

// Ledger Receipt is loading
export const setLedgerReceiptIdLoading = () => {
    return {
        type: LEDGER_RECEIPT_ID_LOADING
    }
};

// Set logged in user
export const setCurrentApiUser = decoded => {
    return {
        type: SET_API_USER,
        payload: decoded
    }
};

export const setLedgerReceiptId = () => {
    return {
        type: GET_LEDGER_RECEIPT_ID,
        payload: null
    }
};

// Clear Ledger Receipt
export const clearLedgerReceiptId = () => dispatch => {
    dispatch(setLedgerReceiptId());
};
