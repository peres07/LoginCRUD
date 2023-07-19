// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import './styles.css';
import {
    Button,
    Col,
    Container,
    Form,
    Row,
} from 'react-bootstrap';

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { authenticate, signed } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await authenticate(email, password);
    };

    if (signed) return <Navigate to="/profile" />;

    return (
        <Container>
            <Row>
                <Col className="background">
                    <h1 className="title">Login</h1>
                    <Form
                        className="inside-container d-grid gap-3"
                        onSubmit={onSubmit}
                    >
                        <Form.Group className="inputs d-grid gap-2">
                            <Col>
                                <Form.Label htmlFor="email">E-Mail:</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    ref={emailRef}
                                    required={true}
                                />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="password">
                                    Password:
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    ref={passwordRef}
                                    required={true}
                                />
                            </Col>
                            <Col className="d-grid">
                                <Button type="submit" className="mt-3">
                                    SignIn
                                </Button>
                            </Col>
                        </Form.Group>
                        <div className="or">
                            <div className="lines"></div>
                            <span>or</span>
                            <div className="lines"></div>
                        </div>
                        <Col className="text-center">
                            <a
                                href="/register"
                                className="register-label text-decoration-none"
                            >
                                Register Now
                            </a>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
