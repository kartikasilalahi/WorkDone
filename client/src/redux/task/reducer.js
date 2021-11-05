import action from './action'

const {
    GET_ALL_TASK_USER,
    GET_ALL_TASK_USER_REQUEST,
    GET_ALL_TASK_USER_ERR
} = action

const initState = {
    // login: auth !== null ? auth.login : false,
    all_task_user: [],
    is_loading_all_task_user: false,
    is_error_all_task_user: false,
    message_all_task_user: ''
};


/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
    const { type, data, err } = action;
    switch (type) {
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

        default:
            return state;
    }
};
export default AuthReducer;