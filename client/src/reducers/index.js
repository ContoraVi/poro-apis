import {combineReducers} from 'redux';
import authReducer from './authReducer';
import apiAuthReducer from './apiAuthReducer';
import errorReducer from './errorReducer';
import coasReducer from './coasReducer';

export default combineReducers({
    auth: authReducer,
    apiAuth: apiAuthReducer,
    errors: errorReducer,
    coas: coasReducer,
});
