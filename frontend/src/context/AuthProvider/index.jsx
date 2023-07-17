// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    LoginRequest,
    registerRequest,
    deleteUserCookies,
    getUserCookie,
    setUserCookie,
    validateToken,
} from '../utils/auth';
import {
    deleteAccountRequest,
    changeUsernameRequest,
    changeEmailRequest,
    changePasswordRequest,
} from '../utils/user';
import { api } from '../../services/api';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saveCookies = async () => {
            const userCookie = getUserCookie();
            if (userCookie) setUser(userCookie);
        };
        saveCookies();
    }, []);

    async function authenticate(email, password) {
        try {
            const response = await LoginRequest(email, password);
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            setUser(response.data.token);
            setUserCookie(response.data.token);
            return true;
        } catch (error) {
            // pass
        }
    }

    async function register(email, password, username) {
        try {
            const response = await registerRequest(email, password, username);
            return response;
        } catch (error) {
            //pass
        }
    }

    function logout() {
        setUser(null);
        deleteUserCookies();
    }

    async function validate() {
        if ((await validateToken()) === false) {
            logout();
            return <Navigate to="/login" />;
        }
        return true;
    }

    async function deleteAccount(password) {
        try {
            const deleteResponse = await deleteAccountRequest(password);
            if (deleteResponse.status === 200) {
                logout();
            }
        } catch (error) {
            // pass
        }
    }

    async function changeUsername(username, password) {
        try {
            const changeResponse = await changeUsernameRequest(
                username,
                password
            );
            if (changeResponse.status === 200) {
                logout();
            }
        } catch (error) {
            // pass
        }
    }

    async function changeEmail(username, password) {
        try {
            const changeResponse = await changeEmailRequest(username, password);
            if (changeResponse.status === 200) {
                logout();
            }
        } catch (error) {
            // pass
        }
    }

    async function changePassword(newPassword, confirmNewPassword, password) {
        try {
            const changeResponse = await changePasswordRequest(
                newPassword,
                confirmNewPassword,
                password
            );
            if (changeResponse.status === 200) {
                logout();
            }
        } catch {
            // pass
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signed: !!user,
                authenticate,
                register,
                logout,
                validate,
                deleteAccount,
                changeUsername,
                changeEmail,
                changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
