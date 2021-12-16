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

    GET_ALL_PROJECT_DEPARTEMEN_SUCCESS: 'GET_ALL_PROJECT_DEPARTEMEN_SUCCESS',
    GET_ALL_PROJECT_DEPARTEMEN_REQUEST: 'GET_ALL_PROJECT_DEPARTEMEN_REQUEST',
    GET_ALL_PROJECT_DEPARTEMEN_ERR: 'GET_ALL_PROJECT_DEPARTEMEN_ERR',

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

    GET_ALL_TASK_REVIEWER_SUCCESS: 'GET_ALL_TASK_REVIEWER_SUCCESS',
    GET_ALL_TASK_REVIEWER_REQUEST: 'GET_ALL_TASK_REVIEWER_REQUEST',
    GET_ALL_TASK_REVIEWER_ERR: 'GET_ALL_TASK_REVIEWER_ERR',

    GET_NOTIF_REVIEWER_SUCCESS: 'GET_NOTIF_REVIEWER_SUCCESS',
    GET_NOTIF_REVIEWER_REQUEST: 'GET_NOTIF_REVIEWER_REQUEST',
    GET_NOTIF_REVIEWER_ERR: 'GET_NOTIF_REVIEWER_ERR',

    MARK_READ_BY_REVIEWER_SUCCESS: 'MARK_READ_BY_REVIEWER_SUCCESS',
    MARK_READ_BY_REVIEWER_REQUEST: 'MARK_READ_BY_REVIEWER_REQUEST',
    MARK_READ_BY_REVIEWER_ERR: 'MARK_READ_BY_REVIEWER_ERR',

    GET_ALL_PROJECT_IN_DEPARTEMEN_SUCCESS: 'GET_ALL_PROJECT_IN_DEPARTEMEN_SUCCESS',
    GET_ALL_PROJECT_IN_DEPARTEMEN_REQUEST: 'GET_ALL_PROJECT_IN_DEPARTEMEN_REQUEST',
    GET_ALL_PROJECT_IN_DEPARTEMEN_ERR: 'GET_ALL_PROJECT_IN_DEPARTEMEN_ERR',

    ADD_PROJECT_SUCCESS: 'ADD_PROJECT_SUCCESS',
    ADD_PROJECT_REQUEST: 'ADD_PROJECT_REQUEST',
    ADD_PROJECT_ERR: 'ADD_PROJECT_ERR',

    GET_ALL_DEPARTEMEN_SUCCESS: 'GET_ALL_DEPARTEMEN_SUCCESS',
    GET_ALL_DEPARTEMEN_REQUEST: 'GET_ALL_DEPARTEMEN_REQUEST',
    GET_ALL_DEPARTEMEN_ERR: 'GET_ALL_DEPARTEMEN_ERR',

    GET_ALL_PROJECT_SUCCESS: 'GET_ALL_PROJECT_SUCCESS',
    GET_ALL_PROJECT_REQUEST: 'GET_ALL_PROJECT_REQUEST',
    GET_ALL_PROJECT_ERR: 'GET_ALL_PROJECT_ERR',


    GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
    GET_ALL_USER_REQUEST: 'GET_ALL_USER_REQUEST',
    GET_ALL_USER_ERR: 'GET_ALL_USER_ERR',

    ADD_DEPARTEMEN_SUCCESS: 'ADD_DEPARTEMEN_SUCCESS',
    ADD_DEPARTEMEN_REQUEST: 'ADD_DEPARTEMEN_REQUEST',
    ADD_DEPARTEMEN_ERR: 'ADD_DEPARTEMEN_ERR',

    EDIT_DEPARTEMEN_SUCCESS: 'EDIT_DEPARTEMEN_SUCCESS',
    EDIT_DEPARTEMEN_REQUEST: 'EDIT_DEPARTEMEN_REQUEST',
    EDIT_DEPARTEMEN_ERR: 'EDIT_DEPARTEMEN_ERR',

    GET_ALL_TASK_SUCCESS: 'GET_ALL_TASK_SUCCESS',
    GET_ALL_TASK_REQUEST: 'GET_ALL_TASK_REQUEST',
    GET_ALL_TASK_ERR: 'GET_ALL_TASK_ERR',

    GET_ALL_PROJECT_SUCCESS: 'GET_ALL_PROJECT_SUCCESS',
    GET_ALL_PROJECT_REQUEST: 'GET_ALL_PROJECT_REQUEST',
    GET_ALL_PROJECT_ERR: 'GET_ALL_PROJECT_ERR',

    GET_PROFILE_USER_SUCCESS: 'GET_PROFILE_USER_SUCCESS',
    GET_PROFILE_USER_REQUEST: 'GET_PROFILE_USER_REQUEST',
    GET_PROFILE_USER_ERR: 'GET_PROFILE_USER_ERR',

    GET_JABATAN_IN_DEPARTEMEN_SUCCESS: 'GET_JABATAN_IN_DEPARTEMEN_SUCCESS',
    GET_JABATAN_IN_DEPARTEMEN_REQUEST: 'GET_JABATAN_IN_DEPARTEMEN_REQUEST',
    GET_JABATAN_IN_DEPARTEMEN_ERR: 'GET_JABATAN_IN_DEPARTEMEN_ERR',

    ADD_NEW_USER_REQUEST: 'ADD_NEW_USER_REQUEST',
    ADD_NEW_USER_SUCCESS: 'ADD_NEW_USER_SUCCESS',
    ADD_NEW_USER_ERR: 'ADD_NEW_USER_ERR',

    CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_ERR: 'CHANGE_PASSWORD_ERR',


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


    getAllProjectDepartemenSuccess: (data) => {
        return {
            type: actions.GET_ALL_PROJECT_DEPARTEMEN_SUCCESS,
            data,
        };
    },

    getAllProjectDepartemenRequest: () => {
        return {
            type: actions.GET_ALL_PROJECT_DEPARTEMEN_REQUEST,
        };
    },

    getAllProjectDepartemenErr: (err) => {
        return {
            type: actions.GET_ALL_PROJECT_DEPARTEMEN_ERR,
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
            type: actions.GET_TOTAL_TASK_ERR,
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

    getAllTaskReviewerRequest: () => {
        return {
            type: actions.GET_ALL_TASK_REVIEWER_REQUEST,
        };
    },

    getAllTaskReviewerSuccess: data => {
        return {
            type: actions.GET_ALL_TASK_REVIEWER_SUCCESS,
            data,
        };
    },

    getAllTaskReviewerErr: err => {
        return {
            type: actions.GET_ALL_TASK_REVIEWER_ERR,
            err,
        };
    },

    getNotifReviewerSuccess: (data) => {
        return {
            type: actions.GET_NOTIF_REVIEWER_SUCCESS,
            data
        }
    },

    getNotifReviewerRequest: () => {
        return {
            type: actions.GET_NOTIF_REVIEWER_REQUEST,
        }
    },

    getNotifReviewerErr: (data) => {
        return {
            type: actions.GET_NOTIF_REVIEWER_ERR,
            data
        }
    },

    markReadByReviewerSuccess: (data) => {
        return {
            type: actions.MARK_READ_BY_REVIEWER_SUCCESS,
            data
        }
    },

    markReadByReviewerRequest: () => {
        return {
            type: actions.MARK_READ_BY_REVIEWER_REQUEST,
        }
    },

    markReadByReviewerErr: (data) => {
        return {
            type: actions.MARK_READ_BY_REVIEWER_ERR,
            data
        }
    },

    getAllProjectInDepartemenSuccess: (data) => {
        return {
            type: actions.GET_ALL_PROJECT_IN_DEPARTEMEN_SUCCESS,
            data
        }
    },

    getAllProjectInDepartemenRequest: () => {
        return {
            type: actions.GET_ALL_PROJECT_IN_DEPARTEMEN_REQUEST,
        }
    },

    getAllProjectInDepartemenErr: (data) => {
        return {
            type: actions.GET_ALL_PROJECT_IN_DEPARTEMEN_ERR,
            data
        }
    },

    addProjectSuccess: (data) => {
        return {
            type: actions.ADD_PROJECT_SUCCESS,
            data
        }
    },

    addProjectRequest: () => {
        return {
            type: actions.ADD_PROJECT_REQUEST,
        }
    },

    addProjectErr: (data) => {
        return {
            type: actions.ADD_PROJECT_ERR,
            data
        }
    },

    getAllDepartemenSuccess: (data) => {
        return {
            type: actions.GET_ALL_DEPARTEMEN_SUCCESS,
            data
        }
    },

    getAllDepartemenRequest: () => {
        return {
            type: actions.GET_ALL_DEPARTEMEN_REQUEST,
        }
    },

    getAllDepartemenErr: (data) => {
        return {
            type: actions.GET_ALL_DEPARTEMEN_ERR,
            data
        }
    },


    getAllUserSuccess: (data) => {
        return {
            type: actions.GET_ALL_USER_SUCCESS,
            data
        }
    },

    getAllUserRequest: () => {
        return {
            type: actions.GET_ALL_USER_REQUEST,
        }
    },

    getAllUserErr: (data) => {
        return {
            type: actions.GET_ALL_USER_ERR,
            data
        }
    },

    addDepartemenSuccess: (data) => {
        return {
            type: actions.ADD_DEPARTEMEN_SUCCESS,
            data
        }
    },

    addDepartemenRequest: () => {
        return {
            type: actions.ADD_DEPARTEMEN_REQUEST,
        }
    },

    addDepartemenErr: (data) => {
        return {
            type: actions.ADD_DEPARTEMEN_ERR,
            data
        }
    },

    editDepartemenSuccess: (data) => {
        return {
            type: actions.EDIT_DEPARTEMEN_SUCCESS,
            data
        }
    },

    editDepartemenRequest: () => {
        return {
            type: actions.EDIT_DEPARTEMEN_REQUEST,
        }
    },

    editDepartemenErr: (data) => {
        return {
            type: actions.EDIT_DEPARTEMEN_ERR,
            data
        }
    },

    getAllTaskSuccess: (data) => {
        return {
            type: actions.GET_ALL_TASK_SUCCESS,
            data
        }
    },

    getAllTaskRequest: () => {
        return {
            type: actions.GET_ALL_TASK_REQUEST,
        }
    },

    getAllTaskErr: (data) => {
        return {
            type: actions.GET_ALL_TASK_ERR,
            data
        }
    },

    getAllProjectSuccess: (data) => {
        return {
            type: actions.GET_ALL_PROJECT_SUCCESS,
            data
        }
    },

    getAllProjectRequest: () => {
        return {
            type: actions.GET_ALL_PROJECT_REQUEST,
        }
    },

    getAllProjectErr: (data) => {
        return {
            type: actions.GET_ALL_PROJECT_ERR,
            data
        }
    },

    getProfileUserSuccess: (data) => {
        return {
            type: actions.GET_PROFILE_USER_SUCCESS,
            data
        }
    },

    getProfileUserRequest: () => {
        return {
            type: actions.GET_PROFILE_USER_REQUEST,
        }
    },

    getProfileUserErr: (data) => {
        return {
            type: actions.GET_PROFILE_USER_ERR,
            data
        }
    },

    getJabatanInDepartemenSuccess: (data) => {
        return {
            type: actions.GET_JABATAN_IN_DEPARTEMEN_SUCCESS,
            data
        }
    },

    getJabatanInDepartemenRequest: () => {
        return {
            type: actions.GET_JABATAN_IN_DEPARTEMEN_REQUEST,
        }
    },

    getJabatanInDepartemenErr: (data) => {
        return {
            type: actions.GET_JABATAN_IN_DEPARTEMEN_ERR,
            data
        }
    },


    addNewUserRequest: () => {
        return {
            type: actions.ADD_NEW_USER_REQUEST,
        };
    },

    addNewUserSuccess: data => {
        return {
            type: actions.ADD_NEW_USER_SUCCESS,
            data,
        };
    },

    addNewUserErr: err => {
        return {
            type: actions.ADD_NEW_USER_ERR,
            err,
        };
    },

    changePasswordRequest: () => {
        return {
            type: actions.CHANGE_PASSWORD_REQUEST,
        };
    },

    changePasswordSuccess: data => {
        return {
            type: actions.CHANGE_PASSWORD_SUCCESS,
            data,
        };
    },

    changePasswordErr: err => {
        return {
            type: actions.CHANGE_PASSWORD_ERR,
            err,
        };
    },

};

export default actions;
