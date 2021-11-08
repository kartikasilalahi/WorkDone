import Cookies from 'js-cookie';
import crypto from 'crypto-js';
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
    // loginRequest,
    // loginSuccess,
    // loginErr,
    // logoutRequest,
    // logoutSuccess,
    // logoutErr,
    // forgotRequest,
    // forgotSuccess,
    // forgotErr
} = action


const getAllTaskUser = (id) => {
    return async dispatch => {
        try {
            dispatch(getAllTaskUserRequest())
            setTimeout(async () => {
                const allTaskUser = await Axios.get(`${APIURL}auth/alltaskuser/${id}`)
                if (allTaskUser.data.data) {
                    dispatch(getAllTaskUserEffect(allTaskUser.data.data))
                    console.log("al", allTaskUser.data.data)
                } else {
                    dispatch(getAllTaskUserErr(allTaskUser.data.message))
                }
            }, 100);
        } catch (error) {
            dispatch(getAllTaskUserErr(error))
        }
    }
}

const getDetailTask = (id) => {
    return async dispatch => {
        try {
            dispatch(getDetailTaskRequest())
            setTimeout(async () => {
                const allTaskUser = await Axios.get(`${APIURL}auth/detailtask/${id}`)
                if (allTaskUser.data.data) {
                    dispatch(getDetailTaskSuccess(allTaskUser.data.data))
                    console.log("al", allTaskUser.data.data)
                } else {
                    dispatch(getDetailTaskErr(allTaskUser.data.message))
                }
            }, 100);
        } catch (error) {
            dispatch(getDetailTaskErr(error))
        }
    }
}

export { getAllTaskUser, getDetailTask };