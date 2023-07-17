import { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Modal, ModalHeader } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthProvider';

export const DeleteAccountModal = ({
    showDelete,
    handleCloseDeleteAccount,
}) => {
    const { deleteAccount } = useContext(AuthContext);
    const passwordRef = useRef();

    const deleteAccountButton = async (event) => {
        event.preventDefault();
        await deleteAccount(passwordRef.current.value);
    };

    return (
        <Modal
            show={showDelete}
            onHide={handleCloseDeleteAccount}
            className="dark-modal"
        >
            <ModalHeader closeButton>Confirm Delete</ModalHeader>
            <Modal.Body>
                <Form onSubmit={deleteAccountButton}>
                    <FormGroup controlId="formBasicPassword">
                        <p className="mb-2">
                            Por favor, digite sua senha para confirmar a
                            exclusão.
                        </p>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            required="true"
                        />
                    </FormGroup>
                    <Button variant="danger" type="submit" className="mt-3">
                        Confirm Delete
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

DeleteAccountModal.propTypes = {
    showDelete: PropTypes.bool.isRequired,
    handleCloseDeleteAccount: PropTypes.func.isRequired,
};
