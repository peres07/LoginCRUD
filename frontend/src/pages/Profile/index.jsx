// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import jwt_decode from 'jwt-decode';
import './styles.css';

export const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        document.title = 'Profile';
        try {
            const data = jwt_decode(user);

            if (data.exp < Date.now() / 1000) return logout();
            setData(data);
        } catch (err) {
            logout();
        }
    }, [user, logout]);

    const onSubmit = async (event) => {
        event.preventDefault();
        logout();
    };

    if (!data) {
        return <></>;
    }

    return (
        <div className="container">
            <h1>Profile</h1>
            <p>This is a private route!</p>
            <button className="button" type="submit" onClick={onSubmit}>
                Sair
            </button>
            <div className="data">
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
            </div>
        </div>
    );
};
