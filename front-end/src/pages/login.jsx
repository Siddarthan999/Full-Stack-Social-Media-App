import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import './login.css';
import { toast } from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    const { setGlobalUserName } = useContext(UserContext);

    function authLogin(event) {
        event.preventDefault();

        const userNameValue = document.querySelector('.userName-input').value;
        const passwordValue = document.querySelector('.password-input').value;

        setGlobalUserName(userNameValue);

        axios.get(`http://localhost:3500/login/${userNameValue}/${passwordValue}`)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                toast.success('Logged in successfully');
                navigate('/home');
            } else {
                toast.error(`Unexpected status code: ${response.status}`);
            }
        })
        .catch(error => {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                console.error('Error: No response received from server', error.request);
                toast.error('Error: No response received from server');
            } else {
                console.error('Error:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        });
    }

    return (
        <React.Fragment>
            <div className="login-container">
                <form onSubmit={authLogin} className="form-login">
                    <h2>Login</h2>
                    User Name<input type="text" className="userName-input" /> <br />
                    Password<input type="password" className="password-input" /> <br />
                    <button type="submit" className="login-button">Login</button> <br />
                    <Link to={'/signup'} className='link-1'>New User? <span className="signup">Sign Up here</span></Link>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login;
