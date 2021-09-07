import React from 'react'
import { Box, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'


export default function dashboardUser() {
    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                <SideBar />

                </Grid>
                <Grid item md={10}>
                    <Box py={5}>HAIIII
                    
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
