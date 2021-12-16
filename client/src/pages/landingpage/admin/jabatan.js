import React, { useEffect, useState } from 'react'
import {
    getAllDepartemen,
    getAllUser,
    addNewDepartemen,
    editDepartemen
} from '../../../redux/task/actionCreator'
import { Grid, Box, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import TopBar from '../../component/pages/admin/topBar'
import SideBar from '../../component/pages/admin/sideBar'
import { useSelector, useDispatch } from 'react-redux';
import IconEdit from '../../../Assets/img/icon/edit.png'
import IconDetail from '../../../Assets/img/icon/info.png'
import { Button, Form, Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2'

import { Input } from 'antd';
import { Table } from 'antd';
import { Dialog } from '@mui/material'

const { Search } = Input


export default function Departemen() {
    const dispatch = useDispatch()

    const listDepartemen = useSelector(state => state.task.all_departemen)
    const isLoadingListDepartemen = useSelector(state => state.task.is_loading_all_departemen)
    const listUser = useSelector(state => state.task.all_user)
    const isLoadingListUser = useSelector(state => state.task.is_loading_all_user)
    const messageNewDepartemen = useSelector(state => state.task.message_add_new_departemen)
    const isLoadingAddNewDepartemen = useSelector(state => state.task.is_loading_add_new_departemen)
    const messageEditDepartemen = useSelector(state => state.task.message_edit_departemen)
    const isLoadingEditDepartemen = useSelector(state => state.task.is_loading_edit_departemen)

    const [allDepartemen, setAllDepartemen] = useState([]);
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
        dispatch(getAllDepartemen(''))
        dispatch(getAllUser(''))
    }, [dispatch])

    useEffect(() => {
        if (messageNewDepartemen.length > 0 && isLoadingAddNewDepartemen === false && popupCreate) {
            Toast.fire({
                icon: 'success',
                title: messageNewDepartemen
            })
            setPopupCreate(false)
            setDataNewDepartment({
                name: '',
                idatasan: ''
            })

        }
    }, [isLoadingAddNewDepartemen, messageNewDepartemen])

    useEffect(() => {
        if (messageEditDepartemen.length > 0 && isLoadingEditDepartemen === false && popupEdit) {
            Toast.fire({
                icon: 'success',
                title: messageEditDepartemen
            })
            setPopupEdit(false)
            setDataEditDepartment({
                name: '',
                idatasan: '',
                id: ''
            })

        }
    }, [isLoadingAddNewDepartemen, messageEditDepartemen])

    useEffect(() => {
        if (!isLoadingListDepartemen && listDepartemen) {
            let datadepartemen = []
            listDepartemen.map((departemen, i) => {
                const { id, nama_depan, nama_belakang, name, idatasan } = departemen
                return (
                    datadepartemen.push({
                        id: i + 1,
                        name: name,
                        leader: `${nama_depan} ${nama_belakang === null ? '' : nama_belakang}`,
                        action: <div>
                            <img
                                onClick={() => {
                                    setPopupEdit(true)
                                    setDataEditDepartment({
                                        name: name,
                                        id: id,
                                        idatasan: idatasan,
                                    })
                                }}
                                style={{ cursor: 'pointer' }}
                                src={IconEdit} width="30px" />

                        </div>
                    })
                )
            })
            setAllDepartemen(datadepartemen)
        }

    }, [listDepartemen, isLoadingListDepartemen])


    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Departemen',
            dataIndex: 'name',
        },
        {
            title: 'Leader',
            dataIndex: 'leader',
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
                    <TopBar label='All Department' />
                    <Box px={2} className="container-content" pb={5}>
                        <Grid container justifyContent="space-between">
                            <Grid lg={6} item>
                                <Box pb={3} >
                                    <Button size="small" variant="outline-primary"
                                        style={{ fontSize: '11px', paddingRight: '15px', paddingLeft: '15px' }}
                                        onClick={() => setPopupCreate(true)}
                                    >
                                        Add New Department
                            </Button>
                                </Box>
                            </Grid>
                            <Grid item lg={6}>
                                <Box pb={3} textAlign="right" >
                                    <Search placeholder="Search Departemen"
                                        onChange={(e) => {
                                            dispatch(getAllDepartemen(e.target.value))
                                        }}
                                        allowClear
                                        style={{ width: 350 }} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box textAlign="right" fontSize={12} pb={1} color="gray" >Total {listDepartemen.length} Task</Box>
                        <Box pb={2}>
                            {isLoadingEditDepartemen ? 'loading..' :
                                <Table columns={columns} dataSource={allDepartemen} pagination />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
