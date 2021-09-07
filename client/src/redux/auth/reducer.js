import action from './action'

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERR,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERR,

    FORGOT_REQUEST,
    FORGOT_SUCCESS,
    FORGOT_ERR,
} = action

const initState = {
    // login: auth !== null ? auth.login : false,
    login: false,
    loading: false,
    error: null,
    forgot: false
};


/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: data,
                loading: false
            };
        case LOGIN_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                login: data,
                loading: false,
            };
        case LOGOUT_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };
        case FORGOT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_SUCCESS:
            return {
                ...state,
                forgot: data,
                loading: false,
            };
        case FORGOT_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            };
        default:
            return state;
    }
};
export default AuthReducer;