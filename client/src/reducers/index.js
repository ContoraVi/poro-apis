import {combineReducers} from 'redux';
import authReducer from './authReducer';
import apiAuthReducer from './apiAuthReducer';
import errorReducer from './errorReducer';
import coasReducer from './coasReducer';
import ledgerReceiptsReducer from './ledgerReceiptsReducer';
import ledgerReceiptIdReducer from './ledgerReceiptIdReducer';

export default combineReducers({
    auth: authReducer,
    apiAuth: apiAuthReducer,
    errors: errorReducer,
    coas: coasReducer,
    ledgerReceipts: ledgerReceiptsReducer,
    ledgerReceiptId: ledgerReceiptIdReducer,
});
