import React, { useRef } from 'react';
import './login.css'

export default function Login() {
    const email = useRef()
    const passwrord = useRef()

    const handleCLick = (e) => { 
        e.preventDefault()          
        console.log(email.current.value)       
    }

    return (
        <div className='login'> 
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Coolsite</h3>
                    <span className="loginDesc">Connect with friends all over the world on Coolsite</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleCLick}>
                        <input 
                            placeholder='Email' 
                            type='email'
                            required 
                            className="loginInput" 
                            ref={email}/>
                        <input 
                            placeholder='Password' 
                            type='password' 
                            required
                            minLength='6'
                            className="loginInput" 
                            ref={passwrord}/>
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton">Create an account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
