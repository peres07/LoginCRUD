// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import './styles.css';

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { authenticate, signed } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await authenticate(email, password);
    };

    if (signed) return <Navigate to="/" />;

    return (
        <div className="container">
            <main>
                <h1>Login</h1>
                <form className="inside-container" onSubmit={onSubmit}>
                    <div className="inputs">
                        <label htmlFor="email">E-Mail:</label>
                        <input type="email" id="email" ref={emailRef} required={true}/>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            required={true}
                        />
                        <button className="submit" type="submit">
                            SignIn
                        </button>
                    </div>
                    <div className="or">
                        <div className="lines"></div>
                        <span>or</span>
                        <div className="lines"></div>
                    </div>
                    <div className="register-div">
                        <a href="/register" className="register">
                            Register Now
                        </a>
                    </div>
                </form>
            </main>
        </div>
    );
};
