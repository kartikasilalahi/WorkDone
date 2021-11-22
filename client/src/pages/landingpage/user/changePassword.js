import React from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Dropdown } from 'react-bootstrap';

import TopBar from '../../component/pages/user/topBar'

const ChangePassword = () => {
    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar label="My Task" />
                    <Box px={2} className="container-content" pb={5}>
                        <Grid container justifyContent='space-between' alignItems="center">
                            <Grid lg={6} item>
                                <Box pb={3} pl={2}>
                                    <Button size="small" variant="outline-primary"
                                        style={{ fontSize: '11px', paddingRight: '30px', paddingLeft: '30px' }}
                                    >
                                        New Task
                            </Button>
                                </Box>
                            </Grid>
                            <Grid lg={6} item>
                                <Box pb={3} textAlign="right" pr={4} >

                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChangePassword
