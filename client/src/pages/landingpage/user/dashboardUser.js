import React, { useState, useEffect } from 'react'
import {
    Box,
    Grid,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent
} from '@material-ui/core'
// import TopBar from '../../component/pages/user/topBar'
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
    addNewTask
} from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Chart from "react-apexcharts";
// import { Editor } from 'react-draft-wysiwyg';
// import Chart from "react-google-charts";
// import { EditorState } from 'draft-js';
import Swal from 'sweetalert2'
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import ReactQuill from 'react-quill'

export default function DashboardUser() {
    const dispatch = useDispatch()
    const history = useHistory();
    const allTaskUser = useSelector(state => state.task.all_task_user)
    const isLoadingTaskUser = useSelector(state => state.task.is_loading_all_task_user)
    const detailTask = useSelector(state => state.task.detail_task_user)
    const allProjectUser = useSelector(state => state.task.all_project_user)
    const isLoadingProjectUser = useSelector(state => state.task.is_loading_all_project_user)
    // const detailProject = useSelector(state => state.task.detail_project_user)
    const isLoadingUpdateProgressTask = useSelector(state => state.task.is_loading_update_progress_task)
    const messageUpdateProgressTask = useSelector(state => state.task.message_update_progress_task)
    const listUserDepartemen = useSelector(state => state.task.departemen_user)
    const messageSuccess = useSelector(state => state.task.message_add_new_task)

    const id = Number(localStorage.getItem('id'));
    const iddepartemen = Number(localStorage.getItem('iddepartemen'));
    const [openPopupCreateTask, setOpenPopupCreateTask] = useState(false);
    const [idTask, setIdTask] = useState();
    const [idProject, setIdProject] = useState();
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

    const handleClickOpen = () => {
        setOpenPopupCreateTask(true);
    };

    const handleClosePopupCreateTask = () => {
        setOpenPopupCreateTask(false);
    };

    const onSaveNewTask = () => {
        let data = dataNewTask
        data.start_datetime = moment(dataNewTask).format('YYYY-MM-DD HH:mm:ss')
        data.end_datetime = moment(dataNewTask).format('YYYY-MM-DD HH:mm:ss')
        // console.log(data)
        dispatch(addNewTask(data))


    }

    useEffect(() => {
        dispatch(getAllTaskUser(id))
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
        if (messageUpdateProgressTask && isLoadingUpdateProgressTask === false) {
            Toast.fire({
                icon: 'success',
                title: messageUpdateProgressTask
            })
        }
    }, [isLoadingUpdateProgressTask, messageUpdateProgressTask])

    useEffect(() => {
        if (messageSuccess === 'Task Baru berhasil ditambahkan!') {
            Toast.fire({
                icon: 'success',
                title: messageSuccess
            })
            handleClosePopupCreateTask()
        }
    }, [messageSuccess])

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
        colors: ['#6C757D', '#F8B032', '#008FFB', '#51AC56', '#EF4D5F'],
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

    let series = [8, 4, 2, 3, 2]

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
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
        ]
    };

    let formats = [
        "header",
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
            <Dialog open={idTask > 0 && detailTask} onClose={() => setIdTask(0)} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Detail Task</Box></DialogTitle>
                <DialogContent>
                    {detailTask ? (
                        <Box fontSize={11}>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Id</Grid>
                                <Grid item lg={6}>: {detailTask[0].id}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Task Name</Grid>
                                <Grid item lg={6}>: {detailTask[0].task_name}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Project Name</Grid>
                                <Grid item lg={6}>: {detailTask[0].project_name}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Created On</Grid>
                                <Grid item lg={6}>: {moment(detailTask[0].created_on).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Start On</Grid>
                                <Grid item lg={6}>: {moment(detailTask[0].start_datetime).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Due date</Grid>
                                <Grid item lg={6}>: {moment(detailTask[0].end_datetime).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Last Update</Grid>
                                <Grid item lg={6}>: {detailTask[0].last_update === null ? moment(detailTask[0].created_on).format('DD MMM YYYY, h:mm') : moment(detailTask[0].last_update).format('DD MMM YYYY, h:mm')}</Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Created by</Grid>
                                <Grid item lg={6}>: {detailTask[0].created_by}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Assignee</Grid>
                                <Grid item lg={6}>: {detailTask[0].assignee}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Level of difficult</Grid>
                                <Grid item lg={6}>: {detailTask[0].level}</Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" spacing={2} alignItems="center">
                                <Grid item lg={6}>Status</Grid>
                                <Grid item lg={6} >
                                    <Dropdown onSelect={(e) => {
                                        setCurrentProgress(e)
                                        dispatch(updateProgressTask({ id: detailTask[0].id, new_progress: e }))
                                    }}>
                                        {
                                            isLoadingUpdateProgressTask ?
                                                <Dropdown.Toggle size="sm" id="dropdown-basic"
                                                    style={{ fontSize: '11px' }} >
                                                    loading..
                                                </Dropdown.Toggle>
                                                :
                                                <Dropdown.Toggle size="sm" id="dropdown-basic"
                                                    style={{ fontSize: '11px' }}
                                                    variant={currentProgress === 'TO DO' ? 'secondary'
                                                        : currentProgress === 'IN PROGRESS' ? 'warning'
                                                            // : currentProgress === 'DONE' ? 'success'
                                                            : currentProgress === 'REVIEW' ? 'info' : 'primary'
                                                    }>
                                                    {currentProgress === 'REVIEW' ? 'SEND REQUESTFOR REVIEW' : currentProgress}
                                                </Dropdown.Toggle>
                                        }

                                        <Dropdown.Menu>
                                            <Dropdown.Item style={{ fontSize: '11px' }} active={detailTask[0].progress === 'TO DO'} eventKey="TO DO">TO DO</Dropdown.Item>
                                            <Dropdown.Item style={{ fontSize: '11px' }} active={detailTask[0].progress === 'IN PROGRESS'} eventKey="IN PROGRESS" >IN PROGRESS</Dropdown.Item>
                                            <Dropdown.Item style={{ fontSize: '11px' }} active={detailTask[0].progress === 'REVIEW'} eventKey="REVIEW" >SEND REQUEST FOR REVIEW</Dropdown.Item>
                                            {/* <Dropdown.Item style={{ fontSize: '11px' }} active={detailTask[0].progress === 'DONE'} eventKey="DONE" >DONE</Dropdown.Item> */}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    {/* <Button size="sm" style={{ fontSize: '10px', borderRadius: '20px' }}
                                    variant={detailTask[0].progress === 'TO DO' ? 'secondary'
                                        : detailTask[0].progress === 'IN PROGRESS' ? 'warning'
                                            : detailTask[0].progress === 'DONE' ? 'success'
                                                : detailTask[0].progress === 'REVIEW' ? 'info' : 'primary'
                                    }
                                ><Box px={1} fontWeight={600} color='white' >{detailTask[0].progress}</Box>
                                </Button> */}
                                </Grid>
                            </Grid>

                        </Box>
                    ) :
                        'loading...'}

                </DialogContent>
                <DialogActions>
                    <Button size="sm" onClick={() => setIdTask(0)}
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
                <Grid item md={10} style={{ backgroundColor: "whitesmoke", minHeight: "800px", height: '100vh' }}>
                    {/* <TopBar /> */}

                    <Box px={2} className="container-content" pb={5}>
                        <Box fontSize={18} fontWeight={600}>Welcome Back!</Box>

                        <Grid container justifyContent="space-between">
                            <Grid xs={6} sm={6} lg={6}>
                                <Box>
                                    <Box pt={5} pl={5}>
                                        <Chart
                                            options={options}
                                            series={series}
                                            type="donut"
                                            width="390"
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
                                                                    <Box fontSize={13}>{project.project_name}</Box>
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
                                <Box ml={3} pt={5} >
                                    <Box>
                                        <Grid container justifyContent="space-between">
                                            <Grid item><Box fontSize={14} fontWeight={600}>My Task</Box></Grid>
                                            <Grid item>
                                                <Box color="#88D38B" fontSize={12} mr={2}
                                                    onClick={() => history.push('/user/all-task')}
                                                    style={{ cursor: 'pointer' }}>See more</Box></Grid>
                                        </Grid>
                                    </Box>
                                    <Box pt={2}>
                                        {isLoadingTaskUser ? 'loading...' :
                                            allTaskUser.map((task, i) => (
                                                <Box key={i} p={1} mb={2}
                                                    onClick={() => setIdTask(task.id)}
                                                    style={{
                                                        width: "515px",
                                                        borderRadius: "5px",
                                                        WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                        boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                        backgroundColor: '#fff',
                                                        cursor: 'pointer'
                                                    }}>
                                                    <Box fontSize={13}>
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
                                        <Box p={2} mb={2}
                                            style={{
                                                width: "515px",
                                                borderRadius: "5px",
                                                WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                backgroundColor: '#fff'
                                            }}>
                                            <Box fontSize={12} textAlign="center" onClick={handleClickOpen}
                                                style={{ cursor: 'pointer' }} fontWeight={600}>+ Create New Task</Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>

            <Box py={5}>
                {/* <Editor editorState={editorState} /> */}
            </Box>
        </div >
    )
}
