// import Cookies from 'js-cookie';
// import crypto from 'crypto-js';
import Axios from 'axios'
import { APIURL, API_FILES } from '../../helper/api'
import action from './action'
import moment from 'moment'
import Task from '../../pages/landingpage/user/task'

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
} = action


const getAllTaskUser = (id, keyword) => {
    return async dispatch => {
        try {
            dispatch(getAllTaskUserRequest())
            const allTaskUser = await Axios.get(`${APIURL}taskman/alltaskuser?id=${id}&keyword=${keyword}`)
            if (allTaskUser.data.data) {
                dispatch(getTotalTask(allTaskUser.data.data))

                // var start = moment('2021-01-20T01:14:07.000Z'); //todays date
                // var end = moment("2021-01-30T01:14:07.000Z"); // another date
                // var duration = moment.duration(end.diff(start));
                // var hour = duration.asHours();
                // console.log("hour", hour)
                // let Tasks = allTaskUser.data.data
                // Tasks.sort(function (a, b) {
                //     return moment.duration(moment(a.end_datetime.diff(a.start_datetimee))) - moment.duration(moment(b.end_datetime.diff(b.start_datetimee)))
                // });

                // console.log("Tas".Tasks)
                // console.log("all".allTaskUser.data.data)
                // let ass = []
                // for (var i = 0; i < Tasks.length; i++) {
                //     for (let j = 0; j <  Tasks.length; j++) {
                //         var now = moment(new Date)
                //         var start = moment(Tasks[i].start_datetime); //start date
                //         var end = moment(Tasks[i].end_datetime); // another date
                //         var duration1 = moment.duration(end.diff(start));
                //         var duration2 = moment.duration(end.diff(now));
                //         var hour1 = duration1.asHours();
                //         var hour2= duration2.asHours();
                //         let level = Task[i].level === "Low" ? 1 : Task[i].level === "Medium" ? 2 : 3
                //         let P = S / (hour1+hour2)
                //         if (inputArr[j] > inputArr[j + 1]) {
                //             let tmp = inputArr[j];
                //             inputArr[j] = inputArr[j + 1];
                //             inputArr[j + 1] = tmp;
                //         }
                //     }
                // }
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
            const allProject = await Axios.get(`${APIURL}taskman/allprojectuser/${iddepartemen}`)
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
    console.log("data", data)
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
    addNewProject
};