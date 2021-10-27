import React, { useState } from 'react'
import { Box, Grid, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core'
import TopBar from '../../component/pages/user/topBar'
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Spinner } from 'react-bootstrap';



export default function DashboardUser() {

    const [open, setOpen] = useState(false);
    const [field, setField] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle><Box fontSize={14} fontWeight={700}>Add New Task</Box></DialogTitle>
                <DialogContent>
                    <Box>
                        <Form noValidate >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Add Task Name" required />
                            </Form.Group>

                            <Form.Group controlId="formbasictask" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control size="sm" as="textarea" rows={2} type="text" placeholder="Description task" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Start</Form.Label>
                                <Form.Control size="sm" type="date" placeholder="Add Task Name" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Duedate</Form.Label>
                                <Form.Control size="sm" type="date" placeholder="Add Task Name" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Assignee</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={field}
                                    size="sm"

                                >
                                    <option value="DICTUM">Dictamen</option>
                                    <option value="CONSTANCY">Constancia</option>
                                    <option value="COMPLEMENT">Complemento</option>
                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>

            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10} style={{ backgroundColor: "whitesmoke", minHeight: "600px" }}>
                    <TopBar />

                    <Box px={2} className="container-content" pb={5}>

                        <Box fontSize={22} fontWeight={600}>Hi, Wellcome Back!</Box>

                        <Box py={4}>
                            <Grid container>
                                <Grid item xs={6} s={6} md={6} lg={6}>
                                    <Box mx={5}>
                                        <Box>
                                            <Grid container justifyContent="space-around">
                                                <Grid item><Box fontWeight={600}>Priority Task</Box></Grid>
                                                <Grid item><Box color="#88D38B">See more</Box></Grid>
                                            </Grid>
                                        </Box>
                                        <Box ml={5} pt={2} pl={5}>
                                            <Box p={2} mb={2} style={{ width: "300px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                <Box>Task Name</Box>
                                                <Box fontSize={13}> Project Name</Box>
                                            </Box>
                                            <Box p={2} mb={2} style={{ width: "300px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                <Box>Task Name</Box>
                                                <Box fontSize={13}> Project Name</Box>
                                            </Box>
                                            <Box p={2} mb={2} style={{ width: "300px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                <Box>Task Name</Box>
                                                <Box fontSize={13}> Project Name</Box>
                                            </Box>
                                            <Box p={2} mb={2} style={{ width: "300px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                <Box>Task Name</Box>
                                                <Box fontSize={13}> Project Name</Box>
                                            </Box>
                                            <Box p={2} mb={2} style={{ width: "300px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                <Box>Task Name</Box>
                                                <Box fontSize={13}> Project Name</Box>
                                            </Box>
                                            <Box p={2} mb={2} style={{ width: "300px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                <Box>Task Name</Box>
                                                <Box fontSize={13}> Project Name</Box>
                                            </Box>
                                            <Box p={2} mb={2} style={{ width: "300px", borderRadius: "5px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                <Box fontSize={14} textAlign="center" onClick={handleClickOpen}>+ Create New Task</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} s={6} md={6} lg={6}>
                                    <Box>
                                        <Box mr={8}>
                                            <Grid container justifyContent="space-between">
                                                <Grid item><Box fontWeight={600}>Project</Box></Grid>
                                                <Grid item><Box color="#88D38B">See more</Box></Grid>
                                            </Grid>
                                        </Box>
                                        <Box pt={2} mr={8}>
                                            <Grid container spacing={3}>
                                                {["1", "2", "3", "4", "5"].map((val, i) => (

                                                    <Grid item xs={6} key={val}>
                                                        {
                                                            i === 4 ?
                                                                <Box p={2} style={{ borderRadius: "15px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                                    <Box textAlign="center"> + </Box>
                                                                    <Box textAlign="center" fontSize={13}> Add New</Box>
                                                                </Box> :
                                                                <Box p={2} style={{ borderRadius: "15px", WebkitBoxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", boxShadow: "0 0 23px 4px rgb(0 0 0 / 6%)", backgroundColor: '#fff' }}>
                                                                    <Box>Task Name</Box>
                                                                    <Box fontSize={13}>desc project...</Box>
                                                                </Box>
                                                        }
                                                    </Grid>
                                                )
                                                )}


                                            </Grid>

                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* <Box fontSize={14} py={5}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram,</Box>
                        <Box fontSize={14} py={5}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram,
                        </Box>
                        <Box fontSize={14} py={5}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram,
                        </Box> */}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
