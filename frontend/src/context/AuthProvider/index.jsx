// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react';
import {
    LoginRequest,
    deleteUserCookies,
    getUserCookie,
    registerRequest,
    setUserCookie,
    validateToken,
} from './util';
import { api } from '../../services/api';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
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
    }

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, authenticate, register, logout, validate }}
        >
            {children}
        </AuthContext.Provider>
    );
};
