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
    sendCodeRequest,
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

    async function register(email, username, password, code) {
        try {
            const response = await registerRequest(
                email,
                username,
                password,
                code
            );
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

    async function sendCode(email) {
        try {
            const response = await sendCodeRequest(email);
            return response;
        } catch (error) {
            // pass
        }
    }

    async function deleteAccount(password, code) {
        try {
            const deleteResponse = await deleteAccountRequest(password, code);
            if (deleteResponse.status === 200) {
                logout();
            }
        } catch (error) {
            // pass
        }
    }

    async function changeUsername(username, password, code) {
        try {
            const changeResponse = await changeUsernameRequest(
                username,
                password,
                code
            );
            if (changeResponse.status === 200) {
                logout();
            }
        } catch (error) {
            // pass
        }
    }

    async function changeEmail(username, password, code) {
        try {
            const changeResponse = await changeEmailRequest(
                username,
                password,
                code
            );
            if (changeResponse.status === 200) {
                logout();
            }
        } catch (error) {
            // pass
        }
    }

    async function changePassword(
        newPassword,
        confirmNewPassword,
        password,
        code
    ) {
        try {
            const changeResponse = await changePasswordRequest(
                newPassword,
                confirmNewPassword,
                password,
                code
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
                sendCode,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
