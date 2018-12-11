import {GET_LEDGER_RECEIPT_ID, LEDGER_RECEIPT_ID_LOADING, LEDGER_RECEIPT_ID_ERROR} from '../actions/types';

const intialState = {
    ledgerReceiptId: null,
    loading: false,
    errors: null,
};

export default function (state = intialState, action) {
    switch (action.type) {
        case LEDGER_RECEIPT_ID_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_LEDGER_RECEIPT_ID:
            return {
                ...state,
                ledgerReceiptId: action.payload,
                loading: false,
                errors: null
            };
        case LEDGER_RECEIPT_ID_ERROR:
            return {
                ...state,
                ledgerReceiptId: null,
                loading: false,
                errors: action.payload,
            };
        default:
            return state;
    }
}
