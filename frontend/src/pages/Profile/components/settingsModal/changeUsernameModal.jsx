import { Button, Form, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import { VerificationCodeSender } from '../../../components/VerificationCodeSender';

export const ChangeUsernameModal = ({ showUsername, handleCloseUsername }) => {
    const { changeUsername } = useContext(AuthContext);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const codeRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await changeUsername(
            usernameRef.current.value,
            passwordRef.current.value,
            codeRef.current.value
        );
    };

    return (
        <Modal
            show={showUsername}
            onHide={handleCloseUsername}
            className="dark-modal"
        >
            <ModalHeader closeButton>
                <Modal.Title className="text-center">
                    Change Username
                </Modal.Title>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>New Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new username"
                            ref={usernameRef}
                            required="true"
                        />
                        <Form.Label className="mt-2">Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            ref={passwordRef}
                            required="true"
                        />
                    </Form.Group>
                    <VerificationCodeSender codeRef={codeRef} />
                    <Button variant="primary" type="submit" className="mt-4">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

ChangeUsernameModal.propTypes = {
    showUsername: PropTypes.bool.isRequired,
    handleCloseUsername: PropTypes.func.isRequired,
};
