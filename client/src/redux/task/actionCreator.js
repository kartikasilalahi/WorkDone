// import Cookies from 'js-cookie';
// import crypto from 'crypto-js';
import Password from 'antd/lib/input/Password'
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

    updateTaskSuccess,
    updateTaskRequest,
    updateTaskErr,

    sendReportSuccess,
    sendReportRequest,
    sendReportErr,

    getAllTaskReviewerSuccess,
    getAllTaskReviewerRequest,
    getAllTaskReviewerErr,

    getNotifReviewerSuccess,
    getNotifReviewerRequest,
    getNotifReviewerErr,

    markReadByReviewerSuccess,
    markReadByReviewerRequest,
    markReadByReviewerErr,

    getAllProjectInDepartemenSuccess,
    getAllProjectInDepartemenRequest,
    getAllProjectInDepartemenErr,

    addProjectSuccess,
    addProjectRequest,
    addProjectErr,

    getAllProjectDepartemenSuccess,
    getAllProjectDepartemenRequest,
    getAllProjectDepartemenErr,

    getAllDepartemenSuccess,
    getAllDepartemenRequest,
    getAllDepartemenErr,

    getAllUserSuccess,
    getAllUserRequest,
    getAllUserErr,

    addDepartemenSuccess,
    addDepartemenRequest,
    addDepartemenErr,

    editDepartemenSuccess,
    editDepartemenRequest,
    editDepartemenErr,

    getAllTaskSuccess,
    getAllTaskRequest,
    getAllTaskErr,

    getAllProjectSuccess,
    getAllProjectRequest,
    getAllProjectErr,

    getProfileUserSuccess,
    getProfileUserRequest,
    getProfileUserErr,

    getJabatanInDepartemenSuccess,
    getJabatanInDepartemenRequest,
    getJabatanInDepartemenErr,

    addNewUserSuccess,
    addNewUserRequest,
    addNewUserErr,

    changePasswordSuccess,
    changePasswordRequest,
    changePasswordErr,


} = action


const getAllTaskUser = (id, keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllTaskUserRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/alltaskuser?id=${id}&keyword=${keyword}`)
            if (allTaskUser.data.data) {
                dispatch(getTotalTask(allTaskUser.data.data))
                dispatch(getAllTaskUserEffect(allTaskUser.data.data))
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
            const detailTask = await Axios.get(`${APIURL}taskman/detailtask/${id}`)
            if (detailTask.data.data) {
                dispatch(getDetailTaskSuccess(detailTask.data.data))
            } else {
                dispatch(getDetailTaskErr(detailTask.data.message))
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

const getAllProjectDepartemen = (id) => {
    return async dispatch => {
        try {
            // dispatch(getAllProjectUserRequest())
            // const allTaskUser = await Axios.get(`${APIURL}taskman/allprojectuser/${id}`)
            // if (allTaskUser.data.data) {
            //     dispatch(getAllProjectUserSuccess(allTaskUser.data.data))
            // } else {
            //     dispatch(getAllProjectUserErr(allTaskUser.data.message))
            // }
        } catch (error) {
            // dispatch(getAllProjectUserErr(error))
        }
    }
}

const getDetailProject = (id) => {
    return async dispatch => {
        try {
            dispatch(getDetailProjectRequest())
            const detailProject = await Axios.get(`${APIURL}taskman/detailproject/${id}`)
            if (detailProject.data.data) {
                console.log("detaill", detailProject)
                dispatch(getDetailProjectSuccess(detailProject.data.data))
            } else {
                dispatch(getDetailProjectErr(detailProject.data.message))
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
                dispatch(getAllTaskReviewer(data.reviewer, ''))
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
                dispatch(getTotalTask(getnotif.data.data))
                dispatch(getNotifTaskSuccess(getnotif.data.data))
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


const updateTask = ({ idUser, id, task_name, description }) => {
    return async dispatch => {
        try {
            dispatch(updateTaskRequest())
            const update = await Axios.post(`${APIURL}taskman/updatetask`, { id, task_name, description })
            if (update.data.message) {
                dispatch(getDetailTask(id))
                dispatch(getAllTaskUser(idUser, ''))
                dispatch(getNotifTaskUser(idUser))
                dispatch(updateTaskSuccess(update.data.message))
            }
        } catch (error) {
            dispatch(updateTaskErr(error))
        }
    }
}

const sendReport = ({ iduser, iddepartemen, data }) => {
    return async dispatch => {
        try {
            dispatch(sendReportRequest())
            const report = await Axios.post(`${APIURL}taskman/sendreport`, { iduser, iddepartemen, data })
            if (report.data.message) {
                dispatch(sendReportSuccess(report.data.message))
            }
        } catch (error) {
            dispatch(sendReportErr(error))
        }
    }
}

const getAllTaskReviewer = (id, keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllTaskReviewerRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/alltaskreviewer?id=${id}&keyword=${keyword}`)
            if (allTaskUser.data.data) {
                dispatch(getTotalTask(allTaskUser.data.data))
                dispatch(getAllTaskReviewerSuccess(allTaskUser.data.data))
            }
        } catch (error) {
            dispatch(getAllTaskReviewerErr(error))
        }
    }
}

