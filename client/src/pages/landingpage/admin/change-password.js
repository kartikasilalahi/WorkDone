import React from 'react'
import { Grid } from '@material-ui/core'
import TopBar from '../../component/pages/admin/topBar'
import SideBar from '../../component/pages/admin/sideBar'


export default function dashboardAdmin() {
    return (
        <div>
            <Grid container>
                <Grid item lg={2}>
                    <SideBar />

                </Grid>
                <Grid item lg={10} style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                    <TopBar label='Change Password' />
                </Grid>
            </Grid>
        </div>
    )
}
