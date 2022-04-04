import axios from "axios";
import React, { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const passwrord = useRef();
  const passwrordAgain = useRef();
  const navigate = useNavigate();

  const handleCLick = async (e) => {
    e.preventDefault();
    if (passwrord.current.value !== passwrordAgain.current.value) {
      passwrord.current.setCustomValidity("Password doesn't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        passwrord: passwrord.current.value,
      };
      try {
        await axios.post("http://localhost:8800/api/auth/register", user)        
        navigate("/login");
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Coolsite</h3>
          <span className="registerDesc">
            Connect with friends all over the world on Coolsite
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleCLick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={passwrord}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password again"
              required
              ref={passwrordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign up
            </button>
            <button className="registerRegisterButton">Log into account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// test
// test@gmail.com
// 1234567
//
