// import React, { useState, useEffect } from 'react';
// import { makeStyles, fade } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
// import Linkto from '@material-ui/core/Link';
// import {
//     Grid,
//     Box,
//     Button,
//     Avatar,
//     Container,
//     Typography,
//     Toolbar,
//     AppBar,
//     IconButton
// }
//     from '@material-ui/core';

// export default function AppBarComponent() {

//     const [headerBackground, setHeaderBackground] = useState('fixed')


//     useEffect(() => {
//         document.addEventListener('scroll', () => {
//             if (window.scrollY < 70) {
//                 setHeaderBackground('fixed')
//             } else if (window.scrollY < 100) {
//                 setHeaderBackground('opacity25%')
//             } else if (window.scrollY < 200) {
//                 setHeaderBackground('opacity50%')
//             } else if (window.scrollY < 225) {
//                 setHeaderBackground('opacity60%')
//             } else if (window.scrollY < 250) {
//                 setHeaderBackground('opacity75%')
//             } else if (window.scrollY < 300) {
//                 setHeaderBackground('opacity80%')
//             } else if (window.scrollY < 400) {
//                 setHeaderBackground('opacity90%')
//             } else {
//                 setHeaderBackground('action')
//             }
//         })
//     })


//     return (
//         <React.Fragment>
//             <div className="appbar">
//                 <AppBar
//                     className="appbar"
//                     elevation={0}
//                     position="fixed"
//                     style={{
//                         backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white',
//                         paddingTop: '25px',
//                         paddingBottom: '25px'
//                     }}
//                 >
//                     <Container maxWidth='lg' style={{ color: "black", backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white', }}>
//                         <Grid container direction="row" alignItems="center" justify="space-between" style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white' }}>
//                             <Grid item xs={4}>
//                                 <Linkto href='/' style={{ textDecoration: 'none', color: "#2F2E41" }}>
//                                     <Box fontSize={20} fontWeight={700} className="appbar" style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white' }}>
//                                         WorkDone
//                                 </Box>
//                                 </Linkto>
//                             </Grid>
//                             <Grid item xs={8} style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white', }}>
//                                 <Box style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white' }}>
//                                     <Grid container spacing={3} direction="row" justifyContent="flex-end" style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white' }}>
//                                         <Grid xs={1} item style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white', }}>
//                                             <Linkto href='/login' style={{ textDecoration: 'none', color: "#2F2E41" }}>
//                                                 <Box fontWeight={500} className="appbar menu" style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white' }}>
//                                                     Login
//                                             </Box>
//                                             </Linkto>
//                                         </Grid>
//                                         <Grid xs={1} item style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white', }}>
//                                             <Linkto href='/register' style={{ textDecoration: 'none', color: "#2F2E41" }}>
//                                                 <Box fontWeight={500} className="appbar menu" style={{ backgroundColor: headerBackground === 'fixed' ? '#EFF4FB' : 'white' }}>
//                                                     Register
//                                             </Box>
//                                             </Linkto>
//                                         </Grid>
//                                     </Grid>
//                                 </Box>
//                             </Grid>
//                         </Grid>


//                     </Container>

//                 </AppBar>
//             </div>


//         </React.Fragment >
//     );
//     // }
// }

import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Link } from '@material-ui/core'

export default function AppBar() {


    // useEffect(() => {
    //     document.addEventListener('scroll', () => {
    //         if (window.scrollY < 70) {
    //             setHeaderBackground('fixed')
    //         } else if (window.scrollY < 100) {
    //             setHeaderBackground('opacity25%')
    //         } else if (window.scrollY < 200) {
    //             setHeaderBackground('opacity50%')
    //         } else if (window.scrollY < 225) {
    //             setHeaderBackground('opacity60%')
    //         } else if (window.scrollY < 250) {
    //             setHeaderBackground('opacity75%')
    //         } else if (window.scrollY < 300) {
    //             setHeaderBackground('opacity80%')
    //         } else if (window.scrollY < 400) {
    //             setHeaderBackground('opacity90%')
    //         } else {
    //             setHeaderBackground('action')
    //         }
    //     })
    // })
    return (
        <div>
            <Container >
                <Box py={4} >
                    <Grid container direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item >
                            <Box fontWeight={700} color="#50B799" fontSize={24}>WorkDone</Box>
                        </Grid>
                        <Grid item >
                            <Link href="/login"><span onClick={() => { }} style={{ paddingRight: "10px" }}>Login</span></Link>
                            <Link href="/register"><span style={{ paddingLeft: "10px" }}>Register</span></Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </div>
    )
}
