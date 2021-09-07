import React from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import ImgTasklist from '../../Assets/img/undraw_Work_team.svg'
import AppBar from '../component/AppBar'
// import Clockin from '../../Assets/img/icon/clockin.svg'
// import Collab from '../../Assets/img/icon/collab.svg'
// import Task from '../../Assets/img/icon/task.svg'


export default function Home() {
    return (
        <div>
            <AppBar />
            <Container maxWidth="lg" className="container">
                <Box py={5}>
                    <Box textAlign="center" fontWeight={700} className="title">
                        Manage Your Task
                    </Box>
                    <Box className="subtitle">
                        <Container maxWidth="md">
                            Encan boards, list, and cards enable you to organize and prioritize you projects in a fun, flexible, and rewarding way. Let's started!
                    </Container>
                    </Box>
                    <Box textAlign="center" py={6}>
                        <Container maxWidth="md">
                            <img src={ImgTasklist} className="img_task_list_home" alt="img_task_list_home" />
                        </Container>
                    </Box>

                    {/* <Box pt={12} pb={5} textAlign="center" fontWeight={700} fontSize={20}>
                        Do it NOw
                    </Box> */}

                    {/* <Box >
                        <Container maxWidth="md">
                            <Grid container direction="row" spacing={3} alignItems="center" alignContent="center">
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                    <Box textAlign="center">
                                        <img src={Clockin} width="40%" />
                                        <Box py={3}>
                                            Clockin
                                    </Box>
                                    </Box>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                    <Box textAlign="center">
                                        <img src={Collab} width="40%" />
                                        <Box py={3}>
                                            Collab
                                    </Box>
                                    </Box>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                    <Box textAlign="center">
                                        <img src={Task} width="40%" />
                                        <Box py={3}>
                                            TaskDone
                                    </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box> */}
                </Box>
            </Container>
        </div >
    )
}



// import React from 'react'
// import AppBar from '../Component/AppBar'
// import {
//     Box,
//     Container,
//     // Grid 
// } from '@material-ui/core'
// import ImgTasklist from '../../Assets/img/undraw_Work_team.svg'
// // import ImgClockin from '../../Assets/img/clockin.png'
// // import ImgTeamWork from '../../Assets/img/teamwork.png'
// // import ImgTask from '../../Assets/img/task.png'
// // import Imgcrm from '../../Assets/img/crm.png'

// const Homepage = () => {
//     // WORKDONE
//     // Manajemen proyek kolaboratif

//     return (
//         <>
//             <AppBar />
//             <Container className="container">
//                 <Box className="title" textAlign="center" fontWeight={700} >
//                     Manage Your Task.
//                 </Box>
//                 <Box className="subtitle" >
//                     Encan boards, list, and cards enable you to organize and prioritize you projects in a fun,
//                 </Box>
//                 <Box className="subtitle" pb={1} >
//                     flexible, and rewarding way. Let's started
//                 </Box>
//                 <Box textAlign="center">
//                     <img src={ImgTasklist} width="50%" className="img_task_list_home" alt="img_task_list_home" />
//                 </Box>
//                 <Box style={{ paddingTop: "10%" }} className="title" fontWeight={500} fontSize={28} textAlign="center"  >
//                     Help our team get more done
//                 </Box>


//                 {/* <Box style={{ paddingTop: "5%" }}>
//                     <Grid container direction="row" spacing={3} justify="space-between" alignItems="center" >
//                         <Grid item xl={3} l={3} md={3} sm={3} xs={6}>
//                             <Box textAlign="center">
//                                 <img src={ImgClockin} width="40%" />
//                             </Box>
//                             <Box textAlign="center">
//                                 Clockin/Clock-out
//                             </Box>
//                         </Grid>
//                         <Grid item xl={3} l={3} md={3} sm={3} xs={6}>
//                             <Box textAlign="center">
//                                 <img src={ImgTeamWork} width="40%" />
//                             </Box>
//                         </Grid>
//                         <Grid item xl={3} l={3} md={3} sm={3} xs={6}>
//                             <Box textAlign="center">
//                                 <img src={ImgTask} width="40%" />
//                             </Box>
//                         </Grid>
//                         <Grid item xl={3} l={3} md={3} sm={3} xs={6}>
//                             <Box textAlign="center">
//                                 <img src={Imgcrm} width="40%" />
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box> */}


//             </Container>
//         </>
//     )
// }

// export default Homepage;