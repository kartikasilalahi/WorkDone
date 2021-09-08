import React from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import TopBar from '../../component/pages/user/topBar'

export default function task() {
    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar />
                    <Box px={2} className="container-content" pb={5}>
                        ALL TASK
                        <Box pb={2}>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
