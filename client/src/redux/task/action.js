const actions = {
    GET_ALL_TASK_USER: 'GET_ALL_TASK_USER',
    GET_ALL_TASK_USER_REQUEST: 'GET_ALL_TASK_USER_REQUEST',
    GET_ALL_TASK_USER_ERR: 'GET_ALL_TASK_USER_ERR',

    GET_DETAIL_TASK_REQUEST: 'GET_DETAIL_TASK_REQUEST',
    GET_DETAIL_TASK_SUCCESS: 'GET_DETAIL_TASK_SUCCESS',
    GET_DETAIL_TASK_ERR: 'GET_DETAIL_TASK_ERR',

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

    getDetailTaskRequest: () => {
        return {
            type: actions.GET_DETAIL_TASK_REQUEST,
        };
    },

    getDetailTaskSuccess: data => {
        return {
            type: actions.GET_DETAIL_TASK_SUCCESS,
            data,
        };
    },

    getDetailTaskErr: err => {
        return {
            type: actions.GET_DETAIL_TASK_ERR,
            err,
        };
    },

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
