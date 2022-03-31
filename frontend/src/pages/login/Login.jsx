import React, { useContext, useRef } from "react";
import { loginCall } from "../../ApiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const passwrord = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleCLick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, passwrord: passwrord.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Coolsite</h3>
          <span className="loginDesc">
            Connect with friends all over the world on Coolsite
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleCLick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={passwrord}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a new account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
