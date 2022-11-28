import React, { useEffect, useState } from 'react'
import {
    getAllDepartemen,
    getAllUser,
    addNewDepartemen,
    editDepartemen,
    getAllTask
} from '../../../redux/task/actionCreator'
import { Grid, Box, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import TopBar from '../../component/pages/admin/topBar'
import SideBar from '../../component/pages/admin/sideBar'
import { useSelector, useDispatch } from 'react-redux';
import IconEdit from '../../../Assets/img/icon/edit.png'
import IconDetail from '../../../Assets/img/icon/info.png'
import { Button, Form, Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2'
import moment from 'moment'
import { Input } from 'antd';
import { Table } from 'antd';
import { Dialog } from '@mui/material'

const { Search } = Input


export default function Task() {
    const dispatch = useDispatch()

    const listTask = useSelector(state => state.task.all_task)
    const isLoadingListTask = useSelector(state => state.task.is_loading_all_task)
    const listDepartemen = useSelector(state => state.task.all_departemen)
    const isLoadingListDepartemen = useSelector(state => state.task.is_loading_all_departemen)
    const listUser = useSelector(state => state.task.all_user)
    const isLoadingListUser = useSelector(state => state.task.is_loading_all_user)
    const messageNewDepartemen = useSelector(state => state.task.message_add_new_departemen)
    const isLoadingAddNewDepartemen = useSelector(state => state.task.is_loading_add_new_departemen)
    const messageEditDepartemen = useSelector(state => state.task.message_edit_departemen)
    const isLoadingEditDepartemen = useSelector(state => state.task.is_loading_edit_departemen)

    const [allDepartemen, setAllDepartemen] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [popupCreate, setPopupCreate] = useState(false);
    const [popupEdit, setPopupEdit] = useState(false);

    const [dataNewDepartment, setDataNewDepartment] = useState({
        name: '',
        idatasan: ''
    });
    const [dataEditDepartment, setDataEditDepartment] = useState({
        id: '',
        name: '',
        idatasan: ''
    });

    const onAddDepartemen = () => {
        dispatch(addNewDepartemen(dataNewDepartment))
    }

    const onEditDepartemen = () => {
        dispatch(editDepartemen(dataEditDepartment))
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

    useEffect(() => {
        // dispatch(getAllDepartemen(''))
        dispatch(getAllUser(''))
        dispatch(getAllTask(''))
    }, [dispatch])

    // useEffect(() => {
    //     if (messageNewDepartemen.length > 0 && isLoadingAddNewDepartemen === false && popupCreate) {
    //         Toast.fire({
    //             icon: 'success',
    //             title: messageNewDepartemen
    //         })
    //         setPopupCreate(false)
    //         setDataNewDepartment({
    //             name: '',
    //             idatasan: ''
    //         })

    //     }
    // }, [isLoadingAddNewDepartemen, messageNewDepartemen])

    // useEffect(() => {
    //     if (messageEditDepartemen.length > 0 && isLoadingEditDepartemen === false && popupEdit) {
    //         Toast.fire({
    //             icon: 'success',
    //             title: messageEditDepartemen
    //         })
    //         setPopupEdit(false)
    //         setDataEditDepartment({
    //             name: '',
    //             idatasan: '',
    //             id: ''
    //         })

    //     }
    // }, [isLoadingAddNewDepartemen, messageEditDepartemen])

    useEffect(() => {
        if (!isLoadingListTask && listTask) {
            let dataTask = []
            listTask.map((departemen, i) => {
                const { id, task_name, project_name, start_datetime, end_datetime, assignee } = departemen
                console.log("assigne", assignee)
                let assigned = listUser.filter((val) => val.id === assignee)
                let assign = assigned[0]
                let { nama_belakang, nama_depan } = assign
                return (
                    dataTask.push({
                        id: i + 1,
                        task_name: task_name,
                        project_name: project_name,
                        start_datetime: moment(start_datetime).format('DD MMM YYYY, hh:mm:ss'),
                        end_datetime: moment(end_datetime).format('DD MMM YYYY, h:mm:ss'),
                        assignee: `${nama_depan} ${nama_belakang === null ? '' : nama_belakang}`,
                        action: <div>
                            <img
                                // onClick={() => {
                                //     setPopupEdit(true)
                                //     setDataEditDepartment({
                                //         name: name,
                                //         id: id,
                                //         idatasan: idatasan,
                                //     })
                                // }}
                                style={{ cursor: 'pointer' }}
                                src={IconEdit} width="30px" />{' '}
                            <img
                                // onClick={() => {
                                //     setIdDetail(id)
                                //     setOpenPopupDetail(true)
                                // }}
                                style={{ cursor: 'pointer' }}
                                src={IconDetail}
                                width="30px" />
                        </div>
                    })
                )
            })
            setAllTask(dataTask)
        }

    }, [listDepartemen, isLoadingListTask])

    console.log("allYask", allTask)

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Task',
            dataIndex: 'task_name',
        },
        {
            title: 'Project',
            dataIndex: 'project_name',
            // filters: listProject,
            // onFilter: (value, record) => record.project_name.indexOf(value) === 0,
        },
        {
            title: 'Stary Datetime',
            dataIndex: 'start_datetime',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Due Date',
            dataIndex: 'end_datetime',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignee',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];


    return (
        <div>
            {/* popup create */}
            <Dialog open={popupCreate} onClose={() => {
                setPopupCreate(false)
                setDataNewDepartment({
                    name: '',
                    idatasan: ''
                })
            }} fullWidth maxWidth="sm">
                <DialogTitle><Box fontSize={14} fontWeight={700}>New Department</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        <Form noValidate >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="text"
                                    placeholder="Department Name"
                                    value={dataNewDepartment.name}
                                    onChange={(e) => setDataNewDepartment({ ...dataNewDepartment, name: e.target.value })}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formBasicSelect2">
                                <Form.Label>Leader</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    as="select"
                                    size="sm"
                                    value={dataNewDepartment.idatasan}
                                    onChange={(e) => setDataNewDepartment({ ...dataNewDepartment, idatasan: Number(e.target.value) })}
                                >
                                    <option value="" selected disabled>Select Leader</option>
                                    {
                                        listUser && listUser.filter((user) => user.idlevel === 2).map((user) => (
                                            <option value={user.id} key={user.id}>{user.nama_depan} {user.nama_belakang}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="danger" size="sm" onClick={() => {
                        setPopupCreate(false)
                        setDataNewDepartment({
                            name: '',
                            idatasan: ''
                        })
                    }}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Cancel</Button>
                    <Button variant="success" size="sm"
                        onClick={onAddDepartemen}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>{isLoadingAddNewDepartemen ? 'loading..' : 'Save'}</Button>
                </DialogActions>
            </Dialog>

            {/* popup edit */}
            <Dialog open={popupEdit} onClose={() => {
                setPopupEdit(false)
                setDataEditDepartment({
                    name: '',
                    idatasan: '',
                    id: ''
                })
            }} fullWidth maxWidth="sm">
                <DialogTitle><Box fontSize={14} fontWeight={700}>Edit Department</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        <Form noValidate >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="text"
                                    placeholder="Department Name"
                                    value={dataEditDepartment.id}
                                    disabled />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="text"
                                    placeholder="Department Name"
                                    value={dataEditDepartment.name}
                                    onChange={(e) => setDataEditDepartment({ ...dataEditDepartment, name: e.target.value })}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formBasicSelect2">
                                <Form.Label>Leader</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    as="select"
                                    size="sm"
                                    value={dataEditDepartment.idatasan}
                                    // defaultValue={dataEditDepartment.idatasan}
                                    onChange={(e) => setDataEditDepartment({ ...dataEditDepartment, idatasan: Number(e.target.value) })}
                                >
                                    <option value="" selected disabled>Select Leader</option>
                                    {
                                        listUser && listUser.map((user) => (
                                            <option value={user.id} key={user.id}>{user.nama_depan} {user.nama_belakang}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="danger" size="sm" onClick={() => {
                        setPopupEdit(false)
                        setDataEditDepartment({
                            name: '',
                            idatasan: '',
                            id: ''
                        })
                    }}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Cancel</Button>
                    <Button variant="success" size="sm"
                        onClick={onEditDepartemen}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>{isLoadingAddNewDepartemen ? 'loading..' : 'Save'}</Button>
                </DialogActions>
            </Dialog>


            <Grid container>
                <Grid item lg={2}>
                    <SideBar />

                </Grid>
                <Grid item lg={10} style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                    <TopBar label='All Task' />
                    <Box px={2} className="container-content" pb={5}>
                        <Grid container justifyContent="space-between">
                            {/* <Grid lg={6} item>
                                <Box pb={3} >
                                    <Button size="small" variant="outline-primary"
                                        style={{ fontSize: '11px', paddingRight: '15px', paddingLeft: '15px' }}
                                        onClick={() => setPopupCreate(true)}
                                    >
                                        Add New Ta
                            </Button>
                                </Box>
                            </Grid> */}
                            <Grid item lg={6}>
                                <Box>
                                    <Search placeholder="Search Task Name"
                                        onChange={(e) => {
                                            dispatch(getAllTask(e.target.value))
                                        }}
                                        allowClear
                                        style={{ width: 350 }} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box textAlign="right" fontSize={12} pb={1} color="gray" >Total {allTask.length} Task</Box>
                        <Box pb={2}>
                            {isLoadingListTask ? 'loading..' :
                                <Table columns={columns} dataSource={allTask} pagination />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}
