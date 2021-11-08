import React, { useState, useEffect } from 'react'
import { Box, Grid, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core'
import TopBar from '../../component/pages/user/topBar'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Spinner } from 'react-bootstrap';
import { getAllTaskUser, getDetailTask } from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Chart from "react-google-charts";
import moment from 'moment';

export default function DashboardUser() {
    const dispatch = useDispatch()
    const history = useHistory();
    const allTaskUser = useSelector(state => state.task.all_task_user)
    const isLoadingTaskUser = useSelector(state => state.task.is_loading_all_task_user)
    const detailTask = useSelector(state => state.task.detail_task_user)

    const [openPopupCreateTask, setOpenPopupCreateTask] = useState(false);
    const [field, setField] = useState([]);
    const [idTask, setIdTask] = useState();
    const handleClickOpen = () => {
        setOpenPopupCreateTask(true);
    };

    const handleClosePopupCreateTask = () => {
        setOpenPopupCreateTask(false);
    };

    useEffect(() => {
        dispatch(getAllTaskUser(2))
    }, [dispatch])

    useEffect(() => {
        if (idTask > 0) {
            dispatch(getDetailTask(idTask))
        }
    }, [idTask])

    return (
        <div>
            <Dialog open={openPopupCreateTask} onClose={handleClosePopupCreateTask} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Add New Task</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        <Form noValidate >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="text"
                                    placeholder="Add Task Name"
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formbasictask" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    as="textarea" rows={2} type="text"
                                    placeholder="Description task"
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Start</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="date"
                                    placeholder="Add Task Name"
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Duedate</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="date"
                                    placeholder="Add Task Name"
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Assignee</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    as="select"
                                    value={field}
                                    size="sm"
                                >
                                    <option value="DICTUM">Dictamen</option>
                                    <option value="CONSTANCY">Constancia</option>
                                    <option value="COMPLEMENT">Complemento</option>
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
                    <Button variant="success" size="sm" onClick={handleClosePopupCreateTask}
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
                                <Grid item lg={6}>Progress</Grid>
                                <Grid item lg={6}>: To Do</Grid>
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
                                <Grid item lg={6}>Status</Grid>
                                <Grid item lg={6}>: {detailTask[0].status}</Grid>
                            </Grid>

                            <Grid container justifyContent="space-between" spacing={2}>
                                <Grid item lg={6}>Level</Grid>
                                <Grid item lg={6}>: {detailTask[0].dificult}</Grid>
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
                <Grid item md={10} style={{ backgroundColor: "whitesmoke", minHeight: "600px" }}>
                    {/* <TopBar /> */}

                    <Box px={2} className="container-content" pb={5}>
                        <Box fontSize={18} fontWeight={600}>Hi, Welcome Back!</Box>

                        <Grid container justifyContent="space-between">
                            <Grid xs={6} sm={6} lg={6}>
                                <Box>
                                    <Box pt={5} >
                                        <Chart
                                            width={'540px'}
                                            height={'250px'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={[
                                                ['Task', 'Count'],
                                                ['In progress', 10],
                                                ['Decline', 2],
                                                ['Review', 2],
                                                ['Done', 5],
                                                ['To Do', 0],
                                            ]}
                                            options={{
                                                title: 'My Daily Progress',
                                            }}
                                            rootProps={{ 'data-testid': '1' }}
                                        /></Box>
                                    <Box>
                                        <Box pt={5}>
                                            <Grid container justifyContent="space-between">
                                                <Grid item><Box fontSize={14} fontWeight={600}>My Project</Box></Grid>
                                                <Grid item><Box fontSize={12} color="#88D38B">See more</Box></Grid>
                                            </Grid>
                                        </Box>
                                        <Box pt={2}  >
                                            <Grid container spacing={3}>
                                                {["1", "2", "3", "4", "5"].map((val, i) => (

                                                    <Grid item xs={6} key={val}>
                                                        {
                                                            i === 4 ?
                                                                <Box fontWeight={600} p={2}
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                                        boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                                        backgroundColor: '#fff',
                                                                        cursor: 'pointer'
                                                                    }}>
                                                                    <Box textAlign="center" fontSize={13}> + Add New Project</Box>
                                                                </Box> :
                                                                <Box p={2}
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                                        boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)",
                                                                        backgroundColor: '#fff'
                                                                    }}>
                                                                    <Box fontSize={13}>Project Name</Box>
                                                                    <Box fontSize={11}>desc project...</Box>
                                                                </Box>
                                                        }
                                                    </Grid>
                                                )
                                                )}
                                            </Grid>

                                        </Box>
                                    </Box>

                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} lg={6}>
                                <Box ml={3} pt={5} >
                                    <Box>
                                        <Grid container justifyContent="space-between">
                                            <Grid item><Box fontSize={14} fontWeight={600}>My Priority Task</Box></Grid>
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
                                                        backgroundColor: '#fff'
                                                    }}>
                                                    <Box fontSize={13}>
                                                        <Grid container justifyContent="space-between" alignItems="center">
                                                            <Grid item lg={6}>{task.task_name}
                                                                <Box
                                                                    fontSize={10}
                                                                    color="#53C0AA"
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
        </div >
    )
}
