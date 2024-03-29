const actions = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERR: 'LOGIN_ERR',

    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERR: 'LOGOUT_ERR',

    FORGOT_REQUEST: 'FORGOT_REQUEST',
    FORGOT_SUCCESS: 'FORGOT_SUCCESS',
    FORGOT_ERR: 'FORGOT_ERR',


    loginRequest: () => {
        return {
            type: actions.LOGIN_REQUEST,
        };
    },

    loginSuccess: data => {
        return {
            type: actions.LOGIN_SUCCESS,
            data,
        };
    },

    loginErr: err => {
        return {
            type: actions.LOGIN_ERR,
            err,
        };
    },

    logoutRequest: () => {
        return {
            type: actions.LOGOUT_REQUEST,
        };
    },

    logoutSuccess: data => {
        return {
            type: actions.LOGOUT_SUCCESS,
            data,
        };
    },

    logoutErr: err => {
        return {
            type: actions.LOGOUT_ERR,
            err,
        };
    },

    forgotRequest: () => {
        return {
            type: actions.FORGOT_REQUEST,
        };
    },

    forgotSuccess: data => {
        return {
            type: actions.FORGOT_SUCCESS,
            data,
        };
    },

    forgotErr: err => {
        return {
            type: actions.FORGOT_ERR,
            err,
        };
    },

};

export default actions;