const getNotifReviewer = (id) => {
    return async dispatch => {
        try {
            dispatch(getNotifReviewerRequest())
            const getnotif = await Axios.get(`${APIURL}taskman/getnotifreviewer/${id}`)
            if (getnotif.data.data) {
                dispatch(getTotalTask(getnotif.data.data))
                dispatch(getNotifReviewerSuccess(getnotif.data.data))
            }
        } catch (error) {
            dispatch(getNotifReviewerErr(error))
        }
    }
}

const markReadByReviewer = ({ id, idUser }) => {
    return async dispatch => {
        try {
            dispatch(markReadByReviewerRequest())
            const markTask = await Axios.post(`${APIURL}taskman/markreadtaskbyreviewer/${id}`)
            if (markTask.data.message) {
                dispatch(getNotifReviewer(idUser))
                dispatch(getAllTaskReviewer(idUser, ''))
                dispatch(markReadByReviewerSuccess(markTask.data.message))
            }
        } catch (error) {
            dispatch(markReadByReviewerErr(error))
        }
    }
}

const getAllProjectInDepartemen = (iddepartemen) => {
    return async dispatch => {
        try {
            dispatch(getAllProjectInDepartemenRequest())
            const allProject = await Axios.get(`${APIURL}taskman/allprojectdepartemen/${iddepartemen}`)
            if (allProject.data.data) {
                dispatch(getAllProjectInDepartemenSuccess(allProject.data.data))
            } else {
                dispatch(getAllProjectInDepartemenErr(allProject.data.message))
            }
        } catch (error) {
            dispatch(getAllProjectInDepartemenErr(error))
        }
    }
}

const addNewProject = (data) => {
    return async dispatch => {
        try {
            dispatch(addProjectRequest())
            const newProject = await Axios.post(`${APIURL}taskman/addnewproject`, data)
            if (newProject.data.message) {
                dispatch(getAllProjectInDepartemen(data.departemen_id))
                dispatch(addProjectSuccess(newProject.data.message))
            }
        } catch (error) {
            dispatch(addProjectErr(error))
        }
    }
}

const getAllDepartemen = (keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllDepartemenRequest())
            const allDepartemen = await Axios.get(`${APIURL}taskman/alldepartemen?keyword=${keyword}`)
            if (allDepartemen.data.data) {
                dispatch(getAllDepartemenSuccess(allDepartemen.data.data))
            }
        } catch (error) {
            dispatch(getAllDepartemenErr(error))
        }
    }
}

