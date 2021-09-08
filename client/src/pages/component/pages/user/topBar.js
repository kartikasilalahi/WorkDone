import React, { useEffect, useState } from 'react'
import { Box, Grid, Avatar } from '@material-ui/core'

export default function topBar() {
    let Path = localStorage.getItem("path")
    // console.log("p>>", Path)
    let label = ""
    if (Path === null) label = "Home"
    else label = localStorage.getItem("path")

    return (
        <div className="topbar">
            <Box px={2} py={2.5}>
                <Grid container alignItems="center" direction="row">
                    <Grid item xs={6} sm={6} md={5} lg={5} xl={5}>
                        <Box fontWeight={600} fontSize={18}> {label}</Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={5} lg={5} xl={5}>
                        <Box textAlign="right" style={{ float: "right" }}>
                            <Avatar style={{ height: "50px", width: "50" }} src="https://minimal-kit-react.vercel.app/static/illustrations/illustration_avatar.png" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
