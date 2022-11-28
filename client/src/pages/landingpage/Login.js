import React, { useState, useEffect } from 'react'
import {
    Box,
    Container,
    Grid
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router"
import AppBar from '../component/AppBar'
import { Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImgWorking from '../../Assets/img/undraw_working.svg'
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../redux/auth/actionCreator'
import swal from 'sweetalert'

export default function Loginpage() {
    const dispatch = useDispatch()
    const history = useHistory();
    const Login = useSelector(state => state.auth)

    const [validated, setValidated] = useState(false);
    const [dataLogin, sedataLogin] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (Login.error !== null) {
            swal({
                title: "0ps!",
                text: `${Login.error}`,
                icon: "warning",
            });
        }
    }, [Login.loading]);

    useEffect(() => {

        if (Login.login) {
            swal({
                title: "Great!",
                text: "Login success",
                icon: "success",
            });
        }
    }, [Login.login])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() && (dataLogin.email.length > 0 && dataLogin.password.length > 0)) {
            dispatch(login(dataLogin.email, dataLogin.password))
        }

        setValidated(true);
    }
    return (
        <>
            <AppBar />
            <Container  >
                <Box pt={3} pb={8}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box>
                                <img src={ImgWorking} alt="img_working_login" width="90%" />
                            </Box>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box pt={4} fontSize={28} fontWeight={600} >Let's Start Work.</Box>
                            <Box pt={3}>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="example@email.com" required onChange={(e) => sedataLogin({ ...dataLogin, email: e.target.value })} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            Email is a required field
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="••••••••••••" required onChange={(e) => sedataLogin({ ...dataLogin, password: e.target.value })} />
                                        <Form.Control.Feedback type="invalid">
                                            Password is a required field
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button style={{ width: "100%", borderRadius: "25px", backgroundColor: "#50B799", borderColor: '#50B799' }} variant="primary" type="submit">
                                        {
                                            Login.loading ?
                                                <Spinner animation="border" variant="light" size="sm" style={{ backgroundColor: "transparent" }}
                                                />
                                                :
                                                <>Login</>
                                        }
                                    </Button>
                                    {/* <Form.Text className="text-muted">
                                        Don't have an account yet?
                                        <Link to="/register">
                                            <span style={{ fontWeight: "bold", color: '#22252F' }}> Register</span>
                                        </Link>
                                    </Form.Text> */}
                                </Form>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>

            </Container>
        </>
    )

}