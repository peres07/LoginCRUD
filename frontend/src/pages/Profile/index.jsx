// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import jwt_decode from "jwt-decode";
import './styles.css'

export const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Profile'
    })

    const data = jwt_decode(user)

    const onSubmit = async (event) => {
        event.preventDefault();
        logout()
    }

    return (
        <div className='container'>
            <h1>Profile</h1>
            <p>This is a private route!</p>
            <button className="button" type="submit" onClick={onSubmit}>Sair</button>
            <div className='data'>
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
            </div>
        </div>
    )
}