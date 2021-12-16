import React, { useEffect, useState, forwardRef } from 'react'
import { Box, Grid, Avatar, Divider } from '@material-ui/core'
import IconNotif from '../../../../Assets/img/icon/notif.png'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Dropdown } from 'react-bootstrap';


const TopBar = ({ label }) => {
    // let Path = localStorage.getItem("path")
    const history = useHistory();
    const dispatch = useDispatch()
    const id = Number(localStorage.getItem('id'));
    const idlevel = Number(localStorage.getItem('idlevel'));

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


    return (
        <>
            {/* popup detail task */}

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
                                        <Dropdown.Toggle as={AvaToggle} id="dropdown-custom-components">
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            <Dropdown.Item onClick={() => history.push('/admin/change-password')}>
                                                Change Password
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