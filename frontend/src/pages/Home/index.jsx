// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';

export const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });

    return (
        <Container>
            <Row>
                <Col className="background">
                    <h1 className="title">Home</h1>
                    <p>This is a public route!</p>
                    <div className="d-flex gap-4">
                        <Link to="/login">
                            <Button variant="primary" type="button">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary" type="button">
                                Register
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
