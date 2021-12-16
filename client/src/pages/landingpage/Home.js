import React from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import ImgTasklist from '../../Assets/img/undraw_Work_team.svg'
import AppBar from '../component/AppBar'


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
                </Box>
            </Container>
        </div >
    )
}
