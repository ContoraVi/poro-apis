import {GET_LEDGER_RECEIPTS, LEDGER_RECEIPTS_LOADING, LEDGER_RECEIPTS_ERROR} from '../actions/types';

const intialState = {
    ledgerReceipts: null,
    loading: false,
    errors: null,
};

export default function (state = intialState, action) {
    switch (action.type) {
        case LEDGER_RECEIPTS_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_LEDGER_RECEIPTS:
            return {
                ...state,
                ledgerReceipts: action.payload,
                loading: false,
                errors: null
            };
        case LEDGER_RECEIPTS_ERROR:
            return {
                ...state,
                ledgerReceipts: null,
                loading: false,
                errors: action.payload,
            };
        default:
            return state;
    }
}
