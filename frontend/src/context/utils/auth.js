import Cookies from 'js-cookie';
import qs from 'qs';
import message from 'antd/lib/message';
import { api } from '../../services/api';

export function setUserCookie(token) {
    Cookies.set('access-token', token, { expires: 7 });
}

export function getUserCookie() {
    const token = Cookies.get('access-token');
    if (!token) return null;
    return token;
}

export function deleteUserCookies() {
    Cookies.remove('access-token');
}

export async function validateToken() {
    try {
        await api.post('/validate', null, {
            headers: { Authorization: 'Bearer ' + getUserCookie() },
        });
        return true;
    } catch (error) {
        message.error(error.response.data.error);
        return false;
    }
}

export async function LoginRequest(email, password) {
    const loadingMessage = message.loading('Loading...', 0);
    try {
        const request = await api.post('/login', null, {
            headers: {
                Authorization: 'Basic ' + btoa(email + ':' + password),
            },
        });

        loadingMessage();
        message.success('Login done successfully!');
        return request;
    } catch (error) {
        loadingMessage();
        message.error(error.response.data.error);
    }
}

export async function registerRequest(email, username, password, code) {
    const loadingMessage = message.loading('Loading...', 0);
    try {
        const request = await api.post(
            '/register',
            qs.stringify({ email, username, password, code })
        );
        loadingMessage();
        message.success('Register done successfully!');
        return request;
    } catch (error) {
        loadingMessage();
        message.error(error.response.data.error);
    }
}

export async function sendCodeRequest(email) {
    const loadingMessage = message.loading('Loading...', 0);
    try {
        const request = await api.post('/sendCode', qs.stringify({ email }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        loadingMessage();
        message.success('Code sent successfully!');
        return request;
    } catch (error) {
        console.log(error)
        loadingMessage();
        message.error(error.response.data.error);
    }
}
