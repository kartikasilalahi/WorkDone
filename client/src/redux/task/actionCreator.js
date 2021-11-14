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
} = action

let iddepartemen = localStorage.getItem('iddepartemen')


const getAllTaskUser = (id) => {
    return async dispatch => {
        try {
            dispatch(getAllTaskUserRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/alltaskuser/${id}`)
            if (allTaskUser.data.data) {
                dispatch(getAllTaskUserEffect(allTaskUser.data.data))
            } else {
                dispatch(getAllTaskUserErr(allTaskUser.data.message))
            }
            // setTimeout(async () => {
            // }, 100);
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
            // setTimeout(async () => {
            // }, 100);
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
            // setTimeout(async () => {
            // }, 100);
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
            // setTimeout(async () => {
            // }, 100);
        } catch (error) {
            dispatch(getDetailProjectErr(error))
        }
    }
}

const updateProgressTask = ({ id, new_progress }) => {
    return async dispatch => {
        try {
            dispatch(updateProgressTaskRequest())
            const updateProgress = await Axios.post(`${APIURL}taskman/updateprogress`, { id, new_progress })
            // console.log(updateProgress.data.data)
            if (updateProgress.data.message) {
                dispatch(updateProgressTaskSuccess(updateProgress.data.message))
                dispatch(getDetailTask(id))
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
    console.log('data', data)
    return async dispatch => {
        try {
            dispatch(addNewTaskRequest())
            const newTask = await Axios.post(`${APIURL}taskman/addnewtask`, data)
            if (newTask.data.message) {
                dispatch(addNewTaskSuccess(newTask.data.message))
                dispatch(getAllTaskUser(data.assignee))
            }

        } catch (error) {
            dispatch(addNewTaskErr(error))

        }
    }
}

export { getAllTaskUser, getDetailTask, getAllProjectUser, getDetailProject, updateProgressTask, getUserDepartemen, addNewTask };