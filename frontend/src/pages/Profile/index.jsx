// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Modal,
    Button,
    Form,
    ModalHeader,
    FormGroup,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { AuthContext } from '../../context/AuthProvider';
import jwt_decode from 'jwt-decode';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Profile = () => {
    const { user, logout, deleteAccount } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const passwordRef = useRef();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        document.title = 'Profile';
        try {
            const data = jwt_decode(user);

            if (data.exp < Date.now() / 1000) return logout();
            setData(data);
        } catch (err) {
            logout();
        }
    }, [user, logout]);

    const logoutButton = async (event) => {
        event.preventDefault();
        logout();
    };

    const deleteAccountButton = async (event) => {
        event.preventDefault();
        await deleteAccount(data.email, passwordRef.current.value);
    };

    if (!data) {
        return <></>;
    }

    return (
        <Container>
            <Row>
                <Col className="background">
                    <h1>Profile</h1>
                    <p>This is a private route!</p>
                    <Button variant="primary" onClick={logoutButton}>
                        Logout
                    </Button>
                    <div className="data">
                        <p>Username: {data.username}</p>
                        <p>Email: {data.email}</p>
                    </div>
                    <Button variant="danger" onClick={handleShow}>
                        Delete Account.
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        className="dark-modal"
                    >
                        <ModalHeader closeButton>Confirm Delete</ModalHeader>
                        <Modal.Body>
                            <Form onSubmit={deleteAccountButton}>
                                <FormGroup controlId="formBasicPassword">
                                    <p className="mb-2">
                                        Por favor, digite sua senha para
                                        confirmar a exclusão.
                                    </p>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        ref={passwordRef}
                                    />
                                </FormGroup>
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className="mt-3"
                                >
                                    Confirm Delete
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};
