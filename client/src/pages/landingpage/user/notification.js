import React from 'react'
import { Box, Grid } from '@material-ui/core'
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
                    <TopBar/>
                        <Box py={5}>HAIIII
                         
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
