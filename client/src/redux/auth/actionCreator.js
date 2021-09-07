import Cookies from 'js-cookie';
import crypto from 'crypto-js';
import Axios from 'axios'
import { APIURL, API_FILES } from '../../helper/api'
import action from './action'

const {
    loginRequest,
    loginSuccess,
    loginErr,
    logoutRequest,
    logoutSuccess,
    logoutErr,
    forgotRequest,
    forgotSuccess,
    forgotErr
} = action


const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(loginRequest())
            setTimeout(async () => {
                const login = await Axios.get(`${APIURL}auth/login?email=${email}&password=${password}`)
                if (login.data.data) {
                    localStorage.setItem("role", login.data.data[0].role)
                    localStorage.setItem("id", login.data.data[0].id)
                    // // localStorage.setItem("level", login.data.data[0].level)
                    localStorage.setItem("jabatan", login.data.data[0].jabatan)
                    localStorage.setItem("nama_depan", login.data.data[0].nama_depan)
                    localStorage.setItem("nama_belakang", login.data.data[0].nama_belakang)
                    localStorage.setItem("email", login.data.data[0].email)
                    localStorage.setItem("departemen", login.data.data[0].departemen)
                    localStorage.setItem("isLogin", true)
                    dispatch(loginSuccess(login.data.data[0]))
                    if (login.data.data[0].role === "admin") return window.location.href = "/admin/dashboard"
                    return window.location.href = "/user/dashboard"
                }
                else {
                    dispatch(loginErr(login.data.message))
                }

            }, 100);
        } catch (error) {
            dispatch(loginErr(error))
        }
    }
}

export { login };