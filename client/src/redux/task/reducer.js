import action from './action'

const {
    GET_ALL_TASK_USER,
    GET_ALL_TASK_USER_REQUEST,
    GET_ALL_TASK_USER_ERR,

    GET_DETAIL_TASK_SUCCESS,
    GET_DETAIL_TASK_REQUEST,
    GET_DETAIL_TASK_ERR,

    GET_ALL_PROJECT_USER,
    GET_ALL_PROJECT_USER_REQUEST,
    GET_ALL_PROJECT_USER_ERR,

    GET_DETAIL_PROJECT_SUCCESS,
    GET_DETAIL_PROJECT_REQUEST,
    GET_DETAIL_PROJECT_ERR,

    UPDATE_PROGRESS_TASK_SUCCESS,
    UPDATE_PROGRESS_TASK_REQUEST,
    UPDATE_PROGRESS_TASK_ERR,


    GET_USER_DEPARTEMEN_REQUEST,
    GET_USER_DEPARTEMEN_SUCCESS,
    GET_USER_DEPARTEMEN_ERR,

    ADD_NEW_TASK_SUCCESS,

    GET_TOTAL_TASK_SUCCESS,

    GET_NOTIF_TASK_SUCCESS,
    GET_NOTIF_TASK_REQUEST,
    GET_NOTIF_TASK_ERR,

    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_ERR,

    SEND_REPORT_SUCCESS,
    SEND_REPORT_REQUEST,
    SEND_REPORT_ERR,

    GET_ALL_TASK_REVIEWER_SUCCESS,
    GET_ALL_TASK_REVIEWER_REQUEST,
    GET_ALL_TASK_REVIEWER_ERR,

    GET_NOTIF_REVIEWER_SUCCESS,
    GET_NOTIF_REVIEWER_REQUEST,
    GET_NOTIF_REVIEWER_ERR,

    GET_ALL_PROJECT_IN_DEPARTEMEN_SUCCESS,
    GET_ALL_PROJECT_IN_DEPARTEMEN_REQUEST,
    GET_ALL_PROJECT_IN_DEPARTEMEN_ERR,

    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_ERR,

    GET_ALL_DEPARTEMEN_SUCCESS,
    GET_ALL_DEPARTEMEN_REQUEST,
    GET_ALL_DEPARTEMEN_ERR,

    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_ERR,

    ADD_DEPARTEMEN_SUCCESS,
    ADD_DEPARTEMEN_REQUEST,

    EDIT_DEPARTEMEN_SUCCESS,
    EDIT_DEPARTEMEN_REQUEST,

    GET_ALL_TASK_SUCCESS,
    GET_ALL_TASK_REQUEST,
    GET_ALL_TASK_ERR,

    GET_ALL_PROJECT_SUCCESS,
    GET_ALL_PROJECT_REQUEST,
    GET_ALL_PROJECT_ERR,

    GET_PROFILE_USER_SUCCESS,
    GET_PROFILE_USER_REQUEST,
    GET_PROFILE_USER_ERR,

    GET_JABATAN_IN_DEPARTEMEN_SUCCESS,
    GET_JABATAN_IN_DEPARTEMEN_REQUEST,
    GET_JABATAN_IN_DEPARTEMEN_ERR,

    ADD_NEW_USER_SUCCESS,
    ADD_NEW_USER_REQUEST,
    ADD_NEW_USER_ERR,

    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_ERR,

} = action

