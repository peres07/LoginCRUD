// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });

    return (
        <div className="container">
            <h1>Home</h1>
            <p>This is a public route!</p>
            <div className="buttons">
                <Link to="/login">
                    <button className="button" type="button">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="button" type="button">
                        Register
                    </button>
                </Link>
            </div>
        </div>
    );
};
