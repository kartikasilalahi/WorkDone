import React, { useState, useEffect } from 'react'
import {
    Box, Divider, Grid, Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import TopBar from '../../component/pages/user/topBar'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import moment from 'moment'
import IconEdit from '../../../Assets/img/icon/edit.png'
import IconDetail from '../../../Assets/img/icon/info.png'
import {
    getAllTaskUser,
    getDetailTask,
    getAllProjectUser,
    getDetailProject,
    updateProgressTask,
    getUserDepartemen,
    addNewTask,
    updateTask,
    getAllTaskReviewer,
    getAllProjectInDepartemen,
    getAllUser,
} from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, Form, Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2'
import DateTimePicker from 'react-datetime-picker';
import ReactQuill from 'react-quill'
import { Input } from 'antd';
import { Table } from 'antd';

const { Search } = Input




export default function Task() {
    const dispatch = useDispatch()
    const history = useHistory();
    const allTaskUser = useSelector(state => state.task.all_task_user)
    const isLoadingTaskUser = useSelector(state => state.task.is_loading_all_task_user)
    const detailTask = useSelector(state => state.task.detail_task_user)
    const allProjectUser = useSelector(state => state.task.all_project_user)
    const isLoadingProjectUser = useSelector(state => state.task.is_loading_all_project_user)
    const isLoadingUpdateProgressTask = useSelector(state => state.task.is_loading_update_progress_task)
    const messageUpdateProgressTask = useSelector(state => state.task.message_update_progress_task)
    const listUserDepartemen = useSelector(state => state.task.departemen_user)
    const messageSuccess = useSelector(state => state.task.message_add_new_task)
    const messageUpdateTask = useSelector(state => state.task.message_update_task)
    // const ListTotalTask = useSelector(state => state.task.total_task)  
    const allTaskReviewer = useSelector(state => state.task.all_task_reviewer)
    const isLoadingTaskReviewer = useSelector(state => state.task.is_loading_all_task_reviewer)
    const allProjectInDepartemen = useSelector(state => state.task.all_project_in_departemen)
    const isLoadingProjectInDepartemen = useSelector(state => state.task.is_loading_all_project_in_departemen)
    const listUser = useSelector(state => state.task.all_user)

    const id = Number(localStorage.getItem('id'));
    const iddepartemen = Number(localStorage.getItem('iddepartemen'));
    const idlevel = Number(localStorage.getItem('idlevel'));

    const [listTask, setListTask] = useState([]);
    const [listProject, setListProject] = useState([]);

    // console.log("allProjectInDepartemen", allProjectInDepartemen)

    const [openPopupCreateTask, setOpenPopupCreateTask] = useState(false);
    const [idTask, setIdTask] = useState();
    const [idProject, setIdProject] = useState();
    const [isAddNewTask, setIsAddNewTask] = useState(false);
    const [isUpdateProgress, setIsUpdateProgress] = useState(false);
    const [isUpdateTask, setIsUpdateTask] = useState(false);
    const [idUpdateTask, setIdUpdateTask] = useState(0);
    const [Newprogress, setNewprogress] = useState('');
    const [currentProgress, setCurrentProgress] = useState('');
    const [dataNewTask, setDataNewTask] = useState({
        assignee: idlevel === 2 ? id : '',
        created_by: id,
        reviewer: idlevel === 1 ? id : '',
        level: '',
        description: '',
        task_name: '',
        project_id: '',
        end_datetime: new Date(),
        start_datetime: new Date(),
    });
    const [selectedTask, setSelectedTask] = useState({});
    const [openPopupDetail, setOpenPopupDetail] = useState(false);
    const [idDetail, setIdDetail] = useState(0);


    const handleClickOpen = () => {
        setOpenPopupCreateTask(true);
        setIsAddNewTask(true)
    };

    const handleClosePopupCreateTask = () => {
        setOpenPopupCreateTask(false);
    };

    const onSaveNewTask = () => {
        let data = dataNewTask
        dispatch(addNewTask(data))
    }

    useEffect(() => {
        dispatch(getAllUser(''))
        if (idlevel === 1) {
            dispatch(getAllTaskReviewer(id, ''))
            dispatch(getAllProjectInDepartemen(iddepartemen))
        } else {
            dispatch(getAllTaskUser(id, ''))
            dispatch(getAllProjectUser(id))
        }

    }, [dispatch])


    useEffect(() => {
        dispatch(getUserDepartemen(iddepartemen))
    }, [iddepartemen])

    useEffect(() => {
        if (idTask > 0) {
            // setSelectedTask(allTaskUser[idTask - 0])
            dispatch(getDetailTask(idTask))
        }
        if ((openPopupDetail && idDetail > 0)) {
            dispatch(getDetailTask(idDetail))
        }
    }, [idTask, openPopupDetail, idDetail])

    useEffect(() => {
        if (idProject > 0) {
            dispatch(getDetailProject(idProject))
        }
    }, [idProject])

    useEffect(() => {
        if (detailTask) {
            setCurrentProgress(detailTask[0].progress)
        }
    }, [detailTask])

    useEffect(() => {
        if (messageUpdateProgressTask && isLoadingUpdateProgressTask === false && isUpdateProgress) {
            Toast.fire({
                icon: 'success',
                title: messageUpdateProgressTask
            })
            setIsUpdateProgress(false)

        }
    }, [isLoadingUpdateProgressTask, messageUpdateProgressTask])

    useEffect(() => {
        if (messageUpdateTask && isUpdateTask) {
            Toast.fire({
                icon: 'success',
                title: messageUpdateTask
            })
            setIsUpdateTask(false)

        }
    }, [messageUpdateTask, isUpdateTask])

    useEffect(() => {
        if (messageSuccess === 'Task Baru berhasil ditambahkan!' && openPopupCreateTask) {
            Toast.fire({
                icon: 'success',
                title: messageSuccess
            })
            setOpenPopupCreateTask(false);
            setDataNewTask({
                assignee: idlevel === 2 ? id : '',
                created_by: id,
                reviewer: idlevel === 1 ? id : '',
                level: '',
                description: '',
                task_name: '',
                project_id: '',
                end_datetime: new Date(),
                start_datetime: new Date(),
            })
            setIsAddNewTask(false)
        }
    }, [messageSuccess, dispatch])

    useEffect(() => {
        if (isUpdateProgress) {
            dispatch(updateProgressTask({ id: idUpdateTask, new_progress: Newprogress, idUser: id }))
        }
    }, [isUpdateProgress])

    useEffect(() => {
        if (idlevel === 2) {
            if (allTaskUser && !isLoadingTaskUser) {
                let datatask = []
                allTaskUser.map((task, i) => {
                    const { id, task_name, project_name, progress, start_datetime, end_datetime } = task
                    let taskname = ""
                    let end = moment(end_datetime);
                    let now = moment();
                    if (end.diff(now, 'hour') <= 0 && progress !== 'DONE') {
                        taskname = `expired`
                    }
                    return (
                        datatask.push({
                            key: id,
                            progress: <div
                                style={{
                                    backgroundColor: `${progress === 'DONE' ? '#6BE497'
                                        : progress === 'IN PROGRESS' ? '#F8B032'
                                            : progress === 'REVIEW' ? '#57D8E5'
                                                : progress == 'TO DO' ? '#6C757D' : '#EF4D5F'}`,
                                    borderRadius: '25px',
                                    textAlign: 'center',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    width: '120px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderColor: 'whitesmoke'
                                }}
                            >{progress}</div>,
                            // start_datetime: start_datetime,
                            start_datetime: moment(start_datetime).format('DD MMM YYYY, hh:mm:ss'),
                            end_datetime: moment(end_datetime).format('DD MMM YYYY, h:mm:ss'),
                            task_name: <div>{task_name} {' '}<span style={{ color: 'red', fontSize: '8px', position: 'absolute' }}>{taskname}</span> </div>,
                            project_name,
                            action: <div>
                                <img style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setIdTask(id)
                                        setSelectedTask(allTaskUser[i])
                                    }} src={IconEdit} width="30px" /> {' '}
                                <img
                                    onClick={() => {
                                        setIdDetail(id)
                                        setOpenPopupDetail(true)
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    src={IconDetail}
                                    width="30px" />
                            </div>
                        })
                    )
                })
                setListTask(datatask)
            }
        } else {
            if (allTaskReviewer && !isLoadingTaskReviewer) {
                let datatask = []
                allTaskReviewer.map((task, i) => {
                    const { id, task_name, project_name, progress, start_datetime, end_datetime } = task
                    let taskname = ""
                    let end = moment(end_datetime);
                    let now = moment();
                    // if (moment(end_datetime).format('DD MMMM YYYY hh:mm:ss') < moment().format('DD MMMM YYYY hh:mm:ss') && progress !== 'DONE') {
                    //     taskname = `expired`
                    // }
                    if (end.diff(now, 'hour') <= 0 && progress !== 'DONE') {
                        taskname = `expired`
                    }
                    return (
                        datatask.push({
                            key: id,
                            progress: <div
                                style={{
                                    backgroundColor: `${progress === 'DONE' ? '#6BE497'
                                        : progress === 'IN PROGRESS' ? '#F8B032'
                                            : progress === 'REVIEW' ? '#57D8E5'
                                                : progress == 'TO DO' ? '#6C757D' : '#EF4D5F'}`,
                                    borderRadius: '25px',
                                    textAlign: 'center',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    width: '120px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderColor: 'whitesmoke'
                                }}
                            >{progress}</div>,
                            // start_datetime: start_datetime,
                            start_datetime: moment(start_datetime).format('DD MMM YYYY, hh:mm:ss'),
                            end_datetime: moment(end_datetime).format('DD MMM YYYY, h:mm:ss'),
                            task_name: <div>{task_name} {' '}<span style={{ color: 'red', fontSize: '8px', position: 'absolute' }}>{taskname}</span> </div>,
                            project_name,
                            action: <div>
                                <img style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setIdTask(id)
                                        setSelectedTask(allTaskReviewer[i])
                                    }} src={IconEdit} width="30px" /> {' '}
                                <img
                                    onClick={() => {
                                        setIdDetail(id)
                                        setOpenPopupDetail(true)
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    src={IconDetail}
                                    width="30px" />
                            </div>
                        })
                    )
                })
                setListTask(datatask)
            }
        }
    }, [allTaskUser, allTaskReviewer])
    // allProjectInDepartemen

    useEffect(() => {
        if (idlevel === 2) {
            if (allProjectUser && !isLoadingProjectUser) {
                let listproject = []
                allProjectUser.map((project) => {
                    const { id, project_name } = project
                    return (listproject.push({ value: project_name, text: project_name }))
                })
                setListProject(listproject)
            }
        } else {
            if (allProjectInDepartemen && !isLoadingProjectInDepartemen) {
                let listproject = []
                allProjectInDepartemen.map((project) => {
                    const { id, project_name } = project
                    return (listproject.push({ value: project_name, text: project_name }))
                })
                setListProject(listproject)
            }
        }
    }, [allProjectUser, allProjectInDepartemen])

    useEffect(() => {
        dispatch(getUserDepartemen(iddepartemen))
    }, [iddepartemen])

    // const onChange = (pagination, filters, sorter, extra) => {
    //     console.log('params', pagination, filters, sorter, extra);
    // }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    let modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
        ]
    };

    let formats = [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image"
    ];

    const columns = [
        {
            title: 'Progress',
            dataIndex: 'progress',
            filters: [
                {
                    text: 'Done',
                    value: 'DONE',
                },
                {
                    text: 'Decline',
                    value: 'DECLINE',
                },
                {
                    text: 'In Progress',
                    value: 'IN PROGRESS',
                },
                {
                    text: 'Review',
                    value: 'REVIEW',
                },
                {
                    text: 'Todo',
                    value: 'TO DO',
                },
            ],
            onFilter: (value, record) => record.progress.props.children.indexOf(value) === 0,

        },
        {
            title: 'Task Name',
            dataIndex: 'task_name',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Project',
            dataIndex: 'project_name',
            filters: listProject,
            onFilter: (value, record) => record.project_name.indexOf(value) === 0,
        },
        {
            title: 'Start Datetime',
            dataIndex: 'start_datetime',
            sorter: (a, b) => new Date(a.start_datetime) - new Date(b.start_datetime),
        },
        {
            title: 'End Datetime',
            dataIndex: 'end_datetime',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => new Date(a.end_datetime) - new Date(b.end_datetime),
        },
        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];

    return (
        <div>
            <Dialog open={openPopupCreateTask} onClose={handleClosePopupCreateTask} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Add New Task</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        <Form noValidate >
                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Project</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    as="select"
                                    value={dataNewTask.project_id}
                                    size="sm"
                                    onChange={(e) => setDataNewTask({ ...dataNewTask, project_id: Number(e.target.value) })}
                                >
                                    {/* allProjectInDepartemen */}
                                    <option value="" selected disabled>Select Project..</option>
                                    {
                                        idlevel === 2 && allProjectUser && allProjectUser.map((project) => (
                                            <option value={project.id} key={project.id}>{project.project_name}</option>
                                        ))
                                    }
                                    {
                                        idlevel === 1 && allProjectInDepartemen && allProjectInDepartemen.map((project) => (
                                            <option value={project.id} key={project.id}>{project.project_name}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="text"
                                    placeholder="Add Task Name"
                                    value={dataNewTask.task_name}
                                    onChange={(e) => setDataNewTask({ ...dataNewTask, task_name: e.target.value })}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formbasictask" >
                                <Form.Label>Description</Form.Label>
                                <Box>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={dataNewTask.description}
                                        onChange={(e) => setDataNewTask({ ...dataNewTask, description: e })}
                                    />
                                </Box>
                            </Form.Group>

                            <Grid container justifyContent='space-between'>
                                <Grid item lg={6}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>Start:</Form.Label>
                                        <Box>
                                            <DateTimePicker
                                                onChange={(e) => setDataNewTask({ ...dataNewTask, start_datetime: e })}
                                                value={dataNewTask.start_datetime}
                                                minDate={new Date()}
                                            />
                                        </Box>
                                    </Form.Group>
                                </Grid>
                                <Grid item lg={6}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>Duedate: </Form.Label>
                                        <Box>
                                            <DateTimePicker
                                                onChange={(e) => setDataNewTask({ ...dataNewTask, end_datetime: e })}
                                                value={dataNewTask.end_datetime}
                                                minDate={dataNewTask.start_datetime}
                                            />
                                        </Box>
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            {
                                idlevel === 2 ?
                                    <>
                                        <Form.Group controlId="formBasicSelect">
                                            <Form.Label>Assignee</Form.Label>
                                            <Form.Control
                                                style={{ fontSize: '11px' }}
                                                type="text"
                                                value='Assigned To Me'
                                                size="sm"
                                                disabled
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicSelect1">
                                            <Form.Label>Reviewer</Form.Label>
                                            <Form.Control
                                                style={{ fontSize: '11px' }}
                                                as="select"
                                                value={dataNewTask.reviewer}
                                                size="sm"
                                                onChange={(e) => {
                                                    setDataNewTask({ ...dataNewTask, reviewer: Number(e.target.value) })
                                                }}
                                            >
                                                <option value="" selected disabled>Select Reviewer..</option>
                                                {
                                                    listUserDepartemen && listUserDepartemen.map((user) => (
                                                        <option value={user.id} key={user.id}>{user.nama_depan} {user.nama_belakang}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </>
                                    :
                                    <>
                                        <Form.Group controlId="formBasicSelect">
                                            <Form.Label>Reviewer</Form.Label>
                                            <Form.Control
                                                style={{ fontSize: '11px' }}
                                                type="text"
                                                value='Reviewed By Me'
                                                size="sm"
                                                disabled
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicSelect1">
                                            <Form.Label>Assign To</Form.Label>
                                            <Form.Control
                                                style={{ fontSize: '11px' }}
                                                as="select"
                                                value={dataNewTask.reviewer}
                                                size="sm"
                                                onChange={(e) => {
                                                    setDataNewTask({ ...dataNewTask, assignee: Number(e.target.value) })
                                                }}
                                            >
                                                <option value="" selected disabled>Select Assignee..</option>
                                                {
                                                    listUserDepartemen && listUserDepartemen.map((user) => (
                                                        <option value={user.id} key={user.id}>{user.nama_depan} {user.nama_belakang}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </>
                            }


                            <Form.Group controlId="formBasicSelect2">
                                <Form.Label>Level of Difficult</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    as="select"
                                    value={dataNewTask.level}
                                    size="sm"
                                    onChange={(e) => setDataNewTask({ ...dataNewTask, level: (e.target.value) })}
                                >
                                    <option value="" selected disabled>Select Level..</option>
                                    <option value="Difficult">Difficult</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="danger" size="sm" onClick={handleClosePopupCreateTask}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Cancel</Button>
                    <Button variant="success" size="sm" onClick={onSaveNewTask}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* popup edit task */}
            <Dialog open={idTask > 0} onClose={() => setIdTask(0)} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Edit Task</Box></DialogTitle>
                <DialogContent>
                    {selectedTask ? (
                        <Box fontSize={11}>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Status</Grid>
                                <Grid item lg={9}>
                                    {
                                        currentProgress === "DECLINE" ?
                                            <Dropdown onSelect={(e) => {
                                                setCurrentProgress(e)
                                                setIsUpdateProgress(true)
                                                setIdUpdateTask(selectedTask.id)
                                                setNewprogress((e))
                                            }}>
                                                {
                                                    isLoadingUpdateProgressTask ?
                                                        <Dropdown.Toggle size="sm" id="dropdown-basic"
                                                            style={{ fontSize: '10px' }} >
                                                            loading..
                                                    </Dropdown.Toggle>
                                                        :
                                                        <Dropdown.Toggle size="sm" id="dropdown-basic"
                                                            style={{ fontSize: '10px' }}
                                                            variant='danger'
                                                        >
                                                            {currentProgress}
                                                        </Dropdown.Toggle>
                                                }

                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        style={{ fontSize: '11px' }}
                                                        eventKey="IN PROGRESS" >
                                                        RE-DO &#10137; (IN PROGRESS)</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            :
                                            currentProgress === "DONE" ?
                                                <Button variant="success">
                                                    <Box px={1} fontSize={10} color="white">{currentProgress}</Box>
                                                </Button>
                                                :
                                                <Dropdown onSelect={(e) => {
                                                    setCurrentProgress(e)
                                                    setIsUpdateProgress(true)
                                                    setIdUpdateTask(selectedTask.id)
                                                    setNewprogress((e))
                                                }}>
                                                    {
                                                        isLoadingUpdateProgressTask ?
                                                            <Dropdown.Toggle size="sm" id="dropdown-basic"
                                                                style={{ fontSize: '10px' }} >
                                                                loading..
                                                    </Dropdown.Toggle>
                                                            :
                                                            <Dropdown.Toggle size="sm" id="dropdown-basic"
                                                                style={{ fontSize: '10px' }}
                                                                variant={currentProgress === 'TO DO' ? 'secondary'
                                                                    : currentProgress === 'IN PROGRESS' ? 'warning'
                                                                        : currentProgress === 'REVIEW' ? 'info' : 'primary'
                                                                }>
                                                                {currentProgress === 'REVIEW' ? 'SEND REQUESTFOR REVIEW' : currentProgress}
                                                            </Dropdown.Toggle>
                                                    }

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item style={{ fontSize: '11px' }} active={selectedTask.progress === 'TO DO'} eventKey="TO DO">TO DO</Dropdown.Item>
                                                        <Dropdown.Item style={{ fontSize: '11px' }} active={selectedTask.progress === 'IN PROGRESS'} eventKey="IN PROGRESS" >IN PROGRESS</Dropdown.Item>
                                                        <Dropdown.Item style={{ fontSize: '11px' }} active={selectedTask.progress === 'REVIEW'} eventKey="REVIEW" >SEND REQUEST FOR REVIEW</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Id</Grid>
                                <Grid item lg={9}>
                                    <Form.Control
                                        style={{ fontSize: '11px' }}
                                        size="sm"
                                        type="text"
                                        placeholder="Add Task Name"
                                        value={selectedTask && selectedTask.id}
                                        disabled
                                        required />
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2} >
                                <Grid item lg={3}>Task Name</Grid>
                                <Grid item lg={9}>
                                    {/* : {detailTask[0].task_name} */}
                                    <Form.Control
                                        style={{ fontSize: '11px' }}
                                        size="sm"
                                        type="text"
                                        value={selectedTask && selectedTask.task_name}
                                        // onChange={(e) => setDataUpdateTask({ ...dataUpdateTask, task_name: e.target.value })}
                                        onChange={(e) => setSelectedTask({ ...selectedTask, task_name: e.target.value })}
                                        required />
                                </Grid>
                            </ Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Project Name</Grid>
                                <Grid item lg={9}>
                                    <Form.Control
                                        style={{ fontSize: '11px' }}
                                        size="sm"
                                        type="text"
                                        disabled
                                        value={selectedTask.project_name}
                                        required />
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Descriptions</Grid>
                                <Grid item lg={9}>
                                    {/* <ReactQuill value={selectedTask.description} /> */}
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={selectedTask && selectedTask.description}
                                        onChange={(e) => setSelectedTask({ ...selectedTask, description: e })}
                                    />

                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Created On</Grid>
                                <Grid item lg={9}>: {moment(selectedTask.created_on).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Start On</Grid>
                                <Grid item lg={9}>: {moment(selectedTask.start_datetime).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Due date</Grid>
                                <Grid item lg={9}>: {moment(selectedTask.end_datetime).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Last Update</Grid>
                                <Grid item lg={9}>: {selectedTask.last_update === null ? moment(selectedTask.created_on).format('DD MMM YYYY, h:mm') : moment(selectedTask.last_update).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Created by</Grid>
                                <Grid item lg={9}>:
                                {selectedTask.created_by}
                                    {/* {listUser.filter((val) => val.id === selectedTask.created_by)[0].nama_depan} */}
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Assignee</Grid>
                                <Grid item lg={9}>: {selectedTask.assignee}
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Level of difficult</Grid>
                                <Grid item lg={9}>: {selectedTask.level}</Grid>
                            </Grid>

                        </Box >
                    ) :
                        'loading...'
                    }

                </DialogContent >
                <DialogActions>

                    {currentProgress !== 'DONE' && <Button size="sm" variant="info"
                        // onClick={() => setIdTask(0)}
                        onClick={() => {
                            dispatch(updateTask({
                                idUser: id,
                                id: selectedTask.id,
                                task_name: selectedTask && selectedTask.task_name,
                                description: selectedTask && selectedTask.description
                            }))
                            setIsUpdateTask(true)
                        }}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Update</Button>}
                    <Button size="sm" onClick={() => setIdTask(0)}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Close</Button>
                </DialogActions>

            </Dialog >

            {/* popup detail */}
            <Dialog
                maxWidth="sm" fullWidth
                open={openPopupDetail}
                onClose={() => {
                    setOpenPopupDetail(false)
                    setIdDetail(0)
                }}>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Detail Task</Box></DialogTitle>
                <DialogContent>
                    {
                        detailTask && (
                            <>
                                <Box fontSize={11} color="#276A71" fontWeight={600}>Task Name:</Box>
                                <Box fontSize={12}>{detailTask[0].task_name} </Box>
                                <Box fontSize={11} color="#276A71" fontWeight={600} pt={2}>Project:</Box>
                                <Box fontSize={12}>{detailTask[0].project_name} </Box>
                                <Box fontSize={11} color="#276A71" fontWeight={600} pt={2}>Description:</Box>
                                <Box fontSize={12}
                                    p={1}
                                    dangerouslySetInnerHTML={{ __html: detailTask[0].description }}
                                    style={{ border: '1px solid #dedede', borderRadius: '5px' }} />
                                <Box fontSize={11} color="#276A71" fontWeight={600} pt={2}>Progress:</Box>
                                <Box fontSize={12}>{detailTask[0].progress} </Box>
                                <Box fontSize={11} color="#276A71" fontWeight={600} pt={2}>Start:</Box>
                                <Box fontSize={12}>{moment(detailTask[0].start_datetime).format('DD MMM YYYY, hh:mm:ss')} </Box>
                                <Box fontSize={11} color="#276A71" fontWeight={600} pt={2}>Due Date:</Box>
                                <Box fontSize={12}>{moment(detailTask[0].end_datetime).format('DD MMM YYYY, hh:mm:ss')} </Box>
                                <Box fontSize={11} color="#276A71" fontWeight={600} pt={2}>Last Update:</Box>
                                <Box fontSize={12}>{detailTask[0].last_update === null ?
                                    moment(detailTask[0].created_on).format('DD MMM YYYY, h:mm') :
                                    moment(detailTask[0].last_update).format('DD MMM YYYY, h:mm')} </Box>
                                <Box fontSize={11} color="#276A71" fontWeight={600} pt={2}>Level Of Difficult:</Box>
                                <Box fontSize={12}>{detailTask[0].level} </Box>
                            </>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button size="sm" onClick={() => {
                        setOpenPopupDetail(false)
                        setIdDetail(0)
                    }}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Close</Button>
                </DialogActions>
            </Dialog>

            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar label="My Task" />
                    <Box px={2} className="container-content" pb={5}>
                        <Grid container justifyContent='space-between' alignItems="center">
                            <Grid lg={6} item>
                                <Box pb={3} pl={2}>
                                    <Button size="small" variant="outline-primary"
                                        style={{ fontSize: '11px', paddingRight: '30px', paddingLeft: '30px' }}
                                        onClick={handleClickOpen}>
                                        New Task
                            </Button>
                                </Box>
                            </Grid>
                            <Grid lg={6} item>
                                <Box pb={3} textAlign="right" pr={4} >
                                    <Search placeholder="Search Task Name"
                                        onChange={(e) => {
                                            if (idlevel === 2) dispatch(getAllTaskUser(id, e.target.value))
                                            else dispatch(getAllTaskReviewer(id, e.target.value))
                                        }}
                                        allowClear
                                        style={{ width: 350 }} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box textAlign="right" fontSize={12} pr={4} color="gray" >Total {listTask.length} Task</Box>
                        <Box pb={2}>
                            {isLoadingTaskUser ? 'loading..' :
                                <Table columns={columns} dataSource={listTask} pagination />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}