const initState = {
    all_task_user: [],
    is_loading_all_task_user: false,
    is_error_all_task_user: false,
    message_all_task_user: '',


    detail_task_user: undefined,
    is_loading_detail_task_user: false,
    is_error_detail_task_user: false,
    message_detail_task_user: '',


    all_project_user: [],
    is_loading_all_project_user: false,
    is_error_all_project_user: false,
    message_all_project_user: '',

    detail_project_user: undefined,
    is_loading_detail_project_user: false,
    is_error_detail_project_user: false,
    message_detail_project_user: '',

    is_loading_update_progress_task: false,
    is_error_update_progress_task: false,
    message_update_progress_task: '',


    departemen_user: [],
    is_loading_departemen_user: false,
    is_error_departemen_user: false,
    message_departemen_user: '',

    message_add_new_task: '',

    total_task: [0, 0, 0, 0, 0],

    all_notif_task_user: [],
    is_loading_all_notif_task_user: false,
    is_error_all_notif_task_user: false,
    message_all_notif_task_user: '',

    is_loading_update_task: false,
    is_error_update_task: false,
    message_update_task: '',

    is_loading_send_report: false,
    message_send_report: '',

    all_task_reviewer: [],
    is_loading_all_task_reviewer: false,
    is_error_all_task_reviewer: false,
    message_all_task_reviewer: '',

    all_notif_reviewer: [],
    is_loading_all_notif_reviewer: false,
    is_error_all_notif_reviewer: false,
    message_all_notif_reviewer: '',

    all_project_in_departemen: [],
    is_loading_all_project_in_departemen: false,
    is_error_all_project_in_departemen: false,
    message_all_project_in_departemen: '',

    message_add_new_project: '',
    is_loading_add_new_project: false,

    all_departemen: [],
    is_loading_all_departemen: false,
    is_error_all_departemen: false,
    message_all_departemen: '',

    all_user: [],
    is_loading_all_user: false,
    is_error_all_user: false,
    message_all_user: '',

    message_add_new_departemen: '',
    is_loading_add_new_departemen: false,

    message_edit_departemen: '',
    is_loading_edit_departemen: false,

    all_task: [],
    is_loading_all_task: false,
    is_error_all_task: false,
    message_all_task: '',

    all_project: [],
    is_loading_all_project: false,
    is_error_all_project: false,
    message_all_project: '',

    profile_user: undefined,
    is_loading_profile_user: false,
    is_error_profile_user: false,
    message_profile_user: '',

    list_jabatan: undefined,
    is_loading_list_jabatan: false,
    is_error_list_jabatan: false,
    message_list_jabatan: '',

    message_add_new_user: '',
    is_loading_add_new_user: false,

    message_change_password: '',
    is_loading_change_password: false,

};


