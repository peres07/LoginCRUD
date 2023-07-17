import { Button, Modal, ModalHeader } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ChangeUsernameModal } from './changeUsernameModal';
import { ChangeEmailModal } from './changeEmail';
import { ChangePasswordModal } from './changePassword';

export const SettingsModal = ({ showSettings, handleCloseSettings }) => {
    const [showUsername, setShowUsername] = useState(false);
    const handleShowUsername = () => {
        setShowUsername(true);
        handleCloseSettings();
    };
    const handleCloseUsername = () => setShowUsername(false);

    const [showEmail, setShowEmail] = useState(false);
    const handleShowEmail = () => {
        setShowEmail(true);
        handleCloseSettings();
    };
    const handleCloseEmail = () => setShowEmail(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(true);
        handleCloseSettings();
    };
    const handleClosePassword = () => setShowPassword(false);

    return (
        <>
            <Modal
                show={showSettings}
                onHide={handleCloseSettings}
                className="dark-modal"
            >
                <ModalHeader closeButton>
                    <Modal.Title className="text-center">Settings</Modal.Title>
                </ModalHeader>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center gap-4">
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleShowUsername}
                    >
                        Change Username
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleShowEmail}
                    >
                        Change Email
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleShowPassword}
                    >
                        Change Password
                    </Button>
                </Modal.Body>
            </Modal>
            <ChangeUsernameModal
                showUsername={showUsername}
                handleCloseUsername={handleCloseUsername}
            />
            <ChangeEmailModal
                showEmail={showEmail}
                handleCloseEmail={handleCloseEmail}
            />
            <ChangePasswordModal
                showPassword={showPassword}
                handleClosePassword={handleClosePassword}
            />
        </>
    );
};

SettingsModal.propTypes = {
    showSettings: PropTypes.bool.isRequired,
    handleCloseSettings: PropTypes.func.isRequired,
};
