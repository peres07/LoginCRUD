import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthProvider';
import './styles.css';

export const Main = ({ data, handleShowDeleteAccount, handleShowSettings }) => {
  const { logout } = useContext(AuthContext);

  const logoutButton = async (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <Col className='background'>
      <h1 className='title'>Profile</h1>
      <p>This is a private route!</p>
      <div className='data'>
        <p>Username: {data.username}</p>
        <p>Email: {data.email}</p>
      </div>
      <Button variant='primary' onClick={handleShowSettings}>
        Settings
      </Button>
      <Button variant='secondary' onClick={logoutButton}>
        Logout
      </Button>
      <Button variant='danger' onClick={handleShowDeleteAccount}>
        Delete Account
      </Button>
    </Col>
  );
};

Main.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }),
  handleShowDeleteAccount: PropTypes.func.isRequired,
  handleShowSettings: PropTypes.func.isRequired,
};
