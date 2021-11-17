import React from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import TopBar from '../../component/pages/user/topBar'

export default function dashboardUser() {
    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar label="Notification" />
                    <Box px={2} className="container-content" pb={5}>
                        <Box>You have 2 unread messages</Box>
                        <Box pb={3} className="new-notif">
                            <Box pt={2}>New</Box>
                            <Box></Box>

                        </Box>
                        <Divider />
                        <Box pb={3} className="new-notif">
                            <Box pt={2}>Before That</Box>
                            <Box></Box>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
