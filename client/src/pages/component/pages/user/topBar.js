import React, { useEffect, useState, forwardRef } from 'react'
import { Box, Grid, Avatar, Divider } from '@material-ui/core'
import IconNotif from '../../../../Assets/img/icon/notif.png'
import { useHistory } from "react-router-dom";
import { getNotifTaskUser, markReadTask, getDetailTask, updateProgressTask } from '../../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Dropdown } from 'react-bootstrap';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@material-ui/core'
import moment from 'moment'
import ReactQuill from 'react-quill'
import Swal from 'sweetalert2'

const TopBar = ({ label }) => {
    // let Path = localStorage.getItem("path")
    const history = useHistory();
    const dispatch = useDispatch()
    const id = Number(localStorage.getItem('id'));
    const allNotif = useSelector(state => state.task.all_notif_task_user)
    const isLoadingTaskUser = useSelector(state => state.task.is_loading_all_task_user)
    const detailTask = useSelector(state => state.task.detail_task_user)
    const isLoadingUpdateProgressTask = useSelector(state => state.task.is_loading_update_progress_task)
    const messageUpdateProgressTask = useSelector(state => state.task.message_update_progress_task)

    const [idTask, setIdTask] = useState();
    const [Newprogress, setNewprogress] = useState('');
    const [currentProgress, setCurrentProgress] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [idUpdateTask, setIdUpdateTask] = useState(0);

    useEffect(() => {
        dispatch(getNotifTaskUser(id))
    }, [dispatch])

    useEffect(() => {
        if (idTask > 0) {
            dispatch(markReadTask({ id: idTask, idUser: id }))
            dispatch(getDetailTask(idTask))
        }
    }, [idTask])

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
        if (detailTask) {
            setCurrentProgress(detailTask[0].progress)
        }
    }, [detailTask])

    useEffect(() => {
        if (isUpdate) {
            dispatch(updateProgressTask({ id: idUpdateTask, new_progress: Newprogress, idUser: id }))
        }
    }, [isUpdate])

    useEffect(() => {
        if (messageUpdateProgressTask && isLoadingUpdateProgressTask === false && isUpdate) {
            Toast.fire({
                icon: 'success',
                title: messageUpdateProgressTask
            })
            setIsUpdate(false)

        }
    }, [isLoadingUpdateProgressTask, messageUpdateProgressTask])

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {/* Render custom icon here */}
            <Box>
                <img src={IconNotif} width="27px" height="27px"
                    style={{ cursor: 'pointer' }} />
                {allNotif && allNotif.length > 0 && <span className="count-notif" >{allNotif.length}</span>}
            </Box>
        </a>
    ));

    const AvaToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {/* Render custom icon here */}
            <Avatar
                style={{
                    height: "35px",
                    width: "35px",
                    marginLeft: "10px",
                    cursor: 'pointer'
                }}
                src="https://minimal-kit-react.vercel.app/static/illustrations/illustration_avatar.png" />
        </a>
    ));

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
        <>
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

            <div className="topbar">
                <Box px={2} py={1.5}>
                    <Grid container justifyContent="space-between" alignItems="center" direction="row">
                        <Grid item xs={6} sm={6} md={5} lg={5} xl={5}>
                            <Box fontWeight={600} fontSize={15}> {label}</Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={5} lg={5} xl={5}>
                            <Box style={{ float: 'right', }} >
                                <Grid container alignItems="center" justifyContent="flex-end" >
                                    <Dropdown style={{ marginRight: '10px' }}>
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Box fontSize={12} pl={3} py={1} color="#51AC56" fontWeight={600}>Notifications</Box>
                                            <Divider />
                                            <ul>
                                                {allNotif && allNotif.length > 0 ? allNotif.map((task) => (
                                                    <li style={{ color: '#67B9CC' }}>

                                                        <Dropdown.Item
                                                            style={{ width: "350px", wordWrap: 'break-word', padding: '0px 8px ' }}
                                                            eventKey={task.id}
                                                            onClick={() => setIdTask(task.id)}>
                                                            <Box py={1}>{
                                                                task.progress === "TO DO" ? <>You have new task <span style={{ fontWeight: 'bold', color: "#67B9CC" }}>{task.task_name}</span> to do</> :
                                                                    <>Task  <span style={{ fontWeight: 'bold', color: "#67B9CC" }}>{task.task_name}</span> has been updated to {task.progress}</>
                                                            }</Box>
                                                        </Dropdown.Item>
                                                    </li>

                                                ))
                                                    :
                                                    <Box width={350} fontSize={10} color="gray" pt={4} textAlign="center" pr={6}>
                                                        There's no new notifications
                                                    </Box>
                                                }
                                            </ul>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {' '}
                                    <Dropdown style={{ marginRight: '10px' }}>
                                        <Dropdown.Toggle as={AvaToggle} id="dropdown-custom-components">
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                Setting
                                                        </Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                localStorage.clear()
                                                if (localStorage.getItem("isLogin") === null) {
                                                    window.location.href = '/'
                                                }
                                            }}>
                                                Logout
                                                </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid>
                            </Box>

                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    )
}

export default TopBar