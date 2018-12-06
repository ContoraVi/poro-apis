import isEmpty from '../validation/is-empty';

import {SET_API_USER} from "../actions/types";

const initialState = {
    isApiAuthenticated: false,
    apiUser: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_API_USER:
            return {
                ...state,
                isApiAuthenticated: !isEmpty(action.payload),
                apiUser: action.payload
            };
        default:
            return state;
    }
}
