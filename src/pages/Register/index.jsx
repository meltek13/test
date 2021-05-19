import React from "react";
import "./register.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, logIn } from "redux/index";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const loged = useSelector((state) => state.userReducer.loged);
  const dispatch = useDispatch();

  const data = {
    username,
    email,
    password,
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (username && email && password) {
      fetch("http://localhost:1337/auth/local/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          dispatch(logIn());
          dispatch(
            currentUser({
              id: response.user.id,
              username: response.user.username,
              email: response.user.email,
            })
          );
          console.log(response);
          Cookies.set("currentUserId", response.user.id);
          Cookies.set("currentUserEmail", response.user.email);
          Cookies.set("currentUserUserName", response.user.username);
          Cookies.set("token", response.jwt);
          history.push("/");
        });
    } else {
      alert("Tout les champs sont obligatoires");
    }
  };
  return (
    <div className="Register">
      {loged ? (
        history.push("/profile")
      ) : (
        <form className="register-form">
          <input
            type="text"
            name="user-name"
            placeholder="Nickname"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="pwd"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className="btn_register_page_register"
            onClick={handleClick}
            value="S'inscrire"
          />
        </form>
      )}
    </div>
  );
};
export default Register;
//import React from "react";
//import ReactDOM from "react-dom";
//";

//const data = {
//  password: "coucou",
//};

//fetch("http://localhost:1337/auth/local", {
//  method: "post",
//  headers: {
//   "Content-Type": "application/json",
//  },
// body: JSON.stringify(data),
//})
//  .then((response) => response.json())
// .then((response) => Cookies.set(response.user.id, response.jwt));

//console.log(Cookies.get());
