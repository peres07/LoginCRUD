// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthProvider';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateToken } from '../../context/utils/auth';
import { Main } from './components/Main/main';
import { DeleteAccountModal } from './components/deleteAccountModal/deleteAccountModal';
import { SettingsModal } from './components/settingsModal/settingsModal';

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleShowDeleteAccount = () => setShowDelete(true);
  const handleCloseDeleteAccount = () => setShowDelete(false);

  const handleShowSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  useEffect(() => {
    document.title = 'Profile';
    try {
      const data = jwt_decode(user);

      if (!validateToken(user)) return logout();
      setData(data);
    } catch (err) {
      logout();
    }
  }, [user, logout]);

  if (!data) {
    return <></>;
  }

  return (
    <Container>
      <Row>
        <Main
          data={data}
          handleShowDeleteAccount={handleShowDeleteAccount}
          handleShowSettings={handleShowSettings}
        />
        <DeleteAccountModal
          showDelete={showDelete}
          handleCloseDeleteAccount={handleCloseDeleteAccount}
        />
        <SettingsModal showSettings={showSettings} handleCloseSettings={handleCloseSettings} />
      </Row>
    </Container>
  );
};
