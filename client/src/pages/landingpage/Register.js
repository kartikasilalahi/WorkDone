import React, { useState } from 'react'
import {
    Box,
    Container,
    Grid
} from '@material-ui/core'
import AppBar from '../component/AppBar'
import { Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImgWorking from '../../Assets/img/undraw_working_anywhere_.svg'
import { Link } from 'react-router-dom';


export default function RegisterPage() {

    const [validated, setValidated] = useState(false);
    const [dataRegister, setdataRegister] = useState({
        fullname: "",
        email: "",
        password: "",
        repassword: "",
        department: "",
        position: "",
        level: "",
        status: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        setValidated(true);
    };

    return (
        <React.Fragment>
            <AppBar />
            <Container >
                <Box pb={8}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box>
                                <img src={ImgWorking} alt="img_working_register" width="90%" />
                            </Box>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box pt={4} fontSize={28} fontWeight={600} >Let's set up your account.</Box>
                            <Box pt={3}>

                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control name="fullname" type="text" placeholder="Enter Name" required onChange={(e) => setdataRegister({ ...dataRegister, fullname: e.target.value })} />
                                        <Form.Control.Feedback type="invalid">
                                            Full Name is a required field
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control name="email" type="email" placeholder="name@example.com" required onChange={(e) => setdataRegister({ ...dataRegister, email: e.target.value })} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                    </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            Email is a required field
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Row>
                                            <Col>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control name="password" type="password" placeholder="••••••••••••" required onChange={(e) => setdataRegister({ ...dataRegister, password: e.target.value })} />
                                                <Form.Control.Feedback type="invalid">
                                                    Password is a required field
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col>
                                                <Form.Label>Retype Password</Form.Label>
                                                <Form.Control name="repassword" type="password" placeholder="••••••••••••" required onChange={(e) => setdataRegister({ ...dataRegister, repassword: e.target.value })} />
                                                <Form.Control.Feedback type="invalid">
                                                    Retype password is a required field
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Row>
                                            <Col>
                                                <Form.Label>Job Departement</Form.Label>
                                                <Form.Control name="department" as="select" required onChange={(e) => setdataRegister({ ...dataRegister, department: e.target.value })} >
                                                    <option disabled value="" hidden selected>Select Departement</option>
                                                    <option value="1">Product Development & Technology</option>
                                                    <option value="2">Sales & Operation</option>
                                                    <option value="3">Marketing & Creative, Promotion and Production</option>
                                                    <option value="4">Partnership & PMO</option>
                                                    <option value="5">Accounting, Finance, HR & Legal</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a job department
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col>
                                                <Form.Label>Position</Form.Label>
                                                <Form.Control name="position" as="select" required onChange={(e) => setdataRegister({ ...dataRegister, position: e.target.value })} >
                                                    <option disabled value="" hidden selected>Select Position</option>
                                                    <option value="1">Human Resource</option>
                                                    <option value="2">Finance</option>
                                                    <option value="3">IT</option>
                                                    <option value="4">Marketing</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose the position
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Row>
                                            <Col>
                                                <Form.Label>Job Level</Form.Label>
                                                <Form.Control name="level" as="select" required onChange={(e) => setdataRegister({ ...dataRegister, level: e.target.value })} >
                                                    <option disabled value="" hidden selected>Select Job Level</option>
                                                    <option value="1">Staff</option>
                                                    <option value="2">Director</option>
                                                    <option value="3">dll</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a job level
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col>
                                                <Form.Label>Job Status</Form.Label>
                                                <Form.Control name="status" as="select" required onChange={(e) => setdataRegister({ ...dataRegister, status: e.target.value })} >
                                                    <option value="" disabled value="" hidden selected>Select Job Status</option>
                                                    <option value="1">Permanent</option>
                                                    <option value="2">Contract</option>
                                                    <option value="3">Freelance</option>
                                                    <option value="4">Probation</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a job status
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                        <Box pt={3}>
                                            <Button htmlType="submit" style={{ width: "100%", borderRadius: "25px", backgroundColor: "#50B799", borderColor: '#50B799' }} variant="primary" type="submit">
                                                Register
                                            </Button>
                                            <Form.Text className="text-muted">
                                                Already have an account?
                                                <Link to="/login">
                                                    <span style={{ fontWeight: "bold", color: '#22252F' }}> Login</span>
                                                </Link>
                                            </Form.Text>
                                        </Box>
                                    </Form.Group>


                                </Form>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Container>
        </React.Fragment>
    )

}