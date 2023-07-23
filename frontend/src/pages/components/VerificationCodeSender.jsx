import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthProvider';

export const VerificationCodeSender = ({ email, codeRef }) => {
  const [codeSend, setCodeSend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  const { sendCode } = useContext(AuthContext);

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

  const sendCodeButton = async (event) => {
    event.preventDefault();
    console.log(email);
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

  return (
    <Form.Group className='d-grid mt-3'>
      <Form.Label htmlFor='code' className='mb-1'>
        Verify Email Code:
      </Form.Label>
      <a
        onClick={sendCodeButton}
        className='sendCode-label mb-2'
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
          ? `Not received? Resend the code in ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
          : 'Click here to send Code'}
      </a>
      <Form.Control type='text' id='code' ref={codeRef} required={true} />
    </Form.Group>
  );
};

VerificationCodeSender.propTypes = {
  email: PropTypes.string,
  codeRef: PropTypes.func,
};
