import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../../../context/AuthProvider';
import { VerificationCodeSender } from '../../../components/VerificationCodeSender';

export const ChangePasswordModal = ({ showPassword, handleClosePassword }) => {
  const { changePassword } = useContext(AuthContext);

  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const passwordRef = useRef();
  const codeRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await changePassword(
      newPasswordRef.current.value,
      confirmNewPasswordRef.current.value,
      passwordRef.current.value,
      codeRef.current.value,
    );
  };

  return (
    <Modal show={showPassword} onHide={handleClosePassword} className='dark-modal'>
      <ModalHeader closeButton>
        <Modal.Title className='text-center'>Change Username</Modal.Title>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicNewPassword'>
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              ref={newPasswordRef}
              required={true}
            />
          </Form.Group>
          <Form.Group controlId='formBasicConfirmNewPassword'>
            <Form.Label>Retype New Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Retype new password'
              ref={confirmNewPasswordRef}
              required={true}
            />
          </Form.Group>
          <Form.Group controlId='formBasicCurrentPassword'>
            <Form.Label>Current Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter current password'
              ref={passwordRef}
              required={true}
            />
          </Form.Group>
          <VerificationCodeSender codeRef={codeRef} />
          <Button variant='primary' type='submit' className='mt-4'>
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
