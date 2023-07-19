// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Form,
    Row,
} from 'react-bootstrap';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Register = () => {
    const [codeSend, setCodeSend] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);

    const formRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const codeRef = useRef();

    const { signed, register, sendCode } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Register';
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        } else if (timeLeft === 0) {
            setCodeSend(false);
            setTimeLeft(180);
        }
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const onSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const code = codeRef.current.value;

        const response = await register(email, username, password, code);
        try {
            if (response.status === 200) {
                formRef.current.reset();
                setCodeSend(false);
            }
        } catch (error) {
            // pass
        }
    };

    const sendCodeButton = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const res = await sendCode(email);
        try {
            if (res.status === 200) {
                setTimeLeft(180);
                setCodeSend(true);
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
                                <Form.Label htmlFor="username">
                                    Username:
                                </Form.Label>
                                <Form.Control
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
                                <Form.Control
                                    type="password"
                                    id="password"
                                    ref={passwordRef}
                                    required={true}
                                />
                            </Col>
                            <Col className="d-grid">
                                <Form.Label htmlFor="code" className="mb-1">
                                    Verify Code:
                                </Form.Label>
                                <a
                                    onClick={sendCodeButton}
                                    className="sendCode-label mb-2"
                                    style={
                                        codeSend
                                            ? {
                                                  color: '#d3d3d3',
                                                  cursor: 'not-allowed',
                                              }
                                            : {}
                                    }
                                >
                                    {codeSend
                                        ? `Not received? Resend the code in ${minutes}:${
                                              seconds < 10
                                                  ? `0${seconds}`
                                                  : seconds
                                          }`
                                        : 'Click here to send Code'}
                                </a>
                                <Form.Control
                                    type="text"
                                    id="code"
                                    ref={codeRef}
                                    required={true}
                                />
                            </Col>
                            <Col className="d-grid">
                                <Button type="submit" className="mt-3">
                                    SignUp
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
