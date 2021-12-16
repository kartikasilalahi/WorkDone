import React, { useState, useEffect } from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Dropdown } from 'react-bootstrap';
import TopBar from '../../component/pages/user/topBar'
import { UbahPassword } from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

const ChangePassword = () => {
    const dispatch = useDispatch()
    const messageChangePassword = useSelector(state => state.task.message_change_password)
    const loadingChangePassword = useSelector(state => state.task.is_loading_change_password)

    let id = Number(localStorage.getItem('id'))
    let email = localStorage.getItem('email')

    const [dataPassword, setDataPassword] = useState({
        current: "",
        newPassword: "",
        id: id
    });
    const [isclicked, setisclicked] = useState(false);

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
        if (messageChangePassword.length > 0 && loadingChangePassword === false && isclicked) {
            if (messageChangePassword === 'Password berhasil diperbaharui') {
                Toast.fire({
                    icon: 'success',
                    title: messageChangePassword
                })
                setDataPassword({
                    current: "",
                    newPassword: "",
                    id: id
                })
                setisclicked(false)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: messageChangePassword
                })
                setisclicked(false)

            }

        }
    }, [loadingChangePassword, messageChangePassword])

    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar label="Change Password" />
                    <Box px={2} className="container-content" pb={5}>
                        <Box pb={6} px={4} pt={4} fontSize={14} style={{ border: "1px solid #dedede", borderRadius: "8px", backgroundColor: "whitesmoke" }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '12px' }}
                                    size="sm"
                                    type="text"
                                    disabled
                                    value={email}
                                    required />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '12px' }}
                                    size="sm"
                                    type="password"
                                    placeholder="Enter current Password"
                                    value={dataPassword.current}
                                    onChange={(e) => setDataPassword({ ...dataPassword, current: e.target.value })}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    style={{ fontSize: '11px' }}
                                    size="sm"
                                    type="text"
                                    placeholder="Enter new Password"
                                    value={dataPassword.newPassword}
                                    onChange={(e) => setDataPassword({ ...dataPassword, newPassword: e.target.value })}
                                    required />
                            </Form.Group>

                            <Button size="sm" onClick={() => {
                                setisclicked(true)
                                dispatch(UbahPassword(dataPassword))
                            }} >
                                Save
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}

export default ChangePassword
