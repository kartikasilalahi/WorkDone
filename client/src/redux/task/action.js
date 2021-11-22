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

    GET_TOTAL_TASK_SUCCESS: 'GET_TOTAL_TASK_SUCCESS',
    GET_TOTAL_TASK_REQUEST: 'GET_TOTAL_TASK_REQUEST',
    GET_TOTAL_TASK_ERR: 'GET_TOTAL_TASK_ERR',


    GET_NOTIF_TASK_SUCCESS: 'GET_NOTIF_TASK_SUCCESS',
    GET_NOTIF_TASK_REQUEST: 'GET_NOTIF_TASK_REQUEST',
    GET_NOTIF_TASK_ERR: 'GET_NOTIF_TASK_ERR',

    MARK_READ_TASK_SUCCESS: 'MARK_READ_TASK_SUCCESS',
    MARK_READ_TASK_REQUEST: 'MARK_READ_TASK_REQUEST',
    MARK_READ_TASK_ERR: 'MARK_READ_TASK_ERR',

    UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
    UPDATE_TASK_REQUEST: 'UPDATE_TASK_REQUEST',
    UPDATE_TASK_ERR: 'UPDATE_TASK_ERR',

    SEND_REPORT_SUCCESS: 'SEND_REPORT_SUCCESS',
    SEND_REPORT_REQUEST: 'SEND_REPORT_REQUEST',
    SEND_REPORT_ERR: 'SEND_REPORT_ERR',

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



    getTotalTaskSuccess: (data) => {
        return {
            type: actions.GET_TOTAL_TASK_SUCCESS,
            data
        }
    },

    getTotalTaskRequest: () => {
        return {
            type: actions.GET_TOTAL_TASK_REQUEST,
        }
    },

    getTotalTaskErr: (data) => {
        return {
            type: actions.GET_TOTAL_TASK_SUCCESS,
            data
        }
    },



    getNotifTaskSuccess: (data) => {
        return {
            type: actions.GET_NOTIF_TASK_SUCCESS,
            data
        }
    },

    getNotifTaskRequest: () => {
        return {
            type: actions.GET_NOTIF_TASK_REQUEST,
        }
    },

    getNotifTaskErr: (data) => {
        return {
            type: actions.GET_NOTIF_TASK_ERR,
            data
        }
    },



    markReadTaskSuccess: (data) => {
        return {
            type: actions.MARK_READ_TASK_SUCCESS,
            data
        }
    },

    markReadTaskRequest: () => {
        return {
            type: actions.MARK_READ_TASK_REQUEST,
        }
    },

    markReadTaskErr: (data) => {
        return {
            type: actions.MARK_READ_TASK_ERR,
            data
        }
    },


    updateTaskSuccess: (data) => {
        return {
            type: actions.UPDATE_TASK_SUCCESS,
            data
        }
    },

    updateTaskRequest: () => {
        return {
            type: actions.UPDATE_TASK_REQUEST,
        }
    },

    updateTaskErr: (data) => {
        return {
            type: actions.UPDATE_TASK_ERR,
            data
        }
    },

    sendReportSuccess: (data) => {
        return {
            type: actions.SEND_REPORT_SUCCESS,
            data
        }
    },

    sendReportRequest: () => {
        return {
            type: actions.SEND_REPORT_REQUEST,
        }
    },

    sendReportErr: (data) => {
        return {
            type: actions.SEND_REPORT_ERR,
            data
        }
    },

};

export default actions;
