const actions = {
    GET_ALL_TASK_USER: 'GET_ALL_TASK_USER',
    GET_ALL_TASK_USER_REQUEST: 'GET_ALL_TASK_USER_REQUEST',
    GET_ALL_TASK_USER_ERR: 'GET_ALL_TASK_USER_ERR',

    GET_DETAIL_TASK_REQUEST: 'GET_DETAIL_TASK_REQUEST',
    GET_DETAIL_TASK_SUCCESS: 'GET_DETAIL_TASK_SUCCESS',
    GET_DETAIL_TASK_ERR: 'GET_DETAIL_TASK_ERR',


    GET_ALL_PROJECT_USER: 'GET_ALL_PROJECT_USER',
    GET_ALL_PROJECT_USER_REQUEST: 'GET_ALL_PROJECT_USER_REQUEST',
    GET_ALL_PROJECT_USER_ERR: 'GET_ALL_PROJECT_USER_ERR',

    GET_DETAIL_PROJECT_REQUEST: 'GET_DETAIL_PROJECT_REQUEST',
    GET_DETAIL_PROJECT_SUCCESS: 'GET_DETAIL_PROJECT_SUCCESS',
    GET_DETAIL_PROJECT_ERR: 'GET_DETAIL_PROJECT_ERR',


    UPDATE_PROGRESS_TASK_REQUEST: 'UPDATE_PROGRESS_TASK_REQUEST',
    UPDATE_PROGRESS_TASK_SUCCESS: 'UPDATE_PROGRESS_TASK_SUCCESS',
    UPDATE_PROGRESS_TASK_ERR: 'UPDATE_PROGRESS_TASK_ERR',

    GET_USER_DEPARTEMEN_REQUEST: 'GET_USER_DEPARTEMEN_REQUEST',
    GET_USER_DEPARTEMEN_SUCCESS: 'GET_USER_DEPARTEMEN_SUCCESS',
    GET_USER_DEPARTEMEN_ERR: 'GET_USER_DEPARTEMEN_ERR',


    ADD_NEW_TASK_REQUEST: 'ADD_NEW_TASK_REQUEST',
    ADD_NEW_TASK_SUCCESS: 'ADD_NEW_TASK_SUCCESS',
    ADD_NEW_TASK_ERR: 'ADD_NEW_TASK_ERR',



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


    // ----------------------------------------
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



    // -------------------------------
    getAllProjectUserSuccess: (data) => {
        return {
            type: actions.GET_ALL_PROJECT_USER,
            data,
        };
    },

    getAllProjectUserRequest: () => {
        return {
            type: actions.GET_ALL_PROJECT_USER_REQUEST,
        };
    },

    getAllProjectUserErr: (err) => {
        return {
            type: actions.GET_ALL_PROJECT_USER_ERR,
            err,
        };
    },



    // ---------------------------------------
    getDetailProjectRequest: () => {
        return {
            type: actions.GET_DETAIL_PROJECT_REQUEST,
        };
    },

    getDetailProjectSuccess: data => {
        return {
            type: actions.GET_DETAIL_PROJECT_SUCCESS,
            data,
        };
    },

    getDetailProjectErr: err => {
        return {
            type: actions.GET_DETAIL_PROJECT_ERR,
            err,
        };
    },



    // ----------------------------------
    updateProgressTaskRequest: () => {
        return {
            type: actions.UPDATE_PROGRESS_TASK_REQUEST,
        };
    },

    updateProgressTaskSuccess: data => {
        return {
            type: actions.UPDATE_PROGRESS_TASK_SUCCESS,
            data,
        };
    },

    updateProgressTaskErr: err => {
        return {
            type: actions.UPDATE_PROGRESS_TASK_ERR,
            err,
        };
    },


    // -------------------------------------
    getUserDepartemenSuccess: (data) => {
        return {
            type: actions.GET_USER_DEPARTEMEN_SUCCESS,
            data,
        };
    },

    getUserDepartemenRequest: () => {
        return {
            type: actions.GET_USER_DEPARTEMEN_REQUEST,
        };
    },

    getUserDepartemenErr: (err) => {
        return {
            type: actions.GET_USER_DEPARTEMEN_ERR,
            err,
        };
    },



    // -----------------------------------------
    addNewTaskSuccess: (data) => {
        return {
            type: actions.ADD_NEW_TASK_SUCCESS,
            data
        }
    },

    addNewTaskRequest: () => {
        return {
            type: actions.ADD_NEW_TASK_REQUEST,
        }
    },

    addNewTaskErr: (data) => {
        return {
            type: actions.ADD_NEW_TASK_SUCCESS,
            data
        }
    },



    // ----------------------------

};

export default actions;
