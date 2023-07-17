import qs from 'qs';
import message from 'antd/lib/message';
import { api } from '../../services/api';

export async function deleteAccountRequest(password) {
    const loadingMessage = message.loading('Loading...', 0);
    try {
        const request = await api.delete('/deleteAccount', {
            data: qs.stringify({ password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        loadingMessage();
        message.success('Account deleted successfully!');
        return request;
    } catch (error) {
        loadingMessage();
        message.error(error.response.data.error);
    }
}

export async function changeUsernameRequest(username, password) {
    const loadingMessage = message.loading('Loading...', 0);
    try {
        const request = await api.patch(
            '/changeUsername',
            qs.stringify({ new_username: username, password }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        loadingMessage();
        message.success('Username changed successfully! Please, login again.');
        return request;
    } catch (error) {
        loadingMessage();
        message.error(error.response.data.error);
    }
}

export async function changeEmailRequest(email, password) {
    const loadingMessage = message.loading('Loading...', 0);
    try {
        const request = await api.patch(
            '/changeEmail',
            qs.stringify({ new_email: email, password }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        loadingMessage();
        message.success('Email changed successfully! Please, login again.');
        return request;
    } catch (error) {
        loadingMessage();
        message.error(error.response.data.error);
    }
}

export async function changePasswordRequest(
    newPassword,
    confirmNewPassword,
    password
) {
    const loadingMessage = message.loading('Loading...', 0);
    try {
        const request = await api.patch(
            '/changePassword',
            qs.stringify({
                new_password: newPassword,
                confirm_password: confirmNewPassword,
                password,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        loadingMessage();
        message.success('Password changed successfully! Please, login again.');
        return request;
    } catch (error) {
        loadingMessage();
        message.error(error.response.data.error);
    }
}
