// import Cookies from 'js-cookie';
// import crypto from 'crypto-js';
import Axios from 'axios'
import { APIURL, API_FILES } from '../../helper/api'
import action from './action'

const {
    getAllTaskUserEffect,
    getAllTaskUserRequest,
    getAllTaskUserErr,
    getDetailTaskRequest,
    getDetailTaskSuccess,
    getDetailTaskErr,

    getAllProjectUserSuccess,
    getAllProjectUserRequest,
    getAllProjectUserErr,
    getDetailProjectSuccess,
    getDetailProjectRequest,
    getDetailProjectErr,


    updateProgressTaskSuccess,
    updateProgressTaskRequest,
    updateProgressTaskErr,

    getUserDepartemenSuccess,
    getUserDepartemenRequest,
    getUserDepartemenErr,

    addNewTaskSuccess,
    addNewTaskRequest,
    addNewTaskErr,

    getTotalTaskSuccess,
    getTotalTaskRequest,
    getTotalTaskErr,

    getNotifTaskSuccess,
    getNotifTaskRequest,
    getNotifTaskErr,

    markReadTaskSuccess,
    markReadTaskRequest,
    markReadTaskErr,
} = action


const getAllTaskUser = (id, keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllTaskUserRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/alltaskuser?id=${id}&keyword=${keyword}`)
            if (allTaskUser.data.data) {
                dispatch(getAllTaskUserEffect(allTaskUser.data.data))
                dispatch(getTotalTask(allTaskUser.data.data))
            } else {
                dispatch(getAllTaskUserErr(allTaskUser.data.message))
            }
        } catch (error) {
            dispatch(getAllTaskUserErr(error))
        }
    }
}

const getDetailTask = (id) => {
    return async dispatch => {
        try {
            dispatch(getDetailTaskRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/detailtask/${id}`)
            if (allTaskUser.data.data) {
                dispatch(getDetailTaskSuccess(allTaskUser.data.data))
            } else {
                dispatch(getDetailTaskErr(allTaskUser.data.message))
            }
        } catch (error) {
            dispatch(getDetailTaskErr(error))
        }
    }
}


const getAllProjectUser = (id) => {
    return async dispatch => {
        try {
            dispatch(getAllProjectUserRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/allprojectuser/${id}`)
            if (allTaskUser.data.data) {
                dispatch(getAllProjectUserSuccess(allTaskUser.data.data))
            } else {
                dispatch(getAllProjectUserErr(allTaskUser.data.message))
            }
        } catch (error) {
            dispatch(getAllProjectUserErr(error))
        }
    }
}

const getDetailProject = (id) => {
    return async dispatch => {
        try {
            dispatch(getDetailProjectRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/detailproject/${id}`)
            if (allTaskUser.data.data) {
                dispatch(getDetailProjectSuccess(allTaskUser.data.data))
            } else {
                dispatch(getDetailProjectErr(allTaskUser.data.message))
            }
        } catch (error) {
            dispatch(getDetailProjectErr(error))
        }
    }
}

const updateProgressTask = ({ id, new_progress, idUser }) => {
    return async dispatch => {
        try {
            dispatch(updateProgressTaskRequest())
            const updateProgress = await Axios.post(`${APIURL}taskman/updateprogress`, { id, new_progress })
            if (updateProgress.data.message) {
                dispatch(getDetailTask(id))
                dispatch(getAllTaskUser(idUser, ''))
                dispatch(getNotifTaskUser(idUser))
                dispatch(updateProgressTaskSuccess(updateProgress.data.message))
            }
        } catch (error) {
            dispatch(updateProgressTaskErr(error))
        }
    }
}

const getUserDepartemen = (id) => {
    return async dispatch => {
        try {
            dispatch(getUserDepartemenRequest())
            const userDepartemen = await Axios.get(`${APIURL}taskman/getuserdepartemen/${id}`)
            if (userDepartemen.data.data) {
                dispatch(getUserDepartemenSuccess(userDepartemen.data.data))
            } else {
                dispatch(getUserDepartemenErr(userDepartemen.data.message))
            }
        } catch (error) {
            dispatch(getUserDepartemenErr(error))
        }
    }
}

const addNewTask = (data) => {
    return async dispatch => {
        try {
            dispatch(addNewTaskRequest())
            const newTask = await Axios.post(`${APIURL}taskman/addnewtask`, data)
            if (newTask.data.message) {
                dispatch(getAllTaskUser(data.assignee, ''))
                dispatch(addNewTaskSuccess(newTask.data.message))
                dispatch(getNotifTaskUser(data.assignee))
            }

        } catch (error) {
            dispatch(addNewTaskErr(error))

        }
    }
}

const getTotalTask = (allTaskUser) => {

    return async dispatch => {
        try {
            dispatch(getTotalTaskRequest())
            let totalTodo = 0;
            let totalReview = 0;
            let totalDone = 0;
            let totalDecline = 0;
            let totalInProgress = 0;

            let task = allTaskUser.find((task, i) => {
                if (task.progress === 'TO DO') {
                    totalTodo++
                } else if (task.progress === 'IN PROGRESS') {
                    totalInProgress++
                } else if (task.progress === 'REVIEW') {
                    totalReview++
                } else if (task.progress === 'DONE') {
                    totalDone++
                } else if (task.progress === 'DECLINE') {
                    totalDecline++
                }
            });

            dispatch(getTotalTaskSuccess([totalTodo, totalInProgress, totalReview, totalDone, totalDecline]))
        } catch (error) {
            dispatch(getTotalTaskErr(error))
        }
    }
}


const getNotifTaskUser = (id) => {
    return async dispatch => {
        try {
            dispatch(getNotifTaskRequest())
            const getnotif = await Axios.get(`${APIURL}taskman/getnotif/${id}`)
            if (getnotif.data.data) {
                dispatch(getNotifTaskSuccess(getnotif.data.data))
                dispatch(getTotalTask(getnotif.data.data))
            } else {
                dispatch(getNotifTaskErr(getnotif.data.message))
            }
        } catch (error) {
            dispatch(getNotifTaskErr(error))
        }
    }
}


const markReadTask = ({ id, idUser }) => {
    return async dispatch => {
        try {
            dispatch(markReadTaskRequest())
            const markTask = await Axios.post(`${APIURL}taskman/markreadtask/${id}`)
            if (markTask.data.message) {
                dispatch(getNotifTaskUser(idUser))
                dispatch(getAllTaskUser(idUser, ''))
                dispatch(markReadTaskSuccess(markTask.data.message))
            }
        } catch (error) {
            dispatch(markReadTaskErr(error))
        }
    }
}

export {
    getAllTaskUser,
    getDetailTask,
    getAllProjectUser,
    getDetailProject,
    updateProgressTask,
    getUserDepartemen,
    addNewTask,
    getTotalTask,
    getNotifTaskUser,
    markReadTask
};