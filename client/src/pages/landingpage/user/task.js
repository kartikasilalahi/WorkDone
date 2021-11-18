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
import { Table } from 'antd';
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
    addNewTask
} from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, Form, Dropdown } from 'react-bootstrap';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2'
import DateTimePicker from 'react-datetime-picker';
import ReactQuill from 'react-quill'
import { Input } from 'antd';

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
    // const ListTotalTask = useSelector(state => state.task.total_task)

    const id = Number(localStorage.getItem('id'));
    const iddepartemen = Number(localStorage.getItem('iddepartemen'));

    const [listTask, setListTask] = useState([]);
    const [listProject, setListProject] = useState([]);


    const [openPopupCreateTask, setOpenPopupCreateTask] = useState(false);
    const [idTask, setIdTask] = useState();
    const [idProject, setIdProject] = useState();
    const [isAddNewTask, setIsAddNewTask] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [idUpdateTask, setIdUpdateTask] = useState(0);
    const [Newprogress, setNewprogress] = useState('');
    const [currentProgress, setCurrentProgress] = useState('');
    const [dataNewTask, setDataNewTask] = useState({
        assignee: id,
        created_by: id,
        reviewer: '',
        level: '',
        description: '',
        task_name: '',
        project_id: '',
        end_datetime: new Date(),
        start_datetime: new Date(),
    });
    // const [searchField, setSearchField] = useState('');

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
        dispatch(getAllTaskUser(id, ''))
        dispatch(getAllProjectUser(id))

    }, [dispatch])


    useEffect(() => {
        dispatch(getUserDepartemen(iddepartemen))
    }, [iddepartemen])

    useEffect(() => {
        if (idTask > 0) {
            dispatch(getDetailTask(idTask))
        }
    }, [idTask])

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
        if (messageUpdateProgressTask && isLoadingUpdateProgressTask === false && isUpdate) {
            Toast.fire({
                icon: 'success',
                title: messageUpdateProgressTask
            })
            setIsUpdate(false)

        }
    }, [isLoadingUpdateProgressTask, messageUpdateProgressTask])

    useEffect(() => {
        if (messageSuccess === 'Task Baru berhasil ditambahkan!' && openPopupCreateTask) {
            Toast.fire({
                icon: 'success',
                title: messageSuccess
            })
            setOpenPopupCreateTask(false);
            setDataNewTask({
                assignee: id,
                created_by: id,
                reviewer: '',
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
        if (isUpdate) {
            dispatch(updateProgressTask({ id: idUpdateTask, new_progress: Newprogress, idUser: id }))
        }
    }, [isUpdate])

    useEffect(() => {
        if (allTaskUser && !isLoadingTaskUser) {
            let datatask = []
            allTaskUser.map((task) => {
                const { id, task_name, project_name, progress, start_datetime, end_datetime } = task
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
                        task_name,
                        project_name,
                        action: <div>
                            <img style={{ cursor: 'pointer' }} onClick={() => setIdTask(id)} src={IconEdit} width="30px" /> {' '}
                            <img style={{ cursor: 'pointer' }} src={IconDetail} width="30px" />
                        </div>
                    })
                )
            })
            setListTask(datatask)
        }
    }, [allTaskUser])

    useEffect(() => {
        if (allProjectUser && !isLoadingProjectUser) {
            let listproject = []
            allProjectUser.map((project) => {
                const { id, project_name } = project
                return (listproject.push({ value: project_name, text: project_name }))
            })
            setListProject(listproject)
        }
    }, [allProjectUser])

    useEffect(() => {
        dispatch(getUserDepartemen(iddepartemen))
    }, [iddepartemen])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

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
                // {
                //     text: 'Submenu',
                //     value: 'Submenu',
                //     children: [
                //         {
                //             text: 'Green',
                //             value: 'Green',
                //         },
                //         {
                //             text: 'Black',
                //             value: 'Black',
                //         },
                //     ],
                // },
            ],
            // specify the condition of filtering result record.progress.indexOf(value) === 0
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.progress.props.children.indexOf(value) === 0,

        },
        {
            title: 'Task Name',
            dataIndex: 'task_name',
            defaultSortOrder: 'descend',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Project',
            dataIndex: 'project_name',
            defaultSortOrder: 'descend',
            filters: listProject,
            onFilter: (value, record) => record.project_name.indexOf(value) === 0,
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Start Datetime',
            dataIndex: 'start_datetime',
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => new Date(a.start_datetime) - new Date(b.start_datetime),
            defaultSortOrder: 'ascend'
        },
        {
            title: 'End Datetime',
            dataIndex: 'end_datetime',
            sorter: (a, b) => new Date(a.end_datetime) - new Date(b.end_datetime),

            // onFilter: (value, record) => record.address.indexOf(value) === 0,
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
                                <Form.Label>Reviewer</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    as="select"
                                    value={dataNewTask.project_id}
                                    size="sm"
                                    onChange={(e) => setDataNewTask({ ...dataNewTask, project_id: Number(e.target.value) })}
                                >
                                    <option value="" selected disabled>Select Project..</option>
                                    {
                                        allProjectUser && allProjectUser.map((project) => (
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

            {/* popup detail task */}
            <Dialog open={idTask > 0} onClose={() => setIdTask(0)} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Detail Task</Box></DialogTitle>
                <DialogContent>
                    {detailTask ? (
                        <Box fontSize={11}>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Status</Grid>
                                <Grid item lg={9}>
                                    {
                                        currentProgress === "DECLINE" ?
                                            <Dropdown onSelect={(e) => {
                                                setCurrentProgress(e)
                                                setIsUpdate(true)
                                                setIdUpdateTask(detailTask[0].id)
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
                                                    setIsUpdate(true)
                                                    setIdUpdateTask(detailTask[0].id)
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
                                                        <Dropdown.Item style={{ fontSize: '11px' }} active={detailTask[0].progress === 'TO DO'} eventKey="TO DO">TO DO</Dropdown.Item>
                                                        <Dropdown.Item style={{ fontSize: '11px' }} active={detailTask[0].progress === 'IN PROGRESS'} eventKey="IN PROGRESS" >IN PROGRESS</Dropdown.Item>
                                                        <Dropdown.Item style={{ fontSize: '11px' }} active={detailTask[0].progress === 'REVIEW'} eventKey="REVIEW" >SEND REQUEST FOR REVIEW</Dropdown.Item>
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
                                        value={detailTask[0].id}
                                        // onChange={(e) => setDataNewTask({ ...dataNewTask, task_name: e.target.value })}
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
                                        value={detailTask[0].task_name}
                                        // onChange={(e) => setDataNewTask({ ...dataNewTask, task_name: e.target.value })}
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
                                        value={detailTask[0].project_name}
                                        // onChange={(e) => setDataNewTask({ ...dataNewTask, task_name: e.target.value })}
                                        required />
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Descriptions</Grid>
                                <Grid item lg={9}>
                                    {/* <ReactQuill value={detailTask[0].description} /> */}
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={detailTask[0].description}
                                    />

                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Created On</Grid>
                                <Grid item lg={9}>: {moment(detailTask[0].created_on).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Start On</Grid>
                                <Grid item lg={9}>: {moment(detailTask[0].start_datetime).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Due date</Grid>
                                <Grid item lg={9}>: {moment(detailTask[0].end_datetime).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Last Update</Grid>
                                <Grid item lg={9}>: {detailTask[0].last_update === null ? moment(detailTask[0].created_on).format('DD MMM YYYY, h:mm') : moment(detailTask[0].last_update).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Created by</Grid>
                                <Grid item lg={9}>: {detailTask[0].created_by}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Assignee</Grid>
                                <Grid item lg={9}>: {detailTask[0].assignee}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Level of difficult</Grid>
                                <Grid item lg={9}>: {detailTask[0].level}</Grid>
                            </Grid>

                        </Box >
                    ) :
                        'loading...'
                    }

                </DialogContent >
                <DialogActions>

                    {currentProgress !== 'DONE' && <Button size="sm" variant="info" onClick={() => setIdTask(0)}
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
                                <Box pb={3} textAlign="right" >
                                    <Search placeholder="Search Task Name"
                                        onChange={(e) => dispatch(getAllTaskUser(id, e.target.value))}
                                        allowClear
                                        style={{ width: 350 }} />
                                </Box>
                            </Grid>

                        </Grid>
                        <Box pb={2}>
                            {isLoadingTaskUser ? 'loading..' :
                                <Table columns={columns} dataSource={listTask} />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
