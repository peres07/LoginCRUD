import { Button, Form, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';

export const ChangePasswordModal = ({ showPassword, handleClosePassword }) => {
    const { changePassword } = useContext(AuthContext);

    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await changePassword(
            newPasswordRef.current.value,
            confirmNewPasswordRef.current.value,
            passwordRef.current.value
        );
    };

    return (
        <Modal
            show={showPassword}
            onHide={handleClosePassword}
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
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new password"
                            ref={newPasswordRef}
                            required="true"
                        />
                        <Form.Label className="mt-2">
                            Retype New Password:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Retype new password"
                            ref={confirmNewPasswordRef}
                            required="true"
                        />
                        <Form.Label className="mt-2">
                            Current Password:
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter current password"
                            ref={passwordRef}
                            required="true"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-4">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

ChangePasswordModal.propTypes = {
    showPassword: PropTypes.bool.isRequired,
    handleClosePassword: PropTypes.func.isRequired,
};