/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
    const { type, data, err } = action;
    switch (type) {

        // all task user
        case GET_ALL_TASK_USER_REQUEST:
            return {
                ...state,
                is_loading_all_task_user: true,
                message_all_task_user: ''
            };
        case GET_ALL_TASK_USER:
            return {
                ...state,
                all_task_user: data,
                is_loading_all_task_user: false,
                message_all_task_user: ''
            };
        case GET_ALL_TASK_USER_ERR:
            return {
                ...state,
                is_loading_all_task_user: false,
                message_all_task_user: err
            };

        // detail task
        case GET_DETAIL_TASK_REQUEST:
            return {
                ...state,
                is_loading_detail_task_user: true,
                message_detail_task_user: ''
            };
        case GET_DETAIL_TASK_SUCCESS:
            return {
                ...state,
                detail_task_user: data,
                is_loading_detail_task_user: false,
                message_detail_task_user: ''
            };
        case GET_DETAIL_TASK_ERR:
            return {
                ...state,
                is_loading_detail_task_user: false,
                message_detail_task_user: err
            };

        // all PROJECT user
        case GET_ALL_PROJECT_USER_REQUEST:
            return {
                ...state,
                is_loading_all_project_user: true,
                message_all_project_user: ''
            };
        case GET_ALL_PROJECT_USER:
            return {
                ...state,
                all_project_user: data,
                is_loading_all_project_user: false,
                message_all_project_user: ''
            };
        case GET_ALL_PROJECT_USER_ERR:
            return {
                ...state,
                is_loading_all_project_user: false,
                message_all_project_user: err
            };

        // detail PROJECT
        case GET_DETAIL_PROJECT_REQUEST:
            return {
                ...state,
                is_loading_detail_project_user: true,
                message_detail_project_user: ''
            };
        case GET_DETAIL_PROJECT_SUCCESS:
            return {
                ...state,
                detail_project_user: data,
                is_loading_detail_project_user: false,
                message_detail_project_user: ''
            };
        case GET_DETAIL_PROJECT_ERR:
            return {
                ...state,
                is_loading_detail_project_user: false,
                message_detail_project_user: err
            };

        // update PROGRESS TASK
        case UPDATE_PROGRESS_TASK_REQUEST:
            return {
                ...state,
                is_loading_update_progress_task: true,
                message_update_progress_task: ''
            };
        case UPDATE_PROGRESS_TASK_SUCCESS:
            return {
                ...state,
                is_loading_update_progress_task: false,
                message_update_progress_task: data
            };
        case GET_DETAIL_PROJECT_ERR:
            return {
                ...state,
                is_loading_update_progress_task: false,
                message_update_progress_task: err
            };

        // USER IN DEPARTEMEN
        case GET_USER_DEPARTEMEN_REQUEST:
            return {
                ...state,
                is_loading_departemen_user: true,
                message_departemen_user: ''
            };
        case GET_USER_DEPARTEMEN_SUCCESS:
            return {
                ...state,
                departemen_user: data,
                is_loading_departemen_user: false,
                message_departemen_user: ''
            };
        case GET_USER_DEPARTEMEN_ERR:
            return {
                ...state,
                is_loading_departemen_user: false,
                message_departemen_user: err
            };

        // add new task
        case ADD_NEW_TASK_SUCCESS:
            return {
                ...state,
                message_add_new_task: data
            }

        // total task
        case GET_TOTAL_TASK_SUCCESS:
            return {
                ...state,
                total_task: data
            }

        // GET NOTIF
        case GET_NOTIF_TASK_REQUEST:
            return {
                ...state,
                is_loading_all_notif_task_user: true,
                message_all_notif_task_user: ''
            };
        case GET_NOTIF_TASK_SUCCESS:
            return {
                ...state,
                all_notif_task_user: data,
                is_loading_all_notif_task_user: false,
                message_all_notif_task_user: ''
            };
        case GET_NOTIF_TASK_ERR:
            return {
                ...state,
                is_loading_all_notif_task_user: false,
                message_all_notif_task_user: err
            };

        // update TASK
        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                is_loading_update_task: true,
                message_update_task: ''
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                is_loading_update_task: false,
                message_update_task: data
            };
        case GET_DETAIL_PROJECT_ERR:
            return {
                ...state,
                is_loading_update_task: false,
                message_update_task: err
            };

        // send report
        case SEND_REPORT_REQUEST:
            return {
                ...state,
                is_loading_send_report: true,
                message_send_report: ''
            }

        case SEND_REPORT_SUCCESS: {
            return {
                ...state,
                is_loading_send_report: false,
                message_send_report: data
            }
        }

        // all task reviewe
        case GET_ALL_TASK_REVIEWER_REQUEST:
            return {
                ...state,
                is_loading_all_task_reviewer: true,
                message_all_task_reviewer: ''
            };
        case GET_ALL_TASK_REVIEWER_SUCCESS:
            return {
                ...state,
                all_task_reviewer: data,
                is_loading_all_task_reviewer: false,
                message_all_task_reviewer: ''
            };
        case GET_ALL_TASK_REVIEWER_ERR:
            return {
                ...state,
                is_loading_all_task_reviewer: false,
                message_all_task_reviewer: err
            };

        // GET NOTIF reviewer
        case GET_NOTIF_REVIEWER_REQUEST:
            return {
                ...state,
                is_loading_all_notif_reviewer: true,
                message_all_notif_reviewer: ''
            };
        case GET_NOTIF_REVIEWER_SUCCESS:
            return {
                ...state,
                all_notif_reviewer: data,
                is_loading_all_notif_reviewer: false,
                message_all_notif_reviewer: ''
            };
        case GET_NOTIF_REVIEWER_ERR:
            return {
                ...state,
                is_loading_all_notif_reviewer: false,
                message_all_notif_reviewer: err
            };

        // all PROJECT in DEPARTEMEN
        case GET_ALL_PROJECT_IN_DEPARTEMEN_REQUEST:
            return {
                ...state,
                is_loading_all_project_in_departemen: true,
                message_all_project_in_departemen: ''
            };
        case GET_ALL_PROJECT_IN_DEPARTEMEN_SUCCESS:
            return {
                ...state,
                all_project_in_departemen: data,
                is_loading_all_project_in_departemen: false,
                message_all_project_in_departemen: ''
            };
        case GET_ALL_PROJECT_IN_DEPARTEMEN_ERR:
            return {
                ...state,
                is_loading_all_project_in_departemen: false,
                message_all_project_in_departemen: err
            };

        // ADD NEW PROJECT
        case ADD_PROJECT_SUCCESS:
            return {
                ...state,
                message_add_new_project: data,
                is_loading_add_new_project: false
            }

        case ADD_PROJECT_REQUEST:
            return {
                ...state,
                message_add_new_project: '',
                is_loading_add_new_project: true
            }

        // GET ALL DEPARTEMEN
        case GET_ALL_DEPARTEMEN_REQUEST:
            return {
                ...state,
                is_loading_all_departemen: true,
                message_all_departemen: ''
            };
        case GET_ALL_DEPARTEMEN_SUCCESS:
            return {
                ...state,
                all_departemen: data,
                is_loading_all_departemen: false,
                message_all_departemen: ''
            };
        case GET_ALL_DEPARTEMEN_ERR:
            return {
                ...state,
                is_loading_all_departemen: false,
                message_all_departemen: err
            };

        // GET ALL USER
        case GET_ALL_USER_REQUEST:
            return {
                ...state,
                is_loading_all_user: true,
                message_all_user: ''
            };
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                all_user: data,
                is_loading_all_user: false,
                message_all_user: ''
            };
        case GET_ALL_USER_ERR:
            return {
                ...state,
                is_loading_all_user: false,
                message_all_user: err
            };

        // ADD NEW DEPARTEME
        case ADD_DEPARTEMEN_SUCCESS:
            return {
                ...state,
                message_add_new_departemen: data,
                is_loading_add_new_departemen: false
            }

        case ADD_DEPARTEMEN_REQUEST:
            return {
                ...state,
                message_add_new_departemen: '',
                is_loading_add_new_departemen: true
            }

        // EDIT DEPARTEME
        case EDIT_DEPARTEMEN_SUCCESS:
            return {
                ...state,
                message_edit_departemen: data,
                is_loading_edit_departemen: false
            }

        case EDIT_DEPARTEMEN_REQUEST:
            return {
                ...state,
                message_edit_departemen: '',
                is_loading_edit_departemen: true
            }

        // GET ALL TASK
        case GET_ALL_TASK_REQUEST:
            return {
                ...state,
                is_loading_all_task: true,
                message_all_task: ''
            };
        case GET_ALL_TASK_SUCCESS:
            return {
                ...state,
                all_task: data,
                is_loading_all_task: false,
                message_all_task: ''
            };
        case GET_ALL_TASK_ERR:
            return {
                ...state,
                is_loading_all_task: false,
                message_all_task: err
            };

        // GET ALL PROJECT
        case GET_ALL_PROJECT_REQUEST:
            return {
                ...state,
                is_loading_all_project: true,
                message_all_project: ''
            };
        case GET_ALL_PROJECT_SUCCESS:
            return {
                ...state,
                all_project: data,
                is_loading_all_project: false,
                message_all_project: ''
            };
        case GET_ALL_PROJECT_ERR:
            return {
                ...state,
                is_loading_all_project: false,
                message_all_project: err
            };

        // GET PROFILE USER
        case GET_PROFILE_USER_REQUEST:
            return {
                ...state,
                is_loading_profile_user: true,
                message_profile_user: ''
            };
        case GET_PROFILE_USER_SUCCESS:
            return {
                ...state,
                profile_user: data,
                is_loading_profile_user: false,
                message_profile_user: ''
            };
        case GET_PROFILE_USER_ERR:
            return {
                ...state,
                is_loading_profile_user: false,
                message_profile_user: err
            };

        // GET list jabatan in departemen
        case GET_JABATAN_IN_DEPARTEMEN_REQUEST:
            return {
                ...state,
                is_loading_list_jabatan: true,
                message_list_jabatan: ''
            };
        case GET_JABATAN_IN_DEPARTEMEN_SUCCESS:
            return {
                ...state,
                list_jabatan: data,
                is_loading_list_jabatan: false,
                message_list_jabatan: ''
            };
        case GET_JABATAN_IN_DEPARTEMEN_ERR:
            return {
                ...state,
                is_loading_list_jabatan: false,
                message_list_jabatan: err
            };

        // ADD NEW USER
        case ADD_NEW_USER_SUCCESS:
            return {
                ...state,
                message_add_new_user: data,
                is_loading_add_new_user: false
            }

        case ADD_NEW_USER_REQUEST:
            return {
                ...state,
                message_add_new_user: '',
                is_loading_add_new_user: true
            }

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                message_change_password: data,
                is_loading_change_password: false
            }

        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                message_change_password: '',
                is_loading_change_password: true
            }
        default:
            return state;
    }
};
export default AuthReducer;