import axios from 'axios';
import {GET_COAS, COAS_LOADING, COAS_ERROR, SET_API_USER} from "./types";

//Get Chart of Accounts
export const getCoas = accessToken => dispatch => {
    dispatch(setCoasLoading());

    axios.get('/api/coas',
        {
            params: {
                accessToken: accessToken.access_token
            }
        })
        .then(res =>
            dispatch({
                type: GET_COAS,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: COAS_ERROR,
                payload: err
            }),
        );
};

// Chart of Accounts are loading
export const setCoasLoading = () => {
    return {
        type: COAS_LOADING
    }
};

// Set logged in user
export const setCurrentApiUser = decoded => {
    return {
        type: SET_API_USER,
        payload: decoded
    }
};

export const setCoas = () => {
    return {
        type: GET_COAS,
        payload: null
    }
}

// Clear coas
export const clearCoas = () => dispatch => {
    dispatch(setCoas());
};
