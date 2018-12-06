import {GET_COAS, COAS_LOADING, COAS_ERROR} from '../actions/types';

const intialState = {
    coas: null,
    loading: false,
    coas_errors: null,
};

export default function (state = intialState, action) {
    switch (action.type) {
        case COAS_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_COAS:
            return {
                ...state,
                coas: action.payload,
                loading: false,
            };
        case COAS_ERROR:
            return {
                ...state,
                loading: false,
                coas_errors: action.payload,
            };
        default:
            return state;
    }
}
