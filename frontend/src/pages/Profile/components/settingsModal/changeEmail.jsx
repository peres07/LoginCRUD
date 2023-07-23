import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../../../context/AuthProvider';
import { VerificationCodeSender } from '../../../components/VerificationCodeSender';

export const ChangeEmailModal = ({ showEmail, handleCloseEmail }) => {
  const { changeEmail } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const codeRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await changeEmail(emailRef.current.value, passwordRef.current.value, codeRef.current.value);
  };

  return (
    <Modal show={showEmail} onHide={handleCloseEmail} className='dark-modal'>
      <ModalHeader closeButton>
        <Modal.Title className='text-center'>Change Email</Modal.Title>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>New Email:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter new email'
              ref={emailRef}
              required={true}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword' className='mb-6'>
            <Form.Label className='mt-2'>Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
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

ChangeEmailModal.propTypes = {
  showEmail: PropTypes.bool.isRequired,
  handleCloseEmail: PropTypes.func.isRequired,
};
