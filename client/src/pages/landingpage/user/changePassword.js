import React, { useState, useEffect } from 'react'
import { Box, Grid, Avatar, Divider } from '@material-ui/core'

import SideBar from '../../component/pages/user/sideBar'
import TopBar from '../../component/pages/user/topBar'

const ChangePassword = () => {

    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar label="Change Password" />
                    <Box px={2} className="container-content" pb={5}>
                        d
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChangePassword;