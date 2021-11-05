const actions = {
    GET_ALL_TASK_USER: 'GET_ALL_TASK_USER',
    GET_ALL_TASK_USER_REQUEST: 'GET_ALL_TASK_USER_REQUEST',
    GET_ALL_TASK_USER_ERR: 'GET_ALL_TASK_USER_ERR',

    // LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    // LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    // LOGOUT_ERR: 'LOGOUT_ERR',

    // FORGOT_REQUEST: 'FORGOT_REQUEST',
    // FORGOT_SUCCESS: 'FORGOT_SUCCESS',
    // FORGOT_ERR: 'FORGOT_ERR',

    getAllTaskUserEffect: (data) => {
        return {
            type: actions.GET_ALL_TASK_USER,
            data,
        };
    },

    getAllTaskUserRequest: () => {
        return {
            type: actions.GET_ALL_TASK_USER_REQUEST,
        };
    },

    getAllTaskUserErr: (err) => {
        return {
            type: actions.GET_ALL_TASK_USER_ERR,
            err,
        };
    },

    // logoutRequest: () => {
    //     return {
    //         type: actions.LOGOUT_REQUEST,
    //     };
    // },

    // logoutSuccess: data => {
    //     return {
    //         type: actions.LOGOUT_SUCCESS,
    //         data,
    //     };
    // },

    // logoutErr: err => {
    //     return {
    //         type: actions.LOGOUT_ERR,
    //         err,
    //     };
    // },

    // forgotRequest: () => {
    //     return {
    //         type: actions.FORGOT_REQUEST,
    //     };
    // },

    // forgotSuccess: data => {
    //     return {
    //         type: actions.FORGOT_SUCCESS,
    //         data,
    //     };
    // },

    // forgotErr: err => {
    //     return {
    //         type: actions.FORGOT_ERR,
    //         err,
    //     };
    // },
};

export default actions;
