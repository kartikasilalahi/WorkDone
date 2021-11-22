import React, { useState, useEffect } from 'react'
import {
    Box,
    Grid,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Divider
} from '@material-ui/core'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Dropdown } from 'react-bootstrap';
import {
    getAllTaskUser,
    getDetailTask,
    getAllProjectUser,
    getDetailProject,
    updateProgressTask,
    getUserDepartemen,
    addNewTask,
    updateTask
} from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Chart from "react-apexcharts";
import Swal from 'sweetalert2'
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import ReactQuill from 'react-quill'
import DoneIcon from '@mui/icons-material/Done';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import TopBar from '../../component/pages/user/topBar'
import Clock from 'react-digital-clock';

export default function DashboardUser() {
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
    const ListTotalTask = useSelector(state => state.task.total_task)
    const messageUpdateTask = useSelector(state => state.task.message_update_task)

    const id = Number(localStorage.getItem('id'));
    const iddepartemen = Number(localStorage.getItem('iddepartemen'));
    const [openPopupCreateTask, setOpenPopupCreateTask] = useState(false);
    const [idTask, setIdTask] = useState();
    const [idProject, setIdProject] = useState();
    const [isUpdateProgress, setIsUpdateProgress] = useState(false);
    const [isUpdateTask, setIsUpdateTask] = useState(false);

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
    const [selectedTask, setSelectedTask] = useState({});


    const handleClickOpen = () => {
        setOpenPopupCreateTask(true);
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
        }
    }, [messageSuccess, dispatch])

    useEffect(() => {
        if (isUpdateProgress) {
            dispatch(updateProgressTask({ id: idUpdateTask, new_progress: Newprogress, idUser: id }))
        }
    }, [isUpdateProgress])

    let options = {
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        labels: [`To Do`, `In progress`, `Review`, `Done`, `Decline`],
        colors: ['#6C757D', '#F8B032', '#57D8E5', '#6BE497', '#EF4D5F'],
        title: {
            text: 'My Task',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '13px',
                fontWeight: 'normal',
                // fontFamily: undefined,
                color: '#9699a2'
            },
        },
        plotOptions: {
            donut: {
                size: '65%',
                background: 'transparent',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: '#373d3f',
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce((a, b) => {
                                return a + b
                            }, 0)
                        }
                    }
                }
            }
        }
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


    return (
        <div>
            <Dialog open={openPopupCreateTask} onClose={handleClosePopupCreateTask} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Add New Task</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        <Form noValidate onSubmit={(e) => console.log(e)} >
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
                                        value={selectedTask.id}
                                        // onChange={(e) => setDataNewTask({ ...dataNewTask, task_name: e.target.value })}
                                        disabled
                                        required />
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2} >
                                <Grid item lg={3}>Task Name</Grid>
                                <Grid item lg={9}>
                                    {/* : {selectedTask.task_name} */}
                                    <Form.Control
                                        style={{ fontSize: '11px' }}
                                        size="sm"
                                        type="text"
                                        value={selectedTask.task_name}
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
                                        value={selectedTask.project_name}
                                        // onChange={(e) => setDataNewTask({ ...dataNewTask, task_name: e.target.value })}
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
                                        value={selectedTask.description}
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
                                <Grid item lg={9}>: {selectedTask.created_by}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={3}>Assignee</Grid>
                                <Grid item lg={9}>: {selectedTask.assignee}</Grid>
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

                    <Button size="sm" variant="info"
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
                        }}>Update</Button>
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
                <Grid item md={10} style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                    <TopBar label='Dashboard' />

                    <Box px={2} className="container-content" pb={5}>
                        <Grid container justifyContent="space-between">
                            <Grid xs={6} sm={6} lg={6}>
                                <Box>
                                    <Box pb={1} fontSize={14}>Welcome back,</Box>
                                    <Box color="#0F0F19" fontSize={13}>Don't forget to take attendance. And Enjoy your work!&#128522; </Box>

                                    <Box mt={7} py={3} pl={5} style={{ backgroundColor: 'white', }}>
                                        <Chart
                                            options={options}
                                            series={ListTotalTask}
                                            type="donut"
                                            width="380"
                                        />
                                    </Box>
                                    <Box>
                                        <Box pt={7}>
                                            <Grid container justifyContent="space-between">
                                                <Grid item><Box fontSize={14} fontWeight={600}>My Project</Box></Grid>
                                                <Grid item><Box fontSize={12} color="#88D38B">See more</Box></Grid>
                                            </Grid>
                                        </Box>
                                        <Box pt={2}  >
                                            <Grid container spacing={3}>
                                                {isLoadingProjectUser ? 'loading...' :
                                                    allProjectUser.map((project, i) => (

                                                        <Grid item xs={6} key={project.id}>
                                                            {
                                                                <Box p={2}
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                                        boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                                        backgroundColor: '#fff'
                                                                    }}>
                                                                    <Box fontSize={12}>{project.project_name}</Box>
                                                                    <Box fontSize={11}>{project.departemen}</Box>
                                                                </Box>
                                                            }

                                                        </Grid>
                                                    )
                                                    )}
                                                <Grid item xs={6}>
                                                    <Box fontWeight={600} p={2}
                                                        style={{
                                                            borderRadius: "15px",
                                                            WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                            boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                            backgroundColor: '#fff',
                                                            cursor: 'pointer'
                                                        }}>
                                                        <Box textAlign="center" fontSize={13}> + </Box>
                                                        <Box textAlign="center" fontSize={13}> Add New Project</Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                        </Box>
                                    </Box>

                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} lg={6}>
                                <Box ml={3}  >
                                    <Box textAlign="right" pb={3}>
                                        <Button variant="info" size="small" style={{ borderRadius: "25px" }}>
                                            <Box px={1} color="white" fontSize={11}>Live Attendance</Box>
                                        </Button>

                                        <Box fontSize={12} pt={1} fontWeight='bold'>
                                            {moment().format('DD MMMM YYYY,')}
                                            <Box pl={59}> <Clock hour12={false} /></Box>
                                        </Box>
                                    </Box>
                                    <Box pt={1}>
                                        <Grid container justifyContent="space-between">
                                            <Grid item><Box fontSize={14} fontWeight={600}>My Task</Box></Grid>
                                            <Grid item>
                                                <Box color="#88D38B" fontSize={12} mr={2}
                                                    onClick={() => history.push('/user/all-task')}
                                                    style={{ cursor: 'pointer' }}>See all</Box></Grid>
                                        </Grid>
                                        <Box fontSize={9} pt={1}>
                                            <Grid container>
                                                <Grid item >
                                                    <Box width={165} px={1} py={1} style={{ backgroundColor: '#6C757D', color: 'white', borderRadius: '5px' }}>
                                                        <Grid container alignItems="center">
                                                            <Grid item>
                                                                <Box pr={2} style={{ borderRight: '1px solid white' }}>
                                                                    <AvTimerIcon fontSize='medium' style={{ fill: 'white' }} />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item>
                                                                <Box pl={2}>
                                                                    <Box color="white">To Do</Box>
                                                                    <Box color="white">{ListTotalTask[0]} task</Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item >
                                                    <Box width={165} mx={1} px={1} py={1} style={{ backgroundColor: '#F8B032', color: 'white', borderRadius: '5px' }}>
                                                        <Grid container alignItems="center">
                                                            <Grid item>
                                                                <Box pr={2} style={{ borderRight: '1px solid white' }}>
                                                                    <RateReviewIcon fontSize='medium' style={{ fill: 'white' }} />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item>
                                                                <Box pl={2}>
                                                                    <Box color="white">Review</Box>
                                                                    <Box color="white">{ListTotalTask[2]} task</Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item >
                                                    <Box width={165} px={1} py={1} style={{ backgroundColor: '#51AC56', color: 'white', borderRadius: '5px' }}>
                                                        <Grid container alignItems="center">
                                                            <Grid item>
                                                                <Box pr={2} style={{ borderRight: '1px solid white' }}>
                                                                    <DoneIcon fontSize='medium' style={{ fill: 'white' }} />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item>
                                                                <Box pl={2}>
                                                                    <Box color="white">Done</Box>
                                                                    <Box color="white">{ListTotalTask[3]} task</Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                    <Box pt={2}>
                                        {isLoadingTaskUser ? 'loading...' :
                                            allTaskUser.filter(tasks => tasks.progress !== 'DONE').slice(0, 10).map((task, i) => (
                                                <Box key={i} p={1} mb={2}
                                                    onClick={() => {
                                                        console.log("iddt", task.id)
                                                        setIdTask(task.id)
                                                        // setSelectedTask(allTaskUser[i])
                                                        setSelectedTask(allTaskUser.filter(tasks => tasks.progress !== 'DONE')[i])
                                                    }}
                                                    style={{
                                                        width: "515px",
                                                        borderRadius: "5px",
                                                        WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                        boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                        backgroundColor: '#fff',
                                                        cursor: 'pointer'
                                                    }}>
                                                    <Box fontSize={11}>
                                                        <Grid container justifyContent="space-between" alignItems="center">
                                                            <Grid item lg={6}>{task.task_name}
                                                                <Box
                                                                    fontSize={10}
                                                                    color="#3366CC"
                                                                    fontWeight={500}>
                                                                    {task.project_name}
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={6}><Box textAlign="right"><NavigateNextIcon /></Box></Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                            ))
                                        }
                                        {/* <Box p={2} mb={2}
                                            style={{
                                                width: "515px",
                                                borderRadius: "5px",
                                                WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                backgroundColor: '#fff'
                                            }}>
                                            <Box fontSize={12} textAlign="center" onClick={handleClickOpen}
                                                style={{ cursor: 'pointer' }} fontWeight={600}>+ Create New Task</Box>
                                        </Box> */}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>

        </div >
    )
}
