import React, { useState, useEffect } from 'react'
import { Box, Grid, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core'
import TopBar from '../../component/pages/user/topBar'
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Spinner } from 'react-bootstrap';
import { getAllTaskUser } from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Chart from "react-google-charts";


export default function DashboardUser() {
    const dispatch = useDispatch()
    const history = useHistory();
    const allTaskUser = useSelector(state => state.task.all_task_user)
    const isLoadingTaskUser = useSelector(state => state.task.is_loading_all_task_user)


    const [ListTaskUser, setListTaskUser] = useState([]);

    const [open, setOpen] = useState(false);
    const [field, setField] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getAllTaskUser(2))
    }, [dispatch])

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Add New Task</Box></DialogTitle>
                <DialogContent>
                    <Box>
                        <Form noValidate >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Add Task Name" required />
                            </Form.Group>

                            <Form.Group controlId="formbasictask" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control size="sm" as="textarea" rows={2} type="text" placeholder="Description task" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Start</Form.Label>
                                <Form.Control size="sm" type="date" placeholder="Add Task Name" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Duedate</Form.Label>
                                <Form.Control size="sm" type="date" placeholder="Add Task Name" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Assignee</Form.Label>
                                <Form.Control
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>

            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10} style={{ backgroundColor: "whitesmoke", minHeight: "600px" }}>
                    {/* <TopBar /> */}

                    <Box px={2} className="container-content" pb={5}>
                        <Box fontSize={20} fontWeight={600}>Hi, Welcome Back!</Box>

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
                                                <Grid item><Box fontWeight={600}>My Project</Box></Grid>
                                                <Grid item><Box color="#88D38B">See more</Box></Grid>
                                            </Grid>
                                        </Box>
                                        <Box pt={2}  >
                                            <Grid container spacing={3}>
                                                {["1", "2", "3", "4", "5"].map((val, i) => (

                                                    <Grid item xs={6} key={val}>
                                                        {
                                                            i === 4 ?
                                                                <Box fontWeight={600} p={2} style={{ borderRadius: "15px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff', cursor: 'pointer' }}>
                                                                    {/* <Box textAlign="center"> + </Box> */}
                                                                    <Box textAlign="center" fontSize={13}> + Add New Project</Box>
                                                                </Box> :
                                                                <Box p={2} style={{ borderRadius: "15px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
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
                                            <Grid item><Box fontWeight={600}>My Priority Task</Box></Grid>
                                            <Grid item><Box color="#88D38B" onClick={() => history.push('/user/all-task')} style={{ cursor: 'pointer' }}>See more</Box></Grid>
                                        </Grid>
                                    </Box>
                                    <Box pt={2}>
                                        {isLoadingTaskUser ? 'loading...' :
                                            allTaskUser.map((task, i) => (
                                                <Box key={i} p={1} mb={2} style={{ width: "515px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                    <Box fontSize={13}>{task.task_name}</Box>
                                                    <Box fontSize={11} color="#2F2E41" fontWeight={500}>{task.project_name}</Box>
                                                </Box>
                                            ))
                                        }
                                        <Box p={2} mb={2} style={{ width: "515px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                            <Box fontSize={13} textAlign="center" onClick={handleClickOpen} style={{ cursor: 'pointer' }} fontWeight={600}>+ Create New Task</Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
