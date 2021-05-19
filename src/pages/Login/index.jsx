import React from "react";
import "./login.css";
import Cookies from "js-cookie";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "redux/index";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const loged = useSelector((state) => state.userReducer.loged);
  const dispatch = useDispatch();
  const history = useHistory();

  const data = {
    identifier,
    password,
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:1337/auth/local", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        Cookies.set("token", response.jwt);
        Cookies.set("currentUserId", response.user.id);
        Cookies.set("currentUserEmail", response.user.email);
        Cookies.set("currentUserUserName", response.user.username);
        dispatch(logIn());
        history.push("/profile");
      });
  };

  return (
    <div className="Login">
      {loged ? (
        history.push("/profile")
      ) : (
        <form className="login-form">
          <input
            type="text"
            name="name"
            placeholder="Nickname or email"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            type="password"
            name="pwd"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="btn_login_page_login"
            type="submit"
            value="Login"
            onClick={handleClick}
          />
        </form>
      )}
    </div>
  );
};
export default Login;
