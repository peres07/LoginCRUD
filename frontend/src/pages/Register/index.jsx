// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    Row,
} from 'react-bootstrap';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Register = () => {
    const formRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const { signed, register } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Register';
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const response = await register(email, username, password);
        try {
            if (response.status === 200) {
                formRef.current.reset();
            }
        } catch (error) {
            // pass
        }
    };

    if (signed) return <Navigate to="/profile" />;

    return (
        <Container>
            <Row>
                <Col className="background">
                    <h1 className="title">Register</h1>
                    <Form
                        className="inside-container d-grid gap-3"
                        onSubmit={onSubmit}
                        ref={formRef}
                    >
                        <FormGroup className="inputs d-grid gap-2">
                            <Col>
                                <Form.Label htmlFor="email">E-Mail:</Form.Label>
                                <FormControl
                                    type="email"
                                    id="email"
                                    ref={emailRef}
                                    required={true}
                                />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="username">
                                    Username:
                                </Form.Label>
                                <FormControl
                                    type="text"
                                    id="username"
                                    ref={usernameRef}
                                    required={true}
                                />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="password">
                                    Password:
                                </Form.Label>
                                <FormControl
                                    type="password"
                                    id="password"
                                    ref={passwordRef}
                                    required={true}
                                />
                            </Col>
                            <Col className="d-grid">
                                <Button type="submit" className="mt-3">
                                    SignUp
                                </Button>
                            </Col>
                        </FormGroup>
                        <div className="or">
                            <div className="lines"></div>
                            <span>or</span>
                            <div className="lines"></div>
                        </div>
                        <Col className="text-center">
                            <a
                                href="/login"
                                className="login-label text-decoration-none"
                            >
                                Login Now!
                            </a>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
