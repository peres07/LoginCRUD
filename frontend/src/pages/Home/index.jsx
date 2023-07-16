// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import './styles.css'
import { AuthContext } from '../../context/AuthProvider';

export const Home = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Home'
    })

    const onSubmit = async (event) => {
        event.preventDefault();
        logout()
    }

    return (
        <div className='container'>
            <h1>Home</h1>
            <button className="logout cursor-pointer" type="submit" onClick={onSubmit}>Sair</button>
        </div>
    )
}