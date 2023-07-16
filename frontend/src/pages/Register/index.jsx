// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import "./styles.css";

export const Register = () => {
    const formRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    
    const { signed, register } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Register';
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        
        const response = await register(email, username, password);
        try {
            if (response.status === 200) {
                formRef.current.reset(); 
            }
        } catch (error) {
            // pass
        }
    };

    if (signed) return <Navigate to="/profile" />;

    return (
        <div className="container">
            <main>
                <h1>Register</h1>
                <form className="inside-container" onSubmit={onSubmit} ref={formRef} >
                    <div className="inputs">
                        <label htmlFor="email">E-Mail:</label>
                        <input type="email" id="email" ref={emailRef} required={true}/>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" ref={usernameRef} required={true}/>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            required={true}
                        />
                        <button className="submit" type="submit">
                            SignUp
                        </button>
                    </div>
                    <div className="or">
                        <div className="lines"></div>
                        <span>or</span>
                        <div className="lines"></div>
                    </div>
                    <div className="register-div">
                        <a href="/login" className="login">
                            Login Now!
                        </a>
                    </div>
                </form>
            </main>
        </div>
    );
};