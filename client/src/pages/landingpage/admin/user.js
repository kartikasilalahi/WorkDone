import React, { useEffect, useState } from 'react'
import {
    getAllDepartemen,
    getAllUser,
    addNewDepartemen,
    editDepartemen,
    getProfileUser,
    getJabatanInDepartemen,
    addNewUser
} from '../../../redux/task/actionCreator'
import { Grid, Box, DialogTitle, DialogContent, DialogActions, Divider } from '@material-ui/core'
import TopBar from '../../component/pages/admin/topBar'
import SideBar from '../../component/pages/admin/sideBar'
import { useSelector, useDispatch } from 'react-redux';
import IconEdit from '../../../Assets/img/icon/edit.png'
import IconDetail from '../../../Assets/img/icon/info.png'
import { Button, Form, Dropdown } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment'
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
    const profileUser = useSelector(state => state.task.profile_user)
    const loadingGetProfile = useSelector(state => state.task.is_loading_profile_user)
    const listJabatan = useSelector(state => state.task.list_jabatan)
    const loadingListJabatan = useSelector(state => state.task.is_loading_list_jabatan)
    const messageNewUser = useSelector(state => state.task.message_add_new_user)
    const isLoadingAddNewUser = useSelector(state => state.task.is_loading_add_new_user)

    const [allDepartemen, setAllDepartemen] = useState([]);
    const [jabatan, setJabatan] = useState([]);
    const [jabatanEdit, setJabatanEdit] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [popupCreate, setPopupCreate] = useState(false);
    const [popupEdit, setPopupEdit] = useState(false);
    const [popupDetail, setPopupDetail] = useState(false);
    const [listDepart, setListDepart] = useState([false]);

    const [dataNewUser, setDataNewUser] = useState({
        nama_depan: '',
        nama_belakang: '',
        email: '',
        password: '',
        jk: '',
        no_hp: '',
        alamat: '',
        tempat_lahir: '',
        tanggal_masuk: '',
        tanggal_lahir: '',
        idjabatan: '',
        iddepartement: '',
        idlevel: '',
        status: '',
    });

    const [dataEditUser, setDataEditUser] = useState({
        nama_depan: '',
        nama_belakang: '',
        email: '',
        password: '',
        jk: '',
        no_hp: '',
        alamat: '',
        tempat_lahir: '',
        tanggal_masuk: '',
        tanggal_lahir: '',
        idjabatan: '',
        iddepartement: '',
        idlevel: '',
        status: '',
    });
    const [dataEditDepartment, setDataEditDepartment] = useState({
        id: '',
        name: '',
        idatasan: ''
    });

    const onAddNewUser = () => {
        dispatch(addNewUser(dataNewUser))
        // console.log("dataNewUser", dataNewUser)
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
        if (listDepartemen && !isLoadingListDepartemen) {
            let list = []
            listDepartemen.map((val) => {
                const { id, name } = val
                return (list.push({ value: name, text: name }))
            })
            setListDepart(list)
        }
    }, [listDepartemen, isLoadingListDepartemen])

    useEffect(() => {
        if (messageNewUser.length > 0 && isLoadingAddNewUser === false && popupCreate) {
            Toast.fire({
                icon: 'success',
                title: messageNewUser
            })
            setPopupCreate(false)
            setDataNewUser({
                nama_depan: '',
                nama_belakang: '',
                email: '',
                password: '',
                jk: '',
                no_hp: '',
                alamat: '',
                tempat_lahir: '',
                tanggal_masuk: '',
                tanggal_lahir: '',
                idjabatan: '',
                iddepartement: '',
                idlevel: '',
                status: '',
            })

        }
    }, [isLoadingAddNewUser, messageNewUser])

    useEffect(() => {
        if (profileUser && loadingGetProfile === false) {
            setDataEditUser({
                nama_depan: profileUser[0].nama_depan,
                nama_belakang: profileUser[0].nama_belakang,
                email: profileUser[0].email,
                jk: profileUser[0].jk,
                no_hp: profileUser[0].no_hp,
                alamat: profileUser[0].alamat,
                // tempat_lahir: profileUser[0].,
                tanggal_masuk: profileUser[0].tanggal_masuk,
                tanggal_lahir: profileUser[0].tanggal_lahir,
                idjabatan: profileUser[0].idjabatan,
                iddepartement: profileUser[0].iddepartement,
                idlevel: profileUser[0].idlevel,
                status: profileUser[0].status,
            })
            dispatch(getJabatanInDepartemen(profileUser[0].iddepartement))
        }

    }, [loadingGetProfile, profileUser])

    useEffect(() => {
        if (!isLoadingListUser && listUser) {
            let datauser = []
            listUser.map((user, i) => {
                const { id, nama_depan, nama_belakang, name, jabatan, email, departemen } = user
                return (
                    datauser.push({
                        id: i + 1,
                        name: `${nama_depan} ${nama_belakang === null ? '' : nama_belakang}`,
                        email: email,
                        jabatan: jabatan,
                        departemen: departemen,
                        action: <div>
                            <img
                                onClick={() => {
                                    setPopupEdit(true)
                                    dispatch(getProfileUser(id))
                                }}
                                style={{ cursor: 'pointer' }}
                                src={IconEdit} width="30px" /> {' '}
                            <img
                                onClick={() => {
                                    dispatch(getProfileUser(id))
                                    setPopupDetail(true)
                                }}
                                style={{ cursor: 'pointer' }}
                                src={IconDetail}
                                width="30px" />

                        </div>
                    })
                )
            })
            setAllUser(datauser)
        }

    }, [listUser, isLoadingListUser])

    useEffect(() => {
        if (!isLoadingListDepartemen && listDepartemen) {
            setAllDepartemen(listDepartemen)
        }

    }, [listDepartemen, isLoadingListDepartemen])

    useEffect(() => {
        if (!loadingListJabatan && listJabatan) {
            setJabatan(listJabatan)
        }

    }, [listJabatan, loadingListJabatan])

    useEffect(() => {
        if (!loadingListJabatan && listJabatan) {
            setJabatanEdit(listJabatan)
        }

    }, [listJabatan, loadingListJabatan])


    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            // defaultSortOrder: 'descend',
        },
        {
            title: 'Jabatan',
            dataIndex: 'jabatan',
        },
        {
            title: 'Departemen',
            dataIndex: 'departemen',
            filters: listDepart,
            onFilter: (value, record) => record.departemen.indexOf(value) === 0,
        },

        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];

    if (profileUser) {
        console.log("{profileUser[0].status", profileUser[0].status)
    }


    return (
        <div>
            {/* popup create */}
            <Dialog open={popupCreate} onClose={() => {
                setPopupCreate(false)
                setDataNewUser({
                    nama_depan: '',
                    nama_belakang: '',
                    email: '',
                    password: '',
                    jk: '',
                    no_hp: '',
                    alamat: '',
                    tempat_lahir: '',
                    tanggal_masuk: '',
                    tanggal_lahir: '',
                    idjabatan: '',
                    iddepartement: '',
                    idlevel: '',
                    status: '',
                })
            }} fullWidth maxWidth="sm">
                <DialogTitle><Box fontSize={14} fontWeight={700}>New User</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        <Form noValidate >
                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="First Name"
                                            value={dataNewUser.nama_depan}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, nama_depan: e.target.value })}
                                            required />
                                    </Form.Group>

                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Last Name"
                                            value={dataNewUser.nama_belakang}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, nama_belakang: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicSelect2">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            as="select"
                                            size="sm"
                                            value={dataNewUser.jk}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, jk: e.target.value })}
                                        >
                                            <option value="" selected disabled>Select Gender</option>
                                            <option value="Laki-laki">Male</option>
                                            <option value="Perempuan">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>Birth Date:</Form.Label>
                                        <Box>
                                            <DateTimePicker
                                                // style={{ width: "400px" }}
                                                onChange={(e) => setDataNewUser({ ...dataNewUser, tanggal_lahir: e })}
                                                value={dataNewUser.tanggal_lahir}
                                            // minDate={new Date()}
                                            />
                                        </Box>
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Phone Number"
                                            value={dataNewUser.no_hp}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, no_hp: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Enter email"
                                            value={dataNewUser.email}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, email: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                            </Grid>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="text"
                                    placeholder="Enter Address"
                                    value={dataNewUser.alamat}
                                    onChange={(e) => setDataNewUser({ ...dataNewUser, alamat: e.target.value })}
                                    required />
                            </Form.Group>
                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Enter Password"
                                            value={dataNewUser.password}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, password: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>Join Date:</Form.Label>
                                        <Box>
                                            <DateTimePicker
                                                onChange={(e) => setDataNewUser({ ...dataNewUser, tanggal_masuk: e })}
                                                value={dataNewUser.tanggal_masuk}
                                            // minDate={new Date()}
                                            />
                                        </Box>
                                    </Form.Group>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            as="select"
                                            placeholder="Select Departmen"
                                            value={dataNewUser.iddepartement}
                                            onChange={(e) => {
                                                dispatch(getJabatanInDepartemen(Number(e.target.value)))
                                                setDataNewUser({ ...dataNewUser, iddepartement: Number(e.target.value) })
                                            }}
                                            required >
                                            <option value="" selected disabled>Select Department</option>
                                            {
                                                allDepartemen && allDepartemen.map((department) => (
                                                    <option value={department.id} key={department.id}>{department.name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            as="select"
                                            placeholder="Select Position"
                                            value={dataNewUser.idjabatan}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, idjabatan: Number(e.target.value) })}
                                            required >
                                            {
                                                dataNewUser.iddepartement > 0 ?
                                                    <>
                                                        <option value="" selected disabled>Select Position</option>
                                                        {
                                                            dataNewUser.iddepartement > 0 && jabatan && jabatan.map((position) => (
                                                                <option value={position.id} key={position.id}>{position.name}</option>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <option value="" selected hidden>Select Position</option>
                                                        <option value="" disabled>Select Department first</option>
                                                    </>
                                            }

                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item xs={6}>
                                    <Form.Group controlId="formBasicSelect2">
                                        <Form.Label>Level</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            as="select"
                                            size="sm"
                                            value={dataNewUser.idlevel}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, idlevel: Number(e.target.value) })}
                                        >
                                            <option value="" selected disabled>Select level</option>
                                            <option value="1">Subordinate</option>
                                            <option value="2">Lead</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={6}>
                                    <Form.Group controlId="formBasicSelect2">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            as="select"
                                            size="sm"
                                            value={dataNewUser.status}
                                            onChange={(e) => setDataNewUser({ ...dataNewUser, status: Number(e.target.value) })}
                                        >
                                            <option value="" selected disabled>Select status</option>
                                            <option value="1">Permanent</option>
                                            <option value="2">Contract</option>
                                            <option value="3">Probation</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                            </Grid>
                        </Form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="danger" size="sm" onClick={() => {
                        setPopupCreate(false)
                        setDataNewUser({
                            nama_depan: '',
                            nama_belakang: '',
                            email: '',
                            password: '',
                            jk: '',
                            no_hp: '',
                            alamat: '',
                            tempat_lahir: '',
                            tanggal_masuk: '',
                            tanggal_lahir: '',
                            idjabatan: '',
                            iddepartement: '',
                            idlevel: '',
                            status: '',
                        })
                    }}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Cancel</Button>
                    <Button variant="success" size="sm"
                        onClick={onAddNewUser}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>{isLoadingAddNewUser ? 'loading..' : 'Save'}</Button>
                </DialogActions>
            </Dialog>

            {/* popup edit */}
            <Dialog open={popupEdit} onClose={() => {
                setPopupEdit(false)
                setDataEditUser({
                    nama_depan: '',
                    nama_belakang: '',
                    email: '',
                    jk: '',
                    no_hp: '',
                    alamat: '',
                    tempat_lahir: '',
                    tanggal_masuk: '',
                    tanggal_lahir: '',
                    idjabatan: '',
                    iddepartement: '',
                    idlevel: '',
                    status: '',
                })
            }} fullWidth maxWidth="sm">
                <DialogTitle><Box fontSize={14} fontWeight={700}>Edit User</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        <Form noValidate >
                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="First Name"
                                            value={dataEditUser.nama_depan}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, nama_depan: e.target.value })}
                                            required />
                                    </Form.Group>

                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Last Name"
                                            value={dataEditUser.nama_belakang}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, nama_belakang: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicSelect2">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            as="select"
                                            size="sm"
                                            value={dataEditUser.jk}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, jk: e.target.value })}
                                        >
                                            <option value="" selected disabled>Select Gender</option>
                                            <option value="Laki-laki">Male</option>
                                            <option value="Perempuan">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>Birth Date:</Form.Label>
                                        <Box>
                                            <DateTimePicker
                                                // style={{ width: "400px" }}
                                                onChange={(e) => setDataEditUser({ ...dataEditUser, tanggal_lahir: e })}
                                                value={dataEditUser.tanggal_lahir}
                                            // minDate={new Date()}
                                            />
                                        </Box>
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Phone Number"
                                            value={dataEditUser.no_hp}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, no_hp: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Enter email"
                                            value={dataEditUser.email}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, email: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            type="text"
                                            placeholder="Enter Address"
                                            value={dataEditUser.alamat}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, alamat: e.target.value })}
                                            required />
                                    </Form.Group>
                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicDate">
                                        <Form.Label>Join Date:</Form.Label>
                                        <Box>
                                            <DateTimePicker
                                                onChange={(e) => setDataEditUser({ ...dataEditUser, tanggal_masuk: e })}
                                                value={dataEditUser.tanggal_masuk}
                                            // minDate={new Date()}
                                            />
                                        </Box>
                                    </Form.Group>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            as="select"
                                            placeholder="Select Departmen"
                                            value={dataEditUser.iddepartement}
                                            onChange={(e) => {
                                                dispatch(getJabatanInDepartemen(Number(e.target.value)))
                                                setDataEditUser({ ...dataEditUser, iddepartement: Number(e.target.value) })
                                            }}
                                            required >
                                            <option value="" selected disabled>Select Department</option>
                                            {
                                                allDepartemen && allDepartemen.map((department) => (
                                                    <option value={department.id} key={department.id}>{department.name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                </Grid>
                                <Grid item sm={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            size="sm"
                                            as="select"
                                            placeholder="Select Position"
                                            value={dataEditUser.idjabatan}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, idjabatan: Number(e.target.value) })}
                                            required >
                                            <option value="" selected disabled>Select Position</option>
                                            {
                                                jabatanEdit && jabatanEdit.map((position) => (
                                                    <option value={position.id} key={position.id}>{position.name}</option>
                                                ))
                                            }

                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent='space-between' spacing={2}>
                                <Grid item xs={6}>
                                    <Form.Group controlId="formBasicSelect2">
                                        <Form.Label>Level</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            as="select"
                                            size="sm"
                                            value={dataEditUser.idlevel}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, idlevel: Number(e.target.value) })}
                                        >
                                            <option value="" selected disabled>Select level</option>
                                            <option value={1}>Subordinate</option>
                                            <option value={2}>Lead</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={6}>
                                    <Form.Group controlId="formBasicSelect2">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '11px' }}
                                            as="select"
                                            size="sm"
                                            value={`'${dataEditUser.status}'`}
                                            onChange={(e) => setDataEditUser({ ...dataEditUser, status: Number(e.target.value) })}
                                        >
                                            <option value="" selected disabled>Select status</option>
                                            <option value="1">Permanent</option>
                                            <option value="2">Contract</option>
                                            <option value="3">Probation</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Grid>
                            </Grid>
                        </Form>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button variant="danger" size="sm" onClick={() => {
                        setPopupEdit(false)
                        setDataEditUser({
                            nama_depan: '',
                            nama_belakang: '',
                            email: '',
                            jk: '',
                            no_hp: '',
                            alamat: '',
                            tempat_lahir: '',
                            tanggal_masuk: '',
                            tanggal_lahir: '',
                            idjabatan: '',
                            iddepartement: '',
                            idlevel: '',
                            status: '',
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
                        }}>{isLoadingAddNewUser ? 'loading..' : 'Save'}</Button>
                </DialogActions>
            </Dialog>

            {/* popup detail */}
            <Dialog open={popupDetail} onClose={() => setPopupDetail(false)} fullWidth maxWidth="md">
                <DialogTitle><Box fontSize={14} fontWeight={700}>Detail User</Box></DialogTitle>
                <DialogContent>
                    <Box fontSize={11}>
                        {
                            profileUser && loadingGetProfile === false ?
                                <Grid container justifyContent="space-between">
                                    <Grid item lg={3}>
                                        <Box pt={4}>
                                            <AccountCircleIcon style={{ color: "#001E3C", fontSize: "150px" }} />
                                        </Box>
                                    </Grid>
                                    <Grid item lg={9}>
                                        <Box>
                                            <Box py={1} fontSize={12}>
                                                <Grid container alignItems="center">
                                                    <Grid item lg={3}>Name </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].nama_depan} {profileUser[0].nama_belakang === null ? '' : profileUser[0].nama_belakang}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>
                                            <Box py={1} fontSize={12}>
                                                <Grid container alignItems="center">
                                                    <Grid item lg={3}>Position </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].jabatan}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>
                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Department: </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].departemen}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>
                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Level: </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].level}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>

                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Status: </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].status === 1 ? 'Permanent'
                                                        : profileUser[0].status === 2 ? 'Contract'
                                                            : 'Probation'}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>

                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Hire Date: </Grid>
                                                    <Grid item lg={9}>: {moment(profileUser[0].tanggal_masuk).format('DD MMMM YYYY')}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>

                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Email: </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].email}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>

                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Phone: </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].no_hp}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>

                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Birth Date: </Grid>
                                                    <Grid item lg={9}>: {moment(profileUser[0].tanggal_lahir).format('DD MMMM YYYY')}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>

                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Gender: </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].jk === 'Perempuan' ? 'Female' : 'Male'}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>

                                            <Box py={1} fontSize={12}>
                                                <Grid container>
                                                    <Grid item lg={3}>Address: </Grid>
                                                    <Grid item lg={9}>: {profileUser[0].alamat}</Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                                :
                                'loading..'
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="primary" size="sm" onClick={() => {
                        setPopupDetail(false)
                    }}
                        style={{
                            fontSize: '11px',
                            paddingLeft: '25px',
                            paddingRight: '25px'
                        }}>Close</Button>
                </DialogActions>
            </Dialog>

            <Grid container>
                <Grid item lg={2}>
                    <SideBar />

                </Grid>
                <Grid item lg={10} style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                    <TopBar label='All User' />
                    <Box px={2} className="container-content" pb={5}>
                        <Grid container justifyContent="space-between">
                            <Grid lg={6} item>
                                <Box pb={3} >
                                    <Button size="small" variant="outline-primary"
                                        style={{ fontSize: '11px', paddingRight: '15px', paddingLeft: '15px' }}
                                        onClick={() => setPopupCreate(true)}
                                    >
                                        Add New User
                            </Button>
                                </Box>
                            </Grid>
                            <Grid item lg={6}>
                                <Box pb={3} textAlign="right" >
                                    <Search placeholder="Search User"
                                        onChange={(e) => {
                                            dispatch(getAllUser(e.target.value))
                                        }}
                                        allowClear
                                        style={{ width: 350 }} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box textAlign="right" fontSize={12} pb={1} color="gray" >Total {allUser.length} User</Box>
                        <Box pb={2}>
                            {isLoadingListUser ? 'loading..' :
                                <Table columns={columns} dataSource={allUser} pagination />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}
