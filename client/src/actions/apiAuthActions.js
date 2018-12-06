import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS, SET_API_USER} from "./types";

// Api Login
export const apiLogin = (apiLoginData) => dispatch => {
    axios
        .post('/api-auth/login', apiLoginData)
        .then(res => {

            const {token} = res.data;

            // Set token to ls
            localStorage.setItem('apiToken', token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
             dispatch(setCurrentApiUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

// Set logged in user
export const setCurrentApiUser = decoded => {
    return {
        type: SET_API_USER,
        payload: decoded
    }
};

// Log user out
export const logoutApiUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('apiToken');
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentApiUser({}));
};


