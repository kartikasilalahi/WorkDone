import React, { useState, useEffect } from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Dropdown } from 'react-bootstrap';
// import ReactQuill from 'react-quill'
import TopBar from '../../component/pages/user/topBar'
import { sendReport, getProfileUser } from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment'

const Profile = () => {
    const dispatch = useDispatch()
    let id = Number(localStorage.getItem('id'))
    let idlevel = Number(localStorage.getItem('idlevel'))
    let iddepartemen = Number(localStorage.getItem('iddepartemen'))
    const messageSendReport = useSelector(state => state.task.message_send_report)
    const loadingSendReport = useSelector(state => state.task.is_loading_send_report)
    const profile = useSelector(state => state.task.profile_user)
    const loadingGetProfile = useSelector(state => state.task.is_loading_profile_user)

    // const [reportField, setReportField] = useState('');
    const [isSend, setIsSend] = useState(false);

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
        if (messageSendReport && messageSendReport.length > 0 && isSend) {
            Toast.fire({
                icon: 'success',
                title: messageSendReport
            })
            setIsSend(false)
        }
    }, [messageSendReport])

    useEffect(() => {
        dispatch(getProfileUser(id))

    }, [dispatch])

    console.log("profile", profile)

    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar label="Profile" />
                    <Box px={10} pt={4} className="container-content" pb={5}>
                        {
                            loadingGetProfile === false && profile ?
                                <Box pb={6} px={4} pt={4} style={{ border: "1px solid #dedede", borderRadius: "8px", backgroundColor: "whitesmoke" }}>
                                    <Grid container justifyContent="space-between">
                                        <Grid item lg={2}>
                                            <Box>
                                                <AccountCircleIcon sx={{ fontSize: 120 }} style={{ color: "#001E3C" }} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={10}>
                                            <Box>
                                                <Box textAlign="right" fontSize={9}>
                                                    <Button size="sm">Edit</Button> {' '}
                                                </Box>
                                                <Box color="#88E38C" fontWeight="bold">{profile[0].nama_depan} {profile[0].nama_belakang === null ? '' : profile[0].nama_belakang}</Box>
                                                <Box py={1} fontSize={12}>
                                                    <Grid container alignItems="center">
                                                        <Grid item lg={3}>Position </Grid>
                                                        <Grid item lg={9}>: {profile[0].jabatan}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>
                                                <Box py={1} fontSize={12}>
                                                    <Grid container>
                                                        <Grid item lg={3}>Department: </Grid>
                                                        <Grid item lg={9}>: {profile[0].departemen}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>

                                                <Box py={1} fontSize={12}>
                                                    <Grid container>
                                                        <Grid item lg={3}>Hire Date: </Grid>
                                                        <Grid item lg={9}>: {moment(profile[0].tanggal_masuk).format('DD MMMM YYYY')}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>

                                                <Box py={1} fontSize={12}>
                                                    <Grid container>
                                                        <Grid item lg={3}>Email: </Grid>
                                                        <Grid item lg={9}>: {profile[0].email}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>

                                                <Box py={1} fontSize={12}>
                                                    <Grid container>
                                                        <Grid item lg={3}>Phone: </Grid>
                                                        <Grid item lg={9}>: {profile[0].no_hp}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>

                                                <Box py={1} fontSize={12}>
                                                    <Grid container>
                                                        <Grid item lg={3}>Birth Date: </Grid>
                                                        <Grid item lg={9}>: {moment(profile[0].tanggal_lahir).format('DD MMMM YYYY')}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>

                                                <Box py={1} fontSize={12}>
                                                    <Grid container>
                                                        <Grid item lg={3}>Gender: </Grid>
                                                        <Grid item lg={9}>: {profile[0].jk}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>

                                                <Box py={1} fontSize={12}>
                                                    <Grid container>
                                                        <Grid item lg={3}>Address: </Grid>
                                                        <Grid item lg={9}>: {profile[0].alamat}</Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                :
                                'loading...'
                        }
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile
