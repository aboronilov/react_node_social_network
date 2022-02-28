import React from 'react';
import './register.css'

export default function Register() {
    return (
        <div className='register'> 
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Coolsite</h3>
                    <span className="registerDesc">Connect with friends all over the world on Coolsite</span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <input placeholder='Username' className="registerInput" />
                        <input placeholder='Email' className="registerInput" />
                        <input placeholder='Password' className="registerInput" />
                        <input placeholder='Password again' className="registerInput" />
                        <button className="registerButton">Sign up</button>
                        <button className="registerRegisterButton">Log into account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
