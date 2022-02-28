import React from 'react';
import './login.css'

export default function Login() {
    return (
        <div className='login'> 
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Coolsite</h3>
                    <span className="loginDesc">Connect with friends all over the world on Coolsite</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder='Email' className="loginInput" />
                        <input placeholder='Password' className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton">Create an account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}