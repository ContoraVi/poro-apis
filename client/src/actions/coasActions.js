import axios from 'axios';

import {GET_COAS, COAS_LOADING, COAS_ERROR} from "./types";

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