const getAllUser = (keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllUserRequest())
            const allDepartemen = await Axios.get(`${APIURL}taskman/alluser?keyword=${keyword}`)
            if (allDepartemen.data.data) {
                dispatch(getAllUserSuccess(allDepartemen.data.data))
            }
        } catch (error) {
            dispatch(getAllUserErr(error))
        }
    }
}

const addNewDepartemen = (data) => {
    return async dispatch => {
        try {
            dispatch(addDepartemenRequest())
            const newdepartemen = await Axios.post(`${APIURL}taskman/addnewdepartemen`, data)
            if (newdepartemen.data.message) {
                dispatch(getAllDepartemen(''))
                dispatch(addDepartemenSuccess(newdepartemen.data.message))
            }
        } catch (error) {
            dispatch(addDepartemenErr(error))
        }
    }
}

const editDepartemen = (data) => {
    return async dispatch => {
        try {
            dispatch(editDepartemenRequest())
            const editdepartemen = await Axios.post(`${APIURL}taskman/editdepartemen`, data)
            if (editdepartemen.data.message) {
                dispatch(getAllDepartemen(''))
                dispatch(editDepartemenSuccess(editdepartemen.data.message))
            }
        } catch (error) {
            dispatch(editDepartemenErr(error))
        }
    }
}

const getAllTask = (keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllTaskRequest())
            const alltask = await Axios.get(`${APIURL}taskman/alltask?keyword=${keyword}`)
            if (alltask.data.data) {
                dispatch(getAllTaskSuccess(alltask.data.data))
            }
        } catch (error) {
            dispatch(getAllTaskErr(error))
        }
    }
}

const getAllProject = (keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllProjectRequest())
            const allproject = await Axios.get(`${APIURL}taskman/allproject?keyword=${keyword}`)
            if (allproject.data.data) {
                dispatch(getAllProjectSuccess(allproject.data.data))
            }
        } catch (error) {
            dispatch(getAllProjectErr(error))
        }
    }
}

const getProfileUser = (id) => {
    return async dispatch => {
        try {
            dispatch(getProfileUserRequest())
            const profile = await Axios.get(`${APIURL}taskman/profile?id=${id}`)
            if (profile.data.data) {
                dispatch(getProfileUserSuccess(profile.data.data))
            }
        } catch (error) {
            dispatch(getProfileUserErr(error))
        }
    }
}

const getJabatanInDepartemen = (id) => {
    return async dispatch => {
        try {
            dispatch(getJabatanInDepartemenRequest())
            const jabatan = await Axios.get(`${APIURL}taskman/listjabatan?id=${id}`)
            if (jabatan.data.data) {
                dispatch(getJabatanInDepartemenSuccess(jabatan.data.data))
            }
        } catch (error) {
            dispatch(getJabatanInDepartemenErr(error))
        }
    }
}

const addNewUser = (data) => {
    return async dispatch => {
        try {
            dispatch(addNewUserRequest())
            const newuser = await Axios.post(`${APIURL}taskman/addnewduser`, data)
            if (newuser.data.message) {
                dispatch(getAllUser(''))
                dispatch(addNewUserSuccess(newuser.data.message))
            }
        } catch (error) {
            dispatch(addNewUserErr(error))
        }
    }
}


const UbahPassword = (data) => {
    return async dispatch => {
        try {
            dispatch(changePasswordRequest())
            const password = await Axios.post(`${APIURL}taskman/changepassword`, data)
            if (password.data) {
                dispatch(changePasswordSuccess(password.data.message))
            }
        } catch (error) {
            dispatch(changePasswordErr(error))
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
    markReadTask,
    updateTask,
    sendReport,
    getAllTaskReviewer,
    getNotifReviewer,
    markReadByReviewer,
    getAllProjectInDepartemen,
    addNewProject,
    getAllDepartemen,
    getAllUser,
    addNewDepartemen,
    editDepartemen,
    getAllTask,
    getAllProject,
    getProfileUser,
    getJabatanInDepartemen,
    addNewUser,
    UbahPassword,
};